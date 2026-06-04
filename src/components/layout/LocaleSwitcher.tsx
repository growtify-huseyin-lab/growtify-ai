"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { Globe } from "lucide-react";

// TR-only soft launch (CEO 2026-06-03): hide the language switcher so visitors
// stay on Turkish. EN pages remain deployed + reachable by direct URL for QA.
// When all EN controls/prep are complete → flip to true to re-enable bilingual.
const SHOW_LOCALE_SWITCHER: boolean = false;

export function LocaleSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const other = locale === "en" ? "tr" : "en";

  if (!SHOW_LOCALE_SWITCHER) return null;

  return (
    <button
      type="button"
      onClick={() => router.replace(pathname, { locale: other })}
      className="inline-flex items-center gap-1.5 rounded-md border border-gray-300 dark:border-gray-600 px-2.5 py-1.5 text-sm font-medium text-gray-700 dark:text-gray-300 hover:border-primary hover:text-primary dark:hover:text-white transition-colors"
      aria-label={`Switch to ${other === "en" ? "English" : "Türkçe"}`}
    >
      <Globe size={15} />
      {other.toUpperCase()}
    </button>
  );
}
