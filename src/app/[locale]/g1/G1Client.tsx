"use client";

import { useMemo, useState } from "react";
import type {
  G1Answers,
  G1BeforeAfter,
  G1PriorResult,
  G1ResolvedConfig,
  G1Result,
  G1Synthesis,
} from "@/lib/g1/types";
import uxJson from "@/data/g1/g1-result-ux.json";

const PRIMARY = "#5d47f0";

const UX = (
  uxJson as unknown as {
    ux_microcopy: {
      intro: {
        eyebrow: string;
        title: string;
        greeting_with_name: string;
        body: string;
        honesty_nudge: string;
        cta: string;
        meta: string;
      };
      question_ui: {
        back: string;
        next: string;
        quant_section_intro: string;
        number_placeholder: string;
        select_hint: string;
      };
      loading: { title: string; steps: string[] };
      result_ui: {
        title: string;
        level_badge: string;
        weakest_title: string;
        synthesis_title: string;
        cost_title: string;
        firstmove_title: string;
        dimension_detail_toggle: string;
        benchmark_states: { ahead: string; ontrack: string; behind: string };
      };
      completion_cta: { title: string; body: string; primary: string };
    };
  }
).ux_microcopy;

type Phase = "intro" | "quiz" | "submitting" | "result" | "error" | "past";

