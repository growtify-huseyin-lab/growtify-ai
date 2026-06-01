import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { TermsOfServiceEN } from "@/components/legal/en/TermsOfServiceEN";

// EN English-path alias for /kullanim-kosullari (content already EN). TR keeps /kullanim-kosullari.
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (locale !== "en") return { title: "Terms of Service" };
  return {
    title: "Terms of Service",
    description: "Growtify.ai Terms of Service — the terms that apply when you use our services.",
    alternates: {
      canonical: "/en/terms-of-service",
      languages: { tr: "/kullanim-kosullari", en: "/en/terms-of-service", "x-default": "/kullanim-kosullari" },
    },
  };
}

export default async function TermsOfServiceENAliasPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (locale !== "en") notFound();
  return <TermsOfServiceEN />;
}
