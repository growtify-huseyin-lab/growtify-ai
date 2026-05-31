import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { SECTOR_PAGES, getAllSectorSlugs } from "@/data/sectors";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Sektörler",
  description:
    "Yapay zeka ile hangi sektörde nasıl büyürsün? Sağlık, hukuk, güzellik, emlak, e-ticaret ve daha fazlası.",
  alternates: { canonical: "/sektor" },
};

export default function SektorIndexPage() {
  const slugs = getAllSectorSlugs();

  return (
    <>
      <section className="py-20 bg-gradient-to-br from-white via-primary/3 to-accent/10 dark:from-dark-bg dark:via-primary/5 dark:to-accent/5 transition-colors">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="accent" className="mb-6">
              12 Sektör
            </Badge>
            <h1 className="text-4xl font-extrabold tracking-tight text-dark dark:text-white sm:text-5xl">
              Sektörüne Özel <span className="text-primary">Yapay Zeka Rehberi</span>
            </h1>
            <p className="mt-6 text-lg text-gray-600 dark:text-dark-muted leading-relaxed">
              Her sektörün kendine özgü zorlukları ve fırsatları var. Aşağıdan sektörünü seç, yapay zekanın senin mesleğinde nasıl fark yarattığını gör.
            </p>
          </div>
        </Container>
      </section>

      <section className="py-16 bg-white dark:bg-dark-bg transition-colors">
        <Container>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {slugs.map((slug) => {
              const sector = SECTOR_PAGES[slug];
              return (
                <Link key={slug} href={`/sektor/${slug}`} className="group">
                  <Card hover className="h-full flex flex-col justify-between">
                    <div>
                      <h2 className="text-xl font-bold text-dark dark:text-white group-hover:text-primary transition-colors">
                        {sector.fullTitle}
                      </h2>
                      <p className="mt-2 text-sm text-gray-600 dark:text-dark-muted leading-relaxed line-clamp-2">
                        {sector.heroSubtitle}
                      </p>
                    </div>
                    <div className="mt-4 flex items-center text-sm font-medium text-primary">
                      Detaylı rehberi gör
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
