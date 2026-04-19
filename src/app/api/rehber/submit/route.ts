import { NextRequest, NextResponse } from "next/server";
import { getRehber } from "@/content/rehberler";

const GHL_API_BASE = process.env.GHL_API_BASE ?? "https://services.leadconnectorhq.com";
const GHL_API_TOKEN = process.env.GHL_API_TOKEN!;
const GHL_API_VERSION = process.env.GHL_API_VERSION ?? "2021-07-28";
const GHL_LOCATION_ID = process.env.GHL_LOCATION_ID!;

// GAI - Satis pipeline (same as iletisim form for consistency)
const PIPELINE_ID = "DJYPH8mpgBh5tZkelIQP";
const STAGE_YENI_LEAD = "bd48baed-afa1-479b-a398-9c0ee7167df9";

// Huseyin user ID for assignment
const ASSIGNED_USER = "A63MyodDNnjwGmZIW4zd";

// Custom field IDs
const FIELD_SECTOR = "kWk6Jx9WGCpER8FjF1Oh";
const FIELD_LANDING_PAGE = "5fLsVVQnHcFqenrkWltF";
const FIELD_FIRST_UTM_SOURCE = "GGDUtGyBC9k4FDQU5AYg";
const FIELD_FIRST_UTM_CAMPAIGN = "RmJaQvw2C7ewgDF6ufR1";
const FIELD_FIRST_CONTACT_DATE = "odWIx5KCfWrrwCDf2W8U";
const FIELD_ENTRY_POINT = "aRKxT2Dcz4bUFQVhfNBo";
const FIELD_REHBER_PDF_URL = "GrBYWlIe002WEweJaE20";

// Public base URL — used to build full PDF URL for email merge tag
const PUBLIC_BASE_URL = "https://growtify.ai";

// UTM source → Tag mapping (organic/default)
const UTM_SOURCE_TAGS_ORGANIC: Record<string, string> = {
  linkedin: "gai_src_organic_linkedin",
  instagram: "gai_src_organic_instagram",
  youtube: "gai_src_organic_youtube",
  blog: "gai_src_organic_blog",
  facebook: "gai_src_organic_facebook",
  tiktok: "gai_src_organic_tiktok",
  twitter: "gai_src_organic_x",
  x: "gai_src_organic_x",
};

// UTM source → Tag mapping (paid — when utm_medium is cpc/ads/paid/ppc)
const UTM_SOURCE_TAGS_PAID: Record<string, string> = {
  linkedin: "gai_src_paid_linkedin",
  meta: "gai_src_paid_meta",
  facebook: "gai_src_paid_meta",
  instagram: "gai_src_paid_meta",
  google: "gai_src_paid_google",
};

function isPaidMedium(medium: string | undefined): boolean {
  if (!medium) return false;
  const m = medium.toLowerCase();
  return m === "cpc" || m === "ads" || m === "paid" || m === "ppc" || m === "cpm";
}

function resolveSourceTag(utmSource: string | undefined, utmMedium: string | undefined): string {
  const src = (utmSource ?? "").toLowerCase();
  if (!src) return "gai_src_direct";
  if (isPaidMedium(utmMedium) && UTM_SOURCE_TAGS_PAID[src]) {
    return UTM_SOURCE_TAGS_PAID[src];
  }
  return UTM_SOURCE_TAGS_ORGANIC[src] ?? "gai_src_direct";
}

interface RehberSubmitPayload {
  sector: string;        // URL slug
  firstName: string;
  email: string;
  phone?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  landingPage?: string;
}

/**
 * POST /api/rehber/submit
 *
 * Lead magnet email capture endpoint for `/rehber/[sektor]` landing pages.
 *
 * Flow:
 * 1. Validate input
 * 2. Resolve sector config (title, PDF URL, tags)
 * 3. Map UTM source → source tag
 * 4. Upsert GHL contact with:
 *    - Tags: lifecycle_lead, lm_{sector}, sector_{sector}, src_{utm}
 *    - Custom fields: sector, landing_page, first_utm_source, first_utm_campaign,
 *                     first_contact_date, entry_point
 * 5. Create opportunity in GAI - Satis / Yeni Lead, assigned to Huseyin
 * 6. Return { ok, pdfUrl } so client can show download
 *
 * Email + 5-day mini course sequence is triggered by GHL workflow D1-D5
 * based on the `gai_lm_{sector}` tag.
 */
