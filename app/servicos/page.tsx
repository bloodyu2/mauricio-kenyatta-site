import type { Metadata } from "next";
import { Suspense } from "react";
import { getAllServices, SITE_URL } from "@/lib/data";
import { servicePageSchema } from "@/lib/schema";
import ServicosClient from "@/components/ServicosClient";

export const metadata: Metadata = {
  title: "Serviços de Mentoria",
  description:
    "Conheça os serviços de mentoria acadêmica e consultoria em Relações Internacionais oferecidos por Maurício Kenyatta. Agende sua sessão.",
  alternates: {
    canonical: `${SITE_URL}/servicos`,
  },
  openGraph: {
    title: "Serviços de Mentoria — Maurício Kenyatta",
    description:
      "Mentoria personalizada para cada fase da sua jornada acadêmica. Do projeto à defesa.",
  },
};

export default function ServicosPage() {
  const services = getAllServices();
  const jsonLd = servicePageSchema();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <section className="relative bg-[#0f172a] text-white overflow-hidden">
        <div className="absolute inset-0 bg-dot-pattern opacity-40 pointer-events-none" />
        <div className="relative max-w-5xl mx-auto px-4 py-16 md:py-22 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1e293b] border border-[#334155] rounded-full px-4 py-1.5 mb-5">
            <span className="text-blue-300 text-xs font-medium tracking-wide uppercase">
              {services.length} serviços disponíveis
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
            Serviços de Mentoria
          </h1>
          <p className="text-slate-300 max-w-xl mx-auto text-lg">
            Acompanhamento personalizado para cada fase da sua jornada acadêmica
            e profissional.
          </p>
        </div>
      </section>

      {/* Services list */}
      <section className="py-16 px-4 max-w-5xl mx-auto">
        <Suspense fallback={<div className="text-slate-400 text-center py-12">Carregando...</div>}>
          <ServicosClient services={services} />
        </Suspense>
      </section>

      {/* CTA */}
      <section className="bg-slate-50 border-t border-gray-100 py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-extrabold text-slate-900 mb-3">
            Não sabe qual serviço escolher?
          </h2>
          <p className="text-slate-500 mb-6">
            Entre em contato e me conte sobre sua pesquisa. Juntos encontramos o
            melhor caminho.
          </p>
          <a
            href="mailto:mauricio@kenyatta.com.br?subject=Dúvida%20sobre%20serviços%20de%20mentoria"
            className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-7 py-3.5 rounded-lg transition-colors inline-block"
          >
            Falar com Maurício
          </a>
        </div>
      </section>
    </>
  );
}
