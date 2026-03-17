import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SITE_URL } from "@/lib/data";
import { GraduationCap, FlaskConical, BookOpen, BarChart3, Trophy } from "lucide-react";

export const metadata: Metadata = {
  title: "Sobre",
  description:
    "Conheça Maurício Kenyatta — doutorando em Relações Internacionais pela UnB, docente universitário, pesquisador no IPEA e mentor acadêmico com mais de 11 anos de trajetória.",
  alternates: {
    canonical: `${SITE_URL}/sobre`,
  },
  openGraph: {
    title: "Sobre — Maurício Kenyatta",
    description:
      "Doutorando em RI pela UnB, mestre e graduado na mesma área. Mentor acadêmico, docente universitário e pesquisador.",
    type: "profile",
  },
};

const qualifications = [
  {
    Icon: GraduationCap,
    title: "Doutorando em RI pela UnB",
    detail:
      "Com período sanduíche na Universidade de Gante, Bélgica",
  },
  {
    Icon: GraduationCap,
    title: "Mestre em RI pela UnB",
    detail: "Foco em Segurança e Defesa na Fronteira",
  },
  {
    Icon: FlaskConical,
    title: "Coordenador de Pesquisa — GEPSI-UnB",
    detail: "Grupo de Estudos e Pesquisa em Segurança Internacional",
  },
  {
    Icon: BookOpen,
    title: "Docente Universitário — Centro Universitário UDF",
    detail:
      "Segurança Internacional, Análise de Política Externa Brasileira, Integração Regional",
  },
  {
    Icon: BarChart3,
    title: "Pesquisador — IPEA",
    detail: "Políticas para fronteiras, defesa e indústria nacional",
  },
  {
    Icon: Trophy,
    title: "Prêmio: Melhor Pôster",
    detail: "I Encontro Distrital da ABED",
  },
];

const areasTemas = [
  "Geopolítica e Estratégia Global",
  "Diplomacia Brasileira e Política Externa",
  "Segurança Internacional e Conflitos",
  "Integração Regional na América Latina e África",
  "Fronteiras e Cooperação Regional",
  "Metodologia de Pesquisa em RI",
  "Antirracismo e Movimento Negro",
  "Paz, Direitos Humanos e Direito Internacional",
];

export default function SobrePage() {
  return (
    <>
      {/* ─── HERO ───────────────────────────────────────────────────── */}
      <section className="relative bg-[#0f172a] text-white overflow-hidden">
        <div className="absolute inset-0 bg-dot-pattern opacity-40 pointer-events-none" />
        <div className="relative max-w-5xl mx-auto px-4 py-20 md:py-28 text-center">
          <div className="flex justify-center mb-6">
            <Image
              src="https://static.wixstatic.com/media/5b09da_ae7d684af51744649a2b895899b32111~mv2.jpg"
              alt="Maurício Kenyatta"
              width={120}
              height={120}
              className="rounded-full object-cover border-4 border-blue-500 shadow-xl"
              unoptimized
            />
          </div>
          <div className="inline-flex items-center gap-2 bg-[#1e293b] border border-[#334155] rounded-full px-4 py-1.5 mb-6">
            <span className="text-blue-300 text-xs font-medium tracking-wide uppercase">
              Doutorando UnB · Docente · Pesquisador
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
            Maurício Kenyatta
          </h1>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto">
            Relações Internacionais, Mentoria Acadêmica e Compromisso com a
            Diversidade
          </p>
        </div>
      </section>

      {/* ─── BIO ────────────────────────────────────────────────────── */}
      <section className="py-16 px-4 max-w-3xl mx-auto">
        <div className="mb-10">
          <h2 className="text-2xl font-extrabold text-slate-900 mb-5">
            Sobre
          </h2>
          <div className="space-y-4 text-slate-700 leading-relaxed">
            <p>
              Sou Maurício Kenyatta, doutorando em Relações Internacionais pela
              UnB, mestre e graduado na mesma área. Com mais de 11 anos de
              trajetória acadêmica, minha atuação se baseia em três pilares: o
              ensino universitário, a pesquisa de alto impacto e a mentoria
              personalizada.
            </p>
            <p>
              Meu objetivo é guiar estudantes e pesquisadores em suas jornadas,
              oferecendo suporte estratégico desde a concepção de um projeto até
              a publicação e defesa, com foco em desenvolver rigor metodológico
              e excelência acadêmica.
            </p>
            <p>
              Minha filosofia de trabalho é guiada pelo compromisso com a
              diversidade e pela luta antirracista. Como ativista do Movimento
              Negro Unificado (MNU) e &quot;artivista&quot;, utilizo a poesia e a arte
              para promover a igualdade racial.
            </p>
          </div>
        </div>
      </section>

      {/* ─── QUALIFICATIONS ─────────────────────────────────────────── */}
      <section className="bg-slate-50 py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-extrabold text-slate-900 mb-8">
            Formação e Experiência
          </h2>
          <div className="space-y-4">
            {qualifications.map((q) => (
              <div
                key={q.title}
                className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 flex gap-4 items-start hover:border-blue-200 transition-colors"
              >
                <div className="w-10 h-10 flex items-center justify-center bg-blue-50 rounded-lg flex-shrink-0">
                  <q.Icon size={20} className="text-[#f59e0b]" />
                </div>
                <div>
                  <div className="font-bold text-slate-900 mb-0.5">
                    {q.title}
                  </div>
                  <div className="text-slate-500 text-sm">{q.detail}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── AREAS ──────────────────────────────────────────────────── */}
      <section className="py-16 px-4 max-w-3xl mx-auto">
        <h2 className="text-2xl font-extrabold text-slate-900 mb-6">
          Áreas de Análise e Atuação
        </h2>
        <div className="flex flex-wrap gap-2">
          {areasTemas.map((area) => (
            <span
              key={area}
              className="bg-slate-100 text-slate-700 border border-slate-200 px-4 py-2 rounded-full text-sm font-medium hover:bg-blue-50 hover:border-blue-200 hover:text-blue-700 transition-colors"
            >
              {area}
            </span>
          ))}
        </div>
      </section>

      {/* ─── CTA ────────────────────────────────────────────────────── */}
      <section className="bg-[#0f172a] py-20 px-4">
        <div className="max-w-3xl mx-auto text-center text-white">
          <h2 className="text-3xl font-extrabold mb-4">
            Pronto para começar sua jornada?
          </h2>
          <p className="text-slate-300 mb-8 text-lg">
            Agende uma sessão de mentoria e transforme sua trajetória acadêmica.
          </p>
          <Link
            href="/servicos"
            className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-8 py-4 rounded-lg transition-colors inline-block shadow-lg shadow-blue-600/20"
          >
            Agendar uma Mentoria
          </Link>
        </div>
      </section>
    </>
  );
}
