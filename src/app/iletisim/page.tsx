import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { ContactForm } from "@/components/forms/ContactForm";
import {
  Mail,
  MapPin,
  MessageCircle,
  ArrowRight,
  User,
  Building2,
  Phone,
} from "lucide-react";

export const metadata: Metadata = {
  title: "İletişim",
  description:
    "Growtify.ai ile iletişime geç. Soruların için bize ulaş.",
  alternates: { canonical: "/iletisim" },
};

export default function IletisimPage() {
  return (
    <>
      {/* 1. Hero */}
      <section className="py-20 bg-gradient-to-br from-white via-primary/3 to-accent/10 dark:from-dark-bg dark:via-primary/5 dark:to-accent/5 transition-colors">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-extrabold tracking-tight text-dark dark:text-white sm:text-5xl">
              <span className="text-primary">Bize</span> Ulaş
            </h1>
            <p className="mt-4 text-lg text-gray-600 dark:text-dark-muted">
              Soruların mı var? Sana en uygun yolu birlikte bulalım.
            </p>
          </div>
        </Container>
      </section>

      {/* 2. Routing kartları — Bireysel vs Kurumsal */}
      <section className="py-16 bg-white dark:bg-dark-bg transition-colors">
        <Container>
          <div className="mx-auto max-w-3xl text-center mb-10">
            <h2 className="text-2xl font-bold text-dark dark:text-white sm:text-3xl">
              Sana en uygun yolu seç
            </h2>
            <p className="mt-3 text-gray-600 dark:text-dark-muted">
              Bireysel profesyonel misin, yoksa ekibin için mi arıyorsun?
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:max-w-4xl lg:mx-auto">
            {/* Bireysel */}
            <Card hover className="border-primary/20 dark:border-primary/30 flex flex-col">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 dark:bg-primary/20">
                <User size={24} className="text-primary" />
              </div>
              <h3 className="mt-4 text-xl font-bold text-dark dark:text-white">
                Bireysel misin?
              </h3>
              <p className="mt-1 text-sm font-semibold text-primary">
                GROWT Programı
              </p>
              <p className="mt-3 text-gray-600 dark:text-dark-muted flex-grow">
                Yapay zeka ile işini büyüt. 5 seviye, kendi hızında, sektörüne özel.
              </p>
              <div className="mt-6">
                <Button href="/test" variant="primary" size="md">
                  Kişisel Planını Oluştur
                  <ArrowRight size={16} className="ml-2" />
                </Button>
              </div>
            </Card>

            {/* Kurumsal */}
            <Card
              hover
              className="border-2 border-accent dark:border-accent relative bg-gradient-to-br from-accent/10 via-white to-primary/5 dark:from-accent/5 dark:via-dark-card dark:to-primary/10 flex flex-col"
            >
              <div className="absolute -top-3 right-4">
                <Badge variant="accent" className="shadow-sm">
                  Kurumsal
                </Badge>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/20 dark:bg-accent/10">
                <Building2 size={24} className="text-dark dark:text-accent" />
              </div>
              <h3 className="mt-4 text-xl font-bold text-dark dark:text-white">
                İşletmeniz için mi?
              </h3>
              <p className="mt-1 text-sm font-semibold text-primary">
                İşletme Çözümleri
              </p>
              <p className="mt-3 text-gray-600 dark:text-dark-muted flex-grow">
                Ekip mentorlüğü, dönüşüm danışmanlığı ve Growtify.app ile iş altyapısı. GROWT Method&apos;un ekipler için uyarlaması.
              </p>
              <div className="mt-6">
                <Button href="/kurumsal" variant="primary" size="md">
                  Strateji Görüşmesi Planla
                  <ArrowRight size={16} className="ml-2" />
                </Button>
              </div>
            </Card>
          </div>
        </Container>
      </section>

      {/* 3. İletişim Formu + Bilgiler */}
      <section className="py-20 bg-light dark:bg-dark-bg/50 transition-colors">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 lg:max-w-5xl lg:mx-auto">
            {/* Form */}
            <div>
              <h2 className="text-2xl font-bold text-dark dark:text-white">Mesaj Gönder</h2>
              <p className="mt-2 text-gray-600 dark:text-dark-muted">
                En kısa sürede sana döneceğiz.
              </p>
              <ContactForm />
            </div>

            {/* İletişim Bilgileri */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-dark dark:text-white">
                İletişim Bilgileri
              </h2>
              <p className="text-gray-600 dark:text-dark-muted">
                Soruların için bize aşağıdaki kanallardan ulaşabilirsin.
              </p>

              <div className="space-y-4">
                <Card>
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 dark:bg-primary/20">
                      <Mail size={20} className="text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-dark-muted">E-posta</p>
                      <p className="font-medium text-dark dark:text-white">
                        info@growtify.app
                      </p>
                    </div>
                  </div>
                </Card>
                <Card>
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 dark:bg-primary/20">
                      <Phone size={20} className="text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-dark-muted">UK Ofis</p>
                      <p className="font-medium text-dark dark:text-white">
                        +44 7447 850874
                      </p>
                    </div>
                  </div>
                </Card>
                <Card>
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 dark:bg-primary/20">
                      <Phone size={20} className="text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-dark-muted">US Ofis</p>
                      <p className="font-medium text-dark dark:text-white">
                        +1 825-906-9996
                      </p>
                    </div>
                  </div>
                </Card>
                <Card>
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 dark:bg-primary/20">
                      <MapPin size={20} className="text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-dark-muted">Adres</p>
                      <p className="font-medium text-dark dark:text-white">
                        71-75 Shelton Street, Covent Garden, London, UK
                      </p>
                    </div>
                  </div>
                </Card>
                <Card>
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 dark:bg-primary/20">
                      <MessageCircle size={20} className="text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-dark-muted">Sosyal Medya</p>
                      <p className="font-medium text-dark dark:text-white">
                        @growtify.app
                      </p>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
