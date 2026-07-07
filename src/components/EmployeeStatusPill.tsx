import React from "react";

export type EmployeeStatusType = "Active" | "Inactive" | "On Leave" | "Terminated";

const CONFIG: Record<EmployeeStatusType, { dot: string; text: string; bg: string }> = {
  Active:     { dot: "bg-emerald-500", text: "text-emerald-700", bg: "bg-emerald-50" },
  Inactive:   { dot: "bg-slate-400",   text: "text-slate-600",   bg: "bg-slate-100"  },
  "On Leave": { dot: "bg-amber-400",   text: "text-amber-700",   bg: "bg-amber-50"   },
  Terminated: { dot: "bg-red-400",     text: "text-red-700",     bg: "bg-red-50"     },
};

interface EmployeeStatusPillProps {
  status: EmployeeStatusType;
  size?: "sm" | "md";
}

export const EmployeeStatusPill: React.FC<EmployeeStatusPillProps> = ({ status, size = "md" }) => {
  const c = CONFIG[status] ?? CONFIG["Inactive"];
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full font-bold ${c.bg} ${c.text} ${
        size === "sm" ? "px-2 py-0.5 text-[10px]" : "px-2.5 py-1 text-xs"
      }`}
    >
      <span className={`rounded-full shrink-0 ${c.dot} ${size === "sm" ? "w-1 h-1" : "w-1.5 h-1.5"}`} />
      {status}
    </span>
  );
};
