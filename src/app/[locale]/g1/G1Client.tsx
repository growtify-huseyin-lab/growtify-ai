"use client";

import { useMemo, useState } from "react";
import type { G1Answers, G1Config, G1Result } from "@/lib/g1/types";

const PRIMARY = "#5d47f0";

type Phase = "intro" | "quiz" | "submitting" | "result" | "error";

export default function G1Client({
  config,
  authToken,
  authMode,
  sector,
  ret,
  name,
  locale,
}: {
  config: G1Config;
  authToken: string;
  authMode: "firebase" | "hmac";
  sector: string | null;
  ret: string | null;
  name: string;
  locale: string;
}) {
  const [phase, setPhase] = useState<Phase>("intro");
  const [idx, setIdx] = useState(0);
  const [answers, setAnswers] = useState<G1Answers>({});
  const [result, setResult] = useState<G1Result | null>(null);
  const [error, setError] = useState<string>("");

  const questions = config.questions;
  const total = questions.length;
  const q = questions[idx];
  const progress = Math.round(((idx) / total) * 100);

  const dimLabel = useMemo(() => {
    const m: Record<string, string> = {};
    for (const d of config.dimensions) m[d.key] = d.label;
    return m;
  }, [config.dimensions]);

  async function submit(finalAnswers: G1Answers) {
    setPhase("submitting");
    try {
      const res = await fetch("/api/g1/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: authToken, mode: authMode, answers: finalAnswers, sector, locale }),
      });
      const data = (await res.json()) as { ok: boolean; result?: G1Result; error?: string };
      if (!data.ok || !data.result) {
        setError(data.error ?? "submit_failed");
        setPhase("error");
        return;
      }
      setResult(data.result);
      setPhase("result");
    } catch (e) {
      setError((e as Error).message);
      setPhase("error");
    }
  }

  function choose(score: number) {
    const next = { ...answers, [q.id]: score };
    setAnswers(next);
    if (idx + 1 >= total) {
      void submit(next);
    } else {
      setIdx(idx + 1);
    }
  }

  /* ---------------------------------------------------------------- intro */
  if (phase === "intro") {
    return (
      <Shell>
        <div className="text-center max-w-xl mx-auto">
          <p className="text-sm font-semibold tracking-wide" style={{ color: PRIMARY }}>
            GROWT · G — GAP ANALYSIS
          </p>
          <h1 className="mt-3 text-3xl sm:text-4xl font-bold text-[#232323]">
            {config.meta.title}
          </h1>
          <p className="mt-4 text-gray-600 leading-relaxed">
            {name ? `Merhaba ${name}! ` : "Merhaba! "}
            {config.meta.subtitle}
          </p>
          <p className="mt-2 text-sm text-gray-400">
            {total} soru · 5-10 dakika
          </p>
          <button
            onClick={() => setPhase("quiz")}
            className="mt-8 inline-flex items-center justify-center rounded-xl px-8 py-3.5 text-white font-semibold shadow-sm hover:opacity-90 transition"
            style={{ backgroundColor: PRIMARY }}
          >
            Teste Başla →
          </button>
        </div>
      </Shell>
    );
  }

  /* --------------------------------------------------------------- submit */
  if (phase === "submitting") {
    return (
      <Shell>
        <div className="text-center">
          <div
            className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-gray-200"
            style={{ borderTopColor: PRIMARY }}
          />
          <p className="mt-4 text-gray-500">Profilin hesaplanıyor…</p>
        </div>
      </Shell>
    );
  }

  /* ---------------------------------------------------------------- error */
  if (phase === "error") {
    return (
      <Shell>
        <div className="text-center max-w-md mx-auto">
          <h2 className="text-xl font-bold text-[#232323]">Bir şeyler ters gitti</h2>
          <p className="mt-2 text-gray-600">Lütfen tekrar dene. ({error})</p>
          <button
            onClick={() => setPhase("quiz")}
            className="mt-6 rounded-xl px-6 py-3 text-white font-semibold"
            style={{ backgroundColor: PRIMARY }}
          >
            Tekrar dene
          </button>
        </div>
      </Shell>
    );
  }

  /* --------------------------------------------------------------- result */
  if (phase === "result" && result) {
    return (
      <Shell wide>
        <div className="max-w-2xl mx-auto">
          <div className="text-center">
            <p className="text-sm font-semibold tracking-wide" style={{ color: PRIMARY }}>
              PROFİLİN
            </p>
            <h1 className="mt-2 text-3xl font-bold text-[#232323]">{result.archetypeLabel}</h1>
            <p className="mt-1 text-gray-500">Genel olgunluk: <b>{result.overall}/5</b></p>
            <p className="mt-4 text-gray-600 leading-relaxed">{result.narrative}</p>
          </div>

          <div className="mt-8 space-y-4">
            {result.dimensions.map((d) => (
              <div key={d.key} className="rounded-xl border border-gray-100 p-4">
                <div className="flex items-baseline justify-between">
                  <span className="font-semibold text-[#232323]">{dimLabel[d.key] ?? d.key}</span>
                  <span className="text-sm text-gray-500">
                    {d.score}/5 · <span style={{ color: PRIMARY }}>{d.bandLabel}</span>
                  </span>
                </div>
                <div className="mt-2 h-2 w-full rounded-full bg-gray-100 overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${(d.score / 5) * 100}%`, backgroundColor: PRIMARY }}
                  />
                </div>
                <div className="mt-1.5 flex items-center justify-between text-xs text-gray-400">
                  <span>
                    Sektör ort. {d.benchmark} ·{" "}
                    <span className={d.delta >= 0 ? "text-emerald-600" : "text-amber-600"}>
                      {d.delta >= 0 ? `+${d.delta} ileride` : `${d.delta} geride`}
                    </span>
                  </span>
                </div>
                {d.recommendation && (
                  <p className="mt-2 text-sm text-gray-600">
                    <b>Sonraki adım:</b> {d.recommendation}
                  </p>
                )}
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            {ret ? (
              <a
                href={ret}
                className="inline-flex items-center justify-center rounded-xl px-8 py-3.5 text-white font-semibold hover:opacity-90 transition"
                style={{ backgroundColor: PRIMARY }}
              >
                ← Derse Dön
              </a>
            ) : (
              <p className="text-sm text-gray-400">Sonuçların kaydedildi. Derse geri dönebilirsin.</p>
            )}
          </div>
        </div>
      </Shell>
    );
  }

  /* ----------------------------------------------------------------- quiz */
  return (
    <Shell wide>
      <div className="max-w-2xl mx-auto w-full">
        <div className="flex items-center justify-between text-xs text-gray-400">
          <span className="uppercase tracking-wide">{dimLabel[q.dimension] ?? q.dimension}</span>
          <span>
            Soru {idx + 1} / {total}
          </span>
        </div>
        <div className="mt-2 h-1.5 w-full rounded-full bg-gray-100 overflow-hidden">
          <div
            className="h-full rounded-full transition-all"
            style={{ width: `${progress}%`, backgroundColor: PRIMARY }}
          />
        </div>

        <h2 className="mt-8 text-2xl font-bold text-center text-[#232323]">{q.stem}</h2>

        <div className="mt-6 space-y-3">
          {q.options.map((opt) => (
            <button
              key={opt.score}
              onClick={() => choose(opt.score)}
              className="group flex w-full items-center gap-4 rounded-xl border border-gray-200 p-4 text-left hover:border-[#5d47f0] hover:bg-[#5d47f0]/5 transition"
            >
              <span
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-gray-200 text-sm text-gray-400 group-hover:border-[#5d47f0] group-hover:text-[#5d47f0]"
              >
                {opt.score}
              </span>
              <span className="text-[#232323]">{opt.label}</span>
            </button>
          ))}
        </div>

        {idx > 0 && (
          <button
            onClick={() => setIdx(idx - 1)}
            className="mt-6 text-sm text-gray-400 hover:text-gray-600"
          >
            ← Geri
          </button>
        )}
      </div>
    </Shell>
  );
}

function Shell({ children, wide }: { children: React.ReactNode; wide?: boolean }) {
  return (
    <main className="min-h-screen bg-white flex items-center justify-center px-5 py-12">
      <div className={wide ? "w-full" : "w-full max-w-xl"}>{children}</div>
    </main>
  );
}
