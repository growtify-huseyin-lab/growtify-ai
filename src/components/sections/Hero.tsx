import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { ArrowRight, Brain } from "lucide-react";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-primary/5 to-white dark:from-dark-bg dark:via-primary/10 dark:to-dark-bg py-24 lg:py-36 transition-colors">
      {/* Neural network grid — subtle in light, visible in dark */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025] dark:opacity-[0.05]"
        style={{
          backgroundImage: `radial-gradient(circle, #5d47f0 1px, transparent 1px),
            linear-gradient(to right, #5d47f020 1px, transparent 1px),
            linear-gradient(to bottom, #5d47f020 1px, transparent 1px)`,
          backgroundSize: "32px 32px, 64px 64px, 64px 64px",
        }}
      />

      {/* Soft glow orbs — light/dark adaptive */}
      <div className="pointer-events-none absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-primary/10 dark:bg-primary/15 blur-[120px] animate-pulse-glow" />
      <div className="pointer-events-none absolute bottom-0 right-1/4 h-72 w-72 rounded-full bg-accent/15 dark:bg-accent/10 blur-[100px] animate-float-delayed" />
      <div className="pointer-events-none absolute top-1/3 right-1/6 h-48 w-48 rounded-full bg-primary-light/10 blur-[80px] animate-float" />

      <Container>
        <div className="relative mx-auto max-w-4xl text-center">
          <Badge variant="accent" className="mb-8 animate-shimmer bg-gradient-to-r from-accent/40 via-accent/70 to-accent/40 dark:from-accent/30 dark:via-accent/60 dark:to-accent/30">
            <Brain size={14} className="mr-1.5" />
            AI ile İş Büyütme Programı
          </Badge>

          <h1 className="text-4xl font-extrabold tracking-tight text-dark dark:text-white sm:text-5xl lg:text-7xl leading-[1.1]">
            Yapay Zeka ile{" "}
            <span className="relative">
              <span className="bg-gradient-to-r from-primary via-primary-light to-primary dark:from-primary-light dark:via-accent dark:to-primary-light bg-clip-text text-transparent bg-[length:200%_auto] animate-shimmer">
                Mesleğinde Dönüşüm
              </span>
            </span>{" "}
            Sağla
          </h1>

          <p className="mx-auto mt-8 max-w-2xl text-lg text-gray-600 dark:text-gray-300 leading-relaxed sm:text-xl">
            Yapay zeka öğretmiyoruz — işini nasıl yapay zeka ile büyüteceğini gösteriyoruz. Sektörüne özel, kendi hızında.
          </p>

          <p className="mx-auto mt-4 max-w-2xl text-base text-gray-500 dark:text-gray-400">
            6 ay önce işini büyütmek için ajanslara on binlerce TL vermeliydin. Şimdi yapay zeka ile aynısını kendin yapabilirsin — hem de çok daha hızlı. 4 haftada ilk adımını atmış ol.
          </p>

          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Button href="https://app.growtify.app/payment-link/69d20484c6a0e600f4d07a46" variant="primary" size="lg" external>
              Hemen Başla
              <ArrowRight size={18} className="ml-2" />
            </Button>
            <Button
              href="/test"
              variant="ghost"
              size="lg"
              className="text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 hover:border-primary hover:text-primary dark:hover:text-white hover:bg-primary/5 dark:hover:bg-primary/10"
            >
              AI Olgunluk Testi
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
