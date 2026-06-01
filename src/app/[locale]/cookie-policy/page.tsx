import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CookiePolicyEN } from "@/components/legal/en/CookiePolicyEN";

// EN English-path alias for /cerez-politikasi (content already EN). TR keeps /cerez-politikasi.
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (locale !== "en") return { title: "Cookie Policy" };
  return {
    title: "Cookie Policy",
    description: "Growtify.ai Cookie Policy — information about the cookies used on our website.",
    alternates: {
      canonical: "/en/cookie-policy",
      languages: { tr: "/cerez-politikasi", en: "/en/cookie-policy", "x-default": "/cerez-politikasi" },
    },
  };
}

export default async function CookiePolicyENAliasPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (locale !== "en") notFound();
  return <CookiePolicyEN />;
}
