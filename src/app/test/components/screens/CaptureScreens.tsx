"use client";

import { useState, useEffect } from "react";
import { useQuiz } from "../../lib/QuizContext";
import type { ScreenConfig, QuizState } from "../../lib/types";
import { ScreenShell, PrimaryButton } from "../ScreenShell";
import { LEGAL_TEXTS } from "../../lib/content-runtime";

/* -------------------- Text Input (Ekran 25 name, 26 email) -------------------- */
export function TextInputScreen({ screen }: { screen: ScreenConfig }) {
  const { state, setField, next, submitEmail } = useQuiz();
  const key = screen.stateKey;
  const current = key ? (state[key] as string) : "";

  const isEmail = key === "email";
  const isPhone = key === ("phone" as string);
  // Submit trigger: email (bireysel) or phone (kurumsal — last capture before loading)
  const isSubmitTrigger =
    isEmail ||
    isPhone ||
    screen.cta === "Planımı Hazırla" ||
    screen.cta === "Raporumu Oluştur" ||
    screen.cta === "Raporumu Olustur";
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [kvkkConsent, setKvkkConsent] = useState(false);

  const valid = isEmail
    ? /^\S+@\S+\.\S+$/.test(current)
    : isPhone
      ? current.replace(/\s/g, "").length >= 10
      : current.trim().length >= 2;

  const handleSubmit = async () => {
    if (!valid) return;
    if (!isSubmitTrigger) {
      next();
      return;
    }
    // Submit screen — fire webhook, show processing overlay for min 3s, then continue.
    setSubmitting(true);
    setError(null);
    const startTime = Date.now();
    const res = await submitEmail();
    // Ensure processing overlay shows for at least 5 seconds
    const elapsed = Date.now() - startTime;
    if (elapsed < 5000) {
      await new Promise((r) => setTimeout(r, 5000 - elapsed));
    }
    setSubmitting(false);
    if (!res.ok) {
      setError(
        "Planını kaydederken bir sorun oluştu, devam edebilirsin — tekrar deneyeceğiz.",
      );
    }
    next();
  };

  // Processing overlay for submit (GHL + PDF takes 3-5 seconds)
  if (isSubmitTrigger && submitting) {
    return <ProcessingOverlay />;
  }

  return (
    <ScreenShell
      caption={screen.caption}
      title={screen.title}
      subtitle={screen.subtitle}
    >
      <div className="space-y-4">
        <input
          type={isEmail ? "email" : "text"}
          value={current}
          onChange={(e) => {
            if (!key) return;
            setField(key, e.target.value as QuizState[keyof QuizState]);
          }}
          placeholder={screen.placeholder}
          autoFocus
          className="w-full rounded-xl border-2 border-gray-200 bg-white px-5 py-4 text-lg font-medium text-dark placeholder-gray-400 outline-none transition-colors focus:border-primary dark:border-dark-border dark:bg-dark-bg dark:text-white"
        />
        {isEmail && (
          <input
            type="tel"
            value={state.phone ?? ""}
            onChange={(e) => setField("phone", e.target.value)}
            placeholder="Telefon (opsiyonel)"
            className="w-full rounded-xl border-2 border-gray-200 bg-white px-5 py-4 text-lg font-medium text-dark placeholder-gray-400 outline-none transition-colors focus:border-primary dark:border-dark-border dark:bg-dark-bg dark:text-white"
          />
        )}
        {error && (
          <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
        )}
        {(isEmail || isSubmitTrigger) && (
          <label className="flex items-start gap-3 cursor-pointer rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 dark:border-dark-border dark:bg-dark-bg">
            <input
              type="checkbox"
              checked={kvkkConsent}
              onChange={(e) => setKvkkConsent(e.target.checked)}
              className="mt-0.5 h-4 w-4 shrink-0 rounded border-gray-300 text-primary accent-primary"
            />
            <span className="text-[11px] leading-relaxed text-gray-500 dark:text-dark-muted">
              {LEGAL_TEXTS.kvkkShort}{" "}
              <a href="/gizlilik-politikasi" target="_blank" rel="noopener noreferrer" className="underline text-primary hover:text-primary-light">
                Gizlilik Politikası
              </a>
            </span>
          </label>
        )}
        <PrimaryButton
          onClick={handleSubmit}
          disabled={!valid || submitting || ((isEmail || isSubmitTrigger) && !kvkkConsent)}
        >
          {screen.cta ?? "Devam"}
        </PrimaryButton>
      </div>
    </ScreenShell>
  );
}

const PROCESSING_STEPS = [
  "Cevapların kaydediliyor...",
  "Kişisel raporun hazırlanıyor...",
  "Profilin oluşturuluyor...",
  "Neredeyse hazır...",
  "Hazır! ✓",
];

function ProcessingOverlay() {
  const [step, setStep] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // 5 steps over ~5 seconds (1s per step)
    const interval = setInterval(() => {
      setStep((s) => {
        if (s + 1 >= PROCESSING_STEPS.length) {
          clearInterval(interval);
          // Trigger fade-out on last step
          setTimeout(() => setFadeOut(true), 400);
          return s;
        }
        return s + 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-2xl flex-col items-center justify-center px-4 py-6 transition-opacity duration-700 ${fadeOut ? "opacity-0" : "opacity-100"}`}>
      <div className="flex flex-col items-center gap-6">
        <div className={`h-16 w-16 rounded-full border-4 border-gray-200 border-t-primary ${step >= PROCESSING_STEPS.length - 1 ? "" : "animate-spin"}`} />
        <div className="space-y-3 w-full max-w-xs">
          {PROCESSING_STEPS.map((text, i) => (
            <div
              key={text}
              className={`flex items-center gap-3 rounded-lg px-4 py-2.5 transition-all duration-500 ${
                i <= step
                  ? "bg-primary/5 text-dark dark:bg-primary/10 dark:text-white"
                  : "text-gray-300 dark:text-dark-border"
              }`}
            >
              <span
                className={`flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold transition-all ${
                  i < step
                    ? "bg-primary text-white"
                    : i === step
                      ? "bg-primary/30 text-primary animate-pulse"
                      : "bg-gray-200 text-gray-400 dark:bg-dark-border"
                }`}
              >
                {i < step ? "✓" : i + 1}
              </span>
              <span className="text-sm font-medium">{text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
