import { NextRequest, NextResponse } from "next/server";
import { createQuizCoupon } from "@/app/test/lib/ghl-client";

// Custom field IDs created in Faz 1.1 (nurture-fields-result.json)
const FIELD_COUPON_CODE = "d8uadNfpblyEuwG0GwTe";
const FIELD_COUPON_EXPIRES_AT = "ERE8bqENPdpd0zkxfjan";
const FIELD_LAST_OFFER_DATE = "hrJgr81myxx8tVULEKIr";
const FIELD_OFFER_COUNT = "ti0PfhA1rVsiLw01unOo";

/**
 * POST /api/generate-coupon
 *
 * Generates a new single-use discount coupon for a contact and updates their
 * GHL custom fields (coupon code, expiry, offer count).
 *
 * Called by GHL workflows (via webhook) during nurture phases:
 * - Track A Workflow A2 (T+65min, %30, 24h)
 * - Track A Workflow A9 (T+10d, %35, 48h)
 * - Track A Workflow A10 (T+14d, %40, 24h — final)
 *
 * Request body:
 *   {
 *     contactId: string,       // GHL contact ID (required)
 *     email: string,           // for validation/logging
 *     discountPercent: number, // 20-50
 *     durationHours: number    // 1, 24, 48, etc
 *   }
 *
 * Response:
 *   { ok: true, code, couponId, expiresAt }
 *   { ok: false, error }
 *
 * Security: Bearer token check via NURTURE_WEBHOOK_SECRET env var.
 */
export async function POST(req: NextRequest) {
  // Bearer token check (GHL workflow → webhook auth)
  const expectedSecret = process.env.NURTURE_WEBHOOK_SECRET;
  if (expectedSecret) {
    const authHeader = req.headers.get("authorization") ?? "";
    const token = authHeader.replace(/^Bearer\s+/i, "");
    if (token !== expectedSecret) {
      return NextResponse.json(
        { ok: false, error: "Unauthorized" },
        { status: 401 },
      );
    }
  }

  let body: {
    contactId?: string;
    email?: string;
    discountPercent?: number;
    durationHours?: number;
    offerNumber?: number;
  };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid JSON body" },
      { status: 400 },
    );
  }

  // Validation
  if (!body.contactId || typeof body.contactId !== "string") {
    return NextResponse.json(
      { ok: false, error: "contactId required" },
      { status: 400 },
    );
  }
  const discountPercent = Number(body.discountPercent ?? 30);
  if (!Number.isFinite(discountPercent) || discountPercent < 1 || discountPercent > 99) {
    return NextResponse.json(
      { ok: false, error: "discountPercent must be 1-99" },
      { status: 400 },
    );
  }
  const durationHours = Number(body.durationHours ?? 24);
  if (!Number.isFinite(durationHours) || durationHours < 0.5 || durationHours > 168) {
    return NextResponse.json(
      { ok: false, error: "durationHours must be 0.5-168" },
      { status: 400 },
    );
  }

  // Step 1: Create coupon in GHL Payments API
  // Note: createQuizCoupon creates a 1-hour coupon by default. For longer
  // durations, we'd need to modify that function or call the API directly.
  // For now, we extend this route's coupon creation inline.
  const couponResult = await createLongDurationCoupon(discountPercent, durationHours);
  if (!couponResult.ok) {
    return NextResponse.json(
      { ok: false, error: couponResult.error ?? "Coupon creation failed" },
      { status: 500 },
    );
  }

  // Step 2: Update contact custom fields in GHL
  const expiresAt = new Date(
    Date.now() + durationHours * 60 * 60 * 1000,
  ).toISOString();

  const fieldsToUpdate: Record<string, string> = {
    [FIELD_COUPON_CODE]: couponResult.code!,
    [FIELD_COUPON_EXPIRES_AT]: expiresAt,
    [FIELD_LAST_OFFER_DATE]: new Date().toISOString(),
  };

  // Track offer count if provided (A2=1, A9=2, A10=3)
  const offerNumber = Number(body.offerNumber ?? 0);
  if (offerNumber > 0) {
    fieldsToUpdate[FIELD_OFFER_COUNT] = String(offerNumber);
  }

  const updateResult = await updateContactFields(body.contactId, fieldsToUpdate);

  if (!updateResult.ok) {
    // Coupon was created but contact update failed — log and return partial success
    console.error("[generate-coupon] contact field update failed:", updateResult.error);
    return NextResponse.json(
      {
        ok: true,
        code: couponResult.code,
        couponId: couponResult.couponId,
        expiresAt,
        warning: `contact field update failed: ${updateResult.error}`,
      },
      { status: 200 },
    );
  }

  return NextResponse.json(
    {
      ok: true,
      code: couponResult.code,
      couponId: couponResult.couponId,
      expiresAt,
    },
    { status: 200 },
  );
}

