// POST /api/dosyam/giris/dogrula  {ch, kod} — kodu doğrular, oturum açar. ch = e-postanın hash'i (kod adımında verilir).
import { getClientIp } from "@/lib/rate-limit";
import { allow, dosyamApi } from "@/lib/dosyam/api";
import { getContact } from "@/lib/dosyam/ghl";
import { loginContact } from "@/lib/dosyam/login";
import { hashHex, sameOrigin } from "@/lib/dosyam/session";

const MESAJ: Record<string, string> = {
  yok: "Kod bulunamadı. Yeni kod iste.",
  suresi_doldu: "Kodun süresi doldu. Yeni kod iste.",
  hatali: "Kod hatalı. Tekrar dene.",
  deneme_bitti: "Deneme hakkın doldu. Yeni kod iste.",
};

export async function POST(req: Request) {
  if (!sameOrigin(req)) return Response.json({ ok: false }, { status: 403 });
  const body = (await req.json().catch(() => ({}))) as { ch?: string; kod?: string };
  const ch = (body.ch ?? "").toLowerCase();
  const kod = (body.kod ?? "").replace(/\D/g, "");
  if (!/^[0-9a-f]{64}$/.test(ch) || kod.length !== 6) return Response.json({ ok: false, mesaj: "6 haneli kodu yaz." }, { status: 400 });
  if (!(await allow(`dogrula:ip:${hashHex(getClientIp(req))}`, 30, 3600))) {
    return Response.json({ ok: false, mesaj: "Çok fazla deneme. Biraz sonra tekrar dene." }, { status: 429 });
  }
  const r = await dosyamApi<{ contact_id?: string; reason?: string }>("POST", "/v1/auth/verify", {
    body: { email_hash: ch, code_hash: hashHex(`${ch}:${kod}`) },
  });
  if (!r.body.ok || !r.body.contact_id) {
    return Response.json({ ok: false, mesaj: MESAJ[r.body.reason ?? ""] ?? "Giriş yapılamadı." }, { status: 400 });
  }
  const contact = await getContact(r.body.contact_id);
  const login = contact ? await loginContact(contact) : { ok: false as const, reason: "hata" as const };
  if (!login.ok) {
    const mesaj = login.reason === "kayitli_degil" ? "Bu e-posta programa kayıtlı görünmüyor." : "Giriş yapılamadı, tekrar dene.";
    return Response.json({ ok: false, mesaj }, { status: 400 });
  }
  return Response.json({ ok: true });
}
