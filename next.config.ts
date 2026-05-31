import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  // chromium-min ships no binary (downloaded from CHROMIUM_PACK_URL at runtime), so no
  // outputFileTracingIncludes is needed — this makes PDF generation independent of the
  // bundler (Turbopack did NOT honor outputFileTracingIncludes → binary never bundled).
  serverExternalPackages: ["@sparticuz/chromium-min"],
  async redirects() {
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
    ];
  },
};

export default withNextIntl(nextConfig);
