// G1 / DeepGap — push result back to the GHL contact (server-only).
// We already know contactId from the verified token, so we PUT custom fields
// directly (no upsert-by-email). Mirrors the pattern in test/lib/ghl-client.ts.
import type { G1Result, G1Synthesis } from "./types";

// Real GHL custom field IDs — created by ghl-specialist 2026-06-17 in location
// e8ZRRmOybS08x5L6qgsS. The entry field g1_token (id i1XhsXamXfpwdRPFoOjB) is
// written by the GHL mint workflow, not here. `attempt` is reserved for the
// G-start vs T-end retake/before-after (wired once attempt tracking lands).
export const G1_FIELD_IDS: Record<string, string> = {
  overall: "ajExQLuHZZymYZjioycd",
  deployment: "KLNO7RDJqofZ1jGDbJtf",
  systems: "N9WCpugkDASJD3WTj979",
  data: "V7Q6mfKLyx9XszMLJRQp",
  outcomes: "HAoPIXdmIJIAzPZ5ZaGJ",
  people: "Cr9rhYnlbUYY86tezhty",
  governance: "pTXt2TLfXZ3S05d4xD7X",
  archetype: "azehwJGTC6cnVnRh6M9P",
  gapSummary: "B7sVkI189pAkLb3YcgX3",
  completedAt: "liaSle4fkrw2TUV1KqJ1",
  attempt: "5Ue1jUHNys3n7cj501un",
};

// Creative's 6 dimensions -> the 6 existing GHL field slots (labels are legacy;
// values are the correct dimension scores). Rename the GHL fields later for clarity.
const DIM_TO_FIELD: Record<string, string> = {
  d_depth: "deployment",
  d_integration: "systems",
  d_data: "data",
  d_measure: "outcomes",
  d_adoption: "people",
  d_trust: "governance",
};

const G1_COMPLETED_TAG = "g1_completed";

interface GhlConfig {
  apiToken: string;
  locationId: string;
  apiBase: string;
  apiVersion: string;
}

function readConfig(): GhlConfig | null {
  const apiToken = process.env.GHL_API_TOKEN;
  const locationId = process.env.GHL_LOCATION_ID;
  const apiBase = process.env.GHL_API_BASE ?? "https://services.leadconnectorhq.com";
  const apiVersion = process.env.GHL_API_VERSION ?? "2021-07-28";
  if (!apiToken || !locationId) return null;
  return { apiToken, locationId, apiBase, apiVersion };
}

export interface G1ContactLookup {
  found: boolean;
  firstName?: string;
  fullName?: string;
  email?: string;
  error?: string;
}

/**
 * Resolve a contact by id (the verified Firebase `sub`). Used by /g1 to show the
 * member their own name/email (so they can see the test opened as them) and to
 * confirm `sub === GHL contactId` — if the contact is found, the identity binding
 * is correct; a 404 means `sub` is not a contactId and we'd need an email mapping.
 */
export async function getG1Contact(contactId: string): Promise<G1ContactLookup> {
  const cfg = readConfig();
  if (!cfg) return { found: false, error: "ghl_credentials_missing" };
  try {
    const res = await fetch(`${cfg.apiBase}/contacts/${contactId}`, {
      headers: {
        Authorization: `Bearer ${cfg.apiToken}`,
        Version: cfg.apiVersion,
        Accept: "application/json",
      },
      signal: AbortSignal.timeout(8000),
    });
    if (res.status === 404) return { found: false, error: "not_found" };
    if (!res.ok) return { found: false, error: `HTTP ${res.status}` };
    const body = (await res.json().catch(() => ({}))) as {
      contact?: { firstName?: string; lastName?: string; name?: string; email?: string };
    };
    const c = body.contact;
    if (!c) return { found: false, error: "no_contact" };
    const fullName = c.name || [c.firstName, c.lastName].filter(Boolean).join(" ");
    return { found: true, firstName: c.firstName, fullName, email: c.email };
  } catch (err) {
    return { found: false, error: (err as Error).message };
  }
}

