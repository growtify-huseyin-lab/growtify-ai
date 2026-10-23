// POST /api/dosyam/bolum/:id/onay {version} — son taslağı onaylar; GHL'e yazılacakları kuyruğa koyar (mail yok — CEO).
import { after } from "next/server";
import { dosyamApi, type Submission } from "@/lib/dosyam/api";
import { processOutbox } from "@/lib/dosyam/outbox";
import { getSection, missingRequired, outboxFor } from "@/lib/dosyam/sections";
import { currentStudent, sameOrigin } from "@/lib/dosyam/session";

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!sameOrigin(req)) return Response.json({ ok: false }, { status: 403 });
  const { id } = await params;
  const section = getSection(id);
  const student = await currentStudent();
  if (!student) return Response.json({ ok: false }, { status: 401 });
  if (!section || section.salt_okunur) return Response.json({ ok: false }, { status: 404 });
  const body = (await req.json().catch(() => ({}))) as { version?: number };

  const cur = await dosyamApi<{ latest: Submission | null }>("GET", `/v1/me/sections/${encodeURIComponent(id)}`, { student: student.id });
  const latest = cur.body.latest;
  if (!latest || latest.status !== "taslak" || latest.version !== body.version) {
    return Response.json({ ok: false, mesaj: "Onaylanacak taslak bulunamadı. Sayfayı yenile." }, { status: 409 });
  }
  const missing = missingRequired(section, latest.data);
  if (missing.length) {
    return Response.json({ ok: false, mesaj: "Eksik alanlar var.", eksik: missing.map((f) => f.anahtar) }, { status: 400 });
  }
  const all = await dosyamApi<{ sections: Submission[] }>("GET", "/v1/me/sections", { student: student.id });
  const approved = new Set((all.body.sections ?? []).filter((s) => s.status === "onayli" || s.section_id === id).map((s) => s.section_id));
  const outbox = outboxFor(section, latest.version, latest.data, approved);
  const r = await dosyamApi("POST", `/v1/me/sections/${encodeURIComponent(id)}/approve`, {
    student: student.id,
    body: { version: latest.version, outbox },
    idem: `onay:${id}:v${latest.version}`,
  });
  if (!r.body.ok) {
    const mesaj = r.body.error === "salt_okunur" ? "Dosyan şu an salt okunur." : "Onaylanamadı, sayfayı yenile.";
    return Response.json({ ok: false, mesaj }, { status: r.status });
  }
  if (outbox.length) after(() => processOutbox(5).catch(() => undefined));
  return Response.json(r.body);
}
