// Growtify AI — Cookie-based quiz paywall countdown.
// When the user reaches the paywall for the first time, we stamp a cookie
// with the expiry epoch. Subsequent visits within the window see the same
// countdown — not a fresh 15 minutes. After expiry the timer reads 0.
//
// Legal note: timer is real. No refresh trick. Cookie is first-party and
// cleared with the browser or via /test reset.

const COOKIE_NAME = "growtify_quiz_paywall_expiry";
const DURATION_MINUTES_DEFAULT = 60;

function isBrowser(): boolean {
  return typeof document !== "undefined";
}

function readCookie(name: string): string | null {
  if (!isBrowser()) return null;
  const match = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${name}=`));
  return match ? decodeURIComponent(match.split("=")[1]) : null;
}

function writeCookie(name: string, value: string, expiryMs: number): void {
  if (!isBrowser()) return;
  const expires = new Date(expiryMs).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/; SameSite=Lax`;
}

/**
 * Get (or set, on first call) the paywall expiry epoch. Returns the epoch
 * in ms when the discount offer expires. If the cookie is missing or stale,
 * a new window starts NOW + durationMinutes.
 */
export function getOrStartPaywallExpiry(
  durationMinutes: number = DURATION_MINUTES_DEFAULT,
): number {
  if (!isBrowser()) {
    return Date.now() + durationMinutes * 60_000;
  }
  const existing = readCookie(COOKIE_NAME);
  if (existing) {
    const parsed = parseInt(existing, 10);
    if (!Number.isNaN(parsed) && parsed > Date.now()) {
      return parsed;
    }
  }
  // Start a fresh window
  const expiry = Date.now() + durationMinutes * 60_000;
  writeCookie(COOKIE_NAME, String(expiry), expiry);
  return expiry;
}

export function getPaywallSecondsLeft(expiryMs: number): number {
  return Math.max(0, Math.floor((expiryMs - Date.now()) / 1000));
}

/** Test/reset helper — clears the cookie so a new window can start. */
export function resetPaywallExpiry(): void {
  if (!isBrowser()) return;
  document.cookie = `${COOKIE_NAME}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}
