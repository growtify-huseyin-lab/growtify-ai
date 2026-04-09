import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { KURUMSAL_GROWT_PHASES } from "@/lib/kurumsal-constants";
import { CheckCircle2 } from "lucide-react";

export function KurumsalGROWT() {
  return (
    <section className="py-20 bg-light dark:bg-dark-bg/50 transition-colors">
      <Container>
        <div className="mx-auto max-w-3xl text-center mb-16">
          <Badge variant="primary" className="mb-4">
            Metodoloji
          </Badge>
          <h2 className="text-3xl font-bold text-dark dark:text-white sm:text-4xl">
            GROWT Method&trade; &mdash;{" "}
            <span className="text-primary">Kurumsal AI Dönüşüm Programı</span>
          </h2>
        </div>

        <div className="relative mx-auto max-w-3xl">
          {/* Vertical connector line */}
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#EF4444] via-[#EAB308] to-[#5d47f0] hidden sm:block" />

          <div className="space-y-10">
            {KURUMSAL_GROWT_PHASES.map((phase, i) => (
              <div key={phase.letter} className="relative flex gap-6 sm:gap-8">
                {/* Letter circle */}
                <div className="relative z-10 flex-shrink-0">
                  <div
                    className="flex h-12 w-12 items-center justify-center rounded-full text-white font-bold text-xl shadow-lg"
                    style={{ backgroundColor: phase.color }}
                  >
                    {phase.letter}
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 pb-2">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
                    <h3 className="text-xl font-bold text-dark dark:text-white">
                      {phase.name}
                    </h3>
                    <span className="text-sm text-gray-500 dark:text-dark-muted">
                      &mdash; {phase.subtitle}
                    </span>
                  </div>

                  <p className="mt-2 text-gray-600 dark:text-dark-muted leading-relaxed">
                    {phase.description}
                  </p>

                  <div className="mt-3 flex flex-wrap gap-2">
                    {phase.deliverables.map((d) => (
                      <span
                        key={d}
                        className="inline-flex items-center gap-1.5 rounded-full bg-white dark:bg-dark-card border border-gray-100 dark:border-dark-border px-3 py-1 text-sm text-gray-700 dark:text-dark-muted"
                      >
                        <CheckCircle2 size={14} className="text-primary" />
                        {d}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
