"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import ArtworkEditor from "@/components/admin/ArtworkEditor";
import type { Artwork } from "@/lib/types";

export default function EditArtePage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [artwork, setArtwork] = useState<Artwork | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      const supabase = createClient();
      if (!supabase) { setLoading(false); return; }
      const { data } = await supabase
        .from("mk_artwork")
        .select("*")
        .eq("id", id)
        .single<Artwork>();
      setArtwork(data ?? null);
      setLoading(false);
    }
    load();
  }, [id]);

  async function handleSave(data: Partial<Artwork>) {
    setSaving(true);
    setError("");
    try {
      const supabase = createClient();
      if (!supabase) throw new Error("Supabase não configurado");

      const { error: err } = await supabase
        .from("mk_artwork")
        .update(data)
        .eq("id", id);
      if (err) throw err;
      router.push("/admin/arte");
      router.refresh();
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Erro ao salvar obra");
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!artwork) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-10 text-center">
        <p className="text-slate-500">Obra não encontrada.</p>
        <Link href="/admin/arte" className="mt-4 inline-block text-blue-600 font-semibold">
          ← Voltar
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <div className="mb-6">
        <Link href="/admin/arte" className="text-sm text-slate-500 hover:text-slate-700">
          ← Voltar para Arte
        </Link>
      </div>
      <h1 className="text-2xl font-extrabold text-slate-900 mb-8">Editar Obra</h1>
      {error && (
        <div className="mb-5 bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 text-sm">
          {error}
        </div>
      )}
      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <ArtworkEditor
          artwork={artwork}
          onSave={handleSave}
          onCancel={() => router.push("/admin/arte")}
          saving={saving}
        />
      </div>
    </div>
  );
}
