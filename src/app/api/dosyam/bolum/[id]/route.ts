// GET  /api/dosyam/bolum/:id — bölümün son sürümü + son onaylı sürüm
// PUT  /api/dosyam/bolum/:id {data, expected_version?} — taslak kaydet
import { dosyamApi, type Submission } from "@/lib/dosyam/api";
import { cleanData, editableFields, getSection, laterFields } from "@/lib/dosyam/sections";
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
  let data = cleanData(section, body.data);
  // Tarih alanında "en geç programın N. günü" sınırı (T5 kontrol günü = 58. gün, ölçüm penceresinin son günü).
  for (const f of editableFields(section)) {
    if (f.tur !== "tarih" || !f.en_gec_gun || typeof data[f.anahtar] !== "string") continue;
    const son = Date.parse(student.temel_baslangic) + (f.en_gec_gun - 1) * 86_400_000;
    if (Date.parse(String(data[f.anahtar])) > son) {
      const tarih = new Date(son).toLocaleDateString("tr-TR");
      return Response.json({ ok: false, mesaj: `${f.etiket}: en geç ${tarih} olabilir (programın ${f.en_gec_gun}. günü).` }, { status: 400 });
    }
  }
  if (student.mode === "olcum") {
    // Ölçüm penceresi: yalnız sonradan doldurulan alanlar değişir; geri kalanı kayıtlı hâlinden alınır.
    const later = laterFields(section).map((f) => f.anahtar);
    if (!later.length) return Response.json({ ok: false, mesaj: HATA.salt_okunur }, { status: 409 });
    const cur = await dosyamApi<{ latest: Submission | null }>("GET", `/v1/me/sections/${encodeURIComponent(id)}`, { student: student.id });
    const base = { ...(cur.body.latest?.data ?? {}) };
    for (const k of later) {
      if (data[k] === undefined) delete base[k];
      else base[k] = data[k];
    }
    data = base;
  }
  const r = await dosyamApi("PUT", `/v1/me/sections/${encodeURIComponent(id)}`, {
    student: student.id,
    body: { data, expected_version: body.expected_version },
  });
  if (!r.body.ok) return Response.json({ ok: false, mesaj: HATA[r.body.error ?? ""] ?? "Kaydedilemedi." }, { status: r.status });
  return Response.json(r.body);
}
