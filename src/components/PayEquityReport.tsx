import React, { useState } from "react";

interface DeptEquity {
  department: string;
  maleAvg: number;
  femaleAvg: number;
  maleCount: number;
  femaleCount: number;
}

const DATA: DeptEquity[] = [
  { department: "Engineering",    maleAvg: 68000, femaleAvg: 64500, maleCount: 24, femaleCount: 8  },
  { department: "Product Design", maleAvg: 55000, femaleAvg: 54200, maleCount: 6,  femaleCount: 10 },
  { department: "Finance",        maleAvg: 72000, femaleAvg: 69800, maleCount: 9,  femaleCount: 7  },
  { department: "Marketing",      maleAvg: 48000, femaleAvg: 47500, maleCount: 5,  femaleCount: 14 },
  { department: "Operations",     maleAvg: 51000, femaleAvg: 49200, maleCount: 12, femaleCount: 8  },
  { department: "HR",             maleAvg: 45000, femaleAvg: 46000, maleCount: 3,  femaleCount: 9  },
];

const fmt = (n: number) => `$${(n / 1000).toFixed(1)}k`;
const gap = (male: number, female: number) => ((male - female) / male) * 100;

export const PayEquityReport: React.FC = () => {
  const [sortBy, setSortBy] = useState<"gap" | "dept">("gap");

  const sorted = [...DATA].sort((a, b) =>
    sortBy === "gap"
      ? gap(b.maleAvg, b.femaleAvg) - gap(a.maleAvg, a.femaleAvg)
      : a.department.localeCompare(b.department)
  );

  const totalMaleWeight  = DATA.reduce((s, d) => s + d.maleCount,   0);
  const totalFemaleWeight = DATA.reduce((s, d) => s + d.femaleCount, 0);
  const overallMale   = DATA.reduce((s, d) => s + d.maleAvg   * d.maleCount,   0) / totalMaleWeight;
  const overallFemale = DATA.reduce((s, d) => s + d.femaleAvg * d.femaleCount, 0) / totalFemaleWeight;
  const overallGap    = gap(overallMale, overallFemale);

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-purple-500">balance</span>
          <h4 className="font-bold text-slate-800">Pay Equity Report</h4>
        </div>
        <div className="flex gap-1.5">
          {(["gap", "dept"] as const).map((s) => (
            <button
              key={s}
              onClick={() => setSortBy(s)}
              className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
                sortBy === s ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {s === "gap" ? "By Gap" : "By Dept"}
            </button>
          ))}
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          { label: "Overall Male Avg",   value: fmt(overallMale),   color: "text-blue-700",   bg: "bg-blue-50"   },
          { label: "Overall Female Avg", value: fmt(overallFemale), color: "text-purple-700", bg: "bg-purple-50" },
          {
            label: "Pay Gap",
            value: `${overallGap.toFixed(1)}%`,
            color: overallGap > 5 ? "text-red-700" : "text-emerald-700",
            bg:    overallGap > 5 ? "bg-red-50"    : "bg-emerald-50",
          },
        ].map((m) => (
          <div key={m.label} className={`${m.bg} rounded-lg p-3 text-center`}>
            <p className={`text-lg font-extrabold ${m.color}`}>{m.value}</p>
            <p className="text-[11px] text-slate-500 mt-0.5">{m.label}</p>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-[11px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100">
              <th className="text-left pb-3">Department</th>
              <th className="text-right pb-3">♂ Avg</th>
              <th className="text-right pb-3">♀ Avg</th>
              <th className="text-right pb-3">Gap %</th>
              <th className="pb-3 pl-4">Variance</th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((d) => {
              const g = gap(d.maleAvg, d.femaleAvg);
              return (
                <tr key={d.department} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                  <td className="py-3 font-semibold text-slate-700">{d.department}</td>
                  <td className="py-3 text-right text-slate-600">{fmt(d.maleAvg)}</td>
                  <td className="py-3 text-right text-slate-600">{fmt(d.femaleAvg)}</td>
                  <td className={`py-3 text-right font-bold ${g > 5 ? "text-red-600" : g < 0 ? "text-emerald-600" : "text-slate-600"}`}>
                    {g > 0 ? "+" : ""}{g.toFixed(1)}%
                  </td>
                  <td className="py-3 pl-4">
                    <div className="w-24 h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${g > 5 ? "bg-red-400" : g < 0 ? "bg-emerald-400" : "bg-amber-400"}`}
                        style={{ width: `${Math.min(Math.abs(g) * 5, 100)}%` }}
                      />
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <p className="text-[11px] text-slate-400 mt-4">
        Positive % = male earns more than female on average. Data as of Jul 2026.
      </p>
    </div>
  );
};
