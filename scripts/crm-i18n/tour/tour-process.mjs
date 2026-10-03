// Tıklamalı turun günlüğünü işler (tour-log.json: {s, caps, inst}).
// Usage: node tour-process.mjs tour-log.json
// Çıktı: tour.mapped.json (katalogdaki karşılığıyla eşlenen), tour.unmapped.json (çevrilecek), tour.caps.json, özet.
import fs from "fs";
const SRC = new URL("../source/", import.meta.url).pathname;
const j = (f) => JSON.parse(fs.readFileSync(f, "utf8"));
const log = j(process.argv[2] || "tour-log.json");
const domText = j(SRC + "dom-text.json");
const rules = j(SRC + "dom-rules.json").map(([p, t]) => [new RegExp(p), t]);
const tr = j(SRC + "crm-tr.flat.json");
const en = j(SRC + "crm-en.flat.json");
const CAPS = /([çğıöşü])([A-Z])(?![A-ZÇĞİÖŞÜ])/g;
const fixCaps = (s) => s.replace(CAPS, (m, a, b) => a + b.toLowerCase());
const KEEP = /^(CRM Phone Pro Suite( icon)?|Conversation AI|Voice AI|Reviews AI|Content AI|Calendar AI|Agent Studio|LC Phone|LC Email|Google( Ads| Analytics| Business Profile)?|Facebook( Ads)?|Instagram|WhatsApp|Stripe|PayPal|Zoom|QuickBooks|Gmail|Outlook|Not|SMS|MMS|Beta|Webinar|LinkedIn|TikTok|YouTube|Yelp|Shopify|WooCommerce|Zapier|Slack|HubSpot|Salesforce|OpenAI|ChatGPT|Gemini|Claude|Twilio|Mailgun|Apple|Microsoft|iOS|Android|API|URL|CSV|PDF|ID|AI|SEO|CRM|UTM|DNS|SSL|HTML|CSS|JSON|SMTP|OK|N\/A|USD|EUR|GBP|TRY|Default|Pro|Plus|Free|Basic|Premium|Enterprise|Starter)$/;
const trValues = new Set(Object.values(tr).filter((v) => typeof v === "string"));
const byEn = {};
for (const [k, e] of Object.entries(en)) {
  const t = tr[k];
  if (typeof e !== "string" || typeof t !== "string" || t === e || /[{}]/.test(e)) continue;
  (byEn[e] = byEn[e] || {})[t] = (byEn[e][t] || 0) + 1;
}
const ruleHit = (s) => rules.some(([re]) => re.test(s));
const out = { turkish: [], covered: [], kept: [], mapped: {}, unmapped: [] };
for (const [s, v] of Object.entries(log.s || {})) {
  if (trValues.has(s) && !byEn[s]) { out.turkish.push(s); continue; } // aslında Türkçe (ör. "Not", "Form")
  if (domText[s] !== undefined || ruleHit(s)) { out.covered.push(s); continue; }
  if (KEEP.test(s)) { out.kept.push(s); continue; }
  const c = byEn[s] || byEn[s.charAt(0).toUpperCase() + s.slice(1)];
  if (c) {
    let best = Object.entries(c).sort((a, b) => b[1] - a[1])[0][0];
    if (s.charAt(0) === s.charAt(0).toLowerCase() && !byEn[s]) best = best.charAt(0).toLocaleLowerCase("tr") + best.slice(1);
    out.mapped[s] = best;
  } else out.unmapped.push({ s, k: v.k, p: v.p.split("/").slice(4, 8).join("/") });
}
const caps = Object.entries(log.caps || {}).map(([s, v]) => ({ s, fixed: fixCaps(s), p: v.p.split("/").slice(4, 8).join("/") }));
fs.writeFileSync("tour.mapped.json", JSON.stringify(out.mapped, null, 1));
fs.writeFileSync("tour.unmapped.json", JSON.stringify(out.unmapped, null, 1));
fs.writeFileSync("tour.caps.json", JSON.stringify(caps, null, 1));
console.log(JSON.stringify({
  total: Object.keys(log.s || {}).length, turkish: out.turkish.length, covered: out.covered.length, kept: out.kept.length,
  mapped: Object.keys(out.mapped).length, unmapped: out.unmapped.length, caps: caps.length,
  instances: Object.entries(log.inst || {}).map(([k, v]) => `${v.n}:${v.known || "NEW"}:${v.root}:${v.p.split("/").slice(4).join("/")}${v.saved ? ":saved" : ""}`),
}, null, 1));
