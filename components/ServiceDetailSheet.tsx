"use client";
import { useEffect } from "react";
import { X, Clock, GraduationCap } from "lucide-react";
import type { Service } from "@/lib/types";

interface Props {
  service: Service;
  onClose: () => void;
  onBook: () => void;
}

export default function ServiceDetailSheet({ service, onClose, onBook }: Props) {
  // Fechar com Escape
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  // Bloquear scroll do body
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/50 z-40 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Sheet — desliza da direita */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label={`Detalhes: ${service.name}`}
        className="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-white shadow-2xl flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
              <GraduationCap size={20} className="text-white" />
            </div>
            <span className="text-xs font-bold uppercase tracking-widest text-gray-400">
              {service.category}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Fechar"
          >
            <X size={20} className="text-gray-500" />
          </button>
        </div>

        {/* Conteúdo */}
        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
          {/* Nome, tagline e preço */}
          <div>
            <h2 className="text-2xl font-extrabold text-slate-900 mb-1">{service.name}</h2>
            {service.tagline && (
              <p className="text-blue-600 font-medium italic mb-2">{service.tagline}</p>
            )}
            <p className="text-xl font-extrabold text-amber-500">{service.priceLabel}</p>
          </div>

          {/* Descrição */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">
              Sobre este serviço
            </h3>
            <p className="text-gray-600 leading-relaxed">{service.description}</p>
          </div>

          {/* Duração */}
          {service.duration > 0 && (
            <div className="flex items-center gap-3 bg-slate-50 rounded-xl px-4 py-3">
              <Clock size={18} className="text-blue-600" />
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wide">
                  Duração estimada por sessão
                </p>
                <p className="font-bold text-slate-900">{service.duration} min</p>
              </div>
            </div>
          )}

          {/* Variações de preço por nível acadêmico */}
          {service.hasVariations && service.variations && service.variations.length > 0 && (
            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">
                Valores por nível acadêmico
              </h3>
              <div className="space-y-2">
                {service.variations.map((v) => (
                  <div
                    key={v.label}
                    className="flex justify-between items-center bg-blue-50 rounded-xl px-4 py-3"
                  >
                    <div>
                      <p className="text-sm font-bold text-slate-900">{v.label}</p>
                      <p className="text-xs text-slate-500">{v.description}</p>
                    </div>
                    <span className="text-sm font-extrabold text-amber-500 whitespace-nowrap ml-4">
                      {v.priceLabel}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Info do fluxo */}
          <div className="bg-blue-50 rounded-xl px-4 py-4 text-sm text-slate-600 leading-relaxed">
            <p className="font-bold text-slate-900 mb-1">Como funciona o agendamento?</p>
            <p>
              Escolha a data e o horário disponível, informe seu nome e objetivo, e enviaremos
              uma mensagem pré-preenchida para o WhatsApp ou e-mail do Maurício. Atendimento
              presencial em Brasília ou online.
            </p>
          </div>
        </div>

        {/* Footer com CTA */}
        <div className="px-6 py-5 border-t border-gray-100 bg-white">
          <button
            type="button"
            onClick={onBook}
            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-extrabold py-4 rounded-2xl text-base shadow-md shadow-blue-600/20 transition-colors flex items-center justify-center gap-2"
          >
            <GraduationCap size={18} />
            Agendar mentoria
          </button>
        </div>
      </div>
    </>
  );
}
