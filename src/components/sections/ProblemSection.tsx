import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { AlertTriangle, Clock, Wallet } from "lucide-react";
import { getTranslations } from "next-intl/server";

const problems = [
  {
    key: "knowledge",
    icon: AlertTriangle,
  },
  {
    key: "time",
    icon: Clock,
    hasSubtitle: true,
  },
  {
    key: "cost",
    icon: Wallet,
  },
] as const;

export async function ProblemSection() {
  const t = await getTranslations("ProblemSectionC");

  return (
    <section className="py-20 bg-white dark:bg-dark-bg transition-colors">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold text-dark dark:text-white sm:text-4xl">
            {t("heading")}
          </h2>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {problems.map((problem) => (
            <Card key={problem.key} hover className="relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/0 via-primary to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 dark:from-primary/20 dark:to-primary/10">
                <problem.icon size={28} className="text-primary" />
              </div>
              <h3 className="mt-5 text-xl font-semibold text-dark dark:text-white">
                {t(`${problem.key}Title`)}
              </h3>
              {"hasSubtitle" in problem && problem.hasSubtitle && (
                <p className="mt-1.5 text-sm font-medium text-primary italic">
                  {t(`${problem.key}Subtitle`)}
                </p>
              )}
              <p className="mt-3 text-gray-600 dark:text-dark-muted leading-relaxed">
                {t(`${problem.key}Description`)}
              </p>
            </Card>
          ))}
        </div>

        <p className="mt-10 text-center text-lg text-gray-500 dark:text-dark-muted italic">
          {t("closing")}
        </p>
      </Container>
    </section>
  );
}
