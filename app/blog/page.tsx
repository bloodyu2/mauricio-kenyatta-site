import type { Metadata } from "next";
import { getAllPosts } from "@/lib/data";
import PostCard from "@/components/PostCard";

export const metadata: Metadata = {
  title: "Blog",
  description: "Análises de política internacional, geopolítica, diplomacia e relações internacionais.",
};

export default function BlogPage() {
  const posts = getAllPosts();
  const ptPosts = posts.filter((p) => p.language !== "en");
  const enPosts = posts.filter((p) => p.language === "en");
  return (
    <>
      <section className="bg-gray-900 text-white py-14 px-4 text-center">
        <h1 className="text-4xl font-extrabold mb-3">Blog</h1>
        <p className="text-slate-300 max-w-xl mx-auto">Análises de política internacional, geopolítica e diplomacia</p>
      </section>
      <section className="py-12 px-4 max-w-5xl mx-auto">
        <h2 className="text-lg font-bold text-gray-700 mb-6 uppercase tracking-wide text-sm">Artigos em Português ({ptPosts.length})</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
          {ptPosts.map((post) => <PostCard key={post.id} post={post} />)}
        </div>
        {enPosts.length > 0 && (
          <>
            <h2 className="text-lg font-bold text-gray-700 mb-6 uppercase tracking-wide text-sm border-t border-gray-100 pt-8">Articles in English ({enPosts.length})</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {enPosts.map((post) => <PostCard key={post.id} post={post} />)}
            </div>
          </>
        )}
      </section>
    </>
  );
}
