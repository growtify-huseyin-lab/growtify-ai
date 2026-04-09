import { Container } from "@/components/ui/Container";
import { GROWT_PHASES } from "@/lib/constants";
import { BarChart3, CheckCircle2, Users, MessageCircle } from "lucide-react";

const features = [
  {
    icon: BarChart3,
    title: "İlerleme Takibi",
    description:
      "Hangi seviyedesin, hangi adımı tamamladın, önünde ne var — hepsi net ve görünür bir ilerleme haritasında.",
  },
  {
    icon: CheckCircle2,
    title: "Aşama Tamamlama",
    description:
      "Her seviyeyi bitirdiğinde bir dönüm noktası. Sıradaki aşama açılır, dönüşümün bir adım daha ileri gider.",
  },
  {
    icon: Users,
    title: "Topluluk Desteği",
    description:
      "Aynı yolculukta olan profesyonellerle soru-cevap, ilham ve karşılıklı motivasyon. Tek başına değilsin.",
  },
  {
    icon: MessageCircle,
    title: "WhatsApp Destek",
    description:
      "Takıldığın yerde anında destek. WhatsApp üzerinden sorularını sor, yönlendirme al — tek başına değilsin.",
  },
];

export function ProcessSupport() {
  return (
    <section className="py-20 bg-white dark:bg-dark-bg transition-colors">
      <Container>
        <div className="mx-auto max-w-3xl text-center mb-16">
          <h2 className="text-3xl font-bold text-dark dark:text-white sm:text-4xl">
            Sürecinde <span className="text-primary">Yanındayız</span>
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-dark-muted">
            Tek başına değilsin — her adımda destek var.
          </p>
        </div>

        {/* Feature grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f) => (
            <div
              key={f.title}
              className="p-6 rounded-xl bg-light dark:bg-dark-card border border-gray-100 dark:border-dark-border hover:border-primary/20 hover:shadow-lg transition-all"
            >
              <f.icon className="w-8 h-8 text-primary mb-4" />
              <h3 className="font-semibold text-dark dark:text-white mb-2">
                {f.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-dark-muted leading-relaxed">
                {f.description}
              </p>
            </div>
          ))}
        </div>

        {/* Progress preview mockup */}
        <div className="mt-16 mx-auto max-w-2xl">
          <div className="p-6 rounded-xl bg-light dark:bg-dark-card border border-gray-100 dark:border-dark-border">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-dark dark:text-white">
                Genel İlerleme
              </span>
              <span className="text-sm text-gray-500 dark:text-dark-muted">
                3 / 5 Seviye
              </span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-dark-border rounded-full h-3 mb-6">
              <div
                className="bg-gradient-to-r from-primary to-accent h-3 rounded-full"
                style={{ width: "60%" }}
              />
            </div>
            <div className="flex justify-between">
              {GROWT_PHASES.map((phase) => (
                <div key={phase.letter} className="flex flex-col items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                      phase.level <= 3
                        ? "text-white"
                        : "text-gray-400 dark:text-dark-muted bg-gray-100 dark:bg-dark-border"
                    }`}
                    style={
                      phase.level <= 3
                        ? { backgroundColor: phase.badge.color }
                        : undefined
                    }
                  >
                    {phase.letter}
                  </div>
                  <span className="text-xs text-gray-500 dark:text-dark-muted mt-1">
                    Seviye {phase.level}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
