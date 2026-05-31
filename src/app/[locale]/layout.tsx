import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { notFound } from "next/navigation";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import "../globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ThemeProvider } from "@/components/ThemeProvider";
import { CookieBanner } from "@/components/legal/CookieBanner";
import { routing } from "@/i18n/routing";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800", "900"],
});

const BASE_URL = "https://growtify.ai";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const en = locale === "en";
  return {
    metadataBase: new URL(BASE_URL),
    title: {
      default: en
        ? "Growtify.ai — The Platform for Professionals Growing Their Business with AI"
        : "Growtify.ai — AI ile İşini Büyüten Profesyonellerin Platformu",
      template: "%s | Growtify.ai",
    },
    description: en
      ? "We help individual professionals and micro-SMEs transform with AI through the GROWT Method — a 5-level, self-paced, sector-specific, measurable business-growth platform."
      : "Bireysel profesyonellere ve mikro KOBİ'lere GROWT Method ile AI dönüşümü sağlıyoruz. 5 seviyeli, kendi hızında, sektörüne özel, ölçülebilir iş büyütme platformu.",
    keywords: en
      ? [
          "AI consulting",
          "digital transformation",
          "GROWT Method",
          "AI training",
          "professional growth",
        ]
      : [
          "AI danışmanlık",
          "dijital dönüşüm",
          "GROWT Method",
          "AI eğitim",
          "profesyonel gelişim",
        ],
    authors: [{ name: "Growtify.ai" }],
    robots: {
      index: false,
      follow: false,
      googleBot: { index: false, follow: false },
    },
    icons: {
      icon: "/images/fav-ai.png",
      shortcut: "/images/fav-ai.png",
      apple: "/images/fav-ai.png",
    },
    alternates: {
      canonical: en ? `${BASE_URL}/en` : BASE_URL,
      languages: {
        tr: BASE_URL,
        en: `${BASE_URL}/en`,
        "x-default": BASE_URL,
      },
    },
    openGraph: {
      type: "website",
      siteName: "Growtify.ai",
      url: en ? `${BASE_URL}/en` : BASE_URL,
    },
    twitter: {
      card: "summary_large_image",
    },
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale);

  const ogLocale = locale === "en" ? "en_US" : "tr_TR";
  const inLanguage = locale === "en" ? "en-US" : "tr-TR";

  return (
    <html
      lang={locale}
      className={`${inter.variable} ${playfair.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-white dark:bg-dark-bg text-text dark:text-dark-text transition-colors">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Organization",
                  "@id": `${BASE_URL}/#organization`,
                  name: "Growtify.ai",
                  url: BASE_URL,
                  description:
                    "Bireysel profesyonellere ve mikro KOBİ'lere GROWT Method ile AI dönüşümü sağlıyoruz.",
                  foundingDate: "2024",
                  sameAs: [
                    "https://www.linkedin.com/company/growtify-app",
                    "https://www.instagram.com/growtify.app/",
                    "https://www.youtube.com/@Growtifyappp",
                  ],
                },
                {
                  "@type": "WebSite",
                  "@id": `${BASE_URL}/#website`,
                  url: BASE_URL,
                  name: "Growtify.ai",
                  publisher: { "@id": `${BASE_URL}/#organization` },
                  inLanguage,
                },
              ],
            }),
          }}
        />
        <ThemeProvider>
          <NextIntlClientProvider>
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
            <CookieBanner />
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
