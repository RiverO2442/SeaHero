import React from "react";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct"];
const PAYROLL_TREND = [310, 325, 318, 340, 352, 365, 378, 390, 410, 453]; // £k
const DEPT_COSTS = [
  { dept: "Engineering",    cost: 182, color: "bg-blue-500",    textColor: "text-blue-600" },
  { dept: "Product Design", cost: 89,  color: "bg-purple-500",  textColor: "text-purple-600" },
  { dept: "Operations",     cost: 71,  color: "bg-slate-400",   textColor: "text-slate-600" },
  { dept: "Marketing",      cost: 58,  color: "bg-emerald-500", textColor: "text-emerald-600" },
  { dept: "Finance",        cost: 34,  color: "bg-amber-500",   textColor: "text-amber-600" },
  { dept: "HR",             cost: 19,  color: "bg-rose-500",    textColor: "text-rose-600" },
];
const TOTAL_COST = DEPT_COSTS.reduce((s, d) => s + d.cost, 0);

const H = 160;
const W = 700;
const maxVal = Math.max(...PAYROLL_TREND);

function toY(v: number) {
  return H - (v / maxVal) * H;
}

const xs = PAYROLL_TREND.map((_, i) => (i / (PAYROLL_TREND.length - 1)) * W);
const points = PAYROLL_TREND.map((v, i) => `${xs[i]},${toY(v)}`).join(" ");
const area = `${xs[0]},${H} ` + points + ` ${xs[xs.length - 1]},${H}`;

export const EnhancedReportCharts: React.FC = () => (
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
    {/* Payroll trend line chart */}
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center gap-2 mb-5">
        <span className="material-symbols-outlined text-blue-500">trending_up</span>
        <div>
          <h4 className="font-bold text-slate-800">Payroll Trend</h4>
          <p className="text-xs text-slate-400">10-month gross payroll (£k)</p>
        </div>
        <div className="ml-auto text-right">
          <p className="text-lg font-extrabold text-blue-600">£{PAYROLL_TREND[PAYROLL_TREND.length-1]}k</p>
          <p className="text-xs text-emerald-500 flex items-center gap-0.5 justify-end">
            <span className="material-symbols-outlined text-xs">arrow_upward</span>
            +{(((PAYROLL_TREND[PAYROLL_TREND.length-1] - PAYROLL_TREND[0]) / PAYROLL_TREND[0]) * 100).toFixed(0)}% YTD
          </p>
        </div>
      </div>

      <div className="relative overflow-hidden" style={{ height: H + 32 }}>
        <svg width="100%" height={H} viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" className="absolute inset-0">
          <defs>
            <linearGradient id="rptGrad" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
            </linearGradient>
          </defs>
          {[0.25, 0.5, 0.75, 1].map((t) => (
            <line key={t} x1="0" x2={W} y1={H * (1-t)} y2={H * (1-t)} stroke="#f0f4f7" strokeWidth="1" />
          ))}
          <polygon points={area} fill="url(#rptGrad)" />
          <polyline points={points} fill="none" stroke="#3b82f6" strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" />
          {PAYROLL_TREND.map((v, i) => (
            <circle key={i} cx={xs[i]} cy={toY(v)} r="4" fill="#3b82f6" />
          ))}
        </svg>
        <div className="absolute bottom-0 left-0 right-0 flex justify-between px-0.5">
          {MONTHS.map((m) => (
            <span key={m} className="text-[9px] font-bold text-slate-400">{m}</span>
          ))}
        </div>
      </div>
    </div>

    {/* Dept cost horizontal bar chart */}
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center gap-2 mb-5">
        <span className="material-symbols-outlined text-purple-500">bar_chart</span>
        <div>
          <h4 className="font-bold text-slate-800">Dept Cost Breakdown</h4>
          <p className="text-xs text-slate-400">Monthly payroll cost by department (£k)</p>
        </div>
        <div className="ml-auto text-right">
          <p className="text-lg font-extrabold text-purple-600">£{TOTAL_COST}k</p>
          <p className="text-xs text-slate-400">Total monthly</p>
        </div>
      </div>

      <div className="space-y-4">
        {DEPT_COSTS.map((d) => {
          const pct = (d.cost / TOTAL_COST) * 100;
          return (
            <div key={d.dept}>
              <div className="flex justify-between items-center mb-1.5">
                <span className="text-sm font-semibold text-slate-700">{d.dept}</span>
                <div className="flex items-center gap-2">
                  <span className={`text-xs font-bold ${d.textColor}`}>£{d.cost}k</span>
                  <span className="text-xs text-slate-400">({pct.toFixed(0)}%)</span>
                </div>
              </div>
              <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
                <div className={`h-full rounded-full ${d.color} transition-all duration-700`} style={{ width: `${pct}%` }} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  </div>
);
