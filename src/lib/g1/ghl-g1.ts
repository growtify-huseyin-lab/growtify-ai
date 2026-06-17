// G1 / DeepGap — push result back to the GHL contact (server-only).
// We already know contactId from the verified token, so we PUT custom fields
// directly (no upsert-by-email). Mirrors the pattern in test/lib/ghl-client.ts.
import type { G1Comparison, G1PriorResult, G1Result, G1Synthesis } from "./types";

// Real GHL custom field IDs — created by ghl-specialist 2026-06-17 in location
// e8ZRRmOybS08x5L6qgsS. The entry field g1_token (id i1XhsXamXfpwdRPFoOjB) is
// written by the GHL mint workflow, not here. `attempt` is reserved for the
// G-start vs T-end retake/before-after (wired once attempt tracking lands).
export const G1_FIELD_IDS: Record<string, string> = {
  overall: "ajExQLuHZZymYZjioycd",
  deployment: "KLNO7RDJqofZ1jGDbJtf",
  systems: "N9WCpugkDASJD3WTj979",
  data: "V7Q6mfKLyx9XszMLJRQp",
  outcomes: "HAoPIXdmIJIAzPZ5ZaGJ",
  people: "Cr9rhYnlbUYY86tezhty",
  governance: "pTXt2TLfXZ3S05d4xD7X",
  archetype: "azehwJGTC6cnVnRh6M9P",
  gapSummary: "B7sVkI189pAkLb3YcgX3",
  completedAt: "liaSle4fkrw2TUV1KqJ1",
  attempt: "5Ue1jUHNys3n7cj501un",
};

// The g1_baseline field (write-once snapshot of the FIRST assessment) is resolved
// by KEY at runtime — not hardcoded — so it activates the moment the field exists
// in GHL (created via the UI), with no id to copy and no token handled here.
let cachedBaselineFieldId: string | null = null;

