"use client";

import { useRouter } from "next/navigation";
import { useQuiz } from "../../lib/QuizContext";
import type { ScreenConfig, QuizState } from "../../lib/types";
import { ScreenShell, PrimaryButton, OptionButton } from "../ScreenShell";

/* -------------------- Segmentation (Ekran 1) -------------------- */
export function SegmentationScreen({ screen }: { screen: ScreenConfig }) {
  const { state, setField, next } = useQuiz();
  const router = useRouter();
  const current = state.segment;

  const handle = (value: string) => {
    // "İşletme Sahibi" seçildiğinde kurumsal quiz'e yönlendir
    if (value === "isletme") {
      router.push("/test/kurumsal");
      return;
    }
    if (!screen.stateKey) return;
    setField(screen.stateKey, value as QuizState[keyof QuizState]);
    setTimeout(next, 150);
  };

  return (
    <ScreenShell
      caption={screen.caption}
      title={screen.title}
      subtitle={screen.subtitle}
      showBack={false}
    >
      <div className="grid gap-3 sm:grid-cols-2">
        {screen.options?.map((opt) => (
          <OptionButton
            key={opt.value}
            selected={current === opt.value}
            onClick={() => handle(String(opt.value))}
          >
            <div className="flex flex-col items-center gap-3 py-4">
              {opt.emoji && <span className="text-5xl">{opt.emoji}</span>}
              <span className="text-base font-semibold">{opt.label}</span>
            </div>
          </OptionButton>
        ))}
      </div>
    </ScreenShell>
  );
}

/* -------------------- Sector (Ekran 2) -------------------- */
export function SectorScreen({ screen }: { screen: ScreenConfig }) {
  const { state, setField, next } = useQuiz();
  const handle = (value: string) => {
    if (!screen.stateKey) return;
    setField(screen.stateKey, value as QuizState[keyof QuizState]);
    setTimeout(next, 150);
  };

  return (
    <ScreenShell
      caption={screen.caption}
      title={screen.title}
      subtitle={screen.subtitle}
    >
      {(() => {
        const sectors = screen.options?.filter((o) => o.value !== "diger") ?? [];
        const other = screen.options?.find((o) => o.value === "diger");
        return (
          <>
            <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
              {sectors.map((opt) => (
                <OptionButton
                  key={opt.value}
                  selected={state.sector === opt.value}
                  onClick={() => handle(String(opt.value))}
                >
                  <div className="text-center text-sm font-semibold">
                    {opt.label}
                  </div>
                </OptionButton>
              ))}
            </div>
            {other && (
              <div className="mt-3">
                <button
                  type="button"
                  onClick={() => handle(String(other.value))}
                  className={`w-full rounded-xl border-2 px-4 py-3 text-center text-sm font-medium transition-all active:scale-[0.98] ${
                    state.sector === other.value
                      ? "border-primary bg-primary/10 text-primary dark:bg-primary/20"
                      : "border-dashed border-gray-300 text-gray-500 hover:border-primary/40 hover:text-primary dark:border-dark-border dark:text-dark-muted"
                  }`}
                >
                  {other.label}
                </button>
              </div>
            )}
          </>
        );
      })()}
    </ScreenShell>
  );
}

/* -------------------- Single Select (Ekran 18) -------------------- */
export function SingleSelectScreen({ screen }: { screen: ScreenConfig }) {
  const { state, setField, next } = useQuiz();
  const key = screen.stateKey;
  const current = key ? (state[key] as string | null) : null;
  const handle = (value: string) => {
    if (!key) return;
    setField(key, value as QuizState[keyof QuizState]);
    setTimeout(next, 150);
  };

  return (
    <ScreenShell
      caption={screen.caption}
      title={screen.title}
      subtitle={screen.subtitle}
    >
      <div className="space-y-3">
        {screen.options?.map((opt) => (
          <OptionButton
            key={opt.value}
            selected={current === opt.value}
            onClick={() => handle(String(opt.value))}
          >
            {opt.label}
          </OptionButton>
        ))}
      </div>
    </ScreenShell>
  );
}

/* -------------------- Pain Emoji (Ekran 4-9) -------------------- */
export function PainEmojiScreen({ screen }: { screen: ScreenConfig }) {
  const { state, setField, next } = useQuiz();
  const key = screen.stateKey;
  const current = key ? (state[key] as number) : 0;
  const handle = (value: number) => {
    if (!key) return;
    setField(key, value as QuizState[keyof QuizState]);
    setTimeout(next, 150);
  };

  return (
    <ScreenShell
      caption={screen.caption}
      title={screen.title}
      subtitle={screen.subtitle}
    >
      <div className="grid grid-cols-5 gap-1.5 sm:gap-2">
        {screen.options?.map((opt) => {
          const val = Number(opt.value);
          const selected = current === val;
          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => handle(val)}
              className={`flex flex-col items-center gap-1 sm:gap-2 rounded-xl border-2 px-1 py-2 sm:p-3 transition-all active:scale-95 ${
                selected
                  ? "border-primary bg-primary/10"
                  : "border-gray-200 hover:border-primary/40 dark:border-dark-border"
              }`}
            >
              <span className="text-2xl sm:text-4xl">{opt.emoji}</span>
              <span className="text-[8px] sm:text-[10px] font-semibold uppercase tracking-wide text-gray-600 dark:text-dark-muted leading-tight text-center break-words hyphens-auto">
                {opt.label}
              </span>
            </button>
          );
        })}
      </div>
    </ScreenShell>
  );
}

