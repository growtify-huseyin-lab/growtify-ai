"use client";

import { useTranslations } from "next-intl";

/**
 * KVKK / privacy notice under lead-capture forms. This is the "aydınlatma"
 * (information) duty — a pointer to the full notice — not a consent checkbox.
 * TR links the KVKK Aydınlatma Metni, EN links the Privacy Policy.
 */
export function PrivacyNotice() {
  const t = useTranslations("FormPrivacyC");

  return (
    <p className="text-xs leading-relaxed text-gray-500 dark:text-dark-muted">
      {t.rich("notice", {
        link: (chunks) => (
          <a
            href={t("href")}
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-primary hover:text-primary-light"
          >
            {chunks}
          </a>
        ),
      })}
    </p>
  );
}
