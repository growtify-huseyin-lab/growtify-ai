// Growtify AI — campaign attribution for quiz leads.
//
// Client: the landing URL's UTM params are kept in memory for the tab's
// lifetime (survives client-side navigation, e.g. blog → /test). Nothing is
// written to cookies or localStorage, so no consent is needed.
// Server: sanitises what the client sends and maps it to the same GHL fields
// and gai_src_* tags that /api/lead/submit uses.

export interface Attribution {
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
}

const MAX_LEN = 120;

function clean(value: unknown): string | undefined {
  if (typeof value !== "string") return undefined;
  const v = value.replace(/[\u0000-\u001f\u007f]/g, "").trim().slice(0, MAX_LEN);
  return v || undefined;
}

function fromSearch(search: string): Attribution | undefined {
  const p = new URLSearchParams(search);
  const attr: Attribution = {
    utmSource: clean(p.get("utm_source")),
    utmMedium: clean(p.get("utm_medium")),
    utmCampaign: clean(p.get("utm_campaign")),
  };
  return attr.utmSource || attr.utmMedium || attr.utmCampaign ? attr : undefined;
}

/* ------------------------------- client ---------------------------------- */

let captured: Attribution | undefined;

/** Call on landing (root layout). Keeps the latest UTM-tagged landing in memory. */
export function captureAttribution(): void {
  if (typeof window === "undefined") return;
  captured = fromSearch(window.location.search) ?? captured;
}

/** For quiz submit: current URL first, then what was captured on landing. */
export function getAttribution(): Attribution | undefined {
  if (typeof window === "undefined") return undefined;
  return fromSearch(window.location.search) ?? captured;
}

/* ------------------------------- server ---------------------------------- */

// Same GHL custom fields as /api/lead/submit (language-agnostic)
const FIELD_FIRST_UTM_SOURCE = "GGDUtGyBC9k4FDQU5AYg";
const FIELD_FIRST_UTM_CAMPAIGN = "RmJaQvw2C7ewgDF6ufR1";

// Same UTM → source tag mapping as /api/lead/submit
const UTM_ORGANIC: Record<string, string> = {
  linkedin: "gai_src_organic_linkedin",
  instagram: "gai_src_organic_instagram",
  youtube: "gai_src_organic_youtube",
  blog: "gai_src_organic_blog",
  facebook: "gai_src_organic_facebook",
  tiktok: "gai_src_organic_tiktok",
  twitter: "gai_src_organic_x",
  x: "gai_src_organic_x",
};

const UTM_PAID: Record<string, string> = {
  linkedin: "gai_src_paid_linkedin",
  meta: "gai_src_paid_meta",
  facebook: "gai_src_paid_meta",
  instagram: "gai_src_paid_meta",
  google: "gai_src_paid_google",
};

function isPaid(medium: string): boolean {
  return ["cpc", "ads", "paid", "ppc", "cpm"].includes(medium.toLowerCase());
}

/** Validate the `attribution` object a client sent. Unknown shapes → undefined. */
export function parseAttribution(raw: unknown): Attribution | undefined {
  if (!raw || typeof raw !== "object") return undefined;
  const r = raw as Record<string, unknown>;
  const attr: Attribution = {
    utmSource: clean(r.utmSource),
    utmMedium: clean(r.utmMedium),
    utmCampaign: clean(r.utmCampaign),
  };
  return attr.utmSource || attr.utmMedium || attr.utmCampaign ? attr : undefined;
}

/** gai_src_* tag — no UTM means gai_src_direct, as in /api/lead/submit. */
export function sourceTag(attr?: Attribution): string {
  const s = (attr?.utmSource ?? "").toLowerCase();
  if (isPaid(attr?.utmMedium ?? "") && UTM_PAID[s]) return UTM_PAID[s];
  return UTM_ORGANIC[s] ?? "gai_src_direct";
}

/** UTM custom fields, only for values that exist (never blanks an existing value). */
export function utmCustomFields(attr?: Attribution): { id: string; value: string }[] {
  return [
    ...(attr?.utmSource ? [{ id: FIELD_FIRST_UTM_SOURCE, value: attr.utmSource }] : []),
    ...(attr?.utmCampaign ? [{ id: FIELD_FIRST_UTM_CAMPAIGN, value: attr.utmCampaign }] : []),
  ];
}
