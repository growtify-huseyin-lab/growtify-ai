// Growtify AI — Kurumsal Quiz Storage (localStorage persistence)
// Separate key from bireysel quiz to avoid conflicts.

import type { KurumsalQuizState } from "./types-kurumsal";

const STORAGE_KEY = "growtify_kurumsal_quiz_v1";
const STORAGE_VERSION = 1;
const EXPIRY_DAYS = 30;
const EXPIRY_MS = EXPIRY_DAYS * 24 * 60 * 60 * 1000;

interface StoredSnapshot {
  version: number;
  savedAt: number;
  currentIndex: number;
  state: KurumsalQuizState;
  completed?: boolean;
}

function isBrowser(): boolean {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

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
  state: KurumsalQuizState,
  completed?: boolean,
): void {
  if (!isBrowser()) return;
  try {
    const existing = window.localStorage.getItem(STORAGE_KEY);
    const existingCompleted = existing
      ? (JSON.parse(existing) as StoredSnapshot).completed
      : false;
    const snapshot: StoredSnapshot = {
      version: STORAGE_VERSION,
      savedAt: Date.now(),
      currentIndex,
      state,
      completed: completed ?? existingCompleted ?? false,
    };
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(snapshot));
  } catch {
    // Quota exceeded — ignore
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
