"use client";

import { Link } from "@/i18n/navigation";
import { useTranslations, useLocale } from "next-intl";
import { getBlogCategories, getCategoryLabel } from "@/lib/blog-categories";

export function CategoryTabs({ active }: { active?: string }) {
  const t = useTranslations("CategoryTabsC");
  const locale = useLocale();
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
        {t("all")}
      </Link>
      {getBlogCategories(locale).map((cat) => (
        <Link
          key={cat.slug}
          href={`/blog/kategori/${cat.slug}`}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            active === cat.slug
              ? "bg-primary text-white"
              : "bg-gray-100 dark:bg-dark-card text-gray-600 dark:text-dark-muted hover:bg-primary/10 hover:text-primary"
          }`}
        >
          {getCategoryLabel(cat.slug, locale)}
        </Link>
      ))}
    </div>
  );
}
