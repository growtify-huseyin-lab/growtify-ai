"use client";

import Link from "next/link";
import { BLOG_CATEGORIES } from "@/lib/blog-categories";

export function CategoryTabs({ active }: { active?: string }) {
  return (
    <div className="flex flex-wrap gap-2">
      <Link
        href="/blog"
        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
          !active
            ? "bg-primary text-white"
            : "bg-gray-100 dark:bg-dark-card text-gray-600 dark:text-dark-muted hover:bg-primary/10 hover:text-primary"
        }`}
      >
        Tümü
      </Link>
      {BLOG_CATEGORIES.map((cat) => (
        <Link
          key={cat.slug}
          href={`/blog/kategori/${cat.slug}`}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            active === cat.slug
              ? "bg-primary text-white"
              : "bg-gray-100 dark:bg-dark-card text-gray-600 dark:text-dark-muted hover:bg-primary/10 hover:text-primary"
          }`}
        >
          {cat.label}
        </Link>
      ))}
    </div>
  );
}
