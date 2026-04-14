"use client";

import { useState, useEffect, FormEvent } from "react";
import {
  ArrowRight,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Download,
  ExternalLink,
} from "lucide-react";

type FormStatus = "idle" | "loading" | "success" | "error";

interface LeadFormProps {
  slug: string;
  ctaVerb: string;
  assetUrl: string;
  assetDelivery: "download" | "redirect";
  formatLabel: string;
}

export function LeadForm({
  slug,
  ctaVerb,
  assetUrl,
  assetDelivery,
  formatLabel,
}: LeadFormProps) {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [utmSource, setUtmSource] = useState("");
  const [utmMedium, setUtmMedium] = useState("");
  const [utmCampaign, setUtmCampaign] = useState("");
  const [landingPage, setLandingPage] = useState("");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const url = new URL(window.location.href);
    setUtmSource(url.searchParams.get("utm_source") || "");
    setUtmMedium(url.searchParams.get("utm_medium") || "");
    setUtmCampaign(url.searchParams.get("utm_campaign") || "");
    setLandingPage(url.pathname);
  }, []);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    const form = e.currentTarget;
    const data = {
      slug,
      firstName: (form.elements.namedItem("firstName") as HTMLInputElement)
        .value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      utmSource,
      utmMedium,
      utmCampaign,
      landingPage,
    };

    try {
      const res = await fetch("/api/lead/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();

      if (json.ok) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
        setErrorMsg(json.error || "Bir hata oluştu.");
      }
    } catch {
      setStatus("error");
      setErrorMsg("Bağlantı hatası. Lütfen tekrar dene.");
    }
  }

  if (status === "success") {
    return (
      <div className="text-center py-4">
        <CheckCircle2
          size={48}
          className="mx-auto text-green-500 dark:text-green-400"
        />
        <h3 className="mt-4 text-xl font-bold text-dark dark:text-white">
          {formatLabel} hazır!
        </h3>
        <p className="mt-2 text-sm text-gray-600 dark:text-dark-muted">
          Ayrıca email adresine de gönderdik.
        </p>

        {assetDelivery === "download" ? (
          <a
            href={assetUrl}
            download
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-base font-semibold text-white hover:bg-primary/90 transition"
          >
            <Download size={18} />
            {ctaVerb}
          </a>
        ) : (
          <a
            href={assetUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-base font-semibold text-white hover:bg-primary/90 transition"
          >
            <ExternalLink size={18} />
            {ctaVerb}
          </a>
        )}

        <p className="mt-4 text-xs text-gray-400 dark:text-dark-muted">
          Growtify AI bültenine de kaydoldun — istediğin zaman çıkabilirsin.
        </p>
      </div>
    );
  }

  const inputClass =
    "mt-1 block w-full rounded-xl border border-gray-200 dark:border-dark-border bg-white dark:bg-dark-bg px-4 py-3 text-base text-text dark:text-dark-text focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition";

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label
          htmlFor="firstName"
          className="block text-sm font-medium text-gray-700 dark:text-dark-text"
        >
          Ad Soyad <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          required
          className={inputClass}
          placeholder="Ad Soyad"
        />
      </div>
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700 dark:text-dark-text"
        >
          E-posta <span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          className={inputClass}
          placeholder="ornek@email.com"
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
            Gönderiliyor...
          </>
        ) : (
          <>
            {ctaVerb}
            <ArrowRight size={18} />
          </>
        )}
      </button>
    </form>
  );
}
