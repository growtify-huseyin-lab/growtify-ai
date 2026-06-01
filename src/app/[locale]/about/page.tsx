import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import HakkimizdaPage from "../hakkimizda/page";

// EN English-path alias for /hakkimizda (content already EN, locale-aware). TR keeps /hakkimizda.
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (locale !== "en") return { title: "About Growtify" };
  return {
    title: "About Growtify",
    description: "Learn about Growtify — the AI agency helping professionals and SMBs grow with practical, hands-on AI systems.",
    alternates: {
      canonical: "/en/about",
      languages: { tr: "/hakkimizda", en: "/en/about", "x-default": "/hakkimizda" },
    },
  };
}

export default async function HakkimizdaPageAliasPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (locale !== "en") notFound();
  setRequestLocale(locale);
  return <HakkimizdaPage />;
}
