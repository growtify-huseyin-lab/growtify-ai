import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  // chromium-min ships no binary (downloaded from CHROMIUM_PACK_URL at runtime), so no
  // outputFileTracingIncludes is needed — this makes PDF generation independent of the
  // bundler (Turbopack did NOT honor outputFileTracingIncludes → binary never bundled).
  serverExternalPackages: ["@sparticuz/chromium-min"],
  async headers() {
    // Portal community i18n script: short cache so translation edits propagate
    // within ~60s without ever touching the GHL custom-JS loader (?v=1 stays fixed).
    return [
      {
        source: "/portal/community-i18n.js",
        headers: [
          { key: "Cache-Control", value: "public, max-age=60, s-maxage=60, must-revalidate" },
        ],
      },
    ];
  },
  async redirects() {
    // EN guide fork (CEO 2026-05-31): /en/rehber/{tr} → /en/guide/{en} (English slugs),
    // /en/rehber → /en/guide, and KVKK removed on EN → /en/gizlilik-politikasi.
    // redirects() run before next-intl middleware, so these literal /en paths match
    // without touching the TR /rehber tree.
    const GUIDE_TR_TO_EN: Record<string, string> = {
      saglik: "healthcare",
      hukuk: "legal",
      guzellik: "beauty",
      emlak: "real-estate",
      eticaret: "ecommerce",
      dis: "dental",
      muhasebe: "accounting",
      eczacilik: "pharmacy",
      turizm: "tourism",
      mimarlik: "architecture",
      egitim: "education",
      fitness: "fitness",
    };
    const enGuideRedirects = Object.entries(GUIDE_TR_TO_EN).map(([tr, en]) => ({
      source: `/en/rehber/${tr}`,
      destination: `/en/guide/${en}`,
      permanent: true,
    }));

    // EN English-slug taxonomy (CEO 2026-06-01): sektör + core + legal + lead.
    // Old /en/{tr} paths → new /en/{en} paths. TR root paths untouched.
    const SECTOR_TR_TO_EN: Record<string, string> = {
      saglik: "healthcare",
      hukuk: "legal",
      guzellik: "beauty",
      emlak: "real-estate",
      "e-ticaret": "ecommerce",
      "dis-hekimligi": "dental",
      muhasebe: "accounting",
      eczacilik: "pharmacy",
      turizm: "tourism",
      mimarlik: "architecture",
      egitim: "education",
      fitness: "fitness",
    };
    const enSectorRedirects = Object.entries(SECTOR_TR_TO_EN).map(([tr, en]) => ({
      source: `/en/sektor/${tr}`,
      destination: `/en/sectors/${en}`,
      permanent: true,
    }));
    const enTaxonomyRedirects = [
      // EN guide lead-magnet PDFs moved to English path (/rehberler/ was Turkish).
      // Redirect old asset URLs (already in any sent GHL email) → new /guides/en/.
      { source: "/rehberler/en/:file*", destination: "/guides/en/:file*", permanent: true },
      { source: "/en/sektor", destination: "/en/sectors", permanent: true },
      { source: "/en/hakkimizda", destination: "/en/about", permanent: true },
      { source: "/en/iletisim", destination: "/en/contact", permanent: true },
      { source: "/en/kurumsal", destination: "/en/enterprise", permanent: true },
      // EN corporate-quiz English slug: /en/test/kurumsal → /en/test/enterprise.
      // Served by the thin re-export route at app/[locale]/test/enterprise/ (TR /test/kurumsal stays).
      { source: "/en/test/kurumsal", destination: "/en/test/enterprise", permanent: true },
      { source: "/en/gizlilik-politikasi", destination: "/en/privacy-policy", permanent: true },
      { source: "/en/kullanim-kosullari", destination: "/en/terms-of-service", permanent: true },
      { source: "/en/cerez-politikasi", destination: "/en/cookie-policy", permanent: true },
      { source: "/en/iade-politikasi", destination: "/en/refund-policy", permanent: true },
      { source: "/en/lead/ai-baslangic-rehberi", destination: "/en/lead/ai-starter-guide", permanent: true },
      // Gelişmeler EN-slug fork: TR /gelismeler ↔ EN /en/news
      { source: "/en/gelismeler", destination: "/en/news", permanent: true },
      { source: "/en/gelismeler/:slug", destination: "/en/news/:slug", permanent: true },
      { source: "/news", destination: "/gelismeler", permanent: true },
      { source: "/news/:slug", destination: "/gelismeler/:slug", permanent: true },
    ];

    return [
      {
        source: "/topluluk",
        destination: "/growt-method",
        permanent: true,
      },
      {
        source: "/danismanlik",
        destination: "/growt-method",
        permanent: true,
      },
      {
        source: "/kocluk",
        destination: "/growt-method",
        permanent: true,
      },
      {
        source: "/programlar",
        destination: "/growt-method",
        permanent: true,
      },
      // EN guide fork
      ...enGuideRedirects,
      {
        source: "/en/rehber",
        destination: "/en/guide",
        permanent: true,
      },
      // EN English-slug taxonomy (sektör + core + legal + lead)
      ...enSectorRedirects,
      ...enTaxonomyRedirects,
      // KVKK is TR-only (UK GDPR covers EN); remove on EN → English privacy policy
      {
        source: "/en/kvkk-aydinlatma",
        destination: "/en/privacy-policy",
        permanent: true,
      },
    ];
  },
};

export default withNextIntl(nextConfig);
