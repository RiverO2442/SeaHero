import React from "react";
import { type Adjustment, type DepartmentStat } from "./types";

// ─── Recent Adjustments ───────────────────────────────────────────────────────

interface RecentAdjustmentsProps {
  adjustments: Adjustment[];
}

export const RecentAdjustments: React.FC<RecentAdjustmentsProps> = ({
  adjustments,
}) => (
  <div className="bg-white p-8 rounded-xl shadow-[0_10px_40px_rgba(42,52,57,0.06)]">
    <div className="flex items-center gap-3 mb-6">
      <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
        <span className="material-symbols-outlined text-purple-600">
          history
        </span>
      </div>
      <h4 className="text-xl font-bold">Recent Adjustments</h4>
    </div>

    <div className="space-y-4">
      {adjustments.map((adj) => (
        <div key={adj.id} className="flex justify-between items-start py-3">
          <div className="flex gap-4">
            <div
              className={`w-2 h-2 rounded-full mt-1.5 ${
                adj.type === "overtime" ? "bg-blue-600" : "bg-red-500"
              }`}
            />
            <div>
              <p className="text-sm font-bold">{adj.title}</p>
              <p className="text-xs text-slate-500">{adj.detail}</p>
            </div>
          </div>
          <span className="text-xs font-medium text-slate-500 whitespace-nowrap">
            {adj.time}
          </span>
        </div>
      ))}
    </div>
  </div>
);

// ─── Department Distribution ──────────────────────────────────────────────────

interface DepartmentDistributionProps {
  stats: DepartmentStat[];
  activeCount: number;
}

export const DepartmentDistribution: React.FC<DepartmentDistributionProps> = ({
  stats,
  activeCount,
}) => {
  // Build conic-gradient segments
  let cumulative = 0;
  const segments = stats.map((s) => {
    const start = cumulative;
    cumulative += s.percentage;
    return { ...s, start, end: cumulative };
  });

  return (
    <div className="bg-white p-8 rounded-xl shadow-[0_10px_40px_rgba(42,52,57,0.06)] overflow-hidden relative">
      {/* Decorative blob */}
      <div className="absolute -right-12 -top-12 w-48 h-48 bg-blue-50 rounded-full blur-3xl pointer-events-none" />

      <h4 className="text-xl font-bold mb-6">Department Distribution</h4>

      <div className="flex items-center gap-12 h-40">
        {/* Donut chart */}
        <div className="relative w-32 h-32 shrink-0">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
            <path
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="#f1f5f9"
              strokeDasharray="100, 100"
              strokeWidth="3"
            />
            <path
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="#2563eb"
              strokeDasharray={`${segments[0]?.percentage ?? 0}, 100`}
              strokeWidth="3"
            />
            <path
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="#7c3aed"
              strokeDasharray={`${segments[1]?.percentage ?? 0}, 100`}
              strokeDashoffset={`-${segments[0]?.percentage ?? 0}`}
              strokeWidth="3"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-xl font-extrabold">{activeCount}</span>
            <span className="text-[10px] uppercase font-bold text-slate-500">
              Active
            </span>
          </div>
        </div>

        {/* Legend */}
        <div className="flex-1 space-y-3">
          {stats.map((stat) => (
            <div key={stat.name} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${stat.colorClass}`} />
                <span className="text-sm font-medium">{stat.name}</span>
              </div>
              <span className="text-sm font-bold">{stat.percentage}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
