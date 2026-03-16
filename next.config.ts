import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "static.wixstatic.com",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/service-page/:slug",
        destination: "/servicos",
        permanent: true,
      },
      {
        source: "/booking-calendar/:slug",
        destination: "/servicos",
        permanent: true,
      },
      {
        source: "/sobre-mim",
        destination: "/sobre",
        permanent: true,
      },
      {
        source: "/services",
        destination: "/servicos",
        permanent: true,
      },
      {
        source: "/contact",
        destination: "/contato",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
