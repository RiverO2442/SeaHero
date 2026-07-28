import React, { useState } from "react";

const MOODS = [
  { emoji: "😄", label: "Great",  color: "bg-emerald-100 text-emerald-700 border-emerald-200", bar: "bg-emerald-400", count: 48 },
  { emoji: "🙂", label: "Good",   color: "bg-blue-100 text-blue-700 border-blue-200",          bar: "bg-blue-400",    count: 72 },
  { emoji: "😐", label: "Okay",   color: "bg-amber-100 text-amber-700 border-amber-200",       bar: "bg-amber-400",   count: 31 },
  { emoji: "😕", label: "Rough",  color: "bg-orange-100 text-orange-700 border-orange-200",    bar: "bg-orange-400",  count: 12 },
  { emoji: "😞", label: "Bad",    color: "bg-red-100 text-red-700 border-red-200",             bar: "bg-red-400",     count:  5 },
];

export const EmployeeSentimentWidget: React.FC = () => {
  const [voted, setVoted] = useState<number | null>(null);

  const counts = MOODS.map((m, i) => ({ ...m, count: m.count + (voted === i ? 1 : 0) }));
  const total = counts.reduce((s, m) => s + m.count, 0);

  return (
    <div className="bg-white rounded-xl shadow-sm p-5">
      <div className="flex items-center gap-2 mb-4">
        <span className="material-symbols-outlined text-purple-500">sentiment_satisfied</span>
        <h4 className="font-bold text-sm text-slate-800">Team Mood Today</h4>
      </div>
      <div className="flex justify-between gap-1 mb-4">
        {counts.map((m, i) => (
          <button
            key={m.label}
            onClick={() => setVoted(voted === i ? null : i)}
            className={`flex-1 flex flex-col items-center gap-1 py-2 rounded-xl border transition-all ${
              voted === i ? m.color + " scale-105 shadow-sm" : "border-slate-100 hover:bg-slate-50"
            }`}
          >
            <span className="text-2xl">{m.emoji}</span>
            <span className="text-[10px] font-bold text-slate-500">{m.label}</span>
          </button>
        ))}
      </div>
      <div className="space-y-1.5">
        {counts.map((m) => (
          <div key={m.label} className="flex items-center gap-2">
            <span className="text-xs w-4">{m.emoji}</span>
            <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ${m.bar}`}
                style={{ width: `${(m.count / total) * 100}%` }}
              />
            </div>
            <span className="text-[10px] font-bold text-slate-500 w-6 text-right">{m.count}</span>
          </div>
        ))}
      </div>
      {voted !== null && (
        <p className="text-[11px] text-slate-400 mt-3 text-center">Response recorded — thanks!</p>
      )}
    </div>
  );
};
