import React from "react";

interface DeptCount {
  dept: string;
  count: number;
  barColor: string;
}

const DEPT_COUNTS: DeptCount[] = [
  { dept: "Engineering",    count: 42, barColor: "bg-blue-500"    },
  { dept: "Operations",     count: 35, barColor: "bg-slate-500"   },
  { dept: "Marketing",      count: 24, barColor: "bg-emerald-500" },
  { dept: "Product Design", count: 18, barColor: "bg-purple-500"  },
  { dept: "Finance",        count: 15, barColor: "bg-amber-500"   },
  { dept: "HR",             count: 12, barColor: "bg-rose-500"    },
];

export const TeamHeadcountWidget: React.FC = () => {
  const max = Math.max(...DEPT_COUNTS.map((d) => d.count));
  const total = DEPT_COUNTS.reduce((s, d) => s + d.count, 0);

  return (
    <div className="bg-white p-5 rounded-xl shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h4 className="font-bold text-slate-800 text-sm">Team Headcount</h4>
          <p className="text-xs text-slate-500 mt-0.5">{total} total across {DEPT_COUNTS.length} depts</p>
        </div>
        <span className="material-symbols-outlined text-blue-400 text-xl">group</span>
      </div>

      <div className="space-y-3">
        {DEPT_COUNTS.map((d) => (
          <div key={d.dept} className="flex items-center gap-3">
            <span className="text-xs text-slate-500 w-24 shrink-0 truncate">{d.dept}</span>
            <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ${d.barColor}`}
                style={{ width: `${(d.count / max) * 100}%` }}
              />
            </div>
            <span className="text-xs font-bold text-slate-700 w-6 text-right">{d.count}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
