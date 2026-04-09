import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { ArrowRight, Lightbulb, Target, Heart, Rocket } from "lucide-react";
import { CTA } from "@/components/sections/CTA";

export const metadata: Metadata = {
  title: "Hakkımızda",
  description:
    "Growtify.ai — Bireysel profesyonellere ve KOBİ'lere AI dönüşümü sağlayan danışmanlık platformu.",
  alternates: { canonical: "/hakkimizda" },
};

const values = [
  {
    icon: Target,
    title: "Sonuç Odaklı",
    description: "Teori değil uygulama. Her adımda ölçülebilir sonuçlar hedefliyoruz.",
  },
  {
    icon: Heart,
    title: "Erişilebilir",
    description: "Teknik jargon yok. Profesyonellerin dilinde, herkesin anlayacağı şekilde.",
  },
  {
    icon: Lightbulb,
    title: "Sektöre Özel",
    description: "Genel yapay zeka kursu değil. Mesleğine özel iş büyütme süreci.",
  },
  {
    icon: Rocket,
    title: "Bağımsızlık",
    description: "Bize bağımlılık değil, kendi işini kendin büyütebilme gücü.",
  },
];

export default function HakkimizdaPage() {
  return (
    <>
      {/* 1. Hero */}
      <section className="py-20 bg-gradient-to-br from-white via-primary/3 to-accent/10 dark:from-dark-bg dark:via-primary/5 dark:to-accent/5 transition-colors">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-extrabold tracking-tight text-dark dark:text-white sm:text-5xl">
              Yapay zeka öğretmiyoruz —{" "}
              <span className="text-primary">
                işini nasıl büyüteceğini gösteriyoruz
              </span>
            </h1>
            <p className="mt-6 text-lg text-gray-600 dark:text-dark-muted leading-relaxed">
              Growtify.ai, bireysel profesyonellere ve KOBİ&apos;lere GROWT
              Method ile AI dönüşümü sağlıyor. 5 seviyeli, sektörüne özel,
              yapılandırılmış iş büyütme programı. Kurs değil süreç, teori değil uygulama.
            </p>
          </div>
        </Container>
      </section>

      {/* 2. Misyon + Vizyon */}
      <section className="py-20 bg-white dark:bg-dark-bg transition-colors">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="text-3xl font-bold text-dark dark:text-white">Misyonumuz</h2>
              <p className="mt-4 text-gray-600 dark:text-dark-muted leading-relaxed">
                Türkiye&apos;deki işletmelerin %92.5&apos;i yapay zeka kullanmıyor.
                Kullananlar rakiplerinden 3.7 kat fazla getiri elde ediyor.
                Neden başlayamıyorlar? %74&apos;ü aynı şeyi söylüyor:
                &ldquo;Nasıl yapacağımı bilmiyorum.&rdquo; Bu devasa açık,
                Growtify.ai&apos;nin tam olarak hedeflediği boşluk.
              </p>
              <p className="mt-4 text-gray-600 dark:text-dark-muted leading-relaxed">
                6 ay önce işini büyütmek için ajanslara on binlerce TL
                vermeliydin. Şimdi yapay zeka ile aynısını kendin yapabilirsin — hem
                de çok daha hızlı.
              </p>
              <p className="mt-4 text-gray-600 dark:text-dark-muted leading-relaxed">
                Yapay zeka kursu satmıyoruz. Sektörüne özel, yapılandırılmış
                bir iş büyütme süreci sunuyoruz. Biz süreci veriyoruz — sonucu
                belirleyen senin uygulamaların.
              </p>
            </div>
            <div className="rounded-2xl bg-gradient-to-br from-primary to-primary-light p-10 text-white">
              <h3 className="text-2xl font-bold">Vizyonumuz</h3>
              <p className="mt-4 text-white/90 leading-relaxed">
                Türkiye&apos;nin ve bölgenin lider AI dönüşüm danışmanlığı markası
                olmak. Her profesyonelin yapay zeka ile işini büyüttüğü bir gelecek
                yaratmak.
              </p>
              <div className="mt-8 border-t border-white/20 pt-6">
                <p className="text-sm text-white/60">Farklılaşma</p>
                <p className="mt-2 text-lg font-semibold">
                  &ldquo;Kurs değil danışmanlık. Teori değil uygulama. Genel
                  değil, mesleğine özel.&rdquo;
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 3. Değerlerimiz */}
      <section className="py-20 bg-light dark:bg-dark-bg/50 transition-colors">
        <Container>
          <h2 className="text-3xl font-bold text-dark dark:text-white text-center">
            Değerlerimiz
          </h2>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v) => (
              <Card key={v.title} hover>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 dark:bg-primary/20">
                  <v.icon size={24} className="text-primary" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-dark dark:text-white">
                  {v.title}
                </h3>
                <p className="mt-2 text-sm text-gray-600 dark:text-dark-muted">{v.description}</p>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* 4. Growtify Ekosistemi */}
      <section className="py-20 bg-white dark:bg-dark-bg transition-colors">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold text-dark dark:text-white">
              <span className="text-primary">Growtify</span> Ekosistemi
            </h2>
            <p className="mt-4 text-gray-600 dark:text-dark-muted">
              Üç marka, tek hedef: Profesyonellerin ve işletmelerin dijital dönüşümü.
            </p>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-3 lg:max-w-6xl lg:mx-auto">
            {/* Growtify.ai */}
            <Link href="/growt-method" className="group">
              <Card hover className="border-primary/20 dark:border-primary/30 h-full">
                <span className="text-2xl font-bold text-primary">
                  Growtify.ai
                </span>
                <p className="mt-2 text-sm text-gray-500 dark:text-dark-muted">
                  Bireysel profesyoneller
                </p>
                <p className="mt-4 text-gray-600 dark:text-dark-muted">
                  5 seviyeli AI dönüşüm programı. Kendi hızında, sektörüne özel,
                  yapılandırılmış iş büyütme süreci. &ldquo;Kendin yap, yanında olalım.&rdquo;
                </p>
                <span className="mt-6 inline-flex items-center text-sm font-semibold text-primary group-hover:underline">
                  GROWT Method&apos;u İncele
                  <ArrowRight size={16} className="ml-1" />
                </span>
              </Card>
            </Link>

            {/* Growtify İşletme Çözümleri */}
            <Link href="/kurumsal" className="group">
              <Card
                hover
                className="border-2 border-accent dark:border-accent h-full relative bg-gradient-to-br from-accent/10 via-white to-primary/5 dark:from-accent/5 dark:via-dark-card dark:to-primary/10"
              >
                <div className="absolute -top-3 right-4">
                  <Badge variant="accent" className="shadow-sm">
                    Yeni
                  </Badge>
                </div>
                <span className="text-2xl font-bold text-dark dark:text-white">
                  Growtify İşletme Çözümleri
                </span>
                <p className="mt-2 text-sm text-gray-500 dark:text-dark-muted">
                  Ekipler &amp; kurumsallar
                </p>
                <p className="mt-4 text-gray-600 dark:text-dark-muted">
                  GROWT Method&apos;un kurumsal uyarlaması. Ekip eğitimi,
                  danışmanlık ve AI otomasyon — büyüyen işletmeler için.
                </p>
                <span className="mt-6 inline-flex items-center text-sm font-semibold text-primary group-hover:underline">
                  İşletme Çözümlerini İncele
                  <ArrowRight size={16} className="ml-1" />
                </span>
              </Card>
            </Link>

            {/* Growtify.app */}
            <a href="https://growtify.app" target="_blank" rel="noopener noreferrer" className="group">
              <Card hover className="h-full">
                <span className="text-2xl font-bold text-dark dark:text-white">
                  Growtify.app
                </span>
                <p className="mt-2 text-sm text-gray-500 dark:text-dark-muted">
                  Yapay Zeka Destekli İş Çözümleri
                </p>
                <p className="mt-4 text-gray-600 dark:text-dark-muted">
                  Yazılım ve hizmet modeli. İşletmeler için yapay zeka destekli
                  dijital altyapı, otomasyon ve iş çözümleri.
                  &ldquo;Biz yapalım, siz odaklanın.&rdquo;
                </p>
                <span className="mt-6 inline-flex items-center text-sm font-semibold text-primary group-hover:underline">
                  growtify.app
                  <ArrowRight size={16} className="ml-1" />
                </span>
              </Card>
            </a>
          </div>
        </Container>
      </section>

      {/* 5. CTA */}
      <CTA />
    </>
  );
}
