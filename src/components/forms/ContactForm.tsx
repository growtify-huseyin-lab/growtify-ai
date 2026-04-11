"use client";

import { useState, FormEvent } from "react";
import { ArrowRight, Loader2, CheckCircle2, AlertCircle } from "lucide-react";

type FormStatus = "idle" | "loading" | "success" | "error";

export function ContactForm() {
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
      <div className="rounded-2xl border border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20 p-8 text-center">
        <CheckCircle2
          size={48}
          className="mx-auto text-green-500 dark:text-green-400"
        />
        <h3 className="mt-4 text-xl font-bold text-dark dark:text-white">
          Mesajın bize ulaştı!
        </h3>
        <p className="mt-2 text-gray-600 dark:text-dark-muted">
          En kısa sürede sana döneceğiz. Bu arada{" "}
          <a href="/test" className="text-primary underline font-medium">
            AI Olgunluk Testini
          </a>{" "}
          çözebilirsin.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-6 text-sm text-primary underline"
        >
          Yeni mesaj gönder
        </button>
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
          Adın <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          className={inputClass}
          placeholder="Adın Soyadın"
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
      <div>
        <label
          htmlFor="phone"
          className="block text-sm font-medium text-gray-700 dark:text-dark-text"
        >
          Telefon <span className="text-red-500">*</span>
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          required
          className={inputClass}
          placeholder="+90 5XX XXX XX XX"
        />
      </div>
      <div>
        <label
          htmlFor="sector"
          className="block text-sm font-medium text-gray-700 dark:text-dark-text"
        >
          Sektörün
        </label>
        <select id="sector" name="sector" className={inputClass}>
          <option value="">Seçiniz</option>
          <option value="saglik">Sağlık</option>
          <option value="hukuk">Hukuk</option>
          <option value="guzellik">Güzellik / Estetik</option>
          <option value="emlak">Emlak</option>
          <option value="e-ticaret">E-Ticaret</option>
          <option value="dis">Diş Hekimliği</option>
          <option value="muhasebe">Muhasebe</option>
          <option value="egitim">Eğitim</option>
          <option value="turizm">Turizm</option>
          <option value="fitness">Fitness</option>
          <option value="diger">Diğer</option>
        </select>
      </div>
      <div>
        <label
          htmlFor="interest"
          className="block text-sm font-medium text-gray-700 dark:text-dark-text"
        >
          Ne hakkında?
        </label>
        <select id="interest" name="interest" className={inputClass}>
          <option value="">Seçiniz</option>
          <option value="bireysel">Bireysel program hakkında bilgi</option>
          <option value="kurumsal">Kurumsal çözümler hakkında bilgi</option>
          <option value="genel">Genel soru / öneri</option>
          <option value="ortaklik">Ortaklık / iş birliği</option>
        </select>
      </div>
      <div>
        <label
          htmlFor="message"
          className="block text-sm font-medium text-gray-700 dark:text-dark-text"
        >
          Mesajın
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          className={`${inputClass} resize-none`}
          placeholder="Sana nasıl yardımcı olabiliriz?"
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
            Gönder
            <ArrowRight size={18} />
          </>
        )}
      </button>
    </form>
  );
}
