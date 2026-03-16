import Link from "next/link";
import { getRecentPosts, getAllServices } from "@/lib/data";
import PostCard from "@/components/PostCard";

export default function HomePage() {
  const recent = getRecentPosts(3);
  const services = getAllServices().slice(0, 4);

  return (
    <>
      {/* ─── HERO ─────────────────────────────────────────────────────── */}
      <section className="relative bg-[#0f172a] text-white overflow-hidden">
        <div className="absolute inset-0 bg-dot-pattern opacity-40 pointer-events-none" />
        <div className="relative max-w-5xl mx-auto px-4 py-24 md:py-32">
          <div className="inline-flex items-center gap-2 bg-[#1e293b] border border-[#334155] rounded-full px-4 py-1.5 mb-6">
            <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
            <span className="text-blue-300 text-xs font-medium tracking-wide uppercase">
              Doutorando UnB · Mentor Acadêmico
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6 max-w-3xl">
            Transforme sua formação em uma{" "}
            <span className="text-blue-400">carreira de impacto global</span>
          </h1>
          <p className="text-slate-300 text-lg md:text-xl max-w-2xl mb-8 leading-relaxed">
            Consultoria em Relações Internacionais — Mentoria Acadêmica e
            Carreira com Maurício Kenyatta, pesquisador e docente com mais de 11
            anos de trajetória.
          </p>
          <div className="flex flex-wrap gap-3 mb-12">
            <Link
              href="/servicos"
              className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-7 py-3.5 rounded-lg transition-colors shadow-lg shadow-blue-600/20"
            >
              Agendar Mentoria
            </Link>
            <Link
              href="/sobre"
              className="border border-slate-600 hover:border-slate-400 text-slate-200 hover:text-white font-medium px-7 py-3.5 rounded-lg transition-colors"
            >
              Conhecer o Autor
            </Link>
          </div>

          {/* Category tags */}
          <div className="flex flex-wrap gap-2">
            {[
              "Relações Internacionais",
              "Mentoria Acadêmica",
              "Metodologia",
              "Defesa de Tese",
              "Carreira Acadêmica",
              "Segurança Internacional",
            ].map((tag) => (
              <span
                key={tag}
                className="text-xs bg-[#1e293b] border border-[#334155] text-slate-400 px-3 py-1.5 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ─── STATS ────────────────────────────────────────────────────── */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4 py-12">
          <div className="grid grid-cols-3 gap-6 text-center">
            {[
              { value: "30+", label: "Artigos Publicados" },
              { value: "7", label: "Serviços de Mentoria" },
              { value: "11+", label: "Anos de Trajetória" },
            ].map((stat) => (
              <div key={stat.label} className="py-4">
                <div className="text-3xl md:text-4xl font-extrabold text-blue-600 mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-slate-500 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SERVICES PREVIEW ─────────────────────────────────────────── */}
      <section className="bg-slate-50 py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-2 block">
              Serviços
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 mb-3">
              Como posso te ajudar
            </h2>
            <p className="text-slate-500 max-w-xl mx-auto">
              Sessões personalizadas para cada fase da sua jornada acadêmica e
              profissional.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
            {services.map((service) => (
              <div
                key={service.id}
                className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 hover:shadow-md hover:border-blue-200 transition-all group"
              >
                <div className="flex items-start gap-4">
                  <div className="text-3xl w-12 h-12 flex items-center justify-center bg-blue-50 rounded-xl flex-shrink-0">
                    {service.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                        {service.category}
                      </span>
                      <span className="text-xs text-slate-400">
                        {service.duration} min
                      </span>
                    </div>
                    <h3 className="font-bold text-slate-900 text-base mb-1">
                      {service.name}
                    </h3>
                    <p className="text-slate-500 text-sm line-clamp-2 mb-3">
                      {service.tagline}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-blue-600 font-semibold text-sm">
                        {service.priceLabel}
                      </span>
                      <Link
                        href={`/servicos?agendar=${service.slug}`}
                        className="text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 px-3 py-1.5 rounded-lg transition-colors"
                      >
                        Agendar
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link
              href="/servicos"
              className="border-2 border-blue-600 text-blue-600 font-bold px-8 py-3 rounded-lg hover:bg-blue-600 hover:text-white transition-colors inline-block"
            >
              Ver todos os serviços ({getAllServices().length})
            </Link>
          </div>
        </div>
      </section>

      {/* ─── BLOG PREVIEW ─────────────────────────────────────────────── */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-end justify-between mb-10">
            <div>
              <span className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-2 block">
                Blog
              </span>
              <h2 className="text-3xl font-extrabold text-slate-900">
                Artigos Recentes
              </h2>
            </div>
            <Link
              href="/blog"
              className="text-blue-600 font-semibold hover:underline text-sm hidden md:block"
            >
              Ver todos →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
            {recent.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>

          <div className="text-center md:hidden">
            <Link
              href="/blog"
              className="text-blue-600 font-semibold hover:underline"
            >
              Ver todos os artigos →
            </Link>
          </div>
        </div>
      </section>

      {/* ─── ABOUT TEASER ─────────────────────────────────────────────── */}
      <section className="bg-[#0f172a] text-white py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Photo placeholder */}
            <div className="flex justify-center">
              <div className="w-64 h-64 rounded-2xl bg-[#1e293b] border border-[#334155] flex flex-col items-center justify-center gap-3">
                <div className="w-20 h-20 rounded-full bg-[#334155] flex items-center justify-center text-4xl">
                  MK
                </div>
                <div className="text-slate-400 text-sm text-center px-4">
                  Maurício Kenyatta
                  <br />
                  <span className="text-xs text-slate-500">
                    Doutorando UnB
                  </span>
                </div>
              </div>
            </div>
            {/* Bio excerpt */}
            <div>
              <span className="text-xs font-bold text-blue-400 uppercase tracking-widest mb-3 block">
                Sobre
              </span>
              <h2 className="text-3xl font-extrabold mb-5">Maurício Kenyatta</h2>
              <p className="text-slate-300 leading-relaxed mb-4 text-sm md:text-base">
                Doutorando em Relações Internacionais pela UnB, mestre e
                graduado na mesma área. Com mais de 11 anos de trajetória
                acadêmica, minha atuação se baseia em três pilares: o ensino
                universitário, a pesquisa de alto impacto e a mentoria
                personalizada.
              </p>
              <p className="text-slate-400 leading-relaxed mb-6 text-sm">
                Coordenador de pesquisa no GEPSI-UnB, docente universitário no
                UDF e pesquisador no IPEA. Ativista do Movimento Negro
                Unificado.
              </p>
              <Link
                href="/sobre"
                className="text-blue-400 hover:text-blue-300 font-semibold transition-colors"
              >
                Sobre Maurício →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CTA FINAL ────────────────────────────────────────────────── */}
      <section className="bg-blue-600 py-20 px-4 text-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
            Pronto para transformar sua carreira?
          </h2>
          <p className="text-blue-100 mb-8 text-lg">
            Agende uma sessão de mentoria personalizada e dê o próximo passo
            com clareza e segurança.
          </p>
          <Link
            href="/servicos"
            className="bg-white text-blue-600 font-bold px-8 py-4 rounded-lg hover:bg-blue-50 transition-colors inline-block shadow-lg"
          >
            Agendar Mentoria
          </Link>
        </div>
      </section>
    </>
  );
}
