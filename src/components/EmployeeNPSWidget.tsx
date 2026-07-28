import React, { useState } from "react";

const GROUPS = [
  { label: "Promoters",  range: "9–10", count: 68, bar: "bg-emerald-500", text: "text-emerald-700", bg: "bg-emerald-50" },
  { label: "Passives",   range: "7–8",  count: 29, bar: "bg-amber-400",   text: "text-amber-700",   bg: "bg-amber-50"  },
  { label: "Detractors", range: "0–6",  count: 13, bar: "bg-red-400",     text: "text-red-700",     bg: "bg-red-50"    },
];

const total = GROUPS.reduce((s, g) => s + g.count, 0);
const NPS_SCORE = Math.round(((GROUPS[0].count - GROUPS[2].count) / total) * 100);

function scoreColor(score: number): string {
  if (score <= 6) return "bg-red-100 text-red-700 hover:bg-red-200";
  if (score <= 8) return "bg-amber-100 text-amber-700 hover:bg-amber-200";
  return "bg-emerald-100 text-emerald-700 hover:bg-emerald-200";
}

export const EmployeeNPSWidget: React.FC = () => {
  const [voted, setVoted] = useState<number | null>(null);

  return (
    <div className="bg-white rounded-xl shadow-sm p-5">
      <div className="flex items-center gap-2 mb-4">
        <span className="material-symbols-outlined text-emerald-500">thumb_up</span>
        <h4 className="font-bold text-sm text-slate-800">Employee NPS</h4>
        <div className="ml-auto flex items-center gap-1">
          <span
            className={`text-xl font-extrabold ${
              NPS_SCORE >= 50 ? "text-emerald-600" : NPS_SCORE >= 20 ? "text-amber-600" : "text-red-600"
            }`}
          >
            {NPS_SCORE}
          </span>
          <span className="text-xs text-slate-400">/ 100</span>
        </div>
      </div>

      {/* Stacked bar */}
      <div className="flex h-2.5 rounded-full overflow-hidden mb-3 gap-0.5">
        {GROUPS.map((g) => (
          <div key={g.label} className={`${g.bar}`} style={{ width: `${(g.count / total) * 100}%` }} />
        ))}
      </div>
      <div className="flex justify-between mb-4">
        {GROUPS.map((g) => (
          <div key={g.label} className={`text-center px-2 py-1 rounded-lg ${g.bg}`}>
            <p className={`text-xs font-extrabold ${g.text}`}>{g.count}</p>
            <p className={`text-[10px] ${g.text}`}>{g.label}</p>
          </div>
        ))}
      </div>

      {/* Score picker */}
      <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
        How likely are you to recommend working here? (0–10)
      </p>
      <div className="flex gap-1 flex-wrap">
        {Array.from({ length: 11 }, (_, i) => (
          <button
            key={i}
            onClick={() => setVoted(voted === i ? null : i)}
            className={`flex-1 min-w-[18px] py-1.5 rounded text-[10px] font-bold transition-all ${
              voted === i ? scoreColor(i) + " scale-105 shadow-sm" : "bg-slate-100 text-slate-500 hover:bg-slate-200"
            }`}
          >
            {i}
          </button>
        ))}
      </div>
      {voted !== null && (
        <p className="text-[11px] text-slate-400 mt-2 text-center">Thanks for rating us {voted}/10!</p>
      )}
    </div>
  );
};
