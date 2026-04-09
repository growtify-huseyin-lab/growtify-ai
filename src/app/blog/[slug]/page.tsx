import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { BlogCTA } from "@/components/blog/BlogCTA";
import { BlogCard } from "@/components/blog/BlogCard";
import { getAllPosts, getPostBySlug, BLOG_CATEGORIES } from "@/lib/blog";
import { MDXRemote } from "next-mdx-remote/rsc";
import {
  Clock,
  ArrowLeft,
  ArrowRight,
  Share2,
  ExternalLink,
  CalendarDays,
  User,
} from "lucide-react";
import Link from "next/link";

const BASE_URL = "https://growtify.ai";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Yazı Bulunamadı" };
  return {
    title: post.seoTitle,
    description: post.seoDescription,
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
    openGraph: {
      title: post.seoTitle,
      description: post.seoDescription,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const allPosts = getAllPosts();
  const related = allPosts
    .filter(
      (p) =>
        p.slug !== post.slug &&
        (p.category === post.category || p.sectorRef === post.sectorRef),
    )
    .slice(0, 3);

  const categoryLabel =
    BLOG_CATEGORIES.find((c) => c.slug === post.category)?.label ||
    post.category;

  const shareUrl = `${BASE_URL}/blog/${post.slug}`;
  const shareText = encodeURIComponent(post.title);

  // Extract headings from content for TOC
  const headingRegex = /^##\s+(.+)$/gm;
  const headings: string[] = [];
  let match;
  while ((match = headingRegex.exec(post.content)) !== null) {
    headings.push(match[1]);
  }

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.seoDescription,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      "@type": "Organization",
      name: post.author,
      url: BASE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: "Growtify.ai",
      url: BASE_URL,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${BASE_URL}/blog/${post.slug}`,
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Ana Sayfa",
        item: BASE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: `${BASE_URL}/blog`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: categoryLabel,
        item: `${BASE_URL}/blog/kategori/${post.category}`,
      },
      { "@type": "ListItem", position: 4, name: post.title },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Hero / Header */}
      <section className="border-b border-gray-100 dark:border-dark-border bg-white dark:bg-dark-bg transition-colors">
        <Container>
          {/* Breadcrumb */}
          <div className="pt-6 pb-2">
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 text-sm text-gray-500 dark:text-dark-muted hover:text-primary transition-colors"
            >
              <ArrowLeft size={14} />
              Blog&apos;a dön
            </Link>
          </div>

          {/* Hero image area */}
          <div className="relative w-full aspect-[2.5/1] rounded-2xl bg-gradient-to-br from-primary/10 via-accent/5 to-primary/5 dark:from-primary/20 dark:via-accent/10 dark:to-primary/10 mb-8 overflow-hidden flex items-center justify-center">
            <div className="text-center px-8">
              <Badge variant="primary" className="mb-4">
                {categoryLabel}
              </Badge>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-dark dark:text-white leading-tight max-w-3xl mx-auto">
                {post.title}
              </h1>
            </div>
          </div>

          {/* Meta bar */}
          <div className="flex flex-wrap items-center gap-4 pb-8 text-sm text-gray-500 dark:text-dark-muted">
            <span className="flex items-center gap-1.5">
              <CalendarDays size={14} />
              {post.date}
            </span>
            <span className="flex items-center gap-1.5">
              <User size={14} />
              {post.author}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock size={14} />
              {post.readTime}
            </span>

            {/* Share */}
            <div className="ml-auto flex items-center gap-2">
              <span className="text-xs text-gray-400 dark:text-dark-muted mr-1">
                Paylaş
              </span>
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 dark:border-dark-border text-gray-400 hover:text-primary hover:border-primary transition-colors"
              >
                <ExternalLink size={14} />
              </a>
              <a
                href={`https://twitter.com/intent/tweet?text=${shareText}&url=${encodeURIComponent(shareUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 dark:border-dark-border text-gray-400 hover:text-primary hover:border-primary transition-colors"
              >
                <Share2 size={14} />
              </a>
            </div>
          </div>
        </Container>
      </section>

      {/* Content + Sidebar */}
      <section className="py-12 bg-light dark:bg-dark-bg/50 transition-colors">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_280px]">
            {/* Article */}
            <article className="min-w-0">
              <div className="rounded-2xl bg-white dark:bg-dark-card border border-gray-100 dark:border-dark-border p-6 sm:p-8 lg:p-10">
                <div className="blog-prose">
                  <MDXRemote source={post.content} />
                </div>
              </div>

              {/* Tags */}
              {post.tags && post.tags.length > 0 && (
                <div className="mt-8">
                  <h3 className="text-sm font-semibold text-gray-500 dark:text-dark-muted mb-3">
                    Etiketler
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-white dark:bg-dark-card border border-gray-200 dark:border-dark-border px-3 py-1 text-xs font-medium text-gray-600 dark:text-dark-muted hover:border-primary hover:text-primary transition-colors cursor-default"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </article>

            {/* Sidebar */}
            <aside className="hidden lg:block">
              <div className="sticky top-24 space-y-6">
                {/* TOC */}
                {headings.length > 0 && (
                  <div className="rounded-2xl bg-white dark:bg-dark-card border border-gray-100 dark:border-dark-border p-5">
                    <h3 className="text-sm font-bold text-dark dark:text-white mb-3 uppercase tracking-wider">
                      İçindekiler
                    </h3>
                    <nav className="space-y-2">
                      {headings.map((heading, i) => (
                        <a
                          key={i}
                          href={`#${heading.toLowerCase().replace(/[^a-zçğıöşü0-9\s]/gi, "").replace(/\s+/g, "-")}`}
                          className="block text-sm text-gray-500 dark:text-dark-muted hover:text-primary transition-colors leading-snug"
                        >
                          {heading}
                        </a>
                      ))}
                    </nav>
                  </div>
                )}

                {/* CTA */}
                <BlogCTA />

                {/* Share box */}
                <div className="rounded-2xl bg-white dark:bg-dark-card border border-gray-100 dark:border-dark-border p-5">
                  <h3 className="text-sm font-bold text-dark dark:text-white mb-3 uppercase tracking-wider">
                    Paylaş
                  </h3>
                  <div className="flex gap-2">
                    <a
                      href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 dark:border-dark-border text-gray-400 hover:text-primary hover:border-primary transition-colors"
                    >
                      <ExternalLink size={16} />
                    </a>
                    <a
                      href={`https://twitter.com/intent/tweet?text=${shareText}&url=${encodeURIComponent(shareUrl)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 dark:border-dark-border text-gray-400 hover:text-primary hover:border-primary transition-colors"
                    >
                      <Share2 size={16} />
                    </a>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </Container>
      </section>

      {/* Similar Blogs */}
      {related.length > 0 && (
        <section className="py-16 bg-white dark:bg-dark-bg border-t border-gray-100 dark:border-dark-border transition-colors">
          <Container>
            <h2 className="text-2xl font-bold text-dark dark:text-white mb-8">
              Benzer Yazılar
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => (
                <BlogCard key={p.slug} post={p} />
              ))}
            </div>
          </Container>
        </section>
      )}
    </>
  );
}
