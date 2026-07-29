import React, { useState } from "react";

const DEPTS = ["Engineering", "Design", "Marketing", "Sales", "HR", "Finance", "Operations"];

interface DeptPlan {
  dept: string;
  current: number;
  targetHires: number;
  projectedLeaves: number;
  budgetAllocated: number;
  avgSalary: number;
}

const SEED: DeptPlan[] = [
  { dept: "Engineering",  current: 24, targetHires: 6,  projectedLeaves: 2, budgetAllocated: 520000, avgSalary: 72000 },
  { dept: "Design",       current: 8,  targetHires: 2,  projectedLeaves: 1, budgetAllocated: 160000, avgSalary: 58000 },
  { dept: "Marketing",    current: 10, targetHires: 3,  projectedLeaves: 1, budgetAllocated: 220000, avgSalary: 52000 },
  { dept: "Sales",        current: 15, targetHires: 5,  projectedLeaves: 3, budgetAllocated: 280000, avgSalary: 48000 },
  { dept: "HR",           current: 6,  targetHires: 1,  projectedLeaves: 0, budgetAllocated: 90000,  avgSalary: 46000 },
  { dept: "Finance",      current: 7,  targetHires: 1,  projectedLeaves: 1, budgetAllocated: 130000, avgSalary: 62000 },
  { dept: "Operations",   current: 12, targetHires: 2,  projectedLeaves: 2, budgetAllocated: 180000, avgSalary: 44000 },
];

const fmt = (n: number) => `£${n.toLocaleString()}`;

const BAR_COLORS = [
  "bg-blue-500","bg-violet-500","bg-pink-500","bg-amber-500","bg-teal-500","bg-green-500","bg-orange-500"
];

