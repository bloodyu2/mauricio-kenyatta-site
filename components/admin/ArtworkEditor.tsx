"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { createClient } from "@/lib/supabase/client";
import type { Artwork } from "@/lib/types";

interface ArtworkFormData {
  title: string;
  slug: string;
  description: string;
  price_cents: number;
  price_label: string;
  quantity: number;
  active: boolean;
  image_url: string;
}

interface Props {
  artwork?: Artwork;
  onSave: (data: Partial<Artwork>) => Promise<void>;
  onCancel: () => void;
  saving: boolean;
}

function slugify(str: string) {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function formatCurrency(cents: number) {
  return `R$${(cents / 100).toFixed(2).replace(".", ",")}`;
}

export default function ArtworkEditor({ artwork, onSave, onCancel, saving }: Props) {
  const [form, setForm] = useState<ArtworkFormData>({
    title: artwork?.title ?? "",
    slug: artwork?.slug ?? "",
    description: artwork?.description ?? "",
    price_cents: artwork?.price_cents ?? 0,
    price_label: artwork?.price_label ?? "",
    quantity: artwork?.quantity ?? 1,
    active: artwork?.active ?? true,
    image_url: artwork?.image_url ?? "",
  });
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [slugEdited, setSlugEdited] = useState(!!artwork);
  const fileRef = useRef<HTMLInputElement>(null);

  function handleTitleChange(title: string) {
    setForm(prev => ({
      ...prev,
      title,
      slug: slugEdited ? prev.slug : slugify(title),
    }));
  }

  function handlePriceCentsChange(val: string) {
    const cents = Math.round(parseFloat(val.replace(",", ".")) * 100) || 0;
    const label = cents > 0 ? formatCurrency(cents) : "";
    setForm(prev => ({ ...prev, price_cents: cents, price_label: label }));
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadError("");
    setUploading(true);

    try {
      const supabase = createClient();
      if (!supabase) throw new Error("Supabase não configurado");

      const ext = file.name.split(".").pop();
      const fileName = `${Date.now()}-${slugify(form.title || "artwork")}.${ext}`;

      const { error: uploadErr } = await supabase.storage
        .from("mk-artwork")
        .upload(fileName, file, { upsert: true });

      if (uploadErr) throw uploadErr;

      const { data: { publicUrl } } = supabase.storage
        .from("mk-artwork")
        .getPublicUrl(fileName);

      setForm(prev => ({ ...prev, image_url: publicUrl }));
    } catch (err: unknown) {
      setUploadError(err instanceof Error ? err.message : "Erro ao fazer upload");
    } finally {
      setUploading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    await onSave(form);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Title */}
      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-1">
          Título <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          required
          value={form.title}
          onChange={e => handleTitleChange(e.target.value)}
          placeholder="Nome da obra"
          className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Slug */}
      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-1">Slug</label>
        <input
          type="text"
          required
          value={form.slug}
          onChange={e => { setForm(prev => ({ ...prev, slug: e.target.value })); setSlugEdited(true); }}
          placeholder="slug-da-obra"
          className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-1">Descrição</label>
        <textarea
          rows={4}
          value={form.description}
          onChange={e => setForm(prev => ({ ...prev, description: e.target.value }))}
          placeholder="Descreva a obra, técnica utilizada, dimensões..."
          className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
        />
      </div>

      {/* Price */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1">
            Preço (R$) <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            required
            min="0"
            step="0.01"
            value={form.price_cents > 0 ? (form.price_cents / 100).toFixed(2) : ""}
            onChange={e => handlePriceCentsChange(e.target.value)}
            placeholder="0,00"
            className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {form.price_label && (
            <p className="text-xs text-blue-600 mt-1 font-semibold">{form.price_label}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1">
            Quantidade
          </label>
          <input
            type="number"
            required
            min="0"
            value={form.quantity}
            onChange={e => setForm(prev => ({ ...prev, quantity: parseInt(e.target.value) || 0 }))}
            className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Image */}
      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-1">Imagem</label>
        <div className="space-y-3">
          {form.image_url && (
            <div className="relative w-32 h-32 rounded-xl overflow-hidden border border-gray-200">
              <Image
                src={form.image_url}
                alt="Preview"
                fill
                className="object-cover"
                unoptimized
              />
            </div>
          )}
          <div className="flex gap-3 items-start">
            <input
              type="text"
              value={form.image_url}
              onChange={e => setForm(prev => ({ ...prev, image_url: e.target.value }))}
              placeholder="URL da imagem ou faça upload →"
              className="flex-1 border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              disabled={uploading}
              className="flex-none px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-sm font-semibold transition-colors disabled:opacity-50"
            >
              {uploading ? "Enviando..." : "Upload"}
            </button>
          </div>
          <input ref={fileRef} type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
          {uploadError && <p className="text-red-500 text-xs">{uploadError}</p>}
        </div>
      </div>

      {/* Active */}
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          id="active"
          checked={form.active}
          onChange={e => setForm(prev => ({ ...prev, active: e.target.checked }))}
          className="w-4 h-4 accent-blue-600"
        />
        <label htmlFor="active" className="text-sm font-semibold text-slate-700">
          Ativo (visível no site)
        </label>
      </div>

      {/* Actions */}
      <div className="flex gap-3 pt-2">
        <button
          type="button"
          onClick={onCancel}
          className="flex-none px-5 py-3 border border-gray-200 rounded-lg text-sm font-bold text-slate-600 hover:bg-slate-50 transition-colors"
        >
          Cancelar
        </button>
        <button
          type="submit"
          disabled={saving || !form.title || !form.image_url || form.price_cents <= 0}
          className="flex-1 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg text-sm transition-colors disabled:opacity-50"
        >
          {saving ? "Salvando..." : artwork ? "Salvar alterações" : "Criar obra"}
        </button>
      </div>
    </form>
  );
}
