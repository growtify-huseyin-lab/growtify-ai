import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { GROWT_PHASES } from "@/lib/constants";
import { ArrowRight, ArrowDown } from "lucide-react";

export function GROWTSteps() {
  return (
    <section id="nasil-calisiyor" className="py-20 bg-light dark:bg-dark-bg/50 transition-colors">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold text-dark dark:text-white sm:text-4xl">
            <span className="text-primary">GROWT Method</span> ile 5 Seviyede Dönüşüm
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-dark-muted">
            Yapay zeka nedir kursu değil — işini büyütmen için yapılandırılmış bir süreç.
          </p>
        </div>

        {/* Vertical timeline on mobile, horizontal on desktop */}
        <div className="mt-14 grid gap-4 sm:grid-cols-5">
          {GROWT_PHASES.map((phase, i) => (
            <div
              key={phase.letter}
              className="group relative rounded-2xl border border-gray-100 dark:border-dark-border bg-white dark:bg-dark-card p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-2 dark:hover:shadow-primary/10 hover:border-primary/30"
            >
              {/* Glow on hover */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative">
                <div className="flex items-center gap-3">
                  <span
                    className={`flex h-14 w-14 items-center justify-center rounded-2xl text-2xl font-black text-white shadow-lg ${phase.color}`}
                  >
                    {phase.letter}
                  </span>
                  {i < GROWT_PHASES.length - 1 && (
                    <>
                      <ArrowRight
                        size={22}
                        className="absolute -right-4 top-7 text-primary/40 hidden sm:block animate-bounce-x"
                      />
                      <ArrowDown
                        size={22}
                        className="absolute left-7 -bottom-6 text-primary/40 sm:hidden"
                      />
                    </>
                  )}
                </div>
                <h3 className="mt-5 text-lg font-semibold text-dark dark:text-white">
                  {phase.name}
                </h3>
                <p className="text-sm font-medium" style={{ color: phase.badge.color }}>
                  Seviye {phase.level}
                </p>
                <p className="mt-2 text-sm font-semibold text-dark/80 dark:text-dark-text/80">
                  {phase.motto}
                </p>
                <p className="mt-1.5 text-xs text-gray-500 dark:text-dark-muted leading-relaxed">
                  {phase.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Button href="/test" variant="primary" size="lg">
            Kişisel Planını Oluştur
            <ArrowRight size={18} className="ml-2" />
          </Button>
          <Button href="/growt-method" variant="ghost" size="lg" className="border border-gray-200 dark:border-dark-border">
            Detaylı İncele
            <ArrowRight size={16} className="ml-2" />
          </Button>
        </div>
      </Container>
    </section>
  );
}
