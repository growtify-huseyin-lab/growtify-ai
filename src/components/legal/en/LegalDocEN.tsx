import { Container } from "@/components/ui/Container";

// Shared shell for UK-law English legal documents (Humax Global Ltd).
// Prepared to UK standards; entity facts

export function LegalDocEN({
  title,
  lastUpdated,
  children,
}: {
  title: string;
  lastUpdated: string;
  children: React.ReactNode;
}) {
  return (
    <section className="py-20 bg-white dark:bg-dark-bg transition-colors">
      <Container className="max-w-4xl">
        <h1 className="text-4xl font-extrabold tracking-tight text-dark dark:text-white">
          {title}
        </h1>
        <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
          Last updated: {lastUpdated} · Operated by Humax Global Ltd (United Kingdom)
        </p>
        <div className="prose prose-lg dark:prose-invert mt-8 max-w-none prose-headings:text-dark dark:prose-headings:text-white prose-a:text-primary">
          {children}
        </div>
      </Container>
    </section>
  );
}
