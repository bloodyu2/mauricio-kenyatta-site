import type { Metadata } from "next";
import { SITE_URL } from "@/lib/data";
import ContatoClient from "@/components/ContatoClient";

export const metadata: Metadata = {
  title: "Contato",
  description:
    "Entre em contato com Maurício Kenyatta para colaborações, mentorias, convites para palestras e consultorias em Relações Internacionais.",
  alternates: {
    canonical: `${SITE_URL}/contato`,
  },
};

export default function ContatoPage() {
  return (
    <>
      <section className="relative bg-[#0f172a] text-white overflow-hidden">
        <div className="absolute inset-0 bg-dot-pattern opacity-40 pointer-events-none" />
        <div className="relative max-w-5xl mx-auto px-4 py-16 md:py-20 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Contato</h1>
          <p className="text-slate-300 max-w-xl mx-auto">
            Entre em contato para colaborações, convites para palestras,
            consultorias e mentorias.
          </p>
        </div>
      </section>
      <ContatoClient />
    </>
  );
}
