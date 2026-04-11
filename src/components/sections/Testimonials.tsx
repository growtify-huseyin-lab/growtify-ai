import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { Quote } from "lucide-react";

const testimonials = [
  {
    name: "Ayşe K.",
    role: "Yaşam Koçu",
    text: "Her danışanıma özel program hazırlamak günlerimi alıyordu. Şimdi yapay zeka ile 30 dakikada kişiselleştirilmiş program çıkarıyorum — danışan sayımı 3 ayda ikiye katladım.",
    metric: "Danışan kapasitesi 2x",
  },
  {
    name: "Mehmet D.",
    role: "Eğitim Danışmanı",
    text: "Ajansa ayda 38.000 TL veriyordum, ne yaptıklarını bile tam bilmiyordum. Şimdi içerik üretiminden müşteri takibine her şeyi kendim yönetiyorum — hem daha iyi hem süreç kontrolümde.",
    metric: "Ajans maliyeti sıfırlandı",
  },
  {
    name: "Zeynep T.",
    role: "Freelance Grafiker",
    text: "5 müşterinin işini aynı anda yönetmek imkansızdı. Yapay zeka ile teklif hazırlama, proje takibi, müşteri iletişimi sistemleştirdim — şimdi 8 müşteriyle rahat çalışıyorum.",
    metric: "Müşteri kapasitesi %60 arttı",
  },
];

export function Testimonials() {
  return (
    <section className="py-20 bg-white dark:bg-dark-bg transition-colors">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold text-dark dark:text-white sm:text-4xl">
            Dönüşüm <span className="text-primary">hikayeleri</span>
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-dark-muted">
            GROWT Method ile işini büyüten profesyoneller
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {testimonials.map((t) => (
            <Card key={t.name} className="relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-primary/0 via-primary/50 to-primary/0" />
              <Quote size={24} className="text-primary/20 dark:text-primary/30" />
              <p className="mt-4 text-gray-600 dark:text-dark-muted leading-relaxed italic text-sm">
                &ldquo;{t.text}&rdquo;
              </p>
              <div className="mt-6 border-t border-gray-100 dark:border-dark-border pt-4">
                <p className="font-semibold text-dark dark:text-white">{t.name}</p>
                <p className="text-sm text-gray-500 dark:text-dark-muted">{t.role}</p>
                <p className="mt-2 text-sm font-medium text-primary">
                  {t.metric}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
