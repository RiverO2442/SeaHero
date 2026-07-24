import React from "react";

interface TrainingRow {
  dept: string;
  completed: number;
  total: number;
  color: string;
}

const ROWS: TrainingRow[] = [
  { dept: "Engineering",    completed: 18, total: 20, color: "bg-blue-500" },
  { dept: "Product Design", completed: 9,  total: 10, color: "bg-purple-500" },
  { dept: "Operations",     completed: 11, total: 15, color: "bg-slate-400" },
  { dept: "Marketing",      completed: 6,  total: 10, color: "bg-emerald-500" },
  { dept: "Finance",        completed: 7,  total: 8,  color: "bg-amber-500" },
  { dept: "HR",             completed: 5,  total: 7,  color: "bg-rose-500" },
];

export const TrainingTrackerWidget: React.FC = () => {
  const totalCompleted = ROWS.reduce((s, r) => s + r.completed, 0);
  const totalAll = ROWS.reduce((s, r) => s + r.total, 0);
  const overallPct = Math.round((totalCompleted / totalAll) * 100);

  return (
    <div className="bg-white rounded-xl shadow-sm p-5">
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-emerald-500">school</span>
          <h4 className="font-bold text-slate-800 text-sm">Training Completion</h4>
        </div>
        <span className="text-xs font-bold text-slate-400">{overallPct}% overall</span>
      </div>
      <p className="text-xs text-slate-400 mb-4">{totalCompleted}/{totalAll} modules completed</p>

      <div className="space-y-3">
        {ROWS.map((r) => {
          const pct = Math.round((r.completed / r.total) * 100);
          return (
            <div key={r.dept}>
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs font-medium text-slate-600">{r.dept}</span>
                <span className="text-xs text-slate-400">{r.completed}/{r.total}</span>
              </div>
              <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div className={`h-full rounded-full ${r.color} transition-all duration-500`} style={{ width: `${pct}%` }} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
