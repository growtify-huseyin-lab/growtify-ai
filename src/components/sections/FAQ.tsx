"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { ChevronDown } from "lucide-react";

const faqKeys = ["faq1", "faq2", "faq3", "faq4", "faq5", "faq6", "faq7"] as const;

export function FAQ() {
  const t = useTranslations("FAQC");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = faqKeys.map((key) => ({
    q: t(`${key}Q`),
    a: t(`${key}A`),
  }));

  return (
    <section className="py-20 bg-light dark:bg-dark-bg/50 transition-colors">
      <Container>
        <div className="mx-auto max-w-3xl">
          <h2 className="text-3xl font-bold text-dark dark:text-white text-center sm:text-4xl">
            {t("headingPrefix")} <span className="text-primary">{t("headingHighlight")}</span>
          </h2>

          <div className="mt-12 space-y-3">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="rounded-xl border border-gray-100 dark:border-dark-border bg-white dark:bg-dark-card overflow-hidden transition-all hover:border-primary/20"
              >
                <button
                  className="flex w-full items-center justify-between p-5 text-left"
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                >
                  <span className="text-base font-medium text-dark dark:text-white pr-4">
                    {faq.q}
                  </span>
                  <ChevronDown
                    size={20}
                    className={`shrink-0 text-gray-400 dark:text-dark-muted transition-transform duration-200 ${
                      openIndex === i ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openIndex === i && (
                  <div className="px-5 pb-5">
                    <p className="text-gray-600 dark:text-dark-muted leading-relaxed">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
