// POST /api/dosyam/giris/kod  {email} — kayıtlı öğrenciye 6 haneli kod gönderir.
// Cevap her durumda aynıdır: kimin kayıtlı olduğu belli edilmez (ADR K4). ch = e-postanın hash'i (doğrulamada taşınır).
import { getClientIp } from "@/lib/rate-limit";
import { allow } from "@/lib/dosyam/api";
import { issueCode } from "@/lib/dosyam/code";
import { entitlement, findContactByEmail } from "@/lib/dosyam/ghl";
import { emailHash, hashHex, sameOrigin } from "@/lib/dosyam/session";

export async function POST(req: Request) {
  if (!sameOrigin(req)) return Response.json({ ok: false }, { status: 403 });
  const body = (await req.json().catch(() => ({}))) as { email?: string };
  const email = (body.email ?? "").trim().toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 200) {
    return Response.json({ ok: false, mesaj: "Geçerli bir e-posta yaz." }, { status: 400 });
  }
  const ch = emailHash(email);
  const ip = hashHex(getClientIp(req));
  if (!(await allow(`kod:ip:${ip}`, 10, 3600)) || !(await allow(`kod:e:${ch}`, 3, 900))) {
    return Response.json({ ok: false, mesaj: "Çok fazla deneme. Biraz sonra tekrar dene." }, { status: 429 });
  }
  const contact = await findContactByEmail(email).catch(() => null);
  if (contact && (await entitlement(contact).catch(() => null))) await issueCode({ ...contact, email });
  return Response.json({ ok: true, ch, mesaj: "Bu e-posta programa kayıtlıysa birkaç dakika içinde giriş kodu gelecek." });
}
