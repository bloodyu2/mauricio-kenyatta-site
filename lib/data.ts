import type { Post } from "./types";
import postsData from "@/data/posts.json";

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

export const SITE_NAME = "Maurício Kenyatta";
export const SITE_DESCRIPTION =
  "Análises de política internacional, geopolítica, diplomacia brasileira e relações internacionais contemporâneas.";
export const WIX_BLOG_BASE = "https://www.kenyatta.com.br/blog";
export const CONTACT_EMAIL = "mauricio@kenyatta.com.br";
