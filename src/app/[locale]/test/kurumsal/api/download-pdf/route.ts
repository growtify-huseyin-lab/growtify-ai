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

  // ?test=recent → read-only: list the 15 most recently-added contacts (POST /contacts/search),
  // so we can see whether the user's just-now manual test actually created a contact (POST fired).
  if (url.searchParams.get("test") === "recent") {
    const apiBase = process.env.GHL_API_BASE ?? "https://services.leadconnectorhq.com";
    const apiVersion = process.env.GHL_API_VERSION ?? "2021-07-28";
    const locationId = process.env.GHL_LOCATION_ID;
    const r = await fetch(`${apiBase}/contacts/search`, {
      method: "POST",
      headers: { Authorization: `Bearer ${process.env.GHL_API_TOKEN}`, Version: apiVersion, Accept: "application/json", "Content-Type": "application/json" },
      body: JSON.stringify({ locationId, pageLimit: 15, sort: [{ field: "dateAdded", direction: "desc" }] }),
    });
    const b = (await r.json().catch(() => ({}))) as Record<string, unknown>;
    if (!r.ok) return Response.json({ ok: false, status: r.status, error: b });
    const contacts = (b.contacts as Array<Record<string, unknown>>) ?? [];
    return Response.json({
      ok: true,
      total: b.total ?? null,
      recent: contacts.map((c) => ({
        id: c.id,
        email: c.email,
        dateAdded: c.dateAdded,
        tags: (c.tags as string[])?.filter((t) => /kurumsal|gai_/.test(t)) ?? c.tags,
      })),
    });
  }

  // ?test=contact&email=... → read-only: look up a contact by email + its tags + recent notes.
  // Tells us whether the user's manual test (a) created a contact (POST reached server) and
  // (b) got a kurumsal note added by backgroundPdfFlow (after() ran → email should have sent).
  if (url.searchParams.get("test") === "contact") {
    const apiBase = process.env.GHL_API_BASE ?? "https://services.leadconnectorhq.com";
    const apiVersion = process.env.GHL_API_VERSION ?? "2021-07-28";
    const locationId = process.env.GHL_LOCATION_ID;
    const email = url.searchParams.get("email") ?? "";
    const hdr = { Authorization: `Bearer ${process.env.GHL_API_TOKEN}`, Version: apiVersion, Accept: "application/json" };
    const lookup = await fetch(`${apiBase}/contacts/?locationId=${locationId}&query=${encodeURIComponent(email)}`, { headers: hdr });
    const lb = (await lookup.json().catch(() => ({}))) as Record<string, unknown>;
    const contacts = (lb.contacts as Array<Record<string, unknown>>) ?? [];
    const c = contacts.find((x) => (x.email as string)?.toLowerCase() === email.toLowerCase()) ?? contacts[0];
    if (!c) return Response.json({ ok: true, found: false, query: email, raw_count: contacts.length });
    const cid = c.id as string;
    // notes (did backgroundPdfFlow / after() add the kurumsal note?)
    const notesRes = await fetch(`${apiBase}/contacts/${cid}/notes`, { headers: hdr });
    const nb = (await notesRes.json().catch(() => ({}))) as Record<string, unknown>;
    const notes = (nb.notes as Array<Record<string, unknown>>) ?? [];
    const noteBodies = notes.map((n) => String(n.body ?? "").slice(0, 80));
    return Response.json({
      ok: true,
      found: true,
      contactId: cid,
      email: c.email,
      dateAdded: c.dateAdded,
      dateUpdated: c.dateUpdated,
      tags: c.tags,
      dnd: c.dnd ?? null,
      dndSettings: c.dndSettings ?? null,
      notes_count: notes.length,
      has_kurumsal_note: noteBodies.some((b) => /Olgunluk|Maturity|Kurumsal AI/i.test(b)),
      note_previews: noteBodies.slice(0, 4),
    });
  }

  // ?test=fielddefs → dump GHL OPTION field definitions (read-only, no email/contact).
  // Compares each SINGLE/MULTIPLE_OPTIONS field's allowed picklist against the labels
  // buildGhlCustomFields can emit, to surface invalid-option upsert (HTTP 400) causes.
  if (url.searchParams.get("test") === "fielddefs") {
    const apiBase = process.env.GHL_API_BASE ?? "https://services.leadconnectorhq.com";
    const apiVersion = process.env.GHL_API_VERSION ?? "2021-07-28";
    const locationId = process.env.GHL_LOCATION_ID;
    const WATCH: Record<string, string> = {
      sector: "kWk6Jx9WGCpER8FjF1Oh",
      quizPersona: "QAkd2vjnWIHDwHDtWeAy",
      quizPainLevel: "m5ImybTUeJg4T7gmEmaM",
      quizGoal: "EJQnFrHk5Dqo5tQpkkDe",
      companySize: "gAuTk4Hn7xuJvhZcuhx8",
      priorityDepartments: "yxaOZ02OrBuSW3KwEWQm",
    };
    // labels buildGhlCustomFields can emit per field
    const EMITTABLE: Record<string, string[]> = {
      sector: ["SaaS & Teknoloji","E-Ticaret & Perakende","Finans & Bankacılık","Sağlık & İlaç","Hukuk & Danışmanlık","Üretim & Lojistik","Eğitim","Medya & Reklam","İnşaat & Gayrimenkul","Turizm & Konaklama","Otomotiv","Enerji & Altyapı","Diğer"],
      quizPersona: ["Başlangıç (AI Farkındalık)","Keşif (AI Deneyimleme)","Uygulama (AI Operasyonu)","Lider (AI Dönüşümü)"],
      quizPainLevel: ["Düşük","Orta","Yüksek"],
      quizGoal: ["Operasyonel verimlilik","Gelir artışı","Maliyet düşürme","Müşteri deneyimi","Rekabet avantajı"],
      companySize: ["1-10 kişi","11-50 kişi","51-200 kişi","200+ kişi"],
      priorityDepartments: ["Pazarlama","Satış","Müşteri Hizmetleri","Finans","Operasyon","İnsan Kaynakları","IT","Ar-Ge"],
    };
    const r = await fetch(`${apiBase}/locations/${locationId}/customFields`, {
      headers: { Authorization: `Bearer ${process.env.GHL_API_TOKEN}`, Version: apiVersion, Accept: "application/json" },
    });
    const body = await r.json().catch(() => ({})) as Record<string, unknown>;
    if (!r.ok) return Response.json({ ok: false, status: r.status, error: body });
    const all = (body.customFields as Array<Record<string, unknown>>) ?? [];
    const out: Record<string, unknown> = {};
    for (const [name, id] of Object.entries(WATCH)) {
      const f = all.find((x) => x.id === id);
      const opts: string[] = ((f?.picklistOptions as string[]) ?? (f?.options as Array<{value?:string}>)?.map(o=>o.value??String(o)) ?? []) as string[];
      const emit = EMITTABLE[name] ?? [];
      const missing = emit.filter((e) => !opts.includes(e));
      out[name] = { id, dataType: f?.dataType ?? "NOT_FOUND", ghl_options: opts, emittable: emit, MISSING_FROM_GHL: missing };
    }
    return Response.json({ ok: true, fields: out });
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
