import type { Post } from "./types";
import { SITE_URL, INSTAGRAM, LINKEDIN, CONTACT_EMAIL } from "./data";

// ─── Person Schema ────────────────────────────────────────────────────────────

export function personSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Maurício Kenyatta",
    jobTitle: "Doutorando em Relações Internacionais | Mentor Acadêmico",
    description:
      "Doutorando em Relações Internacionais pela UnB, mestre e graduado na mesma área. Mentor acadêmico com mais de 11 anos de trajetória. Docente universitário e pesquisador no IPEA.",
    url: SITE_URL,
    email: CONTACT_EMAIL,
    address: {
      "@type": "PostalAddress",
      streetAddress: "SEPN 707/907, Bloco C - Asa Norte",
      addressLocality: "Brasília",
      addressRegion: "DF",
      addressCountry: "BR",
    },
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "Universidade de Brasília",
      sameAs: "https://www.unb.br",
    },
    sameAs: [INSTAGRAM, LINKEDIN, SITE_URL],
    knowsAbout: [
      "Relações Internacionais",
      "Segurança Internacional",
      "Diplomacia Brasileira",
      "Geopolítica",
      "Metodologia de Pesquisa",
      "Análise de Política Externa Brasileira",
      "Integração Regional",
    ],
  };
}

// ─── Blog Posting Schema ──────────────────────────────────────────────────────

export function blogPostingSchema(post: Post) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt ?? undefined,
    image: post.image ?? undefined,
    datePublished: post.firstPublishedDate ?? undefined,
    dateModified: post.lastPublishedDate ?? post.firstPublishedDate ?? undefined,
    url: `${SITE_URL}/blog/${post.slug}`,
    author: {
      "@type": "Person",
      name: "Maurício Kenyatta",
      url: SITE_URL,
    },
    publisher: {
      "@type": "Person",
      name: "Maurício Kenyatta",
      url: SITE_URL,
    },
    inLanguage: post.language === "en" ? "en" : "pt-BR",
    keywords: post.categories.join(", "),
  };
}

// ─── Service Page Schema ──────────────────────────────────────────────────────

export function servicePageSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Mentoria Acadêmica em Relações Internacionais",
    description:
      "Mentoria personalizada para estudantes e pesquisadores em Relações Internacionais. Suporte em escrita acadêmica, metodologia, defesa de tese e carreira.",
    provider: {
      "@type": "Person",
      name: "Maurício Kenyatta",
      url: SITE_URL,
    },
    serviceType: "Consultoria e Mentoria Acadêmica",
    areaServed: "Brasil",
    url: `${SITE_URL}/servicos`,
    offers: {
      "@type": "Offer",
      price: "100",
      priceCurrency: "BRL",
      description: "A partir de R$100 por sessão",
    },
  };
}
