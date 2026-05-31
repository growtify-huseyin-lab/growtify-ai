import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { GROWT_PHASES } from "@/lib/constants";
import { ProcessSupport } from "@/components/sections/ProcessSupport";
import {
  ArrowRight,
  Layers,
  Clock,
  TrendingUp,
  BookOpen,
  UserCircle,
  Briefcase,
  Building2,
  PlayCircle,
  CheckCircle2,
  BarChart3,
} from "lucide-react";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("GrowtMethodPage");
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: { canonical: "/growt-method" },
  };
}

export default async function GROWTMethodPage() {
  const t = await getTranslations("GrowtMethodPage");

  const AUDIENCE = [
    {
      icon: UserCircle,
      title: t("audience1Title"),
      description: t("audience1Description"),
    },
    {
      icon: Briefcase,
      title: t("audience2Title"),
      description: t("audience2Description"),
    },
    {
      icon: Building2,
      title: t("audience3Title"),
      description: t("audience3Description"),
    },
  ];

  const HOW_IT_WORKS = [
    {
      icon: PlayCircle,
      title: t("howItWorks1Title"),
      description: t("howItWorks1Description"),
    },
    {
      icon: CheckCircle2,
      title: t("howItWorks2Title"),
      description: t("howItWorks2Description"),
    },
    {
      icon: BarChart3,
      title: t("howItWorks3Title"),
      description: t("howItWorks3Description"),
    },
  ];

  const STATS = [
    { icon: Layers, label: t("stat1Label"), value: t("stat1Value") },
    { icon: Clock, label: t("stat2Label"), value: t("stat2Value") },
    { icon: BookOpen, label: t("stat3Label"), value: t("stat3Value") },
    { icon: TrendingUp, label: t("stat4Label"), value: t("stat4Value") },
  ];

  return (
    <>
      {/* 1. Hero */}
      <section className="py-20 bg-gradient-to-br from-white via-primary/3 to-accent/10 dark:from-dark-bg dark:via-primary/5 dark:to-accent/5 transition-colors">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="accent" className="mb-6">
              {t("heroBadge")}
            </Badge>
            <h1 className="text-4xl font-extrabold tracking-tight text-dark dark:text-white sm:text-5xl">
              <span className="text-primary">GROWT Method</span> {t("heroTitleSuffix")}
            </h1>
            <p className="mt-6 text-lg text-gray-600 dark:text-dark-muted leading-relaxed">
              {t("heroDescription")}
            </p>
          </div>
        </Container>
      </section>

      {/* 2. Overview Stats */}
      <section className="py-12 bg-white dark:bg-dark-bg border-b border-gray-100 dark:border-dark-border transition-colors">
        <Container>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {STATS.map((item) => (
              <div key={item.label} className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 dark:bg-primary/20">
                  <item.icon size={24} className="text-primary" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-dark-muted">
                    {item.label}
                  </p>
                  <p className="text-lg font-bold text-dark dark:text-white">
                    {item.value}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* 3. Detailed Phases — zigzag */}
      <section className="py-20 bg-white dark:bg-dark-bg transition-colors">
        <Container>
          <div className="mx-auto max-w-3xl text-center mb-16">
            <h2 className="text-3xl font-bold text-dark dark:text-white">
              {t("phasesHeading")}
            </h2>
            <p className="mt-4 text-gray-600 dark:text-dark-muted">
              {t("phasesSubheading")}
            </p>
          </div>

          <div className="space-y-16">
            {GROWT_PHASES.map((phase, i) => (
              <div
                key={phase.letter}
                className={`flex flex-col gap-8 lg:flex-row lg:items-center ${
                  i % 2 !== 0 ? "lg:flex-row-reverse" : ""
                }`}
              >
                <div className="lg:w-1/3 flex justify-center">
                  <div
                    className={`flex h-32 w-32 items-center justify-center rounded-3xl text-6xl font-black text-white shadow-lg ${phase.color}`}
                  >
                    {phase.letter}
                  </div>
                </div>
                <div className="lg:w-2/3">
                  <p className="text-sm font-semibold text-primary uppercase tracking-wider">
                    {t("phaseLevelLabel", { level: phase.level })}
                  </p>
                  <h3 className="mt-2 text-3xl font-bold text-dark dark:text-white">
                    {phase.letter} — {phase.name}
                  </h3>
                  <p className="mt-2 text-xl text-gray-500 dark:text-dark-muted italic">
                    &ldquo;{phase.motto}&rdquo;
                  </p>
                  <p className="mt-4 text-gray-600 dark:text-dark-muted leading-relaxed">
                    {phase.description}
                  </p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {phase.elements.map((el) => (
                      <span
                        key={el}
                        className="rounded-full bg-light dark:bg-dark-card dark:border dark:border-dark-border px-4 py-1.5 text-sm font-medium text-dark dark:text-dark-text"
                      >
                        {el}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* 4. Modül Kartları — Desktop: card grid · Mobile: compact journey */}
      <section className="py-14 lg:py-20 bg-light dark:bg-dark-bg/50 transition-colors">
        <Container>
          {/* Mobile — compact journey visual (no content repeat) */}
          <div className="lg:hidden">
            <p className="text-center text-xs font-semibold text-gray-500 dark:text-dark-muted uppercase tracking-wider mb-6">
              {t("journeySummaryLabel")}
            </p>
            <div className="flex items-center justify-between gap-0 max-w-[300px] mx-auto">
              {GROWT_PHASES.map((phase, i) => (
                <div key={phase.letter} className="flex items-center shrink-0">
                  <div
                    className={`flex h-11 w-11 items-center justify-center rounded-xl text-lg font-black text-white shadow-md ${phase.color}`}
                    aria-label={t("phaseAriaLabel", { level: phase.level, name: phase.name })}
                  >
                    {phase.letter}
                  </div>
                  {i < GROWT_PHASES.length - 1 && (
                    <div className="w-2 h-[2px] bg-gray-300 dark:bg-dark-border" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Desktop — card grid (unchanged layout) */}
          <div className="hidden lg:grid lg:grid-cols-5 gap-4">
            {GROWT_PHASES.map((phase) => (
              <Card key={phase.letter} hover className="text-center">
                <div
                  className={`mx-auto flex h-16 w-16 items-center justify-center rounded-2xl text-3xl font-black text-white ${phase.color}`}
                >
                  {phase.letter}
                </div>
                <h3 className="mt-4 text-base font-semibold text-dark dark:text-white">
                  {phase.name}
                </h3>
                <p className="mt-1 text-sm font-medium text-dark/70 dark:text-dark-text/70">
                  {phase.motto}
                </p>
                <p className="mt-2 text-xs text-gray-500 dark:text-dark-muted leading-relaxed">
                  {phase.description}
                </p>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* 5. Süreç Desteği */}
      <ProcessSupport />

      {/* 6. Kimler İçin */}
      <section className="py-20 bg-light dark:bg-dark-bg/50 transition-colors">
        <Container>
          <div className="mx-auto max-w-3xl text-center mb-12">
            <h2 className="text-3xl font-bold text-dark dark:text-white">
              {t("audienceHeading")}
            </h2>
            <p className="mt-4 text-gray-600 dark:text-dark-muted">
              {t("audienceSubheading")}
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-3 max-w-4xl mx-auto">
            {AUDIENCE.map((a) => (
              <Card key={a.title} hover>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 dark:bg-primary/20">
                  <a.icon size={24} className="text-primary" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-dark dark:text-white">
                  {a.title}
                </h3>
                <p className="mt-2 text-sm text-gray-600 dark:text-dark-muted leading-relaxed">
                  {a.description}
                </p>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* 7. Nasıl Çalışır */}
      <section className="py-20 bg-white dark:bg-dark-bg transition-colors">
        <Container>
          <div className="mx-auto max-w-3xl text-center mb-12">
            <h2 className="text-3xl font-bold text-dark dark:text-white">
              {t("howItWorksHeading")}
            </h2>
            <p className="mt-4 text-gray-600 dark:text-dark-muted">
              {t("howItWorksSubheading")}
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-3 max-w-4xl mx-auto">
            {HOW_IT_WORKS.map((step, i) => (
              <div key={step.title} className="text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 dark:bg-primary/20 mb-4">
                  <step.icon size={28} className="text-primary" />
                </div>
                <span className="text-xs font-semibold text-primary uppercase">{t("stepLabel", { step: i + 1 })}</span>
                <h3 className="mt-2 text-lg font-semibold text-dark dark:text-white">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm text-gray-600 dark:text-dark-muted leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* 8. Final CTA — 2 kart */}
      <section className="py-20 bg-light dark:bg-dark-bg/50 transition-colors">
        <Container>
          <div className="mx-auto max-w-3xl text-center mb-12">
            <h2 className="text-3xl font-bold text-dark dark:text-white">
              {t("ctaHeading")}
            </h2>
            <p className="mt-4 text-gray-600 dark:text-dark-muted">
              {t("ctaSubheading")}
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 max-w-4xl mx-auto">
            {/* Bireysel */}
            <Card hover className="border-primary/20 dark:border-primary/30 flex flex-col">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 dark:bg-primary/20">
                <UserCircle size={24} className="text-primary" />
              </div>
              <Badge variant="muted" className="mt-4 self-start">{t("ctaIndividualBadge")}</Badge>
              <h3 className="mt-3 text-xl font-bold text-dark dark:text-white">
                {t("ctaIndividualTitle")}
              </h3>
              <p className="mt-3 text-gray-600 dark:text-dark-muted flex-grow">
                {t("ctaIndividualDescription")}
              </p>
              <div className="mt-6">
                <Button
                  href="/test"
                  variant="primary"
                  size="md"
                >
                  {t("ctaIndividualButton")}
                  <ArrowRight size={16} className="ml-2" />
                </Button>
              </div>
            </Card>

            {/* Kurumsal */}
            <Card hover className="border-accent dark:border-accent/50 flex flex-col relative bg-gradient-to-br from-accent/5 via-white to-primary/5 dark:from-accent/5 dark:via-dark-card dark:to-primary/10">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/20 dark:bg-accent/10">
                <Building2 size={24} className="text-dark dark:text-accent" />
              </div>
              <Badge variant="accent" className="mt-4 self-start">{t("ctaBusinessBadge")}</Badge>
              <h3 className="mt-3 text-xl font-bold text-dark dark:text-white">
                {t("ctaBusinessTitle")}
              </h3>
              <p className="mt-3 text-gray-600 dark:text-dark-muted flex-grow">
                {t("ctaBusinessDescription")}
              </p>
              <div className="mt-6">
                <Button href="/kurumsal" variant="secondary" size="md">
                  {t("ctaBusinessButton")}
                  <ArrowRight size={16} className="ml-2" />
                </Button>
              </div>
            </Card>
          </div>
        </Container>
      </section>
    </>
  );
}
