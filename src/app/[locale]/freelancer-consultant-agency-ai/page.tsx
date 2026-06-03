import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPillarBySlug } from "@/lib/pillars";
import { PillarArticle } from "@/components/pillar/PillarArticle";

const SLUG = "freelancer-consultant-agency-ai";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (locale !== "en") return {};

  const pillar = getPillarBySlug(SLUG);
  if (!pillar) return {};

  return {
    title: pillar.seoTitle,
    description: pillar.seoDescription,
    // Standalone EN-only pillar — no hreflang pair.
    alternates: { canonical: `/en/${SLUG}` },
    openGraph: {
      title: pillar.seoTitle,
      description: pillar.seoDescription,
      type: "article",
      publishedTime: pillar.date,
      authors: [pillar.author],
    },
  };
}

export default async function FreelancerConsultantAgencyAIPage({ params }: Props) {
  const { locale } = await params;
  if (locale !== "en") notFound();

  const pillar = getPillarBySlug(SLUG);
  if (!pillar) notFound();

  return <PillarArticle pillar={pillar} />;
}
