import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