async function getBaselineFieldId(cfg: GhlConfig): Promise<string | null> {
  if (cachedBaselineFieldId) return cachedBaselineFieldId;
  try {
    const res = await fetch(`${cfg.apiBase}/locations/${cfg.locationId}/customFields`, {
      headers: {
        Authorization: `Bearer ${cfg.apiToken}`,
        Version: cfg.apiVersion,
        Accept: "application/json",
      },
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) return null;
    const body = (await res.json().catch(() => ({}))) as {
      customFields?: Array<{ id?: string; fieldKey?: string; name?: string }>;
    };
    const f = (body.customFields ?? []).find((x) => {
      const k = (x.fieldKey ?? "").toLowerCase();
      const n = (x.name ?? "").toLowerCase();
      return k.includes("baseline") || n.includes("baseline");
    });
    cachedBaselineFieldId = f?.id ?? null; // only the hit sticks; null is retried
    return cachedBaselineFieldId;
  } catch {
    return null;
  }
}

// Creative's 6 dimensions -> the 6 existing GHL field slots (labels are legacy;
// values are the correct dimension scores). Rename the GHL fields later for clarity.
const DIM_TO_FIELD: Record<string, string> = {
  d_depth: "deployment",
  d_integration: "systems",
  d_data: "data",
  d_measure: "outcomes",
  d_adoption: "people",
  d_trust: "governance",
};

// Reverse: GHL field-key -> Creative dimId (to read a stored result back).
const FIELD_TO_DIM: Record<string, string> = Object.fromEntries(
  Object.entries(DIM_TO_FIELD).map(([dim, field]) => [field, dim]),
);

const G1_COMPLETED_TAG = "g1_completed";

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

export interface G1ContactLookup {
  found: boolean;
  firstName?: string;
  fullName?: string;
  email?: string;
  prior?: G1PriorResult; // latest stored result (g1_* fields)
  baseline?: G1PriorResult; // write-once FIRST result (g1_baseline) — the G baseline
  error?: string;
}

// Compact JSON snapshot of the first assessment, stored write-once in g1_baseline.
function buildBaselineJson(result: G1Result): string {
  const d: Record<string, number> = {};
  for (const dim of result.dimensions) d[dim.id] = dim.score;
  return JSON.stringify({ o: result.overall, a: result.levelLabel, t: result.completedAt, d });
}

function parseBaseline(
  customFields: Array<{ id?: string; value?: unknown; field_value?: unknown }> | undefined,
  baselineFieldId: string | null,
): G1PriorResult | undefined {
  if (!customFields || !baselineFieldId) return undefined;
  const cf = customFields.find((c) => c?.id === baselineFieldId);
  const raw = cf ? (cf.value ?? cf.field_value) : undefined;
  if (typeof raw !== "string" || !raw.trim()) return undefined;
  try {
    const j = JSON.parse(raw) as {
      o?: number;
      a?: string;
      t?: string;
      d?: Record<string, number>;
    };
    if (typeof j.o !== "number") return undefined;
    const dims = j.d
      ? Object.entries(j.d).map(([k, v]) => ({ id: k, score: Number(v) }))
      : [];
    return {
      overall: j.o,
      attempt: 1,
      completedAt: j.t ?? "",
      archetype: j.a ?? "",
      gapSummary: "",
      dims,
    };
  } catch {
    return undefined;
  }
}

// Parse a GHL contact's customFields into the prior G1 result (if any).
// GHL v2 returns customFields as [{id, value}] (value occasionally as field_value).
function parsePriorResult(
  customFields: Array<{ id?: string; value?: unknown; field_value?: unknown }> | undefined,
): G1PriorResult | undefined {
  if (!customFields || customFields.length === 0) return undefined;
  const byId = new Map<string, unknown>();
  for (const cf of customFields) {
    if (cf?.id) byId.set(cf.id, cf.value ?? cf.field_value);
  }
  const num = (key: string): number => {
    const v = byId.get(G1_FIELD_IDS[key]);
    const n = typeof v === "number" ? v : parseFloat(String(v ?? ""));
    return Number.isFinite(n) ? n : NaN;
  };
  const str = (key: string): string => {
    const v = byId.get(G1_FIELD_IDS[key]);
    return v == null ? "" : String(v);
  };
  const overall = num("overall");
  if (!Number.isFinite(overall)) return undefined; // never completed

  const dims: { id: string; score: number }[] = [];
  for (const [fieldKey, dimId] of Object.entries(FIELD_TO_DIM)) {
    const s = num(fieldKey);
    if (Number.isFinite(s)) dims.push({ id: dimId, score: s });
  }
  const attemptRaw = num("attempt");
  return {
    overall,
    attempt: Number.isFinite(attemptRaw) && attemptRaw > 0 ? attemptRaw : 1,
    completedAt: str("completedAt"),
    archetype: str("archetype"),
    gapSummary: str("gapSummary"),
    dims,
  };
}

/**
 * Resolve a contact by id (the verified Firebase `sub`). Used by /g1 to show the
 * member their own name/email (so they can see the test opened as them) and to
 * confirm `sub === GHL contactId` — if the contact is found, the identity binding
 * is correct; a 404 means `sub` is not a contactId and we'd need an email mapping.
 */
export async function getG1Contact(contactId: string): Promise<G1ContactLookup> {
  const cfg = readConfig();
  if (!cfg) return { found: false, error: "ghl_credentials_missing" };
  try {
    const res = await fetch(`${cfg.apiBase}/contacts/${contactId}`, {
      headers: {
        Authorization: `Bearer ${cfg.apiToken}`,
        Version: cfg.apiVersion,
        Accept: "application/json",
      },
      signal: AbortSignal.timeout(8000),
    });
    if (res.status === 404) return { found: false, error: "not_found" };
    if (!res.ok) return { found: false, error: `HTTP ${res.status}` };
    const body = (await res.json().catch(() => ({}))) as {
      contact?: {
        firstName?: string;
        lastName?: string;
        name?: string;
        email?: string;
        customFields?: Array<{ id?: string; value?: unknown; field_value?: unknown }>;
      };
    };
    const c = body.contact;
    if (!c) return { found: false, error: "no_contact" };
    const fullName = c.name || [c.firstName, c.lastName].filter(Boolean).join(" ");
    const baselineFieldId = await getBaselineFieldId(cfg);
    return {
      found: true,
      firstName: c.firstName,
      fullName,
      email: c.email,
      prior: parsePriorResult(c.customFields),
      baseline: parseBaseline(c.customFields, baselineFieldId),
    };
  } catch (err) {
    return { found: false, error: (err as Error).message };
  }
}

function buildGapSummary(result: G1Result): string {
  const weak = result.dimensions.find((d) => d.id === result.weakest);
  const strong = result.dimensions.find((d) => d.id === result.strongest);
  return [
    `Profil: ${result.levelLabel} (genel ${result.overall}/5).`,
    strong ? `En güçlü: ${strong.label} ${strong.score}/5.` : "",
    weak ? `En zayıf: ${weak.label} ${weak.score}/5.` : "",
  ]
    .filter(Boolean)
    .join(" ");
}

function buildCustomFields(
  result: G1Result,
  attempt?: number,
): Array<{ id: string; value: string | number }> {
  const fields: Array<{ id: string; value: string | number }> = [];
  const push = (key: string, value: string | number) => {
    const id = G1_FIELD_IDS[key];
    if (id && !id.startsWith("REPLACE_")) fields.push({ id, value });
  };
  push("overall", result.overall);
  push("archetype", result.levelLabel);
  push("gapSummary", buildGapSummary(result));
  push("completedAt", result.completedAt);
  if (typeof attempt === "number" && attempt > 0) push("attempt", attempt);
  for (const d of result.dimensions) {
    const fieldKey = DIM_TO_FIELD[d.id];
    if (fieldKey) push(fieldKey, d.score);
  }
  return fields;
}

export interface G1WritebackResult {
  ok: boolean;
  wrote: number; // number of fields written (0 if placeholders still in place)
  error?: string;
}

export async function saveG1ResultToContact(
  contactId: string,
  result: G1Result,
  attempt?: number,
  writeBaseline?: boolean,
): Promise<G1WritebackResult> {
  const cfg = readConfig();
  if (!cfg) return { ok: false, wrote: 0, error: "GHL credentials missing" };

  const customFields = buildCustomFields(result, attempt);
  // First completion → freeze the G baseline (resolved by key; no-op until the
  // g1_baseline field exists in GHL).
  if (writeBaseline) {
    const baselineFieldId = await getBaselineFieldId(cfg);
    if (baselineFieldId) {
      customFields.push({ id: baselineFieldId, value: buildBaselineJson(result) });
    }
  }
  if (customFields.length === 0) {
    // Field ids not configured yet — don't error, just signal nothing written.
    return { ok: true, wrote: 0, error: "g1_field_ids_not_configured" };
  }

  try {
    const res = await fetch(`${cfg.apiBase}/contacts/${contactId}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${cfg.apiToken}`,
        Version: cfg.apiVersion,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ customFields }),
      signal: AbortSignal.timeout(15000),
    });
    if (!res.ok) {
      return { ok: false, wrote: 0, error: `HTTP ${res.status}` };
    }
    // Best-effort tag so GHL workflows can react (unlock next lesson, send email).
    await addTag(cfg, contactId, G1_COMPLETED_TAG).catch(() => undefined);
    return { ok: true, wrote: customFields.length };
  } catch (err) {
    return { ok: false, wrote: 0, error: (err as Error).message };
  }
}

