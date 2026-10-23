// /dosyam/:bolum — bir bölümün formu (taslak → onay).
import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { dosyamApi, type Submission } from "@/lib/dosyam/api";
import { editableFields, getSection, loadSections, renderSection, type Clean } from "@/lib/dosyam/sections";
import { currentStudent } from "@/lib/dosyam/session";
import BolumForm from "@/components/dosyam/BolumForm";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Çalışma Dosyam", robots: { index: false, follow: false } };

export default async function BolumPage({ params }: { params: Promise<{ locale: string; bolum: string }> }) {
  const { locale, bolum } = await params;
  if (locale !== "tr") notFound();
  const section = getSection(bolum);
  if (!section || bolum === "BUYUME_DONGUM") notFound();
  const student = await currentStudent();
  if (!student) redirect("/dosyam");

  const [cur, all] = await Promise.all([
    dosyamApi<{ latest: Submission | null; approved: Submission | null }>("GET", `/v1/me/sections/${bolum}`, { student: student.id }),
    dosyamApi<{ sections: Submission[] }>("GET", "/v1/me/sections", { student: student.id }),
  ]);
  const latest = cur.body.latest;

  // Referans alanları: başka bölümlerin son ONAYLI değerleri ("R2.kime_kime_degil").
  const refs: Record<string, string> = {};
  const wanted = new Set(section.alanlar.flatMap((f) => f.kaynak_alanlar ?? []));
  if (wanted.size) {
    const ids = new Set([...wanted].map((k) => k.split(".")[0]));
    for (const id of ids) {
      const def = loadSections().find((s) => s.anahtar === id);
      if (!def) continue;
      const r = await dosyamApi<{ approved: Submission | null }>("GET", `/v1/me/sections/${id}`, { student: student.id });
      const d = (r.body.approved?.data ?? {}) as Clean;
      for (const k of wanted) {
        const [sid, fk] = k.split(".");
        if (sid === id && fk) refs[k] = renderSection(def, d, [fk]);
      }
    }
  }
  const eksikBagimli = (section.bagimli ?? []).filter(
    (b) => !(all.body.sections ?? []).some((s) => s.section_id === b && s.status === "onayli"),
  );

  return (
    <main className="mx-auto max-w-2xl px-4 py-10">
      <Link href="/dosyam" className="text-sm text-gray-500">
        ← Çalışma Dosyam
      </Link>
      <p className="mt-4 text-xs uppercase tracking-wide text-gray-400">
        {section.modul} · {Array.isArray(section.ders) ? section.ders.join(", ") : section.ders}
      </p>
      <h1 className="mb-2 text-2xl font-bold text-[#232323]">{section.baslik}</h1>
      {eksikBagimli.length > 0 && (
        <p className="mb-6 rounded-xl bg-blue-50 p-3 text-sm text-blue-800">
          Bu bölüm şunlara dayanıyor: {eksikBagimli.join(", ")}. Önce onları onaylarsan burası daha kolay olur.
        </p>
      )}
      <BolumForm
        id={section.anahtar}
        fields={[...section.alanlar.filter((f) => f.tur === "referans"), ...editableFields(section)]}
        refs={refs}
        initial={(latest?.data ?? {}) as Record<string, unknown>}
        version={latest?.version ?? 0}
        status={latest?.status ?? null}
        approvedAt={cur.body.approved?.approved_at ?? null}
        readOnly={student.mode !== "aktif" || !!section.salt_okunur}
      />
    </main>
  );
}
