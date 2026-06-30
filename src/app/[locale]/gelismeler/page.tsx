import type { Metadata } from "next";
import { localeAltPair } from "@/lib/seo-alternates";
import { Container } from "@/components/ui/Container";
import { getAllUpdates } from "@/lib/gelismeler";
import { GelismelerList } from "@/components/GelismelerList";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const en = locale === "en";
  return {
    title: en ? "Updates" : "Gelişmeler",
    description: en
      ? "The latest developments, releases, and behind-the-scenes from Growtify.ai."
      : "Growtify.ai'dan en güncel gelişmeler, yenilikler ve perde arkası.",
    alternates: localeAltPair(locale, "/gelismeler", "/news"),
  };
}

export default async function GelismelerPage({ params }: Props) {
  const { locale } = await params;
  const en = locale === "en";
  const updates = getAllUpdates(locale);

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
            <GelismelerList updates={updates} en={en} />
          </div>
        </Container>
      </section>
    </>
  );
}
