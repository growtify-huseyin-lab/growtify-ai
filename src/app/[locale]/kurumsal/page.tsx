import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { KurumsalHero } from "@/components/sections/KurumsalHero";
import { KurumsalProblems } from "@/components/sections/KurumsalProblems";
import { KurumsalGROWT } from "@/components/sections/KurumsalGROWT";
import { KurumsalServices } from "@/components/sections/KurumsalServices";
import { KurumsalProcess } from "@/components/sections/KurumsalProcess";
import { KurumsalStats } from "@/components/sections/KurumsalStats";
import { KurumsalSectors } from "@/components/sections/KurumsalSectors";
import { KurumsalFAQ } from "@/components/sections/KurumsalFAQ";
import { KurumsalCTA } from "@/components/sections/KurumsalCTA";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const en = locale === "en";
  return {
    title: en
      ? "Corporate AI Transformation — Growtify.ai"
      : "Kurumsal AI Dönüşümü — Growtify.ai",
    description: en
      ? "Plan your business's AI transformation with the GROWT Method™ — from strategic assessment to full-scale transformation."
      : "GROWT Method™ ile işletmenizin AI dönüşümünü planlayın. Stratejik değerlendirmeden tam ölçekli dönüşüme.",
    alternates: { canonical: en ? "/en/kurumsal" : "/kurumsal" },
  };
}

export default async function KurumsalPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <main>
      <KurumsalHero />
      <KurumsalProblems />
      <KurumsalGROWT />
      <KurumsalServices />
      <KurumsalProcess />
      <KurumsalStats />
      <KurumsalSectors />
      <KurumsalFAQ />
      <KurumsalCTA />
    </main>
  );
}
