// POST /test/api/submit-email
// Quiz lead capture: fast response (contact + opportunity + coupon ~3s)
// then background PDF generation + upload + email (~25s, non-blocking).

export const maxDuration = 60;

import { after } from "next/server";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";
import type { QuizState } from "../../lib/types";
import {
  upsertQuizContact,
  uploadPdfToContact,
  savePdfUrlToContact,
  saveCouponToContact,
  sendQuizReportEmail,
  addNoteToContact,
  createQuizOpportunity,
  createQuizCoupon,
} from "../../lib/ghl-client";
import { buildGhlCustomFields, buildGhlTags } from "../../lib/ghl-mapping";
import { generateQuizPdf, getPdfFilename } from "../../lib/pdf-generate";
import { computeResults, pickDiscount } from "../../lib/scoring";

export async function POST(request: Request) {
  // Rate limit: max 5 submissions per IP per minute
  const ip = getClientIp(request);
  const rl = checkRateLimit(ip, 5, 60_000);
  if (!rl.ok) {
    return Response.json(
      { ok: false, error: "rate_limited", retryAfter: Math.ceil((rl.resetAt - Date.now()) / 1000) },
      { status: 429 },
    );
  }

  let state: QuizState;
  try {
    state = (await request.json()) as QuizState;
  } catch {
    return Response.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  if (!state?.email || !/^\S+@\S+\.\S+$/.test(state.email)) {
    return Response.json({ ok: false, error: "invalid_email" }, { status: 400 });
  }

  // Ensure computed results
  if (!state.totalScore) {
    const discount = state.discount || pickDiscount();
    const results = computeResults({ ...state, discount });
    state = { ...state, ...results };
  }

  console.log(
    "[quiz/submit-email] outgoing →",
    JSON.stringify({
      email: state.email,
      firstName: state.firstName,
      tags: buildGhlTags(state),
      customFields: buildGhlCustomFields(state),
    }, null, 2),
  );

  // ========== FAST PATH (blocking — ~3s) ==========

  // 1. Upsert contact
  const upsertResult = await upsertQuizContact(state);
  if (!upsertResult.ok) {
    console.error("[quiz/submit-email] GHL upsert failed:", upsertResult);
    return Response.json(
      { ok: false, error: upsertResult.error, statusCode: upsertResult.statusCode },
      { status: 200 },
    );
  }
  const contactId = upsertResult.contactId!;
  console.log(`[quiz/submit-email] contact=${contactId} new=${upsertResult.isNew}`);

  // 2. Opportunity + Coupon (parallel)
  const [oppResult, couponResult] = await Promise.all([
    createQuizOpportunity(contactId, state.firstName, state.persona),
    createQuizCoupon(state.discount),
  ]);

  const couponCode = couponResult.ok ? couponResult.code : undefined;
  console.log(`[quiz/submit-email] opp=${oppResult.ok} coupon=${couponCode ?? "FAILED"}`);

  // 3. Save coupon code to contact custom field (for nurture email merge tags)
  if (couponCode) {
    // Backend expiry 60 days (matches ghl-client.ts), UX urgency 14 days.
    // Free funnel re-engagement (post-GATE-decline) uses Day 14-60 window.
    const expiresAt = new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString();
    const saveResult = await saveCouponToContact(contactId, couponCode, expiresAt);
    if (!saveResult.ok) {
      console.warn("[quiz/submit-email] coupon field save failed:", saveResult.error);
    }
  }

  // ========== RESPOND TO CLIENT (user can proceed) ==========
  // PDF generation happens in background — don't block the quiz flow.

  // Schedule background PDF flow via Next.js after() — runs after response on Vercel
  after(async () => {
    try {
      await backgroundPdfFlow(contactId, state, couponCode);
    } catch (err) {
      console.error("[quiz/submit-email] Background PDF flow error:", err);
    }
  });

  return Response.json({
    ok: true,
    contactId,
    isNew: upsertResult.isNew,
    couponCode,
  });
}

/**
 * Background: PDF generation + GHL upload + note + email.
 * Runs after the response is sent to the client.
 */
async function backgroundPdfFlow(
  contactId: string,
  state: QuizState,
  couponCode: string | undefined,
): Promise<void> {
  try {
    const pdfBuffer = await generateQuizPdf(state, couponCode);
    const filename = getPdfFilename(state.firstName);
    console.log(`[quiz/bg] PDF generated — ${filename} (${pdfBuffer.length} bytes)`);

    const uploadResult = await uploadPdfToContact(contactId, pdfBuffer, filename);
    if (!uploadResult.ok) {
      console.error("[quiz/bg] PDF upload failed:", uploadResult.error);
      return;
    }

    const pdfUrl = uploadResult.urls?.[0];
    console.log(`[quiz/bg] PDF uploaded — url=${pdfUrl}`);

    if (pdfUrl) {
      // Save PDF URL + note immediately
      await Promise.all([
        savePdfUrlToContact(contactId, pdfUrl).then((r) =>
          console.log(`[quiz/bg] URL saved=${r.ok}`),
        ),
        addNoteToContact(
          contactId,
          [
            "AI Dijital Olgunluk Testi Tamamlandı",
            "",
            "Persona: " + state.persona,
            "Sektör: " + (state.sector ?? "Belirtilmedi"),
            "Hedef: " + (state.q_goal ?? "Belirtilmedi"),
            couponCode ? "Kupon: " + couponCode : "",
            "",
            "PDF Rapor: " + pdfUrl,
          ]
            .filter(Boolean)
            .join("\n"),
        ).then((r) => console.log(`[quiz/bg] note=${r.ok}`)),
        sendQuizReportEmail(
          contactId,
          state.firstName,
          state.persona,
          pdfUrl,
        ).then((r) =>
          console.log(`[quiz/bg] email=${r.ok} id=${r.messageId ?? r.error}`),
        ),
      ]);
    }
  } catch (err) {
    console.error("[quiz/bg] error:", err);
  }
}
