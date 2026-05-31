// Growtify AI — Quiz Storage (localStorage persistence)
// Resumes unfinished quiz attempts + detects completed quizzes. SSR-safe.

import type { QuizState } from "./types";

const STORAGE_KEY = "growtify_quiz_v1";
const STORAGE_VERSION = 1;
const EXPIRY_DAYS = 30;
const EXPIRY_MS = EXPIRY_DAYS * 24 * 60 * 60 * 1000;

interface StoredSnapshot {
  version: number;
  savedAt: number; // epoch ms
  currentIndex: number;
  state: QuizState;
  /** True when the user reached the paywall (quiz completed). */
  completed?: boolean;
  /** Coupon code from GHL (persisted for returning users). */
  couponCode?: string;
}

function isBrowser(): boolean {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

/**
 * Read a previously-saved quiz attempt. Returns null if:
 *  - running on server (SSR)
 *  - no saved data
 *  - version mismatch (schema changed)
 *  - expired (>30 days old)
 *  - corrupt JSON
 */
export function loadQuizSnapshot(): StoredSnapshot | null {
  if (!isBrowser()) return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as StoredSnapshot;
    if (parsed.version !== STORAGE_VERSION) {
      window.localStorage.removeItem(STORAGE_KEY);
      return null;
    }
    if (Date.now() - parsed.savedAt > EXPIRY_MS) {
      window.localStorage.removeItem(STORAGE_KEY);
      return null;
    }
    if (typeof parsed.currentIndex !== "number" || !parsed.state) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function saveQuizSnapshot(
  currentIndex: number,
  state: QuizState,
  completed?: boolean,
): void {
  if (!isBrowser()) return;
  try {
    // Preserve the existing completed flag if not explicitly overridden
    const existing = window.localStorage.getItem(STORAGE_KEY);
    const parsed = existing ? (JSON.parse(existing) as StoredSnapshot) : null;
    const snapshot: StoredSnapshot = {
      version: STORAGE_VERSION,
      savedAt: Date.now(),
      currentIndex,
      state,
      completed: completed ?? parsed?.completed ?? false,
      couponCode: parsed?.couponCode,
    };
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(snapshot));
  } catch {
    // Quota exceeded or private mode — silently ignore.
  }
}

export function clearQuizSnapshot(): void {
  if (!isBrowser()) return;
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore
  }
}

export function hasResumableSnapshot(): boolean {
  const snap = loadQuizSnapshot();
  return (
    snap !== null &&
    snap.currentIndex > 0 &&
    snap.currentIndex < 36 &&
    !snap.completed
  );
}

/** Save coupon code to the snapshot. */
export function saveCouponToSnapshot(code: string): void {
  if (!isBrowser()) return;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    const snap = JSON.parse(raw) as StoredSnapshot;
    snap.couponCode = code;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(snap));
  } catch {
    // ignore
  }
}

/** Get coupon code from snapshot. */
export function loadCouponFromSnapshot(): string | null {
  const snap = loadQuizSnapshot();
  return snap?.couponCode ?? null;
}

/** Mark the current snapshot as completed (quiz reached paywall). */
export function markQuizCompleted(): void {
  if (!isBrowser()) return;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    const snap = JSON.parse(raw) as StoredSnapshot;
    snap.completed = true;
    snap.savedAt = Date.now();
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(snap));
  } catch {
    // ignore
  }
}

/** Check if a completed quiz result exists. */
export function hasCompletedQuiz(): boolean {
  const snap = loadQuizSnapshot();
  return snap !== null && snap.completed === true;
}

/** Load a completed quiz's state (for "Sonucun hazır" screen). */
export function loadCompletedQuizState(): QuizState | null {
  const snap = loadQuizSnapshot();
  if (!snap?.completed) return null;
  return snap.state;
}
