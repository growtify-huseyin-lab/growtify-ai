// /dosyam/buyume-dongum — haftalık sayılar (eski adı Saha Tablosu; CEO 2026-10-23).
import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { dosyamApi } from "@/lib/dosyam/api";
import { getSection } from "@/lib/dosyam/sections";
import { currentStudent } from "@/lib/dosyam/session";
import BuyumeForm from "@/components/dosyam/BuyumeForm";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Büyüme Döngüm", robots: { index: false, follow: false } };

export default async function BuyumePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (locale !== "tr") notFound();
  const student = await currentStudent();
  if (!student) redirect("/dosyam");
  const section = getSection("BUYUME_DONGUM");
  if (!section) notFound();
  const r = await dosyamApi<{ weeks: { week_start: string; data: Record<string, number>; note: string | null }[] }>("GET", "/v1/me/weeks", {
    student: student.id,
  });
  return (
    <main className="mx-auto max-w-2xl px-4 py-10">
      <Link href="/dosyam" className="text-sm text-gray-500">
        ← Çalışma Dosyam
      </Link>
      <h1 className="mt-4 mb-2 text-2xl font-bold text-[#232323]">Büyüme Döngüm</h1>
      <p className="mb-6 text-gray-600">Her satır bir hafta. Rakamı bilmiyorsan tahmin yaz; önemli olan her hafta yazmak.</p>
      <BuyumeForm fields={section.alanlar} weeks={r.body.weeks ?? []} readOnly={student.mode !== "aktif" && student.mode !== "olcum"} />
    </main>
  );
}
