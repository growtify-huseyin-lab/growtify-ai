"use client";

// Site-wide community invite (rendered before the footer on every page). Bilingual
// TR/EN via useLocale. Click is a GA4 conversion (join_group). EN points to the
// EN community group; TR to the TR group.
import { useLocale } from "next-intl";
import { trackEvent, COMMUNITY_URL, EN_COMMUNITY_URL } from "@/lib/gtag";

export function CommunityCTA({
  variant = "section",
  source = "page",
}: {
  variant?: "section" | "compact";
  source?: string;
}) {
  const locale = useLocale();
  const en = locale === "en";
  const url = en ? EN_COMMUNITY_URL : COMMUNITY_URL;
  const onClick = () =>
    trackEvent("join_group", { method: "community_cta", source });

  const copy = en
    ? {
        eyebrow: "FREE COMMUNITY",
        heading:
          "Join the community of professionals growing their business with AI",
        body: "Connect over the latest AI developments, real-world examples, and peers walking the same path. Joining is free.",
        button: "💬 Join the Community for Free →",
        compact: "💬 Join the Free Community",
      }
    : {
        eyebrow: "ÜCRETSİZ TOPLULUK",
        heading: "AI ile işini büyütenlerin topluluğuna katıl",
        body: "Güncel AI gelişmeleri, gerçek uygulama örnekleri ve seninle aynı yolda yürüyen profesyonellerle bağlan. Katılım ücretsiz.",
        button: "💬 Topluluğa Ücretsiz Katıl →",
        compact: "💬 Ücretsiz Topluluğa Katıl",
      };

  if (variant === "compact") {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        onClick={onClick}
        className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 font-semibold text-white shadow-sm transition hover:opacity-90"
      >
        {copy.compact}
      </a>
    );
  }

  return (
    <section className="py-16 bg-white dark:bg-dark-bg transition-colors">
      <div className="mx-auto max-w-4xl px-5">
        <div className="rounded-3xl bg-gradient-to-br from-primary/10 via-accent/5 to-primary/5 dark:from-primary/15 dark:via-dark-card dark:to-accent/10 ring-1 ring-primary/15 dark:ring-primary/20 px-6 py-12 sm:px-12 text-center">
          <p className="text-sm font-semibold tracking-wide text-primary">
            {copy.eyebrow}
          </p>
          <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-dark dark:text-white">
            {copy.heading}
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-dark-muted leading-relaxed">
            {copy.body}
          </p>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={onClick}
            className="mt-7 inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-8 py-4 text-lg font-semibold text-white shadow-sm transition hover:opacity-90"
          >
            {copy.button}
          </a>
        </div>
      </div>
    </section>
  );
}
