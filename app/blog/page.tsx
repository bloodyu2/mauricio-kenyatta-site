import type { Metadata } from "next";
import { getAllPosts, SITE_URL } from "@/lib/data";
import PostCard from "@/components/PostCard";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Análises de política internacional, geopolítica, diplomacia brasileira e relações internacionais contemporâneas por Maurício Kenyatta.",
  alternates: {
    canonical: `${SITE_URL}/blog`,
  },
  openGraph: {
    title: "Blog — Maurício Kenyatta",
    description:
      "Análises de política internacional, geopolítica e diplomacia.",
  },
};

export const revalidate = 60

export default async function BlogPage() {
  const posts = await getAllPosts();
  const ptPosts = posts.filter((p) => p.language !== "en");
  const enPosts = posts.filter((p) => p.language === "en");

  // Collect unique categories
  const allCategories = Array.from(
    new Set(ptPosts.flatMap((p) => p.categories))
  ).slice(0, 8);

  return (
    <>
      {/* Hero */}
      <section className="relative bg-[#0f172a] text-white overflow-hidden">
        <div className="absolute inset-0 bg-dot-pattern opacity-40 pointer-events-none" />
        <div className="relative max-w-5xl mx-auto px-4 py-16 md:py-22 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Blog</h1>
          <p className="text-slate-300 max-w-xl mx-auto text-lg">
            Análises de política internacional, geopolítica e diplomacia
            brasileira
          </p>
        </div>
      </section>

      {/* Category chips */}
      {allCategories.length > 0 && (
        <section className="bg-slate-50 border-b border-gray-100 py-4 px-4">
          <div className="max-w-5xl mx-auto flex flex-wrap gap-2 justify-center">
            {allCategories.map((cat) => (
              <span
                key={cat}
                className="text-xs bg-white border border-gray-200 text-slate-600 px-3 py-1.5 rounded-full font-medium"
              >
                {cat}
              </span>
            ))}
          </div>
        </section>
      )}

      <section className="py-14 px-4 max-w-5xl mx-auto">
        {/* Portuguese posts */}
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-sm font-bold text-slate-500 uppercase tracking-widest">
            Artigos em Português ({ptPosts.length})
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-14">
          {ptPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>

        {/* English posts */}
        {enPosts.length > 0 && (
          <>
            <h2 className="text-sm font-bold text-slate-500 uppercase tracking-widest border-t border-gray-100 pt-10 mb-5">
              Articles in English ({enPosts.length})
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {enPosts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          </>
        )}
      </section>
    </>
  );
}
