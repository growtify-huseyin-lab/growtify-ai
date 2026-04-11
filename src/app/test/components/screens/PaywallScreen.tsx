"use client";

import { useEffect, useMemo, useState } from "react";
import { useQuiz } from "../../lib/QuizContext";
import type { ScreenConfig } from "../../lib/types";
import { ScreenShell, PrimaryButton } from "../ScreenShell";
// GHL payment link — hardcoded here because PRODUCT.ctaHref now points to /test (quiz entry)
const PAYMENT_LINK = "https://app.growtify.app/payment-link/69d20484c6a0e600f4d07a46";
import { PAYWALL_COPY, interpolate } from "../../lib/content-runtime";
import {
  getOrStartPaywallExpiry,
  getPaywallSecondsLeft,
} from "../../lib/quiz-countdown";

// -----------------------------------------------------------------------------
// PAYWALL — Ekran 37
// 10 blocks bound to PAYWALL_COPY (content-tr.ts). Countdown is cookie-based.
// -----------------------------------------------------------------------------

export function PaywallScreen({ screen }: { screen: ScreenConfig }) {
  const { state } = useQuiz();

  const price = useMemo(() => {
    const base = PAYWALL_COPY.pricing.base;
    const discounted = Math.floor(base * (1 - state.discount / 100));
    return { base, discounted };
  }, [state.discount]);

  return (
    <ScreenShell
      caption={screen.caption}
      title={screen.title}
      subtitle={screen.subtitle}
      showBack={false}
    >
      <div className="space-y-6 pb-12">
        <CountdownBlock />
        <HeroPromiseBlock firstName={state.firstName} persona={state.persona} />
        <BeforeAfterBlock />
        <StatsBlock />
        <MediaFeaturesBlock />
        <PricingTableBlock
          discount={state.discount}
          base={price.base}
          discounted={price.discounted}
        />
        <TestimonialsBlock />
        <FaqBlock />
        <GuaranteeBlock />
        <DiscountDisclaimerBlock />
        <FinalCtaBlock discounted={price.discounted} />
      </div>
    </ScreenShell>
  );
}

/* ---------------- Blocks ---------------- */

function CountdownBlock() {
  // Real cookie-based countdown. First mount stamps the cookie; subsequent
  // visits see the remaining time from the same stamp.
  const [secondsLeft, setSecondsLeft] = useState<number>(0);
  const [expired, setExpired] = useState(false);

  useEffect(() => {
    const expiry = getOrStartPaywallExpiry(PAYWALL_COPY.countdown.durationMinutes);
    const tick = () => {
      const left = getPaywallSecondsLeft(expiry);
      setSecondsLeft(left);
      if (left === 0) setExpired(true);
    };
    tick();
    const timer = setInterval(tick, 1000);
    return () => clearInterval(timer);
  }, []);

  const mm = String(Math.floor(secondsLeft / 60)).padStart(2, "0");
  const ss = String(secondsLeft % 60).padStart(2, "0");

  return (
    <div
      className={`rounded-2xl border-2 p-4 text-center ${
        expired
          ? "border-gray-300 bg-gray-50 dark:border-dark-border dark:bg-dark-bg"
          : "border-red-300 bg-red-50 dark:border-red-900 dark:bg-red-950"
      }`}
    >
      <div
        className={`text-xs font-semibold uppercase tracking-wider ${
          expired ? "text-gray-500" : "text-red-700 dark:text-red-300"
        }`}
      >
        {expired ? "Teklif süresi doldu" : PAYWALL_COPY.countdown.headline}
      </div>
      <div
        className={`mt-1 font-mono text-3xl font-black ${
          expired ? "text-gray-400" : "text-red-700 dark:text-red-300"
        }`}
      >
        {mm}:{ss}
      </div>
      {!expired && (
        <div className="mt-1 text-[11px] text-red-800/80 dark:text-red-300/70">
          {PAYWALL_COPY.countdown.sublabel}
        </div>
      )}
    </div>
  );
}

