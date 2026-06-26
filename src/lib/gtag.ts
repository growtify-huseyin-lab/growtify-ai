// GA4 event helper. Fires only if gtag is loaded (consent-gated GoogleAnalytics
// loads it after analytics consent). No-op on the server or before consent.
type GtagParams = Record<string, string | number | boolean | undefined>;

export function trackEvent(name: string, params?: GtagParams): void {
  if (typeof window === "undefined") return;
  const w = window as unknown as { gtag?: (...args: unknown[]) => void };
  if (typeof w.gtag === "function") {
    w.gtag("event", name, params ?? {});
  }
}

// Community groups — used by the site-wide "Topluluğa Katıl" / "Join the
// Community" CTAs. TR → growtify-ai group, EN → en-growtify-ai group.
export const COMMUNITY_URL =
  "https://panel.growtify.ai/communities/groups/growtify-ai/";
export const EN_COMMUNITY_URL =
  "https://panel.growtify.ai/communities/groups/en-growtify-ai/";
