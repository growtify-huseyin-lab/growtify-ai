import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PrivacyPolicyEN } from "@/components/legal/en/PrivacyPolicyEN";

// EN English-path alias for /gizlilik-politikasi (content already EN). TR keeps /gizlilik-politikasi.
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (locale !== "en") return { title: "Privacy Policy" };
  return {
    title: "Privacy Policy",
    description: "Growtify.ai Privacy Policy — how we process and protect your personal data under UK GDPR.",
    alternates: {
      canonical: "/en/privacy-policy",
      languages: { tr: "/gizlilik-politikasi", en: "/en/privacy-policy", "x-default": "/gizlilik-politikasi" },
    },
  };
}

export default async function PrivacyPolicyENAliasPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (locale !== "en") notFound();
  return <PrivacyPolicyEN />;
}
