"use client";

import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "Yapay zeka benim işim değil, çok teknik. Yapabilir miyim?",
    a: "Teknik bilgi gerektirmiyor. Sana yapay zeka öğretmiyoruz — işini yapay zeka ile nasıl büyüteceğini gösteriyoruz.",
  },
  {
    q: "Haftada ne kadar zaman ayırmam gerekiyor?",
    a: "Kendi hızında ilerlersin. Zaten amacımız sana zaman kazandırmak. Ama ne kadar zaman ayırırsan o kadar ilerleme gösterirsin.",
  },
  {
    q: "YouTube'dan bedava öğrenemez miyim?",
    a: "YouTube genel bilgi verir. Biz sana yapılandırılmış bir iş büyütme süreci veriyoruz. Ama sonucu belirleyen senin uygulamaların — en iyi süreç bile uygulanmazsa işe yaramaz.",
  },
  {
    q: "Program ne kadar sürüyor?",
    a: "4 hafta erişim. Kendi hızında ilerlersin. Biz süreci veriyoruz — hızı sen belirliyorsun.",
  },
  {
    q: "Dijitalde hiç yokum — yine de katılabilir miyim?",
    a: "Evet. Dijitalde olman gerekmez. Sıfırdan başla — ama ilerleme senin adımlarına bağlı. Biz yanındayız, yürüyen sensin.",
  },
  {
    q: "Hangi sektörlere hitap ediyorsunuz?",
    a: "Tüm sektörlere. Her sektöre özel örnekler ve uygulamalarla ilerlersin. Mantığı öğrenirsin, kendi sektörüne sen uygularsın.",
  },
  {
    q: "4 hafta sonra ne olur?",
    a: "Kafa yapısını kazanmış, ilk uygulamanı yapmış olursun. Devam etmek istersen genişletilmiş program seçenekleri var. Ama 4 haftada ne kadar ilerlediğin tamamen sana bağlı.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-20 bg-light dark:bg-dark-bg/50 transition-colors">
      <Container>
        <div className="mx-auto max-w-3xl">
          <h2 className="text-3xl font-bold text-dark dark:text-white text-center sm:text-4xl">
            Sık sorulan <span className="text-primary">sorular</span>
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
