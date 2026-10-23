// GET  /api/dosyam/bolum/:id — bölümün son sürümü + son onaylı sürüm
// PUT  /api/dosyam/bolum/:id {data, expected_version?} — taslak kaydet
import { dosyamApi } from "@/lib/dosyam/api";
import { cleanData, getSection } from "@/lib/dosyam/sections";
import { currentStudent, sameOrigin } from "@/lib/dosyam/session";

const HATA: Record<string, string> = {
  salt_okunur: "Dosyan şu an salt okunur; değişiklik kaydedilemez.",
  surum_cakismasi: "Bu bölüm başka bir sekmede değişmiş. Sayfayı yenile.",
};

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const student = await currentStudent();
  if (!student) return Response.json({ ok: false }, { status: 401 });
  if (!getSection(id)) return Response.json({ ok: false }, { status: 404 });
  const r = await dosyamApi("GET", `/v1/me/sections/${encodeURIComponent(id)}`, { student: student.id });
  return Response.json(r.body, { status: r.status });
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!sameOrigin(req)) return Response.json({ ok: false }, { status: 403 });
  const { id } = await params;
  const section = getSection(id);
  const student = await currentStudent();
  if (!student) return Response.json({ ok: false }, { status: 401 });
  if (!section || section.salt_okunur) return Response.json({ ok: false }, { status: 404 });
  const body = (await req.json().catch(() => ({}))) as { data?: unknown; expected_version?: number };
  const r = await dosyamApi("PUT", `/v1/me/sections/${encodeURIComponent(id)}`, {
    student: student.id,
    body: { data: cleanData(section, body.data), expected_version: body.expected_version },
  });
  if (!r.body.ok) return Response.json({ ok: false, mesaj: HATA[r.body.error ?? ""] ?? "Kaydedilemedi." }, { status: r.status });
  return Response.json(r.body);
}
