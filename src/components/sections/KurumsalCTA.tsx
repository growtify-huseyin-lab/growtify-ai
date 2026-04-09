import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { ArrowRight } from "lucide-react";

export function KurumsalCTA() {
  return (
    <section className="relative py-20 overflow-hidden">
      {/* Animated gradient border effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary-light to-accent animate-gradient-shift opacity-100" />
      <div className="absolute inset-[2px] bg-gradient-to-br from-primary to-primary-light rounded-sm" />

      {/* Floating particle dots */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-[10%] left-[15%] h-2 w-2 rounded-full bg-white/20 animate-float" />
        <div className="absolute top-[30%] right-[20%] h-1.5 w-1.5 rounded-full bg-white/15 animate-float-delayed" />
        <div className="absolute bottom-[20%] left-[25%] h-1 w-1 rounded-full bg-white/25 animate-pulse-glow" />
        <div className="absolute top-[60%] right-[10%] h-2.5 w-2.5 rounded-full bg-accent/20 animate-float" />
        <div className="absolute bottom-[15%] right-[35%] h-1.5 w-1.5 rounded-full bg-white/20 animate-float-delayed" />
        <div className="absolute top-[15%] left-[60%] h-1 w-1 rounded-full bg-accent/15 animate-pulse-glow" />
        <div className="absolute bottom-[40%] left-[8%] h-2 w-2 rounded-full bg-white/10 animate-float-delayed" />
      </div>

      <Container className="relative">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            İşletmenizin AI dönüşümünü planlayalım
          </h2>
          <p className="mt-4 text-lg text-white/80">
            30 dakikalık ücretsiz strateji görüşmesi ile başlayın.
          </p>
          <div className="mt-8 flex justify-center">
            <Button
              href="https://app.growtify.app/widget/bookings/kurumsal-on-gorusme"
              variant="accent"
              size="lg"
              external
            >
              Strateji Görüşmesi Planla
              <ArrowRight size={18} className="ml-2" />
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
