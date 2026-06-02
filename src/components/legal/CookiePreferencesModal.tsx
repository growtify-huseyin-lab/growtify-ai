"use client";

import { useEffect, useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { X, Shield } from "lucide-react";
import {
  CATEGORY_INFO,
  type ConsentCategory,
  type ConsentState,
  DEFAULT_CONSENT,
  FULL_CONSENT,
  getConsent,
  saveConsent,
} from "@/lib/cookie-consent";

type Props = {
  open: boolean;
  onClose: () => void;
};

const TOGGLEABLE: ConsentCategory[] = ["analytics", "marketing", "functional"];

export function CookiePreferencesModal({ open, onClose }: Props) {
  const t = useTranslations("CookiePrefsC");
  const locale = useLocale();
  const [state, setState] = useState<ConsentState>(DEFAULT_CONSENT);

  useEffect(() => {
    if (open) {
      setState(getConsent());
    }
  }, [open]);

  if (!open) return null;

  const handleToggle = (category: ConsentCategory) => {
    if (CATEGORY_INFO[category].required) return;
    setState((prev) => ({ ...prev, [category]: !prev[category] }));
  };

  const handleSave = () => {
    saveConsent(state, "custom");
    onClose();
  };

  const handleAcceptAll = () => {
    saveConsent(FULL_CONSENT, "accept_all");
    onClose();
  };

  const handleRejectAll = () => {
    saveConsent(DEFAULT_CONSENT, "reject_all");
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl rounded-2xl bg-white dark:bg-dark-card shadow-2xl border border-gray-200 dark:border-dark-border max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 flex items-center justify-between gap-4 border-b border-gray-100 dark:border-dark-border bg-white dark:bg-dark-card p-6 rounded-t-2xl">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 dark:bg-primary/20">
              <Shield size={20} className="text-primary" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-dark dark:text-white">
                {t("title")}
              </h2>
              <p className="text-xs text-gray-500 dark:text-dark-muted">
                {t("subtitle")}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label={t("closeAriaLabel")}
            className="rounded-lg p-1.5 text-gray-500 hover:bg-gray-100 dark:hover:bg-dark-bg transition"
          >
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4">
          {/* Necessary — always on */}
          <CategoryRow
            category="necessary"
            checked={true}
            onToggle={() => {}}
            disabled={true}
          />

          {/* Toggleable */}
          {TOGGLEABLE.map((cat) => (
            <CategoryRow
              key={cat}
              category={cat}
              checked={state[cat]}
              onToggle={() => handleToggle(cat)}
            />
          ))}

          <p className="text-xs text-gray-500 dark:text-dark-muted pt-2">
            {t.rich("storageNotice", {
              link: (chunks) => (
                <a
                  href={locale === "en" ? "/en/cookie-policy" : "/cerez-politikasi"}
                  className="text-primary hover:underline"
                >
                  {chunks}
                </a>
              ),
            })}
          </p>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 flex flex-col-reverse sm:flex-row sm:justify-end gap-2 border-t border-gray-100 dark:border-dark-border bg-gray-50 dark:bg-dark-bg/50 p-4 rounded-b-2xl">
          <button
            type="button"
            onClick={handleRejectAll}
            className="rounded-lg px-4 py-2.5 text-sm font-medium text-gray-700 dark:text-dark-muted hover:bg-gray-100 dark:hover:bg-dark-card transition"
          >
            {t("rejectAll")}
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="rounded-lg border border-gray-300 dark:border-dark-border px-4 py-2.5 text-sm font-medium text-dark dark:text-white hover:bg-gray-50 dark:hover:bg-dark-card transition"
          >
            {t("savePreferences")}
          </button>
          <button
            type="button"
            onClick={handleAcceptAll}
            className="rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white hover:bg-primary/90 transition"
          >
            {t("acceptAll")}
          </button>
        </div>
      </div>
    </div>
  );
}

function CategoryRow({
  category,
  checked,
  onToggle,
  disabled = false,
}: {
  category: ConsentCategory;
  checked: boolean;
  onToggle: () => void;
  disabled?: boolean;
}) {
  const t = useTranslations("CookiePrefsC");
  const info = CATEGORY_INFO[category];
  return (
    <div className="flex items-start justify-between gap-4 rounded-xl border border-gray-200 dark:border-dark-border p-4">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <h3 className="font-semibold text-dark dark:text-white">
            {t(`cat_${category}_label`)}
          </h3>
          {info.required && (
            <span className="rounded-full bg-gray-100 dark:bg-dark-bg px-2 py-0.5 text-[10px] font-semibold text-gray-600 dark:text-dark-muted">
              {t("requiredBadge")}
            </span>
          )}
        </div>
        <p className="mt-1 text-xs text-gray-600 dark:text-dark-muted leading-relaxed">
          {t(`cat_${category}_desc`)}
        </p>
      </div>
      <Toggle
        checked={checked}
        onChange={onToggle}
        disabled={disabled}
        ariaLabel={t("categoryToggleAriaLabel", { label: t(`cat_${category}_label`) })}
      />
    </div>
  );
}

function Toggle({
  checked,
  onChange,
  disabled,
  ariaLabel,
}: {
  checked: boolean;
  onChange: () => void;
  disabled?: boolean;
  ariaLabel: string;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={ariaLabel}
      onClick={onChange}
      disabled={disabled}
      className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors ${
        checked ? "bg-primary" : "bg-gray-300 dark:bg-dark-border"
      } ${disabled ? "cursor-not-allowed opacity-60" : ""}`}
    >
      <span
        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition ${
          checked ? "translate-x-5" : "translate-x-0"
        }`}
      />
    </button>
  );
}
