import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { BlogCard } from "@/components/blog/BlogCard";
import { CategoryTabs } from "@/components/blog/CategoryTabs";
import { BlogPagination } from "@/components/blog/BlogPagination";
import { getAllPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Yapay zeka ile iş büyütme rehberleri, sektöre özel içerikler ve GROWT Method.",
  alternates: {
    canonical: "/blog",
  },
};

export default function BlogPage() {
  const posts = getAllPosts();
  const featured = posts.find((p) => p.featured);
  const rest = posts.filter((p) => p !== featured);

  return (
    <>
      {/* Hero */}
      <section className="py-16 bg-gradient-to-br from-white via-primary/3 to-accent/10 dark:from-dark-bg dark:via-primary/5 dark:to-accent/5 transition-colors">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-extrabold tracking-tight text-dark dark:text-white sm:text-5xl">
              <span className="text-primary">Blog</span>
            </h1>
            <p className="mt-4 text-lg text-gray-600 dark:text-dark-muted">
              Yapay zeka ile iş büyütme rehberleri, sektöre özel içerikler ve
              GROWT Method.
            </p>
          </div>
        </Container>
      </section>

      {/* Posts */}
      <section className="py-12 bg-white dark:bg-dark-bg transition-colors">
        <Container>
          <CategoryTabs />

          {/* Featured post */}
          {featured && (
            <div className="mt-8">
              <BlogCard post={featured} featured />
            </div>
          )}

          {/* Grid + Pagination */}
          {rest.length > 0 ? (
            <BlogPagination posts={rest} />
          ) : posts.length === 0 ? (
            <div className="mt-12 text-center">
              <p className="text-gray-500 dark:text-dark-muted">
                Blog içerikleri yakın zamanda yayınlanacaktır.
              </p>
            </div>
          ) : null}
        </Container>
      </section>
    </>
  );
}
