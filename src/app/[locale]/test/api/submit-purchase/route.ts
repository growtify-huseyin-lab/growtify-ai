// POST /test/api/submit-purchase
// dev-008: checkout-click attribution. The paywall's "buy" link fires this as a
// fire-and-forget request (the payment itself happens on the GHL course-offer
// checkout at panel.growtify.ai). We tag the GHL contact so a workflow can follow
// up on clicks that never became an order; the purchase itself is recorded by the
// Order Submitted webhook (→ /api/ga4-purchase).
//
// Tags are ADDED via POST /contacts/{id}/tags — never an upsert with `tags`,
// which could replace the contact's existing source/sector tags.

const CONTACT_ID_RE = /^[A-Za-z0-9]{10,40}$/;

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      contactId?: unknown;
      couponCode?: unknown;
      discount?: unknown;
      value?: unknown;
      locale?: unknown;
    };
    const contactId = typeof body.contactId === "string" ? body.contactId : "";
    if (!CONTACT_ID_RE.test(contactId)) {
      return Response.json({ ok: false, error: "invalid_contact" }, { status: 400 });
    }

    const apiToken = process.env.GHL_API_TOKEN;
    const apiBase = process.env.GHL_API_BASE ?? "https://services.leadconnectorhq.com";
    const apiVersion = process.env.GHL_API_VERSION ?? "2021-07-28";
    if (!apiToken) {
      console.error("[quiz/submit-purchase] GHL_API_TOKEN missing — checkout click not attributed");
      return Response.json({ ok: false, error: "ghl_not_configured" }, { status: 503 });
    }

    const tag = body.locale === "en" ? "gai_en_checkout_clicked" : "gai_checkout_clicked";
    const res = await fetch(`${apiBase}/contacts/${contactId}/tags`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiToken}`,
        Version: apiVersion,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ tags: [tag] }),
      signal: AbortSignal.timeout(10000),
    });

    console.log(
      `[quiz/submit-purchase] contact=${contactId} tag=${tag} coupon=${String(body.couponCode ?? "-")} discount=${String(body.discount ?? "-")} value=${String(body.value ?? "-")} ghl=${res.status}`,
    );
    return Response.json({ ok: res.ok }, { status: res.ok ? 200 : 502 });
  } catch (err) {
    return Response.json(
      { ok: false, error: (err as Error).message },
      { status: 500 },
    );
  }
}
