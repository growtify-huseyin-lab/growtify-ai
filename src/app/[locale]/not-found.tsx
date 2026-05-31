import { Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { ArrowLeft, Search } from "lucide-react";

export default async function NotFound() {
  const t = await getTranslations("notfoundPage");
  return (
    <section className="py-32 bg-white dark:bg-dark-bg transition-colors">
      <Container>
        <div className="mx-auto max-w-lg text-center">
          <div className="flex justify-center mb-8">
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-primary/10 dark:bg-primary/20">
              <Search size={36} className="text-primary" />
            </div>
          </div>
          <h1 className="text-4xl font-extrabold text-dark dark:text-white">
            {t("heading")}
          </h1>
          <p className="mt-4 text-gray-600 dark:text-dark-muted leading-relaxed">
            {t("description")}
          </p>
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Button href="/" variant="primary" size="lg">
              <ArrowLeft size={18} className="mr-2" />
              {t("backHome")}
            </Button>
            <Button href="/blog" variant="ghost" size="lg" className="border border-gray-200 dark:border-dark-border">
              {t("browseBlog")}
            </Button>
          </div>
          <div className="mt-12 text-sm text-gray-500 dark:text-dark-muted">
            <p>{t("popularPages")}</p>
            <div className="mt-3 flex flex-wrap justify-center gap-3">
              <Link href="/growt-method" className="text-primary hover:underline">GROWT Method</Link>
              <Link href="/sektor" className="text-primary hover:underline">{t("sectors")}</Link>
              <Link href="/test" className="text-primary hover:underline">{t("aiMaturityTest")}</Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
