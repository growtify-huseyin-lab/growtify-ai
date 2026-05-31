"use client";

// Shared React context + hook used by BOTH bireysel and kurumsal quiz providers.
// Screen components import useQuiz from QuizContext.tsx which re-exports from here.
// This allows kurumsal's QuizProvider to feed the same context object.

import { createContext, useContext } from "react";

export interface QuizContextValue {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  state: any;
  setField: (key: string, value: unknown) => void;
  currentIndex: number;
  currentScreenId: number;
  progress: number;
  totalScreens: number;
  next: () => void;
  prev: () => void;
  goTo: (screenId: number) => void;
  finalize: () => void;
  reset: () => void;
  submitEmail: () => Promise<{ ok: boolean; error?: string; couponCode?: string }>;
  couponCode: string | null;
  resumeInfo: { screenId: number; currentIndex: number; savedAt: number } | null;
  acceptResume: () => void;
  declineResume: () => void;
  hasCompletedResult: boolean;
  showCompletedResult: () => void;
  retakeQuiz: () => void;
}

export const QuizCtx = createContext<QuizContextValue | null>(null);

export function useQuiz(): QuizContextValue {
  const ctx = useContext(QuizCtx);
  if (!ctx) throw new Error("useQuiz must be used inside a QuizProvider");
  return ctx;
}
