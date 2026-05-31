"use client";

import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { initialKurumsalState, type KurumsalQuizState } from "./types-kurumsal";
import { SCREENS, TOTAL_SCREENS } from "./content-kurumsal-runtime";
import { computeKurumsalResults } from "./scoring-kurumsal";
import {
  clearQuizSnapshot,
  loadQuizSnapshot,
  markQuizCompleted,
  saveQuizSnapshot,
} from "./quiz-storage-kurumsal";
import { QuizCtx } from "../../lib/quiz-context-core";

// Re-export the shared useQuiz hook so components get values from the same context.
export { useQuiz } from "../../lib/quiz-context-core";

interface ResumeInfo {
  screenId: number;
  currentIndex: number;
  savedAt: number;
}

export function KurumsalQuizProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<KurumsalQuizState>(initialKurumsalState);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [resumeInfo, setResumeInfo] = useState<ResumeInfo | null>(null);
  const [hasCompletedResult, setHasCompletedResult] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const pendingSnapshotRef = useRef<{
    state: KurumsalQuizState;
    currentIndex: number;
  } | null>(null);

  // Post-mount snapshot load
  useEffect(() => {
    const snap = loadQuizSnapshot();
    if (snap?.completed) {
      setState(snap.state);
      setCurrentIndex(TOTAL_SCREENS - 1);
      setHasCompletedResult(true);
    } else if (
      snap &&
      snap.currentIndex > 0 &&
      snap.currentIndex < TOTAL_SCREENS - 1
    ) {
      const screen = SCREENS[snap.currentIndex];
      pendingSnapshotRef.current = {
        state: snap.state,
        currentIndex: snap.currentIndex,
      };
      setResumeInfo({
        screenId: screen?.id ?? snap.currentIndex + 1,
        currentIndex: snap.currentIndex,
        savedAt: snap.savedAt,
      });
    } else if (snap) {
      clearQuizSnapshot();
    }
    setHydrated(true);
  }, []);

  // Persist on every change
  useEffect(() => {
    if (!hydrated || resumeInfo) return;
    saveQuizSnapshot(currentIndex, state);
  }, [state, currentIndex, resumeInfo, hydrated]);

  const setField = useCallback(
    (key: string, value: unknown) => {
      setState((prev) => ({ ...prev, [key]: value }));
    },
    [],
  );

  const next = useCallback(() => {
    setCurrentIndex((i) => {
      const nextIdx = Math.min(i + 1, TOTAL_SCREENS - 1);
      if (nextIdx === TOTAL_SCREENS - 1) markQuizCompleted();
      return nextIdx;
    });
  }, []);

  const prev = useCallback(() => {
    setCurrentIndex((i) => Math.max(i - 1, 0));
  }, []);

  const goTo = useCallback((screenId: number) => {
    const idx = SCREENS.findIndex((s) => s.id === screenId);
    if (idx >= 0) setCurrentIndex(idx);
  }, []);

  const finalize = useCallback(() => {
    setState((prev) => {
      const results = computeKurumsalResults(prev);
      return { ...prev, ...results };
    });
  }, []);

  const reset = useCallback(() => {
    clearQuizSnapshot();
    setState(initialKurumsalState);
    setCurrentIndex(0);
    setResumeInfo(null);
    pendingSnapshotRef.current = null;
  }, []);

  const showCompletedResult = useCallback(() => {
    setHasCompletedResult(false);
  }, []);

  const retakeQuiz = useCallback(() => {
    clearQuizSnapshot();
    pendingSnapshotRef.current = null;
    setState(initialKurumsalState);
    setCurrentIndex(0);
    setHasCompletedResult(false);
  }, []);

  const acceptResume = useCallback(() => {
    const pending = pendingSnapshotRef.current;
    if (pending) {
      setState(pending.state);
      setCurrentIndex(pending.currentIndex);
    }
    pendingSnapshotRef.current = null;
    setResumeInfo(null);
  }, []);

  const declineResume = useCallback(() => {
    clearQuizSnapshot();
    pendingSnapshotRef.current = null;
    setResumeInfo(null);
  }, []);

  // No coupon in kurumsal quiz — CTA is strategy call booking
  const submitEmail = useCallback(async () => {
    try {
      const res = await fetch("/test/kurumsal/api/submit-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(state),
      });
      if (!res.ok) {
        return { ok: false, error: `HTTP ${res.status}` };
      }
      const json = await res.json();
      return { ok: true };
    } catch (err) {
      return { ok: false, error: (err as Error).message };
    }
  }, [state]);

  const value = useMemo(
    () => ({
      state,
      setField,
      currentIndex,
      currentScreenId: SCREENS[currentIndex]?.id ?? 1,
      progress: (currentIndex + 1) / TOTAL_SCREENS,
      totalScreens: TOTAL_SCREENS,
      next,
      prev,
      goTo,
      finalize,
      reset,
      submitEmail,
      resumeInfo,
      acceptResume,
      declineResume,
      hasCompletedResult,
      showCompletedResult,
      retakeQuiz,
      couponCode: null, // No coupon in kurumsal
    }),
    [
      state,
      setField,
      currentIndex,
      next,
      prev,
      goTo,
      finalize,
      reset,
      submitEmail,
      resumeInfo,
      acceptResume,
      declineResume,
      hasCompletedResult,
      showCompletedResult,
      retakeQuiz,
    ],
  );

  // Keyboard navigation
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      const tag = target?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [prev]);

  return <QuizCtx.Provider value={value}>{children}</QuizCtx.Provider>;
}
