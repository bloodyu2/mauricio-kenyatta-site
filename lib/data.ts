import type { Post, Service } from "./types";
import postsData from "@/data/posts.json";
import servicesData from "@/data/services.json";

// ─── Posts ────────────────────────────────────────────────────────────────────

export function getAllPosts(): Post[] {
  return postsData as Post[];
}

export function getPostBySlug(slug: string): Post | undefined {
  return (postsData as Post[]).find((p) => p.slug === slug);
}

export function getRecentPosts(limit = 6): Post[] {
  return (postsData as Post[]).slice(0, limit);
}

export function getFeaturedPost(): Post | undefined {
  return (postsData as Post[]).find((p) => p.featured);
}

export function getPostsByCategory(category: string): Post[] {
  return (postsData as Post[]).filter((p) =>
    p.categories.includes(category)
  );
}

export function formatDate(dateStr: string | null): string {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

// ─── Services ─────────────────────────────────────────────────────────────────

export function getAllServices(): Service[] {
  return servicesData as Service[];
}

export function getServiceBySlug(slug: string): Service | undefined {
  return (servicesData as Service[]).find((s) => s.slug === slug);
}

// ─── Constants ────────────────────────────────────────────────────────────────

export const SITE_NAME = "Maurício Kenyatta";
export const SITE_DESCRIPTION =
  "Transforme sua trajetória acadêmica e profissional. Mentoria e consultoria de Maurício Kenyatta, professor e pesquisador em Relações Internacionais.";
export const WIX_BLOG_BASE = "https://www.kenyatta.com.br/blog";
export const CONTACT_EMAIL = "mauricio@kenyatta.com.br";
export const SITE_URL = "https://www.kenyatta.com.br";
export const INSTAGRAM = "https://www.instagram.com/mauricio.kenyatta/";
export const LINKEDIN =
  "https://www.linkedin.com/in/maur%C3%ADcio-kenyatta-barros-da-costa/";
export const WHATSAPP_NUMBER = "556196977745"; // +55 61 9697-7745
