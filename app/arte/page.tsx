import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import type { Artwork } from "@/lib/types";
import { SITE_URL } from "@/lib/data";
import { Palette } from "lucide-react";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Arte — Maurício Kenyatta",
  description:
    "Obras de arte criadas por Maurício Kenyatta — artivista, poeta e ativista do Movimento Negro Unificado. Adquira uma obra original.",
  alternates: { canonical: `${SITE_URL}/arte` },
  openGraph: {
    title: "Arte — Maurício Kenyatta",
    description: "Obras de arte originais criadas por Maurício Kenyatta.",
    type: "website",
  },
};

export default async function ArtePage() {
  const supabase = await createClient();
  let artworks: Artwork[] = [];

  if (supabase) {
    const { data } = await supabase
      .from("mk_artwork")
      .select("*")
      .eq("active", true)
      .order("created_at", { ascending: false });
    artworks = data ?? [];
  }

  return (
    <>
      {/* Hero */}
      <section className="relative bg-[#0f172a] text-white overflow-hidden">
        <div className="absolute inset-0 bg-dot-pattern opacity-40 pointer-events-none" />
        <div className="relative max-w-5xl mx-auto px-4 py-20 md:py-24 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1e293b] border border-[#334155] rounded-full px-4 py-1.5 mb-6">
            <span className="text-blue-300 text-xs font-medium tracking-wide uppercase">
              Artivismo · Poesia · Movimento Negro
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Arte</h1>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto">
            Obras originais criadas por Maurício Kenyatta. Arte como instrumento
            de luta, memória e identidade.
          </p>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-16 px-4 max-w-6xl mx-auto">
        {artworks.length === 0 ? (
          <div className="text-center py-20 text-slate-400">
            <div className="flex justify-center mb-4"><Palette size={52} className="text-[#f59e0b] opacity-60" /></div>
            <p className="text-lg font-semibold">Nenhuma obra disponível no momento.</p>
            <p className="text-sm mt-2">Volte em breve para conferir as novidades.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {artworks.map((artwork) => (
              <Link
                key={artwork.id}
                href={`/arte/${artwork.slug}`}
                className="group bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden hover:border-blue-200 hover:shadow-md transition-all"
              >
                <div className="relative aspect-square overflow-hidden bg-slate-100">
                  <Image
                    src={artwork.image_url}
                    alt={artwork.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    unoptimized
                  />
                  {artwork.quantity === 0 && (
                    <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                      Esgotado
                    </div>
                  )}
                  {artwork.quantity > 0 && artwork.quantity <= 3 && (
                    <div className="absolute top-3 left-3 bg-amber-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                      Últimas {artwork.quantity} unidade{artwork.quantity > 1 ? "s" : ""}
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h2 className="font-extrabold text-slate-900 text-base mb-1 group-hover:text-blue-600 transition-colors line-clamp-1">
                    {artwork.title}
                  </h2>
                  {artwork.description && (
                    <p className="text-slate-500 text-sm line-clamp-2 mb-3">
                      {artwork.description}
                    </p>
                  )}
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-blue-600 text-lg">
                      {artwork.price_label}
                    </span>
                    <span
                      className={`text-xs font-semibold px-2 py-1 rounded-full ${
                        artwork.quantity === 0
                          ? "bg-red-50 text-red-600"
                          : "bg-green-50 text-green-600"
                      }`}
                    >
                      {artwork.quantity === 0 ? "Esgotado" : "Disponível"}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* CTA */}
      <section className="bg-slate-50 border-t border-gray-200 py-16 px-4 text-center">
        <p className="text-slate-600 text-base max-w-xl mx-auto">
          Interessado em uma obra ou encomenda personalizada? Entre em contato diretamente.
        </p>
        <Link
          href="/contato"
          className="mt-6 inline-block bg-blue-600 hover:bg-blue-500 text-white font-bold px-8 py-3 rounded-lg transition-colors"
        >
          Falar com Maurício
        </Link>
      </section>
    </>
  );
}
