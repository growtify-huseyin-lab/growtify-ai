// G1 / DeepGap — push result back to the GHL contact (server-only).
// We already know contactId from the verified token, so we PUT custom fields
// directly (no upsert-by-email). Mirrors the pattern in test/lib/ghl-client.ts.
import type { G1Config, G1Result } from "./types";

// GHL custom field IDs — TODO(ghl-specialist): create these fields in GHL and
// replace the REPLACE_* placeholders with the real field ids. Until then the
// writeback no-ops gracefully (see saveG1ResultToContact).
export const G1_FIELD_IDS: Record<string, string> = {
  overall: "REPLACE_G1_OVERALL",
  deployment: "REPLACE_G1_DEPLOYMENT",
  systems: "REPLACE_G1_SYSTEMS",
  data: "REPLACE_G1_DATA",
  outcomes: "REPLACE_G1_OUTCOMES",
  people: "REPLACE_G1_PEOPLE",
  governance: "REPLACE_G1_GOVERNANCE",
  archetype: "REPLACE_G1_ARCHETYPE",
  gapSummary: "REPLACE_G1_GAP_SUMMARY",
  completedAt: "REPLACE_G1_COMPLETED_AT",
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

function buildGapSummary(config: G1Config, result: G1Result): string {
  const label = (k: string) =>
    config.dimensions.find((d) => d.key === k)?.label ?? k;
  const weak = result.dimensions.find((d) => d.key === result.weakest);
  const strong = result.dimensions.find((d) => d.key === result.strongest);
  return [
    `Profil: ${result.archetypeLabel} (genel ${result.overall}/5).`,
    strong ? `En güçlü: ${label(strong.key)} ${strong.score}/5.` : "",
    weak ? `En zayıf: ${label(weak.key)} ${weak.score}/5.` : "",
  ]
    .filter(Boolean)
    .join(" ");
}

function buildCustomFields(
  config: G1Config,
  result: G1Result,
): Array<{ id: string; value: string | number }> {
  const fields: Array<{ id: string; value: string | number }> = [];
  const push = (key: string, value: string | number) => {
    const id = G1_FIELD_IDS[key];
    if (id && !id.startsWith("REPLACE_")) fields.push({ id, value });
  };
  push("overall", result.overall);
  push("archetype", result.archetypeLabel);
  push("gapSummary", buildGapSummary(config, result));
  push("completedAt", result.completedAt);
  for (const d of result.dimensions) push(d.key, d.score);
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
  config: G1Config,
): Promise<G1WritebackResult> {
  const cfg = readConfig();
  if (!cfg) return { ok: false, wrote: 0, error: "GHL credentials missing" };

  const customFields = buildCustomFields(config, result);
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
