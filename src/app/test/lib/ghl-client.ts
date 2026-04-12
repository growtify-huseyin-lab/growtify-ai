// Growtify AI — GHL v2 Contacts API client (server-only)
// Used by /test/api/submit-email route. Do NOT import from client components.

import type { QuizState } from "./types";
import { buildGhlCustomFields, buildGhlTags } from "./ghl-mapping";

interface GhlUpsertResponse {
  contact?: {
    id: string;
    locationId: string;
    email: string;
    firstName?: string;
    tags?: string[];
  };
  new?: boolean;
  traceId?: string;
  message?: string | string[];
  error?: string;
  statusCode?: number;
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

export interface UpsertResult {
  ok: boolean;
  contactId?: string;
  isNew?: boolean;
  error?: string;
  statusCode?: number;
  traceId?: string;
}

/**
 * Upsert a contact into GHL with quiz tags + custom fields.
 * Uses /contacts/upsert which creates or updates by email.
 */
export async function upsertQuizContact(state: QuizState): Promise<UpsertResult> {
  const config = readConfig();
  if (!config) {
    return {
      ok: false,
      error:
        "GHL credentials missing (GHL_API_TOKEN / GHL_LOCATION_ID not set in .env.local)",
    };
  }

  const payload = {
    locationId: config.locationId,
    email: state.email,
    firstName: state.firstName || undefined,
    phone: state.phone || undefined,
    country: "TR",
    source: "Growtify.ai quiz",
    tags: buildGhlTags(state),
    customFields: buildGhlCustomFields(state),
  };

  try {
    const res = await fetch(`${config.apiBase}/contacts/upsert`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${config.apiToken}`,
        Version: config.apiVersion,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
      // GHL sometimes takes ~1.5s on cold paths
      signal: AbortSignal.timeout(15000),
    });

    const body = (await res.json().catch(() => ({}))) as GhlUpsertResponse;

    if (!res.ok) {
      return {
        ok: false,
        statusCode: res.status,
        error: Array.isArray(body.message)
          ? body.message.join("; ")
          : body.message ?? body.error ?? `HTTP ${res.status}`,
        traceId: body.traceId,
      };
    }

    return {
      ok: true,
      contactId: body.contact?.id,
      isNew: body.new,
      traceId: body.traceId,
    };
  } catch (err) {
    return {
      ok: false,
      error: (err as Error).message,
    };
  }
}

/* -------------------------------------------------------------------------- */
/*  PDF Upload to GHL Contact                                                 */
/* -------------------------------------------------------------------------- */

export interface UploadResult {
  ok: boolean;
  urls?: string[];
  error?: string;
}

/**
 * Upload a PDF file to GHL, associated with a contact.
 * Uses POST /conversations/messages/upload (multipart/form-data).
 * Max 5 MB. PDF is a supported file type.
 */
export async function uploadPdfToContact(
  contactId: string,
  pdfBuffer: Buffer,
  filename: string,
): Promise<UploadResult> {
  const config = readConfig();
  if (!config) {
    return { ok: false, error: "GHL credentials missing" };
  }

  try {
    // Build multipart form data manually (Node.js native)
    const boundary = `----FormBoundary${Date.now()}`;
    const parts: Buffer[] = [];

    // contactId field
    parts.push(
      Buffer.from(
        `--${boundary}\r\nContent-Disposition: form-data; name="contactId"\r\n\r\n${contactId}\r\n`,
      ),
    );

    // File field
    parts.push(
      Buffer.from(
        `--${boundary}\r\nContent-Disposition: form-data; name="fileAttachment"; filename="${filename}"\r\nContent-Type: application/pdf\r\n\r\n`,
      ),
    );
    parts.push(pdfBuffer);
    parts.push(Buffer.from("\r\n"));

    // Close boundary
    parts.push(Buffer.from(`--${boundary}--\r\n`));

    const body = Buffer.concat(parts);

    const res = await fetch(
      `${config.apiBase}/conversations/messages/upload`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${config.apiToken}`,
          Version: config.apiVersion,
          "Content-Type": `multipart/form-data; boundary=${boundary}`,
        },
        body,
        signal: AbortSignal.timeout(30000),
      },
    );

