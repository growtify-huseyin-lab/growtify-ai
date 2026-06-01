import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { getAllSectorSlugs } from "@/data/sectors";
import { sectorPagesFor } from "@/data/sectors-i18n";
import { SECTOR_TR_TO_EN } from "@/data/sectors.en";
import { ArrowRight } from "lucide-react";

// EN sectors index (English-slug fork of /sektor). TR keeps /sektor; /en/sektor 301s here.
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (locale !== "en") return { title: "Sectors" };
  const t = await getTranslations({ locale, namespace: "SektorPage" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: {
      canonical: "/en/sectors",
      languages: { tr: "/sektor", en: "/en/sectors", "x-default": "/sektor" },
    },
  };
}

export default async function SectorsIndexAliasPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (locale !== "en") notFound();
  setRequestLocale(locale);
  const t = await getTranslations("SektorPage");
  const SECTOR_PAGES = sectorPagesFor("en");
  const slugs = getAllSectorSlugs();

  return (
    <>
      <section className="py-20 bg-gradient-to-br from-white via-primary/3 to-accent/10 dark:from-dark-bg dark:via-primary/5 dark:to-accent/5 transition-colors">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="accent" className="mb-6">
              {t("sectorCountBadge")}
            </Badge>
            <h1 className="text-4xl font-extrabold tracking-tight text-dark dark:text-white sm:text-5xl">
              {t("heroTitleLead")} <span className="text-primary">{t("heroTitleHighlight")}</span>
            </h1>
            <p className="mt-6 text-lg text-gray-600 dark:text-dark-muted leading-relaxed">
              {t("heroSubtitle")}
            </p>
          </div>
        </Container>
      </section>

      <section className="py-16 bg-white dark:bg-dark-bg transition-colors">
        <Container>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {slugs.map((slug) => {
              const sector = SECTOR_PAGES[slug];
              const enSlug = SECTOR_TR_TO_EN[slug];
              if (!enSlug) return null;
              return (
                <Link key={slug} href={`/sectors/${enSlug}`} className="group">
                  <Card hover className="h-full flex flex-col justify-between">
                    <div>
                      <h2 className="text-xl font-bold text-dark dark:text-white group-hover:text-primary transition-colors">
                        {sector.fullTitle}
                      </h2>
                      <p className="mt-2 text-sm text-gray-600 dark:text-dark-muted leading-relaxed line-clamp-2">
                        {sector.heroSubtitle}
                      </p>
                    </div>
                    <div className="mt-4 flex items-center text-sm font-medium text-primary">
                      {t("viewDetailedGuide")}
                      <ArrowRight size={14} className="ml-1 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Card>
                </Link>
              );
            })}
          </div>
        </Container>
      </section>
    </>
  );
}
