import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SITE_NAME, SITE_URL } from "@/lib/data";
import { personSchema } from "@/lib/schema";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

const inter = Inter({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default:
      "Maurício Kenyatta | Mentoria de TCC, Dissertação e Relações Internacionais — Brasília",
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "Mentoria para TCC, dissertação e tese em Relações Internacionais com Maurício Kenyatta, doutorando pela UnB. Consultoria acadêmica personalizada em Brasília e online.",
  keywords: [
    "mentoria TCC",
    "orientação dissertação",
    "mentoria acadêmica Brasília",
    "relações internacionais UnB",
    "orientação tese",
    "consultoria acadêmica",
    "geopolítica",
    "diplomacia brasileira",
    "Maurício Kenyatta",
    "metodologia de pesquisa",
    "defesa de dissertação",
    "carreira acadêmica",
  ],
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: SITE_URL,
    siteName: SITE_NAME,
    title:
      "Maurício Kenyatta | Mentoria de TCC, Dissertação e Relações Internacionais",
    description:
      "Mentoria para TCC, dissertação e tese em Relações Internacionais com Maurício Kenyatta, doutorando pela UnB. Atendimento em Brasília e online.",
    images: [
      {
        url: "/og-default.png",
        width: 1200,
        height: 630,
        alt: "Maurício Kenyatta — Mentoria Acadêmica em Relações Internacionais",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Maurício Kenyatta | Mentoria de TCC, Dissertação e Relações Internacionais",
    description:
      "Mentoria para TCC, dissertação e tese em Relações Internacionais com Maurício Kenyatta, doutorando pela UnB.",
    images: ["/og-default.png"],
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
  alternates: {
    canonical: SITE_URL,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = personSchema();

  return (
    <html lang="pt-BR">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.className} antialiased`}>
        <Navbar />
        <main>{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
