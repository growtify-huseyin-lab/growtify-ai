import { NextRequest, NextResponse } from "next/server";
import { getLeadMagnet } from "@/content/lead-magnets";

const GHL_API_BASE =
  process.env.GHL_API_BASE ?? "https://services.leadconnectorhq.com";
const GHL_API_TOKEN = process.env.GHL_API_TOKEN!;
const GHL_API_VERSION = process.env.GHL_API_VERSION ?? "2021-07-28";
const GHL_LOCATION_ID = process.env.GHL_LOCATION_ID!;

// GAI - Satis pipeline
const PIPELINE_ID = "DJYPH8mpgBh5tZkelIQP";
const STAGE_YENI_LEAD = "bd48baed-afa1-479b-a398-9c0ee7167df9";
const ASSIGNED_USER = "A63MyodDNnjwGmZIW4zd";

// Custom field IDs (shared with rehber submit)
const FIELD_LANDING_PAGE = "5fLsVVQnHcFqenrkWltF";
const FIELD_FIRST_UTM_SOURCE = "GGDUtGyBC9k4FDQU5AYg";
const FIELD_FIRST_UTM_CAMPAIGN = "RmJaQvw2C7ewgDF6ufR1";
const FIELD_FIRST_CONTACT_DATE = "odWIx5KCfWrrwCDf2W8U";
const FIELD_ENTRY_POINT = "aRKxT2Dcz4bUFQVhfNBo";
// Shared asset URL field — used by both rehber + lead magnet systems.
// Stores the "most recently downloaded" asset URL for use in nurture emails.
const FIELD_ASSET_URL = "GrBYWlIe002WEweJaE20"; // gai__rehber_pdf_url

// Public base for asset URLs (absolute URL for email merge tags)
const PUBLIC_BASE_URL = "https://growtify.ai";

// UTM → source tag mapping
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
  return ["cpc", "ads", "paid", "ppc", "cpm"].includes(
    (medium || "").toLowerCase()
  );
}

function resolveSourceTag(source: string, medium: string): string {
  const s = (source || "").toLowerCase();
  if (isPaid(medium) && UTM_PAID[s]) return UTM_PAID[s];
  return UTM_ORGANIC[s] ?? "gai_src_direct";
}

async function ghlFetch(path: string, body: Record<string, unknown>) {
  return fetch(`${GHL_API_BASE}${path}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${GHL_API_TOKEN}`,
      Version: GHL_API_VERSION,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
}

export async function POST(req: NextRequest) {
  try {
    const {
      slug,
      firstName,
      email,
      utmSource,
      utmMedium,
      utmCampaign,
      landingPage,
    } = await req.json();

    // Validation
    if (!slug || !firstName || !email) {
      return NextResponse.json(
        { ok: false, error: "Gerekli alanlar eksik." },
        { status: 400 }
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { ok: false, error: "Geçerli bir email adresi gir." },
        { status: 400 }
      );
    }

    // Lookup lead magnet
    const magnet = getLeadMagnet(slug);
    if (!magnet) {
      return NextResponse.json(
        { ok: false, error: "Lead magnet bulunamadı." },
        { status: 404 }
      );
    }

    // Build tags
    // gai_nurture_e_series → canonical trigger flag for E-Series nurture workflow.
    // Allows the GHL workflow to listen to ONE tag instead of every magnet slug,
    // so adding a new lead magnet does NOT require workflow trigger updates.
    const sourceTag = resolveSourceTag(utmSource || "", utmMedium || "");
    const tags = [
      "gai_lifecycle_lead",
      "gai_nurture_e_series",
      magnet.ghlTag,
      sourceTag,
    ];
    if (magnet.sectorRef) {
      tags.push(`gai_sector_${magnet.sectorRef}`);
    }

    // Split full name into firstName + lastName for GHL
    const nameParts = (firstName || "").trim().split(/\s+/);
    const ghlFirstName = nameParts[0] || "";
    const ghlLastName = nameParts.slice(1).join(" ") || "";

    // GHL Contact Upsert
    const contactBody = {
      firstName: ghlFirstName,
      lastName: ghlLastName,
      name: firstName,
      email,
      locationId: GHL_LOCATION_ID,
      source: `Lead magnet: ${magnet.title}`,
      assignedTo: ASSIGNED_USER,
      tags,
      country: "TR",
      customFields: [
        { id: FIELD_LANDING_PAGE, value: landingPage || `/lead/${slug}` },
        { id: FIELD_FIRST_CONTACT_DATE, value: new Date().toISOString() },
        { id: FIELD_ENTRY_POINT, value: "lead_magnet" },
        {
          id: FIELD_ASSET_URL,
          // For redirect assets (video), store as-is. For download assets, prepend base URL.
          value: magnet.assetDelivery === "redirect"
            ? magnet.assetUrl
            : `${PUBLIC_BASE_URL}${magnet.assetUrl}`,
        },
        ...(utmSource
          ? [{ id: FIELD_FIRST_UTM_SOURCE, value: utmSource }]
          : []),
        ...(utmCampaign
          ? [{ id: FIELD_FIRST_UTM_CAMPAIGN, value: utmCampaign }]
          : []),
      ],
    };

    const contactRes = await ghlFetch("/contacts/upsert", contactBody);
    const contactJson = await contactRes.json();
    const contactId = contactJson?.contact?.id;

    // Best-effort: Create opportunity
    if (contactId) {
      ghlFetch("/opportunities/", {
        pipelineId: PIPELINE_ID,
        pipelineStageId: STAGE_YENI_LEAD,
        locationId: GHL_LOCATION_ID,
        contactId,
        name: firstName,
        assignedTo: ASSIGNED_USER,
        status: "open",
      }).catch(() => {});
    }

    return NextResponse.json({
      ok: true,
      assetUrl: magnet.assetUrl,
      title: magnet.title,
      formatLabel: magnet.formatLabel,
    });
  } catch (err) {
    console.error("[lead/submit] Error:", err);
    return NextResponse.json(
      { ok: false, error: "Sunucu hatası. Lütfen tekrar dene." },
      { status: 500 }
    );
  }
}
