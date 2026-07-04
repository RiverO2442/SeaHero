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

      {/* Tax breakdown donut */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h4 className="font-bold text-slate-800 mb-1">Tax Breakdown</h4>
          <p className="text-xs text-slate-500 mb-6">Gross vs tax vs deductions vs net — October 2026</p>
          {(() => {
            const gross = 47080;
            const tax = 7640;
            const deductions = 620;
            const net = gross - tax - deductions;
            const segments = [
              { label: "Net Pay", value: net, color: "#2563eb" },
              { label: "Tax Withheld", value: tax, color: "#e11d48" },
              { label: "Deductions", value: deductions, color: "#d97706" },
            ];
            const total = gross;
            let cumAngle = -Math.PI / 2;
            const cx = 90; const cy = 90; const r = 70; const inner = 42;
            const arcs = segments.map((s) => {
              const angle = (s.value / total) * 2 * Math.PI;
              const x1 = cx + r * Math.cos(cumAngle);
              const y1 = cy + r * Math.sin(cumAngle);
              cumAngle += angle;
              const x2 = cx + r * Math.cos(cumAngle);
              const y2 = cy + r * Math.sin(cumAngle);
              const ix1 = cx + inner * Math.cos(cumAngle - angle);
              const iy1 = cy + inner * Math.sin(cumAngle - angle);
              const ix2 = cx + inner * Math.cos(cumAngle);
              const iy2 = cy + inner * Math.sin(cumAngle);
              const large = angle > Math.PI ? 1 : 0;
              return { ...s, d: `M${x1},${y1} A${r},${r} 0 ${large},1 ${x2},${y2} L${ix2},${iy2} A${inner},${inner} 0 ${large},0 ${ix1},${iy1} Z`, pct: ((s.value / total) * 100).toFixed(1) };
            });
            return (
              <div className="flex items-center gap-8">
                <svg width={180} height={180} viewBox="0 0 180 180">
                  {arcs.map((a) => (
                    <path key={a.label} d={a.d} fill={a.color} className="hover:opacity-90 transition-opacity cursor-default" />
                  ))}
                  <text x={cx} y={cy - 6} textAnchor="middle" className="text-xs" fontSize={11} fontWeight="bold" fill="#1e293b">{fmt(net)}</text>
                  <text x={cx} y={cy + 10} textAnchor="middle" fontSize={9} fill="#64748b">net pay</text>
                </svg>
                <div className="space-y-3">
                  {arcs.map((a) => (
                    <div key={a.label} className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-sm shrink-0" style={{ backgroundColor: a.color }} />
                      <span className="text-xs text-slate-600">{a.label}</span>
                      <span className="text-xs font-bold text-slate-800 ml-auto pl-4">{a.pct}%</span>
                    </div>
                  ))}
                  <div className="pt-2 border-t border-slate-100">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-sm shrink-0 bg-slate-200" />
                      <span className="text-xs text-slate-600">Gross Total</span>
                      <span className="text-xs font-bold text-slate-800 ml-auto pl-4">{fmt(gross)}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })()}
        </div>

        {/* Wage distribution */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h4 className="font-bold text-slate-800 mb-1">Wage Distribution</h4>
          <p className="text-xs text-slate-500 mb-6">Headcount by daily rate bracket</p>
          {(() => {
            const brackets = [
              { label: "$400+", count: 12, color: "bg-blue-600" },
              { label: "$300–$400", count: 28, color: "bg-blue-400" },
              { label: "$200–$300", count: 45, color: "bg-blue-300" },
              { label: "Under $200", count: 51, color: "bg-slate-300" },
            ];
            const max = Math.max(...brackets.map((b) => b.count));
            return (
              <div className="space-y-4">
                {brackets.map((b) => (
                  <div key={b.label}>
                    <div className="flex justify-between text-sm mb-1.5">
                      <span className="font-semibold text-slate-700">{b.label}</span>
                      <span className="font-bold text-slate-800">{b.count} employees</span>
                    </div>
                    <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
                      <div className={`h-full rounded-full ${b.color} transition-all duration-700`} style={{ width: `${(b.count / max) * 100}%` }} />
                    </div>
                  </div>
                ))}
                <p className="text-xs text-slate-400 pt-2">136 total employees across all brackets</p>
              </div>
            );
          })()}
        </div>
      </section>

      {/* Department comparison table */}
      <section className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100">
          <h4 className="font-bold text-slate-800">Department Comparison</h4>
          <p className="text-xs text-slate-500 mt-0.5">Side-by-side payroll metrics by department</p>
        </div>
        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-50">
              {["Department", "Headcount", "Avg Daily Rate", "Monthly Budget", "% of Total", "Budget/Head"].map((col) => (
                <th key={col} className="px-6 py-3.5 text-xs font-bold text-slate-500 uppercase tracking-wider">{col}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {DEPT_DATA.map((d) => (
              <tr key={d.dept} className="hover:bg-slate-50/60 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: d.color }} />
                    <span className="text-sm font-semibold text-slate-800">{d.dept}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-slate-700">{d.headcount}</td>
                <td className="px-6 py-4 text-sm font-semibold text-slate-800">{fmt(d.avgWage)}</td>
                <td className="px-6 py-4 text-sm font-bold text-slate-800">{fmt(d.budget)}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden max-w-[80px]">
                      <div className="h-full rounded-full transition-all duration-500" style={{ width: `${(d.budget / totalBudget) * 100}%`, backgroundColor: d.color }} />
                    </div>
                    <span className="text-xs font-bold text-slate-600">{((d.budget / totalBudget) * 100).toFixed(1)}%</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-slate-500">{fmt(Math.round(d.budget / d.headcount))}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="bg-slate-50 border-t-2 border-slate-200">
              <td className="px-6 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Total</td>
              <td className="px-6 py-3 text-sm font-extrabold text-slate-800">{totalHeadcount}</td>
              <td className="px-6 py-3 text-sm font-semibold text-slate-500">—</td>
              <td className="px-6 py-3 text-sm font-extrabold text-blue-700">{fmt(totalBudget)}</td>
              <td className="px-6 py-3 text-xs font-bold text-slate-500">100%</td>
              <td className="px-6 py-3 text-sm font-semibold text-slate-500">{fmt(Math.round(totalBudget / totalHeadcount))}</td>
            </tr>
          </tfoot>
        </table>
      </section>
    </div>
  );
};

export default AnalyticsPage;