export default function G1Client({
  config,
  authToken,
  authMode,
  ret,
  name,
  email,
  locale,
  prior,
}: {
  config: G1ResolvedConfig;
  authToken: string;
  authMode: "firebase" | "hmac";
  ret: string | null;
  name: string;
  email: string;
  locale: string;
  prior?: G1PriorResult | null;
}) {
  const [phase, setPhase] = useState<Phase>("intro");
  const [idx, setIdx] = useState(0);
  const [answers, setAnswers] = useState<G1Answers>({});
  const [numDraft, setNumDraft] = useState("");
  const [result, setResult] = useState<G1Result | null>(null);
  const [synth, setSynth] = useState<G1Synthesis | null>(null);
  const [beforeAfter, setBeforeAfter] = useState<G1BeforeAfter | null>(null);
  const [showAll, setShowAll] = useState(false);
  const [error, setError] = useState<string>("");

  const questions = config.questions;
  const total = questions.length;
  const q = questions[idx];
  const progress = Math.round((idx / total) * 100);
  const isQuantStart =
    q && q.type !== "likert5" && idx > 0 && questions[idx - 1].type === "likert5";

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
          name,
          locale,
        }),
      });
      const data = (await res.json()) as {
        ok: boolean;
        result?: G1Result;
        synthesis?: G1Synthesis;
        beforeAfter?: G1BeforeAfter | null;
        error?: string;
      };
      if (!data.ok || !data.result) {
        setError(data.error ?? "submit_failed");
        setPhase("error");
        return;
      }
      setResult(data.result);
      setSynth(data.synthesis ?? null);
      setBeforeAfter(data.beforeAfter ?? null);
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

  function startQuiz() {
    setIdx(0);
    setAnswers({});
    setNumDraft("");
    setPhase("quiz");
  }

  function fmtDate(iso: string): string {
    if (!iso) return "";
    try {
      return new Date(iso).toLocaleDateString("tr-TR", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
    } catch {
      return "";
    }
  }

  /* ---------------------------------------------------------------- intro */
  if (phase === "intro") {
    return (
      <Shell>
        <div className="text-center max-w-xl mx-auto">
          <p className="text-sm font-semibold tracking-wide" style={{ color: PRIMARY }}>
            {UX.intro.eyebrow}
          </p>
          <h1 className="mt-3 text-3xl sm:text-4xl font-bold text-[#232323]">
            {UX.intro.title}
          </h1>
          {name && (
            <p className="mt-3 text-lg text-[#232323]">
              {UX.intro.greeting_with_name.replace("{ad}", name)}
            </p>
          )}
          <p className="mt-4 text-gray-600 leading-relaxed">{UX.intro.body}</p>
          {(name || email) && (
            <div className="mt-4 inline-flex flex-wrap items-center justify-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-3 py-1.5 text-xs text-gray-500">
              <span style={{ color: PRIMARY }}>●</span>
              Doğrulanan kimlik: <b className="text-gray-700">{name || "—"}</b>
              {email ? <span className="text-gray-400">· {email}</span> : null}
              <span className="text-gray-400">· {config.sector.label}</span>
            </div>
          )}
          <p className="mt-4 text-sm text-gray-500 italic">{UX.intro.honesty_nudge}</p>

          {prior ? (
            <div className="mt-7">
              <div className="mx-auto max-w-md rounded-2xl border border-gray-200 bg-gray-50 px-5 py-4 text-left">
                <p className="text-sm text-gray-600">
                  Bu değerlendirmeyi
                  {prior.completedAt ? ` ${fmtDate(prior.completedAt)} tarihinde` : " daha önce"} tamamlamıştın.
                </p>
                <p className="mt-1 font-semibold text-[#232323]">
                  {prior.archetype || "Profilin"} · {prior.overall}/5
                </p>
                <p className="mt-1 text-xs text-gray-500">
                  Yeniden çözersen, önceki sonucunla karşılaştırmalı bir “önce → sonra”
                  görürsün.
                </p>
              </div>
              <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
                <button
                  onClick={() => setPhase("past")}
                  className="rounded-xl border-2 px-6 py-3 font-semibold transition hover:bg-gray-50"
                  style={{ borderColor: PRIMARY, color: PRIMARY }}
                >
                  Önceki sonucu gör
                </button>
                <button
                  onClick={startQuiz}
                  className="rounded-xl px-7 py-3 text-white font-semibold shadow-sm transition hover:opacity-90"
                  style={{ backgroundColor: PRIMARY }}
                >
                  Yeniden çöz →
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={startQuiz}
              className="mt-7 inline-flex items-center justify-center rounded-xl px-8 py-3.5 text-white font-semibold shadow-sm hover:opacity-90 transition"
              style={{ backgroundColor: PRIMARY }}
            >
              {UX.intro.cta}
            </button>
          )}
          <p className="mt-3 text-xs text-gray-400">{UX.intro.meta}</p>
        </div>
      </Shell>
    );
  }

  /* ----------------------------------------------------------------- past */
  // Read-only recall of the member's last stored result (from GHL fields).
  if (phase === "past" && prior) {
    return (
      <Shell wide>
        <div className="max-w-2xl mx-auto">
          <div className="text-center">
            <p className="text-sm font-semibold tracking-wide" style={{ color: PRIMARY }}>
              Önceki Sonucun
            </p>
            <h1 className="mt-2 text-3xl font-bold text-[#232323]">
              {prior.archetype || "Profilin"}
            </h1>
            <p className="mt-1 text-gray-500">
              {prior.overall}/5 · {config.sector.label}
              {prior.completedAt ? ` · ${fmtDate(prior.completedAt)}` : ""}
            </p>
          </div>

          {prior.gapSummary && (
            <p className="mt-6 text-[#232323] leading-relaxed text-center">
              {prior.gapSummary}
            </p>
          )}

          {prior.dims.length > 0 && (
            <div className="mt-6 grid gap-2 sm:grid-cols-2">
              {prior.dims.map((d) => (
                <div
                  key={d.id}
                  className="flex items-center justify-between rounded-xl border border-gray-200 px-4 py-2.5"
                >
                  <span className="text-sm text-[#232323]">{dimLabel[d.id] ?? d.id}</span>
                  <span className="font-semibold" style={{ color: PRIMARY }}>
                    {d.score}/5
                  </span>
                </div>
              ))}
            </div>
          )}

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={startQuiz}
              className="rounded-xl px-7 py-3 text-white font-semibold shadow-sm transition hover:opacity-90"
              style={{ backgroundColor: PRIMARY }}
            >
              Yeniden çöz (önce → sonra) →
            </button>
            {ret && (
              <a
                href={ret}
                className="rounded-xl border-2 px-6 py-3 font-semibold transition hover:bg-gray-50"
                style={{ borderColor: PRIMARY, color: PRIMARY }}
              >
                Derse Dön
              </a>
            )}
          </div>
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
          <p className="mt-4 font-semibold text-[#232323]">{UX.loading.title}</p>
          <p className="mt-1 text-sm text-gray-400">{UX.loading.steps.join(" · ")}</p>
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
  if (phase === "result" && result && synth) {
    const bench = UX.result_ui.benchmark_states;
    return (
      <Shell wide>
        <div className="max-w-2xl mx-auto">
          <div className="text-center">
            <p className="text-sm font-semibold tracking-wide" style={{ color: PRIMARY }}>
              {UX.result_ui.title}
            </p>
            <h1 className="mt-2 text-3xl font-bold text-[#232323]">
              {UX.result_ui.level_badge.replace("{level_label}", synth.levelLabel)}
            </h1>
            <p className="mt-1 text-gray-500">
              {synth.overall}/5 · sektör ort. {synth.sectorOverallBenchmark}/5 ·{" "}
              {config.sector.label}
            </p>
          </div>

          {/* Before → After (G→T) — only on a retake */}
          {beforeAfter && (
            <section
              className="mt-8 rounded-2xl border p-5"
              style={{ borderColor: PRIMARY, backgroundColor: "#f6f5ff" }}
            >
              <h2 className="text-sm font-semibold uppercase tracking-wide" style={{ color: PRIMARY }}>
                Önce → Sonra · {beforeAfter.attempt}. ölçüm
              </h2>
              <div className="mt-3 flex items-center justify-center gap-4">
                <div className="text-center">
                  <div className="text-xs text-gray-400">Önce</div>
                  <div className="text-2xl font-bold text-gray-400">{beforeAfter.before}/5</div>
                </div>
                <div className="text-2xl text-gray-300">→</div>
                <div className="text-center">
                  <div className="text-xs" style={{ color: PRIMARY }}>Sonra</div>
                  <div className="text-2xl font-bold text-[#232323]">{beforeAfter.after}/5</div>
                </div>
                <DeltaBadge value={beforeAfter.delta} big />
              </div>
              <div className="mt-4 grid gap-2 sm:grid-cols-2">
                {beforeAfter.dims.map((d) => (
                  <div
                    key={d.id}
                    className="flex items-center justify-between rounded-xl bg-white/70 px-4 py-2 text-sm"
                  >
                    <span className="text-[#232323]">{d.label}</span>
                    <span className="flex items-center gap-2 text-gray-500">
                      {d.before} → <b className="text-[#232323]">{d.after}</b>
                      <DeltaBadge value={d.delta} />
                    </span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Synthesis / gap paragraph */}
          <section className="mt-8 rounded-2xl border border-gray-100 bg-gray-50/60 p-5">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-400">
              {UX.result_ui.synthesis_title}
            </h2>
            <p className="mt-2 text-[#232323] leading-relaxed">{synth.gapParagraph}</p>
          </section>

          {/* Weakest link + first move */}
          <section
            className="mt-5 rounded-2xl border p-5"
            style={{ borderColor: PRIMARY }}
          >
            <h2 className="text-sm font-semibold" style={{ color: PRIMARY }}>
              {UX.result_ui.weakest_title}
            </h2>
            <p className="mt-1 font-bold text-[#232323]">
              {synth.weakest.label} · {synth.weakest.score}/5
            </p>
            <p className="mt-1 text-gray-600 leading-relaxed">{synth.weakest.means}</p>
            <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-gray-400">
              {UX.result_ui.firstmove_title}
            </p>
            <p className="mt-1 text-[#232323] leading-relaxed">{synth.weakest.next}</p>
          </section>

          {/* Cost of inaction */}
          {synth.cost && (
            <section className="mt-5 rounded-2xl border border-amber-200 bg-amber-50/50 p-5">
              <h2 className="text-sm font-semibold text-amber-700">
                {UX.result_ui.cost_title}
              </h2>
              <p className="mt-2 text-sm text-gray-600">{synth.cost.intro}</p>
              <ul className="mt-2 space-y-1.5">
                {synth.cost.lines.map((l, i) => (
                  <li key={i} className="text-[#232323] leading-relaxed">
                    • {l}
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-sm font-medium text-amber-800">{synth.cost.closing}</p>
            </section>
          )}

          {/* All dimensions */}
          <div className="mt-6 text-center">
            <button
              onClick={() => setShowAll((s) => !s)}
              className="text-sm font-medium"
              style={{ color: PRIMARY }}
            >
              {UX.result_ui.dimension_detail_toggle} {showAll ? "▲" : "▼"}
            </button>
          </div>
          {showAll && (
            <div className="mt-4 space-y-4">
              {synth.dimensions.map((d) => (
                <div key={d.id} className="rounded-xl border border-gray-100 p-4">
                  <div className="flex items-baseline justify-between">
                    <span className="font-semibold text-[#232323]">
                      {dimLabel[d.id] ?? d.label}
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
                    <span
                      className={
                        d.benchState === "ahead"
                          ? "text-emerald-600"
                          : d.benchState === "behind"
                            ? "text-amber-600"
                            : "text-gray-500"
                      }
                    >
                      {bench[d.benchState]}
                    </span>
                  </div>
                  {d.means && <p className="mt-2 text-sm text-gray-600">{d.means}</p>}
                  {d.next && (
                    <p className="mt-1 text-sm text-[#232323]">{d.next}</p>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Completion CTA */}
          <section className="mt-8 rounded-2xl bg-[#5d47f0]/5 p-6 text-center">
            <h2 className="text-lg font-bold text-[#232323]">{UX.completion_cta.title}</h2>
            <p className="mt-1 text-gray-600">{UX.completion_cta.body}</p>
            {ret && (
              <a
                href={ret}
                className="mt-5 inline-flex items-center justify-center rounded-xl px-8 py-3.5 text-white font-semibold hover:opacity-90 transition"
                style={{ backgroundColor: PRIMARY }}
              >
                {UX.completion_cta.primary}
              </a>
            )}
          </section>
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
            {idx + 1} / {total}
          </span>
        </div>
        <div className="mt-2 h-1.5 w-full rounded-full bg-gray-100 overflow-hidden">
          <div
            className="h-full rounded-full transition-all"
            style={{ width: `${progress}%`, backgroundColor: PRIMARY }}
          />
        </div>

        {isQuantStart && (
          <p className="mt-6 text-center text-sm font-medium" style={{ color: PRIMARY }}>
            {UX.question_ui.quant_section_intro}
          </p>
        )}

        <h2 className="mt-7 text-2xl font-bold text-center text-[#232323]">{q.text}</h2>

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
          <>
            <p className="mt-3 text-center text-xs text-gray-400">
              {UX.question_ui.select_hint}
            </p>
            <div className="mt-3 space-y-3">
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
          </>
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
                placeholder={UX.question_ui.number_placeholder}
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
              {UX.question_ui.next} →
            </button>
          </div>
        )}

        {idx > 0 && (
          <button onClick={back} className="mt-6 text-sm text-gray-400 hover:text-gray-600">
            ← {UX.question_ui.back}
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

// Colored delta chip for the before/after view: ↑ green gain, → gray flat, ↓ red drop.
function DeltaBadge({ value, big }: { value: number; big?: boolean }) {
  const up = value > 0;
  const down = value < 0;
  const color = up ? "#16a34a" : down ? "#dc2626" : "#9ca3af";
  const arrow = up ? "↑" : down ? "↓" : "→";
  const sign = value > 0 ? "+" : "";
  return (
    <span
      className={`inline-flex items-center gap-0.5 font-bold ${big ? "text-lg px-2.5 py-1 rounded-lg" : "text-xs px-1.5 py-0.5 rounded"}`}
      style={{ color, backgroundColor: big ? `${color}1a` : "transparent" }}
    >
      {arrow} {sign}
      {value}
    </span>
  );
}
