// POST /api/dosyam/hak  {k} — panel düğmesi için: bu kişi programa kayıtlı mı? Yalnız {ok: true|false} döner.
// k = paneldeki kişi kimliği (ipucu). Yalnız düğmenin görünürlüğünü belirler; giriş için kod gerekir.
// panel.growtify.ai'den çağrılır (text/plain gövde → ön kontrol isteği gerekmez).
import { getClientIp } from "@/lib/rate-limit";
import { allow } from "@/lib/dosyam/api";
import { entitlement, getContact } from "@/lib/dosyam/ghl";
import { hashHex } from "@/lib/dosyam/session";

const CORS = { "Access-Control-Allow-Origin": "https://panel.growtify.ai", Vary: "Origin" };

export async function POST(req: Request) {
  const body = (await req.json().catch(() => ({}))) as { k?: string };
  const k = (body.k ?? "").trim();
  if (!/^[A-Za-z0-9]{10,40}$/.test(k)) return Response.json({ ok: false }, { headers: CORS });
  if (!(await allow(`hak:ip:${hashHex(getClientIp(req))}`, 60, 3600))) {
    return Response.json({ ok: false }, { status: 429, headers: CORS });
  }
  const contact = await getContact(k).catch(() => null);
  const ent = contact ? await entitlement(contact).catch(() => null) : null;
  return Response.json({ ok: !!ent }, { headers: { ...CORS, "Cache-Control": "no-store" } });
}
