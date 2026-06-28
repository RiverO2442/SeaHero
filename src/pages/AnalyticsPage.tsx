import React, { useState } from "react";
import { RingProgress } from "../components/RingProgress";

const DEPT_DATA = [
  { dept: "Engineering", headcount: 42, avgWage: 420, budget: 17640, color: "#2563eb", ring: "#2563eb" },
  { dept: "Product Design", headcount: 18, avgWage: 380, budget: 6840, color: "#7c3aed", ring: "#7c3aed" },
  { dept: "Marketing", headcount: 24, avgWage: 290, budget: 6960, color: "#059669", ring: "#059669" },
  { dept: "Operations", headcount: 31, avgWage: 310, budget: 9610, color: "#64748b", ring: "#64748b" },
  { dept: "Finance", headcount: 12, avgWage: 360, budget: 4320, color: "#d97706", ring: "#d97706" },
  { dept: "HR", headcount: 9, avgWage: 270, budget: 2430, color: "#e11d48", ring: "#e11d48" },
];

const MONTHLY_TREND = [
  { month: "Jan", total: 410000 },
  { month: "Feb", total: 418000 },
  { month: "Mar", total: 425000 },
  { month: "Apr", total: 419000 },
  { month: "May", total: 431000 },
  { month: "Jun", total: 438000 },
  { month: "Jul", total: 441000 },
  { month: "Aug", total: 453000 },
  { month: "Sep", total: 448000 },
  { month: "Oct", total: 460000 },
];

const fmt = (n: number) => n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

const totalHeadcount = DEPT_DATA.reduce((s, d) => s + d.headcount, 0);
const totalBudget = DEPT_DATA.reduce((s, d) => s + d.budget, 0);
const maxBudget = Math.max(...DEPT_DATA.map((d) => d.budget));
const maxTrend = Math.max(...MONTHLY_TREND.map((m) => m.total));

const AnalyticsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"dept" | "trend">("dept");

  return (
    <div className="space-y-10">
      {/* Header */}
      <section className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-800">Analytics</h2>
          <p className="text-slate-500 font-medium mt-1">Workforce and payroll insights by department.</p>
        </div>
        <div className="flex bg-slate-100 p-1 rounded-lg gap-1">
          {(["dept", "trend"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setActiveTab(t)}
              className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${
                activeTab === t ? "bg-white shadow-sm text-slate-800" : "text-slate-500 hover:text-slate-700"
              }`}
            >
              {t === "dept" ? "By Department" : "Monthly Trend"}
            </button>
          ))}
        </div>
      </section>

      {/* KPI row */}
      <section className="grid grid-cols-3 gap-6">
        {[
          { icon: "group", label: "Total Headcount", value: totalHeadcount, color: "text-blue-600", bg: "bg-blue-50" },
          { icon: "account_balance_wallet", label: "Monthly Budget", value: fmt(totalBudget), color: "text-emerald-600", bg: "bg-emerald-50" },
          { icon: "corporate_fare", label: "Departments", value: DEPT_DATA.length, color: "text-purple-600", bg: "bg-purple-50" },
        ].map((c) => (
          <div key={c.label} className="bg-white p-6 rounded-xl shadow-sm flex items-center gap-5">
            <div className={`w-12 h-12 ${c.bg} rounded-xl flex items-center justify-center ${c.color} shrink-0`}>
              <span className="material-symbols-outlined text-xl">{c.icon}</span>
            </div>
            <div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">{c.label}</p>
              <p className={`text-2xl font-extrabold mt-0.5 ${c.color}`}>{c.value}</p>
            </div>
          </div>
        ))}
      </section>

      {/* Main chart */}
      {activeTab === "dept" ? (
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Budget bar chart */}
          <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm">
            <h4 className="font-bold text-slate-800 mb-1">Budget by Department</h4>
            <p className="text-xs text-slate-500 mb-6">Monthly payroll allocation per department</p>
            <div className="space-y-4">
              {DEPT_DATA.map((d) => (
                <div key={d.dept}>
                  <div className="flex justify-between text-sm mb-1.5">
                    <span className="font-semibold text-slate-700">{d.dept}</span>
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-slate-400">{d.headcount} ppl</span>
                      <span className="font-bold text-slate-800">{fmt(d.budget)}</span>
                    </div>
                  </div>
                  <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{
                        width: `${(d.budget / maxBudget) * 100}%`,
                        backgroundColor: d.color,
                      }}
                    />
                  </div>
                  <p className="text-[10px] text-slate-400 mt-1">
                    {((d.budget / totalBudget) * 100).toFixed(1)}% of total budget
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Headcount rings */}
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h4 className="font-bold text-slate-800 mb-1">Headcount Share</h4>
            <p className="text-xs text-slate-500 mb-6">Employees per department</p>
            <div className="grid grid-cols-2 gap-5">
              {DEPT_DATA.map((d) => (
                <div key={d.dept} className="flex flex-col items-center gap-1">
                  <RingProgress
                    value={(d.headcount / totalHeadcount) * 100}
                    size={72}
                    strokeWidth={6}
                    color={d.ring}
                  />
                  <p className="text-[11px] font-bold text-slate-700 text-center leading-tight">{d.dept}</p>
                  <p className="text-[10px] text-slate-400">{d.headcount} employees</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : (
        /* Monthly trend chart */
        <section className="bg-white p-6 rounded-xl shadow-sm">
          <h4 className="font-bold text-slate-800 mb-1">Monthly Payroll Trend</h4>
          <p className="text-xs text-slate-500 mb-6">Total payroll spend Jan–Oct 2026</p>
          <div className="flex items-end gap-3 h-48">
            {MONTHLY_TREND.map((m) => {
              const pct = (m.total / maxTrend) * 100;
              return (
                <div key={m.month} className="flex-1 flex flex-col items-center gap-1 group">
                  <span className="text-[10px] font-bold text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity">
                    {fmt(m.total)}
                  </span>
                  <div className="w-full relative">
                    <div
                      className="w-full bg-blue-600 hover:bg-blue-500 rounded-t-lg transition-all duration-500 cursor-default"
                      style={{ height: `${(pct / 100) * 160}px` }}
                    />
                  </div>
                  <span className="text-[10px] font-bold text-slate-500">{m.month}</span>
                </div>
              );
            })}
          </div>
          <div className="mt-4 pt-4 border-t border-slate-100 flex items-center gap-6 text-xs text-slate-500">
            <span>Min: <strong className="text-slate-800">{fmt(Math.min(...MONTHLY_TREND.map((m) => m.total)))}</strong></span>
            <span>Max: <strong className="text-slate-800">{fmt(Math.max(...MONTHLY_TREND.map((m) => m.total)))}</strong></span>
            <span>Avg: <strong className="text-slate-800">{fmt(MONTHLY_TREND.reduce((s, m) => s + m.total, 0) / MONTHLY_TREND.length)}</strong></span>
          </div>
        </section>
      )}
    </div>
  );
};

export default AnalyticsPage;
