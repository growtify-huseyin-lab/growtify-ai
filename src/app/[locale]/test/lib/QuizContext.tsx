"use client";

import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { initialQuizState, type QuizState } from "./types";
import { SCREENS, TOTAL_SCREENS } from "./content-runtime";
import { computeResults, pickDiscount } from "./scoring";
import {
  clearQuizSnapshot,
  loadQuizSnapshot,
  loadCouponFromSnapshot,
  markQuizCompleted,
  saveCouponToSnapshot,
  saveQuizSnapshot,
} from "./quiz-storage";
import { QuizCtx } from "./quiz-context-core";
import type { QuizContextValue } from "./quiz-context-core";

export { useQuiz } from "./quiz-context-core";
export type { QuizContextValue } from "./quiz-context-core";

interface ResumeInfo {
  screenId: number;
  currentIndex: number;
  savedAt: number;
}

export function QuizProvider({ children }: { children: React.ReactNode }) {
  // Initial state ALWAYS matches server render (empty quiz, index 0, no
  // resume modal). We defer localStorage access to a useEffect below so
  // SSR/CSR outputs stay identical and hydration succeeds.
  const [state, setState] = useState<QuizState>(initialQuizState);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [resumeInfo, setResumeInfo] = useState<ResumeInfo | null>(null);
  const [hasCompletedResult, setHasCompletedResult] = useState(false);
  const [couponCode, setCouponCode] = useState<string | null>(null);
  const [hydrated, setHydrated] = useState(false);
  const pendingSnapshotRef = useRef<{
    state: QuizState;
    currentIndex: number;
  } | null>(null);

  /* -------------------- Post-mount snapshot load -------------------- */
  // Runs only on the client, after hydration completes. Safely reads
  // localStorage and surfaces a resume prompt if a valid snapshot exists.
  useEffect(() => {
    const snap = loadQuizSnapshot();
    if (snap?.completed) {
      setState(snap.state);
      setCurrentIndex(TOTAL_SCREENS - 1);
      setHasCompletedResult(true);
      // Restore coupon code from storage
      const savedCoupon = loadCouponFromSnapshot();
      if (savedCoupon) setCouponCode(savedCoupon);
    } else if (
      snap &&
      snap.currentIndex > 0 &&
      snap.currentIndex < TOTAL_SCREENS - 1
    ) {
      // Unfinished quiz — offer resume
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

  /* -------------------- Persist on every change -------------------- */
  // Skip persisting: (a) before hydration (nothing to save yet), and
  // (b) while the resume modal is visible (user hasn't decided yet).
  useEffect(() => {
    if (!hydrated || resumeInfo) return;
    saveQuizSnapshot(currentIndex, state);
  }, [state, currentIndex, resumeInfo, hydrated]);

  /* -------------------- Actions -------------------- */
  const setField = useCallback(
    (key: string, value: unknown) => {
      setState((prev) => ({ ...prev, [key]: value }));
    },
    [],
  );

  const next = useCallback(() => {
    setCurrentIndex((i) => {
      const nextIdx = Math.min(i + 1, TOTAL_SCREENS - 1);
      // Mark quiz completed when reaching paywall — keeps state for returning users
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
      const discount = prev.discount || pickDiscount();
      const results = computeResults({ ...prev, discount });
      return { ...prev, ...results };
    });
  }, []);

  const reset = useCallback(() => {
    clearQuizSnapshot();
    setState(initialQuizState);
    setCurrentIndex(0);
    setResumeInfo(null);
    pendingSnapshotRef.current = null;
  }, []);

  /* -------------------- Completed result flow -------------------- */
  const showCompletedResult = useCallback(() => {
    // State + index already loaded in hydration effect — just dismiss modal
    setHasCompletedResult(false);
  }, []);

  const retakeQuiz = useCallback(() => {
    clearQuizSnapshot();
    pendingSnapshotRef.current = null;
    setState(initialQuizState);
    setCurrentIndex(0);
    setHasCompletedResult(false);
  }, []);

  /* -------------------- Resume flow -------------------- */
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

  const submitEmail = useCallback(async () => {
    try {
      const res = await fetch("/test/api/submit-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(state),
      });
      if (!res.ok) {
        return { ok: false, error: `HTTP ${res.status}` };
      }
      const json = await res.json();
      if (json.couponCode) {
        setCouponCode(json.couponCode);
        saveCouponToSnapshot(json.couponCode);
      }
      return { ok: true, couponCode: json.couponCode };
    } catch (err) {
      return { ok: false, error: (err as Error).message };
    }
  }, [state]);

  const value = useMemo<QuizContextValue>(
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
      couponCode,
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
      couponCode,
    ],
  );

  // Keyboard navigation — ArrowLeft goes back.
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
