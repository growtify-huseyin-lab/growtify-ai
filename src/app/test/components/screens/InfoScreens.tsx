"use client";

import { useEffect, useMemo, useState } from "react";
import { useQuiz } from "../../lib/QuizContext";
import type { ScreenConfig } from "../../lib/types";
import { ScreenShell, PrimaryButton } from "../ScreenShell";
import { getPersonaSummary, interpolate } from "../../lib/content-runtime";

/* -------------------- Social Proof (Ekran 3) -------------------- */
export function SocialProofScreen({ screen }: { screen: ScreenConfig }) {
  const { next } = useQuiz();
  const metrics =
    ((screen.extra as { metrics?: { label: string; value: string }[] } | undefined)
      ?.metrics) ?? [];

  return (
    <ScreenShell
      caption={screen.caption}
      title={screen.title}
      subtitle={screen.subtitle}
    >
      {/* Motivational visual block */}
      <div className="rounded-2xl border-2 border-primary/20 bg-gradient-to-br from-primary/5 via-accent/5 to-primary/10 p-6 dark:border-primary/30 dark:from-primary/10 dark:via-accent/5 dark:to-primary/15">
        <div className="mb-5 flex items-center justify-center gap-3">
          <div className="flex -space-x-3">
            {["😊", "🧑‍⚕️", "👩‍💼", "👨‍🏫", "🧑‍🍳"].map((emoji, i) => (
              <div
                key={i}
                className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-gray-100 text-lg dark:border-dark-bg dark:bg-dark-card"
              >
                {emoji}
              </div>
            ))}
          </div>
          <span className="text-sm font-semibold text-primary">+binlerce</span>
        </div>
        <div className="grid gap-3 sm:grid-cols-3">
          {metrics.map((m) => (
            <div
              key={m.label}
              className="rounded-xl bg-white/80 p-4 text-center shadow-sm dark:bg-dark-card/80"
            >
              <div className="text-xl font-black text-primary">{m.value}</div>
              <div className="mt-1 text-[11px] font-medium text-gray-600 dark:text-dark-muted">
                {m.label}
              </div>
            </div>
          ))}
        </div>
        <p className="mt-4 text-center text-xs text-gray-500 dark:text-dark-muted">
          Sağlıkçılar, avukatlar, e-ticaret satıcıları, güzellik uzmanları ve daha fazlası...
        </p>
      </div>
      <div className="mt-6">
        <PrimaryButton onClick={next}>{screen.cta ?? "Devam"}</PrimaryButton>
      </div>
    </ScreenShell>
  );
}

/* -------------------- Authority (Ekran 21-23) -------------------- */
export function AuthorityScreen({ screen }: { screen: ScreenConfig }) {
  const { next } = useQuiz();
  const sources =
    (screen.extra as { sources?: string[]; note?: string } | undefined)
      ?.sources ?? [];
  const note = (screen.extra as { note?: string } | undefined)?.note;

  return (
    <ScreenShell
      caption={screen.caption}
      title={screen.title}
      subtitle={screen.subtitle}
    >
      {sources.length > 0 && (
        <ul className="space-y-2">
          {sources.map((s) => (
            <li
              key={s}
              className="flex items-start gap-3 rounded-xl border border-gray-200 bg-white p-4 dark:border-dark-border dark:bg-dark-bg"
            >
              <span className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                ✓
              </span>
              <span className="text-sm text-gray-700 dark:text-dark-muted">
                {s}
              </span>
            </li>
          ))}
        </ul>
      )}
      {note && (
        <p className="mt-4 rounded-lg border border-amber-200 bg-amber-50 p-3 text-xs text-amber-800 dark:border-amber-900 dark:bg-amber-950 dark:text-amber-300">
          {note}
        </p>
      )}
      <div className="mt-8">
        <PrimaryButton onClick={next}>{screen.cta ?? "Devam"}</PrimaryButton>
      </div>
    </ScreenShell>
  );
}

/* -------------------- Loading (Ekran 29, 31, 33) -------------------- */
export function LoadingScreen({ screen }: { screen: ScreenConfig }) {
  const { next, goTo } = useQuiz();
  const extra = screen.extra as
    | { steps?: string[]; durationMs?: number; nextScreenId?: number }
    | undefined;
  const steps = extra?.steps ?? [];
  const duration = extra?.durationMs ?? 2500;

  const [step, setStep] = useState(0);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    if (steps.length === 0) return;
    const perStep = duration / steps.length;
    const interval = setInterval(() => {
      setStep((s) => {
        if (s + 1 >= steps.length) {
          clearInterval(interval);
          setFinished(true);
          return s;
        }
        return s + 1;
      });
    }, perStep);
    return () => clearInterval(interval);
  }, [steps.length, duration]);

  useEffect(() => {
    if (finished) {
      const t = setTimeout(() => {
        // If a specific next screen is defined (e.g., skip Ekran 34), jump there
        if (extra?.nextScreenId) {
          goTo(extra.nextScreenId);
        } else {
          next();
        }
      }, 500);
      return () => clearTimeout(t);
    }
  }, [finished, next, goTo, extra?.nextScreenId]);

  return (
    <ScreenShell
      caption={screen.caption}
      title={screen.title}
      subtitle={screen.subtitle}
      showBack={false}
    >
      <div className="flex flex-col items-center gap-6 py-8">
        <div className="h-16 w-16 animate-spin rounded-full border-4 border-gray-200 border-t-primary" />
        <ul className="w-full space-y-2">
          {steps.map((s, i) => (
            <li
              key={s}
              className={`flex items-center gap-3 rounded-lg p-3 transition-all ${
                i <= step
                  ? "bg-primary/5 text-dark dark:bg-primary/10 dark:text-white"
                  : "text-gray-400 dark:text-dark-muted"
              }`}
            >
              <span
                className={`flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold ${
                  i < step
                    ? "bg-primary text-white"
                    : i === step
                      ? "bg-primary/30 text-primary"
                      : "bg-gray-200 text-gray-400 dark:bg-dark-border"
                }`}
              >
                {i < step ? "✓" : i + 1}
              </span>
              <span className="text-sm">{s}</span>
            </li>
          ))}
        </ul>
      </div>
    </ScreenShell>
  );
}

