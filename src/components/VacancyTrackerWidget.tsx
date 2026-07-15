import React from "react";

const VACANCIES = [
  { dept: "Engineering", open: 5, target: 47 },
  { dept: "Product Design", open: 2, target: 20 },
  { dept: "Marketing", open: 3, target: 27 },
  { dept: "Operations", open: 1, target: 32 },
  { dept: "Finance", open: 2, target: 14 },
];

export const VacancyTrackerWidget: React.FC = () => {
  const totalOpen = VACANCIES.reduce((s, d) => s + d.open, 0);

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h4 className="font-bold text-slate-800 text-sm">Open Vacancies</h4>
          <p className="text-xs text-slate-400">Headcount gap by department</p>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-xl font-extrabold text-slate-800 tabular-nums">{totalOpen}</span>
          <span className="material-symbols-outlined text-rose-400 text-base">person_search</span>
        </div>
      </div>
      <div className="space-y-2.5">
        {VACANCIES.map((d) => (
          <div key={d.dept} className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-700 w-32 truncate">{d.dept}</span>
            <div className="flex items-center gap-2 flex-1 justify-end">
              <div className="flex gap-0.5">
                {Array.from({ length: d.open }).map((_, i) => (
                  <div key={i} className="w-2 h-2 rounded-sm bg-rose-400" />
                ))}
              </div>
              <span className="text-[10px] font-bold text-rose-500 w-8 text-right">{d.open} open</span>
            </div>
          </div>
        ))}
      </div>
      <p className="text-[10px] text-slate-400 mt-4">
        {totalOpen} positions unfilled across {VACANCIES.filter(d => d.open > 0).length} departments
      </p>
    </div>
  );
};
