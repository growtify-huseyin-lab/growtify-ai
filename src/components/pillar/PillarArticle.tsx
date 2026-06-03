import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Link } from "@/i18n/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Clock, CalendarDays, ArrowRight } from "lucide-react";
import type { Pillar } from "@/lib/pillars";

const BASE_URL = "https://growtify.ai";

type Props = { pillar: Pillar };

// The prepared MDX bodies open with an `# H1` that duplicates the frontmatter
// title. We render the title separately as the article <h1>, so strip the first
// leading H1 from the MDX source to avoid a duplicate top-level heading.
function stripLeadingH1(md: string): string {
  return md.replace(/^\s*#\s+.+?(?:\n|$)/, "");
}

export function PillarArticle({ pillar }: Props) {
  const url = `${BASE_URL}${pillar.en_path}`;
  const body = stripLeadingH1(pillar.content);

  const schemaTypes = pillar.schema || [];
  const jsonLd: object[] = [];

  // Article (or Course, if the pillar declares it) — primary content schema.
  if (schemaTypes.includes("Course")) {
    jsonLd.push({
      "@context": "https://schema.org",
      "@type": "Course",
      name: pillar.title,
      description: pillar.seoDescription,
      provider: {
        "@type": "Organization",
        name: "Growtify",
        url: BASE_URL,
      },
    });
  } else {
    jsonLd.push({
      "@context": "https://schema.org",
      "@type": "Article",
      headline: pillar.title,
      description: pillar.seoDescription,
      datePublished: pillar.date,
      dateModified: pillar.date,
      author: {
        "@type": "Organization",
        name: pillar.author || "Growtify",
        url: BASE_URL,
      },
      publisher: {
        "@type": "Organization",
        name: "Growtify",
        url: BASE_URL,
      },
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": url,
      },
    });
  }

  // BreadcrumbList — always.
  jsonLd.push({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${BASE_URL}/en` },
      { "@type": "ListItem", position: 2, name: pillar.title, item: url },
    ],
  });

  // FAQPage stub — only if the pillar declares it in its schema array.
  if (schemaTypes.includes("FAQPage")) {
    jsonLd.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [],
    });
  }

  return (
    <>
      {jsonLd.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      <section className="py-12 bg-light dark:bg-dark-bg/50 transition-colors">
        <Container>
          <article className="mx-auto min-w-0 max-w-3xl">
            <div className="rounded-2xl bg-white dark:bg-dark-card border border-gray-100 dark:border-dark-border p-6 sm:p-8 lg:p-10">
              {/* Title */}
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-dark dark:text-white leading-tight">
                {pillar.title}
              </h1>

              {/* Meta line */}
              <div className="mt-4 mb-8 flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-dark-muted">
                <span className="flex items-center gap-1.5">
                  <Clock size={14} />
                  {pillar.readTime}
                </span>
                <span className="flex items-center gap-1.5">
                  <CalendarDays size={14} />
                  {pillar.date}
                </span>
              </div>

              {/* MDX body */}
              <div className="blog-prose">
                <MDXRemote source={body} />
              </div>
            </div>

            {/* CTA */}
            <div className="mt-8 rounded-2xl border border-primary/20 dark:border-primary/30 bg-gradient-to-br from-primary/5 via-white to-accent/10 dark:from-primary/10 dark:via-dark-card dark:to-accent/5 p-6 sm:p-8 text-center">
              <Badge variant="accent" className="mb-4">
                GROWT Method
              </Badge>
              <h2 className="text-xl sm:text-2xl font-bold text-dark dark:text-white">
                Build your personal AI transformation plan
              </h2>
              <p className="mt-3 text-gray-600 dark:text-dark-muted">
                Take the free GROWT assessment and get a structured, step-by-step
                plan tailored to your business.
              </p>
              <div className="mt-6 flex justify-center">
                <Button href="/test" variant="primary" size="md">
                  Start the free assessment
                  <ArrowRight size={16} className="ml-2" />
                </Button>
              </div>
            </div>
          </article>
        </Container>
      </section>
    </>
  );
}
