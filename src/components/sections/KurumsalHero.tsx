import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { ArrowRight, Sparkles } from "lucide-react";
import { KURUMSAL_HERO } from "@/lib/kurumsal-constants";

export function KurumsalHero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-primary/5 to-white dark:from-dark-bg dark:via-primary/10 dark:to-dark-bg py-20 lg:py-32 transition-colors">
      {/* Dot grid pattern — subtle in light, visible in dark */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03] dark:opacity-[0.06]"
        style={{
          backgroundImage: "radial-gradient(circle, #5d47f0 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      <Container>
        <div className="relative mx-auto max-w-4xl text-center">
          <Badge
            variant="accent"
            className="mb-6 animate-shimmer bg-gradient-to-r from-accent/40 via-accent/70 to-accent/40 dark:from-accent/30 dark:via-accent/60 dark:to-accent/30"
          >
            <Sparkles size={14} className="mr-1" />
            {KURUMSAL_HERO.badge}
          </Badge>

          <h1 className="text-4xl font-extrabold tracking-tight text-dark dark:text-white sm:text-5xl lg:text-6xl">
            {KURUMSAL_HERO.title.split("AI Dönüşümü")[0]}
            <span className="bg-gradient-to-r from-primary via-primary-light to-primary dark:from-primary-light dark:via-accent dark:to-primary-light bg-clip-text text-transparent bg-[length:200%_auto] animate-shimmer">
              AI Dönüşümü
            </span>
            {" Burada Başlıyor"}
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600 dark:text-gray-300 leading-relaxed sm:text-xl">
            {KURUMSAL_HERO.subtitle}
          </p>

          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Button href={KURUMSAL_HERO.primaryCtaHref} variant="primary" size="lg" external>
              {KURUMSAL_HERO.primaryCta}
              <ArrowRight size={18} className="ml-2" />
            </Button>
            <Button href={KURUMSAL_HERO.secondaryCtaHref} variant="outline" size="lg">
              {KURUMSAL_HERO.secondaryCta}
            </Button>
          </div>
        </div>
      </Container>

      {/* Soft floating orbs — adaptive for both themes */}
      <div className="pointer-events-none absolute -top-20 -right-20 h-72 w-72 rounded-full bg-primary/10 dark:bg-primary/10 blur-3xl animate-float" />
      <div className="pointer-events-none absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-accent/15 dark:bg-accent/5 blur-3xl animate-float-delayed" />
      <div className="pointer-events-none absolute top-1/4 right-1/4 h-40 w-40 rounded-full bg-primary/8 blur-2xl animate-pulse-glow" />
      <div className="pointer-events-none absolute bottom-1/3 left-1/3 h-32 w-32 rounded-full bg-accent/10 dark:bg-accent/3 blur-2xl animate-float-delayed" />
    </section>
  );
}
