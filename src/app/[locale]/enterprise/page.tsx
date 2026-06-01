import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import KurumsalPage from "../kurumsal/page";

// EN English-path alias for /kurumsal (content already EN, locale-aware). TR keeps /kurumsal.
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (locale !== "en") return { title: "Enterprise AI Solutions" };
  return {
    title: "Enterprise AI Solutions",
    description: "Enterprise AI solutions by Growtify — custom AI systems and the GROWT Method, implemented hands-on for your organization.",
    alternates: {
      canonical: "/en/enterprise",
      languages: { tr: "/kurumsal", en: "/en/enterprise", "x-default": "/kurumsal" },
    },
  };
}

export default async function KurumsalPageAliasPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (locale !== "en") notFound();
  setRequestLocale(locale);
  return <KurumsalPage params={params} />;
}
