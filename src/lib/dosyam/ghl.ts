// Çalışma Dosyam ↔ GHL (yalnız sunucu). Kişi bulma, hak kontrolü, giriş kodu e-postası, kuyruktan alan/etiket yazma.
// Alan kimlikleri koda gömülmez: anahtardan (contact.gai__…) çalışırken çözülür (G1 deseni).

interface GhlConfig {
  apiToken: string;
  locationId: string;
  apiBase: string;
  apiVersion: string;
}

function cfg(): GhlConfig {
  const apiToken = process.env.GHL_API_TOKEN;
  const locationId = process.env.GHL_LOCATION_ID;
  if (!apiToken || !locationId) throw new Error("ghl_credentials_missing");
  return {
    apiToken,
    locationId,
    apiBase: process.env.GHL_API_BASE ?? "https://services.leadconnectorhq.com",
    apiVersion: process.env.GHL_API_VERSION ?? "2021-07-28",
  };
}

async function ghl(method: string, path: string, body?: unknown): Promise<Response> {
  const c = cfg();
  return fetch(`${c.apiBase}${path}`, {
    method,
    headers: {
      Authorization: `Bearer ${c.apiToken}`,
      Version: c.apiVersion,
      Accept: "application/json",
      ...(body ? { "Content-Type": "application/json" } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
    cache: "no-store",
    signal: AbortSignal.timeout(12_000),
  });
}

// --- alan anahtarı → kimlik (önbellekli) ----------------------------------------------

let fieldCache: { at: number; byKey: Map<string, string> } | null = null;

export async function fieldIds(force = false): Promise<Map<string, string>> {
  if (!force && fieldCache && Date.now() - fieldCache.at < 10 * 60_000) return fieldCache.byKey;
  const res = await ghl("GET", `/locations/${cfg().locationId}/customFields`);
  if (!res.ok) throw new Error(`ghl_fields_${res.status}`);
  const body = (await res.json()) as { customFields?: { id: string; fieldKey?: string }[] };
  const byKey = new Map((body.customFields ?? []).filter((f) => f.fieldKey).map((f) => [f.fieldKey as string, f.id]));
  fieldCache = { at: Date.now(), byKey };
  return byKey;
}

// --- kişi ve hak -----------------------------------------------------------------------

export interface GhlContact {
  id: string;
  firstName?: string;
  email?: string;
  customFields?: { id: string; value?: unknown; field_value?: unknown }[];
}

export async function findContactByEmail(email: string): Promise<GhlContact | null> {
  const q = new URLSearchParams({ locationId: cfg().locationId, email: email.trim().toLowerCase() });
  const res = await ghl("GET", `/contacts/search/duplicate?${q}`);
  if (!res.ok) return null;
  const body = (await res.json().catch(() => ({}))) as { contact?: GhlContact | null };
  return body.contact?.id ? body.contact : null;
}

export async function getContact(id: string): Promise<GhlContact | null> {
  const res = await ghl("GET", `/contacts/${encodeURIComponent(id)}`);
  if (!res.ok) return null;
  const body = (await res.json().catch(() => ({}))) as { contact?: GhlContact };
  return body.contact?.id ? body.contact : null;
}

// Panel kimliği (Firebase) → GHL kişisi. Üyelerde Firebase kimliği = kişi kimliği (G1'de doğrulandı);
// değilse (ör. farklı giriş türü) yalnız DOĞRULANMIŞ Firebase e-postasıyla aranır (çağıran denetler).
export async function contactFromFirebase(uid: string, email?: string): Promise<GhlContact | null> {
  const byId = await getContact(uid).catch(() => null);
  if (byId) return byId;
  return email ? findContactByEmail(email).catch(() => null) : null;
}

export interface Entitlement {
  package: "temel" | "tam";
  temel_baslangic: string;
}

function toIsoDate(v: unknown): string | null {
  if (v === null || v === undefined || v === "") return null;
  const n = typeof v === "number" ? v : /^\d+$/.test(String(v)) ? Number(v) : NaN;
  const ms = Number.isFinite(n) ? n : Date.parse(String(v));
  return Number.isFinite(ms) ? new Date(ms).toISOString() : null;
}

// Hak: mevcut GHL alanlarından (GHL teyidi 2026-10-23) — gai__package_tier (temel | tam) + gai__purchase_date.
// Satın alma tarihi yoksa erişim yok sayılır. Test kişileri DOSYAM_TEST_CONTACT_IDS ile açılabilir (yalnız deneme).
export async function entitlement(contact: GhlContact): Promise<Entitlement | null> {
  const ids = await fieldIds();
  const val = (key: string) => {
    const id = ids.get(key);
    const f = contact.customFields?.find((c) => c.id === id);
    return f ? (f.value ?? f.field_value) : undefined;
  };
  const tier = String(val("contact.gai__package_tier") ?? "").toLowerCase();
  const start = toIsoDate(val("contact.gai__purchase_date"));
  if ((tier === "temel" || tier === "tam") && start) return { package: tier, temel_baslangic: start };
  const testIds = (process.env.DOSYAM_TEST_CONTACT_IDS ?? "").split(",").map((s) => s.trim()).filter(Boolean);
  if (testIds.includes(contact.id)) return { package: "tam", temel_baslangic: new Date().toISOString() };
  return null;
}

// --- giriş kodu e-postası (Conversations API — GHL teyidi: anlık, otomasyon değil) ---------------

const PRIMARY = "#5d47f0";

export async function sendCodeEmail(contactId: string, firstName: string, code: string): Promise<boolean> {
  const ad = firstName ? firstName.replace(/[<>&]/g, "") : "Merhaba";
  const html = `<!DOCTYPE html><html><head><meta charset="UTF-8"></head><body style="margin:0;padding:0;"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center"><table role="presentation" cellpadding="0" cellspacing="0" border="0" style="font-family:'Inter',Arial,sans-serif;color:#232323;width:100%;max-width:520px;"><tr><td style="padding:28px 20px;"><p style="font-size:15px;margin:0 0 16px;">${ad},</p><p style="font-size:15px;line-height:1.6;margin:0 0 20px;">Çalışma Dosyam'a giriş kodun:</p><p style="font-size:32px;font-weight:700;letter-spacing:8px;color:${PRIMARY};margin:0 0 20px;">${code}</p><p style="font-size:13px;color:#64748b;line-height:1.6;margin:0 0 20px;">Kod 10 dakika geçerli. Bu girişi sen istemediysen bu e-postayı yok sayabilirsin; dosyana kimse erişemez.</p><hr style="border:none;border-top:1px solid #e2e8f0;margin:0 0 12px;"><p style="font-size:11px;color:#94a3b8;margin:0;">Growtify.ai — GROWT programı · Çalışma Dosyam</p></td></tr></table></td></tr></table></body></html>`;
  const res = await ghl("POST", "/conversations/messages", {
    type: "Email",
    contactId,
    subject: `Çalışma Dosyam giriş kodun: ${code}`,
    html,
  });
  return res.ok;
}

// --- kuyruktan yazma ------------------------------------------------------------------

export class GhlWriteError extends Error {}

export async function writeFields(contactId: string, fields: Record<string, string>): Promise<void> {
  let ids = await fieldIds();
  if (Object.keys(fields).some((k) => !ids.has(k))) ids = await fieldIds(true);
  const missing = Object.keys(fields).filter((k) => !ids.has(k));
  if (missing.length) throw new GhlWriteError(`alan_yok:${missing.join(",")}`);
  const customFields = Object.entries(fields).map(([k, value]) => ({ id: ids.get(k), value }));
  const res = await ghl("PUT", `/contacts/${encodeURIComponent(contactId)}`, { customFields });
  if (!res.ok) throw new GhlWriteError(`alan_yazma_${res.status}`);
}

export async function addTag(contactId: string, tag: string): Promise<void> {
  const res = await ghl("POST", `/contacts/${encodeURIComponent(contactId)}/tags`, { tags: [tag] });
  if (!res.ok) throw new GhlWriteError(`etiket_${res.status}`);
}