/* -------------------- Profile Summary (Ekran 27) -------------------- */
export function ProfileSummaryScreen({ screen }: { screen: ScreenConfig }) {
  const { state, next, finalize } = useQuiz();

  // Kick off result computation as user reaches pre-reveal.
  useEffect(() => {
    finalize();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const title = useMemo(
    () =>
      interpolate(screen.title, {
        firstName: state.firstName,
        persona: state.persona,
      }),
    [screen.title, state.firstName, state.persona],
  );

  const personaData = getPersonaSummary(state.persona);
  const summaryText = useMemo(
    () =>
      personaData
        ? interpolate(personaData.summary, {
            firstName: state.firstName,
            persona: state.persona,
          })
        : null,
    [personaData, state.firstName, state.persona],
  );

  return (
    <ScreenShell caption={screen.caption} title={title} subtitle={screen.subtitle}>
      <div className="space-y-4">
        <div className="rounded-2xl border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5 p-6 dark:border-primary/30 dark:from-primary/10 dark:to-accent/10">
          <div className="text-xs font-semibold uppercase tracking-wider text-primary">
            Ön Profil
          </div>
          <div className="mt-2 text-2xl font-extrabold text-dark dark:text-white">
            {state.persona}
          </div>
          {summaryText && (
            <p className="mt-3 text-sm leading-relaxed text-gray-700 dark:text-dark-muted">
              {summaryText}
            </p>
          )}
        </div>

        {personaData?.painIdentification?.length ? (
          <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-dark-border dark:bg-dark-bg">
            <div className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-dark-muted">
              Senin söylediklerin
            </div>
            <ul className="space-y-2">
              {personaData.painIdentification.map((line, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2 text-sm italic text-gray-700 dark:text-dark-muted"
                >
                  <span className="mt-1 text-primary">&ldquo;</span>
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        {personaData?.projection ? (
          <div className="rounded-2xl border-2 border-green-200 bg-green-50 p-5 dark:border-green-900 dark:bg-green-950/30">
            <div className="text-xs font-semibold uppercase tracking-wider text-green-700 dark:text-green-300">
              4 hafta sonra
            </div>
            <p className="mt-2 text-sm font-semibold text-green-900 dark:text-green-100">
              {personaData.projection}
            </p>
          </div>
        ) : null}

      </div>
      <div className="mt-8">
        <PrimaryButton onClick={next}>{screen.cta ?? "Devam"}</PrimaryButton>
      </div>
    </ScreenShell>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-3 text-center dark:border-dark-border dark:bg-dark-bg">
      <div className="text-[10px] font-semibold uppercase tracking-wide text-gray-400">
        {label}
      </div>
      <div className="mt-1 truncate text-sm font-bold text-dark dark:text-white">
        {value}
      </div>
    </div>
  );
}

/* -------------------- Projection Chart (Ekran 28) -------------------- */
export function ProjectionScreen({ screen }: { screen: ScreenConfig }) {
  const { next, state } = useQuiz();

  return (
    <ScreenShell caption={screen.caption} title={screen.title} subtitle={screen.subtitle}>
      <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-dark-border dark:bg-dark-bg">
        {/* Placeholder chart — simple ASCII-ish bars */}
        <div className="space-y-4">
          <ProjectionBar label="Bugün" value={25} color="bg-red-400" />
          <ProjectionBar label="30 gün" value={55} color="bg-yellow-400" />
          <ProjectionBar label="60 gün" value={75} color="bg-green-400" />
          <ProjectionBar label="90 gün" value={92} color="bg-primary" />
        </div>
        <p className="mt-6 text-center text-xs text-gray-500 dark:text-dark-muted">
          Günde {state.commitment ?? 30} dakika · {state.persona} profili
        </p>
      </div>
      <div className="mt-8">
        <PrimaryButton onClick={next}>{screen.cta ?? "Devam"}</PrimaryButton>
      </div>
    </ScreenShell>
  );
}

function ProjectionBar({
  label,
  value,
  color,
}: {
  label: string;
  value: number;
  color: string;
}) {
  return (
    <div>
      <div className="mb-1 flex items-center justify-between text-xs font-semibold text-gray-600 dark:text-dark-muted">
        <span>{label}</span>
        <span>%{value}</span>
      </div>
      <div className="h-3 overflow-hidden rounded-full bg-gray-100 dark:bg-dark-border">
        <div
          className={`h-full rounded-full transition-all duration-700 ${color}`}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}
