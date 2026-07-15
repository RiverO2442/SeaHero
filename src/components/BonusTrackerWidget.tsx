import React from "react";

const BONUS_DATA = [
  { dept: "Engineering", allocated: 28000, budget: 40000 },
  { dept: "Product Design", allocated: 12500, budget: 18000 },
  { dept: "Marketing", allocated: 9800, budget: 15000 },
  { dept: "Operations", allocated: 7200, budget: 12000 },
  { dept: "Finance", allocated: 6100, budget: 8000 },
];

const fmt = (n: number) =>
  "$" + (n >= 1000 ? (n / 1000).toFixed(0) + "k" : n.toString());

export const BonusTrackerWidget: React.FC = () => {
  const totalAllocated = BONUS_DATA.reduce((s, d) => s + d.allocated, 0);
  const totalBudget = BONUS_DATA.reduce((s, d) => s + d.budget, 0);
  const overallPct = Math.round((totalAllocated / totalBudget) * 100);

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h4 className="font-bold text-slate-800 text-sm">Bonus Tracker</h4>
          <p className="text-xs text-slate-400">Allocated vs budget this cycle</p>
        </div>
        <span className="material-symbols-outlined text-amber-500">workspace_premium</span>
      </div>

      <div className="flex items-center gap-3 mb-5">
        <div className="flex-1 h-2.5 bg-slate-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-amber-400 rounded-full transition-all duration-700"
            style={{ width: `${overallPct}%` }}
          />
        </div>
        <span className="text-xs font-bold text-slate-700 tabular-nums w-10 text-right">{overallPct}%</span>
      </div>

      <div className="space-y-2.5">
        {BONUS_DATA.map((d) => {
          const pct = Math.round((d.allocated / d.budget) * 100);
          return (
            <div key={d.dept}>
              <div className="flex justify-between text-[10px] mb-1">
                <span className="font-semibold text-slate-600">{d.dept}</span>
                <span className="text-slate-400 tabular-nums">{fmt(d.allocated)} / {fmt(d.budget)}</span>
              </div>
              <div className="h-1 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-amber-300 rounded-full"
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      <p className="text-[10px] text-slate-400 mt-4 text-right">
        Total: {fmt(totalAllocated)} of {fmt(totalBudget)} allocated
      </p>
    </div>
  );
};
