"use client";

import { generateSlots } from "@/lib/booking";

interface TimeSlotPickerProps {
  date: Date;
  durationMins: number;
  selectedTime: string | null;
  onSelect: (time: string) => void;
}

export default function TimeSlotPicker({
  date,
  durationMins,
  selectedTime,
  onSelect,
}: TimeSlotPickerProps) {
  const slots = generateSlots(date, durationMins);

  if (slots.length === 0) {
    return (
      <p className="text-slate-500 text-sm text-center py-4">
        Nenhum horário disponível nesta data.
      </p>
    );
  }

  return (
    <div>
      <div className="text-sm font-semibold text-slate-700 mb-3">
        Escolha um horário
      </div>
      <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
        {slots.map((slot) => (
          <button
            key={slot}
            type="button"
            onClick={() => onSelect(slot)}
            className={`
              py-2 px-3 rounded-lg text-sm font-medium border transition-colors
              ${
                selectedTime === slot
                  ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                  : "border-gray-200 text-slate-700 hover:border-blue-400 hover:text-blue-600 hover:bg-blue-50 bg-white"
              }
            `}
          >
            {slot}
          </button>
        ))}
      </div>
    </div>
  );
}
