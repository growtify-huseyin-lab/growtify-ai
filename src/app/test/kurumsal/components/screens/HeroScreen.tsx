"use client";

import { useQuiz } from "../../lib/QuizContext-kurumsal";
import type { KurumsalScreenConfig } from "../../lib/types-kurumsal";

export function HeroScreen({ screen }: { screen: KurumsalScreenConfig }) {
  const { next } = useQuiz();

  return (
    <div className="mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-2xl flex-col items-center justify-center px-4 py-12 text-center">
      {screen.caption && (
        <div className="mb-4 inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
          {screen.caption}
        </div>
      )}

      <h1 className="text-3xl font-extrabold leading-tight tracking-tight text-dark dark:text-white sm:text-4xl">
        {screen.title}
      </h1>

      {screen.subtitle && (
        <p className="mt-4 max-w-lg text-base text-gray-600 dark:text-dark-muted">
          {screen.subtitle}
        </p>
      )}

      <div className="mt-4 flex items-center gap-6 text-sm text-gray-500">
        <span className="flex items-center gap-1.5">
          <span className="text-lg">⏱️</span> ~3 dakika
        </span>
        <span className="flex items-center gap-1.5">
          <span className="text-lg">📊</span> 21 soru
        </span>
        <span className="flex items-center gap-1.5">
          <span className="text-lg">🔒</span> Ücretsiz
        </span>
      </div>

      <button
        type="button"
        onClick={next}
        className="mt-8 rounded-xl bg-primary px-10 py-4 text-base font-bold text-white shadow-lg transition-all hover:bg-primary/90 hover:shadow-xl active:scale-[0.98]"
      >
        {screen.cta || "Değerlendirmeyi Başlat"}
      </button>

      <p className="mt-6 text-xs text-gray-400 dark:text-dark-muted">
        Kişisel verileriniz KVKK kapsamında korunmaktadır.
      </p>
    </div>
  );
}