/* -------------------------------------------------------------------------- */
/*  Helper: Create coupon with custom duration (extends existing logic)       */
/* -------------------------------------------------------------------------- */

interface CouponResult {
  ok: boolean;
  code?: string;
  couponId?: string;
  error?: string;
}

async function createLongDurationCoupon(
  discountPercent: number,
  durationHours: number,
): Promise<CouponResult> {
  const apiToken = process.env.GHL_API_TOKEN;
  const locationId = process.env.GHL_LOCATION_ID;
  const apiBase =
    process.env.GHL_API_BASE ?? "https://services.leadconnectorhq.com";
  const apiVersion = process.env.GHL_API_VERSION ?? "2021-07-28";

  if (!apiToken || !locationId) {
    return { ok: false, error: "GHL credentials missing" };
  }

  const MAX_ATTEMPTS = 3;
  let lastError: string | undefined;

  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
    const code = "GROWT" + generateSuffix();
    const now = new Date();
    const startDate = now.toISOString().replace(/\.\d+Z$/, "Z");
    const endDate = new Date(now.getTime() + durationHours * 60 * 60 * 1000)
      .toISOString()
      .replace(/\.\d+Z$/, "Z");

    try {
      const res = await fetch(`${apiBase}/payments/coupon`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiToken}`,
          Version: apiVersion,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          altId: locationId,
          altType: "location",
          name: `Nurture Discount — ${code}`,
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
    } catch (err) {
      lastError = (err as Error).message;
    }

    if (attempt < MAX_ATTEMPTS) {
      await new Promise((r) => setTimeout(r, 300 * attempt));
    }
  }

  return { ok: false, error: lastError ?? "Unknown coupon error" };
}

function generateSuffix(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let result = "";
  for (let i = 0; i < 6; i++) {
    result += chars[Math.floor(Math.random() * chars.length)];
  }
  return result;
}

/* -------------------------------------------------------------------------- */
/*  Helper: Update contact custom fields                                       */
/* -------------------------------------------------------------------------- */

async function updateContactFields(
  contactId: string,
  fields: Record<string, string>,
): Promise<{ ok: boolean; error?: string }> {
  const apiToken = process.env.GHL_API_TOKEN;
  const apiBase =
    process.env.GHL_API_BASE ?? "https://services.leadconnectorhq.com";
  const apiVersion = process.env.GHL_API_VERSION ?? "2021-07-28";

  if (!apiToken) return { ok: false, error: "GHL credentials missing" };

  const customFields = Object.entries(fields).map(([id, value]) => ({ id, value }));

  try {
    const res = await fetch(`${apiBase}/contacts/${contactId}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${apiToken}`,
        Version: apiVersion,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ customFields }),
      signal: AbortSignal.timeout(10000),
    });

    if (!res.ok) {
      const text = await res.text().catch(() => "");
      return { ok: false, error: `HTTP ${res.status}: ${text.slice(0, 200)}` };
    }

    return { ok: true };
  } catch (err) {
    return { ok: false, error: (err as Error).message };
  }
}
