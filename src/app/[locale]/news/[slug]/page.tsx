import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/Container";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllUpdates, getUpdateBySlug } from "@/lib/gelismeler";
import { ArrowLeft } from "lucide-react";

// EN-slug fork of /gelismeler/[slug]: EN canonical /en/news/{slug}. TR/EN slugs
// differ (separate content), so no cross-locale hreflang pair on detail pages —
// canonical-only. A TR↔EN slug map could be added later if pairing is needed.

type Props = { params: Promise<{ slug: string; locale: string }> };

export function generateStaticParams() {
  return getAllUpdates("en").map((u) => ({ locale: "en", slug: u.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, locale } = await params;
  const u = getUpdateBySlug(slug, locale);
  if (!u) return {};
  return {
    title: u.title,
    description: u.summary,
    alternates: { canonical: `/en/news/${slug}` },
  };
}

function formatDate(date: string, en: boolean): string {
  const d = new Date(date);
  if (isNaN(d.getTime())) return date;
  return d.toLocaleDateString(en ? "en-US" : "tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function NewsDetailPage({ params }: Props) {
  const { slug, locale } = await params;
  const u = getUpdateBySlug(slug, locale);
  if (!u) notFound();

  const en = locale === "en";

  return (
    <section className="py-16 bg-white dark:bg-dark-bg transition-colors">
      <Container>
        <div className="mx-auto max-w-2xl">
          <Link
            href="/news"
            className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
          >
            <ArrowLeft size={15} />
            {en ? "All news" : "Tüm gelişmeler"}
          </Link>

          <div className="mt-6 flex flex-wrap items-center gap-2 text-xs font-medium text-primary">
            <time dateTime={u.date}>{formatDate(u.date, en)}</time>
            {u.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-primary/10 px-2 py-0.5 dark:bg-primary/20"
              >
                {tag}
              </span>
            ))}
          </div>

          <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-dark dark:text-white sm:text-4xl">
            {u.title}
          </h1>

          <div className="blog-prose mt-8">
            <MDXRemote source={u.content} />
          </div>
        </div>
      </Container>
    </section>
  );
}
