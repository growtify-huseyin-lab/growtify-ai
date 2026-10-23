// /dosyam — Çalışma Dosyam ana sayfası (giriş yoksa giriş formu). Yalnız Türkçe, dizine eklenmez.
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { dosyamApi, type Submission } from "@/lib/dosyam/api";
import { modules } from "@/lib/dosyam/sections";
import { currentStudent } from "@/lib/dosyam/session";
import GirisForm from "@/components/dosyam/GirisForm";
import CikisButton from "@/components/dosyam/CikisButton";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Çalışma Dosyam", robots: { index: false, follow: false } };

const ROZET: Record<string, string> = { onayli: "✓ Onaylı", taslak: "Taslak" };

export default async function DosyamPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<Record<string, string | undefined>>;
}) {
  const { locale } = await params;
  if (locale !== "tr") notFound();
  const sp = await searchParams;
  // Yayın ortamında Worker bağlantısı tanımlı değilse (kurulum bitmeden) sayfa çökmesin.
  if (!process.env.DOSYAM_API_URL || !process.env.DOSYAM_HMAC_KEY) {
    return (
      <main className="mx-auto max-w-md px-4 py-16">
        <h1 className="mb-3 text-3xl font-bold text-[#232323]">Çalışma Dosyam</h1>
        <p className="text-gray-600">Çok yakında burada.</p>
      </main>
    );
  }
  const student = await currentStudent();
  if (!student) return <GirisForm panelHata={sp.giris === "panel"} />;

  const r = await dosyamApi<{ sections: Submission[] }>("GET", "/v1/me/sections", { student: student.id });
  const byId = new Map((r.body.sections ?? []).map((s) => [s.section_id, s]));
  const mods = modules();
  const toplam = mods.reduce((t, m) => t + m.sections.length, 0);
  const onayli = [...byId.values()].filter((s) => s.status === "onayli").length;

  return (
    <main className="mx-auto max-w-2xl px-4 py-10">
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[#232323]">Çalışma Dosyam</h1>
          <p className="mt-1 text-gray-600">
            {student.first_name ? `${student.first_name}, ` : ""}
            {onayli}/{toplam} bölüm onaylı.
          </p>
        </div>
        <CikisButton />
      </div>
      {student.mode !== "aktif" && (
        <p className="mb-6 rounded-xl bg-amber-50 p-4 text-sm text-amber-800">
          Dosyan salt okunur: görüntüleyebilir ve kopyalayabilirsin.{" "}
          {student.package === "temel" ? "Tam pakete geçince yeniden yazabilirsin." : ""}
        </p>
      )}
      <Link href="/dosyam/buyume-dongum" className="mb-8 block rounded-2xl border border-[#5d47f0]/30 bg-[#5d47f0]/5 p-4">
        <p className="font-semibold text-[#5d47f0]">Büyüme Döngüm →</p>
        <p className="text-sm text-gray-600">Her hafta sayıların: kaç doğru kişiye değdin, kaç ilgi geldi, kaç müşteri kazandın.</p>
      </Link>
      {mods.map((m) => (
        <section key={m.modul} className="mb-8">
          <h2 className="mb-3 text-lg font-bold text-[#232323]">{m.modul}</h2>
          <ul className="divide-y divide-gray-100 rounded-2xl border border-gray-200">
            {m.sections.map((s) => {
              const sub = byId.get(s.anahtar);
              return (
                <li key={s.anahtar}>
                  <Link href={`/dosyam/${s.anahtar}`} className="flex items-center justify-between gap-3 px-4 py-3 hover:bg-gray-50">
                    <span>
                      <span className="text-xs text-gray-400">{Array.isArray(s.ders) ? s.ders[0] : s.ders}</span>{" "}
                      <span className="text-[#232323]">{s.baslik}</span>
                    </span>
                    <span className={`shrink-0 text-xs ${sub?.status === "onayli" ? "text-green-700" : "text-gray-400"}`}>
                      {sub ? ROZET[sub.status] : "Boş"}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>
      ))}
    </main>
  );
}
