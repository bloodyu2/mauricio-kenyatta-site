import type { NextConfig } from "next";

const securityHeaders = [
  { key: "X-DNS-Prefetch-Control", value: "on" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com",
      "img-src 'self' data: blob: https://static.wixstatic.com https://tsmnlglaizuuikwllpdq.supabase.co",
      "connect-src 'self' https://tsmnlglaizuuikwllpdq.supabase.co wss://tsmnlglaizuuikwllpdq.supabase.co",
      "frame-ancestors 'self'",
    ].join("; "),
  },
];

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "static.wixstatic.com",
      },
      {
        protocol: "https",
        hostname: "tsmnlglaizuuikwllpdq.supabase.co",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
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
