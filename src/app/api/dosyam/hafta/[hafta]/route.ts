// PUT /api/dosyam/hafta/:hafta {data, note} — Büyüme Döngüm haftası (hafta = pazartesi, YYYY-MM-DD).
// GHL özel nesnesi CEO panelde kurulunca kuyruğa eklenecek; şimdilik yalnız dosyaya yazılır.
import { dosyamApi } from "@/lib/dosyam/api";
import { cleanData, getSection } from "@/lib/dosyam/sections";
import { currentStudent, sameOrigin } from "@/lib/dosyam/session";

const KAYNAKLAR = ["kaynak_cekme", "kaynak_gitme", "kaynak_odunc", "kaynak_referans", "kaynak_uyuyan"];

export async function PUT(req: Request, { params }: { params: Promise<{ hafta: string }> }) {
  if (!sameOrigin(req)) return Response.json({ ok: false }, { status: 403 });
  const { hafta } = await params;
  const student = await currentStudent();
  if (!student) return Response.json({ ok: false }, { status: 401 });
  const d = new Date(`${hafta}T00:00:00Z`);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(hafta) || Number.isNaN(d.getTime()) || d.getUTCDay() !== 1) {
    return Response.json({ ok: false, mesaj: "Hafta pazartesi günü olmalı." }, { status: 400 });
  }
  const section = getSection("BUYUME_DONGUM");
  if (!section) return Response.json({ ok: false }, { status: 500 });
  const body = (await req.json().catch(() => ({}))) as { data?: unknown; note?: string };
  const data = cleanData(section, body.data);
  delete data.hafta_baslangici;
  delete data.not;
  // "Gelen ilgi" = beş kaynağın toplamı (Course kararı); öğrenci ayrıca girmez.
  data.gelen_ilgi = KAYNAKLAR.reduce((t, k) => t + (typeof data[k] === "number" ? (data[k] as number) : 0), 0);
  const note = typeof body.note === "string" ? body.note.slice(0, 600) : null;
  const r = await dosyamApi("PUT", `/v1/me/weeks/${hafta}`, { student: student.id, body: { data, note, outbox: [] } });
  if (!r.body.ok) {
    const mesaj = r.body.error === "salt_okunur" ? "Dosyan şu an salt okunur." : "Kaydedilemedi.";
    return Response.json({ ok: false, mesaj }, { status: r.status });
  }
  return Response.json({ ok: true, gelen_ilgi: data.gelen_ilgi });
}
