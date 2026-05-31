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
      // KVKK is TR-only (UK GDPR covers EN); remove on EN → global privacy policy
      {
        source: "/en/kvkk-aydinlatma",
        destination: "/en/gizlilik-politikasi",
        permanent: true,
      },
    ];
  },
};

export default withNextIntl(nextConfig);