/* --------------------------- result email (like /test) -------------------- */
// Mirrors test/lib/ghl-client.ts sendQuizReportEmail: app sends a rich HTML
// result email via GHL conversations/messages (type:"Email"). No PDF — the body
// IS the result (profile + gap + weakest + first move + cost) with a link back
// to /g1 to re-open. Best-effort; never blocks the user's on-screen result.
const G1_VIEW_URL = "https://growtify.ai/g1";
const PRIMARY = "#5d47f0";

function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

// Mirrors test/lib/ghl-client.ts buildReportEmailHtml exactly: table-based,
// email-client-safe, #5d47f0 header, body + CTA + disclaimer + brand footer.
// CTA points to the PDF report when one was generated, else to /g1 (view online).
function buildG1EmailHtml(
  firstName: string,
  synth: G1Synthesis,
  pdfUrl?: string,
  comparison?: G1Comparison | null,
): string {
  const ad = firstName ? esc(firstName) : "Profesyonel";
  const ctaUrl = pdfUrl || G1_VIEW_URL;
  const ctaText = pdfUrl ? "Raporumu Görüntüle →" : "Sonucumu Görüntüle →";
  // On a retake the email leads with the transformation (progress), not the profile.
  const h1 = comparison ? "Dönüşümün İlerliyor" : "AI Olgunluk Profilin Hazır";
  const intro = comparison
    ? `Merhaba ${ad}, son ölçümünden bu yana: <b>${esc(comparison.headline)}</b>`
    : `Merhaba ${ad}, değerlendirmene göre profilin: <b>${esc(synth.levelLabel)}</b> · ${synth.overall}/5`;
  const body = comparison
    ? esc(comparison.paragraph)
    : "Testi tamamladığın için teşekkürler. Kişisel AI Olgunluk raporun hazırlandı — içinde 6 boyutta detaylı analizini, en güçlü ve en zayıf halkanı, ilk somut hamleni ve hareketsizliğin bedelini bulacaksın.";
  const disclaimer =
    "Bu rapor kişisel değerlendirme cevaplarına dayalı otomatik bir analiz içermektedir. Profesyonel danışmanlık yerine geçmez.";
  const footer =
    "Growtify.ai — GROWT Method ile AI dönüşümü<br>Bu e-posta AI Olgunluk değerlendirmesini tamamladığın için gönderilmiştir.";

  return `<!DOCTYPE html><html><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"></head><body style="margin:0;padding:0;"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0;padding:0;"><tr><td align="center" style="padding:0;"><table role="presentation" cellpadding="0" cellspacing="0" border="0" style="font-family:'Inter',Arial,sans-serif;color:#232323;width:100%;max-width:600px;"><tr><td style="background-color:${PRIMARY};padding:24px 20px;color:white;text-align:center;"><h1 style="font-size:24px;margin:0 0 8px;color:white;">${h1}</h1><p style="font-size:14px;opacity:0.85;margin:0;color:white;">${intro}</p></td></tr><tr><td style="padding:24px 20px;"><p style="font-size:14px;line-height:1.7;color:#475569;margin:0 0 24px;">${body}</p><table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" style="padding:0 0 24px;"><a href="${ctaUrl}" style="display:inline-block;background:${PRIMARY};color:white;padding:14px 32px;border-radius:12px;font-size:14px;font-weight:700;text-decoration:none;">${ctaText}</a></td></tr></table><p style="font-size:13px;color:#64748b;line-height:1.6;margin:0 0 24px;">${disclaimer}</p><hr style="border:none;border-top:1px solid #e2e8f0;margin:0 0 16px;"><p style="font-size:11px;color:#94a3b8;text-align:center;margin:0;">${footer}</p></td></tr></table></td></tr></table></body></html>`;
}