export default function WorkforcePlanningPage() {
  const [plans, setPlans] = useState<DeptPlan[]>(SEED);
  const [editIdx, setEditIdx] = useState<number | null>(null);
  const [editVal, setEditVal] = useState<Partial<DeptPlan>>({});
  const [horizon, setHorizon] = useState<"3m" | "6m" | "12m">("6m");

  const multiplier = horizon === "3m" ? 0.5 : horizon === "6m" ? 1 : 2;

  const totals = plans.reduce(
    (acc, p) => {
      const projected = p.current + Math.round(p.targetHires * multiplier) - Math.round(p.projectedLeaves * multiplier);
      const costImpact = Math.round(p.targetHires * multiplier) * p.avgSalary;
      return {
        current: acc.current + p.current,
        projected: acc.projected + projected,
        budget: acc.budget + p.budgetAllocated,
        costImpact: acc.costImpact + costImpact,
      };
    },
    { current: 0, projected: 0, budget: 0, costImpact: 0 }
  );

  const openEdit = (i: number) => {
    setEditIdx(i);
    setEditVal({ ...plans[i] });
  };
  const saveEdit = () => {
    if (editIdx === null) return;
    setPlans(p => p.map((r, i) => i === editIdx ? { ...r, ...editVal } as DeptPlan : r));
    setEditIdx(null);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Workforce Planning</h1>
          <p className="text-sm text-slate-500 mt-1">Headcount forecast, hire targets, and budget projections</p>
        </div>
        <div className="flex gap-2">
          {(["3m","6m","12m"] as const).map(h => (
            <button
              key={h}
              onClick={() => setHorizon(h)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${horizon === h ? "bg-blue-600 text-white" : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-50"}`}
            >{h} horizon</button>
          ))}
        </div>
      </div>

      {/* Summary KPI cards */}
      <div className="grid grid-cols-4 gap-5">
        {[
          { label: "Current Headcount", value: totals.current, icon: "group", color: "text-blue-600" },
          { label: `Projected (${horizon})`, value: totals.projected, icon: "trending_up", color: "text-green-600" },
          { label: "Total Budget Allocated", value: fmt(totals.budget), icon: "account_balance_wallet", color: "text-violet-600" },
          { label: "Hire Cost Impact", value: fmt(totals.costImpact), icon: "payments", color: "text-amber-600" },
        ].map(c => (
          <div key={c.label} className="bg-white dark:bg-slate-800 rounded-xl p-5 shadow-sm border border-slate-100 dark:border-slate-700">
            <div className="flex items-center gap-2 mb-2">
              <span className={`material-symbols-outlined text-lg ${c.color}`}>{c.icon}</span>
              <span className="text-xs text-slate-500 font-medium">{c.label}</span>
            </div>
            <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">{c.value}</p>
          </div>
        ))}
      </div>

      {/* Headcount bar chart */}
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 p-6">
        <h2 className="text-base font-semibold text-slate-800 dark:text-slate-100 mb-5">Headcount by Department</h2>
        <div className="space-y-4">
          {plans.map((p, i) => {
            const projected = p.current + Math.round(p.targetHires * multiplier) - Math.round(p.projectedLeaves * multiplier);
            const max = Math.max(...plans.map(x => x.current + x.targetHires * 2));
            const pctCurrent = (p.current / max) * 100;
            const pctProjected = (projected / max) * 100;
            return (
              <div key={p.dept} className="space-y-1">
                <div className="flex justify-between text-xs text-slate-600 dark:text-slate-400">
                  <span className="font-medium">{p.dept}</span>
                  <span>{p.current} → <span className="font-semibold text-slate-900 dark:text-white">{projected}</span></span>
                </div>
                <div className="relative h-4 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                  <div className={`absolute h-full rounded-full opacity-30 ${BAR_COLORS[i]}`} style={{ width: `${pctProjected}%` }} />
                  <div className={`absolute h-full rounded-full ${BAR_COLORS[i]}`} style={{ width: `${pctCurrent}%` }} />
                </div>
              </div>
            );
          })}
        </div>
        <div className="flex gap-5 mt-4 text-xs text-slate-500">
          <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-blue-500 inline-block" /> Current</span>
          <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-blue-200 inline-block" /> Projected</span>
        </div>
      </div>

      {/* Detail table */}
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-700 flex items-center justify-between">
          <h2 className="text-base font-semibold text-slate-800 dark:text-slate-100">Department Plan Detail</h2>
          <span className="text-xs text-slate-400">Click a row to edit targets</span>
        </div>
        <table className="w-full text-sm">
          <thead className="bg-slate-50 dark:bg-slate-700/50">
            <tr className="text-xs text-slate-500 uppercase tracking-wide">
              <th className="px-6 py-3 text-left">Department</th>
              <th className="px-4 py-3 text-right">Current HC</th>
              <th className="px-4 py-3 text-right">Target Hires</th>
              <th className="px-4 py-3 text-right">Proj. Leaves</th>
              <th className="px-4 py-3 text-right">Net Change</th>
              <th className="px-4 py-3 text-right">Projected HC</th>
              <th className="px-4 py-3 text-right">Budget</th>
              <th className="px-4 py-3 text-right">Hire Cost</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
            {plans.map((p, i) => {
              const hires = Math.round(p.targetHires * multiplier);
              const leaves = Math.round(p.projectedLeaves * multiplier);
              const net = hires - leaves;
              const projected = p.current + net;
              const hireCost = hires * p.avgSalary;
              return (
                <tr key={p.dept} className="hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors">
                  <td className="px-6 py-3 font-medium text-slate-800 dark:text-slate-200">{p.dept}</td>
                  <td className="px-4 py-3 text-right text-slate-600 dark:text-slate-400">{p.current}</td>
                  <td className="px-4 py-3 text-right text-green-600 font-medium">+{hires}</td>
                  <td className="px-4 py-3 text-right text-red-500 font-medium">-{leaves}</td>
                  <td className={`px-4 py-3 text-right font-semibold ${net >= 0 ? "text-green-600" : "text-red-500"}`}>{net >= 0 ? "+" : ""}{net}</td>
                  <td className="px-4 py-3 text-right font-bold text-slate-900 dark:text-slate-100">{projected}</td>
                  <td className="px-4 py-3 text-right text-slate-500">{fmt(p.budgetAllocated)}</td>
                  <td className="px-4 py-3 text-right text-amber-600 font-medium">{fmt(hireCost)}</td>
                  <td className="px-4 py-3 text-right">
                    <button onClick={() => openEdit(i)} className="text-blue-500 hover:text-blue-700 text-xs font-medium">Edit</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Edit modal */}
      {editIdx !== null && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center" onClick={() => setEditIdx(null)}>
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl p-6 w-96" onClick={e => e.stopPropagation()}>
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 mb-4">Edit — {plans[editIdx].dept}</h3>
            <div className="space-y-3">
              {([
                ["targetHires", "Target Hires (annual)"],
                ["projectedLeaves", "Projected Leaves (annual)"],
                ["budgetAllocated", "Budget Allocated (£)"],
                ["avgSalary", "Avg Salary (£)"],
              ] as [keyof DeptPlan, string][]).map(([k, label]) => (
                <div key={k}>
                  <label className="text-xs text-slate-500 font-medium block mb-1">{label}</label>
                  <input
                    type="number"
                    value={editVal[k] as number ?? ""}
                    onChange={e => setEditVal(v => ({ ...v, [k]: Number(e.target.value) }))}
                    className="w-full border border-slate-200 dark:border-slate-600 rounded-lg px-3 py-2 text-sm bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              ))}
            </div>
            <div className="flex gap-3 mt-5">
              <button onClick={saveEdit} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold py-2 rounded-lg transition-colors">Save</button>
              <button onClick={() => setEditIdx(null)} className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-semibold py-2 rounded-lg transition-colors">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
