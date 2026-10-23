// GET  /api/dosyam/asistan/:bolum — sohbetler, son sohbetin mesajları, kota, ön koşul
// POST /api/dosyam/asistan/:bolum {sohbet_id?, yeni?, mesaj?} — yeni sohbet ya da yeni mesaj
// Korumalar: giriş süzgeci (kişisel veri, sızdırma girişimi) modele gitmeden; çıkış süzgeci assistant.ts'de.
export const maxDuration = 60;

import { dosyamApi } from "@/lib/dosyam/api";
import { chat } from "@/lib/dosyam/assistant";
import {
  approvedDeps,
  currentDraft,
  getChat,
  quota,
  visibleMessages,
  type HistoryMsg,
} from "@/lib/dosyam/assistant-data";
import { checkUserInput } from "@/lib/dosyam/guard";
import { dependencyMissing, getPrompt, hasAssistant, openingMessage } from "@/lib/dosyam/prompts";
import { getSection } from "@/lib/dosyam/sections";
import { currentStudent, sameOrigin } from "@/lib/dosyam/session";

const err = (status: number, mesaj: string) => Response.json({ ok: false, mesaj }, { status });

export async function GET(_req: Request, { params }: { params: Promise<{ bolum: string }> }) {
  const { bolum } = await params;
  const student = await currentStudent();
  if (!student) return err(401, "Giriş yap.");
  if (!hasAssistant(bolum)) return err(404, "Bu bölümde asistan yok.");
  const p = getPrompt(bolum)!;
  const [list, approved, kota] = await Promise.all([
    dosyamApi<{ chats: { id: string; created_at: string }[] }>("GET", `/v1/me/sections/${bolum}/chats`, { student: student.id }),
    approvedDeps(student, bolum),
    quota(student),
  ]);
  const chats = list.body.chats ?? [];
  const son = chats[0] ? await getChat(student, chats[0].id) : null;
  return Response.json({
    ok: true,
    sohbetler: chats.map((c) => ({ id: c.id, tarih: c.created_at })),
    aktif: son && chats[0] ? { id: chats[0].id, mesajlar: visibleMessages(son.messages) } : null,
    kota,
    onkosul: dependencyMissing(bolum, approved),
    yontem: p.yontem?.ogrenciye_aciklama ?? null,
    yontemi_gor: p.yontemi_gor ?? [],
    kopyala: typeof p.kendi_yapay_zekana_kopyala === "string" ? p.kendi_yapay_zekana_kopyala : (p.kendi_yapay_zekana_kopyala?.kurma ?? null),
    salt_okunur: student.mode !== "aktif",
  });
}

export async function POST(req: Request, { params }: { params: Promise<{ bolum: string }> }) {
  if (!sameOrigin(req)) return Response.json({ ok: false }, { status: 403 });
  const { bolum } = await params;
  const student = await currentStudent();
  if (!student) return err(401, "Giriş yap.");
  const section = getSection(bolum);
  if (!section || !hasAssistant(bolum)) return err(404, "Bu bölümde asistan yok.");
  if (student.mode !== "aktif") return err(409, "Dosyan salt okunur; asistan kapalı.");
  const body = (await req.json().catch(() => ({}))) as { sohbet_id?: string; yeni?: boolean; mesaj?: string };

  const approved = await approvedDeps(student, bolum);
  const onkosul = dependencyMissing(bolum, approved);
  if (onkosul) return err(409, onkosul);

  // Yeni sohbet: açılış mesajı modelsiz (sabit metin), kota harcamaz.
  if (body.yeni || !body.sohbet_id) {
    const c = await dosyamApi<{ id?: string; error?: string }>("POST", `/v1/me/sections/${bolum}/chats`, { student: student.id, body: {} });
    if (!c.body.ok || !c.body.id) {
      return err(409, c.body.error === "sohbet_siniri" ? "Bu bölümde 5 sohbet hakkını kullandın. Eski bir sohbeti silebilir ya da formu kendin doldurabilirsin." : "Sohbet açılamadı.");
    }
    const acilis = openingMessage(bolum, approved);
    await dosyamApi("POST", `/v1/me/chats/${c.body.id}/turn`, {
      student: student.id,
      body: {
        expected_seq: 1,
        messages: [
          { role: "user", content: "Başlayalım." },
          { role: "assistant", content: [{ type: "text", text: acilis }] },
        ],
        usage: { input_tokens: 0, output_tokens: 0, cost_micro: 0, counts: false },
      },
    });
    return Response.json({ ok: true, sohbet_id: c.body.id, mesajlar: [{ rol: "assistant", metin: acilis }] });
  }

  // Yeni mesaj
  const mesaj = String(body.mesaj ?? "");
  const giris = checkUserInput(mesaj);
  if (!giris.ok) {
    if (giris.kind === "girisim") console.log(JSON.stringify({ evt: "asistan_giris_engellendi", bolum }));
    // Engellenen mesaj ne modele gider ne geçmişe yazılır; kota harcamaz.
    return Response.json({ ok: true, engellendi: true, uyari: giris.kind !== "girisim", metin: giris.mesaj });
  }
  const kota = await quota(student);
  if (kota.kapali) return err(503, "Asistan şu an geçici olarak kapalı. Formu kendin doldurabilirsin; birazdan tekrar dene.");
  if (kota.kalan <= 0) return err(429, "Bugünlük mesaj hakkın doldu (günde 60). Yarın devam edebilirsin; formu kendin de doldurabilirsin.");

  const sohbet = await getChat(student, String(body.sohbet_id));
  if (!sohbet || sohbet.section_id !== bolum) return err(404, "Sohbet bulunamadı.");
  const history: HistoryMsg[] = sohbet.messages.map((m) => ({ role: m.role, content: m.content }));
  const last = sohbet.messages.length ? sohbet.messages[sohbet.messages.length - 1].seq : 0;

  let sonuc;
  try {
    sonuc = await chat(section, history, mesaj.trim(), {
      firstName: student.first_name,
      approved,
      draft: await currentDraft(student, bolum),
    });
  } catch (e) {
    console.log(JSON.stringify({ evt: "asistan_hata", bolum, tur: (e as Error).name }));
    return err(502, "Asistan şu an cevap veremedi. Birazdan tekrar dene.");
  }
  const kayit = await dosyamApi("POST", `/v1/me/chats/${sohbet_id(body)}/turn`, {
    student: student.id,
    body: {
      expected_seq: last + 1,
      messages: [
        { role: "user", content: mesaj.trim() },
        { role: "assistant", content: sonuc.content },
      ],
      usage: { ...sonuc.usage, counts: true },
    },
  });
  if (!kayit.body.ok) return err(409, "Bu sohbet başka bir sekmede ilerlemiş. Sayfayı yenile.");
  return Response.json({ ok: true, metin: sonuc.text, engellendi: sonuc.blocked, kalan: Math.max(0, kota.kalan - 1) });
}

function sohbet_id(body: { sohbet_id?: string }): string {
  return encodeURIComponent(String(body.sohbet_id));
}
