import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  // chromium-min ships no binary (downloaded from CHROMIUM_PACK_URL at runtime), so no
  // outputFileTracingIncludes is needed — this makes PDF generation independent of the
  // bundler (Turbopack did NOT honor outputFileTracingIncludes → binary never bundled).
  serverExternalPackages: ["@sparticuz/chromium-min"],
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
      { source: "/en/sektor", destination: "/en/sectors", permanent: true },
      { source: "/en/hakkimizda", destination: "/en/about", permanent: true },
      { source: "/en/iletisim", destination: "/en/contact", permanent: true },
      { source: "/en/kurumsal", destination: "/en/enterprise", permanent: true },
      { source: "/en/gizlilik-politikasi", destination: "/en/privacy-policy", permanent: true },
      { source: "/en/kullanim-kosullari", destination: "/en/terms-of-service", permanent: true },
      { source: "/en/cerez-politikasi", destination: "/en/cookie-policy", permanent: true },
      { source: "/en/iade-politikasi", destination: "/en/refund-policy", permanent: true },
      { source: "/en/lead/ai-baslangic-rehberi", destination: "/en/lead/ai-starter-guide", permanent: true },
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
