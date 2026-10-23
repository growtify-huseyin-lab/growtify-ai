// POST /api/dosyam/giris/ipucu  {k} — panelden gelen öğrenci için: k = paneldeki kişi kimliği (yalnız ipucu,
// kimlik kanıtı DEĞİL). Kişi programa kayıtlıysa kod KENDİ e-postasına gider; ekrana yalnız maskeli adres döner.
// Kod girilmeden oturum açılmaz — ipucu yalnız e-posta yazma adımını atlatır.
import { getClientIp } from "@/lib/rate-limit";
import { allow } from "@/lib/dosyam/api";
import { issueCode, maskEmail } from "@/lib/dosyam/code";
import { entitlement, getContact } from "@/lib/dosyam/ghl";
import { hashHex, sameOrigin } from "@/lib/dosyam/session";

export async function POST(req: Request) {
  if (!sameOrigin(req)) return Response.json({ ok: false }, { status: 403 });
  const body = (await req.json().catch(() => ({}))) as { k?: string };
  const k = (body.k ?? "").trim();
  if (!/^[A-Za-z0-9]{10,40}$/.test(k)) return Response.json({ ok: false });
  if (!(await allow(`ipucu:ip:${hashHex(getClientIp(req))}`, 10, 3600)) || !(await allow(`ipucu:k:${k}`, 3, 900))) {
    return Response.json({ ok: false, mesaj: "Çok fazla deneme. Biraz sonra tekrar dene." }, { status: 429 });
  }
  const contact = await getContact(k).catch(() => null);
  if (!contact?.email || !(await entitlement(contact).catch(() => null))) return Response.json({ ok: false });
  const ch = await issueCode(contact);
  return ch ? Response.json({ ok: true, ch, maskeli: maskEmail(contact.email) }) : Response.json({ ok: false });
}
