import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Dijital Olgunluk Testi — Growtify.ai",
  description:
    "2 dakikada AI dijital olgunluk seviyeni öğren. 37 soruluk kişiselleştirilmiş rapor.",
  robots: { index: false, follow: false }, // skeleton — don't index yet
};

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
