// POST /api/dosyam/asistan/:bolum/taslak {sohbet_id} — sohbetten form alanlarına taslak. Kaydetmez: öğrenci forma alır,
// kontrol eder, kendisi kaydeder ve onaylar.
export const maxDuration = 60;

import { dosyamApi } from "@/lib/dosyam/api";
import { draft } from "@/lib/dosyam/assistant";
import { approvedDeps, displayText, getChat, quota } from "@/lib/dosyam/assistant-data";
import { hasAssistant } from "@/lib/dosyam/prompts";
import { getSection } from "@/lib/dosyam/sections";
import { currentStudent, sameOrigin } from "@/lib/dosyam/session";

const err = (status: number, mesaj: string) => Response.json({ ok: false, mesaj }, { status });

export async function POST(req: Request, { params }: { params: Promise<{ bolum: string }> }) {
  if (!sameOrigin(req)) return Response.json({ ok: false }, { status: 403 });
  const { bolum } = await params;
  const student = await currentStudent();
  if (!student) return err(401, "Giriş yap.");
  const section = getSection(bolum);
  if (!section || !hasAssistant(bolum)) return err(404, "Bu bölümde asistan yok.");
  if (student.mode !== "aktif") return err(409, "Dosyan salt okunur.");
  const body = (await req.json().catch(() => ({}))) as { sohbet_id?: string };
  const sohbet = await getChat(student, String(body.sohbet_id ?? ""));
  if (!sohbet || sohbet.section_id !== bolum) return err(404, "Sohbet bulunamadı.");
  const transcript = sohbet.messages
    .filter((m) => !(m.seq === 1 && m.role === "user"))
    .map((m) => ({ role: m.role, text: displayText(m.content) }))
    .filter((m) => m.text);
  if (transcript.filter((m) => m.role === "user").length < 2) return err(400, "Taslak için önce biraz sohbet edelim.");
  const kota = await quota(student);
  if (kota.kapali) return err(503, "Asistan şu an geçici olarak kapalı.");
  try {
    const r = await draft(section, transcript, { approved: await approvedDeps(student, bolum) });
    await dosyamApi("POST", "/v1/me/usage/add", { student: student.id, body: r.usage });
    return Response.json({ ok: true, veri: r.data, uyarilar: r.uyarilar });
  } catch (e) {
    console.log(JSON.stringify({ evt: "asistan_taslak_hata", bolum, tur: (e as Error).name }));
    return err(502, "Taslak şu an çıkarılamadı. Birazdan tekrar dene.");
  }
}