    const json = (await res.json().catch(() => ({}))) as {
      uploadedFiles?: Record<string, string>;
      urls?: string[];
      message?: string;
      error?: string;
    };

    if (!res.ok) {
      return {
        ok: false,
        error: json.message ?? json.error ?? `HTTP ${res.status}`,
      };
    }

    // GHL returns { uploadedFiles: { "filename.pdf": "https://..." } }
    const urls = json.uploadedFiles
      ? Object.values(json.uploadedFiles)
      : json.urls ?? [];

    return { ok: true, urls };
  } catch (err) {
    return { ok: false, error: (err as Error).message };
  }
}

/* -------------------------------------------------------------------------- */
/*  Create Unique Coupon Code via GHL Payments API                            */
/* -------------------------------------------------------------------------- */

export interface CouponResult {
  ok: boolean;
  code?: string;
  couponId?: string;
  error?: string;
}

/**
 * Create a unique single-use 50% discount coupon in GHL.
 * Code format: GROWT + random 6 chars (e.g., GROWTX8K2M9).
 */
export async function createQuizCoupon(
  discountPercent: number = 50,
): Promise<CouponResult> {
  const config = readConfig();
  if (!config) return { ok: false, error: "GHL credentials missing" };

  const MAX_ATTEMPTS = 3;
  let lastError: string | undefined;

  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
    // New code per attempt — avoids collision if previous attempt partially succeeded
    const code = "GROWT" + generateCouponSuffix();
    const now = new Date();
    const startDate = now.toISOString().replace(/\.\d+Z$/, "Z");
    // Coupon technically valid 14 days but shown to user progressively:
    // A1 (T+50m): "10 dakikan kaldı", A2 (T+65m): "24 saat uzattım",
    // A9 (T+10d): "48 saat", A10 (T+14d): "son 24 saat" (gerçekten bitiyor)
    // This avoids regenerating coupons — all nurture emails reuse same code.
    const endDate = new Date(now.getTime() + 14 * 24 * 60 * 60 * 1000)
      .toISOString()
      .replace(/\.\d+Z$/, "Z");

    try {
      const res = await fetch(`${config.apiBase}/payments/coupon`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${config.apiToken}`,
          Version: config.apiVersion,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          altId: config.locationId,
          altType: "location",
          name: "Quiz Discount — " + code,
          code,
          discountType: "percentage",
          discountValue: discountPercent,
          durationType: "once",
          maxRedemptions: 1,
          startDate,
          endDate,
        }),
        signal: AbortSignal.timeout(10000),
      });

      const json = (await res.json().catch(() => ({}))) as {
        _id?: string;
        code?: string;
        message?: string | string[];
        error?: string;
      };

      if (res.ok) {
        return { ok: true, code: json.code ?? code, couponId: json._id };
      }

      lastError = Array.isArray(json.message)
        ? json.message.join("; ")
        : json.message ?? json.error ?? `HTTP ${res.status}`;
      console.warn(
        `[coupon] attempt ${attempt}/${MAX_ATTEMPTS} failed: ${lastError}`,
      );
    } catch (err) {
      lastError = (err as Error).message;
      console.warn(
        `[coupon] attempt ${attempt}/${MAX_ATTEMPTS} threw: ${lastError}`,
      );
    }

    // Brief delay before retry (exponential-ish: 300ms, 800ms)
    if (attempt < MAX_ATTEMPTS) {
      await new Promise((r) => setTimeout(r, 300 * attempt));
    }
  }

  return { ok: false, error: lastError ?? "Unknown coupon error" };
}

function generateCouponSuffix(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let result = "";
  for (let i = 0; i < 6; i++) {
    result += chars[Math.floor(Math.random() * chars.length)];
  }
  return result;
}

/* -------------------------------------------------------------------------- */
/*  Save Coupon Code + Expiry to Contact Custom Fields                        */
/* -------------------------------------------------------------------------- */

const COUPON_CODE_FIELD_ID = "d8uadNfpblyEuwG0GwTe";
const COUPON_EXPIRES_FIELD_ID = "ERE8bqENPdpd0zkxfjan";

/**
 * Store the coupon code and expiry in contact custom fields so nurture
 * workflow emails can use {{contact.gai__coupon_code}} merge tag.
 */
export async function saveCouponToContact(
  contactId: string,
  couponCode: string,
  expiresAt: string,
): Promise<{ ok: boolean; error?: string }> {
  const config = readConfig();
  if (!config) return { ok: false, error: "GHL credentials missing" };

  try {
    const res = await fetch(`${config.apiBase}/contacts/${contactId}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${config.apiToken}`,
        Version: config.apiVersion,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        customFields: [
          { id: COUPON_CODE_FIELD_ID, value: couponCode },
          { id: COUPON_EXPIRES_FIELD_ID, value: expiresAt },
        ],
      }),
      signal: AbortSignal.timeout(10000),
    });
    if (!res.ok) return { ok: false, error: `HTTP ${res.status}` };
    return { ok: true };
  } catch (err) {
    return { ok: false, error: (err as Error).message };
  }
}

/* -------------------------------------------------------------------------- */
/*  Save PDF URL to Contact Custom Field                                      */
/* -------------------------------------------------------------------------- */

const PDF_URL_FIELD_ID = "HDzGAxcYfy0h8A1mjOH3";

/**
 * Store the PDF report URL in the contact's custom field so it's visible
 * on the contact profile in GHL.
 */
export async function savePdfUrlToContact(
  contactId: string,
  pdfUrl: string,
): Promise<{ ok: boolean; error?: string }> {
  const config = readConfig();
  if (!config) return { ok: false, error: "GHL credentials missing" };

  try {
    const res = await fetch(`${config.apiBase}/contacts/${contactId}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${config.apiToken}`,
        Version: config.apiVersion,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        customFields: [{ id: PDF_URL_FIELD_ID, value: pdfUrl }],
      }),
      signal: AbortSignal.timeout(10000),
    });
    if (!res.ok) return { ok: false, error: `HTTP ${res.status}` };
    return { ok: true };
  } catch (err) {
    return { ok: false, error: (err as Error).message };
  }
}

/* -------------------------------------------------------------------------- */
/*  Send Email with PDF Report via GHL Conversations                          */
/* -------------------------------------------------------------------------- */

export interface EmailResult {
  ok: boolean;
  messageId?: string;
  error?: string;
}

/**
 * Send the quiz report email to the contact via GHL conversations API.
 * Uses type=Email with HTML body containing the PDF download link.
 */
export async function sendQuizReportEmail(
  contactId: string,
  firstName: string,
  persona: string,
  pdfUrl: string,
): Promise<EmailResult> {
  const config = readConfig();
  if (!config) return { ok: false, error: "GHL credentials missing" };

  const subject = `${firstName}, AI Dijital Olgunluk raporun hazır`;
  const html = buildReportEmailHtml(firstName, persona, pdfUrl);

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

    const json = (await res.json().catch(() => ({}))) as {
      messageId?: string;
      message?: string;
      error?: string;
      msg?: { id?: string };
    };

    if (!res.ok) {
      return {
        ok: false,
        error: json.message ?? json.error ?? `HTTP ${res.status}`,
      };
    }

    return { ok: true, messageId: json.msg?.id ?? json.messageId };
  } catch (err) {
    return { ok: false, error: (err as Error).message };
  }
}

/* -------------------------------------------------------------------------- */
/*  Create Opportunity in GAI - Satis Pipeline                                */
/* -------------------------------------------------------------------------- */

const PIPELINE_ID = "DJYPH8mpgBh5tZkelIQP";
const STAGE_YENI_LEAD = "bd48baed-afa1-479b-a398-9c0ee7167df9";

export async function createQuizOpportunity(
  contactId: string,
  firstName: string,
  persona: string,
): Promise<{ ok: boolean; opportunityId?: string; error?: string }> {
  const config = readConfig();
  if (!config) return { ok: false, error: "GHL credentials missing" };

  try {
    const res = await fetch(`${config.apiBase}/opportunities/`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${config.apiToken}`,
        Version: config.apiVersion,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        pipelineId: PIPELINE_ID,
        locationId: config.locationId,
        name: firstName || "Lead",
        pipelineStageId: STAGE_YENI_LEAD,
        contactId,
        assignedTo: "A63MyodDNnjwGmZIW4zd",
        status: "open",
        monetaryValue: 0, // 0 until payment — post-payment workflow updates to actual amount
      }),
      signal: AbortSignal.timeout(10000),
    });

    const json = (await res.json().catch(() => ({}))) as {
      opportunity?: { id?: string };
      message?: string;
      error?: string;
    };

    if (!res.ok) {
      return {
        ok: false,
        error: json.message ?? json.error ?? `HTTP ${res.status}`,
      };
    }

    return { ok: true, opportunityId: json.opportunity?.id };
  } catch (err) {
    return { ok: false, error: (err as Error).message };
  }
}

