import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["@sparticuz/chromium"],
  outputFileTracingIncludes: {
    "/test/api/submit-email": ["./node_modules/@sparticuz/chromium/**/*"],
    "/test/kurumsal/api/submit-email": ["./node_modules/@sparticuz/chromium/**/*"],
    "/test/api/download-pdf": ["./node_modules/@sparticuz/chromium/**/*"],
    "/test/kurumsal/api/download-pdf": ["./node_modules/@sparticuz/chromium/**/*"],
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

export default nextConfig;
