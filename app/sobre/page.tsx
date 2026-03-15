import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Sobre",
  description: "Conheça Maurício Kenyatta, professor e analista de relações internacionais.",
};

export default function SobrePage() {
  return (
    <>
      <section className="bg-gray-900 text-white py-14 px-4 text-center">
        <h1 className="text-4xl font-extrabold mb-4">Sobre</h1>
        <p className="text-slate-300 max-w-xl mx-auto">Professor e analista de relações internacionais</p>
      </section>
      <section className="py-14 px-4 max-w-3xl mx-auto">
        <div className="prose prose-lg max-w-none">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Maurício Kenyatta</h2>
          <p className="text-gray-700 mb-4 leading-relaxed">
            Maurício Kenyatta é professor e analista de relações internacionais com foco em geopolítica,
            diplomacia brasileira e política comparada. Seu trabalho analítico abrange os grandes temas da
            ordem mundial contemporânea, com ênfase nos desafios do multilateralismo, da soberania estatal
            e da inserção internacional do Brasil.
          </p>
          <p className="text-gray-700 mb-4 leading-relaxed">
            Com sólida formação em Ciência Política e Relações Internacionais, escreve regularmente sobre
            temas como segurança internacional, conflitos regionais, paz e direitos humanos, integração
            regional na América Latina e África, e a diplomacia brasileira no contexto do Sul Global.
          </p>
          <p className="text-gray-700 mb-4 leading-relaxed">
            Além de conteúdo em português, produz análises em inglês sobre política exterior americana,
            relações comerciais internacionais e geopolítica global.
          </p>
          <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4">Temas de análise</h3>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>Geopolítica e Estratégia Global</li>
            <li>Diplomacia Brasileira e Política Externa</li>
            <li>Política Internacional e Multilateralismo</li>
            <li>Segurança e Conflitos Internacionais</li>
            <li>Paz, Direitos Humanos e Direito Internacional</li>
            <li>América Latina e África</li>
            <li>Fronteiras e Cooperação Regional</li>
            <li>Economia Política Internacional</li>
          </ul>
        </div>
        <div className="mt-10">
          <Link href="/contato" className="bg-gray-900 text-white font-bold px-8 py-3 rounded-lg hover:bg-gray-700 transition-colors inline-block">
            Entre em contato →
          </Link>
        </div>
      </section>
    </>
  );
}
