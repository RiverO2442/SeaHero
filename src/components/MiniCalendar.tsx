import React, { useState } from "react";

export interface CalendarEvent {
  date: number;
  label: string;
}

interface MiniCalendarProps {
  events?: CalendarEvent[];
  initialYear?: number;
  initialMonth?: number;
}

export const MiniCalendar: React.FC<MiniCalendarProps> = ({
  events = [],
  initialYear,
  initialMonth,
}) => {
  const now = new Date();
  const [year, setYear] = useState(initialYear ?? now.getFullYear());
  const [month, setMonth] = useState(initialMonth ?? now.getMonth());

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const monthName = new Date(year, month).toLocaleString("en-US", { month: "long" });

  const prev = () => {
    if (month === 0) { setYear((y) => y - 1); setMonth(11); }
    else setMonth((m) => m - 1);
  };
  const next = () => {
    if (month === 11) { setYear((y) => y + 1); setMonth(0); }
    else setMonth((m) => m + 1);
  };

  const eventDays = new Set(events.map((e) => e.date));
  const todayDay = now.getFullYear() === year && now.getMonth() === month ? now.getDate() : null;

  const cells: (number | null)[] = [
    ...Array(firstDay).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];
  while (cells.length % 7 !== 0) cells.push(null);

  return (
    <div className="bg-white rounded-xl shadow-sm p-4">
      <div className="flex items-center justify-between mb-3">
        <button onClick={prev} className="p-1 hover:bg-slate-100 rounded-lg text-slate-400 transition-colors">
          <span className="material-symbols-outlined text-base">chevron_left</span>
        </button>
        <span className="text-sm font-bold text-slate-800">{monthName} {year}</span>
        <button onClick={next} className="p-1 hover:bg-slate-100 rounded-lg text-slate-400 transition-colors">
          <span className="material-symbols-outlined text-base">chevron_right</span>
        </button>
      </div>

      <div className="grid grid-cols-7 mb-1">
        {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
          <div key={d} className="text-center text-[10px] font-bold text-slate-400 py-1">{d}</div>
        ))}
      </div>

      <div className="grid grid-cols-7">
        {cells.map((day, i) => (
          <div key={i} className="flex flex-col items-center py-0.5">
            {day !== null && (
              <div
                className={`relative w-7 h-7 flex items-center justify-center rounded-full text-xs font-semibold transition-colors ${
                  day === todayDay
                    ? "bg-blue-600 text-white font-bold"
                    : "text-slate-700 hover:bg-slate-100"
                }`}
              >
                {day}
                {eventDays.has(day) && day !== todayDay && (
                  <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-blue-400" />
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {events.length > 0 && (
        <div className="mt-3 pt-3 border-t border-slate-100 space-y-1.5">
          {events.slice(0, 3).map((ev, i) => (
            <div key={i} className="flex items-center gap-2 text-xs text-slate-600">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0" />
              <span className="font-semibold w-10 shrink-0">
                {new Date(year, month, ev.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
              </span>
              <span className="text-slate-400 truncate">{ev.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
