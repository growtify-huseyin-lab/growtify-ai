// İstek imzası — growtify.ai sunucusu ile gai-dosyam-api arasında (ADR K3).
// İmza yöntem, yol, zaman damgası, nonce, öğrenci kimliği ve gövde hash'ini kapsar; ±300 sn pencere.
// WebCrypto kullanır: aynı dosya Worker'da, Node'da (testler) ve Next.js sunucusunda çalışır.

export const SIG_WINDOW_SECONDS = 300;

export const HEADER = {
  ts: "x-dosyam-ts",
  nonce: "x-dosyam-nonce",
  student: "x-dosyam-student",
  sig: "x-dosyam-sig",
  idem: "x-idempotency-key",
} as const;

export interface SignParts {
  method: string;
  path: string; // sorgu dizesi dahil
  ts: number; // unix saniye
  nonce: string;
  student: string; // boş dize = öğrenciye bağlı olmayan uç (giriş, oturum çözme)
  bodyHash: string;
}

const enc = new TextEncoder();

function toHex(buf: ArrayBuffer): string {
  return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

export async function sha256Hex(data: string): Promise<string> {
  return toHex(await crypto.subtle.digest("SHA-256", enc.encode(data)));
}

export function canonical(p: SignParts): string {
  return [p.method.toUpperCase(), p.path, String(p.ts), p.nonce, p.student, p.bodyHash].join("\n");
}

export async function hmacHex(key: string, message: string): Promise<string> {
  const k = await crypto.subtle.importKey("raw", enc.encode(key), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  return toHex(await crypto.subtle.sign("HMAC", k, enc.encode(message)));
}

export function safeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

export async function signRequest(key: string, p: SignParts): Promise<string> {
  return hmacHex(key, canonical(p));
}

export type VerifyResult = { ok: true } | { ok: false; reason: string };

// keys: [geçerli, önceki]; önceki rotasyon sırasında kabul edilir, boşsa atlanır.
export async function verifySignature(
  keys: string[],
  p: SignParts,
  sig: string,
  nowSeconds: number,
): Promise<VerifyResult> {
  const usable = keys.filter((k) => k && k.length >= 32);
  if (usable.length === 0) return { ok: false, reason: "key_missing" };
  if (!Number.isFinite(p.ts) || Math.abs(nowSeconds - p.ts) > SIG_WINDOW_SECONDS) {
    return { ok: false, reason: "stale" };
  }
  if (!/^[A-Za-z0-9_-]{16,64}$/.test(p.nonce)) return { ok: false, reason: "bad_nonce" };
  if (!/^[0-9a-f]{64}$/.test(sig)) return { ok: false, reason: "bad_sig" };
  for (const k of usable) {
    if (safeEqual(await signRequest(k, p), sig)) return { ok: true };
  }
  return { ok: false, reason: "mismatch" };
}

export function newNonce(): string {
  const b = new Uint8Array(18);
  crypto.getRandomValues(b);
  return btoa(String.fromCharCode(...b)).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}
