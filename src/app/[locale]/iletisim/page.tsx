import type { Metadata } from "next";
import { localeAltPair } from "@/lib/seo-alternates";
import { getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { ContactForm } from "@/components/forms/ContactForm";
import { COMPANY } from "@/lib/company-info";
import {
  Mail,
  MapPin,
  MessageCircle,
  ArrowRight,
  User,
  Building2,
  Phone,
  ScrollText,
} from "lucide-react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "IletisimPage" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: localeAltPair(locale, "/iletisim", "/contact"),
  };
}

export default async function IletisimPage() {
  const t = await getTranslations("IletisimPage");

  return (
    <>
      {/* 1. Hero */}
      <section className="py-20 bg-gradient-to-br from-white via-primary/3 to-accent/10 dark:from-dark-bg dark:via-primary/5 dark:to-accent/5 transition-colors">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-extrabold tracking-tight text-dark dark:text-white sm:text-5xl">
              <span className="text-primary">{t("heroTitleHighlight")}</span> {t("heroTitleRest")}
            </h1>
            <p className="mt-4 text-lg text-gray-600 dark:text-dark-muted">
              {t("heroSubtitle")}
            </p>
          </div>
        </Container>
      </section>

      {/* 2. Routing kartları — Bireysel vs Kurumsal */}
      <section className="py-16 bg-white dark:bg-dark-bg transition-colors">
        <Container>
          <div className="mx-auto max-w-3xl text-center mb-10">
            <h2 className="text-2xl font-bold text-dark dark:text-white sm:text-3xl">
              {t("routingHeading")}
            </h2>
            <p className="mt-3 text-gray-600 dark:text-dark-muted">
              {t("routingSubtitle")}
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:max-w-4xl lg:mx-auto">
            {/* Bireysel */}
            <Card hover className="border-primary/20 dark:border-primary/30 flex flex-col">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 dark:bg-primary/20">
                <User size={24} className="text-primary" />
              </div>
              <h3 className="mt-4 text-xl font-bold text-dark dark:text-white">
                {t("individualTitle")}
              </h3>
              <p className="mt-1 text-sm font-semibold text-primary">
                {t("individualProgram")}
              </p>
              <p className="mt-3 text-gray-600 dark:text-dark-muted flex-grow">
                {t("individualDescription")}
              </p>
              <div className="mt-6">
                <Button href="/test" variant="primary" size="md">
                  {t("individualCta")}
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
                  {t("businessBadge")}
                </Badge>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/20 dark:bg-accent/10">
                <Building2 size={24} className="text-dark dark:text-accent" />
              </div>
              <h3 className="mt-4 text-xl font-bold text-dark dark:text-white">
                {t("businessTitle")}
              </h3>
              <p className="mt-1 text-sm font-semibold text-primary">
                {t("businessProgram")}
              </p>
              <p className="mt-3 text-gray-600 dark:text-dark-muted flex-grow">
                {t("businessDescription")}
              </p>
              <div className="mt-6">
                <Button href="/kurumsal" variant="primary" size="md">
                  {t("businessCta")}
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
              <h2 className="text-2xl font-bold text-dark dark:text-white">{t("formHeading")}</h2>
              <p className="mt-2 text-gray-600 dark:text-dark-muted">
                {t("formSubtitle")}
              </p>
              <ContactForm />
            </div>

            {/* İletişim Bilgileri */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-dark dark:text-white">
                {t("contactInfoHeading")}
              </h2>
              <p className="text-gray-600 dark:text-dark-muted">
                {t("contactInfoSubtitle")}
              </p>

              <div className="space-y-4">
                {/* Tüzel Kişilik — UK Trading Disclosures Reg 2015 + TR e-Ticaret K. m.3 */}
                <Card className="border-primary/30 dark:border-primary/40 bg-primary/5 dark:bg-primary/10">
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 dark:bg-primary/20 shrink-0">
                      <ScrollText size={20} className="text-primary" />
                    </div>
                    <div className="space-y-1.5 text-sm">
                      <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-dark-muted">
                        {t("legalEntityLabel")}
                      </p>
                      <p className="font-bold text-dark dark:text-white">
                        {COMPANY.legalName}
                      </p>
                      <p className="text-gray-600 dark:text-dark-muted">
                        {t("companyHouseLabel")} <span className="font-medium text-dark dark:text-white">{COMPANY.companyNumber}</span>
                      </p>
                      <p className="text-gray-600 dark:text-dark-muted">
                        {COMPANY.address}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-dark-muted pt-1">
                        {t("trademarkNote", { legalName: COMPANY.legalName })}
                      </p>
                    </div>
                  </div>
                </Card>
                <Card>
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 dark:bg-primary/20">
                      <Mail size={20} className="text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-dark-muted">{t("emailLabel")}</p>
                      <p className="font-medium text-dark dark:text-white">
                        {COMPANY.email}
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
                      <p className="text-sm text-gray-500 dark:text-dark-muted">{t("ukOfficeLabel")}</p>
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
                      <p className="text-sm text-gray-500 dark:text-dark-muted">{t("usOfficeLabel")}</p>
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
                      <p className="text-sm text-gray-500 dark:text-dark-muted">{t("addressLabel")}</p>
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
                      <p className="text-sm text-gray-500 dark:text-dark-muted">{t("socialMediaLabel")}</p>
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
