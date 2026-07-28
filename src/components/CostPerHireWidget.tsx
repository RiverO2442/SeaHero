import React from "react";

interface CostCategory {
  label: string;
  amount: number;
  icon: string;
  color: string;
  bar: string;
}

const COSTS: CostCategory[] = [
  { label: "Agency Fees",       amount: 7500, icon: "handshake",     color: "text-purple-600", bar: "bg-purple-500" },
  { label: "Job Board Ads",     amount: 2800, icon: "campaign",      color: "text-blue-600",   bar: "bg-blue-500"   },
  { label: "Interview Hours",   amount: 1400, icon: "groups",        color: "text-amber-600",  bar: "bg-amber-500"  },
  { label: "Onboarding",        amount: 950,  icon: "school",        color: "text-emerald-600",bar: "bg-emerald-500"},
  { label: "Background Checks", amount: 350,  icon: "verified_user", color: "text-slate-600",  bar: "bg-slate-400"  },
];

const total = COSTS.reduce((s, c) => s + c.amount, 0);
const fmt = (n: number) => `$${n.toLocaleString("en-US")}`;

export const CostPerHireWidget: React.FC = () => (
  <div className="bg-white rounded-xl shadow-sm p-6 mt-6">
    <div className="flex items-center gap-2 mb-5">
      <span className="material-symbols-outlined text-blue-500">savings</span>
      <h4 className="font-bold text-slate-800">Cost per Hire</h4>
      <span className="ml-auto text-lg font-extrabold text-slate-800">{fmt(total)}</span>
    </div>

    {/* Stacked bar */}
    <div className="h-4 rounded-full overflow-hidden flex gap-0.5 mb-4">
      {COSTS.map((c) => (
        <div
          key={c.label}
          className={`${c.bar} transition-all`}
          style={{ width: `${(c.amount / total) * 100}%` }}
          title={`${c.label}: ${fmt(c.amount)}`}
        />
      ))}
    </div>

    {/* Legend */}
    <div className="space-y-2.5">
      {COSTS.map((c) => (
        <div key={c.label} className="flex items-center gap-3">
          <span className={`material-symbols-outlined text-sm ${c.color}`}>{c.icon}</span>
          <span className="text-xs text-slate-600 flex-1">{c.label}</span>
          <span className="text-xs font-bold text-slate-700">{fmt(c.amount)}</span>
          <span className="text-[10px] text-slate-400 w-10 text-right">
            {((c.amount / total) * 100).toFixed(0)}%
          </span>
        </div>
      ))}
    </div>

    <div className="mt-4 pt-4 border-t border-slate-100 flex justify-between text-xs text-slate-500">
      <span>Based on last 3 hires</span>
      <span className="text-slate-400">Industry avg: $4,200</span>
    </div>
  </div>
);
