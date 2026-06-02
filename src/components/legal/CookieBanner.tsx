"use client";

import { useEffect, useState } from "react";
import { Cookie, Settings2 } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import {
  DEFAULT_CONSENT,
  FULL_CONSENT,
  hasDecidedConsent,
  hasGlobalPrivacyControl,
  saveConsent,
} from "@/lib/cookie-consent";
import { CookiePreferencesModal } from "./CookiePreferencesModal";

export function CookieBanner() {
  const t = useTranslations("CookieBannerC");
  const locale = useLocale();
  const [visible, setVisible] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    // Listener for "open preferences from elsewhere" (footer link, etc.)
    // Always attached, regardless of banner visibility.
    const onOpen = () => setModalOpen(true);
    window.addEventListener("growtify:open_cookie_preferences", onOpen);

    // Banner visibility logic
    if (hasDecidedConsent()) {
      setVisible(false);
    } else if (hasGlobalPrivacyControl()) {
      // CCPA/CPRA Global Privacy Control: auto-reject marketing/analytics.
      saveConsent(DEFAULT_CONSENT, "gpc");
      setVisible(false);
    } else {
      setVisible(true);
    }

    return () =>
      window.removeEventListener("growtify:open_cookie_preferences", onOpen);
  }, []);

  const handleAcceptAll = () => {
    saveConsent(FULL_CONSENT, "accept_all");
    setVisible(false);
  };

  const handleRejectAll = () => {
    saveConsent(DEFAULT_CONSENT, "reject_all");
    setVisible(false);
  };

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    // Hide banner only if user actually saved a decision in modal
    if (hasDecidedConsent()) {
      setVisible(false);
    }
  };

  return (
    <>
      {visible && (
        <div
          role="dialog"
          aria-live="polite"
          aria-label={t("ariaLabel")}
          className="fixed inset-x-0 bottom-0 z-50 border-t border-gray-200 dark:border-dark-border bg-white/95 dark:bg-dark-card/95 backdrop-blur-sm shadow-2xl animate-in slide-in-from-bottom duration-300"
        >
          <div className="mx-auto max-w-6xl px-4 py-4 sm:px-6 sm:py-5">
            <div className="flex flex-col lg:flex-row lg:items-center gap-4">
              {/* Icon + text */}
              <div className="flex flex-1 items-start gap-3">
                <div className="hidden sm:flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 dark:bg-primary/20">
                  <Cookie size={20} className="text-primary" />
                </div>
                <div className="flex-1 min-w-0 text-sm text-gray-700 dark:text-dark-muted leading-relaxed">
                  <p className="font-semibold text-dark dark:text-white mb-1">
                    {t("heading")}
                  </p>
                  <p>
                    {t("body")}{" "}
                    <a
                      href={locale === "en" ? "/en/cookie-policy" : "/cerez-politikasi"}
                      className="text-primary hover:underline font-medium"
                    >
                      {t("policyLink")}
                    </a>
                    .
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col-reverse sm:flex-row gap-2 lg:shrink-0">
                <button
                  type="button"
                  onClick={handleOpenModal}
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-300 dark:border-dark-border px-4 py-2.5 text-sm font-medium text-dark dark:text-white hover:bg-gray-50 dark:hover:bg-dark-bg transition"
                >
                  <Settings2 size={16} />
                  {t("preferences")}
                </button>
                <button
                  type="button"
                  onClick={handleRejectAll}
                  className="rounded-lg px-4 py-2.5 text-sm font-medium text-gray-700 dark:text-dark-muted hover:bg-gray-100 dark:hover:bg-dark-bg transition"
                >
                  {t("rejectAll")}
                </button>
                <button
                  type="button"
                  onClick={handleAcceptAll}
                  className="rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary/90 transition"
                >
                  {t("acceptAll")}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <CookiePreferencesModal open={modalOpen} onClose={handleCloseModal} />
    </>
  );
}
