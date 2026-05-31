import { getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { ArrowRight } from "lucide-react";

export async function CTA() {
  const t = await getTranslations("CTAC");

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Dark gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-dark via-primary/80 to-dark" />

      {/* Animated grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* Glow orbs */}
      <div className="pointer-events-none absolute top-0 left-1/3 h-64 w-64 rounded-full bg-primary/20 blur-[100px] animate-pulse-glow" />
      <div className="pointer-events-none absolute bottom-0 right-1/4 h-48 w-48 rounded-full bg-accent/15 blur-[80px] animate-float-delayed" />

      <Container className="relative">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            {t("heading")}
          </h2>
          <p className="mt-6 text-lg text-white/70">
            {t("subheading")}
          </p>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Button href="/test" variant="accent" size="lg">
              {t("primaryCta")}
              <ArrowRight size={18} className="ml-2" />
            </Button>
            <Button href="/growt-method" variant="ghost" size="lg" className="text-white/80 border border-white/20 hover:border-white/40 hover:text-white hover:bg-white/5">
              {t("secondaryCta")}
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
