import type { Metadata } from "next";
import { getLocale } from "next-intl/server";
import { localeAlternates } from "@/lib/seo-alternates";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { getAllUpdates } from "@/lib/gelismeler";
import { ArrowRight } from "lucide-react";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const en = locale === "en";
  return {
    title: en ? "Updates" : "Gelişmeler",
    description: en
      ? "The latest developments, releases, and behind-the-scenes from Growtify.ai."
      : "Growtify.ai'dan en güncel gelişmeler, yenilikler ve perde arkası.",
    alternates: localeAlternates(locale, "/gelismeler"),
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

export default async function GelismelerPage() {
  const locale = await getLocale();
  const en = locale === "en";
  const updates = getAllUpdates();

  return (
    <>
      <section className="py-16 bg-gradient-to-br from-white via-primary/3 to-accent/10 dark:from-dark-bg dark:via-primary/5 dark:to-accent/5 transition-colors">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-extrabold tracking-tight text-dark dark:text-white sm:text-5xl">
              {en ? "Updates" : "Gelişmeler"}
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-gray-600 dark:text-dark-muted">
              {en
                ? "The latest developments, releases, and behind-the-scenes from Growtify.ai — follow it all here."
                : "Growtify.ai'dan en güncel gelişmeler, yenilikler ve perde arkası — hepsini buradan takip et."}
            </p>
          </div>
        </Container>
      </section>

      <section className="py-12 bg-white dark:bg-dark-bg transition-colors">
        <Container>
          <div className="mx-auto max-w-3xl">
            {updates.length === 0 ? (
              <p className="text-center text-gray-500 dark:text-dark-muted">
                {en
                  ? "No updates yet — check back soon."
                  : "Henüz gelişme yok — yakında burada."}
              </p>
            ) : (
              <div className="flex flex-col gap-6">
                {updates.map((u) => (
                  <Link
                    key={u.slug}
                    href={`/gelismeler/${u.slug}`}
                    className="group"
                  >
                    <Card hover>
                      <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-primary">
                        <time dateTime={u.date}>{formatDate(u.date, en)}</time>
                        {u.tags.slice(0, 2).map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full bg-primary/10 px-2 py-0.5 dark:bg-primary/20"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <h2 className="mt-2 text-xl font-bold text-dark dark:text-white">
                        {u.title}
                      </h2>
                      <p className="mt-2 text-gray-600 dark:text-dark-muted">
                        {u.summary}
                      </p>
                      <span className="mt-4 inline-flex items-center text-sm font-semibold text-primary group-hover:underline">
                        {en ? "Read more" : "Devamını oku"}
                        <ArrowRight size={15} className="ml-1" />
                      </span>
                    </Card>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </Container>
      </section>
    </>
  );
}
