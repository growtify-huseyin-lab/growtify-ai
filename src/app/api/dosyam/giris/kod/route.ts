// POST /api/dosyam/giris/kod  {email} — kayıtlı öğrenciye 6 haneli kod gönderir.
// Cevap her durumda aynıdır: kimin kayıtlı olduğu belli edilmez (ADR K4).
import crypto from "node:crypto";
import { getClientIp } from "@/lib/rate-limit";
import { allow, dosyamApi } from "@/lib/dosyam/api";
import { entitlement, findContactByEmail, sendCodeEmail } from "@/lib/dosyam/ghl";
import { emailHash, hashHex, sameOrigin } from "@/lib/dosyam/session";

const SAME = { ok: true, mesaj: "Bu e-posta programa kayıtlıysa birkaç dakika içinde giriş kodu gelecek." };

export async function POST(req: Request) {
  if (!sameOrigin(req)) return Response.json({ ok: false }, { status: 403 });
  const body = (await req.json().catch(() => ({}))) as { email?: string };
  const email = (body.email ?? "").trim().toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 200) {
    return Response.json({ ok: false, mesaj: "Geçerli bir e-posta yaz." }, { status: 400 });
  }
  const eh = emailHash(email);
  const ip = hashHex(getClientIp(req));
  if (!(await allow(`kod:ip:${ip}`, 10, 3600)) || !(await allow(`kod:e:${eh}`, 3, 900))) {
    return Response.json({ ok: false, mesaj: "Çok fazla deneme. Biraz sonra tekrar dene." }, { status: 429 });
  }
  const contact = await findContactByEmail(email).catch(() => null);
  if (contact && (await entitlement(contact).catch(() => null))) {
    const code = String(crypto.randomInt(0, 1_000_000)).padStart(6, "0");
    const saved = await dosyamApi("POST", "/v1/auth/code", { body: { email_hash: eh, code_hash: hashHex(`${eh}:${code}`), contact_id: contact.id } });
    if (saved.body.ok) await sendCodeEmail(contact.id, contact.firstName ?? "", code).catch(() => false);
  }
  return Response.json(SAME);
}
