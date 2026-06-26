import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getLocale } from "next-intl/server";
import { localeAlternates } from "@/lib/seo-alternates";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/Container";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllUpdates, getUpdateBySlug } from "@/lib/gelismeler";
import { ArrowLeft } from "lucide-react";

export function generateStaticParams() {
  return getAllUpdates().map((u) => ({ slug: u.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const u = getUpdateBySlug(slug);
  if (!u) return {};
  const locale = await getLocale();
  return {
    title: u.title,
    description: u.summary,
    alternates: localeAlternates(locale, `/gelismeler/${slug}`),
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

export default async function GelismeDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const u = getUpdateBySlug(slug);
  if (!u) notFound();

  const locale = await getLocale();
  const en = locale === "en";

  return (
    <section className="py-16 bg-white dark:bg-dark-bg transition-colors">
      <Container>
        <div className="mx-auto max-w-2xl">
          <Link
            href="/gelismeler"
            className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
          >
            <ArrowLeft size={15} />
            {en ? "All updates" : "Tüm gelişmeler"}
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
