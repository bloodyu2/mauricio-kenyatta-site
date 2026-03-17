import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import type { Artwork } from "@/lib/types";
import { SITE_URL } from "@/lib/data";
import { WHATSAPP_NUMBER } from "@/lib/constants";
import { Palette, Package, MessageCircle } from "lucide-react";

export const revalidate = 60;

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const supabase = await createClient();
  if (!supabase) return {};

  const { data } = await supabase
    .from("mk_artwork")
    .select("title, description, image_url")
    .eq("slug", slug)
    .eq("active", true)
    .single();

  if (!data) return { title: "Arte não encontrada" };

  return {
    title: `${data.title} — Arte | Maurício Kenyatta`,
    description: data.description ?? `Obra de arte original de Maurício Kenyatta: ${data.title}`,
    alternates: { canonical: `${SITE_URL}/arte/${slug}` },
    openGraph: {
      title: data.title,
      description: data.description ?? "",
      type: "article",
      images: [{ url: data.image_url }],
    },
  };
}

function buildPurchaseMessage(artwork: Artwork): string {
  const lines = [
    `Olá, Maurício! Tenho interesse em adquirir uma obra de arte. 🎨`,
    ``,
    `🖼️ *Obra:* ${artwork.title}`,
    `💰 *Valor:* ${artwork.price_label}`,
    `🔗 *Link:* ${SITE_URL}/arte/${artwork.slug}`,
    ``,
    `Poderia me dar mais informações sobre a obra e formas de pagamento?`,
  ];
  return lines.join("\n");
}

export default async function ArtePage({ params }: Props) {
  const { slug } = await params;
  const supabase = await createClient();
  if (!supabase) notFound();

  const { data: artwork } = await supabase
    .from("mk_artwork")
    .select("*")
    .eq("slug", slug)
    .eq("active", true)
    .single<Artwork>();

  if (!artwork) notFound();

  const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(buildPurchaseMessage(artwork))}`;

  return (
    <>
      <section className="max-w-5xl mx-auto px-4 py-12">
        <Link
          href="/arte"
          className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-blue-600 mb-8 transition-colors"
        >
          ← Voltar para Arte
        </Link>

        <div className="grid md:grid-cols-2 gap-10 items-start">
          {/* Image */}
          <div className="relative aspect-square rounded-2xl overflow-hidden bg-slate-100 shadow-md">
            <Image
              src={artwork.image_url}
              alt={artwork.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              unoptimized
              priority
            />
          </div>

          {/* Info */}
          <div className="sticky top-24">
            <div className="mb-2">
              <span className="text-xs font-semibold uppercase tracking-wide text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
                Arte Original
              </span>
            </div>
            <h1 className="text-3xl font-extrabold text-slate-900 mt-3 mb-2">
              {artwork.title}
            </h1>
            <p className="text-2xl font-extrabold text-blue-600 mb-4">
              {artwork.price_label}
            </p>

            {artwork.description && (
              <p className="text-slate-600 leading-relaxed mb-6 whitespace-pre-line">
                {artwork.description}
              </p>
            )}

            {/* Availability */}
            <div className="flex items-center gap-2 mb-6">
              <div
                className={`w-2 h-2 rounded-full ${
                  artwork.quantity > 0 ? "bg-green-500" : "bg-red-500"
                }`}
              />
              <span
                className={`text-sm font-semibold ${
                  artwork.quantity > 0 ? "text-green-700" : "text-red-700"
                }`}
              >
                {artwork.quantity === 0
                  ? "Esgotado"
                  : artwork.quantity === 1
                  ? "Última unidade!"
                  : `${artwork.quantity} unidades disponíveis`}
              </span>
            </div>

            {/* Purchase button */}
            {artwork.quantity > 0 ? (
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-3 bg-[#25d366] hover:bg-[#1ebe5d] text-white font-extrabold py-4 rounded-xl transition-colors text-base shadow-sm shadow-green-500/20"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Comprar pelo WhatsApp
              </a>
            ) : (
              <button
                disabled
                className="w-full flex items-center justify-center bg-slate-100 text-slate-400 font-extrabold py-4 rounded-xl text-base cursor-not-allowed"
              >
                Indisponível no momento
              </button>
            )}

            <p className="text-center text-xs text-slate-400 mt-3">
              Você será redirecionado para o WhatsApp com os dados da obra prontos.
            </p>

            <div className="mt-6 bg-slate-50 rounded-xl border border-slate-200 p-4 text-sm text-slate-600 space-y-1.5">
              <div className="flex items-start gap-2">
                <Palette size={16} className="text-[#f59e0b] flex-shrink-0 mt-0.5" />
                <span>Obra original criada por Maurício Kenyatta</span>
              </div>
              <div className="flex items-start gap-2">
                <Package size={16} className="text-[#f59e0b] flex-shrink-0 mt-0.5" />
                <span>Combinações de entrega/retirada tratadas diretamente</span>
              </div>
              <div className="flex items-start gap-2">
                <MessageCircle size={16} className="text-[#f59e0b] flex-shrink-0 mt-0.5" />
                <span>Dúvidas e encomendas via WhatsApp</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
