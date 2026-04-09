import Link from "next/link";
import { Clock, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import type { BlogMeta } from "@/lib/blog-types";
import { BLOG_CATEGORIES } from "@/lib/blog-categories";

// Gradient pairs for cover image placeholders (until real images are added)
const COVER_GRADIENTS = [
  "from-primary/20 via-accent/10 to-primary/5",
  "from-accent/20 via-primary/10 to-accent/5",
  "from-primary/15 via-primary/5 to-accent/10",
  "from-accent/15 via-accent/5 to-primary/10",
  "from-primary/25 via-accent/15 to-primary/10",
  "from-accent/25 via-primary/15 to-accent/10",
];

function getCoverGradient(slug: string): string {
  const hash = slug.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return COVER_GRADIENTS[hash % COVER_GRADIENTS.length];
}

export function BlogCard({
  post,
  featured = false,
}: {
  post: BlogMeta;
  featured?: boolean;
}) {
  const categoryLabel =
    BLOG_CATEGORIES.find((c) => c.slug === post.category)?.label ||
    post.category;
  const gradient = getCoverGradient(post.slug);

  if (featured) {
    return (
      <Link
        href={`/blog/${post.slug}`}
        className="group block rounded-2xl border border-gray-100 dark:border-dark-border bg-white dark:bg-dark-card overflow-hidden hover:shadow-xl transition-all"
      >
        {/* Cover image */}
        <div
          className={`relative w-full aspect-[2.5/1] bg-gradient-to-br ${gradient} dark:opacity-80 flex items-end`}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          <div className="relative p-8 lg:p-10 text-white">
            <Badge
              variant="primary"
              className="mb-3 bg-white/20 text-white backdrop-blur-sm"
            >
              {categoryLabel}
            </Badge>
            <h2 className="text-2xl lg:text-3xl font-bold leading-tight group-hover:text-accent transition-colors">
              {post.title}
            </h2>
          </div>
        </div>

        {/* Meta */}
        <div className="p-6 lg:p-8">
          <p className="text-gray-600 dark:text-dark-muted leading-relaxed line-clamp-2">
            {post.excerpt}
          </p>
          <div className="mt-4 flex items-center justify-between text-sm text-gray-400 dark:text-dark-muted">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <Clock size={14} />
                {post.readTime}
              </span>
              <span>{post.date}</span>
            </div>
            <span className="flex items-center gap-1 text-primary font-medium group-hover:gap-2 transition-all">
              Oku <ArrowRight size={14} />
            </span>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group block rounded-2xl border border-gray-100 dark:border-dark-border bg-white dark:bg-dark-card overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all"
    >
      {/* Cover — gradient bg + title overlay */}
      <div
        className={`relative w-full aspect-[16/10] bg-gradient-to-br ${gradient} dark:opacity-90 flex flex-col justify-between p-5`}
      >
        <div>
          <Badge
            variant="muted"
            className="bg-white/80 dark:bg-dark-bg/80 backdrop-blur-sm text-xs"
          >
            {categoryLabel}
          </Badge>
        </div>
        <h3 className="text-lg font-bold text-dark dark:text-white leading-snug line-clamp-3 group-hover:text-primary transition-colors">
          {post.title}
        </h3>
      </div>

      {/* Meta */}
      <div className="px-5 py-4">
        <p className="text-sm text-gray-600 dark:text-dark-muted line-clamp-2">
          {post.excerpt}
        </p>
        <div className="mt-3 flex items-center justify-between text-xs text-gray-400 dark:text-dark-muted">
          <span className="flex items-center gap-1">
            <Clock size={12} />
            {post.readTime}
          </span>
          <span>{post.date}</span>
        </div>
      </div>
    </Link>
  );
}
