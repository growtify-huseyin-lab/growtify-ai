"use client";

import { useMemo, useState } from "react";
import type { G1Answers, G1ResolvedConfig, G1Result } from "@/lib/g1/types";

const PRIMARY = "#5d47f0";
const TITLE = "DeepGap — AI Olgunluk Profili";

type Phase = "intro" | "quiz" | "submitting" | "result" | "error";

export default function G1Client({
  config,
  authToken,
  authMode,
  ret,
  name,
  email,
  locale,
}: {
  config: G1ResolvedConfig;
  authToken: string;
  authMode: "firebase" | "hmac";
  ret: string | null;
  name: string;
  email: string;
  locale: string;
}) {
  const [phase, setPhase] = useState<Phase>("intro");
  const [idx, setIdx] = useState(0);
  const [answers, setAnswers] = useState<G1Answers>({});
  const [numDraft, setNumDraft] = useState("");
  const [result, setResult] = useState<G1Result | null>(null);
  const [ghl, setGhl] = useState<{ ok: boolean; wrote: number } | null>(null);
  const [error, setError] = useState<string>("");

  const questions = config.questions;
  const total = questions.length;
  const q = questions[idx];
  const progress = Math.round((idx / total) * 100);

  const dimLabel = useMemo(() => {
    const m: Record<string, string> = {};
    for (const d of config.dimensions) m[d.id] = d.label;
    return m;
  }, [config.dimensions]);

  async function submit(finalAnswers: G1Answers) {
    setPhase("submitting");
    try {
      const res = await fetch("/api/g1/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token: authToken,
          mode: authMode,
          answers: finalAnswers,
          sector: config.sector.slug,
          locale,
        }),
      });
      const data = (await res.json()) as {
        ok: boolean;
        result?: G1Result;
        error?: string;
        ghl?: { ok: boolean; wrote: number };
      };
      if (!data.ok || !data.result) {
        setError(data.error ?? "submit_failed");
        setPhase("error");
        return;
      }
      setResult(data.result);
      setGhl(data.ghl ?? null);
      setPhase("result");
    } catch (e) {
      setError((e as Error).message);
      setPhase("error");
    }
  }

  function answer(value: number | string) {
    const next = { ...answers, [q.id]: value };
    setAnswers(next);
    setNumDraft("");
    if (idx + 1 >= total) void submit(next);
    else setIdx(idx + 1);
  }

  function back() {
    if (idx > 0) {
      setIdx(idx - 1);
      setNumDraft("");
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
          <h1 className="mt-3 text-3xl sm:text-4xl font-bold text-[#232323]">{TITLE}</h1>
          <p className="mt-4 text-gray-600 leading-relaxed">
            {name ? `Merhaba ${name}! ` : "Merhaba! "}
            İşinin AI olgunluğunu 6 boyutta ölç, kişisel gap profilini gör.
          </p>
          {(name || email) && (
            <div className="mt-4 inline-flex flex-wrap items-center justify-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-3 py-1.5 text-xs text-gray-500">
              <span style={{ color: PRIMARY }}>●</span>
              Doğrulanan kimlik: <b className="text-gray-700">{name || "—"}</b>
              {email ? <span className="text-gray-400">· {email}</span> : null}
              <span className="text-gray-400">· {config.sector.label}</span>
            </div>
          )}
          <p className="mt-3 text-sm text-gray-400">{total} soru · 5-10 dakika</p>
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
            <h1 className="mt-2 text-3xl font-bold text-[#232323]">{result.levelLabel}</h1>
            <p className="mt-1 text-gray-500">
              Genel olgunluk: <b>{result.overall}/5</b> · {config.sector.label}
            </p>
          </div>

          <div className="mt-8 space-y-4">
            {result.dimensions.map((d) => {
              const isWeak = d.id === result.weakest;
              return (
                <div
                  key={d.id}
                  className="rounded-xl border p-4"
                  style={{ borderColor: isWeak ? PRIMARY : "#f1f1f1" }}
                >
                  <div className="flex items-baseline justify-between">
                    <span className="font-semibold text-[#232323]">
                      {dimLabel[d.id] ?? d.id}
                      {isWeak && (
                        <span
                          className="ml-2 rounded-full px-2 py-0.5 text-[10px] font-semibold text-white"
                          style={{ backgroundColor: PRIMARY }}
                        >
                          en zayıf
                        </span>
                      )}
                    </span>
                    <span className="text-sm text-gray-500">
                      {d.score}/5 · <span style={{ color: PRIMARY }}>{d.levelLabel}</span>
                    </span>
                  </div>
                  <div className="mt-2 h-2 w-full rounded-full bg-gray-100 overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{ width: `${(d.score / 5) * 100}%`, backgroundColor: PRIMARY }}
                    />
                  </div>
                  <div className="mt-1.5 text-xs text-gray-400">
                    Sektör ort. {d.benchmark} ·{" "}
                    <span className={d.delta >= 0 ? "text-emerald-600" : "text-amber-600"}>
                      {d.delta >= 0 ? `+${d.delta} ileride` : `${d.delta} geride`}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {ghl && (
            <p className="mt-6 text-center text-xs text-gray-400">
              {ghl.ok && ghl.wrote > 0
                ? `✓ Sonuçların kaydedildi (${ghl.wrote} alan GHL'e yazıldı)`
                : "Sonuçların kaydedildi."}
            </p>
          )}

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
          <span className="uppercase tracking-wide">
            {q.dimension ? dimLabel[q.dimension] ?? "" : "Durum"}
          </span>
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

        <h2 className="mt-8 text-2xl font-bold text-center text-[#232323]">{q.text}</h2>

        {/* likert5 */}
        {q.type === "likert5" && q.likertOptions && (
          <div className="mt-6 space-y-3">
            {q.likertOptions.map((opt) => (
              <button
                key={opt.score}
                onClick={() => answer(opt.score)}
                className="group flex w-full items-center gap-4 rounded-xl border border-gray-200 p-4 text-left hover:border-[#5d47f0] hover:bg-[#5d47f0]/5 transition"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-gray-200 text-sm text-gray-400 group-hover:border-[#5d47f0] group-hover:text-[#5d47f0]">
                  {opt.score}
                </span>
                <span className="text-[#232323]">{opt.label}</span>
              </button>
            ))}
          </div>
        )}

        {/* single_select */}
        {q.type === "single_select" && q.selectOptions && (
          <div className="mt-6 space-y-3">
            {q.selectOptions.map((opt) => (
              <button
                key={opt.value}
                onClick={() => answer(opt.value)}
                className="flex w-full items-center rounded-xl border border-gray-200 p-4 text-left text-[#232323] hover:border-[#5d47f0] hover:bg-[#5d47f0]/5 transition"
              >
                {opt.label}
              </button>
            ))}
          </div>
        )}

        {/* number */}
        {q.type === "number" && (
          <div className="mt-6 max-w-xs mx-auto text-center">
            <div className="flex items-center justify-center gap-3">
              <input
                type="number"
                min={0}
                inputMode="numeric"
                value={numDraft}
                onChange={(e) => setNumDraft(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && numDraft !== "") answer(Number(numDraft));
                }}
                className="w-28 rounded-xl border border-gray-200 px-4 py-3 text-center text-lg focus:border-[#5d47f0] focus:outline-none"
                placeholder="0"
                autoFocus
              />
              {q.unit && <span className="text-gray-500">{q.unit}</span>}
            </div>
            <button
              onClick={() => numDraft !== "" && answer(Number(numDraft))}
              disabled={numDraft === ""}
              className="mt-5 rounded-xl px-7 py-3 text-white font-semibold disabled:opacity-40"
              style={{ backgroundColor: PRIMARY }}
            >
              Devam →
            </button>
          </div>
        )}

        {idx > 0 && (
          <button onClick={back} className="mt-6 text-sm text-gray-400 hover:text-gray-600">
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
