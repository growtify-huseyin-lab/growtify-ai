import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { RehberForm } from "@/components/forms/RehberForm";
import { getGuideEn, GUIDE_SLUGS, GUIDE_EN_TO_TR } from "@/content/rehberler/en";
import { CheckCircle2 } from "lucide-react";

interface PageProps {
  params: Promise<{ locale: string; slug: string }>;
}

// EN-only fork: /en/guide/{english-slug}. TR uses /rehber/{tr-slug}.
export function generateStaticParams() {
  return GUIDE_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const guide = getGuideEn(slug);
  if (locale !== "en" || !guide) return { title: "Guide not found" };

  const trSlug = GUIDE_EN_TO_TR[slug];
  return {
    title: guide.seo.title,
    description: guide.seo.description,
    alternates: {
      canonical: `/en/guide/${slug}`,
      languages: {
        tr: `/rehber/${trSlug}`,
        en: `/en/guide/${slug}`,
        "x-default": `/rehber/${trSlug}`,
      },
    },
    openGraph: {
      title: guide.seo.title,
      description: guide.seo.description,
      type: "website",
    },
  };
}

export default async function GuidePage({ params }: PageProps) {
  const { locale, slug } = await params;
  // /guide is the English fork only; TR keeps /rehber.
  if (locale !== "en") notFound();
  const guide = getGuideEn(slug);
  if (!guide) notFound();

  return (
    <>
      {/* Hero */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-white via-primary/3 to-accent/10 dark:from-dark-bg dark:via-primary/5 dark:to-accent/5 transition-colors">
        <Container>
          <div className="mx-auto max-w-4xl">
            <div className="mb-4 text-center">
              <span className="text-5xl">{guide.icon}</span>
            </div>
            <h1 className="text-center text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-dark dark:text-white">
              {guide.hero.title}
            </h1>
            <p className="mt-4 text-center text-lg text-gray-600 dark:text-dark-muted">
              {guide.hero.subtitle}
            </p>
            <p className="mt-6 mx-auto max-w-2xl text-center text-base text-gray-700 dark:text-dark-text italic">
              {guide.hero.painHook}
            </p>
          </div>
        </Container>
      </section>

      {/* What's inside + Form */}
      <section className="py-16 lg:py-20 bg-white dark:bg-dark-bg transition-colors">
        <Container>
          <div className="mx-auto grid max-w-5xl gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Left: what's inside */}
            <div>
              <h2 className="text-2xl font-bold text-dark dark:text-white">
                What&apos;s inside this guide?
              </h2>
              <p className="mt-2 text-gray-600 dark:text-dark-muted">
                Who it&apos;s for: <span className="font-medium">{guide.targetProfile}</span>
              </p>
              <ul className="mt-6 space-y-3">
                {guide.whatInside.map((item, i) => (
                  <li key={i} className="flex gap-3">
                    <CheckCircle2
                      size={20}
                      className="mt-0.5 flex-shrink-0 text-primary dark:text-primary"
                    />
                    <span className="text-gray-700 dark:text-dark-text">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right: Form */}
            <div>
              <div className="rounded-2xl border border-gray-200 dark:border-dark-border bg-light dark:bg-dark-card p-6 lg:p-8">
                <h3 className="text-xl font-bold text-dark dark:text-white">
                  Download the guide for free
                </h3>
                <p className="mt-2 text-sm text-gray-600 dark:text-dark-muted">
                  Enter your email and we&apos;ll send the guide straight to your inbox.
                </p>
                <div className="mt-6">
                  <RehberForm sektor={guide.slug} />
                </div>
                <p className="mt-4 text-xs text-gray-500 dark:text-dark-muted">
                  We won&apos;t use your email for spam. You can unsubscribe from the
                  Growtify AI weekly newsletter anytime.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
