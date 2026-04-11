import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ThemeProvider } from "@/components/ThemeProvider";

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

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Growtify.ai — AI ile İşini Büyüten Profesyonellerin Platformu",
    template: "%s | Growtify.ai",
  },
  description:
    "Bireysel profesyonellere ve mikro KOBİ'lere GROWT Method ile AI dönüşümü sağlıyoruz. 5 seviyeli, kendi hızında, sektörüne özel, ölçülebilir iş büyütme platformu.",
  keywords: [
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
    canonical: BASE_URL,
  },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    siteName: "Growtify.ai",
    url: BASE_URL,
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className={`${inter.variable} ${playfair.variable} h-full antialiased`} suppressHydrationWarning>
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
                  description: "Bireysel profesyonellere ve mikro KOBİ'lere GROWT Method ile AI dönüşümü sağlıyoruz.",
                  foundingDate: "2024",
                  sameAs: [],
                },
                {
                  "@type": "WebSite",
                  "@id": `${BASE_URL}/#website`,
                  url: BASE_URL,
                  name: "Growtify.ai",
                  publisher: { "@id": `${BASE_URL}/#organization` },
                  inLanguage: "tr-TR",
                },
              ],
            }),
          }}
        />
        <ThemeProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
