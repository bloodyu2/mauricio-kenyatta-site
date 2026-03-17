"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import type { Service } from "@/lib/types";
import AgendarDrawer from "./booking/AgendarDrawer";
import ServiceDetailSheet from "./ServiceDetailSheet";
import {
  GraduationCap,
  Zap,
  FileText,
  FlaskConical,
  FileCheck,
  PenLine,
  BookOpen,
  ClipboardList,
  Trophy,
  Sparkles,
} from "lucide-react";

const SERVICE_ICON_MAP: Record<string, React.ElementType> = {
  "mentoria-academica-completa": GraduationCap,
  "mentoria-express": Zap,
  "revisao-de-projetos": FileText,
  "consultoria-em-metodologia": FlaskConical,
  "revisao-de-artigo-cientifico": FileCheck,
  "suporte-escrita-capitulo": PenLine,
  "estruturacao-marco-teorico": BookOpen,
  "acompanhamento-de-fase": ClipboardList,
  "preparacao-defesa": Trophy,
  "definicao-metodologia": FlaskConical,
};

interface ServicosClientProps {
  services: Service[];
}

const CATEGORY_COLORS: Record<string, string> = {
  Mentoria: "bg-blue-50 text-blue-700 border-blue-200",
  Escrita: "bg-purple-50 text-purple-700 border-purple-200",
  Defesa: "bg-amber-50 text-amber-700 border-amber-200",
  Metodologia: "bg-green-50 text-green-700 border-green-200",
};

function categoryClass(cat: string) {
  return CATEGORY_COLORS[cat] ?? "bg-slate-50 text-slate-700 border-slate-200";
}

export default function ServicosClient({ services }: ServicosClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [activeService, setActiveService] = useState<Service | null>(null);
  const [detailService, setDetailService] = useState<Service | null>(null);

  // Sincronizar ?agendar=slug com estado
  useEffect(() => {
    const slug = searchParams.get("agendar");
    if (slug) {
      const found = services.find((s) => s.slug === slug);
      setActiveService(found ?? null);
    } else {
      setActiveService(null);
    }
  }, [searchParams, services]);

  // Sincronizar ?ver=slug com estado
  useEffect(() => {
    const slug = searchParams.get("ver");
    if (slug) {
      const found = services.find((s) => s.slug === slug);
      setDetailService(found ?? null);
    } else {
      setDetailService(null);
    }
  }, [searchParams, services]);

  function openDetail(service: Service) {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("agendar");
    params.set("ver", service.slug);
    router.push(`?${params.toString()}`, { scroll: false });
  }

  function closeDetail() {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("ver");
    const qs = params.toString();
    router.push(qs ? `?${qs}` : "/servicos", { scroll: false });
  }

  function openDrawer(service: Service) {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("ver");
    params.set("agendar", service.slug);
    router.push(`?${params.toString()}`, { scroll: false });
  }

  function closeDrawer() {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("agendar");
    const qs = params.toString();
    router.push(qs ? `?${qs}` : "/servicos", { scroll: false });
    setActiveService(null);
  }

  const categories = Array.from(new Set(services.map((s) => s.category)));

  return (
    <>
      {/* Category filter */}
      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map((cat) => (
          <span
            key={cat}
            className={`text-xs font-semibold border px-3 py-1.5 rounded-full ${categoryClass(cat)}`}
          >
            {cat}
          </span>
        ))}
      </div>

      {/* Services grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {services.map((service) => (
          <div
            key={service.id}
            className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 hover:shadow-md hover:border-blue-200 transition-all flex flex-col"
          >
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 flex items-center justify-center bg-blue-50 rounded-xl flex-shrink-0">
                {(() => { const Icon = SERVICE_ICON_MAP[service.id] ?? Sparkles; return <Icon size={22} className="text-[#f59e0b]" />; })()}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span
                    className={`text-xs font-semibold border px-2 py-0.5 rounded ${categoryClass(service.category)}`}
                  >
                    {service.category}
                  </span>
                  <span className="text-xs text-slate-400">
                    {service.duration} min
                  </span>
                </div>
                <h3 className="font-bold text-slate-900 text-base leading-tight">
                  {service.name}
                </h3>
              </div>
            </div>

            <p className="text-blue-700 font-medium text-sm italic mb-2">
              {service.tagline}
            </p>

            <p className="text-slate-500 text-sm leading-relaxed flex-1 mb-5">
              {service.description}
            </p>

            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <span className="text-blue-600 font-bold text-base">
                {service.priceLabel}
              </span>
              <button
                type="button"
                onClick={() => openDetail(service)}
                className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-5 py-2 rounded-lg text-sm transition-colors shadow-sm shadow-blue-600/20"
              >
                Ver detalhes
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Service Detail Sheet */}
      {detailService && (
        <ServiceDetailSheet
          service={detailService}
          onClose={closeDetail}
          onBook={() => openDrawer(detailService)}
        />
      )}

      {/* Booking drawer */}
      <AgendarDrawer service={activeService} onClose={closeDrawer} />
    </>
  );
}
