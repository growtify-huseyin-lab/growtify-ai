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
      ? "Corporate AI Maturity Assessment"
      : "Kurumsal AI Olgunluk Değerlendirmesi",
    description: en
      ? "Discover your company's AI readiness in 3 minutes. 5-dimension assessment, instant results."
      : "3 dakikada şirketinizin AI hazırlık seviyesini öğrenin. 5 boyutta değerlendirme, anında sonuç.",
    robots: { index: false, follow: false },
  };
}

export default function KurumsalQuizLayout({
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
