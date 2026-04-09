import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { BlogCard } from "@/components/blog/BlogCard";
import { GROWT_PHASES } from "@/lib/constants";
import { getAllPosts } from "@/lib/blog";
import { getSectorBySlug, getAllSectorSlugs } from "@/data/sectors";
import { getSectorContent } from "@/data/sector-content";
import {
  ArrowRight,
  Clock,
  FileText,
  UserX,
  Search,
  MessageSquare,
  Camera,
  Calendar,
  Globe,
  Package,
  BookOpen,
  TrendingDown,
  UserPlus,
  Layers,
  BarChart,
  TrendingUp,
  ChevronDown,
} from "lucide-react";

const iconMap: Record<string, React.ElementType> = {
  Clock, FileText, UserX, Search, MessageSquare, Camera, Calendar,
  Globe, Package, BookOpen, TrendingDown, UserPlus, Layers, BarChart, TrendingUp,
};

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllSectorSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const sector = getSectorBySlug(slug);
  const content = getSectorContent(slug);
  if (!sector) return { title: "Sektör Bulunamadı" };

  const faqSchema = content?.faq
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: content.faq.map((f) => ({
          "@type": "Question",
          name: f.question,
          acceptedAnswer: { "@type": "Answer", text: f.answer },
        })),
      }
    : null;

  return {
    title: sector.seoTitle,
    description: sector.seoDescription,
    alternates: {
      canonical: `/sektor/${slug}`,
    },
  };
}

