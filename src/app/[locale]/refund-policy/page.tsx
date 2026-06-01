import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { RefundPolicyEN } from "@/components/legal/en/RefundPolicyEN";

// EN English-path alias for /iade-politikasi (content already EN). TR keeps /iade-politikasi.
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (locale !== "en") return { title: "Refund Policy" };
  return {
    title: "Refund Policy",
    description: "Growtify.ai Refund Policy — refund terms for our digital content services.",
    alternates: {
      canonical: "/en/refund-policy",
      languages: { tr: "/iade-politikasi", en: "/en/refund-policy", "x-default": "/iade-politikasi" },
    },
  };
}

export default async function RefundPolicyENAliasPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (locale !== "en") notFound();
  return <RefundPolicyEN />;
}
