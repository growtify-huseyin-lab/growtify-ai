// Conversion event helper. GA4: fires only if gtag is loaded (consent-gated
// GoogleAnalytics loads it after analytics consent). Meta: mapped events also go
// to fbq, which MetaPixel loads only after marketing consent. No-op on the server
// or before consent.
type GtagParams = Record<string, string | number | boolean | undefined>;

// GA4 event → Meta standard event. Unmapped events stay GA4-only.
const META_EVENTS: Record<string, string> = {
  lead_quiz: "Lead",
  lead_form: "Lead",
  lead_guide: "Lead",
  lead_contact: "Contact",
  begin_checkout: "InitiateCheckout",
};

// Only non-personal fields go to Meta.
function metaParams(params?: GtagParams): Record<string, string | number> {
  const out: Record<string, string | number> = {};
  if (typeof params?.value === "number") out.value = params.value;
  if (typeof params?.currency === "string") out.currency = params.currency;
  if (typeof params?.method === "string") out.content_name = params.method;
  return out;
}

export function trackEvent(name: string, params?: GtagParams): void {
  if (typeof window === "undefined") return;
  const w = window as unknown as {
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  };
  if (typeof w.gtag === "function") {
    w.gtag("event", name, params ?? {});
  }
  const metaEvent = META_EVENTS[name];
  if (metaEvent && typeof w.fbq === "function") {
    w.fbq("track", metaEvent, metaParams(params));
  }
}

// Community groups — used by the site-wide "Topluluğa Katıl" / "Join the
// Community" CTAs. TR → growtify-ai group, EN → en-growtify-ai group.
export const COMMUNITY_URL =
  "https://panel.growtify.ai/communities/groups/growtify-ai/";
export const EN_COMMUNITY_URL =
  "https://panel.growtify.ai/communities/groups/en-growtify-ai/";
