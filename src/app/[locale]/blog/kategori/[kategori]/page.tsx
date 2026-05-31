import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { BlogCard } from "@/components/blog/BlogCard";
import { CategoryTabs } from "@/components/blog/CategoryTabs";
import { getPostsByCategory, BLOG_CATEGORIES } from "@/lib/blog";

type Props = { params: Promise<{ kategori: string }> };

export function generateStaticParams() {
  return BLOG_CATEGORIES.map((c) => ({ kategori: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { kategori } = await params;
  const cat = BLOG_CATEGORIES.find((c) => c.slug === kategori);
  if (!cat) return { title: "Kategori Bulunamadı" };
  return {
    title: `${cat.label} — Blog`,
    description: `${cat.label} kategorisindeki yazılar.`,
    alternates: {
      canonical: `/blog/kategori/${kategori}`,
    },
  };
}

export default async function BlogCategoryPage({ params }: Props) {
  const { kategori } = await params;
  const cat = BLOG_CATEGORIES.find((c) => c.slug === kategori);
  if (!cat) notFound();

  const posts = getPostsByCategory(kategori);

  return (
    <>
      <section className="py-20 bg-gradient-to-br from-white via-primary/3 to-accent/10 dark:from-dark-bg dark:via-primary/5 dark:to-accent/5 transition-colors">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-extrabold tracking-tight text-dark dark:text-white sm:text-5xl">
              <span className="text-primary">{cat.label}</span>
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
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>
          ) : (
            <div className="mt-12 text-center">
              <p className="text-gray-500 dark:text-dark-muted">
                Bu kategoride henüz yazı yok.
              </p>
            </div>
          )}
        </Container>
      </section>
    </>
  );
}
