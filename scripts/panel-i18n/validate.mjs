// Validates a Turkish translation batch against its English source batch.
// Usage: npm i --no-save @intlify/message-compiler && node scripts/panel-i18n/validate.mjs <en.json> <tr.json>
// (düz "a.b.c": "metin" dosyaları; diff-catalog.mjs çıktısı ve onun çevirisi)
// Exit code 1 when there are ERRORS. WARNINGS are advisory.
import fs from "fs";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const { baseCompile } = require("@intlify/message-compiler");

const [, , enPath, trPath] = process.argv;
const en = JSON.parse(fs.readFileSync(enPath, "utf8"));
let tr;
try {
  tr = JSON.parse(fs.readFileSync(trPath, "utf8"));
} catch (e) {
  console.log("ERROR: output is not valid JSON: " + e.message);
  process.exit(1);
}

const errors = [];
const warns = [];
const enKeys = Object.keys(en);
const missing = enKeys.filter((k) => !(k in tr));
const extra = Object.keys(tr).filter((k) => !(k in en));
if (missing.length) errors.push(`missing keys (${missing.length}): ${missing.slice(0, 15).join(", ")}`);
if (extra.length) errors.push(`extra keys (${extra.length}): ${extra.slice(0, 15).join(", ")}`);

// split on plural pipes that are outside {...}
function splitPlural(s) {
  const parts = [];
  let depth = 0, cur = "";
  for (const ch of s) {
    if (ch === "{") depth++;
    if (ch === "}") depth = Math.max(0, depth - 1);
    if (ch === "|" && depth === 0) { parts.push(cur); cur = ""; continue; }
    cur += ch;
  }
  parts.push(cur);
  return parts;
}
const placeholders = (s) => (s.match(/\{[^{}]*\}/g) || []).slice().sort();
const outsideBraces = (s) => s.replace(/\{[^{}]*\}/g, "");
const DROPPABLE = /^\{(s|es|plural|pluralSuffix|suffix)\}$/;

const ALLOW_SAME = /^(GIF|URL|PDF|CSV|ID|API|Stripe|PayPal|Google|Zoom|Skool|Emoji|OK|Email|E-mail|Video|Logo|Online|Offline|Admin|Quiz|Feed|Chat|Link|Banner|Hashtag|PNG|JPG|JPEG|SVG|MP4|MB|KB|GB|HTML|CSS|JS|iOS|Android|Apple|Facebook|Instagram|LinkedIn|X|YouTube|TikTok|WhatsApp|Discord|Slack|Telegram|Twitter|Vimeo|Loom|Wistia|Calendly|HighLevel|Growtify|SMS|OTP|2FA|FAQ|N\/A|AM|PM|UTC|GMT|[A-Z]{2,4}|[\d\s.,:%+\-\/()]+)$/;
const EN_WORDS = /\b(the|your|you|to|for|with|and|of|is|are|will|here|this|that|from|have|has|we|our|they|their|what|when|where|which|how|yet|only|into|any|all|my|no|not|new|view|show|hide|post|posts|comment|comments|like|likes|share|search|sort|default|member|members|join|settings|account|profile|course|courses|lesson|lessons|start|continue|next|previous|back|save|cancel|delete|edit|remove|add|create|upload|download|open|close|select|filter|reset|apply|submit|send|message|messages|notification|notifications|today|week|month|upcoming|past|book|loading|complete|completed|progress|enrolled|total|private|public|channel|channels|group|groups|community|communities|admins|owner|leaderboard|level|points|events|calendar|about|home|newest|oldest|unread|read|mark|pin|pinned|title|description|required|enter|email|password|name|phone|country|language|time|zone|none|empty|found|results|items|page|showing|sent|date|range|please|invalid|error|something|went|wrong|successfully|failed|unable|try|again)\b/i;
const SUFFIX_ON_PH = /\}['’]?(?:ın|in|un|ün|nın|nin|nun|nün|ı|i|u|ü|a|e|ya|ye|da|de|ta|te|dan|den|tan|ten|la|le|yla|yle|lar|ler)(?![\p{L}])/u;

for (const k of enKeys) {
  if (!(k in tr)) continue;
  const s = en[k];
  const t = tr[k];
  if (typeof t !== "string") { errors.push(`${k}: value is not a string`); continue; }
  if (s.trim() !== "" && t.trim() === "") { errors.push(`${k}: empty translation`); continue; }

  const sv = splitPlural(s), tv = splitPlural(t);
  if (sv.length !== tv.length) {
    errors.push(`${k}: plural variant count ${tv.length} != source ${sv.length}  | src: ${s}  | tr: ${t}`);
  } else {
    for (let i = 0; i < sv.length; i++) {
      // English plural-suffix placeholders ({s}, {plural}…) carry an English ending — Turkish drops them.
      const a = placeholders(sv[i]).filter((p) => !(DROPPABLE.test(p) && !tv[i].includes(p))).join(" "), b = placeholders(tv[i]).join(" ");
      if (a !== b) errors.push(`${k}: placeholders differ in variant ${i + 1}: source [${a}] vs tr [${b}]  | tr: ${t}`);
    }
  }
  const tOut = outsideBraces(t);
  for (const ch of ["@", "$", "{", "}"]) {
    const sc = (outsideBraces(s).split(ch).length - 1), tc = (tOut.split(ch).length - 1);
    if (tc > sc) errors.push(`${k}: raw '${ch}' not allowed outside placeholders (use {'@'} for @)  | tr: ${t}`);
  }
  if (/^\s/.test(s) !== /^\s/.test(t)) errors.push(`${k}: leading whitespace must match source  | src: ${JSON.stringify(s)} | tr: ${JSON.stringify(t)}`);
  if (/\s$/.test(s) !== /\s$/.test(t)) errors.push(`${k}: trailing whitespace must match source  | src: ${JSON.stringify(s)} | tr: ${JSON.stringify(t)}`);

  const ce = [];
  try { baseCompile(t, { onError: (e) => ce.push(e.message) }); } catch (e) { ce.push(String(e.message || e)); }
  if (ce.length) errors.push(`${k}: vue-i18n compile error: ${ce.join("; ")}  | tr: ${t}`);

  if (t === s && /[A-Za-z]{3,}/.test(s) && !ALLOW_SAME.test(s.trim())) warns.push(`${k}: identical to English — untranslated?  | ${s}`);
  else if (EN_WORDS.test(outsideBraces(t)) && t !== s) {
    const m = outsideBraces(t).match(EN_WORDS);
    warns.push(`${k}: English word '${m[0]}' left in translation  | tr: ${t}`);
  }
  if (SUFFIX_ON_PH.test(t)) warns.push(`${k}: Turkish suffix attached to a placeholder (vowel harmony risk) — rephrase  | tr: ${t}`);
  if (t.length > s.length * 3 + 25) warns.push(`${k}: translation is much longer than source (${t.length} vs ${s.length})`);
}

console.log(`keys: ${enKeys.length}  translated: ${enKeys.length - missing.length}  errors: ${errors.length}  warnings: ${warns.length}`);
if (errors.length) { console.log("\nERRORS:"); errors.slice(0, 80).forEach((e) => console.log("  - " + e)); if (errors.length > 80) console.log(`  … +${errors.length - 80} more`); }
if (warns.length) { console.log("\nWARNINGS:"); warns.slice(0, 80).forEach((w) => console.log("  - " + w)); if (warns.length > 80) console.log(`  … +${warns.length - 80} more`); }
process.exit(errors.length ? 1 : 0);
