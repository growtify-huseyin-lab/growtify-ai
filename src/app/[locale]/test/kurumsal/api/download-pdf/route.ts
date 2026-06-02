// GET /test/kurumsal/api/download-pdf
// Download kurumsal PDF (real Puppeteer render).

export const maxDuration = 60;

import { generateKurumsalPdfHtml } from "../../lib/pdf-html-template-kurumsal";
import { generateKurumsalPdfHtml as generateKurumsalPdfHtmlEn } from "../../lib/pdf-html-template-kurumsal-en";
import { generatePdfFromHtml } from "../../../lib/pdf-generate";
import { initialKurumsalState } from "../../lib/types-kurumsal";
import { buildGhlTags, buildGhlTagsEn, buildGhlCustomFields } from "../../lib/ghl-mapping-kurumsal";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const name = url.searchParams.get("name") ?? "rapor";
  const en = url.searchParams.get("locale") === "en"; // diagnostic: ?locale=en

  // In production this would come from stored state; for now use mock
  const mockState = {
    ...initialKurumsalState,
    sector: "saas",
    d_strategy: 4,
    d_team: 6,
    d_process: 3,
    d_data: 5,
    d_culture: 7,
    p_pilot: 4,
    p_roi: 3,
    p_resistance: 4,
    p_resources: 3,
    q_goal: "verimlilik",
    q_priority_depts: ["pazarlama", "satis", "it"],
    companySize: "51-200" as const,
    firstName: name,
    email: "test@demo.com",
    totalScore: 42,
    painLevel: "medium" as const,
    persona: "Kesif" as const,
    ...(en ? { locale: "en" } : {}),
  };

  // ?test=upsert → isolate the kurumsal GHL upsert (the email-gating fast path). No email sent.
  if (url.searchParams.get("test") === "upsert") {
    const tags = en ? buildGhlTagsEn(mockState) : buildGhlTags(mockState);
    const customFields = buildGhlCustomFields(mockState);
    const apiBase = process.env.GHL_API_BASE ?? "https://services.leadconnectorhq.com";
    const apiVersion = process.env.GHL_API_VERSION ?? "2021-07-28";
    const r = await fetch(`${apiBase}/contacts/upsert`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.GHL_API_TOKEN}`,
        Version: apiVersion,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        locationId: process.env.GHL_LOCATION_ID,
        email: "kurumsal-diag@growtify.ai",
        firstName: "Diag",
        country: en ? undefined : "TR",
        source: "Growtify.ai kurumsal quiz",
        tags,
        customFields,
      }),
    });
    const body = await r.json().catch(() => ({}));
    return Response.json({ ok: r.ok, status: r.status, locale: en ? "en" : "tr", error: r.ok ? null : body, tags, customFields });
  }

  try {
    const html = (en ? generateKurumsalPdfHtmlEn : generateKurumsalPdfHtml)(mockState);
    const pdfBuffer = await generatePdfFromHtml(html);
    const filename = `growtify-kurumsal-rapor-${name.toLowerCase().replace(/\s+/g, "-")}.pdf`;
    return new Response(new Uint8Array(pdfBuffer), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `inline; filename="${filename}"`,
      },
    });
  } catch (err) {
    return Response.json(
      { ok: false, locale: en ? "en" : "tr", error: (err as Error).message, stack: (err as Error).stack?.split("\n").slice(0, 8) },
      { status: 500 },
    );
  }
}
