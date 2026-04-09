// POST /test/kurumsal/api/submit-email
// Kurumsal quiz lead capture: fast response (contact + opportunity ~3s)
// then background PDF generation + upload + email (~25s, non-blocking).
// NO coupon — CTA is strategy call booking.

import type { KurumsalQuizState } from "../../lib/types-kurumsal";
import {
  uploadPdfToContact,
  savePdfUrlToContact,
  addNoteToContact,
} from "../../../lib/ghl-client";
import { buildGhlCustomFields, buildGhlTags, buildContactNote } from "../../lib/ghl-mapping-kurumsal";
import { computeKurumsalResults } from "../../lib/scoring-kurumsal";
import { generateKurumsalPdfHtml } from "../../lib/pdf-html-template-kurumsal";

export async function POST(request: Request) {
  let state: KurumsalQuizState;
  try {
    state = (await request.json()) as KurumsalQuizState;
  } catch {
    return Response.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  if (!state?.email || !/^\S+@\S+\.\S+$/.test(state.email)) {
    return Response.json({ ok: false, error: "invalid_email" }, { status: 400 });
  }

  // Ensure computed results
  if (!state.totalScore) {
    const results = computeKurumsalResults(state);
    state = { ...state, ...results };
  }

  console.log(
    "[kurumsal/submit-email] outgoing →",
    JSON.stringify({
      email: state.email,
      firstName: state.firstName,
      tags: buildGhlTags(state),
      customFields: buildGhlCustomFields(state),
    }, null, 2),
  );

  // ========== FAST PATH (blocking — ~3s) ==========

  // 1. Upsert contact — reuse bireysel ghl-client with kurumsal mapping
  const tags = buildGhlTags(state);
  const customFields = buildGhlCustomFields(state);

  // Build a minimal state-like object that bireysel ghl-client expects
  const ghlPayload = {
    email: state.email,
    firstName: state.firstName || undefined,
    sector: state.sector,
    persona: state.persona,
    totalScore: state.totalScore,
    painLevel: state.painLevel,
    segment: "kurumsal" as const,
    q_goal: state.q_goal,
    commitment: null,
    q_areas: [],
    q_habits: [],
    discount: 0,
    // These are required by QuizState type but not used for kurumsal
    q_time: 0, q_procrastination: 0, q_focus: 0, q_comparison: 0,
    q_fomo: 0, q_progress: 0, q_uncertainty: 0, q_overwhelm: 0,
    q_decision: 0, q_fear: 0, q_selfworth: 0, q_social: 0,
    q_overthink: 0, q_motivation: 0, bonus_q1: null, bonus_q2: null,
  };

  // Direct GHL API call with kurumsal tags and fields
  const config = readConfig();
  if (!config) {
    return Response.json({ ok: false, error: "GHL credentials missing" }, { status: 500 });
  }

  let contactId: string;
  let isNew: boolean;

  try {
    const res = await fetch(`${config.apiBase}/contacts/upsert`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${config.apiToken}`,
        Version: config.apiVersion,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        locationId: config.locationId,
        email: state.email,
        firstName: state.firstName || undefined,
        phone: state.phone || undefined,
        country: "GB",
        source: "Growtify.ai kurumsal quiz",
        tags,
        customFields,
      }),
      signal: AbortSignal.timeout(15000),
    });

    const body = await res.json().catch(() => ({})) as Record<string, unknown>;
    if (!res.ok) {
      console.error("[kurumsal/submit-email] GHL upsert failed:", body);
      return Response.json({ ok: false, error: "ghl_upsert_failed" }, { status: 200 });
    }

    const contact = body.contact as Record<string, unknown> | undefined;
    contactId = (contact?.id as string) ?? "";
    isNew = (body.new as boolean) ?? false;
  } catch (err) {
    console.error("[kurumsal/submit-email] GHL upsert error:", err);
    return Response.json({ ok: false, error: (err as Error).message }, { status: 200 });
  }

  console.log(`[kurumsal/submit-email] contact=${contactId} new=${isNew}`);

  // 2. Create opportunity (49.000 TL value, no coupon)
  try {
    const oppRes = await fetch(`${config.apiBase}/opportunities/`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${config.apiToken}`,
        Version: config.apiVersion,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        pipelineId: "M1ulhwFc5tfnjfBgxOEK",   // GAI - Kurumsal Satış
        locationId: config.locationId,
        name: state.firstName || "Kurumsal Lead",
        pipelineStageId: "2f045a6f-3b41-423f-a968-89f3cb5db60c", // Quiz Lead
        contactId,
        status: "open",
      }),
      signal: AbortSignal.timeout(10000),
    });
    const oppJson = await oppRes.json().catch(() => ({})) as Record<string, unknown>;
    console.log(`[kurumsal/submit-email] opportunity=${oppRes.ok}${!oppRes.ok ? ' error=' + JSON.stringify(oppJson.message || oppJson.error) : ' id=' + (oppJson.opportunity as Record<string, unknown>)?.id}`);
  } catch (err) {
    console.error("[kurumsal/submit-email] opportunity error:", err);
  }

  // ========== RESPOND TO CLIENT ==========
  backgroundPdfFlow(contactId, state, config).catch((err) =>
    console.error("[kurumsal/submit-email] Background PDF flow error:", err),
  );

  return Response.json({ ok: true, contactId, isNew });
}

interface GhlConfig {
  apiToken: string;
  locationId: string;
  apiBase: string;
  apiVersion: string;
}

function readConfig(): GhlConfig | null {
  const apiToken = process.env.GHL_API_TOKEN;
  const locationId = process.env.GHL_LOCATION_ID;
  const apiBase = process.env.GHL_API_BASE ?? "https://services.leadconnectorhq.com";
  const apiVersion = process.env.GHL_API_VERSION ?? "2021-07-28";
  if (!apiToken || !locationId) return null;
  return { apiToken, locationId, apiBase, apiVersion };
}

