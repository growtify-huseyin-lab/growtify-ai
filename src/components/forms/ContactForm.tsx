"use client";

import { useState, FormEvent } from "react";
import { useTranslations } from "next-intl";
import { ArrowRight, Loader2, CheckCircle2, AlertCircle, Users } from "lucide-react";
import { trackEvent } from "@/lib/gtag";

type FormStatus = "idle" | "loading" | "success" | "error";

export function ContactForm() {
  const t = useTranslations("ContactFormC");
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      phone: (form.elements.namedItem("phone") as HTMLInputElement).value,
      sector: (form.elements.namedItem("sector") as HTMLSelectElement).value,
      interest: (form.elements.namedItem("interest") as HTMLSelectElement)
        .value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement)
        .value,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();

      if (json.success) {
        setStatus("success");
        trackEvent("lead_contact", { method: "contact_form" });
        form.reset();
      } else {
        setStatus("error");
        setErrorMsg(json.error || t("genericError"));
      }
    } catch {
      setStatus("error");
      setErrorMsg(t("connectionError"));
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20 p-8 text-center">
        <CheckCircle2
          size={48}
          className="mx-auto text-green-500 dark:text-green-400"
        />
        <h3 className="mt-4 text-xl font-bold text-dark dark:text-white">
          {t("successHeading")}
        </h3>
        <p className="mt-2 text-gray-600 dark:text-dark-muted">
          {t("successIntro")}{" "}
          <a href="/test" className="text-primary underline font-medium">
            {t("successTestLink")}
          </a>{" "}
          {t("successTestSuffix")}
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-6 text-sm text-primary underline"
        >
          {t("newMessage")}
        </button>

        {/* Community CTA — secondary engagement step */}
        <div className="mt-8 pt-6 border-t border-green-200/60 dark:border-green-800/40">
          <div className="flex items-center justify-center gap-2 text-gray-500 dark:text-dark-muted">
            <Users size={14} />
            <span className="text-xs font-semibold uppercase tracking-wider">
              {t("communityEyebrow")}
            </span>
          </div>
          <p className="mx-auto mt-3 max-w-sm text-sm text-gray-600 dark:text-dark-muted">
            {t("communityDescription")}
          </p>
          <a
            href="https://panel.growtify.ai/communities/groups/growtify-ai/"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-2 rounded-xl border-2 border-primary/20 bg-white/70 dark:bg-dark-card/70 px-5 py-2.5 text-sm font-semibold text-primary transition hover:border-primary/40 hover:bg-white dark:hover:bg-dark-card"
          >
            <Users size={16} />
            {t("communityCta")}
            <ArrowRight size={14} />
          </a>
        </div>
      </div>
    );
  }

  const inputClass =
    "mt-1 block w-full rounded-xl border border-gray-200 dark:border-dark-border bg-white dark:bg-dark-card px-4 py-3 text-base text-text dark:text-dark-text focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition";

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-5">
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700 dark:text-dark-text"
        >
          {t("nameLabel")} <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          className={inputClass}
          placeholder={t("namePlaceholder")}
        />
      </div>
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700 dark:text-dark-text"
        >
          {t("emailLabel")} <span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          className={inputClass}
          placeholder={t("emailPlaceholder")}
        />
      </div>
      <div>
        <label
          htmlFor="phone"
          className="block text-sm font-medium text-gray-700 dark:text-dark-text"
        >
          {t("phoneLabel")} <span className="text-red-500">*</span>
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          required
          className={inputClass}
          placeholder={t("phonePlaceholder")}
        />
      </div>
      <div>
        <label
          htmlFor="sector"
          className="block text-sm font-medium text-gray-700 dark:text-dark-text"
        >
          {t("sectorLabel")}
        </label>
        <select id="sector" name="sector" className={inputClass}>
          <option value="">{t("selectPlaceholder")}</option>
          <option value="saglik">{t("sectorHealth")}</option>
          <option value="hukuk">{t("sectorLaw")}</option>
          <option value="guzellik">{t("sectorBeauty")}</option>
          <option value="emlak">{t("sectorRealEstate")}</option>
          <option value="e-ticaret">{t("sectorEcommerce")}</option>
          <option value="dis">{t("sectorDentistry")}</option>
          <option value="muhasebe">{t("sectorAccounting")}</option>
          <option value="egitim">{t("sectorEducation")}</option>
          <option value="turizm">{t("sectorTourism")}</option>
          <option value="fitness">{t("sectorFitness")}</option>
          <option value="diger">{t("sectorOther")}</option>
        </select>
      </div>
      <div>
        <label
          htmlFor="interest"
          className="block text-sm font-medium text-gray-700 dark:text-dark-text"
        >
          {t("interestLabel")}
        </label>
        <select id="interest" name="interest" className={inputClass}>
          <option value="">{t("selectPlaceholder")}</option>
          <option value="bireysel">{t("interestIndividual")}</option>
          <option value="kurumsal">{t("interestCorporate")}</option>
          <option value="genel">{t("interestGeneral")}</option>
          <option value="ortaklik">{t("interestPartnership")}</option>
        </select>
      </div>
      <div>
        <label
          htmlFor="message"
          className="block text-sm font-medium text-gray-700 dark:text-dark-text"
        >
          {t("messageLabel")}
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          className={`${inputClass} resize-none`}
          placeholder={t("messagePlaceholder")}
        />
      </div>

      {status === "error" && (
        <div className="flex items-center gap-2 rounded-lg bg-red-50 dark:bg-red-900/20 p-3 text-sm text-red-600 dark:text-red-400">
          <AlertCircle size={16} />
          {errorMsg}
        </div>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-base font-semibold text-white shadow-sm transition hover:bg-primary/90 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === "loading" ? (
          <>
            <Loader2 size={18} className="animate-spin" />
            {t("submitting")}
          </>
        ) : (
          <>
            {t("submit")}
            <ArrowRight size={18} />
          </>
        )}
      </button>
    </form>
  );
}
