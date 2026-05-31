import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  serverExternalPackages: ["@sparticuz/chromium"],
  outputFileTracingIncludes: {
    "/[locale]/test/api/submit-email": [
      "./node_modules/@sparticuz/chromium/bin/**",
      "./node_modules/@sparticuz/chromium/build/**",
    ],
    "/[locale]/test/api/diag": [
      "./node_modules/@sparticuz/chromium/bin/**",
      "./node_modules/@sparticuz/chromium/build/**",
    ],
    "/[locale]/test/api/download-pdf": [
      "./node_modules/@sparticuz/chromium/bin/**",
      "./node_modules/@sparticuz/chromium/build/**",
    ],
    "/[locale]/test/api/preview-pdf": [
      "./node_modules/@sparticuz/chromium/bin/**",
      "./node_modules/@sparticuz/chromium/build/**",
    ],
    "/[locale]/test/kurumsal/api/submit-email": [
      "./node_modules/@sparticuz/chromium/bin/**",
      "./node_modules/@sparticuz/chromium/build/**",
    ],
    "/[locale]/test/kurumsal/api/download-pdf": [
      "./node_modules/@sparticuz/chromium/bin/**",
      "./node_modules/@sparticuz/chromium/build/**",
    ],
    "/[locale]/test/kurumsal/api/preview-pdf": [
      "./node_modules/@sparticuz/chromium/bin/**",
      "./node_modules/@sparticuz/chromium/build/**",
    ],
  },
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