export default async function SectorPage({ params }: Props) {
  const { slug } = await params;
  const sector = getSectorBySlug(slug);
  if (!sector) notFound();

  const content = getSectorContent(slug);
  const relatedPosts = getAllPosts().filter(
    (p) => p.sectorRef === slug || sector.relatedBlogSlugs.includes(p.slug)
  );

  const BASE_URL = "https://growtify.ai";

  const faqSchema = content?.faq
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: content.faq.map((f) => ({
          "@type": "Question",
          name: f.question,
          acceptedAnswer: { "@type": "Answer", text: f.answer },
        })),
      }
    : null;

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: BASE_URL },
      { "@type": "ListItem", position: 2, name: "Sektörler", item: `${BASE_URL}/sektor` },
      { "@type": "ListItem", position: 3, name: sector.fullTitle },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      {/* 1. Hero */}
      <section className="py-20 bg-gradient-to-br from-white via-primary/3 to-accent/10 dark:from-dark-bg dark:via-primary/5 dark:to-accent/5 transition-colors">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="accent" className="mb-6">
              {sector.fullTitle} İçin Yapay Zeka
            </Badge>
            <h1 className="text-4xl font-extrabold tracking-tight text-dark dark:text-white sm:text-5xl">
              {sector.h1}
            </h1>
            <p className="mt-6 text-lg text-gray-600 dark:text-dark-muted leading-relaxed">
              {sector.heroSubtitle}
            </p>
            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Button href="https://app.growtify.app/payment-link/69d20484c6a0e600f4d07a46" variant="primary" size="lg" external>
                Programa Katıl <ArrowRight size={18} className="ml-2" />
              </Button>
              <Button href="/test" variant="ghost" size="lg" className="border border-gray-200 dark:border-dark-border">
                AI Olgunluk Testi
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* 2. Intro Text */}
      {content?.introText && (
        <section className="py-16 bg-white dark:bg-dark-bg transition-colors">
          <Container>
            <div className="mx-auto max-w-3xl">
              {content.introText.split("\n").map((paragraph, i) => (
                <p
                  key={i}
                  className="text-gray-700 dark:text-dark-muted leading-relaxed mb-4 last:mb-0"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* 3. Stats */}
      {content?.stats && content.stats.length > 0 && (
        <section className="py-16 bg-light dark:bg-dark-bg/50 transition-colors">
          <Container>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {content.stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-xl border border-gray-100 dark:border-dark-border bg-white dark:bg-dark-card p-6 text-center"
                >
                  <p className="text-3xl font-extrabold text-primary">{stat.value}</p>
                  <p className="mt-2 text-sm text-gray-600 dark:text-dark-muted">{stat.label}</p>
                </div>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* 4. Problems */}
      <section className="py-20 bg-white dark:bg-dark-bg transition-colors">
        <Container>
          <div className="mx-auto max-w-3xl text-center mb-12">
            <h2 className="text-3xl font-bold text-dark dark:text-white">
              {sector.title} sektöründe <span className="text-primary">3 büyük engel</span>
            </h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-3">
            {sector.problems.map((p) => {
              const Icon = iconMap[p.icon] || Clock;
              return (
                <Card key={p.title} hover>
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 dark:bg-primary/20">
                    <Icon size={24} className="text-primary" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-dark dark:text-white">{p.title}</h3>
                  <p className="mt-2 text-sm text-gray-600 dark:text-dark-muted leading-relaxed">{p.description}</p>
                </Card>
              );
            })}
          </div>
        </Container>
      </section>

      {/* 5. AI Scenarios */}
      <section className="py-20 bg-light dark:bg-dark-bg/50 transition-colors">
        <Container>
          <div className="mx-auto max-w-3xl text-center mb-12">
            <h2 className="text-3xl font-bold text-dark dark:text-white">
              Yapay zeka ile <span className="text-primary">nasıl değişir?</span>
            </h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-3">
            {sector.scenarios.map((s) => (
              <Card key={s.title} hover className="relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/0 via-primary to-primary/0" />
                <h3 className="text-lg font-semibold text-dark dark:text-white">{s.title}</h3>
                <p className="mt-2 text-sm text-gray-600 dark:text-dark-muted leading-relaxed">{s.description}</p>
                <div className="mt-4 flex items-center gap-4 text-sm">
                  <div className="flex-1 rounded-lg bg-red-50 dark:bg-red-900/20 p-3 text-center">
                    <p className="text-xs text-gray-500 dark:text-dark-muted">Önce</p>
                    <p className="font-semibold text-red-600 dark:text-red-400">{s.beforeTime}</p>
                  </div>
                  <ArrowRight size={16} className="text-gray-300 dark:text-dark-border shrink-0" />
                  <div className="flex-1 rounded-lg bg-green-50 dark:bg-green-900/20 p-3 text-center">
                    <p className="text-xs text-gray-500 dark:text-dark-muted">Sonra</p>
                    <p className="font-semibold text-green-600 dark:text-green-400">{s.afterTime}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* 6. GROWT Method */}
      <section className="py-20 bg-white dark:bg-dark-bg transition-colors">
        <Container>
          <div className="mx-auto max-w-3xl text-center mb-12">
            <h2 className="text-3xl font-bold text-dark dark:text-white">
              Bu sektörde <span className="text-primary">GROWT nasıl çalışır?</span>
            </h2>
            <p className="mt-4 text-gray-600 dark:text-dark-muted">{sector.growtContext}</p>
          </div>
          <div className="grid gap-3 sm:grid-cols-5">
            {GROWT_PHASES.map((phase) => (
              <div key={phase.letter} className="rounded-xl border border-gray-100 dark:border-dark-border bg-light dark:bg-dark-card p-4 text-center">
                <div className={`mx-auto flex h-10 w-10 items-center justify-center rounded-lg text-lg font-bold text-white ${phase.color}`}>
                  {phase.letter}
                </div>
                <p className="mt-2 text-sm font-semibold text-dark dark:text-white">{phase.name}</p>
                <p className="mt-1 text-xs text-gray-500 dark:text-dark-muted">{phase.motto}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* 7. FAQ */}
      {content?.faq && content.faq.length > 0 && (
        <section className="py-20 bg-light dark:bg-dark-bg/50 transition-colors">
          <Container>
            <div className="mx-auto max-w-3xl">
              <h2 className="text-3xl font-bold text-dark dark:text-white text-center mb-12">
                Sıkça Sorulan <span className="text-primary">Sorular</span>
              </h2>
              <div className="space-y-4">
                {content.faq.map((item, i) => (
                  <details
                    key={i}
                    className="group rounded-xl border border-gray-200 dark:border-dark-border bg-white dark:bg-dark-card"
                  >
                    <summary className="flex cursor-pointer items-center justify-between p-5 text-left font-semibold text-dark dark:text-white">
                      {item.question}
                      <ChevronDown
                        size={20}
                        className="shrink-0 ml-4 text-gray-400 transition-transform group-open:rotate-180"
                      />
                    </summary>
                    <div className="px-5 pb-5 text-sm text-gray-600 dark:text-dark-muted leading-relaxed">
                      {item.answer}
                    </div>
                  </details>
                ))}
              </div>
            </div>
          </Container>
        </section>
      )}

      {/* 8. Related blog */}
      {relatedPosts.length > 0 && (
        <section className="py-20 bg-white dark:bg-dark-bg transition-colors">
          <Container>
            <h2 className="text-2xl font-bold text-dark dark:text-white mb-8">
              Bu sektörde daha fazla
            </h2>
            <div className="grid gap-6 sm:grid-cols-3">
              {relatedPosts.slice(0, 3).map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* 9. CTA */}
      <section className="py-20 bg-gradient-to-br from-primary to-primary-light">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              Yapay zeka ile {sector.title.toLowerCase()} işini büyütmeye hazır mısın?
            </h2>
            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Button href="https://app.growtify.app/payment-link/69d20484c6a0e600f4d07a46" variant="accent" size="lg" external>
                Programa Katıl <ArrowRight size={18} className="ml-2" />
              </Button>
              <Button href="/test" variant="ghost" size="lg" className="text-white/80 border border-white/20 hover:border-white/40 hover:text-white hover:bg-white/5">
                AI Olgunluk Testine Başla
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
