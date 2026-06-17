// POST /api/g1/mint  — called by a GHL workflow webhook to mint a signed deep-link
// token for a contact. Guarded by a shared secret header so only GHL can mint.
// Response { token } is written into the contact's `g1_token` custom field, then
// the lesson link is https://growtify.ai/g1?t={{contact.g1_token}}.
export const maxDuration = 30;

import { signG1Token } from "@/lib/g1/token";

interface MintBody {
  contactId?: string;
  email?: string;
  name?: string;
  locationId?: string;
  returnUrl?: string;
  ttlSeconds?: number;
}

export async function POST(request: Request) {
  const mintSecret = process.env.G1_MINT_SECRET;
  if (!mintSecret) {
    return Response.json({ ok: false, error: "mint_not_configured" }, { status: 500 });
  }
  const provided = request.headers.get("x-g1-mint-secret");
  if (provided !== mintSecret) {
    return Response.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }

  let body: MintBody;
  try {
    body = (await request.json()) as MintBody;
  } catch {
    return Response.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }
  if (!body.contactId) {
    return Response.json({ ok: false, error: "contactId_required" }, { status: 400 });
  }

  try {
    const token = signG1Token(
      {
        sub: body.contactId,
        email: body.email,
        name: body.name,
        loc: body.locationId,
        ret: body.returnUrl,
      },
      typeof body.ttlSeconds === "number" ? body.ttlSeconds : undefined,
    );
    return Response.json({ ok: true, token });
  } catch (err) {
    return Response.json(
      { ok: false, error: (err as Error).message },
      { status: 500 },
    );
  }
}