function buildGapSummary(result: G1Result): string {
  const weak = result.dimensions.find((d) => d.id === result.weakest);
  const strong = result.dimensions.find((d) => d.id === result.strongest);
  return [
    `Profil: ${result.levelLabel} (genel ${result.overall}/5).`,
    strong ? `En güçlü: ${strong.label} ${strong.score}/5.` : "",
    weak ? `En zayıf: ${weak.label} ${weak.score}/5.` : "",
  ]
    .filter(Boolean)
    .join(" ");
}

function buildCustomFields(
  result: G1Result,
): Array<{ id: string; value: string | number }> {
  const fields: Array<{ id: string; value: string | number }> = [];
  const push = (key: string, value: string | number) => {
    const id = G1_FIELD_IDS[key];
    if (id && !id.startsWith("REPLACE_")) fields.push({ id, value });
  };
  push("overall", result.overall);
  push("archetype", result.levelLabel);
  push("gapSummary", buildGapSummary(result));
  push("completedAt", result.completedAt);
  for (const d of result.dimensions) {
    const fieldKey = DIM_TO_FIELD[d.id];
    if (fieldKey) push(fieldKey, d.score);
  }
  return fields;
}

export interface G1WritebackResult {
  ok: boolean;
  wrote: number; // number of fields written (0 if placeholders still in place)
  error?: string;
}

export async function saveG1ResultToContact(
  contactId: string,
  result: G1Result,
): Promise<G1WritebackResult> {
  const cfg = readConfig();
  if (!cfg) return { ok: false, wrote: 0, error: "GHL credentials missing" };

  const customFields = buildCustomFields(result);
  if (customFields.length === 0) {
    // Field ids not configured yet — don't error, just signal nothing written.
    return { ok: true, wrote: 0, error: "g1_field_ids_not_configured" };
  }

  try {
    const res = await fetch(`${cfg.apiBase}/contacts/${contactId}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${cfg.apiToken}`,
        Version: cfg.apiVersion,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ customFields }),
      signal: AbortSignal.timeout(15000),
    });
    if (!res.ok) {
      return { ok: false, wrote: 0, error: `HTTP ${res.status}` };
    }
    // Best-effort tag so GHL workflows can react (unlock next lesson, send email).
    await addTag(cfg, contactId, G1_COMPLETED_TAG).catch(() => undefined);
    return { ok: true, wrote: customFields.length };
  } catch (err) {
    return { ok: false, wrote: 0, error: (err as Error).message };
  }
}

/* --------------------------- result email (like /test) -------------------- */
// Mirrors test/lib/ghl-client.ts sendQuizReportEmail: app sends a rich HTML
// result email via GHL conversations/messages (type:"Email"). No PDF — the body
// IS the result (profile + gap + weakest + first move + cost) with a link back
// to /g1 to re-open. Best-effort; never blocks the user's on-screen result.
const G1_VIEW_URL = "https://growtify.ai/g1";
const PRIMARY = "#5d47f0";

