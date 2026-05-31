import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { MessageSquare, FileSearch, CheckCircle2, TrendingUp } from "lucide-react";
import { getKProcess } from "@/lib/kurumsal-constants-i18n";
import { getTranslations, getLocale } from "next-intl/server";

const iconMap = {
  MessageSquare,
  FileSearch,
  CheckCircle2,
  TrendingUp,
} as const;

export async function KurumsalProcess() {
  const locale = await getLocale();
  const KURUMSAL_PROCESS = getKProcess(locale);
  const t = await getTranslations("KurumsalProcessC");

  return (
    <section className="py-20 bg-light dark:bg-dark-bg/50 transition-colors">
      <Container>
        <div className="mx-auto max-w-3xl text-center mb-16">
          <Badge variant="primary" className="mb-4">
            {t("badge")}
          </Badge>
          <h2 className="text-3xl font-bold text-dark dark:text-white sm:text-4xl">
            {t("headingStart")}{" "}
            <span className="text-primary">{t("headingHighlight")}</span> {t("headingEnd")}
          </h2>
        </div>

        <div className="relative">
          {/* Horizontal connector line (desktop) */}
          <div className="absolute top-8 left-[calc(12.5%+24px)] right-[calc(12.5%+24px)] h-0.5 bg-gradient-to-r from-primary/30 via-primary to-primary/30 hidden lg:block" />

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {KURUMSAL_PROCESS.map((step) => {
              const Icon = iconMap[step.icon as keyof typeof iconMap];
              return (
                <div key={step.step} className="relative text-center">
                  {/* Step number circle */}
                  <div className="relative z-10 mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary text-white font-bold text-xl shadow-lg shadow-primary/20">
                    {step.step}
                  </div>

                  <div className="mt-4 flex justify-center">
                    <Icon size={24} className="text-primary" />
                  </div>

                  <h3 className="mt-3 text-lg font-semibold text-dark dark:text-white">
                    {step.title}
                  </h3>

                  <p className="mt-2 text-sm text-gray-600 dark:text-dark-muted leading-relaxed">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