/* -------------------------------------------------------------------------- */
/*  Add Note to Contact (PDF link visible in Notes tab)                       */
/* -------------------------------------------------------------------------- */

export async function addNoteToContact(
  contactId: string,
  body: string,
): Promise<{ ok: boolean; error?: string }> {
  const config = readConfig();
  if (!config) return { ok: false, error: "GHL credentials missing" };

  try {
    const res = await fetch(
      `${config.apiBase}/contacts/${contactId}/notes`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${config.apiToken}`,
          Version: config.apiVersion,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ body }),
        signal: AbortSignal.timeout(10000),
      },
    );
    if (!res.ok) return { ok: false, error: `HTTP ${res.status}` };
    return { ok: true };
  } catch (err) {
    return { ok: false, error: (err as Error).message };
  }
}

function buildReportEmailHtml(
  firstName: string,
  persona: string,
  pdfUrl: string,
): string {
  return `<!DOCTYPE html><html><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"></head><body style="margin:0;padding:0;"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0;padding:0;"><tr><td align="center" style="padding:0;"><table role="presentation" cellpadding="0" cellspacing="0" border="0" style="font-family:'Inter',Arial,sans-serif;color:#232323;width:100%;max-width:600px;"><tr><td style="background-color:#5d47f0;padding:24px 20px;color:white;text-align:center;"><h1 style="font-size:24px;margin:0 0 8px;color:white;">AI Dijital Olgunluk Raporun Hazır</h1><p style="font-size:14px;opacity:0.85;margin:0;color:white;">Merhaba ${firstName}, test sonuçlarına göre profilin: <b>${persona}</b></p></td></tr><tr><td style="padding:24px 20px;"><p style="font-size:14px;line-height:1.7;color:#475569;margin:0 0 24px;">Testi tamamladığın için teşekkürler. Kişisel AI Dijital Olgunluk raporun hazırlandı — içinde 14 alanda detaylı analiz, en güçlü ve en zorlandığın alanlar, ve sana özel öneriler bulacaksın.</p><table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" style="padding:0 0 24px;"><a href="${pdfUrl}" style="display:inline-block;background:#5d47f0;color:white;padding:14px 32px;border-radius:12px;font-size:14px;font-weight:700;text-decoration:none;">Raporumu Görüntüle →</a></td></tr></table><p style="font-size:13px;color:#64748b;line-height:1.6;margin:0 0 24px;">Bu rapor kişisel değerlendirme sonuçlarına dayalı otomatik bir analiz içermektedir. Profesyonel danışmanlık yerine geçmez.</p><hr style="border:none;border-top:1px solid #e2e8f0;margin:0 0 16px;"><p style="font-size:11px;color:#94a3b8;text-align:center;margin:0;">Growtify.ai — GROWT Method ile AI dönüşümü<br>Bu e-posta AI Dijital Olgunluk Testi'ni tamamladığın için gönderilmiştir.</p></td></tr></table></td></tr></table></body></html>`;
}