/* -------------------- Likert 1-10 (Ekran 10-17) -------------------- */
export function LikertScreen({ screen }: { screen: ScreenConfig }) {
  const { state, setField, next } = useQuiz();
  const key = screen.stateKey;
  const current = key ? (state[key] as number) : 0;
  const handle = (value: number) => {
    if (!key) return;
    setField(key, value as QuizState[keyof QuizState]);
  };

  return (
    <ScreenShell
      caption={screen.caption}
      title={screen.title}
      subtitle={screen.subtitle}
    >
      <div className="space-y-6">
        <div className="flex items-center justify-between text-xs font-semibold text-gray-500 dark:text-dark-muted">
          <span>{screen.likertMin}</span>
          <span>{screen.likertMax}</span>
        </div>
        <div className="grid grid-cols-10 gap-1.5">
          {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => {
            const selected = current === n;
            return (
              <button
                key={n}
                type="button"
                onClick={() => handle(n)}
                className={`aspect-square rounded-lg border-2 text-sm font-bold transition-all active:scale-95 ${
                  selected
                    ? "border-primary bg-primary text-white"
                    : "border-gray-200 bg-white text-gray-600 hover:border-primary/40 dark:border-dark-border dark:bg-dark-bg dark:text-dark-muted"
                }`}
              >
                {n}
              </button>
            );
          })}
        </div>
        <PrimaryButton onClick={next} disabled={!current}>
          Devam
        </PrimaryButton>
      </div>
    </ScreenShell>
  );
}

/* -------------------- Multi Select (Ekran 19-20) -------------------- */
export function MultiSelectScreen({ screen }: { screen: ScreenConfig }) {
  const { state, setField, next } = useQuiz();
  const key = screen.stateKey;
  const current = key ? ((state[key] as string[]) ?? []) : [];

  const toggle = (value: string) => {
    if (!key) return;
    const nextValues = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];
    setField(key, nextValues as QuizState[keyof QuizState]);
  };

  return (
    <ScreenShell
      caption={screen.caption}
      title={screen.title}
      subtitle={screen.subtitle}
    >
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {screen.options?.map((opt) => (
          <OptionButton
            key={opt.value}
            selected={current.includes(String(opt.value))}
            onClick={() => toggle(String(opt.value))}
          >
            <div className="text-left">
              <div className="font-semibold">{opt.label}</div>
              {opt.description && (
                <div className="mt-1 text-xs text-gray-500 dark:text-dark-muted leading-snug">
                  {opt.description}
                </div>
              )}
            </div>
          </OptionButton>
        ))}
      </div>
      <div className="mt-6">
        <PrimaryButton onClick={next} disabled={current.length === 0}>
          Devam ({current.length} seçili)
        </PrimaryButton>
      </div>
    </ScreenShell>
  );
}

/* -------------------- Commitment (Ekran 24) -------------------- */
export function CommitmentScreen({ screen }: { screen: ScreenConfig }) {
  const { state, setField, next } = useQuiz();
  const key = screen.stateKey;
  const current = key ? (state[key] as number | null) : null;

  const handle = (value: number) => {
    if (!key) return;
    setField(key, value as QuizState[keyof QuizState]);
    setTimeout(next, 150);
  };

  return (
    <ScreenShell
      caption={screen.caption}
      title={screen.title}
      subtitle={screen.subtitle}
    >
      <div className="grid gap-3 sm:grid-cols-2">
        {screen.options?.map((opt) => (
          <OptionButton
            key={opt.value}
            selected={current === Number(opt.value)}
            onClick={() => handle(Number(opt.value))}
          >
            <div className="flex items-center gap-3">
              {opt.emoji && <span className="text-2xl">{opt.emoji}</span>}
              <span className="font-semibold">{opt.label}</span>
            </div>
          </OptionButton>
        ))}
      </div>
    </ScreenShell>
  );
}

/* -------------------- Bonus Modal (Ekran 30, 32) -------------------- */
export function BonusModalScreen({ screen }: { screen: ScreenConfig }) {
  const { state, setField, next } = useQuiz();
  const key = screen.stateKey;
  const current = key ? (state[key] as boolean | null) : null;

  const handle = (value: boolean) => {
    if (!key) return;
    setField(key, value as QuizState[keyof QuizState]);
    setTimeout(next, 200);
  };

  return (
    <ScreenShell
      caption={screen.caption}
      title={screen.title}
      subtitle={screen.subtitle}
    >
      <div className="rounded-2xl border-2 border-primary/30 bg-primary/5 p-6">
        <div className="grid gap-3 sm:grid-cols-2">
          {screen.options?.map((opt) => {
            const boolVal = opt.value === "true";
            return (
              <OptionButton
                key={opt.value}
                selected={current === boolVal}
                onClick={() => handle(boolVal)}
              >
                <div className="text-center font-semibold">{opt.label}</div>
              </OptionButton>
            );
          })}
        </div>
      </div>
    </ScreenShell>
  );
}
