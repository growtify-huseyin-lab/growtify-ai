// gai-dosyam-api istemcisi (yalnız sunucu). Her istek imzalanır; imza kodu Worker ile ortak (workers/dosyam-api/src/sig.ts).
import { HEADER, newNonce, sha256Hex, signRequest } from "../../../workers/dosyam-api/src/sig";

export interface DosyamStudent {
  id: string;
  ghl_contact_id: string;
  package: "free" | "temel" | "tam";
  temel_baslangic: string;
  tam_bitis: string | null;
  mode: "aktif" | "olcum" | "salt_okunur" | "kapali"; // olcum: Temel bitti, yalnız ölçüm alanları yazılır
  first_name: string | null;
}

export interface Submission {
  section_id: string;
  version: number;
  status: "taslak" | "onayli";
  data: Record<string, unknown>;
  updated_at: string;
  approved_at: string | null;
}

export interface ApiResult<T> {
  status: number;
  body: T & { ok: boolean; error?: string };
}

function config() {
  const base = process.env.DOSYAM_API_URL;
  const key = process.env.DOSYAM_HMAC_KEY;
  if (!base || !key) throw new Error("dosyam_api_config_missing");
  return { base: base.replace(/\/$/, ""), key };
}

export async function dosyamApi<T = Record<string, unknown>>(
  method: "GET" | "POST" | "PUT",
  path: string,
  opts: { body?: unknown; student?: string; idem?: string } = {},
): Promise<ApiResult<T>> {
  const { base, key } = config();
  const raw = opts.body === undefined ? "" : JSON.stringify(opts.body);
  const ts = Math.floor(Date.now() / 1000);
  const nonce = newNonce();
  const student = opts.student ?? "";
  const sig = await signRequest(key, { method, path, ts, nonce, student, bodyHash: await sha256Hex(raw) });
  const headers: Record<string, string> = {
    [HEADER.ts]: String(ts),
    [HEADER.nonce]: nonce,
    [HEADER.student]: student,
    [HEADER.sig]: sig,
    "content-type": "application/json",
  };
  if (opts.idem) headers[HEADER.idem] = opts.idem;
  const res = await fetch(base + path, {
    method,
    headers,
    body: method === "GET" ? undefined : raw,
    cache: "no-store",
    signal: AbortSignal.timeout(10_000),
  });
  const body = (await res.json().catch(() => ({ ok: false, error: "gecersiz_cevap" }))) as T & { ok: boolean; error?: string };
  return { status: res.status, body };
}

// Oran sınırı Worker'da (sunucusuz örnekler arasında ortak). true = izin var.
export async function allow(key: string, limit: number, windowSec: number): Promise<boolean> {
  try {
    const r = await dosyamApi<{ allowed: boolean }>("POST", "/v1/rate", { body: { key, limit, window: windowSec } });
    return r.body.allowed === true;
  } catch {
    return false;
  }
}
