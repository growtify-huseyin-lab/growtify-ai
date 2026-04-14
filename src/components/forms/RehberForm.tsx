"use client";

import { useState, FormEvent, useEffect } from "react";
import { ArrowRight, Loader2, CheckCircle2, AlertCircle, Download } from "lucide-react";

type FormStatus = "idle" | "loading" | "success" | "error";

interface RehberFormProps {
  sektor: string;
}

interface SuccessPayload {
  pdfUrl: string;
  sectorName: string;
}

/**
 * Lead magnet email capture form for /rehber/[sektor] landing pages.
 *
 * Captures: firstName, email, (phone optional)
 * Reads UTM params from URL on mount.
 * Submits to /api/rehber/submit.
 * Shows PDF download on success.
 */
export function RehberForm({ sektor }: RehberFormProps) {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [successData, setSuccessData] = useState<SuccessPayload | null>(null);
  const [utm, setUtm] = useState<{
    source?: string;
    medium?: string;
    campaign?: string;
    landingPage?: string;
  }>({});

  // Read UTM params on mount (client-side)
  useEffect(() => {
    if (typeof window === "undefined") return;
    const url = new URL(window.location.href);
    setUtm({
      source: url.searchParams.get("utm_source") ?? undefined,
      medium: url.searchParams.get("utm_medium") ?? undefined,
      campaign: url.searchParams.get("utm_campaign") ?? undefined,
      landingPage: url.pathname,
    });
  }, []);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    const form = e.currentTarget;
    const payload = {
      sector: sektor,
      firstName: (form.elements.namedItem("firstName") as HTMLInputElement).value.trim(),
      email: (form.elements.namedItem("email") as HTMLInputElement).value.trim(),
      phone: (form.elements.namedItem("phone") as HTMLInputElement | null)?.value.trim() || undefined,
      utmSource: utm.source,
      utmMedium: utm.medium,
      utmCampaign: utm.campaign,
      landingPage: utm.landingPage,
    };

    try {
      const res = await fetch("/api/rehber/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json();

      if (json.ok) {
        setSuccessData({ pdfUrl: json.pdfUrl, sectorName: json.sectorName });
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
        setErrorMsg(json.error ?? "Bir hata oluştu.");
      }
    } catch {
      setStatus("error");
      setErrorMsg("Bağlantı hatası. Lütfen tekrar dene.");
    }
  }

  if (status === "success" && successData) {
    return (
      <div className="text-center">
        <CheckCircle2
          size={48}
          className="mx-auto text-green-500 dark:text-green-400"
        />
        <h4 className="mt-4 text-lg font-bold text-dark dark:text-white">
          Rehberin hazır!
        </h4>
        <p className="mt-2 text-sm text-gray-600 dark:text-dark-muted">
          Email'ine bir kopya gönderdik. Aşağıdan da hemen indirebilirsin.
        </p>
        <a
          href={successData.pdfUrl}
          download
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-base font-semibold text-white shadow-sm transition hover:bg-primary/90"
        >
          <Download size={18} />
          PDF&apos;i İndir
        </a>
        <p className="mt-4 text-xs text-gray-500 dark:text-dark-muted">
          5 günlük AI Mini Kurs email&apos;ine kayıtlı — her gün yeni bir değer gelecek.
        </p>
      </div>
    );
  }

  const inputClass =
    "block w-full rounded-xl border border-gray-200 dark:border-dark-border bg-white dark:bg-dark-card px-4 py-3 text-base text-text dark:text-dark-text focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition";

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label
          htmlFor="firstName"
          className="mb-1 block text-sm font-medium text-gray-700 dark:text-dark-text"
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
          className="mb-1 block text-sm font-medium text-gray-700 dark:text-dark-text"
        >
          Email <span className="text-red-500">*</span>
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
            Hazırlanıyor...
          </>
        ) : (
          <>
            Ücretsiz İndir
            <ArrowRight size={18} />
          </>
        )}
      </button>
    </form>
  );
}
