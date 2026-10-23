// Çalışma Dosyam oturumu: çerezde rastgele değer, Worker'da yalnız hash'i (ADR K4).
import crypto from "node:crypto";
import { cookies } from "next/headers";
import { dosyamApi, type DosyamStudent } from "./api";

export const COOKIE = "gai_dosyam";
const MAX_AGE = 30 * 24 * 3600;

export const hashHex = (s: string) => crypto.createHash("sha256").update(s).digest("hex");

// E-posta yalnız biberli hash olarak Worker'a gider (oran sınırı ve kod eşlemesi için).
export function emailHash(email: string): string {
  const pepper = process.env.DOSYAM_HMAC_KEY ?? "";
  return crypto.createHmac("sha256", pepper).update(email.trim().toLowerCase()).digest("hex");
}

export async function startSession(studentId: string): Promise<boolean> {
  const token = crypto.randomBytes(32).toString("base64url");
  const r = await dosyamApi("POST", "/v1/sessions", { body: { id_hash: hashHex(token), student_id: studentId } });
  if (!r.body.ok) return false;
  (await cookies()).set(COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: MAX_AGE,
  });
  return true;
}

export async function currentStudent(): Promise<DosyamStudent | null> {
  const token = (await cookies()).get(COOKIE)?.value;
  if (!token || token.length > 100) return null;
  try {
    const r = await dosyamApi<{ student?: DosyamStudent }>("POST", "/v1/sessions/resolve", { body: { id_hash: hashHex(token) } });
    return r.body.ok && r.body.student ? r.body.student : null;
  } catch {
    return null;
  }
}

export async function endSession(): Promise<void> {
  const store = await cookies();
  const token = store.get(COOKIE)?.value;
  if (token) await dosyamApi("POST", "/v1/sessions/delete", { body: { id_hash: hashHex(token) } }).catch(() => undefined);
  store.delete(COOKIE);
}

// Yazma isteklerinde CSRF koruması: Origin bizim alan adımız olmalı (çerez SameSite=Lax ile birlikte).
export function sameOrigin(req: Request): boolean {
  const origin = req.headers.get("origin");
  if (!origin) return false;
  try {
    const o = new URL(origin);
    const host = req.headers.get("x-forwarded-host") ?? req.headers.get("host") ?? "";
    return o.host === host;
  } catch {
    return false;
  }
}
