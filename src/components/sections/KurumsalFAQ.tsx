"use client";

import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { ChevronDown } from "lucide-react";
import { KURUMSAL_FAQ } from "@/lib/kurumsal-constants";

export function KurumsalFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-20 bg-white dark:bg-dark-bg transition-colors">
      <Container>
        <div className="mx-auto max-w-3xl">
          <h2 className="text-3xl font-bold text-dark dark:text-white text-center sm:text-4xl">
            Sık sorulan <span className="text-primary">sorular</span>
          </h2>

          <div className="mt-12 space-y-3">
            {KURUMSAL_FAQ.map((faq, i) => (
              <div
                key={i}
                className="rounded-xl border border-gray-100 dark:border-dark-border bg-white dark:bg-dark-card overflow-hidden transition-colors"
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
                    className={`shrink-0 text-gray-400 dark:text-dark-muted transition-transform ${
                      openIndex === i ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openIndex === i && (
                  <div className="px-5 pb-5">
                    <p className="text-gray-600 dark:text-dark-muted leading-relaxed">
                      {faq.a}
                    </p>
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
