import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import SectorPage from "../../sektor/[slug]/page";
import { SECTOR_EN_TO_TR, SECTOR_TR_TO_EN } from "@/data/sectors.en";
import { getAllSectorSlugs } from "@/data/sectors";
import { sectorPagesFor } from "@/data/sectors-i18n";

// EN English-slug fork of /sektor/[slug] (CEO 2026-06-01). Content already EN;
// renders the existing SectorPage with the TR slug remapped from the English slug.
// TR keeps /sektor/{tr-slug}. /en/sektor/{tr} 301s here.
export function generateStaticParams() {
  return getAllSectorSlugs()
    .map((tr) => ({ slug: SECTOR_TR_TO_EN[tr] }))
    .filter((p) => p.slug);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const trSlug = SECTOR_EN_TO_TR[slug];
  if (locale !== "en" || !trSlug) return { title: "Sector not found" };
  const sector = sectorPagesFor("en")[trSlug];
  return {
    title: sector?.seoTitle ?? sector?.fullTitle,
    description: sector?.seoDescription,
    alternates: {
      canonical: `/en/sectors/${slug}`,
      languages: {
        tr: `/sektor/${trSlug}`,
        en: `/en/sectors/${slug}`,
        "x-default": `/sektor/${trSlug}`,
      },
    },
  };
}

export default async function SectorsAliasPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (locale !== "en") notFound();
  const trSlug = SECTOR_EN_TO_TR[slug];
  if (!trSlug) notFound();
  setRequestLocale(locale);
  return <SectorPage params={Promise.resolve({ locale: "en", slug: trSlug })} />;
}
