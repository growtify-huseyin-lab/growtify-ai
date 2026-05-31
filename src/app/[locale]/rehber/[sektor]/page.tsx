import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { RehberForm } from "@/components/forms/RehberForm";
import { REHBERLER, REHBER_SLUGS, getRehber } from "@/content/rehberler";
import { CheckCircle2 } from "lucide-react";

interface PageProps {
  params: Promise<{ sektor: string }>;
}

export async function generateStaticParams() {
  return REHBER_SLUGS.map((sektor) => ({ sektor }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { sektor } = await params;
  const rehber = getRehber(sektor);
  if (!rehber) return { title: "Rehber bulunamadı" };

  return {
    title: rehber.seo.title,
    description: rehber.seo.description,
    alternates: { canonical: `/rehber/${sektor}` },
    openGraph: {
      title: rehber.seo.title,
      description: rehber.seo.description,
      type: "website",
    },
  };
}

export default async function RehberPage({ params }: PageProps) {
  const { sektor } = await params;
  const rehber = getRehber(sektor);
  if (!rehber) notFound();

  return (
    <>
      {/* Hero */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-white via-primary/3 to-accent/10 dark:from-dark-bg dark:via-primary/5 dark:to-accent/5 transition-colors">
        <Container>
          <div className="mx-auto max-w-4xl">
            <div className="mb-4 text-center">
              <span className="text-5xl">{rehber.icon}</span>
            </div>
            <h1 className="text-center text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-dark dark:text-white">
              {rehber.hero.title}
            </h1>
            <p className="mt-4 text-center text-lg text-gray-600 dark:text-dark-muted">
              {rehber.hero.subtitle}
            </p>
            <p className="mt-6 mx-auto max-w-2xl text-center text-base text-gray-700 dark:text-dark-text italic">
              {rehber.hero.painHook}
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
                Bu rehberde neler var?
              </h2>
              <p className="mt-2 text-gray-600 dark:text-dark-muted">
                Hedef kitle: <span className="font-medium">{rehber.targetProfile}</span>
              </p>
              <ul className="mt-6 space-y-3">
                {rehber.whatInside.map((item, i) => (
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
                  Rehberi ücretsiz indir
                </h3>
                <p className="mt-2 text-sm text-gray-600 dark:text-dark-muted">
                  Email adresini yaz, rehber anında email'ine gelsin.
                </p>
                <div className="mt-6">
                  <RehberForm sektor={rehber.slug} />
                </div>
                <p className="mt-4 text-xs text-gray-500 dark:text-dark-muted">
                  Email'ini spam için kullanmıyoruz. Growtify AI haftalık bülteni için
                  istediğin zaman çıkabilirsin.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
