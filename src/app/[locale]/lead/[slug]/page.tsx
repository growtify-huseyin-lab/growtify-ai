import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { LeadForm } from "@/components/forms/LeadForm";
import {
  getLeadMagnet,
  getAllLeadMagnetSlugs,
  FORMAT_CONFIG,
} from "@/content/lead-magnets";
import { CheckCircle2 } from "lucide-react";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllLeadMagnetSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const magnet = getLeadMagnet(slug);
  if (!magnet) return { title: "İçerik bulunamadı" };

  return {
    title: magnet.seo.title,
    description: magnet.seo.description,
    alternates: { canonical: `/lead/${slug}` },
    openGraph: {
      title: magnet.seo.title,
      description: magnet.seo.description,
      type: "website",
    },
    robots: { index: false, follow: true },
  };
}

export default async function LeadMagnetPage({ params }: PageProps) {
  const { slug } = await params;
  const magnet = getLeadMagnet(slug);
  if (!magnet || !magnet.active) notFound();

  const fmt = FORMAT_CONFIG[magnet.format];

  return (
    <>
      {/* Hero */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-white via-primary/3 to-accent/10 dark:from-dark-bg dark:via-primary/5 dark:to-accent/5 transition-colors">
        <Container>
          <div className="mx-auto max-w-4xl">
            <div className="mb-4 flex items-center justify-center gap-3">
              <span className="text-5xl">{magnet.icon}</span>
              <Badge variant="primary">{fmt.badge}</Badge>
            </div>
            <h1 className="text-center text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-dark dark:text-white">
              {magnet.title}
            </h1>
            <p className="mt-4 text-center text-lg text-gray-600 dark:text-dark-muted">
              {magnet.subtitle}
            </p>
            <p className="mt-6 mx-auto max-w-2xl text-center text-base text-gray-700 dark:text-dark-text italic">
              {magnet.painHook}
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
                {magnet.format === "pdf" && "Bu rehberde neler var?"}
                {magnet.format === "checklist" && "Bu checklist'te neler var?"}
                {magnet.format === "template" && "Bu pakette neler var?"}
                {magnet.format === "video" && "Bu videoda neler var?"}
                {magnet.format === "prompt-pack" && "Bu pakette neler var?"}
              </h2>
              <p className="mt-2 text-gray-600 dark:text-dark-muted">
                Hedef kitle:{" "}
                <span className="font-medium">{magnet.targetProfile}</span>
              </p>
              <ul className="mt-6 space-y-3">
                {magnet.whatInside.map((item, i) => (
                  <li key={i} className="flex gap-3">
                    <CheckCircle2
                      size={20}
                      className="mt-0.5 flex-shrink-0 text-primary"
                    />
                    <span className="text-gray-700 dark:text-dark-text">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right: Form */}
            <div>
              <div className="rounded-2xl border border-gray-200 dark:border-dark-border bg-light dark:bg-dark-card p-6 lg:p-8">
                <h3 className="text-xl font-bold text-dark dark:text-white">
                  Ücretsiz {magnet.formatLabel.toLowerCase()} al
                </h3>
                <p className="mt-2 text-sm text-gray-600 dark:text-dark-muted">
                  Email adresini yaz, {magnet.formatLabel.toLowerCase()} anında
                  sana ulaşsın.
                </p>
                <div className="mt-6">
                  <LeadForm
                    slug={magnet.slug}
                    ctaVerb={fmt.ctaVerb}
                    assetUrl={magnet.assetUrl}
                    assetDelivery={magnet.assetDelivery}
                    formatLabel={magnet.formatLabel}
                  />
                </div>
                <p className="mt-4 text-xs text-gray-500 dark:text-dark-muted">
                  Email&apos;ini spam için kullanmıyoruz. İstediğin zaman
                  çıkabilirsin.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