function HeroPromiseBlock({
  firstName,
  persona,
}: {
  firstName: string;
  persona: string;
}) {
  // Split sentence around persona for visual emphasis
  const rawText = interpolate(PAYWALL_COPY.heroPromise.text, {
    firstName,
    persona: "__PERSONA__",
  });
  const parts = rawText.split("__PERSONA__");
  const [before, after] = [parts[0] ?? "", parts[1] ?? ""];

  return (
    <section className="relative overflow-hidden rounded-3xl border-2 border-primary/20 bg-gradient-to-br from-primary/5 via-accent/5 to-primary/10 p-8 shadow-lg dark:border-primary/30 dark:from-primary/10 dark:via-accent/5 dark:to-primary/15">
      {/* Decorative orbs */}
      <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-primary/10 blur-2xl" />
      <div className="pointer-events-none absolute -bottom-8 -left-8 h-32 w-32 rounded-full bg-accent/10 blur-2xl" />

      <div className="relative">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-primary shadow-sm backdrop-blur dark:bg-dark-bg/80">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
          Kişisel Plan
        </div>

        <h2
          className="text-2xl font-extrabold leading-snug tracking-tight text-dark dark:text-white sm:text-[26px]"
          style={{
            fontFamily:
              "var(--font-serif, 'Playfair Display'), Georgia, 'Times New Roman', serif",
          }}
        >
          <span className="block text-primary">{firstName || "Sen"},</span>
          <span className="block">
            {before.replace(/^[,\s]+/, "")}
            <span className="relative inline-block px-1">
              <span className="relative z-10 font-black text-primary">
                {persona}
              </span>
              <span className="absolute inset-x-0 bottom-0.5 z-0 h-2 bg-accent/60" />
            </span>
            {after}
          </span>
        </h2>
      </div>
    </section>
  );
}

