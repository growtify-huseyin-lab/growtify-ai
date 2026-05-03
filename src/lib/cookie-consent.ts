/**
 * Cookie Consent Management — GDPR / UK GDPR / KVKK / CCPA compliant
 *
 * Granular consent categories:
 * - necessary: always on (session, security, CSRF)
 * - analytics: opt-in (GA4, Vercel Analytics)
 * - marketing: opt-in (Meta Pixel, Google Ads remarketing)
 * - functional: opt-in (preferences, language)
 *
 * Storage: localStorage (1-year persistence)
 * Versioning: bump CONSENT_VERSION when categories change → re-prompt
 */

export type ConsentCategory =
  | "necessary"
  | "analytics"
  | "marketing"
  | "functional";

export type ConsentState = {
  necessary: true; // always on
  analytics: boolean;
  marketing: boolean;
  functional: boolean;
};

export type ConsentRecord = {
  version: number;
  state: ConsentState;
  decided_at: string; // ISO datetime
  method: "accept_all" | "reject_all" | "custom" | "gpc"; // GPC = Global Privacy Control
};

export const CONSENT_VERSION = 1;
export const CONSENT_STORAGE_KEY = "growtify_cookie_consent_v1";

export const DEFAULT_CONSENT: ConsentState = {
  necessary: true,
  analytics: false,
  marketing: false,
  functional: false,
};

export const FULL_CONSENT: ConsentState = {
  necessary: true,
  analytics: true,
  marketing: true,
  functional: true,
};

export const CATEGORY_INFO: Record<
  ConsentCategory,
  { label: string; description: string; required: boolean }
> = {
  necessary: {
    label: "Gerekli",
    description:
      "Sitenin temel çalışması için zorunlu çerezler (oturum, güvenlik, CSRF koruması). Bu çerezler reddedilemez.",
    required: true,
  },
  analytics: {
    label: "Analitik",
    description:
      "Site kullanım istatistiklerini anonim olarak ölçen çerezler (sayfa görüntüleme, trafik kaynağı). Hizmeti iyileştirmemize yardımcı olur.",
    required: false,
  },
  marketing: {
    label: "Pazarlama",
    description:
      "Reklam hedefleme ve yeniden pazarlama için kullanılan çerezler (Meta Pixel, Google Ads). Kapatırsan ilgisiz reklamlar görebilirsin.",
    required: false,
  },
  functional: {
    label: "Fonksiyonel",
    description:
      "Tercih ve kişiselleştirme çerezleri (dil seçimi, tema). Sitenin sana özel davranmasını sağlar.",
    required: false,
  },
};

/**
 * Check if user has made a consent decision (regardless of choice).
 */
export function hasDecidedConsent(): boolean {
  if (typeof window === "undefined") return true; // SSR: assume decided
  try {
    const raw = localStorage.getItem(CONSENT_STORAGE_KEY);
    if (!raw) return false;
    const parsed = JSON.parse(raw) as ConsentRecord;
    return parsed.version === CONSENT_VERSION;
  } catch {
    return false;
  }
}

/**
 * Get current consent state. Returns DEFAULT_CONSENT if not decided.
 */
export function getConsent(): ConsentState {
  if (typeof window === "undefined") return DEFAULT_CONSENT;
  try {
    const raw = localStorage.getItem(CONSENT_STORAGE_KEY);
    if (!raw) return DEFAULT_CONSENT;
    const parsed = JSON.parse(raw) as ConsentRecord;
    if (parsed.version !== CONSENT_VERSION) return DEFAULT_CONSENT;
    return parsed.state;
  } catch {
    return DEFAULT_CONSENT;
  }
}

/**
 * Save consent decision. Triggers consent_changed event for listeners.
 */
export function saveConsent(
  state: ConsentState,
  method: ConsentRecord["method"],
): void {
  if (typeof window === "undefined") return;
  const record: ConsentRecord = {
    version: CONSENT_VERSION,
    state: { ...state, necessary: true },
    decided_at: new Date().toISOString(),
    method,
  };
  try {
    localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(record));
    window.dispatchEvent(
      new CustomEvent("growtify:consent_changed", { detail: record }),
    );
  } catch {
    // localStorage unavailable; silently fail (privacy mode etc.)
  }
}

/**
 * Check if specific category has consent. Use before loading tracking scripts.
 */
export function hasConsent(category: ConsentCategory): boolean {
  return getConsent()[category];
}

/**
 * Check Global Privacy Control browser signal (CCPA opt-out signal).
 * If true, automatically reject marketing + analytics cookies.
 */
export function hasGlobalPrivacyControl(): boolean {
  if (typeof window === "undefined") return false;
  // @ts-expect-error — globalPrivacyControl is non-standard but widely implemented
  return window.navigator?.globalPrivacyControl === true;
}

/**
 * Reset consent (re-prompt user).
 */
export function resetConsent(): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(CONSENT_STORAGE_KEY);
    window.dispatchEvent(new CustomEvent("growtify:consent_reset"));
  } catch {
    // ignore
  }
}
