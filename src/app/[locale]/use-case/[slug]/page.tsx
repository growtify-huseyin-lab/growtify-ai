import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { Link } from "@/i18n/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { ArrowLeft, ArrowRight, CalendarDays, Clock, User } from "lucide-react";
import { getAllUseCases, getUseCaseBySlug } from "@/lib/use-cases";

const BASE_URL = "https://growtify.ai";

type Props = { params: Promise<{ slug: string; locale: string }> };

// EN-only here: TR pSEO pages serve from the localized /kullanim-alani route (same component,
// re-exported). Old /use-case (TR) 301s to /kullanim-alani in middleware.
export async function generateStaticParams() {
  return getAllUseCases("en").map((u) => ({ locale: "en", slug: u.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, locale } = await params;
  const uc = getUseCaseBySlug(slug, locale);
  if (!uc) return { title: locale === "en" ? "Use case not found" : "Senaryo bulunamadı" };

  const canonical =
    locale === "en" ? `/en/use-case/${uc.slug}` : `/kullanim-alani/${uc.slug}`;

  return {
    title: uc.seoTitle,
    description: uc.seoDescription,
    alternates: { canonical },
    // Quality gate: Phase-1 pages ship noindex until SEO flips frontmatter `noindex:false`.
    robots: uc.noindex ? { index: false, follow: true } : undefined,
    openGraph: {
      title: uc.seoTitle,
      description: uc.seoDescription,
      type: "article",
      publishedTime: uc.date,
      authors: [uc.author],
    },
  };
}

export default async function UseCasePage({ params }: Props) {
  const { slug, locale } = await params;
  const uc = getUseCaseBySlug(slug, locale);
  if (!uc) notFound();

  const en = locale === "en";
  // Locale-aware URL segment: EN keeps /use-case, TR uses Turkish /kullanim-alani.
  const seg = en ? "use-case" : "kullanim-alani";
  const indexBase = `/${seg}`;
  const testHref = "/test";
  const growtHref = "/growt-method";

  // Related: same sector, other problem.
  const related = getAllUseCases(locale)
    .filter((u) => u.slug !== uc.slug && u.sector === uc.sector)
    .slice(0, 3);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: uc.title,
    description: uc.seoDescription,
    datePublished: uc.date,
    dateModified: uc.date,
    author: { "@type": "Organization", name: uc.author, url: BASE_URL },
    publisher: { "@type": "Organization", name: "Growtify.ai", url: BASE_URL },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${BASE_URL}${en ? "/en" : ""}/${seg}/${uc.slug}`,
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: en ? "Home" : "Ana Sayfa", item: BASE_URL },
      {
        "@type": "ListItem",
        position: 2,
        name: en ? "Use Cases" : "Kullanım Senaryoları",
        item: `${BASE_URL}${en ? "/en" : ""}/${seg}`,
      },
      { "@type": "ListItem", position: 3, name: uc.title },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Hero */}
      <section className="border-b border-gray-100 dark:border-dark-border bg-white dark:bg-dark-bg transition-colors">
        <Container>
          <div className="pt-6 pb-2">
            <Link
              href={indexBase}
              className="inline-flex items-center gap-1.5 text-sm text-gray-500 dark:text-dark-muted hover:text-primary transition-colors"
            >
              <ArrowLeft size={14} />
              {en ? "All use cases" : "Tüm senaryolar"}
            </Link>
          </div>

          <div className="relative w-full aspect-[2.5/1] rounded-2xl bg-gradient-to-br from-primary/10 via-accent/5 to-primary/5 dark:from-primary/20 dark:via-accent/10 dark:to-primary/10 mb-8 overflow-hidden flex items-center justify-center">
            <div className="text-center px-8">
              <Badge variant="primary" className="mb-4">
                {en ? "Use Case" : "Kullanım Senaryosu"}
              </Badge>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-dark dark:text-white leading-tight max-w-3xl mx-auto">
                {uc.title}
              </h1>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 pb-8 text-sm text-gray-500 dark:text-dark-muted">
            <span className="flex items-center gap-1.5">
              <CalendarDays size={14} />
              {uc.date}
            </span>
            <span className="flex items-center gap-1.5">
              <User size={14} />
              {uc.author}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock size={14} />
              {uc.readTime}
            </span>
          </div>
        </Container>
      </section>

      {/* Content */}
      <section className="py-12 bg-light dark:bg-dark-bg/50 transition-colors">
        <Container>
          <div className="mx-auto max-w-3xl">
            <article className="rounded-2xl bg-white dark:bg-dark-card border border-gray-100 dark:border-dark-border p-6 sm:p-8 lg:p-10">
              <div className="blog-prose">
                <MDXRemote source={uc.content} />
              </div>
            </article>

            {/* End CTA */}
            <div className="mt-10 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 dark:from-primary/20 dark:to-accent/10 border border-primary/20 p-8 text-center">
              <h2 className="text-xl font-bold text-dark dark:text-white">
                {en
                  ? "See where AI fits your practice"
                  : "Yapay zekanın işine nerede oturduğunu gör"}
              </h2>
              <p className="mt-2 text-gray-600 dark:text-dark-muted">
                {en
                  ? "Take the 2-minute assessment, or explore the GROWT Method."
                  : "2 dakikalık değerlendirmeyi yap ya da GROWT Metodu'nu incele."}
              </p>
              <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                <Link
                  href={testHref}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-white transition hover:opacity-90"
                >
                  {en ? "Start the assessment" : "Değerlendirmeye başla"}
                  <ArrowRight size={15} />
                </Link>
                <Link
                  href={growtHref}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-primary/30 px-5 py-2.5 text-sm font-semibold text-primary transition hover:border-primary/60"
                >
                  {en ? "GROWT Method" : "GROWT Metodu"}
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Related (same sector) */}
      {related.length > 0 && (
        <section className="py-16 bg-white dark:bg-dark-bg border-t border-gray-100 dark:border-dark-border transition-colors">
          <Container>
            <div className="mx-auto max-w-3xl">
              <h2 className="text-2xl font-bold text-dark dark:text-white mb-8">
                {en ? "Related use cases" : "İlgili senaryolar"}
              </h2>
              <div className="flex flex-col gap-4">
                {related.map((u) => (
                  <Link key={u.slug} href={`/${seg}/${u.slug}`} className="group">
                    <div className="rounded-2xl bg-light dark:bg-dark-card border border-gray-100 dark:border-dark-border p-6 transition hover:border-primary/40">
                      <h3 className="text-lg font-bold text-dark dark:text-white group-hover:text-primary transition-colors">
                        {u.title}
                      </h3>
                      <p className="mt-2 text-sm text-gray-600 dark:text-dark-muted line-clamp-2">
                        {u.excerpt}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </Container>
        </section>
      )}
    </>
  );
}
