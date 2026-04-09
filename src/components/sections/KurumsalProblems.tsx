import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { Target, Zap, Users } from "lucide-react";
import { KURUMSAL_PROBLEMS } from "@/lib/kurumsal-constants";

const iconMap = {
  Target,
  Zap,
  Users,
} as const;

export function KurumsalProblems() {
  return (
    <section className="py-20 bg-white dark:bg-dark-bg transition-colors">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold text-dark dark:text-white sm:text-4xl">
            Sorun teknoloji değil,{" "}
            <span className="text-primary">yaklaşım.</span>
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-dark-muted">
            Çoğu işletme AI dönüşümünü araçlarla başlatıyor. Oysa dönüşüm stratejik bir süreç.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {KURUMSAL_PROBLEMS.map((problem) => {
            const Icon = iconMap[problem.icon as keyof typeof iconMap];
            return (
              <Card key={problem.title} hover>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 dark:bg-primary/20">
                  <Icon size={24} className="text-primary" />
                </div>
                <h3 className="mt-4 text-xl font-semibold text-dark dark:text-white">
                  {problem.title}
                </h3>
                <p className="mt-2 text-gray-600 dark:text-dark-muted leading-relaxed">
                  {problem.description}
                </p>
              </Card>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
