"use client";

// Site-wide community invite. The site had NO community CTA; this drops a
// "Topluluğa Katıl" block in high-intent spots (homepage, page ends). Click is
// tracked as a GA4 conversion (join_group). TR community group (TR-first site).
import { trackEvent, COMMUNITY_URL } from "@/lib/gtag";

export function CommunityCTA({
  variant = "section",
  source = "page",
}: {
  variant?: "section" | "compact";
  source?: string;
}) {
  const onClick = () => trackEvent("join_group", { method: "community_cta", source });

  if (variant === "compact") {
    return (
      <a
        href={COMMUNITY_URL}
        target="_blank"
        rel="noopener noreferrer"
        onClick={onClick}
        className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 font-semibold text-white shadow-sm transition hover:opacity-90"
      >
        💬 Ücretsiz Topluluğa Katıl
      </a>
    );
  }

  return (
    <section className="py-16 bg-white dark:bg-dark-bg transition-colors">
      <div className="mx-auto max-w-4xl px-5">
        <div className="rounded-3xl bg-dark dark:bg-dark-card px-6 py-12 sm:px-12 text-center">
          <p className="text-sm font-semibold tracking-wide text-primary-light">
            ÜCRETSİZ TOPLULUK
          </p>
          <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-white">
            AI ile işini büyütenlerin topluluğuna katıl
          </h2>
          <p className="mt-4 text-lg text-gray-300 leading-relaxed">
            Güncel AI gelişmeleri, gerçek uygulama örnekleri ve seninle aynı yolda
            yürüyen profesyonellerle bağlan. Katılım ücretsiz.
          </p>
          <a
            href={COMMUNITY_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={onClick}
            className="mt-7 inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-8 py-4 text-lg font-semibold text-white shadow-sm transition hover:opacity-90"
          >
            💬 Topluluğa Ücretsiz Katıl →
          </a>
        </div>
      </div>
    </section>
  );
}
