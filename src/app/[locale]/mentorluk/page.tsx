import type { Metadata } from "next";
import { getLocale } from "next-intl/server";
import { localeAlternates } from "@/lib/seo-alternates";
import { Container } from "@/components/ui/Container";
import { BookingCalendar } from "@/components/BookingCalendar";
import { CheckCircle2 } from "lucide-react";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const en = locale === "en";
  return {
    title: en
      ? "1:1 Mentorship with Hüseyin Şanlıtürk"
      : "Hüseyin Şanlıtürk ile Birebir Mentörlük",
    description: en
      ? "Book a one-on-one mentorship session with Hüseyin Şanlıtürk — build strategy together, clarify your roadmap, and grow step by step."
      : "Hüseyin Şanlıtürk ile birebir mentörlük görüşmesi planla — stratejini birlikte kur, yol haritanı netleştir, adım adım büyü.",
    alternates: localeAlternates(locale, "/mentorluk"),
  };
}

export default async function MentorlukPage() {
  const locale = await getLocale();
  const en = locale === "en";

  const c = en
    ? {
        title: "1:1 Mentorship with Hüseyin Şanlıtürk",
        subtitle:
          "Work directly with Hüseyin as you grow your business: build strategy together, clarify your roadmap, and move forward step by step.",
        benefits: [
          "One-on-one sessions tailored to you and your business",
          "A clear roadmap with actionable next steps",
          "Learn directly from experience — with accountability",
        ],
        calendarHeading: "Pick a time and book your session",
      }
    : {
        title: "Hüseyin Şanlıtürk ile Birebir Mentörlük",
        subtitle:
          "İşini büyütürken doğrudan onunla çalış: stratejini birlikte kur, yol haritanı netleştir, adım adım ilerle.",
        benefits: [
          "Sana ve işine özel birebir (1:1) görüşme",
          "Net bir yol haritası + uygulanabilir adımlar",
          "Doğrudan deneyimden öğrenme — hesap verebilirlikle",
        ],
        calendarHeading: "Uygun zamanı seç, randevunu oluştur",
      };

  return (
    <>
      <section className="py-16 bg-gradient-to-br from-white via-primary/3 to-accent/10 dark:from-dark-bg dark:via-primary/5 dark:to-accent/5 transition-colors">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-extrabold tracking-tight text-dark dark:text-white sm:text-5xl">
              {c.title}
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-gray-600 dark:text-dark-muted">
              {c.subtitle}
            </p>
            <ul className="mx-auto mt-8 flex max-w-xl flex-col gap-3 text-left">
              {c.benefits.map((b) => (
                <li key={b} className="flex items-start gap-3">
                  <CheckCircle2
                    size={20}
                    className="mt-0.5 shrink-0 text-primary"
                  />
                  <span className="text-gray-700 dark:text-dark-text">{b}</span>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      <section className="py-12 bg-white dark:bg-dark-bg transition-colors">
        <Container>
          <div className="mx-auto max-w-2xl">
            <h2 className="mb-6 text-center text-2xl font-bold text-dark dark:text-white">
              {c.calendarHeading}
            </h2>
            <div className="rounded-2xl border border-gray-100 bg-white p-2 shadow-sm dark:border-dark-border dark:bg-dark-card sm:p-4">
              <BookingCalendar />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
