import React from "react";

interface ProbationEmployee {
  name: string;
  initials: string;
  color: string;
  role: string;
  endDate: string;
}

const PROBATIONERS: ProbationEmployee[] = [
  { name: "Tom Bradley",   initials: "TB", color: "bg-indigo-100 text-indigo-700", role: "Junior Developer", endDate: "2026-09-30" },
  { name: "Nina Castillo", initials: "NC", color: "bg-rose-100 text-rose-700",     role: "Marketing Exec",   endDate: "2026-11-14" },
  { name: "Omar Farouq",   initials: "OF", color: "bg-teal-100 text-teal-700",     role: "Data Analyst",     endDate: "2026-11-30" },
  { name: "Lucy Chan",     initials: "LC", color: "bg-amber-100 text-amber-700",   role: "HR Coordinator",   endDate: "2026-12-31" },
];

function daysLeft(endDate: string): number {
  const today = new Date();
  const end = new Date(endDate);
  return Math.max(0, Math.ceil((end.getTime() - today.getTime()) / 86400000));
}

function urgencyColor(days: number): string {
  if (days <= 30) return "text-red-600 bg-red-50";
  if (days <= 60) return "text-amber-600 bg-amber-50";
  return "text-emerald-700 bg-emerald-50";
}

export const ProbationTrackerWidget: React.FC = () => (
  <div className="bg-white rounded-xl shadow-sm p-5">
    <div className="flex items-center gap-2 mb-4">
      <span className="material-symbols-outlined text-amber-500">timer</span>
      <h4 className="font-bold text-sm text-slate-800">Probation Tracker</h4>
      <span className="ml-auto text-xs text-slate-400 font-medium">{PROBATIONERS.length} active</span>
    </div>
    <div className="space-y-3">
      {PROBATIONERS.map((p) => {
        const days = daysLeft(p.endDate);
        return (
          <div key={p.name} className="flex items-center gap-3">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${p.color}`}>
              {p.initials}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-slate-800 truncate">{p.name}</p>
              <p className="text-[10px] text-slate-500 truncate">{p.role}</p>
            </div>
            <span className={`text-[11px] font-extrabold px-2 py-0.5 rounded-full shrink-0 ${urgencyColor(days)}`}>
              {days}d left
            </span>
          </div>
        );
      })}
    </div>
  </div>
);
