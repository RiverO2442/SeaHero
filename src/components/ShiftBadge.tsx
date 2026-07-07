import React from "react";

export type ShiftType = "Morning" | "Afternoon" | "Night" | "Flexible";

const SHIFT_CONFIG: Record<ShiftType, { icon: string; bg: string; text: string }> = {
  Morning:   { icon: "wb_sunny",          bg: "bg-amber-50",  text: "text-amber-600"  },
  Afternoon: { icon: "partly_cloudy_day", bg: "bg-sky-50",    text: "text-sky-600"    },
  Night:     { icon: "bedtime",           bg: "bg-indigo-50", text: "text-indigo-600" },
  Flexible:  { icon: "schedule",          bg: "bg-slate-100", text: "text-slate-600"  },
};

export const ShiftBadge: React.FC<{ shift: ShiftType }> = ({ shift }) => {
  const c = SHIFT_CONFIG[shift] ?? SHIFT_CONFIG.Flexible;
  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold ${c.bg} ${c.text}`}>
      <span className="material-symbols-outlined text-[13px]">{c.icon}</span>
      {shift}
    </span>
  );
};
