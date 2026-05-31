import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { REHBERLER_EN, GUIDE_SLUGS } from "@/content/rehberler/en";
import { ArrowRight } from "lucide-react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (locale !== "en") return { title: "Guides" };
  return {
    title: "Sector-Specific AI Guides — Free Downloads | Growtify.ai",
    description:
      "Free, sector-specific AI starter guides — healthcare, law, e-commerce, and more. Practical first steps with the GROWT Method.",
    alternates: {
      canonical: "/en/guide",
      languages: {
        tr: "/rehber",
        en: "/en/guide",
        "x-default": "/rehber",
      },
    },
  };
}

export default async function GuideIndexPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (locale !== "en") notFound();

  return (
    <>
      <section className="py-20 bg-gradient-to-br from-white via-primary/3 to-accent/10 dark:from-dark-bg dark:via-primary/5 dark:to-accent/5 transition-colors">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="accent" className="mb-6">
              Free Guides
            </Badge>
            <h1 className="text-4xl font-extrabold tracking-tight text-dark dark:text-white sm:text-5xl">
              Sector-Specific <span className="text-primary">AI Guides</span>
            </h1>
            <p className="mt-6 text-lg text-gray-600 dark:text-dark-muted leading-relaxed">
              Choose your sector and download a free, practical AI starter guide —
              concrete first steps with the GROWT Method.
            </p>
          </div>
        </Container>
      </section>

      <section className="py-16 bg-white dark:bg-dark-bg transition-colors">
        <Container>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {GUIDE_SLUGS.map((slug) => {
              const r = REHBERLER_EN[slug];
              return (
                <Link key={slug} href={`/guide/${slug}`} className="group">
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
                      Get the free guide
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
