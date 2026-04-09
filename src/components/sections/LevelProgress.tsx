import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { GROWT_PHASES } from "@/lib/constants";
import { ChevronRight } from "lucide-react";

export function LevelProgress() {
  return (
    <section className="py-20 transition-colors">
      <Container>
        <div className="mx-auto max-w-4xl text-center mb-16">
          <Badge variant="primary" className="mb-4">
            Kendi Hızında İlerleme
          </Badge>
          <h2 className="text-3xl font-bold text-dark dark:text-dark-text mb-4">
            5 Seviye, Kendi Hızında Dönüşüm
          </h2>
          <p className="text-lg text-gray-600 dark:text-dark-muted">
            Modülleri tamamla, sonraki seviyeyi aç. Minimum süre yok — hızlı
            öğreniyorsan hızlı ilerle.
          </p>
        </div>

        <div className="space-y-4 max-w-3xl mx-auto">
          {GROWT_PHASES.map((phase, idx) => {
            const isLast = idx === GROWT_PHASES.length - 1;

            return (
              <div key={phase.letter}>
                <div className="flex items-stretch gap-4 p-5 rounded-xl bg-white dark:bg-dark-card border border-gray-100 dark:border-dark-border hover:shadow-md transition-shadow">
                  {/* Level indicator */}
                  <div className="flex flex-col items-center">
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center text-white text-lg font-bold shrink-0"
                      style={{ backgroundColor: phase.badge.color }}
                    >
                      {phase.letter}
                    </div>
                    <span className="text-xs text-gray-400 dark:text-dark-muted mt-1">
                      Seviye {phase.level}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-dark dark:text-dark-text">
                        {phase.name}
                      </h3>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-dark-muted italic mb-2">
                      &ldquo;{phase.motto}&rdquo;
                    </p>
                    <p className="text-sm text-gray-600 dark:text-dark-muted">
                      {phase.description}
                    </p>
                    <div className="flex items-center gap-4 mt-3 text-xs text-gray-400 dark:text-dark-muted">
                      <span>{phase.moduleCount} adım</span>
                    </div>
                  </div>
                </div>

                {/* Connector */}
                {!isLast && (
                  <div className="flex justify-center py-1">
                    <ChevronRight
                      size={20}
                      className="text-gray-300 dark:text-dark-border rotate-90"
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Summary line removed */}
      </Container>
    </section>
  );
}
