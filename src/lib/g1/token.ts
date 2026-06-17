// G1 / DeepGap — signed deep-link token (HMAC-SHA256, stateless).
// Identity bridge GHL -> growtify.ai/g1: GHL cannot HMAC at template time, so we
// MINT the token server-side (/api/g1/mint, called by a GHL workflow webhook),
// write it into the contact's `g1_token` custom field, and the lesson link carries
// it as `?t={{contact.g1_token}}`. /g1 verifies it here. Server-only (node:crypto).
import crypto from "node:crypto";

const ttlDefault = 60 * 60 * 24 * 30; // 30 days

export interface G1TokenPayload {
  sub: string; // GHL contactId — the identity we trust
  email?: string;
  name?: string; // first name, for greeting
  loc?: string; // GHL locationId
  ret?: string; // return URL (the GHL lesson to send the user back to)
  iat: number;
  exp: number;
}

export type VerifyResult =
  | { ok: true; payload: G1TokenPayload }
  | { ok: false; reason: string };

function secret(): string {
  return process.env.G1_TOKEN_SECRET ?? "";
}

export function signG1Token(
  claims: Pick<G1TokenPayload, "sub"> &
    Partial<Pick<G1TokenPayload, "email" | "name" | "loc" | "ret">>,
  ttlSeconds: number = ttlDefault,
): string {
  const s = secret();
  if (!s) throw new Error("G1_TOKEN_SECRET not set");
  const now = Math.floor(Date.now() / 1000);
  const payload: G1TokenPayload = {
    sub: claims.sub,
    email: claims.email,
    name: claims.name,
    loc: claims.loc,
    ret: claims.ret,
    iat: now,
    exp: now + ttlSeconds,
  };
  const body = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const sig = crypto.createHmac("sha256", s).update(body).digest("base64url");
  return `${body}.${sig}`;
}

export function verifyG1Token(token: string): VerifyResult {
  const s = secret();
  if (!s) return { ok: false, reason: "secret_missing" };
  if (!token) return { ok: false, reason: "empty" };
  const parts = token.split(".");
  if (parts.length !== 2) return { ok: false, reason: "malformed" };
  const [body, sig] = parts;
  const expected = crypto.createHmac("sha256", s).update(body).digest("base64url");
  // constant-time compare; length guard avoids timingSafeEqual throwing on mismatch
  if (
    sig.length !== expected.length ||
    !crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expected))
  ) {
    return { ok: false, reason: "bad_signature" };
  }
  let payload: G1TokenPayload;
  try {
    payload = JSON.parse(Buffer.from(body, "base64url").toString("utf8")) as G1TokenPayload;
  } catch {
    return { ok: false, reason: "bad_payload" };
  }
  if (!payload.sub) return { ok: false, reason: "no_subject" };
  if (typeof payload.exp === "number" && Math.floor(Date.now() / 1000) > payload.exp) {
    return { ok: false, reason: "expired" };
  }
  return { ok: true, payload };
}
