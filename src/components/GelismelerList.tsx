"use client";

import { useState, useMemo } from "react";
import { Link } from "@/i18n/navigation";
import { Card } from "@/components/ui/Card";
import { ArrowRight, ArrowUpDown } from "lucide-react";
import type { UpdateMeta } from "@/lib/gelismeler";

const PER_PAGE = 9;

function formatDate(date: string, en: boolean): string {
  const d = new Date(date);
  if (isNaN(d.getTime())) return date;
  return d.toLocaleDateString(en ? "en-US" : "tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

// Client-side sort toggle + pagination over the gelismeler/news index.
// `updates` arrives already newest-first from the server loader (date desc).
export function GelismelerList({
  updates,
  en,
}: {
  updates: UpdateMeta[];
  en: boolean;
}) {
  const [order, setOrder] = useState<"newest" | "oldest">("newest");
  const [page, setPage] = useState(1);

  const sorted = useMemo(
    () => (order === "newest" ? updates : [...updates].reverse()),
    [updates, order],
  );

  const totalPages = Math.max(1, Math.ceil(sorted.length / PER_PAGE));
  const current = Math.min(page, totalPages);
  const pageItems = sorted.slice((current - 1) * PER_PAGE, current * PER_PAGE);

  function toggleOrder() {
    setOrder((o) => (o === "newest" ? "oldest" : "newest"));
    setPage(1);
  }

  if (updates.length === 0) {
    return (
      <p className="text-center text-gray-500 dark:text-dark-muted">
        {en
          ? "No updates yet — check back soon."
          : "Henüz gelişme yok — yakında burada."}
      </p>
    );
  }

  return (
    <div>
      {/* Count + sort toggle */}
      <div className="mb-6 flex items-center justify-between">
        <span className="text-sm text-gray-500 dark:text-dark-muted">
          {sorted.length} {en ? "updates" : "gelişme"}
        </span>
        <button
          type="button"
          onClick={toggleOrder}
          aria-label={en ? "Change sort order" : "Sıralamayı değiştir"}
          className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-1.5 text-sm font-medium text-gray-700 transition hover:border-primary/40 dark:border-dark-border dark:text-dark-text"
        >
          <ArrowUpDown size={14} />
          {order === "newest"
            ? en
              ? "Newest first"
              : "En yeni"
            : en
              ? "Oldest first"
              : "En eski"}
        </button>
      </div>

      <div className="flex flex-col gap-6">
        {pageItems.map((u) => (
          <Link
            key={u.slug}
            href={`/gelismeler/${u.slug}`}
            className="group"
          >
            <Card hover>
              <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-primary">
                <time dateTime={u.date}>{formatDate(u.date, en)}</time>
                {u.tags.slice(0, 2).map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-primary/10 px-2 py-0.5 dark:bg-primary/20"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <h2 className="mt-2 text-xl font-bold text-dark dark:text-white">
                {u.title}
              </h2>
              <p className="mt-2 text-gray-600 dark:text-dark-muted">
                {u.summary}
              </p>
              <span className="mt-4 inline-flex items-center text-sm font-semibold text-primary group-hover:underline">
                {en ? "Read more" : "Devamını oku"}
                <ArrowRight size={15} className="ml-1" />
              </span>
            </Card>
          </Link>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <nav
          className="mt-10 flex items-center justify-center gap-1.5"
          aria-label={en ? "Pagination" : "Sayfalama"}
        >
          <button
            type="button"
            onClick={() => setPage(current - 1)}
            disabled={current <= 1}
            className="rounded-lg border border-gray-200 px-3 py-1.5 text-sm font-medium text-gray-700 transition hover:border-primary/40 disabled:cursor-not-allowed disabled:opacity-40 dark:border-dark-border dark:text-dark-text"
          >
            {en ? "Previous" : "Önceki"}
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => setPage(p)}
              aria-current={p === current ? "page" : undefined}
              className={
                "h-9 w-9 rounded-lg text-sm font-medium transition " +
                (p === current
                  ? "bg-primary text-white"
                  : "border border-gray-200 text-gray-700 hover:border-primary/40 dark:border-dark-border dark:text-dark-text")
              }
            >
              {p}
            </button>
          ))}
          <button
            type="button"
            onClick={() => setPage(current + 1)}
            disabled={current >= totalPages}
            className="rounded-lg border border-gray-200 px-3 py-1.5 text-sm font-medium text-gray-700 transition hover:border-primary/40 disabled:cursor-not-allowed disabled:opacity-40 dark:border-dark-border dark:text-dark-text"
          >
            {en ? "Next" : "Sonraki"}
          </button>
        </nav>
      )}
    </div>
  );
}