async function backgroundPdfFlow(
  contactId: string,
  state: KurumsalQuizState,
  config: GhlConfig,
): Promise<void> {
  try {
    // Generate PDF from kurumsal template
    const html = generateKurumsalPdfHtml(state);
    const { generatePdfFromHtml } = await import("../../../lib/pdf-generate");
    const pdfBuffer = await generatePdfFromHtml(html);
    const filename = `growtify-kurumsal-rapor-${(state.firstName || "rapor").toLowerCase().replace(/\s+/g, "-")}.pdf`;
    console.log(`[kurumsal/bg] PDF generated — ${filename} (${pdfBuffer.length} bytes)`);

    const uploadResult = await uploadPdfToContact(contactId, pdfBuffer, filename);
    if (!uploadResult.ok) {
      console.error("[kurumsal/bg] PDF upload failed:", uploadResult.error);
      return;
    }

    const pdfUrl = uploadResult.urls?.[0];
    console.log(`[kurumsal/bg] PDF uploaded — url=${pdfUrl}`);

    if (pdfUrl) {
      await Promise.all([
        savePdfUrlToContact(contactId, pdfUrl).then((r) =>
          console.log(`[kurumsal/bg] URL saved=${r.ok}`),
        ),
        addNoteToContact(contactId, buildContactNote(state)).then((r) =>
          console.log(`[kurumsal/bg] note=${r.ok}`),
        ),
        sendKurumsalReportEmail(contactId, state, pdfUrl, config).then((r) =>
          console.log(`[kurumsal/bg] email=${r}`),
        ),
      ]);
    }
  } catch (err) {
    console.error("[kurumsal/bg] error:", err);
  }
}

async function sendKurumsalReportEmail(
  contactId: string,
  state: KurumsalQuizState,
  pdfUrl: string,
  config: GhlConfig,
): Promise<boolean> {
  const subject = `${state.firstName}, Kurumsal AI Olgunluk Raporunuz hazır`;
  const html = buildKurumsalEmailHtml(state.firstName, state.persona, pdfUrl);

  try {
    const res = await fetch(`${config.apiBase}/conversations/messages`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${config.apiToken}`,
        Version: config.apiVersion,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type: "Email",
        contactId,
        subject,
        html,
        attachments: [pdfUrl],
      }),
      signal: AbortSignal.timeout(15000),
    });
    return res.ok;
  } catch {
    return false;
  }
}

function buildKurumsalEmailHtml(
  firstName: string,
  persona: string,
  pdfUrl: string,
): string {
  const personaLabels: Record<string, string> = {
    Baslangic: "Başlangıç (AI Farkındalık)",
    Kesif: "Keşif (AI Deneyimleme)",
    Uygulama: "Uygulama (AI Operasyonu)",
    Lider: "Lider (AI Dönüşümü)",
  };
  const label = personaLabels[persona] ?? persona;

  return `<!DOCTYPE html><html><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"></head><body style="margin:0;padding:0;"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0;padding:0;"><tr><td align="center" style="padding:0;"><table role="presentation" cellpadding="0" cellspacing="0" border="0" style="font-family:'Inter',Arial,sans-serif;color:#232323;width:100%;max-width:600px;"><tr><td style="background-color:#2563EB;padding:24px 20px;color:white;text-align:center;"><h1 style="font-size:22px;margin:0 0 8px;color:white;">Kurumsal AI Olgunluk Raporunuz Hazır</h1><p style="font-size:14px;opacity:0.85;margin:0;color:white;">Merhaba ${firstName}, değerlendirme sonucunuz: <b>${label}</b></p></td></tr><tr><td style="padding:24px 20px;"><p style="font-size:14px;line-height:1.7;color:#475569;margin:0 0 24px;">Kurumsal AI Olgunluk Değerlendirmesini tamamladığınız için teşekkürler. Raporunuzda 5 boyutta detaylı analiz, zorluk alanları ve size özel öneriler bulacaksınız.</p><table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" style="padding:0 0 28px;"><a href="${pdfUrl}" style="display:inline-block;background:#2563EB;color:white;padding:14px 32px;border-radius:12px;font-size:14px;font-weight:700;text-decoration:none;">Raporumu Görüntüle →</a></td></tr></table><table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="background:#f8fafc;border-radius:12px;padding:20px;"><p style="font-size:14px;font-weight:700;color:#1a1a2e;margin:0 0 8px;">Sonraki Adım</p><p style="font-size:13px;color:#475569;margin:0 0 16px;">30 dakikalık ücretsiz strateji görüşmesi ile AI dönüşüm yol haritanızı birlikte oluşturalım.</p><a href="https://app.growtify.app/widget/bookings/kurumsal-on-gorusme" style="display:inline-block;background:#2563EB;color:white;padding:10px 24px;border-radius:10px;font-size:13px;font-weight:700;text-decoration:none;">Görüşme Planla →</a></td></tr></table><p style="font-size:13px;color:#64748b;line-height:1.6;margin:24px 0;">Bu rapor kurumsal değerlendirme sonuçlarınıza dayalı otomatik bir analiz içermektedir. Profesyonel danışmanlık yerine geçmez.</p><hr style="border:none;border-top:1px solid #e2e8f0;margin:0 0 16px;"><p style="font-size:11px;color:#94a3b8;text-align:center;margin:0;">Growtify.ai — GROWT Method ile kurumsal AI dönüşümü<br>Bu e-posta Kurumsal AI Olgunluk Değerlendirmesini tamamladığınız için gönderilmiştir.</p></td></tr></table></td></tr></table></body></html>`;
}
