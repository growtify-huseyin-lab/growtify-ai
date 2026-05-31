"use client";

import { motion, AnimatePresence } from "motion/react";
import { useTranslations } from "next-intl";
import { useQuiz } from "../lib/QuizContext";
import { usePersonaResolver, usePersonaName } from "../lib/content-runtime-hooks";

function formatTimeAgo(
  savedAt: number,
  t: ReturnType<typeof useTranslations>,
): string {
  const diffMs = Date.now() - savedAt;
  const minutes = Math.floor(diffMs / 60_000);
  if (minutes < 1) return t("timeJustNow");
  if (minutes < 60) return t("timeMinutesAgo", { minutes });
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return t("timeHoursAgo", { hours });
  const days = Math.floor(hours / 24);
  if (days < 7) return t("timeDaysAgo", { days });
  const weeks = Math.floor(days / 7);
  return t("timeWeeksAgo", { weeks });
}

export function ResumeModal() {
  const t = useTranslations("ResumeModalC");
  const { resumeInfo, acceptResume, declineResume, totalScreens } = useQuiz();

  return (
    <AnimatePresence>
      {resumeInfo && (
        <motion.div
          key="resume-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="resume-title"
        >
          <motion.div
            initial={{ scale: 0.9, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: 20, opacity: 0 }}
            transition={{ type: "spring", stiffness: 180, damping: 20 }}
            className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-6 shadow-2xl dark:border-dark-border dark:bg-dark-bg"
          >
            <div className="flex items-start gap-3">
              <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-2xl">
                ⏱️
              </div>
              <div className="flex-1">
                <h2
                  id="resume-title"
                  className="text-lg font-extrabold text-dark dark:text-white"
                >
                  {t("resumeTitle")}
                </h2>
                <p className="mt-1 text-sm text-gray-600 dark:text-dark-muted">
                  {t("resumeScreenLabel")}{" "}
                  <b>
                    {resumeInfo.screenId} / {totalScreens}
                  </b>
                  {t("resumeSavedSuffix", {
                    timeAgo: formatTimeAgo(resumeInfo.savedAt, t),
                  })}
                </p>
              </div>
            </div>

            {/* Progress preview */}
            <div className="mt-5">
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-dark-border">
                <div
                  className="h-full rounded-full bg-primary"
                  style={{
                    width: `${Math.round(((resumeInfo.currentIndex + 1) / totalScreens) * 100)}%`,
                  }}
                />
              </div>
              <div className="mt-1 text-right text-[10px] font-semibold uppercase tracking-wide text-gray-400">
                {t("percentComplete", {
                  percent: Math.round(
                    ((resumeInfo.currentIndex + 1) / totalScreens) * 100,
                  ),
                })}
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-2">
              <button
                type="button"
                onClick={acceptResume}
                className="w-full rounded-xl bg-primary px-5 py-3 text-sm font-bold text-white shadow-lg transition-all hover:bg-primary/90 active:scale-[0.98]"
              >
                {t("continueWhereLeftOff")}
              </button>
              <button
                type="button"
                onClick={declineResume}
                className="w-full rounded-xl border border-gray-200 bg-white px-5 py-3 text-sm font-semibold text-gray-600 transition-colors hover:bg-gray-50 dark:border-dark-border dark:bg-dark-bg dark:text-dark-muted dark:hover:bg-dark-border/30"
              >
                {t("startOver")}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function CompletedModal() {
  const t = useTranslations("ResumeModalC");
  const resolvePersona = usePersonaResolver();
  const personaName = usePersonaName();
  const { hasCompletedResult, showCompletedResult, retakeQuiz, state } =
    useQuiz();

  const pending = hasCompletedResult ? state : null;
  const persona = pending?.persona;
  const personaData = persona ? resolvePersona(persona) : null;
  const personaLabel = persona ? personaName(persona) : null;

  return (
    <AnimatePresence>
      {hasCompletedResult && (
        <motion.div
          key="completed-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="completed-title"
        >
          <motion.div
            initial={{ scale: 0.9, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: 20, opacity: 0 }}
            transition={{ type: "spring", stiffness: 180, damping: 20 }}
            className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-6 shadow-2xl dark:border-dark-border dark:bg-dark-bg"
          >
            <div className="flex items-start gap-3">
              <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-green-100 text-2xl dark:bg-green-900/30">
                ✅
              </div>
              <div className="flex-1">
                <h2
                  id="completed-title"
                  className="text-lg font-extrabold text-dark dark:text-white"
                >
                  {t("completedTitle")}
                </h2>
                <p className="mt-1 text-sm text-gray-600 dark:text-dark-muted">
                  {t("completedProfileLabel")}{" "}
                  <b className="text-primary">{personaLabel}</b>
                </p>
              </div>
            </div>

            {personaData?.projection && (
              <div className="mt-4 rounded-xl border border-green-200 bg-green-50 p-3 dark:border-green-900 dark:bg-green-950/30">
                <p className="text-xs leading-relaxed text-green-800 dark:text-green-300">
                  {personaData.projection}
                </p>
              </div>
            )}

            <div className="mt-6 flex flex-col gap-2">
              <button
                type="button"
                onClick={showCompletedResult}
                className="w-full rounded-xl bg-primary px-5 py-3 text-sm font-bold text-white shadow-lg transition-all hover:bg-primary/90 active:scale-[0.98]"
              >
                {t("seeResultAndProgram")}
              </button>
              <button
                type="button"
                onClick={retakeQuiz}
                className="w-full rounded-xl border border-gray-200 bg-white px-5 py-3 text-sm font-semibold text-gray-600 transition-colors hover:bg-gray-50 dark:border-dark-border dark:bg-dark-bg dark:text-dark-muted dark:hover:bg-dark-border/30"
              >
                {t("retakeQuiz")}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
