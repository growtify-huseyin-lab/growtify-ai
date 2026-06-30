import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Link } from "@/i18n/navigation";
import { ArrowRight } from "lucide-react";
import { getAllUseCases, getIndexableUseCases } from "@/lib/use-cases";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const en = locale === "en";
  // Phase-1 hub stays noindex until enough child pages clear the quality gate.
  const anyIndexable = getIndexableUseCases(locale).length > 0;
  return {
    title: en ? "AI Use Cases by Profession" : "Mesleğe Göre Yapay Zeka Senaryoları",
    description: en
      ? "Workflow-first AI use cases by profession and goal — client acquisition and scaling, mapped to the GROWT Method."
      : "Mesleğe ve hedefe göre iş-akışı odaklı yapay zeka senaryoları — müşteri edinme ve ölçekleme, GROWT Metodu'na bağlı.",
    alternates: { canonical: en ? "/en/use-case" : "/use-case" },
    robots: anyIndexable ? undefined : { index: false, follow: true },
  };
}

export default async function UseCaseIndexPage({ params }: Props) {
  const { locale } = await params;
  const en = locale === "en";
  const all = getAllUseCases(locale);

  // Group by sector for a clean hub layout.
  const bySector = new Map<string, typeof all>();
  for (const u of all) {
    const arr = bySector.get(u.sector) ?? [];
    arr.push(u);
    bySector.set(u.sector, arr);
  }

  return (
    <>
      <section className="py-16 bg-gradient-to-br from-white via-primary/3 to-accent/10 dark:from-dark-bg dark:via-primary/5 dark:to-accent/5 transition-colors">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-extrabold tracking-tight text-dark dark:text-white sm:text-5xl">
              {en ? "AI Use Cases by Profession" : "Mesleğe Göre Yapay Zeka Senaryoları"}
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-gray-600 dark:text-dark-muted">
              {en
                ? "Workflow-first playbooks by profession and goal — not another AI course. Each maps to a stage of the GROWT Method."
                : "Mesleğe ve hedefe göre iş-akışı odaklı playbook'lar — başka bir AI kursu değil. Her biri GROWT Metodu'nun bir aşamasına bağlı."}
            </p>
          </div>
        </Container>
      </section>

      <section className="py-12 bg-white dark:bg-dark-bg transition-colors">
        <Container>
          <div className="mx-auto max-w-3xl space-y-10">
            {[...bySector.entries()].map(([sector, items]) => (
              <div key={sector}>
                <h2 className="mb-4 text-sm font-bold uppercase tracking-wider text-primary">
                  {sector}
                </h2>
                <div className="flex flex-col gap-4">
                  {items.map((u) => (
                    <Link key={u.slug} href={`/use-case/${u.slug}`} className="group">
                      <div className="rounded-2xl bg-light dark:bg-dark-card border border-gray-100 dark:border-dark-border p-6 transition hover:border-primary/40">
                        <h3 className="text-lg font-bold text-dark dark:text-white group-hover:text-primary transition-colors">
                          {u.title}
                        </h3>
                        <p className="mt-2 text-sm text-gray-600 dark:text-dark-muted line-clamp-2">
                          {u.excerpt}
                        </p>
                        <span className="mt-3 inline-flex items-center text-sm font-semibold text-primary group-hover:underline">
                          {en ? "Read" : "Oku"}
                          <ArrowRight size={15} className="ml-1" />
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
