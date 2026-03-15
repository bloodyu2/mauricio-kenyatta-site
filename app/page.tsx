import Link from "next/link";
import { getRecentPosts, getFeaturedPost, SITE_DESCRIPTION } from "@/lib/data";
import PostCard from "@/components/PostCard";

export default function HomePage() {
  const featured = getFeaturedPost();
  const recent = getRecentPosts(7).filter((p) => p.id !== featured?.id).slice(0, 6);
  return (
    <>
      <section className="bg-gray-900 text-white py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <p className="text-slate-400 text-sm uppercase tracking-widest mb-3">Professor de Relações Internacionais</p>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-5 leading-tight">Maurício Kenyatta</h1>
          <p className="text-slate-300 text-lg max-w-2xl mb-8 leading-relaxed">{SITE_DESCRIPTION}</p>
          <div className="flex flex-wrap gap-3">
            <Link href="/blog" className="bg-white text-gray-900 font-bold px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors">Leia os artigos →</Link>
            <Link href="/sobre" className="border border-white/30 text-white font-medium px-6 py-3 rounded-lg hover:bg-white/10 transition-colors">Sobre o autor</Link>
          </div>
        </div>
      </section>
      <section className="bg-slate-50 py-5 px-4 border-b border-gray-100">
        <div className="max-w-5xl mx-auto flex flex-wrap gap-2 justify-center">
          {["Análise Internacional","Geopolítica","Política Internacional","Diplomacia Brasileira","Estratégia Global","Segurança e Conflitos"].map((tag) => (
            <span key={tag} className="text-xs bg-white border border-gray-200 text-gray-600 px-3 py-1.5 rounded-full">{tag}</span>
          ))}
        </div>
      </section>
      <section className="py-14 px-4">
        <div className="max-w-5xl mx-auto">
          {featured && (
            <div className="mb-10">
              <div className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Destaque</div>
              <PostCard post={featured} featured />
            </div>
          )}
          <h2 className="text-xl font-bold text-gray-900 mb-6">Artigos Recentes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {recent.map((post) => <PostCard key={post.id} post={post} />)}
          </div>
          <div className="text-center mt-10">
            <Link href="/blog" className="border-2 border-gray-800 text-gray-800 font-bold px-8 py-3 rounded-lg hover:bg-gray-800 hover:text-white transition-colors">Ver todos os artigos →</Link>
          </div>
        </div>
      </section>
      <section className="py-14 px-4 bg-slate-50 border-t border-gray-100">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Sobre o autor</h2>
          <p className="text-gray-600 mb-6 leading-relaxed">Maurício Kenyatta é professor e analista de relações internacionais, com foco em geopolítica, diplomacia brasileira e política comparada. Escreve sobre os grandes temas da ordem mundial contemporânea.</p>
          <Link href="/sobre" className="text-gray-800 font-semibold hover:underline">Conheça mais →</Link>
        </div>
      </section>
    </>
  );
}
