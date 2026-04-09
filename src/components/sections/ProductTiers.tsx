import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Check } from "lucide-react";
import { PRODUCT } from "@/lib/constants";

export function ProductTiers() {
  return (
    <section className="py-20 bg-white dark:bg-dark-bg transition-colors">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold text-dark dark:text-white sm:text-4xl">
            <span className="text-primary">GROWT Method</span> — tek program, tam dönüşüm
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-dark-muted">
            {PRODUCT.subtitle}
          </p>
        </div>

        <div className="mt-12 mx-auto max-w-lg">
          <div className="relative rounded-2xl border border-primary bg-gradient-to-b from-primary/5 to-white dark:from-primary/10 dark:to-dark-card shadow-lg p-8">
            <h3 className="text-2xl font-bold text-dark dark:text-white">
              GROWT Method
            </h3>

            <div className="mt-6">
              <p className="text-xl font-bold text-primary">
                {PRODUCT.pricingNote}
              </p>
              <p className="mt-1 text-sm text-gray-500 dark:text-dark-muted">
                {PRODUCT.paymentType} &middot; {PRODUCT.duration}
              </p>
            </div>

            <ul className="mt-6 space-y-3">
              {PRODUCT.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2">
                  <Check
                    size={18}
                    className="mt-0.5 shrink-0 text-primary"
                  />
                  <span className="text-sm text-gray-600 dark:text-dark-muted">
                    {feature}
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-8">
              <Button
                href={PRODUCT.ctaHref}
                variant="primary"
                size="md"
                className="w-full"
              >
                {PRODUCT.cta}
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