function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function buildG1EmailHtml(firstName: string, synth: G1Synthesis): string {
  const ad = firstName ? esc(firstName) : "Merhaba";
  const w = synth.weakest;
  const costBlock = synth.cost
    ? `<div style="margin:22px 0;padding:16px 18px;background:#fff7ed;border-radius:12px;border:1px solid #fed7aa">
         <div style="font-weight:700;color:#9a3412;margin-bottom:8px">Hareketsizliğin Bedeli</div>
         <div style="color:#7c2d12;font-size:14px;margin-bottom:8px">${esc(synth.cost.intro)}</div>
         <ul style="margin:0;padding-left:18px;color:#7c2d12;font-size:14px;line-height:1.6">
           ${synth.cost.lines.map((l) => `<li>${esc(l)}</li>`).join("")}
         </ul>
         <div style="color:#9a3412;font-size:13px;margin-top:8px;font-style:italic">${esc(synth.cost.closing)}</div>
       </div>`
    : "";

  return `<!doctype html><html lang="tr"><body style="margin:0;background:#f4f4f7;font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif">
    <div style="max-width:600px;margin:0 auto;padding:24px">
      <div style="background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,.06)">
        <div style="background:${PRIMARY};padding:22px 28px">
          <div style="color:#fff;font-weight:800;font-size:18px;letter-spacing:.2px">Growtify · AI Olgunluk Profili</div>
        </div>
        <div style="padding:28px">
          <p style="margin:0 0 6px;font-size:16px;color:#232323">Merhaba ${ad},</p>
          <p style="margin:0 0 18px;font-size:15px;color:#555;line-height:1.6">İşte AI Olgunluk profilin — kendi cevaplarından çıkardığımız harita.</p>

          <div style="display:inline-block;padding:10px 16px;background:#eef0fe;border-radius:999px;font-weight:700;color:${PRIMARY};font-size:15px">
            ${esc(synth.levelLabel)} · ${synth.overall}/5
          </div>
          <div style="font-size:13px;color:#888;margin-top:6px">Sektör ortalaması: ${synth.sectorOverallBenchmark}/5</div>

          <h3 style="margin:24px 0 6px;font-size:15px;color:${PRIMARY}">Senin Gap'in</h3>
          <p style="margin:0;font-size:14px;color:#232323;line-height:1.7">${esc(synth.gapParagraph)}</p>

          <div style="margin:22px 0;padding:16px 18px;background:#f7f7fb;border-radius:12px">
            <div style="font-size:12px;text-transform:uppercase;letter-spacing:.5px;color:#999">En Zayıf Halkan</div>
            <div style="font-weight:700;color:#232323;margin-top:2px">${esc(w.label)} · ${w.score}/5</div>
            <div style="font-size:14px;color:#666;margin-top:4px;line-height:1.6">${esc(w.means)}</div>
            <div style="font-size:12px;text-transform:uppercase;letter-spacing:.5px;color:#999;margin-top:12px">İlk Hamlen</div>
            <div style="font-size:14px;color:#232323;margin-top:2px;line-height:1.6">${esc(w.next)}</div>
          </div>

          ${costBlock}

          <a href="${G1_VIEW_URL}" style="display:inline-block;margin-top:8px;padding:13px 22px;background:${PRIMARY};color:#fff;text-decoration:none;border-radius:10px;font-weight:700;font-size:15px">Sonucu tekrar gör →</a>

          <p style="margin:24px 0 0;font-size:12px;color:#aaa;line-height:1.6">Bu e-postayı AI Olgunluk testini tamamladığın için aldın. Growtify · growtify.ai</p>
        </div>
      </div>
    </div>
  </body></html>`;
}

export interface G1EmailResult {
  ok: boolean;
  messageId?: string;
  error?: string;
}

export async function sendG1ResultEmail(
  contactId: string,
  firstName: string,
  synth: G1Synthesis,
): Promise<G1EmailResult> {
  const cfg = readConfig();
  if (!cfg) return { ok: false, error: "ghl_credentials_missing" };

  const subject = firstName
    ? `${firstName}, AI Olgunluk profilin hazır`
    : "AI Olgunluk profilin hazır";
  const html = buildG1EmailHtml(firstName, synth);

  try {
    const res = await fetch(`${cfg.apiBase}/conversations/messages`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${cfg.apiToken}`,
        Version: cfg.apiVersion,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ type: "Email", contactId, subject, html }),
      signal: AbortSignal.timeout(15000),
    });
    const json = (await res.json().catch(() => ({}))) as {
      messageId?: string;
      message?: string;
      error?: string;
      msg?: { id?: string };
    };
    if (!res.ok) {
      return { ok: false, error: json.message ?? json.error ?? `HTTP ${res.status}` };
    }
    return { ok: true, messageId: json.msg?.id ?? json.messageId };
  } catch (err) {
    return { ok: false, error: (err as Error).message };
  }
}

async function addTag(cfg: GhlConfig, contactId: string, tag: string): Promise<void> {
  await fetch(`${cfg.apiBase}/contacts/${contactId}/tags`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${cfg.apiToken}`,
      Version: cfg.apiVersion,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ tags: [tag] }),
    signal: AbortSignal.timeout(10000),
  });
}
