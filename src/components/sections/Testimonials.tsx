import { getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { Quote } from "lucide-react";

export async function Testimonials() {
  const t = await getTranslations("TestimonialsC");

  const testimonials = [
    {
      name: "Ayşe K.",
      role: t("testimonial1Role"),
      text: t("testimonial1Text"),
      metric: t("testimonial1Metric"),
    },
    {
      name: "Mehmet D.",
      role: t("testimonial2Role"),
      text: t("testimonial2Text"),
      metric: t("testimonial2Metric"),
    },
    {
      name: "Zeynep T.",
      role: t("testimonial3Role"),
      text: t("testimonial3Text"),
      metric: t("testimonial3Metric"),
    },
  ];

  return (
    <section className="py-20 bg-white dark:bg-dark-bg transition-colors">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold text-dark dark:text-white sm:text-4xl">
            {t("headingPrefix")} <span className="text-primary">{t("headingHighlight")}</span>
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-dark-muted">
            {t("subtitle")}
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {testimonials.map((item) => (
            <Card key={item.name} className="relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-primary/0 via-primary/50 to-primary/0" />
              <Quote size={24} className="text-primary/20 dark:text-primary/30" />
              <p className="mt-4 text-gray-600 dark:text-dark-muted leading-relaxed italic text-sm">
                &ldquo;{item.text}&rdquo;
              </p>
              <div className="mt-6 border-t border-gray-100 dark:border-dark-border pt-4">
                <p className="font-semibold text-dark dark:text-white">{item.name}</p>
                <p className="text-sm text-gray-500 dark:text-dark-muted">{item.role}</p>
                <p className="mt-2 text-sm font-medium text-primary">
                  {item.metric}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
