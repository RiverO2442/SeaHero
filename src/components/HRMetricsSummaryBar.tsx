import React from "react";

interface Metric {
  icon: string;
  label: string;
  value: string;
  sub: string;
  iconColor: string;
  iconBg: string;
}

const METRICS: Metric[] = [
  { icon: "groups",            label: "Total Headcount",   value: "1,261", sub: "▲ 9 this month",    iconColor: "text-blue-600",    iconBg: "bg-blue-50"    },
  { icon: "trending_down",     label: "Turnover Rate",     value: "2.6%",  sub: "▼ 0.8% vs last mo", iconColor: "text-rose-600",    iconBg: "bg-rose-50"    },
  { icon: "person_search",     label: "Open Vacancies",    value: "13",    sub: "Across 5 depts",    iconColor: "text-amber-600",   iconBg: "bg-amber-50"   },
  { icon: "workspace_premium", label: "Avg Salary",        value: "$3,640", sub: "Per employee/mo",  iconColor: "text-purple-600",  iconBg: "bg-purple-50"  },
  { icon: "event_available",   label: "Avg Tenure",        value: "2.4 yrs", sub: "Company-wide",   iconColor: "text-emerald-600", iconBg: "bg-emerald-50" },
];

export const HRMetricsSummaryBar: React.FC = () => (
  <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-5 gap-4">
    {METRICS.map((m) => (
      <div key={m.label} className="bg-white rounded-xl shadow-sm p-4 flex items-center gap-3">
        <div className={`p-2.5 rounded-lg ${m.iconBg} ${m.iconColor} shrink-0`}>
          <span className="material-symbols-outlined text-xl">{m.icon}</span>
        </div>
        <div className="min-w-0">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider truncate">{m.label}</p>
          <p className="text-base font-extrabold text-slate-800 tabular-nums leading-tight">{m.value}</p>
          <p className="text-[10px] text-slate-400 truncate">{m.sub}</p>
        </div>
      </div>
    ))}
  </div>
);
