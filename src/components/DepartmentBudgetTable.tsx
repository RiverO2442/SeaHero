import React from "react";

const DEPT_BUDGET = [
  { dept: "Engineering", budget: 17640, spent: 16200, headcount: 42, color: "#2563eb" },
  { dept: "Product Design", budget: 6840, spent: 6100, headcount: 18, color: "#7c3aed" },
  { dept: "Marketing", budget: 6960, spent: 7200, headcount: 24, color: "#059669" },
  { dept: "Operations", budget: 9610, spent: 8900, headcount: 31, color: "#64748b" },
  { dept: "Finance", budget: 4320, spent: 4000, headcount: 12, color: "#d97706" },
  { dept: "HR", budget: 2430, spent: 2100, headcount: 9, color: "#e11d48" },
];

const fmt = (n: number) =>
  n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

const totalBudget = DEPT_BUDGET.reduce((s, d) => s + d.budget, 0);
const totalSpent = DEPT_BUDGET.reduce((s, d) => s + d.spent, 0);
const totalHeadcount = DEPT_BUDGET.reduce((s, d) => s + d.headcount, 0);

export const DepartmentBudgetTable: React.FC = () => (
  <div className="bg-white rounded-xl shadow-sm overflow-hidden">
    <div className="px-6 py-5 border-b border-slate-100 flex items-center gap-3">
      <div className="w-9 h-9 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600">
        <span className="material-symbols-outlined">table_chart</span>
      </div>
      <div>
        <h4 className="font-bold text-slate-800">Department Budget Breakdown</h4>
        <p className="text-xs text-slate-500">Allocated vs spent for current payroll cycle</p>
      </div>
    </div>
    <table className="w-full text-left">
      <thead>
        <tr className="bg-slate-50">
          {["Department", "Budget", "Spent", "Remaining", "Utilisation", "Headcount"].map((col) => (
            <th key={col} className="px-6 py-3.5 text-xs font-bold text-slate-500 uppercase tracking-wider">
              {col}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="divide-y divide-slate-50">
        {DEPT_BUDGET.map((d) => {
          const remaining = d.budget - d.spent;
          const pct = Math.round((d.spent / d.budget) * 100);
          const over = d.spent > d.budget;
          return (
            <tr key={d.dept} className="hover:bg-slate-50/60 transition-colors">
              <td className="px-6 py-4">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: d.color }} />
                  <span className="text-sm font-semibold text-slate-800">{d.dept}</span>
                </div>
              </td>
              <td className="px-6 py-4 text-sm font-semibold text-slate-700">{fmt(d.budget)}</td>
              <td className="px-6 py-4 text-sm font-bold text-slate-800">{fmt(d.spent)}</td>
              <td className="px-6 py-4">
                <span className={`text-sm font-bold ${remaining < 0 ? "text-red-600" : "text-emerald-600"}`}>
                  {remaining < 0 ? `−${fmt(Math.abs(remaining))}` : fmt(remaining)}
                </span>
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden max-w-[80px]">
                    <div
                      className={`h-full rounded-full transition-all duration-700 ${over ? "bg-red-500" : "bg-emerald-500"}`}
                      style={{ width: `${Math.min(pct, 100)}%` }}
                    />
                  </div>
                  <span className={`text-xs font-bold ${over ? "text-red-600" : "text-slate-600"}`}>{pct}%</span>
                </div>
              </td>
              <td className="px-6 py-4 text-sm text-slate-500">{d.headcount}</td>
            </tr>
          );
        })}
      </tbody>
      <tfoot>
        <tr className="bg-slate-50 border-t-2 border-slate-200">
          <td className="px-6 py-3 text-xs font-bold text-slate-500 uppercase">Total</td>
          <td className="px-6 py-3 text-sm font-extrabold text-slate-800">{fmt(totalBudget)}</td>
          <td className="px-6 py-3 text-sm font-extrabold text-slate-800">{fmt(totalSpent)}</td>
          <td className="px-6 py-3">
            <span className={`text-sm font-bold ${totalBudget - totalSpent < 0 ? "text-red-600" : "text-emerald-600"}`}>
              {fmt(totalBudget - totalSpent)}
            </span>
          </td>
          <td className="px-6 py-3 text-xs font-bold text-slate-500">
            {Math.round((totalSpent / totalBudget) * 100)}%
          </td>
          <td className="px-6 py-3 text-sm font-semibold text-slate-500">{totalHeadcount}</td>
        </tr>
      </tfoot>
    </table>
  </div>
);