function BeforeAfterBlock() {
  const { beforeTitle, before, afterTitle, after } = PAYWALL_COPY.beforeAfter;
  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-dark-border dark:bg-dark-bg">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border-2 border-red-200 bg-red-50 p-4 dark:border-red-900 dark:bg-red-950/50">
          <div className="mb-2 text-xs font-bold text-red-700 dark:text-red-300">
            {beforeTitle}
          </div>
          <ul className="space-y-1.5 text-sm text-red-900 dark:text-red-200">
            {before.map((item, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="mt-0.5">✗</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-xl border-2 border-green-200 bg-green-50 p-4 dark:border-green-900 dark:bg-green-950/50">
          <div className="mb-2 text-xs font-bold text-green-700 dark:text-green-300">
            {afterTitle}
          </div>
          <ul className="space-y-1.5 text-sm text-green-900 dark:text-green-200">
            {after.map((item, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="mt-0.5">✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function StatsBlock() {
  return (
    <section className="grid grid-cols-1 gap-3 sm:grid-cols-3">
      {PAYWALL_COPY.stats.map((s) => (
        <div
          key={s.label}
          className="rounded-xl border border-gray-200 bg-white p-3 text-center dark:border-dark-border dark:bg-dark-bg"
        >
          <div className="text-base font-black text-primary">{s.value}</div>
          <div className="mt-1 text-[10px] font-semibold uppercase leading-tight tracking-wide text-gray-500 dark:text-dark-muted">
            {s.label}
          </div>
        </div>
      ))}
    </section>
  );
}

function MediaFeaturesBlock() {
  if (!PAYWALL_COPY.mediaFeatures.comingSoon) return null;
  return (
    <section className="rounded-2xl border border-dashed border-gray-300 bg-gray-50 p-5 text-center dark:border-dark-border dark:bg-dark-bg">
      <div className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-dark-muted">
        Medya Yayınları
      </div>
      <p className="mt-2 text-xs text-gray-500 dark:text-dark-muted">
        {PAYWALL_COPY.mediaFeatures.note}
      </p>
    </section>
  );
}

function PricingTableBlock({
  discount,
  base,
  discounted,
}: {
  discount: number;
  base: number;
  discounted: number;
}) {
  return (
    <section className="rounded-2xl border-2 border-primary bg-gradient-to-br from-primary/5 to-accent/10 p-6 dark:border-primary dark:from-primary/10 dark:to-accent/10">
      <div className="text-xs font-semibold uppercase tracking-wider text-primary">
        {PAYWALL_COPY.pricing.headline}
      </div>
      <div className="mt-3 flex items-end gap-3">
        <div className="text-5xl font-black text-dark dark:text-white">
          {discounted.toLocaleString("tr-TR")} TL
        </div>
        <div className="pb-2 text-sm text-gray-500 line-through dark:text-dark-muted">
          {base.toLocaleString("tr-TR")} TL
        </div>
      </div>
      <div className="mt-1 text-sm font-semibold text-green-600 dark:text-green-400">
        %{discount} indirim aktif
      </div>
      <ul className="mt-4 space-y-1.5 text-sm text-gray-700 dark:text-dark-muted">
        {PAYWALL_COPY.pricing.features.map((f, i) => (
          <li key={i} className="flex items-start gap-2">
            <span className="mt-0.5 text-primary">✓</span>
            <span>{f}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

function TestimonialsBlock() {
  if (PAYWALL_COPY.testimonials.strategy === "coming_soon") {
    return (
      <section className="rounded-2xl border border-dashed border-gray-300 bg-gray-50 p-5 dark:border-dark-border dark:bg-dark-bg">
        <div className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-dark-muted">
          Kullanıcı Deneyimleri
        </div>
        <p className="mt-2 text-xs leading-relaxed text-gray-600 dark:text-dark-muted">
          {PAYWALL_COPY.testimonials.comingSoonText}
        </p>
      </section>
    );
  }
  return null;
}

function FaqBlock() {
  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-dark-border dark:bg-dark-bg">
      <div className="text-xs font-semibold uppercase tracking-wider text-primary">
        Sıkça Sorulan Sorular
      </div>
      <div className="mt-4 space-y-2">
        {PAYWALL_COPY.faq.map((f, i) => (
          <details
            key={i}
            className="rounded-lg border border-gray-100 p-3 dark:border-dark-border"
          >
            <summary className="cursor-pointer text-sm font-semibold text-dark dark:text-white">
              {f.q}
            </summary>
            <p className="mt-2 text-sm leading-relaxed text-gray-600 dark:text-dark-muted">
              {f.a}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}

function GuaranteeBlock() {
  return (
    <section className="rounded-2xl border-2 border-amber-300 bg-amber-50 p-6 text-center dark:border-amber-900 dark:bg-amber-950">
      <div className="text-4xl">🛡️</div>
      <div className="mt-2 font-bold text-amber-900 dark:text-amber-300">
        {PAYWALL_COPY.guarantee.headline}
      </div>
      <p className="mt-2 text-xs leading-relaxed text-amber-800 dark:text-amber-400">
        {PAYWALL_COPY.guarantee.text}
      </p>
    </section>
  );
}

function DiscountDisclaimerBlock() {
  const discountDisclaimer = (PAYWALL_COPY as { discountDisclaimer?: string }).discountDisclaimer;
  if (!discountDisclaimer) return null;
  return (
    <p className="mt-2 text-[10px] leading-relaxed text-gray-400 dark:text-dark-muted">
      {discountDisclaimer}
    </p>
  );
}

function FinalCtaBlock({ discounted }: { discounted: number }) {
  const { couponCode, state } = useQuiz();

  // Build prefilled payment link with contact info + coupon
  // Split full name into firstName + lastName for GHL checkout
  const nameParts = (state.firstName || "").trim().split(/\s+/);
  const firstName = nameParts[0] || "";
  const lastName = nameParts.slice(1).join(" ") || "";

  const params = new URLSearchParams();
  if (firstName) params.set("firstName", firstName);
  if (lastName) params.set("lastName", lastName);
  if (state.email) params.set("email", state.email);
  if (state.phone) params.set("phone", state.phone);
  if (couponCode) params.set("couponCode", couponCode);
  const paymentUrl = PAYMENT_LINK + (params.toString() ? "?" + params.toString() : "");

  return (
    <section className="sticky bottom-4 space-y-3 rounded-2xl bg-primary p-4 shadow-2xl">
      <div className="text-center text-xs font-semibold uppercase tracking-wider text-white/70">
        Şimdi başla
      </div>
      <div className="text-center text-2xl font-black text-white">
        {discounted.toLocaleString("tr-TR")} TL
      </div>
      {couponCode && (
        <div className="rounded-xl bg-white/15 px-4 py-2 text-center">
          <div className="text-[10px] font-semibold uppercase tracking-wider text-white/60">
            İndirim kodun (otomatik uygulanacak)
          </div>
          <div className="font-mono text-lg font-black tracking-widest text-white">
            {couponCode}
          </div>
          <div className="text-[10px] text-white/50">
            15 dakika geçerli · Tek kullanımlık
          </div>
        </div>
      )}
      <a
        href={paymentUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="block w-full rounded-xl bg-white px-6 py-3 text-center text-base font-bold text-primary shadow-lg active:scale-[0.98]"
      >
        {PAYWALL_COPY.finalCta.label} →
      </a>
    </section>
  );
}
