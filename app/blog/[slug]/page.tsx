import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  getAllPosts,
  getPostBySlug,
  formatDate,
  WIX_BLOG_BASE,
  SITE_URL,
} from "@/lib/data";
import { blogPostingSchema } from "@/lib/schema";
import PostCard from "@/components/PostCard";

interface Props {
  params: Promise<{ slug: string }>;
}

export const revalidate = 60

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.seo_title ?? post.title,
    description: post.seo_description ?? post.excerpt ?? undefined,
    alternates: {
      canonical: `${SITE_URL}/blog/${post.slug}`,
    },
    openGraph: {
      title: post.seo_title ?? post.title,
      description: post.seo_description ?? post.excerpt ?? undefined,
      images: post.image ? [post.image] : [],
      type: "article",
      publishedTime: post.firstPublishedDate ?? undefined,
      modifiedTime:
        post.lastPublishedDate ?? post.firstPublishedDate ?? undefined,
      locale: post.language === "en" ? "en_US" : "pt_BR",
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const allPosts = await getAllPosts();
  const related = allPosts
    .filter(
      (p) =>
        p.id !== post.id &&
        p.categories.some((c) => post.categories.includes(c))
    )
    .slice(0, 3);

  const wixUrl = `${WIX_BLOG_BASE}/${post.slug}`;
  const jsonLd = blogPostingSchema(post);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Post hero */}
      <section className="bg-[#0f172a] text-white py-12 px-4">
        <div className="max-w-3xl mx-auto">
          {post.categories.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {post.categories.slice(0, 3).map((cat) => (
                <span
                  key={cat}
                  className="text-xs bg-[#1e293b] text-slate-300 border border-[#334155] px-3 py-1 rounded"
                >
                  {cat}
                </span>
              ))}
              {post.language === "en" && (
                <span className="text-xs bg-blue-800 text-blue-100 border border-blue-700 px-3 py-1 rounded">
                  EN
                </span>
              )}
            </div>
          )}
          <h1 className="text-3xl md:text-4xl font-extrabold mb-4 leading-tight">
            {post.title}
          </h1>
          {post.excerpt && (
            <p className="text-slate-300 text-lg mb-4 leading-relaxed">
              {post.excerpt}
            </p>
          )}
          <div className="flex items-center gap-4 text-sm text-slate-400">
            {post.firstPublishedDate && (
              <span>{formatDate(post.firstPublishedDate)}</span>
            )}
            {post.minutesToRead && (
              <span>· {post.minutesToRead} min de leitura</span>
            )}
          </div>
        </div>
      </section>

      {/* Featured image */}
      {post.image && (
        <div className="relative w-full h-72 md:h-96 bg-gray-100">
          <Image
            src={post.image}
            alt={post.image_alt ?? post.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      {/* Article body or fallback */}
      <section className="py-12 px-4 max-w-3xl mx-auto">
        {post.content ? (
          <article
            className="prose prose-lg max-w-none prose-headings:text-[#0f172a] prose-a:text-blue-600"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        ) : (
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 text-center mb-10">
            <div className="text-4xl mb-4">📖</div>
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              Leia o artigo completo
            </h2>
            <p className="text-gray-600 mb-6 text-sm">
              O conteúdo completo está disponível no blog original de Maurício
              Kenyatta.
            </p>
            <a
              href={wixUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-8 py-3 rounded-lg transition-colors inline-block"
            >
              Ler artigo completo →
            </a>
          </div>
        )}

        {/* Mentoria CTA */}
        <div className="mt-10 bg-[#0f172a] rounded-2xl p-8 text-center text-white">
          <div className="text-3xl mb-3">🎓</div>
          <h2 className="text-xl font-bold mb-2">
            Gostou? Agende uma mentoria!
          </h2>
          <p className="text-slate-400 text-sm mb-5">
            Aprofunde seu conhecimento com acompanhamento personalizado de
            Maurício Kenyatta.
          </p>
          <Link
            href="/servicos"
            className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-7 py-3 rounded-lg transition-colors inline-block"
          >
            Ver serviços de mentoria
          </Link>
        </div>
      </section>

      {/* Related posts */}
      {related.length > 0 && (
        <section className="py-12 px-4 bg-slate-50 border-t border-gray-100">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-lg font-bold text-gray-900 mb-6">
              Artigos relacionados
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {related.map((p) => (
                <PostCard key={p.id} post={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      <div className="py-8 px-4 text-center">
        <Link
          href="/blog"
          className="text-gray-700 hover:underline font-medium"
        >
          ← Voltar para o blog
        </Link>
      </div>
    </>
  );
}
