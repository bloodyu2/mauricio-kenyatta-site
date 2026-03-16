import type { Post, Service } from "./types";
import servicesData from "@/data/services.json";
import { createClient } from "@/lib/supabase/server";

// ─── Mapping ───────────────────────────────────────────────────────────────────

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapPost(row: any): Post {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt ?? null,
    content: row.content ?? null,
    image: row.image ?? null,
    image_alt: row.image_alt ?? null,
    categories: row.categories ?? [],
    categoryIds: row.category_ids ?? [],
    language: row.language ?? "pt",
    featured: row.featured ?? false,
    minutesToRead: row.minutes_to_read ?? null,
    status: row.status ?? null,
    seo_title: row.seo_title ?? null,
    seo_description: row.seo_description ?? null,
    firstPublishedDate: row.first_published_date ?? null,
    lastPublishedDate: row.last_published_date ?? null,
  };
}

// ─── Posts (Supabase) ──────────────────────────────────────────────────────────

export async function getAllPosts(): Promise<Post[]> {
  const supabase = await createClient();
  if (!supabase) return [];
  const { data } = await supabase
    .from("mk_blog_posts")
    .select("*")
    .eq("status", "published")
    .order("first_published_date", { ascending: false });
  return (data ?? []).map(mapPost);
}

export async function getPostBySlug(slug: string): Promise<Post | undefined> {
  const supabase = await createClient();
  if (!supabase) return undefined;
  const { data } = await supabase
    .from("mk_blog_posts")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();
  return data ? mapPost(data) : undefined;
}

export async function getRecentPosts(limit = 6): Promise<Post[]> {
  const supabase = await createClient();
  if (!supabase) return [];
  const { data } = await supabase
    .from("mk_blog_posts")
    .select("*")
    .eq("status", "published")
    .order("first_published_date", { ascending: false })
    .limit(limit);
  return (data ?? []).map(mapPost);
}

export async function getFeaturedPost(): Promise<Post | undefined> {
  const supabase = await createClient();
  if (!supabase) return undefined;
  const { data } = await supabase
    .from("mk_blog_posts")
    .select("*")
    .eq("status", "published")
    .eq("featured", true)
    .order("first_published_date", { ascending: false })
    .limit(1)
    .maybeSingle();
  return data ? mapPost(data) : undefined;
}

export async function getPostsByCategory(category: string): Promise<Post[]> {
  const posts = await getAllPosts();
  return posts.filter((p) => p.categories.includes(category));
}

export async function getAllPostsAdmin(): Promise<Post[]> {
  const supabase = await createClient();
  if (!supabase) return [];
  const { data } = await supabase
    .from("mk_blog_posts")
    .select("*")
    .order("created_at", { ascending: false });
  return (data ?? []).map(mapPost);
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

// ─── Constants (re-export from constants.ts for server-side imports) ──────────
export {
  SITE_NAME,
  SITE_DESCRIPTION,
  WIX_BLOG_BASE,
  CONTACT_EMAIL,
  SITE_URL,
  INSTAGRAM,
  LINKEDIN,
  WHATSAPP_NUMBER,
} from "./constants";
