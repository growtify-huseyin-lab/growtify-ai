import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import IletisimPage from "../iletisim/page";

// EN English-path alias for /iletisim (content already EN, locale-aware). TR keeps /iletisim.
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (locale !== "en") return { title: "Contact" };
  return {
    title: "Contact",
    description: "Get in touch with Growtify — questions about AI transformation, the GROWT Method, or working together.",
    alternates: {
      canonical: "/en/contact",
      languages: { tr: "/iletisim", en: "/en/contact", "x-default": "/iletisim" },
    },
  };
}

export default async function IletisimPageAliasPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (locale !== "en") notFound();
  setRequestLocale(locale);
  return <IletisimPage />;
}
