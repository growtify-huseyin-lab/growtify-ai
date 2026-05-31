import type { Metadata } from "next";
import { localeAlternates } from "@/lib/seo-alternates";
import { Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { ArrowRight, Lightbulb, Target, Heart, Rocket } from "lucide-react";
import { CTA } from "@/components/sections/CTA";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "HakkimizdaPage" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: localeAlternates(locale, "/hakkimizda"),
  };
}

export default async function HakkimizdaPage() {
  const t = await getTranslations("HakkimizdaPage");

  const values = [
    {
      icon: Target,
      title: t("valueResultsTitle"),
      description: t("valueResultsDescription"),
    },
    {
      icon: Heart,
      title: t("valueAccessibleTitle"),
      description: t("valueAccessibleDescription"),
    },
    {
      icon: Lightbulb,
      title: t("valueIndustryTitle"),
      description: t("valueIndustryDescription"),
    },
    {
      icon: Rocket,
      title: t("valueIndependenceTitle"),
      description: t("valueIndependenceDescription"),
    },
  ];

  return (
    <>
      {/* 1. Hero */}
      <section className="py-20 bg-gradient-to-br from-white via-primary/3 to-accent/10 dark:from-dark-bg dark:via-primary/5 dark:to-accent/5 transition-colors">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-extrabold tracking-tight text-dark dark:text-white sm:text-5xl">
              {t("heroTitleLead")}{" "}
              <span className="text-primary">
                {t("heroTitleHighlight")}
              </span>
            </h1>
            <p className="mt-6 text-lg text-gray-600 dark:text-dark-muted leading-relaxed">
              {t("heroSubtitle")}
            </p>
          </div>
        </Container>
      </section>

      {/* 2. Misyon + Vizyon */}
      <section className="py-20 bg-white dark:bg-dark-bg transition-colors">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="text-3xl font-bold text-dark dark:text-white">{t("missionHeading")}</h2>
              <p className="mt-4 text-gray-600 dark:text-dark-muted leading-relaxed">
                {t.rich("missionParagraph1", {
                  strong: (chunks) => <strong>{chunks}</strong>,
                })}
              </p>
              <p className="mt-4 text-gray-600 dark:text-dark-muted leading-relaxed">
                {t("missionParagraph2")}
              </p>
              <p className="mt-4 text-gray-600 dark:text-dark-muted leading-relaxed">
                {t("missionParagraph3")}
              </p>
            </div>
            <div className="rounded-2xl bg-gradient-to-br from-primary to-primary-light p-10 text-white">
              <h3 className="text-2xl font-bold">{t("visionHeading")}</h3>
              <p className="mt-4 text-white/90 leading-relaxed">
                {t("visionParagraph")}
              </p>
              <div className="mt-8 border-t border-white/20 pt-6">
                <p className="text-sm text-white/60">{t("differentiationLabel")}</p>
                <p className="mt-2 text-lg font-semibold">
                  {t("differentiationQuote")}
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 3. Değerlerimiz */}
      <section className="py-20 bg-light dark:bg-dark-bg/50 transition-colors">
        <Container>
          <h2 className="text-3xl font-bold text-dark dark:text-white text-center">
            {t("valuesHeading")}
          </h2>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v) => (
              <Card key={v.title} hover>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 dark:bg-primary/20">
                  <v.icon size={24} className="text-primary" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-dark dark:text-white">
                  {v.title}
                </h3>
                <p className="mt-2 text-sm text-gray-600 dark:text-dark-muted">{v.description}</p>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* 4. Growtify Ekosistemi */}
      <section className="py-20 bg-white dark:bg-dark-bg transition-colors">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold text-dark dark:text-white">
              <span className="text-primary">Growtify</span> {t("ecosystemHeadingSuffix")}
            </h2>
            <p className="mt-4 text-gray-600 dark:text-dark-muted">
              {t("ecosystemSubtitle")}
            </p>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-3 lg:max-w-6xl lg:mx-auto">
            {/* Growtify.ai */}
            <Link href="/growt-method" className="group">
              <Card hover className="border-primary/20 dark:border-primary/30 h-full">
                <span className="text-2xl font-bold text-primary">
                  Growtify.ai
                </span>
                <p className="mt-2 text-sm text-gray-500 dark:text-dark-muted">
                  {t("ecosystemAiAudience")}
                </p>
                <p className="mt-4 text-gray-600 dark:text-dark-muted">
                  {t("ecosystemAiDescription")}
                </p>
                <span className="mt-6 inline-flex items-center text-sm font-semibold text-primary group-hover:underline">
                  {t("ecosystemAiCta")}
                  <ArrowRight size={16} className="ml-1" />
                </span>
              </Card>
            </Link>

            {/* Growtify İşletme Çözümleri */}
            <Link href="/kurumsal" className="group">
              <Card
                hover
                className="border-2 border-accent dark:border-accent h-full relative bg-gradient-to-br from-accent/10 via-white to-primary/5 dark:from-accent/5 dark:via-dark-card dark:to-primary/10"
              >
                <div className="absolute -top-3 right-4">
                  <Badge variant="accent" className="shadow-sm">
                    {t("ecosystemBusinessBadge")}
                  </Badge>
                </div>
                <span className="text-2xl font-bold text-dark dark:text-white">
                  {t("ecosystemBusinessName")}
                </span>
                <p className="mt-2 text-sm text-gray-500 dark:text-dark-muted">
                  {t("ecosystemBusinessAudience")}
                </p>
                <p className="mt-4 text-gray-600 dark:text-dark-muted">
                  {t("ecosystemBusinessDescription")}
                </p>
                <span className="mt-6 inline-flex items-center text-sm font-semibold text-primary group-hover:underline">
                  {t("ecosystemBusinessCta")}
                  <ArrowRight size={16} className="ml-1" />
                </span>
              </Card>
            </Link>

            {/* Growtify.app */}
            <a href="https://growtify.app" target="_blank" rel="noopener noreferrer" className="group">
              <Card hover className="h-full">
                <span className="text-2xl font-bold text-dark dark:text-white">
                  Growtify.app
                </span>
                <p className="mt-2 text-sm text-gray-500 dark:text-dark-muted">
                  {t("ecosystemAppAudience")}
                </p>
                <p className="mt-4 text-gray-600 dark:text-dark-muted">
                  {t("ecosystemAppDescription")}
                </p>
                <span className="mt-6 inline-flex items-center text-sm font-semibold text-primary group-hover:underline">
                  growtify.app
                  <ArrowRight size={16} className="ml-1" />
                </span>
              </Card>
            </a>
          </div>
        </Container>
      </section>

      {/* 5. CTA */}
      <CTA />
    </>
  );
}
