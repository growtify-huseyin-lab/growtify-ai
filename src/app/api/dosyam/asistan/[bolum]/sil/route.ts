// POST /api/dosyam/asistan/:bolum/sil {sohbet_id} — öğrenci kendi sohbetini kalıcı siler (KVKK; CEO 2026-10-23).
import { dosyamApi } from "@/lib/dosyam/api";
import { currentStudent, sameOrigin } from "@/lib/dosyam/session";

export async function POST(req: Request) {
  if (!sameOrigin(req)) return Response.json({ ok: false }, { status: 403 });
  const student = await currentStudent();
  if (!student) return Response.json({ ok: false }, { status: 401 });
  const body = (await req.json().catch(() => ({}))) as { sohbet_id?: string };
  if (!/^[0-9a-f-]{36}$/.test(body.sohbet_id ?? "")) return Response.json({ ok: false }, { status: 400 });
  const r = await dosyamApi("POST", `/v1/me/chats/${body.sohbet_id}/delete`, { student: student.id, body: {} });
  return Response.json({ ok: r.body.ok }, { status: r.status });
}
