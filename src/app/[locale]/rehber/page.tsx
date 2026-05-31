import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { REHBERLER, REHBER_SLUGS } from "@/content/rehberler";
import { localeAlternates } from "@/lib/seo-alternates";
import { ArrowRight } from "lucide-react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const en = locale === "en";
  return {
    title: en
      ? "Sector-Specific AI Guides — Free Downloads | Growtify.ai"
      : "Sektörel AI Rehberleri — Ücretsiz İndir | Growtify.ai",
    description: en
      ? "Free, sector-specific AI starter guides — healthcare, law, e-commerce, and more. Practical first steps with the GROWT Method."
      : "Sağlık, hukuk, e-ticaret ve daha fazlası için sektöre özel ücretsiz AI başlangıç rehberleri — GROWT Method ile pratik ilk adımlar.",
    alternates: localeAlternates(locale, "/rehber"),
  };
}

export default async function RehberIndexPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const en = locale === "en";

  return (
    <>
      <section className="py-20 bg-gradient-to-br from-white via-primary/3 to-accent/10 dark:from-dark-bg dark:via-primary/5 dark:to-accent/5 transition-colors">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="accent" className="mb-6">
              {en ? "Free Guides" : "Ücretsiz Rehberler"}
            </Badge>
            <h1 className="text-4xl font-extrabold tracking-tight text-dark dark:text-white sm:text-5xl">
              {en ? (
                <>
                  Sector-Specific <span className="text-primary">AI Guides</span>
                </>
              ) : (
                <>
                  Sektöre Özel <span className="text-primary">AI Rehberleri</span>
                </>
              )}
            </h1>
            <p className="mt-6 text-lg text-gray-600 dark:text-dark-muted leading-relaxed">
              {en
                ? "Choose your sector and download a free, practical AI starter guide — concrete first steps with the GROWT Method."
                : "Sektörünü seç, ücretsiz ve pratik AI başlangıç rehberini indir — GROWT Method ile somut ilk adımlar."}
            </p>
          </div>
        </Container>
      </section>

      <section className="py-16 bg-white dark:bg-dark-bg transition-colors">
        <Container>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {REHBER_SLUGS.map((slug) => {
              const r = REHBERLER[slug];
              return (
                <Link key={slug} href={`/rehber/${slug}`} className="group">
                  <Card hover className="h-full flex flex-col justify-between">
                    <div>
                      <div className="text-3xl mb-3">{r.icon}</div>
                      <h2 className="text-xl font-bold text-dark dark:text-white group-hover:text-primary transition-colors">
                        {r.name}
                      </h2>
                      <p className="mt-2 text-sm text-gray-600 dark:text-dark-muted leading-relaxed line-clamp-2">
                        {r.hero.subtitle}
                      </p>
                    </div>
                    <div className="mt-4 flex items-center text-sm font-medium text-primary">
                      {en ? "Get the free guide" : "Ücretsiz rehberi al"}
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
