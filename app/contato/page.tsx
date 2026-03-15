import type { Metadata } from "next";
import { CONTACT_EMAIL } from "@/lib/data";

export const metadata: Metadata = {
  title: "Contato",
  description: "Entre em contato com Maurício Kenyatta.",
};

export default function ContatoPage() {
  return (
    <>
      <section className="bg-gray-900 text-white py-14 px-4 text-center">
        <h1 className="text-4xl font-extrabold mb-4">Contato</h1>
        <p className="text-slate-300 max-w-xl mx-auto">Entre em contato para colaborações, convites e consultas</p>
      </section>
      <section className="py-14 px-4 max-w-2xl mx-auto">
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-8 text-center">
          <div className="text-5xl mb-4">✉️</div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">E-mail</h2>
          <p className="text-gray-500 mb-6">Para colaborações, convites para palestras, consultorias e imprensa:</p>
          <a href={`mailto:${CONTACT_EMAIL}`} className="bg-gray-900 text-white font-bold px-8 py-3 rounded-lg hover:bg-gray-700 transition-colors inline-block text-lg">
            {CONTACT_EMAIL}
          </a>
        </div>
      </section>
    </>
  );
}
