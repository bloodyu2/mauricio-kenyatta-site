"use client";

import { useState } from "react";
import { getAvailableDates } from "@/lib/booking";

interface CalendarPickerProps {
  selectedDate: Date | null;
  onSelect: (date: Date) => void;
}

const PT_MONTHS = [
  "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro",
];

const PT_WEEKDAYS_SHORT = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

function isSameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

export default function CalendarPicker({ selectedDate, onSelect }: CalendarPickerProps) {
  const availableDates = getAvailableDates(30);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const minDate = availableDates[0] ?? today;
  const [viewYear, setViewYear] = useState(minDate.getFullYear());
  const [viewMonth, setViewMonth] = useState(minDate.getMonth());

  // Build calendar grid for viewYear/viewMonth
  const firstDay = new Date(viewYear, viewMonth, 1);
  const lastDay = new Date(viewYear, viewMonth + 1, 0);
  const startOffset = firstDay.getDay(); // 0=Sun

  const days: (Date | null)[] = [];
  for (let i = 0; i < startOffset; i++) days.push(null);
  for (let d = 1; d <= lastDay.getDate(); d++) {
    days.push(new Date(viewYear, viewMonth, d));
  }

  const isAvailable = (date: Date) =>
    availableDates.some((d) => isSameDay(d, date));

  const canGoPrev = () => {
    const prev = new Date(viewYear, viewMonth - 1, 1);
    return (
      prev.getFullYear() > minDate.getFullYear() ||
      (prev.getFullYear() === minDate.getFullYear() &&
        prev.getMonth() >= minDate.getMonth())
    );
  };

  const canGoNext = () => {
    const maxDate = availableDates[availableDates.length - 1];
    if (!maxDate) return false;
    const next = new Date(viewYear, viewMonth + 1, 1);
    return (
      next.getFullYear() < maxDate.getFullYear() ||
      (next.getFullYear() === maxDate.getFullYear() &&
        next.getMonth() <= maxDate.getMonth())
    );
  };

  return (
    <div className="select-none">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <button
          type="button"
          onClick={() => {
            if (!canGoPrev()) return;
            const prev = new Date(viewYear, viewMonth - 1, 1);
            setViewYear(prev.getFullYear());
            setViewMonth(prev.getMonth());
          }}
          disabled={!canGoPrev()}
          className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          aria-label="Mês anterior"
        >
          ‹
        </button>
        <span className="font-bold text-slate-800 text-sm">
          {PT_MONTHS[viewMonth]} {viewYear}
        </span>
        <button
          type="button"
          onClick={() => {
            if (!canGoNext()) return;
            const next = new Date(viewYear, viewMonth + 1, 1);
            setViewYear(next.getFullYear());
            setViewMonth(next.getMonth());
          }}
          disabled={!canGoNext()}
          className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          aria-label="Próximo mês"
        >
          ›
        </button>
      </div>

      {/* Weekday headers */}
      <div className="grid grid-cols-7 mb-2">
        {PT_WEEKDAYS_SHORT.map((wd) => (
          <div
            key={wd}
            className="text-center text-xs font-semibold text-slate-400 py-1"
          >
            {wd}
          </div>
        ))}
      </div>

      {/* Day grid */}
      <div className="grid grid-cols-7 gap-1">
        {days.map((day, idx) => {
          if (!day) {
            return <div key={`empty-${idx}`} />;
          }

          const available = isAvailable(day);
          const selected = selectedDate ? isSameDay(day, selectedDate) : false;

          return (
            <button
              key={day.toISOString()}
              type="button"
              onClick={() => available && onSelect(day)}
              disabled={!available}
              className={`
                w-full aspect-square flex items-center justify-center rounded-lg text-sm font-medium transition-colors
                ${selected
                  ? "bg-blue-600 text-white shadow-sm"
                  : available
                  ? "hover:bg-blue-50 hover:text-blue-700 text-slate-800 cursor-pointer"
                  : "text-slate-300 cursor-not-allowed"
                }
              `}
            >
              {day.getDate()}
            </button>
          );
        })}
      </div>
    </div>
  );
}
