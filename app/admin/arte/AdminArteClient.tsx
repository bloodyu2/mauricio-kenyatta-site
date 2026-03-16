"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import type { Artwork } from "@/lib/types";
import { createClient } from "@/lib/supabase/client";

interface Props {
  artworks: Artwork[];
}

export default function AdminArteClient({ artworks: initial }: Props) {
  const [artworks, setArtworks] = useState<Artwork[]>(initial);
  const [deleting, setDeleting] = useState<string | null>(null);

  async function handleToggleActive(artwork: Artwork) {
    const supabase = createClient();
    if (!supabase) return;
    const { data } = await supabase
      .from("mk_artwork")
      .update({ active: !artwork.active })
      .eq("id", artwork.id)
      .select()
      .single<Artwork>();
    if (data) setArtworks(prev => prev.map(a => a.id === data.id ? data : a));
  }

  async function handleDelete(id: string) {
    if (!confirm("Tem certeza que deseja excluir esta obra? Esta ação não pode ser desfeita.")) return;
    setDeleting(id);
    const supabase = createClient();
    if (!supabase) { setDeleting(null); return; }
    const { error } = await supabase.from("mk_artwork").delete().eq("id", id);
    if (!error) setArtworks(prev => prev.filter(a => a.id !== id));
    setDeleting(null);
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900">Arte</h1>
          <p className="text-slate-500 text-sm mt-1">{artworks.length} obra{artworks.length !== 1 ? "s" : ""} cadastrada{artworks.length !== 1 ? "s" : ""}</p>
        </div>
        <Link
          href="/admin/arte/new"
          className="bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm px-4 py-2.5 rounded-lg transition-colors flex items-center gap-2"
        >
          + Nova Obra
        </Link>
      </div>

      {/* Back to admin */}
      <div className="mb-6">
        <Link href="/admin/blog" className="text-sm text-slate-500 hover:text-slate-700">
          ← Painel Blog
        </Link>
      </div>

      {artworks.length === 0 ? (
        <div className="text-center py-20 bg-slate-50 rounded-2xl border border-gray-200">
          <p className="text-5xl mb-4">🎨</p>
          <p className="text-slate-600 font-semibold">Nenhuma obra cadastrada ainda.</p>
          <Link href="/admin/arte/new" className="mt-4 inline-block bg-blue-600 text-white font-bold px-5 py-2.5 rounded-lg text-sm hover:bg-blue-500 transition-colors">
            Criar primeira obra
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {artworks.map(artwork => (
            <div key={artwork.id} className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
              {/* Image */}
              <div className="relative aspect-video bg-slate-100">
                {artwork.image_url && (
                  <Image
                    src={artwork.image_url}
                    alt={artwork.title}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                )}
                {!artwork.active && (
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <span className="bg-slate-800 text-white text-xs font-bold px-2 py-1 rounded-full">Inativo</span>
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="p-4">
                <h3 className="font-extrabold text-slate-900 text-sm mb-1 line-clamp-1">{artwork.title}</h3>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-blue-600 font-bold text-sm">{artwork.price_label}</span>
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                    artwork.quantity === 0 ? "bg-red-50 text-red-600" : "bg-green-50 text-green-600"
                  }`}>
                    {artwork.quantity === 0 ? "Esgotado" : `${artwork.quantity} un.`}
                  </span>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <Link
                    href={`/admin/arte/${artwork.id}`}
                    className="flex-1 text-center py-2 border border-gray-200 rounded-lg text-xs font-bold text-slate-600 hover:bg-slate-50 transition-colors"
                  >
                    Editar
                  </Link>
                  <button
                    type="button"
                    onClick={() => handleToggleActive(artwork)}
                    className={`flex-1 py-2 rounded-lg text-xs font-bold transition-colors ${
                      artwork.active
                        ? "bg-amber-50 text-amber-700 hover:bg-amber-100"
                        : "bg-green-50 text-green-700 hover:bg-green-100"
                    }`}
                  >
                    {artwork.active ? "Desativar" : "Ativar"}
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(artwork.id)}
                    disabled={deleting === artwork.id}
                    className="py-2 px-3 rounded-lg text-xs font-bold bg-red-50 text-red-600 hover:bg-red-100 transition-colors disabled:opacity-50"
                  >
                    {deleting === artwork.id ? "..." : "🗑"}
                  </button>
                </div>

                {/* Public link */}
                <Link
                  href={`/arte/${artwork.slug}`}
                  target="_blank"
                  className="mt-2 block text-center text-xs text-slate-400 hover:text-blue-500 transition-colors"
                >
                  Ver página pública →
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
