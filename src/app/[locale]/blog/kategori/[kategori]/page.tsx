import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { BlogCard } from "@/components/blog/BlogCard";
import { CategoryTabs } from "@/components/blog/CategoryTabs";
import { getPostsByCategory } from "@/lib/blog";
import {
  BLOG_CATEGORIES,
  BLOG_CATEGORIES_EN,
  getBlogCategories,
  getCategoryLabel,
} from "@/lib/blog-categories";

type Props = { params: Promise<{ locale: string; kategori: string }> };

export function generateStaticParams() {
  // Per-locale categories: TR taxonomy for TR, EN taxonomy for EN.
  return [
    ...BLOG_CATEGORIES.map((c) => ({ locale: "tr", kategori: c.slug })),
    ...BLOG_CATEGORIES_EN.map((c) => ({ locale: "en", kategori: c.slug })),
  ];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, kategori } = await params;
  const t = await getTranslations({ locale, namespace: "BlogKategoriPage" });
  const cat = getBlogCategories(locale).find((c) => c.slug === kategori);
  if (!cat) return { title: t("categoryNotFound") };
  const label = getCategoryLabel(kategori, locale);
  return {
    title: t("metaTitle", { label }),
    description: t("metaDescription", { label }),
    alternates: {
      canonical:
        locale === "en"
          ? `/en/blog/kategori/${kategori}`
          : `/blog/kategori/${kategori}`,
    },
  };
}

export default async function BlogCategoryPage({ params }: Props) {
  const { kategori, locale } = await params;
  const t = await getTranslations("BlogKategoriPage");
  const cat = getBlogCategories(locale).find((c) => c.slug === kategori);
  if (!cat) notFound();

  const posts = getPostsByCategory(kategori, locale);
  const label = getCategoryLabel(kategori, locale);

  return (
    <>
      <section className="py-20 bg-gradient-to-br from-white via-primary/3 to-accent/10 dark:from-dark-bg dark:via-primary/5 dark:to-accent/5 transition-colors">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-extrabold tracking-tight text-dark dark:text-white sm:text-5xl">
              <span className="text-primary">{label}</span>
            </h1>
          </div>
        </Container>
      </section>

      <section className="py-12 bg-white dark:bg-dark-bg transition-colors">
        <Container>
          <CategoryTabs active={kategori} />

          {posts.length > 0 ? (
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <BlogCard key={post.slug} post={post} locale={locale} />
              ))}
            </div>
          ) : (
            <div className="mt-12 text-center">
              <p className="text-gray-500 dark:text-dark-muted">
                {t("emptyCategory")}
              </p>
            </div>
          )}
        </Container>
      </section>
    </>
  );
}
