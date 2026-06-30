import { NextRequest, NextResponse } from "next/server";

// Server-side GA4 purchase relay (hibrit purchase tracking — server-side leg).
// GHL "Offer Access Granted" / "Order Submitted" workflow → Webhook (POST) → this route
// → GA4 Measurement Protocol `purchase` event. Reliable backbone: fires on the real payment
// regardless of client-side JS. The client-side leg (begin_checkout/add_payment_info/purchase
// injected into panel.growtify.ai via the edge proxy) carries the shared _ga client_id for
// attribution; GA4 dedupes the two by `transaction_id`.
//
// Required env (Vercel):
//   GA4_MP_API_SECRET   — GA4 Admin → Data Streams → Measurement Protocol API secrets
//   GHL_WEBHOOK_SECRET  — shared token; GHL webhook must send it (header or ?token=)
//
// Expected GHL webhook JSON body (configure the webhook action to send these):
//   {
//     "transaction_id": "{{order.id}}",        // GHL order id (dedupe key) — REQUIRED
//     "value": 9999,                            // amount in MAJOR units (₺9999, not cents) — REQUIRED
//     "currency": "TRY",                        // ISO 4217 — REQUIRED
//     "email": "{{contact.email}}",             // optional (user_id-ish)
//     "product_id": "69df69d181387216de509cf7", // optional
//     "product_name": "GROWT Metod*",           // optional
//     "tier": "temel",                          // optional (temel|tam)
//     "ga_client_id": "GA1.1.123.456"           // optional — if captured client-side; enables attribution
//   }

const GA4_MEASUREMENT_ID = "G-03ZXSXXKL9"; // public GA4 stream id (not a secret)
const MP_ENDPOINT = "https://www.google-analytics.com/mp/collect";

// Stable synthetic client_id from the transaction id when no real _ga client_id was captured.
// Keeps server-side retries from spawning multiple synthetic users; revenue still records,
// attribution falls back to (direct) for these. Real attribution comes from the client-side leg.
function synthClientId(seed: string): string {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  return `${h}.${seed.length}`;
}

export async function POST(req: NextRequest) {
  const apiSecret = process.env.GA4_MP_API_SECRET;
  const webhookSecret = process.env.GHL_WEBHOOK_SECRET;

  if (!apiSecret || !webhookSecret) {
    return NextResponse.json(
      { ok: false, error: "not_configured", detail: "GA4_MP_API_SECRET / GHL_WEBHOOK_SECRET not set" },
      { status: 503 },
    );
  }

  // Auth — accept either header or query token.
  const provided =
    req.headers.get("x-webhook-secret") ||
    new URL(req.url).searchParams.get("token") ||
    "";
  if (provided !== webhookSecret) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  const transactionId = String(body.transaction_id ?? body.order_id ?? "").trim();
  const value = Number(body.value ?? body.amount ?? 0);
  const currency = String(body.currency ?? "TRY").toUpperCase();

  if (!transactionId || !Number.isFinite(value) || value <= 0) {
    return NextResponse.json(
      { ok: false, error: "missing_fields", detail: "transaction_id + positive value required" },
      { status: 400 },
    );
  }

  const productName = body.product_name ? String(body.product_name) : "GROWT Program";
  const productId = body.product_id ? String(body.product_id) : (body.tier ? String(body.tier) : "growt");
  const clientId = body.ga_client_id ? String(body.ga_client_id) : synthClientId(transactionId);
  // session_id is REQUIRED for GA4 to attribute MP events to a session (else they don't show
  // in Realtime / session-scoped reports). Use the captured one if present, else a stable
  // synthetic per transaction.
  const sessionId = body.session_id ? String(body.session_id) : synthClientId(transactionId + ":sess");
  // Opt-in debug: routes to GA4's validation endpoint and returns validationMessages instead
  // of recording — used for end-to-end verification without polluting production data.
  const isDebug = body.debug === true;

  const mpPayload = {
    client_id: clientId,
    // Non-personalized: server event has no consented ad context unless client_id is real.
    events: [
      {
        name: "purchase",
        params: {
          transaction_id: transactionId,
          value,
          currency,
          // Mark server-origin so it can be segmented / deduped against the client-side event.
          source: "ghl_server",
          session_id: sessionId,
          engagement_time_msec: 100,
          items: [
            {
              item_id: productId,
              item_name: productName,
              price: value,
              quantity: 1,
            },
          ],
        },
      },
    ],
  };

  const endpoint = isDebug
    ? "https://www.google-analytics.com/debug/mp/collect"
    : MP_ENDPOINT;

  let validation: unknown = null;
  try {
    const res = await fetch(
      `${endpoint}?measurement_id=${GA4_MEASUREMENT_ID}&api_secret=${apiSecret}`,
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(mpPayload),
      },
    );
    if (isDebug) {
      // Validation endpoint returns 200 + { validationMessages: [...] } (empty = valid).
      validation = await res.json().catch(() => null);
    } else if (res.status !== 204 && res.status !== 200) {
      // MP /collect returns 204 with no body on success.
      return NextResponse.json(
        { ok: false, error: "mp_error", status: res.status },
        { status: 502 },
      );
    }
  } catch (e) {
    return NextResponse.json(
      { ok: false, error: "mp_fetch_failed", detail: String(e) },
      { status: 502 },
    );
  }

  return NextResponse.json({
    ok: true,
    mode: isDebug ? "debug_validation" : "collect",
    sent: { transaction_id: transactionId, value, currency, client_id_kind: body.ga_client_id ? "real" : "synthetic" },
    ...(isDebug ? { validation } : {}),
  });
}

// Lightweight health check — confirms deployment + env wiring WITHOUT leaking secret values.
export async function GET() {
  return NextResponse.json({
    ok: true,
    route: "ga4-purchase",
    measurement_id: GA4_MEASUREMENT_ID,
    configured: {
      GA4_MP_API_SECRET: Boolean(process.env.GA4_MP_API_SECRET),
      GHL_WEBHOOK_SECRET: Boolean(process.env.GHL_WEBHOOK_SECRET),
    },
  });
}
