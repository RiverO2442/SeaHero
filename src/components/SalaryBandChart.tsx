import React from "react";

const BANDS = [
  { dept: "Engineering", min: 280, avg: 420, max: 550, color: "#2563eb" },
  { dept: "Product Design", min: 260, avg: 370, max: 480, color: "#7c3aed" },
  { dept: "Marketing", min: 180, avg: 290, max: 380, color: "#059669" },
  { dept: "Operations", min: 200, avg: 310, max: 400, color: "#64748b" },
  { dept: "Finance", min: 260, avg: 360, max: 460, color: "#d97706" },
  { dept: "HR", min: 180, avg: 270, max: 350, color: "#e11d48" },
];

const GLOBAL_MAX = Math.max(...BANDS.map((b) => b.max));

export const SalaryBandChart: React.FC = () => (
  <div className="bg-white rounded-xl shadow-sm p-6">
    <h4 className="font-bold text-slate-800 mb-1">Salary Band Chart</h4>
    <p className="text-xs text-slate-500 mb-6">Min / Avg / Max daily rate per department</p>
    <div className="space-y-5">
      {BANDS.map((b) => {
        const minPct = (b.min / GLOBAL_MAX) * 100;
        const maxPct = (b.max / GLOBAL_MAX) * 100;
        const avgPct = (b.avg / GLOBAL_MAX) * 100;
        return (
          <div key={b.dept}>
            <div className="flex justify-between text-xs mb-2">
              <span className="font-semibold text-slate-700">{b.dept}</span>
              <span className="text-slate-400">
                ${b.min} – <strong className="text-slate-700">${b.avg}</strong> – ${b.max}
              </span>
            </div>
            <div className="relative h-3 bg-slate-100 rounded-full">
              <div
                className="absolute top-0 h-full rounded-full opacity-25"
                style={{
                  left: `${minPct}%`,
                  width: `${maxPct - minPct}%`,
                  backgroundColor: b.color,
                }}
              />
              <div
                className="absolute top-0 h-full rounded-full border-2"
                style={{
                  left: `${minPct}%`,
                  width: `${maxPct - minPct}%`,
                  borderColor: b.color,
                  backgroundColor: "transparent",
                }}
              />
              <div
                className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full border-2 border-white shadow-sm"
                style={{ left: `calc(${avgPct}% - 6px)`, backgroundColor: b.color }}
                title={`Avg: $${b.avg}`}
              />
            </div>
          </div>
        );
      })}
    </div>
    <div className="flex items-center gap-6 mt-5 text-[10px] text-slate-400">
      <span className="flex items-center gap-1.5">
        <span className="w-4 h-2 rounded bg-slate-300 inline-block" />
        Band range
      </span>
      <span className="flex items-center gap-1.5">
        <span className="w-3 h-3 rounded-full bg-blue-600 inline-block" />
        Avg rate
      </span>
    </div>
  </div>
);
