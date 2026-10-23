// POST /api/dosyam/hak  {ft} — panel düğmesi için: bu üye programa kayıtlı mı? Yalnız {ok: true|false} döner.
// panel.growtify.ai'den çağrılır (text/plain gövde → ön kontrol isteği gerekmez).
import { verifyFirebaseIdToken } from "@/lib/g1/firebase-verify";
import { getClientIp } from "@/lib/rate-limit";
import { allow } from "@/lib/dosyam/api";
import { contactFromFirebase, entitlement } from "@/lib/dosyam/ghl";
import { hashHex } from "@/lib/dosyam/session";

const CORS = { "Access-Control-Allow-Origin": "https://panel.growtify.ai", Vary: "Origin" };

export async function POST(req: Request) {
  const body = (await req.json().catch(() => ({}))) as { ft?: string };
  if (!(await allow(`hak:ip:${hashHex(getClientIp(req))}`, 60, 3600))) {
    return Response.json({ ok: false }, { status: 429, headers: CORS });
  }
  const fb = await verifyFirebaseIdToken(body.ft ?? "");
  if (!fb.ok || !fb.uid) {
    console.log(`[dosyam] hak: kimlik doğrulanamadı (${fb.reason ?? "?"})`);
    return Response.json({ ok: false }, { headers: CORS });
  }
  const contact = await contactFromFirebase(fb.uid, fb.emailVerified ? fb.email : undefined, fb.role);
  const ent = contact ? await entitlement(contact).catch(() => null) : null;
  console.log(`[dosyam] hak: rol ${fb.role ?? "-"}, kişi ${contact ? "bulundu" : "yok"}, hak ${ent ? ent.package : "yok"}`);
  return Response.json({ ok: !!ent }, { headers: { ...CORS, "Cache-Control": "no-store" } });
}
