"use client";

import { useState } from "react";
import { BlogCard } from "./BlogCard";
import type { BlogMeta } from "@/lib/blog-types";
import { ChevronLeft, ChevronRight } from "lucide-react";

const POSTS_PER_PAGE = 9;

export function BlogPagination({ posts }: { posts: BlogMeta[] }) {
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);
  const start = (page - 1) * POSTS_PER_PAGE;
  const visible = posts.slice(start, start + POSTS_PER_PAGE);

  const goTo = (p: number) => {
    setPage(p);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {/* Grid */}
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((post) => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-12 flex items-center justify-center gap-2">
          <button
            onClick={() => goTo(page - 1)}
            disabled={page === 1}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 dark:border-dark-border text-gray-500 dark:text-dark-muted hover:border-primary hover:text-primary disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft size={18} />
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              onClick={() => goTo(p)}
              className={`flex h-10 w-10 items-center justify-center rounded-lg text-sm font-medium transition-colors ${
                p === page
                  ? "bg-primary text-white"
                  : "border border-gray-200 dark:border-dark-border text-gray-600 dark:text-dark-muted hover:border-primary hover:text-primary"
              }`}
            >
              {p}
            </button>
          ))}

          <button
            onClick={() => goTo(page + 1)}
            disabled={page === totalPages}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 dark:border-dark-border text-gray-500 dark:text-dark-muted hover:border-primary hover:text-primary disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      )}

      {/* Info */}
      <p className="mt-4 text-center text-sm text-gray-400 dark:text-dark-muted">
        {posts.length} yazıdan {start + 1}-{Math.min(start + POSTS_PER_PAGE, posts.length)} arası gösteriliyor
      </p>
    </>
  );
}
