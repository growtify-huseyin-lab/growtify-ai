import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kurumsal AI Olgunluk Değerlendirmesi — Growtify.ai",
  description:
    "3 dakikada şirketinizin AI hazırlık seviyesini öğrenin. 5 boyutta değerlendirme, anında sonuç.",
  robots: { index: false, follow: false },
};

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
