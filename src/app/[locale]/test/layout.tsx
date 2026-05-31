import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const en = locale === "en";
  return {
    title: en
      ? "AI Digital Maturity Test — Growtify.ai"
      : "AI Dijital Olgunluk Testi — Growtify.ai",
    description: en
      ? "Discover your AI digital maturity level in 2 minutes. A personalised 37-question report."
      : "2 dakikada AI dijital olgunluk seviyeni öğren. 37 soruluk kişiselleştirilmiş rapor.",
    robots: { index: false, follow: false },
  };
}

export default function TestLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-b from-white via-primary/5 to-white dark:from-dark-bg dark:via-primary/5 dark:to-dark-bg">
      {children}
    </div>
  );
}
