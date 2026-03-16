import type { Service } from "./types";

// ─── Business Hours ───────────────────────────────────────────────────────────

// Key: 0 = Sunday, 1 = Monday, ..., 6 = Saturday
// Value: [openHour, closeHour] or null if closed
export const BUSINESS_HOURS: Record<number, [number, number] | null> = {
  0: null,      // Sunday — closed
  1: [9, 18],   // Monday
  2: [9, 18],   // Tuesday
  3: [9, 18],   // Wednesday
  4: [9, 18],   // Thursday
  5: [9, 18],   // Friday
  6: null,      // Saturday — closed
};

// ─── Date Utilities ───────────────────────────────────────────────────────────

export function getAvailableDates(daysAhead = 30): Date[] {
  const dates: Date[] = [];
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  for (let i = 1; i <= daysAhead; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    const dayOfWeek = date.getDay();
    if (BUSINESS_HOURS[dayOfWeek] !== null) {
      dates.push(date);
    }
  }

  return dates;
}

export function generateSlots(date: Date, durationMins: number): string[] {
  const dayOfWeek = date.getDay();
  const hours = BUSINESS_HOURS[dayOfWeek];
  if (!hours) return [];

  const [openHour, closeHour] = hours;
  const slots: string[] = [];

  let current = openHour * 60; // minutes since midnight
  const end = closeHour * 60;

  while (current + durationMins <= end) {
    const h = Math.floor(current / 60);
    const m = current % 60;
    slots.push(`${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`);
    current += durationMins;
  }

  return slots;
}

// ─── Date Formatting ──────────────────────────────────────────────────────────

const PT_WEEKDAYS = [
  "domingo",
  "segunda-feira",
  "terça-feira",
  "quarta-feira",
  "quinta-feira",
  "sexta-feira",
  "sábado",
];

const PT_MONTHS = [
  "janeiro",
  "fevereiro",
  "março",
  "abril",
  "maio",
  "junho",
  "julho",
  "agosto",
  "setembro",
  "outubro",
  "novembro",
  "dezembro",
];

export function formatBookingDate(date: Date): string {
  const weekday = PT_WEEKDAYS[date.getDay()];
  const day = date.getDate();
  const month = PT_MONTHS[date.getMonth()];
  const year = date.getFullYear();
  return `${weekday}, ${day} de ${month} de ${year}`;
}

export function formatBookingDateShort(date: Date): string {
  const weekday = PT_WEEKDAYS[date.getDay()];
  const day = date.getDate();
  const month = PT_MONTHS[date.getMonth()];
  return `${weekday}, ${day} de ${month}`;
}

// ─── Email Builders ───────────────────────────────────────────────────────────

export interface BookingFields {
  nome: string;
  email?: string;
  telefone?: string;
  nivel?: string;
  tema?: string;
}

export function buildEmailSubject(
  service: Service,
  date: Date,
  time: string
): string {
  const dateStr = formatBookingDateShort(date);
  return `Agendamento: ${service.name} — ${dateStr} às ${time}`;
}

export function buildEmailBody(
  service: Service,
  date: Date,
  time: string,
  fields: BookingFields
): string {
  const dateStr = formatBookingDate(date);
  const lines: string[] = [
    "Olá, Maurício!",
    "",
    "Gostaria de agendar uma sessão de mentoria com os seguintes detalhes:",
    "",
    "── SERVIÇO ──────────────────────────",
    `Serviço: ${service.name}`,
    `Categoria: ${service.category}`,
    `Duração: ${service.duration} minutos`,
    `Valor: ${service.priceLabel}`,
    "",
    "── DATA E HORA ──────────────────────",
    `Data: ${dateStr}`,
    `Horário: ${time}`,
    "",
    "── MEUS DADOS ───────────────────────",
    `Nome: ${fields.nome}`,
  ];

  if (fields.email) {
    lines.push(`E-mail: ${fields.email}`);
  }

  if (fields.telefone) {
    lines.push(`Telefone: ${fields.telefone}`);
  }

  if (fields.nivel) {
    lines.push(`Nível Acadêmico: ${fields.nivel}`);
  }

  if (fields.tema) {
    lines.push(`Tema da Pesquisa: ${fields.tema}`);
  }

  lines.push(
    "",
    "─────────────────────────────────────",
    "",
    "Aguardo sua confirmação.",
    "",
    `Atenciosamente,`,
    fields.nome
  );

  return lines.join("\n");
}

export function buildWhatsAppMessage(
  service: Service,
  date: Date,
  time: string,
  fields: BookingFields
): string {
  const dateStr = formatBookingDate(date);
  const lines: string[] = [
    "Olá, Maurício! Gostaria de agendar uma sessão de mentoria. 🎓",
    "",
    `📋 *Serviço:* ${service.name}`,
    `💰 *Valor:* ${service.priceLabel}`,
    `⏱️ *Duração:* ${service.duration} minutos`,
    "",
    `📅 *Data:* ${dateStr}`,
    `🕐 *Horário:* ${time}`,
    "",
    `👤 *Nome:* ${fields.nome}`,
  ];

  if (fields.email) {
    lines.push(`📧 *E-mail:* ${fields.email}`);
  }

  if (fields.telefone) {
    lines.push(`📱 *Telefone:* ${fields.telefone}`);
  }

  if (fields.nivel) {
    lines.push(`🎓 *Nível Acadêmico:* ${fields.nivel}`);
  }

  if (fields.tema) {
    lines.push(`📝 *Tema:* ${fields.tema}`);
  }

  lines.push("", "Aguardo confirmação! 🙏");

  return lines.join("\n");
}

export function buildMailtoLink(
  service: Service,
  date: Date,
  time: string,
  fields: BookingFields
): string {
  const subject = buildEmailSubject(service, date, time);
  const body = buildEmailBody(service, date, time, fields);

  return `mailto:mauricio@kenyatta.com.br?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
