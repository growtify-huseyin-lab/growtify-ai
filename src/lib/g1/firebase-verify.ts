// G1 / DeepGap — verify a GHL Client Portal Firebase ID token (server-only).
// The portal authenticates members with Firebase Auth (project "highlevel-backend").
// A portal-side script reads the member's current Firebase ID token and passes it
// to /g1?ft=...; we verify it here against Google's public keys, which yields a
// trusted member id (sub). This is the secure cross-domain identity bridge — the
// token is Google-signed and cannot be forged.
import { createRemoteJWKSet, jwtVerify, type JWTPayload } from "jose";

const PROJECT = process.env.GHL_FIREBASE_PROJECT ?? "highlevel-backend";

// Google securetoken public keys (JWK). jose caches them and refetches on a
// kid miss, so key rotation is handled transparently.
const JWKS = createRemoteJWKSet(
  new URL("https://www.googleapis.com/service_accounts/v1/jwk/securetoken@system.gserviceaccount.com"),
);

export interface FbVerifyResult {
  ok: boolean;
  uid?: string; // Firebase sub — the trusted member identity (see note in /g1)
  email?: string;
  name?: string;
  reason?: string;
}

export async function verifyFirebaseIdToken(token: string): Promise<FbVerifyResult> {
  if (!token) return { ok: false, reason: "empty" };
  try {
    const { payload } = await jwtVerify(token, JWKS, {
      issuer: `https://securetoken.google.com/${PROJECT}`,
      audience: PROJECT,
    });
    const p = payload as JWTPayload & {
      user_id?: string;
      email?: string;
      name?: string;
    };
    const uid = (p.sub ?? p.user_id) as string | undefined;
    if (!uid) return { ok: false, reason: "no_subject" };
    return { ok: true, uid, email: p.email, name: p.name };
  } catch (e) {
    return { ok: false, reason: (e as Error).message };
  }
}
