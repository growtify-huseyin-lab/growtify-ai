import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { ArrowRight } from "lucide-react";
import { KURUMSAL_SECTORS } from "@/lib/kurumsal-constants";

export function KurumsalSectors() {
  return (
    <section className="py-20 bg-light dark:bg-dark-bg/50 transition-colors">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <Badge variant="primary" className="mb-4">
            Sektörler
          </Badge>
          <h2 className="text-3xl font-bold text-dark dark:text-white sm:text-4xl">
            Hangi sektörlere{" "}
            <span className="text-primary">hizmet veriyoruz?</span>
          </h2>

          <div className="mt-10 flex flex-wrap justify-center gap-3">
            {KURUMSAL_SECTORS.map((sector) => (
              <span
                key={sector}
                className="rounded-full border border-gray-200 dark:border-dark-border bg-white dark:bg-dark-card px-5 py-2.5 text-base font-medium text-dark dark:text-white transition-colors hover:border-primary hover:bg-primary/5 dark:hover:border-primary dark:hover:bg-primary/10"
              >
                {sector}
              </span>
            ))}
          </div>

          <p className="mt-8 text-gray-600 dark:text-dark-muted">
            Sektörünüze özel çözümler için görüşelim
          </p>

          <div className="mt-6">
            <Button
              href="https://app.growtify.app/widget/bookings/kurumsal-on-gorusme"
              variant="primary"
              size="md"
              external
            >
              Strateji Görüşmesi Planla
              <ArrowRight size={16} className="ml-1.5" />
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
