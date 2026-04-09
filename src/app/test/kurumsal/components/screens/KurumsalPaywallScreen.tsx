"use client";

import { useQuiz } from "../../lib/QuizContext-kurumsal";
import { KURUMSAL_PAYWALL_COPY, KURUMSAL_PERSONA_SUMMARIES, interpolate } from "../../lib/content-kurumsal-runtime";
import type { KurumsalScreenConfig, KurumsalQuizState } from "../../lib/types-kurumsal";

function buildBookingUrl(baseUrl: string, firstName: string, email: string, phone: string): string {
  const params = new URLSearchParams();
  if (firstName) params.set("full_name", firstName);
  if (email) params.set("email", email);
  // GHL phone widget doesn't accept + prefix via URL param — strip it
  if (phone) params.set("phone", phone.replace(/^\+/, ""));
  const qs = params.toString();
  return qs ? `${baseUrl}?${qs}` : baseUrl;
}

export function KurumsalPaywallScreen({ screen }: { screen: KurumsalScreenConfig }) {
  const { state } = useQuiz();
  const s = state as KurumsalQuizState;
  const isSecondary = screen.extra?.isSecondaryPaywall === true;
  const baseBookingUrl = (screen.extra?.bookingUrl as string) || KURUMSAL_PAYWALL_COPY.cta.bookingUrl;
  const bookingUrl = buildBookingUrl(baseBookingUrl, s.firstName, s.email, s.phone);
  const detailUrl = (screen.extra?.detailUrl as string) || KURUMSAL_PAYWALL_COPY.cta.detailUrl;
  const persona = KURUMSAL_PERSONA_SUMMARIES[s.persona];

  if (isSecondary) {
    return (
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-2xl flex-col px-4 py-8">
        <h1 className="text-2xl font-extrabold text-dark dark:text-white sm:text-3xl">
          {screen.title}
        </h1>
        <p className="mt-3 text-base text-gray-600 dark:text-dark-muted">
          {screen.subtitle}
        </p>

        {/* Services */}
        <div className="mt-8 space-y-4">
          {KURUMSAL_PAYWALL_COPY.services.map((svc, i) => (
            <div
              key={i}
              className="rounded-xl border border-gray-200 p-5 dark:border-dark-border"
            >
              <div className="flex items-start justify-between">
                <h3 className="font-bold text-dark dark:text-white">{svc.title}</h3>
                <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                  {svc.duration}
                </span>
              </div>
              <p className="mt-2 text-sm text-gray-600 dark:text-dark-muted">
                {svc.description}
              </p>
            </div>
          ))}
        </div>

        {/* FAQ */}
        <div className="mt-8">
          <h2 className="mb-4 text-lg font-bold text-dark dark:text-white">
            Sık Sorulan Sorular
          </h2>
          <div className="space-y-3">
            {KURUMSAL_PAYWALL_COPY.faq.map((item, i) => (
              <details key={i} className="group rounded-xl border border-gray-200 dark:border-dark-border">
                <summary className="cursor-pointer px-5 py-3 text-sm font-semibold text-dark dark:text-white">
                  {item.q}
                </summary>
                <div className="px-5 pb-3 text-sm text-gray-600 dark:text-dark-muted">
                  {item.a}
                </div>
              </details>
            ))}
          </div>
        </div>

        {/* CTAs */}
        <div className="mt-8 space-y-3">
          <a
            href={bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full rounded-xl bg-primary px-6 py-4 text-center text-base font-bold text-white shadow-lg transition-all hover:bg-primary/90"
          >
            {KURUMSAL_PAYWALL_COPY.cta.primary}
          </a>
          <a
            href={detailUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full rounded-xl border-2 border-primary px-6 py-4 text-center text-base font-bold text-primary transition-all hover:bg-primary/5"
          >
            {KURUMSAL_PAYWALL_COPY.cta.secondary}
          </a>
        </div>
      </div>
    );
  }

  // Primary paywall — strategy call CTA
  const heroTitle = interpolate(KURUMSAL_PAYWALL_COPY.hero.title, {
    firstName: s.firstName,
    persona: persona?.title,
  });

  return (
    <div className="mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-2xl flex-col px-4 py-8">
      {/* Persona badge */}
      {persona && (
        <div className="mb-4 flex items-center gap-3 rounded-2xl bg-primary/5 px-5 py-3">
          <span className="text-3xl">{persona.emoji}</span>
          <div>
            <div className="text-sm font-bold text-primary">{persona.title}</div>
            <div className="text-xs text-gray-500">{persona.subtitle}</div>
          </div>
        </div>
      )}

      <h1 className="text-2xl font-extrabold text-dark dark:text-white sm:text-3xl">
        {heroTitle}
      </h1>
      <p className="mt-3 text-base text-gray-600 dark:text-dark-muted">
        {KURUMSAL_PAYWALL_COPY.hero.subtitle}
      </p>

      {/* Strategy call benefits */}
      <div className="mt-8 rounded-2xl bg-gradient-to-br from-primary/5 to-primary/10 p-6">
        <h2 className="mb-4 text-lg font-bold text-dark dark:text-white">
          Strateji Görüşmesinde Neler Konuşulur?
        </h2>
        <div className="space-y-3">
          {[
            { icon: "🔍", text: "Mevcut AI kullanımınızın değerlendirmesi" },
            { icon: "🎯", text: "Öncelikli kullanım senaryolarının belirlenmesi" },
            { icon: "📋", text: "Size uygun program önerisi" },
            { icon: "📊", text: "Beklenen ROI ve zaman çizelgesi" },
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-3">
              <span className="text-lg">{item.icon}</span>
              <span className="text-sm text-gray-700 dark:text-dark-muted">{item.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* GROWT Method */}
      <div className="mt-6">
        <h2 className="mb-3 text-sm font-bold uppercase tracking-wider text-gray-500">
          GROWT Method
        </h2>
        <div className="flex gap-2">
          {[
            { letter: "G", color: "bg-red-500", name: "Gap" },
            { letter: "R", color: "bg-orange-500", name: "Roadmap" },
            { letter: "O", color: "bg-yellow-500", name: "Operate" },
            { letter: "W", color: "bg-green-500", name: "Win" },
            { letter: "T", color: "bg-purple-500", name: "Transform" },
          ].map((step) => (
            <div key={step.letter} className="flex-1 text-center">
              <div
                className={`mx-auto flex h-10 w-10 items-center justify-center rounded-xl ${step.color} text-sm font-black text-white`}
              >
                {step.letter}
              </div>
              <div className="mt-1 text-[10px] font-semibold text-gray-500">
                {step.name}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="mt-8 space-y-3">
        <a
          href={bookingUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full rounded-xl bg-primary px-6 py-4 text-center text-base font-bold text-white shadow-lg transition-all hover:bg-primary/90"
        >
          {screen.cta || "Görüşme Planla"}
        </a>
        <p className="text-center text-xs text-gray-400">
          30 dakika · Ücretsiz · Bağlayıcı değil
        </p>
      </div>
    </div>
  );
}