export async function POST(req: NextRequest) {
  let body: RehberSubmitPayload;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid JSON body" },
      { status: 400 },
    );
  }

  // Validation
  if (!body.sector || typeof body.sector !== "string") {
    return NextResponse.json(
      { ok: false, error: "sector required" },
      { status: 400 },
    );
  }
  if (!body.firstName || typeof body.firstName !== "string") {
    return NextResponse.json(
      { ok: false, error: "firstName required" },
      { status: 400 },
    );
  }
  if (!body.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) {
    return NextResponse.json(
      { ok: false, error: "valid email required" },
      { status: 400 },
    );
  }

  // Resolve sector
  const rehber = getRehber(body.sector);
  if (!rehber) {
    return NextResponse.json(
      { ok: false, error: `Unknown sector: ${body.sector}` },
      { status: 400 },
    );
  }

  // Build tags
  // gai_lm_any_rehber → unified D-series indicator for E-series Goal Action.
  // Lets E-series workflow exit on "user entered D-series" without listing 12 sector tags.
  const tags: string[] = [
    "gai_lifecycle_lead",
    "gai_lm_any_rehber",
    rehber.ghlLeadMagnetTag,
    rehber.ghlSectorTag,
    resolveSourceTag(body.utmSource, body.utmMedium),
  ];

  // Build custom fields
  const now = new Date().toISOString();
  const customFields: Array<{ id: string; value: string }> = [
    { id: FIELD_SECTOR, value: body.sector },
    { id: FIELD_LANDING_PAGE, value: body.landingPage ?? `/rehber/${body.sector}` },
    { id: FIELD_FIRST_CONTACT_DATE, value: now },
    { id: FIELD_ENTRY_POINT, value: "lead_magnet" },
    { id: FIELD_REHBER_PDF_URL, value: `${PUBLIC_BASE_URL}${rehber.pdfUrl}` },
  ];
  if (body.utmSource) {
    customFields.push({ id: FIELD_FIRST_UTM_SOURCE, value: body.utmSource });
  }
  if (body.utmCampaign) {
    customFields.push({ id: FIELD_FIRST_UTM_CAMPAIGN, value: body.utmCampaign });
  }

  // GHL contact upsert
  // Split full name into firstName + lastName for GHL
  const nameParts = (body.firstName || "").trim().split(/\s+/);
  const ghlFirstName = nameParts[0] || "";
  const ghlLastName = nameParts.slice(1).join(" ") || "";

  const upsertPayload = {
    locationId: GHL_LOCATION_ID,
    email: body.email,
    firstName: ghlFirstName,
    lastName: ghlLastName,
    name: body.firstName,
    phone: body.phone ?? undefined,
    country: "TR",
    source: `Lead magnet: ${rehber.name}`,
    tags,
    customFields,
    assignedTo: ASSIGNED_USER,
  };

  let contactId: string | undefined;
  try {
    const contactRes = await fetch(`${GHL_API_BASE}/contacts/upsert`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${GHL_API_TOKEN}`,
        Version: GHL_API_VERSION,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(upsertPayload),
      signal: AbortSignal.timeout(15000),
    });

    const contactData = await contactRes.json();

    if (!contactRes.ok) {
      console.error("[rehber/submit] GHL upsert failed:", contactData);
      return NextResponse.json(
        { ok: false, error: "Form gönderilirken hata oluştu." },
        { status: 500 },
      );
    }

    contactId =
      contactData.contact?.id ?? contactData.id ?? contactData._id;
  } catch (err) {
    console.error("[rehber/submit] upsert error:", err);
    return NextResponse.json(
      { ok: false, error: "Sunucu hatası." },
      { status: 500 },
    );
  }

  // Create opportunity (non-blocking — best effort)
  if (contactId) {
    try {
      await fetch(`${GHL_API_BASE}/opportunities/`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${GHL_API_TOKEN}`,
          Version: GHL_API_VERSION,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          pipelineId: PIPELINE_ID,
          pipelineStageId: STAGE_YENI_LEAD,
          name: body.firstName,
          status: "open",
          contactId,
          locationId: GHL_LOCATION_ID,
          assignedTo: ASSIGNED_USER,
        }),
        signal: AbortSignal.timeout(10000),
      });
    } catch (err) {
      // Log but don't fail — contact is already created
      console.warn("[rehber/submit] opportunity creation failed:", err);
    }
  }

  return NextResponse.json(
    {
      ok: true,
      pdfUrl: rehber.pdfUrl,
      sectorName: rehber.name,
    },
    { status: 200 },
  );
}
