"use client";

import { useState, useEffect } from "react";
import type { Service } from "@/lib/types";
import {
  buildMailtoLink,
  buildWhatsAppMessage,
  formatBookingDateShort,
} from "@/lib/booking";
import { WHATSAPP_NUMBER } from "@/lib/data";
import CalendarPicker from "./CalendarPicker";
import TimeSlotPicker from "./TimeSlotPicker";

interface AgendarDrawerProps {
  service: Service | null;
  onClose: () => void;
}

type Step = 1 | 2 | 3;

const NIVEL_OPTIONS = [
  "Graduação",
  "Mestrado",
  "Doutorado",
  "Profissional",
  "Outro",
];

export default function AgendarDrawer({ service, onClose }: AgendarDrawerProps) {
  const [step, setStep] = useState<Step>(1);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [nivel, setNivel] = useState("");
  const [tema, setTema] = useState("");

  // Reset when service changes
  useEffect(() => {
    if (service) {
      setStep(1);
      setSelectedDate(null);
      setSelectedTime(null);
      setNome("");
      setEmail("");
      setTelefone("");
      setNivel("");
      setTema("");
    }
  }, [service]);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  // Prevent body scroll when drawer is open
  useEffect(() => {
    if (service) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [service]);

  if (!service) return null;

  const canProceedStep1 = selectedDate !== null;
  const canProceedStep2 = selectedTime !== null;
  const canSubmitWA = nome.trim().length > 0;
  const canSubmitEmail = nome.trim().length > 0 && email.trim().length > 0;

  const bookingFields = {
    nome,
    email: email || undefined,
    telefone: telefone || undefined,
    nivel: nivel || undefined,
    tema: tema || undefined,
  };

  function handleWhatsApp() {
    if (!service || !selectedDate || !selectedTime || !canSubmitWA) return;
    const msg = buildWhatsAppMessage(service, selectedDate, selectedTime, bookingFields);
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
    window.open(url, "_blank");
    onClose();
  }

  function handleEmail() {
    if (!service || !selectedDate || !selectedTime || !canSubmitEmail) return;
    const mailto = buildMailtoLink(service, selectedDate, selectedTime, bookingFields);
    window.location.href = mailto;
  }

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/50 z-40 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div
        className="fixed right-0 top-0 h-full w-full max-w-md bg-white z-50 shadow-2xl flex flex-col overflow-hidden"
        role="dialog"
        aria-modal="true"
        aria-label={`Agendar ${service.name}`}
      >
        {/* Header */}
        <div className="bg-[#0f172a] text-white px-5 py-4 flex-shrink-0">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="text-2xl">{service.icon}</span>
              <div>
                <div className="text-xs text-blue-300 font-semibold uppercase tracking-wide">
                  {service.category}
                </div>
                <div className="font-bold text-base leading-tight">
                  {service.name}
                </div>
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="text-slate-400 hover:text-white w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/10 transition-colors flex-shrink-0"
              aria-label="Fechar"
            >
              ✕
            </button>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <span className="text-blue-400 font-semibold">{service.priceLabel}</span>
            <span className="text-slate-500">·</span>
            <span className="text-slate-400">{service.duration} min</span>
          </div>
        </div>

        {/* Steps indicator */}
        <div className="flex border-b border-gray-100 flex-shrink-0">
          {([1, 2, 3] as const).map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => {
                if (s < step) setStep(s);
              }}
              className={`flex-1 py-3 text-xs font-semibold transition-colors ${
                step === s
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : s < step
                  ? "text-slate-500 hover:text-slate-700 cursor-pointer"
                  : "text-slate-300 cursor-default"
              }`}
            >
              {s === 1 ? "1. Data" : s === 2 ? "2. Horário" : "3. Seus dados"}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-5">
          {step === 1 && (
            <div>
              <CalendarPicker
                selectedDate={selectedDate}
                onSelect={(d) => {
                  setSelectedDate(d);
                  setSelectedTime(null);
                }}
              />
            </div>
          )}

          {step === 2 && selectedDate && (
            <div>
              <div className="flex items-center gap-2 bg-blue-50 border border-blue-100 rounded-lg px-3 py-2 mb-4">
                <span className="text-blue-600 text-sm font-semibold">
                  {formatBookingDateShort(selectedDate)}
                </span>
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="text-blue-400 hover:text-blue-600 text-xs ml-auto"
                >
                  Alterar
                </button>
              </div>
              <TimeSlotPicker
                date={selectedDate}
                durationMins={service.duration}
                selectedTime={selectedTime}
                onSelect={setSelectedTime}
              />
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              {/* Summary */}
              {selectedDate && selectedTime && (
                <div className="bg-slate-50 rounded-lg border border-gray-100 p-3 text-sm mb-2">
                  <div className="font-semibold text-slate-800 mb-1">
                    Resumo do agendamento
                  </div>
                  <div className="text-slate-500">
                    {service.name} · {formatBookingDateShort(selectedDate)} às{" "}
                    {selectedTime}
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">
                  Nome <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  placeholder="Seu nome completo"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
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
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
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
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">
                  Nível Acadêmico{" "}
                  <span className="text-slate-400 font-normal">(opcional)</span>
                </label>
                <select
                  value={nivel}
                  onChange={(e) => setNivel(e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition bg-white"
                >
                  <option value="">Selecione...</option>
                  {NIVEL_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">
                  Tema da Pesquisa{" "}
                  <span className="text-slate-400 font-normal">(opcional)</span>
                </label>
                <textarea
                  value={tema}
                  onChange={(e) => setTema(e.target.value)}
                  rows={3}
                  placeholder="Descreva brevemente o tema da sua pesquisa..."
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition resize-none"
                />
              </div>
            </div>
          )}
        </div>

        {/* Footer / Actions */}
        <div className="border-t border-gray-100 px-5 py-4 bg-white flex-shrink-0">
          {step === 1 && (
            <button
              type="button"
              onClick={() => canProceedStep1 && setStep(2)}
              disabled={!canProceedStep1}
              className={`w-full py-3 rounded-lg font-bold text-sm transition-colors ${
                canProceedStep1
                  ? "bg-blue-600 hover:bg-blue-500 text-white"
                  : "bg-slate-100 text-slate-400 cursor-not-allowed"
              }`}
            >
              {canProceedStep1
                ? `Continuar — ${formatBookingDateShort(selectedDate!)}`
                : "Selecione uma data"}
            </button>
          )}

          {step === 2 && (
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="flex-none px-4 py-3 rounded-lg font-bold text-sm border border-gray-200 text-slate-600 hover:bg-slate-50 transition-colors"
              >
                Voltar
              </button>
              <button
                type="button"
                onClick={() => canProceedStep2 && setStep(3)}
                disabled={!canProceedStep2}
                className={`flex-1 py-3 rounded-lg font-bold text-sm transition-colors ${
                  canProceedStep2
                    ? "bg-blue-600 hover:bg-blue-500 text-white"
                    : "bg-slate-100 text-slate-400 cursor-not-allowed"
                }`}
              >
                {canProceedStep2 ? `Continuar — ${selectedTime}` : "Selecione um horário"}
              </button>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-2">
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="flex-none px-4 py-3 rounded-lg font-bold text-sm border border-gray-200 text-slate-600 hover:bg-slate-50 transition-colors"
                >
                  Voltar
                </button>
                <button
                  type="button"
                  onClick={handleWhatsApp}
                  disabled={!canSubmitWA}
                  className={`flex-1 py-3 rounded-lg font-bold text-sm transition-colors flex items-center justify-center gap-2 ${
                    canSubmitWA
                      ? "bg-[#25d366] hover:bg-[#1ebe5d] text-white"
                      : "bg-slate-100 text-slate-400 cursor-not-allowed"
                  }`}
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  WhatsApp
                </button>
              </div>
              <button
                type="button"
                onClick={handleEmail}
                disabled={!canSubmitEmail}
                className={`w-full py-2.5 rounded-lg font-semibold text-sm transition-colors ${
                  canSubmitEmail
                    ? "border border-gray-200 text-slate-600 hover:bg-slate-50"
                    : "border border-gray-100 text-slate-300 cursor-not-allowed"
                }`}
              >
                {canSubmitEmail ? "Ou enviar por e-mail" : "Preencha e-mail para enviar por e-mail"}
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
