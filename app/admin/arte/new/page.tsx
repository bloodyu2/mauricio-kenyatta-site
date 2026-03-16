"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import ArtworkEditor from "@/components/admin/ArtworkEditor";
import type { Artwork } from "@/lib/types";

export default function NewArtePage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function handleSave(data: Partial<Artwork>) {
    setSaving(true);
    setError("");
    try {
      const supabase = createClient();
      if (!supabase) throw new Error("Supabase não configurado");

      const { error: err } = await supabase.from("mk_artwork").insert([data]);
      if (err) throw err;
      router.push("/admin/arte");
      router.refresh();
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Erro ao criar obra");
      setSaving(false);
    }
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <div className="mb-6">
        <Link href="/admin/arte" className="text-sm text-slate-500 hover:text-slate-700">
          ← Voltar para Arte
        </Link>
      </div>
      <h1 className="text-2xl font-extrabold text-slate-900 mb-8">Nova Obra</h1>
      {error && (
        <div className="mb-5 bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 text-sm">
          {error}
        </div>
      )}
      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <ArtworkEditor
          onSave={handleSave}
          onCancel={() => router.push("/admin/arte")}
          saving={saving}
        />
      </div>
    </div>
  );
}
