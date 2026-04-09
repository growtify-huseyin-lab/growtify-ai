import { NextRequest, NextResponse } from "next/server";

const GHL_API_BASE = process.env.GHL_API_BASE!;
const GHL_API_TOKEN = process.env.GHL_API_TOKEN!;
const GHL_API_VERSION = process.env.GHL_API_VERSION!;
const GHL_LOCATION_ID = process.env.GHL_LOCATION_ID!;

// GAI - Satis pipeline
const PIPELINE_ID = "DJYPH8mpgBh5tZkelIQP";
const STAGE_YENI_LEAD = "bd48baed-afa1-479b-a398-9c0ee7167df9";

// Huseyin user ID for assignment
const ASSIGNED_USER = "A63MyodDNnjwGmZIW4zd";

// Custom field IDs
const FIELD_SECTOR = "kWk6Jx9WGCpER8FjF1Oh";
const FIELD_ILETISIM_MESAJ = "nH5G3nQfPiSyGCShhwWo";

// Sector tag mapping
const SECTOR_TAGS: Record<string, string> = {
  saglik: "gai_sector_saglik",
  hukuk: "gai_sector_hukuk",
  guzellik: "gai_sector_guzellik",
  emlak: "gai_sector_emlak",
  "e-ticaret": "gai_sector_eticaret",
  dis: "gai_sector_dis",
  muhasebe: "gai_sector_muhasebe",
  egitim: "gai_sector_egitim",
  turizm: "gai_sector_turizm",
  fitness: "gai_sector_fitness",
  diger: "gai_sector_other",
};

// Interest tag mapping
const INTEREST_TAGS: Record<string, string> = {
  bireysel: "gai_interest_bireysel",
  kurumsal: "gai_interest_kurumsal",
  genel: "gai_interest_genel",
  ortaklik: "gai_interest_ortaklik",
};

interface ContactPayload {
  name: string;
  email: string;
  phone: string;
  sector?: string;
  interest?: string;
  message?: string;
}

export async function POST(req: NextRequest) {
  try {
    const body: ContactPayload = await req.json();

    // Validation
    if (!body.name || !body.email || !body.phone) {
      return NextResponse.json(
        { success: false, error: "Ad, email ve telefon zorunludur." },
        { status: 400 }
      );
    }

    // Build tags array
    const tags: string[] = [
      "gai_lifecycle_lead",
      "gai_src_iletisim_formu",
    ];

    if (body.sector && SECTOR_TAGS[body.sector]) {
      tags.push(SECTOR_TAGS[body.sector]);
    }
    if (body.interest && INTEREST_TAGS[body.interest]) {
      tags.push(INTEREST_TAGS[body.interest]);
    }

    // Split name into first/last
    const nameParts = body.name.trim().split(/\s+/);
    const firstName = nameParts[0];
    const lastName = nameParts.slice(1).join(" ") || "";

    // Build custom fields
    const customFields: Array<{ id: string; value: string }> = [];
    if (body.sector) {
      customFields.push({ id: FIELD_SECTOR, value: body.sector });
    }
    if (body.message) {
      customFields.push({ id: FIELD_ILETISIM_MESAJ, value: body.message });
    }

    // Create/update contact in GHL
    const ghlPayload = {
      firstName,
      lastName,
      email: body.email,
      phone: body.phone,
      tags,
      customFields,
      locationId: GHL_LOCATION_ID,
      source: "iletisim_formu",
      assignedTo: ASSIGNED_USER,
    };

    const contactRes = await fetch(`${GHL_API_BASE}/contacts/`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${GHL_API_TOKEN}`,
        Version: GHL_API_VERSION,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(ghlPayload),
    });

    const contactData = await contactRes.json();

    if (!contactRes.ok) {
      console.error("GHL contact error:", contactData);
      return NextResponse.json(
        { success: false, error: "Form gonderilirken bir hata olustu." },
        { status: 500 }
      );
    }

    const contactId =
      contactData.contact?.id || contactData.id || contactData._id;

    // Create opportunity in GAI - Satis pipeline
    if (contactId) {
      const oppPayload = {
        pipelineId: PIPELINE_ID,
        pipelineStageId: STAGE_YENI_LEAD,
        name: `${firstName} ${lastName} - Iletisim`.trim(),
        status: "open",
        contactId,
        locationId: GHL_LOCATION_ID,
        assignedTo: ASSIGNED_USER,
      };

      await fetch(`${GHL_API_BASE}/opportunities/`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${GHL_API_TOKEN}`,
          Version: GHL_API_VERSION,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(oppPayload),
      });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact API error:", err);
    return NextResponse.json(
      { success: false, error: "Sunucu hatasi." },
      { status: 500 }
    );
  }
}