export interface G1EmailResult {
  ok: boolean;
  messageId?: string;
  error?: string;
}

export async function sendG1ResultEmail(
  contactId: string,
  firstName: string,
  synth: G1Synthesis,
  pdfUrl?: string,
  comparison?: G1Comparison | null,
): Promise<G1EmailResult> {
  const cfg = readConfig();
  if (!cfg) return { ok: false, error: "ghl_credentials_missing" };

  const subject = comparison
    ? firstName
      ? `${firstName}, dönüşümün ilerliyor (${comparison.attempt}. ölçüm)`
      : `Dönüşümün ilerliyor (${comparison.attempt}. ölçüm)`
    : firstName
      ? `${firstName}, AI Olgunluk profilin hazır`
      : "AI Olgunluk profilin hazır";
  const html = buildG1EmailHtml(firstName, synth, pdfUrl, comparison);
  const payload: Record<string, unknown> = { type: "Email", contactId, subject, html };
  if (pdfUrl) payload.attachments = [pdfUrl];

  try {
    const res = await fetch(`${cfg.apiBase}/conversations/messages`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${cfg.apiToken}`,
        Version: cfg.apiVersion,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(15000),
    });
    const json = (await res.json().catch(() => ({}))) as {
      messageId?: string;
      message?: string;
      error?: string;
      msg?: { id?: string };
    };
    if (!res.ok) {
      return { ok: false, error: json.message ?? json.error ?? `HTTP ${res.status}` };
    }
    return { ok: true, messageId: json.msg?.id ?? json.messageId };
  } catch (err) {
    return { ok: false, error: (err as Error).message };
  }
}

async function addTag(cfg: GhlConfig, contactId: string, tag: string): Promise<void> {
  await fetch(`${cfg.apiBase}/contacts/${contactId}/tags`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${cfg.apiToken}`,
      Version: cfg.apiVersion,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ tags: [tag] }),
    signal: AbortSignal.timeout(10000),
  });
}
