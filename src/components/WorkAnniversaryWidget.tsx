import React from "react";

interface AnniversaryEntry {
  id: string;
  name: string;
  initials: string;
  avatarColor: string;
  type: "anniversary" | "birthday";
  label: string;
  daysUntil: number;
  years?: number;
}

const ENTRIES: AnniversaryEntry[] = [
  { id: "1", name: "Marcus Chen",    initials: "MC", avatarColor: "bg-blue-100 text-blue-700",    type: "anniversary", label: "Work Anniversary", daysUntil: 2,  years: 5 },
  { id: "2", name: "Sarah Jenkins",  initials: "SJ", avatarColor: "bg-purple-100 text-purple-700", type: "birthday",    label: "Birthday",         daysUntil: 4 },
  { id: "3", name: "Elena Rodriguez",initials: "ER", avatarColor: "bg-slate-200 text-slate-700",  type: "anniversary", label: "Work Anniversary", daysUntil: 7,  years: 2 },
  { id: "4", name: "David Okoro",    initials: "DO", avatarColor: "bg-blue-100 text-blue-700",    type: "birthday",    label: "Birthday",         daysUntil: 10 },
  { id: "5", name: "Maya Thompson",  initials: "MT", avatarColor: "bg-emerald-100 text-emerald-700",type: "anniversary", label: "Work Anniversary", daysUntil: 14, years: 1 },
];

function dayLabel(n: number) {
  if (n === 0) return "Today";
  if (n === 1) return "Tomorrow";
  return `In ${n} days`;
}

export const WorkAnniversaryWidget: React.FC = () => (
  <div className="bg-white rounded-xl shadow-sm p-5">
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-2">
        <span className="material-symbols-outlined text-rose-500">celebration</span>
        <h4 className="font-bold text-slate-800 text-sm">Upcoming Milestones</h4>
      </div>
      <span className="text-xs font-bold text-slate-400">Next 14 days</span>
    </div>

    <div className="space-y-3">
      {ENTRIES.map((e) => (
        <div key={e.id} className="flex items-center gap-3">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${e.avatarColor}`}>
            {e.initials}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-bold text-slate-800 truncate">{e.name}</p>
            <p className="text-[10px] text-slate-500">
              {e.type === "anniversary" ? `${e.years}yr ${e.label}` : e.label}
            </p>
          </div>
          <div className="flex items-center gap-1.5 shrink-0">
            <span className={`text-lg ${e.type === "anniversary" ? "text-amber-400" : "text-rose-400"}`}>
              {e.type === "anniversary" ? "🏆" : "🎂"}
            </span>
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
              e.daysUntil <= 2 ? "bg-rose-50 text-rose-600" : "bg-slate-100 text-slate-500"
            }`}>
              {dayLabel(e.daysUntil)}
            </span>
          </div>
        </div>
      ))}
    </div>
  </div>
);
