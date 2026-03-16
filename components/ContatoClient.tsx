"use client";

import { useState } from "react";
import { CONTACT_EMAIL, INSTAGRAM, LINKEDIN } from "@/lib/constants";

export default function ContatoClient() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [mensagem, setMensagem] = useState("");

  function buildMailto() {
    const subject = encodeURIComponent(
      `Contato via site — ${nome || "Sem nome"}`
    );
    const body = encodeURIComponent(
      [
        `Nome: ${nome}`,
        `E-mail: ${email}`,
        telefone ? `Telefone: ${telefone}` : null,
        "",
        `Mensagem:`,
        mensagem,
      ]
        .filter((l) => l !== null)
        .join("\n")
    );
    return `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
  }

  const isValid = nome.trim().length > 0 && email.trim().length > 0;

  return (
    <div className="max-w-5xl mx-auto px-4 py-16 grid grid-cols-1 md:grid-cols-2 gap-12">
      {/* ─── FORM ─────────────────────────────────────────────────── */}
      <div>
        <h2 className="text-2xl font-extrabold text-slate-900 mb-2">
          Enviar mensagem
        </h2>
        <p className="text-slate-500 mb-6 text-sm">
          Preencha o formulário e clique em &quot;Enviar mensagem&quot; para abrir seu
          cliente de e-mail com tudo preenchido.
        </p>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">
              Nome <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Seu nome completo"
              className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">
              E-mail <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
              className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">
              Telefone{" "}
              <span className="text-slate-400 font-normal">(opcional)</span>
            </label>
            <input
              type="tel"
              value={telefone}
              onChange={(e) => setTelefone(e.target.value)}
              placeholder="(61) 99999-9999"
              className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">
              Mensagem
            </label>
            <textarea
              value={mensagem}
              onChange={(e) => setMensagem(e.target.value)}
              rows={5}
              placeholder="Descreva o motivo do contato, dúvidas ou como posso ajudar..."
              className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition resize-none"
            />
          </div>

          <a
            href={isValid ? buildMailto() : undefined}
            onClick={
              !isValid
                ? (e) => e.preventDefault()
                : undefined
            }
            className={`block w-full text-center font-bold py-3 rounded-lg transition-colors ${
              isValid
                ? "bg-blue-600 hover:bg-blue-500 text-white cursor-pointer"
                : "bg-slate-100 text-slate-400 cursor-not-allowed"
            }`}
          >
            Enviar mensagem
          </a>

          {!isValid && (
            <p className="text-xs text-slate-400 text-center">
              Preencha nome e e-mail para continuar.
            </p>
          )}
        </div>
      </div>

      {/* ─── SIDEBAR ──────────────────────────────────────────────── */}
      <div>
        <h2 className="text-2xl font-extrabold text-slate-900 mb-6">
          Informações de contato
        </h2>

        <div className="space-y-5">
          <div className="bg-slate-50 rounded-xl border border-gray-100 p-5">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">
              E-mail
            </div>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="text-blue-600 hover:text-blue-500 font-medium transition-colors break-all"
            >
              {CONTACT_EMAIL}
            </a>
          </div>

          <div className="bg-slate-50 rounded-xl border border-gray-100 p-5">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">
              Instagram
            </div>
            <a
              href={INSTAGRAM}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-500 font-medium transition-colors"
            >
              @mauricio.kenyatta
            </a>
          </div>

          <div className="bg-slate-50 rounded-xl border border-gray-100 p-5">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">
              LinkedIn
            </div>
            <a
              href={LINKEDIN}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-500 font-medium transition-colors"
            >
              Maurício Kenyatta Barros da Costa
            </a>
          </div>

          <div className="bg-slate-50 rounded-xl border border-gray-100 p-5">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">
              Localização
            </div>
            <p className="text-slate-700 text-sm">
              SEPN 707/907, Bloco C — Asa Norte
              <br />
              Brasília — DF
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
