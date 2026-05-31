"use client";

import { useEffect } from "react";
import { useQuiz } from "../../lib/QuizContext-kurumsal";
import { KURUMSAL_PERSONA_SUMMARIES } from "../../lib/content-kurumsal-runtime";
import { getDimensionBreakdown, getPainBreakdown } from "../../lib/scoring-kurumsal";
import type { KurumsalScreenConfig, KurumsalQuizState } from "../../lib/types-kurumsal";

function barColor(pct: number): string {
  if (pct >= 66) return "bg-green-500";
  if (pct >= 33) return "bg-yellow-500";
  return "bg-red-500";
}

export function ResultScreen({ screen }: { screen: KurumsalScreenConfig }) {
  const { state, next, finalize } = useQuiz();

  // Compute results on mount (scoring + persona assignment)
  useEffect(() => {
    finalize();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const s = state as KurumsalQuizState;
  const persona = KURUMSAL_PERSONA_SUMMARIES[s.persona] ?? KURUMSAL_PERSONA_SUMMARIES.Baslangic;
  const dimensions = getDimensionBreakdown(s);
  const pains = getPainBreakdown(s);
  const avgDimension = Math.round(
    (dimensions.reduce((sum, d) => sum + d.score, 0) / dimensions.length) * 10,
  );

  return (
    <div className="mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-2xl flex-col px-4 py-6">
      {/* Header */}
      <div className="mb-6 text-center">
        <div className="mb-2 text-5xl">{persona.emoji}</div>
        <h1 className="text-2xl font-extrabold text-dark dark:text-white sm:text-3xl">
          {persona.title}
        </h1>
        <p className="mt-1 text-sm font-medium text-primary">{persona.subtitle}</p>
        <p className="mx-auto mt-3 max-w-md text-sm text-gray-600 dark:text-dark-muted">
          {persona.summary}
        </p>
      </div>

      {/* Score Badge */}
      <div className="mx-auto mb-6 flex items-center gap-4">
        <div className="rounded-2xl bg-primary/10 px-6 py-3 text-center">
          <div className="text-2xl font-black text-primary">%{avgDimension}</div>
          <div className="text-xs font-semibold uppercase tracking-wider text-gray-500">
            Ortalama Olgunluk
          </div>
        </div>
        <div className="rounded-2xl bg-gray-100 px-6 py-3 text-center dark:bg-dark-border">
          <div className="text-2xl font-black text-dark dark:text-white">
            {70 - s.totalScore}/70
          </div>
          <div className="text-xs font-semibold uppercase tracking-wider text-gray-500">
            Olgunluk Skoru
          </div>
        </div>
      </div>

      {/* 5 Dimension Bars */}
      <div className="mb-6">
        <h2 className="mb-3 text-sm font-bold uppercase tracking-wider text-gray-500">
          5 Boyutta AI Olgunluk
        </h2>
        <div className="space-y-3">
          {dimensions.map((d) => {
            const pct = Math.round((d.score / d.max) * 100);
            return (
              <div key={d.key} className="flex items-center gap-3">
                <div className="w-36 text-xs font-semibold text-gray-600 dark:text-dark-muted">
                  {d.label}
                </div>
                <div className="flex-1">
                  <div className="h-2.5 overflow-hidden rounded-full bg-gray-200 dark:bg-dark-border">
                    <div
                      className={`h-full rounded-full transition-all ${barColor(pct)}`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
                <div className="w-10 text-right text-xs font-bold text-gray-500">
                  {d.score}/{d.max}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Pain Areas */}
      <div className="mb-6">
        <h2 className="mb-3 text-sm font-bold uppercase tracking-wider text-gray-500">
          Zorluk Alanları
        </h2>
        <div className="grid grid-cols-2 gap-2">
          {pains.map((p) => (
            <div
              key={p.key}
              className="rounded-xl bg-red-50 p-3 dark:bg-red-900/10"
            >
              <div className="text-xs font-semibold text-red-600">{p.label}</div>
              <div className="text-lg font-black text-dark dark:text-white">
                {p.score}/{p.max}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recommendations */}
      <div className="mb-6">
        <h2 className="mb-3 text-sm font-bold uppercase tracking-wider text-gray-500">
          Öneriler
        </h2>
        <div className="space-y-2">
          {persona.recommendations.map((rec, i) => (
            <div
              key={i}
              className="flex items-start gap-3 rounded-xl bg-gray-50 p-3 dark:bg-dark-border"
            >
              <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">
                {i + 1}
              </span>
              <span className="text-sm text-gray-700 dark:text-dark-muted">{rec}</span>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="mt-auto">
        <button
          type="button"
          onClick={next}
          className="w-full rounded-xl bg-primary px-6 py-4 text-base font-bold text-white shadow-lg transition-all hover:bg-primary/90 hover:shadow-xl active:scale-[0.98]"
        >
          {screen.cta || "Ücretsiz Strateji Görüşmesi"}
        </button>
      </div>
    </div>
  );
}
