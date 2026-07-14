import React from "react";

const OVERTIME_DATA = [
  { dept: "Engineering", hours: 48, budget: 60, color: "bg-blue-500" },
  { dept: "Product Design", hours: 22, budget: 30, color: "bg-purple-500" },
  { dept: "Marketing", hours: 35, budget: 40, color: "bg-emerald-500" },
  { dept: "Operations", hours: 18, budget: 35, color: "bg-slate-400" },
  { dept: "Finance", hours: 12, budget: 20, color: "bg-amber-500" },
];

export const OvertimeTracker: React.FC = () => {
  const totalHours = OVERTIME_DATA.reduce((s, d) => s + d.hours, 0);

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h4 className="font-bold text-slate-800 text-sm">Overtime Tracker</h4>
          <p className="text-xs text-slate-400">Hours this month by dept</p>
        </div>
        <span className="material-symbols-outlined text-amber-500">schedule</span>
      </div>
      <div className="space-y-3">
        {OVERTIME_DATA.map((d) => {
          const pct = Math.round((d.hours / d.budget) * 100);
          const over = d.hours > d.budget;
          return (
            <div key={d.dept}>
              <div className="flex justify-between text-xs mb-1">
                <span className="font-semibold text-slate-700">{d.dept}</span>
                <span className={`font-bold ${over ? "text-red-500" : "text-slate-600"}`}>
                  {d.hours}h / {d.budget}h
                </span>
              </div>
              <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-700 ${over ? "bg-red-500" : d.color}`}
                  style={{ width: `${Math.min(pct, 100)}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
      <p className="text-[10px] text-slate-400 mt-4">
        Total: {totalHours}h overtime this cycle
      </p>
    </div>
  );
};
