import React from "react";
import { RingProgress } from "./RingProgress";

interface MonthlyTargetWidgetProps {
  spent?: number;
  budget?: number;
}

export const MonthlyTargetWidget: React.FC<MonthlyTargetWidgetProps> = ({
  spent = 452890,
  budget = 500000,
}) => {
  const pct = Math.min(100, Math.round((spent / budget) * 100));
  const over = spent > budget;
  const ringColor = over ? "#ef4444" : pct > 80 ? "#f59e0b" : "#3b82f6";

  const fmt = (n: number) =>
    n >= 1000 ? `$${(n / 1000).toFixed(1)}k` : `$${n}`;

  return (
    <div className="bg-white p-5 rounded-xl shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h4 className="font-bold text-slate-800 text-sm">Monthly Budget</h4>
          <p className="text-xs text-slate-500 mt-0.5">Payroll vs target</p>
        </div>
        {over && (
          <span className="px-2 py-0.5 text-[10px] font-bold bg-red-50 text-red-600 rounded-full">
            OVER BUDGET
          </span>
        )}
      </div>

      <div className="flex items-center gap-5">
        <RingProgress value={pct} size={72} strokeWidth={7} color={ringColor} />
        <div className="flex-1 space-y-2">
          <div>
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Spent</p>
            <p className="text-lg font-extrabold text-slate-800">{fmt(spent)}</p>
          </div>
          <div className="h-px bg-slate-100" />
          <div>
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Budget</p>
            <p className="text-sm font-bold text-slate-600">{fmt(budget)}</p>
          </div>
        </div>
      </div>

      <p className={`mt-4 text-xs flex items-center gap-1 ${over ? "text-red-500" : "text-emerald-500"}`}>
        <span className="material-symbols-outlined text-sm">
          {over ? "arrow_upward" : "arrow_downward"}
        </span>
        {over
          ? `${fmt(spent - budget)} over budget this month`
          : `${fmt(budget - spent)} remaining this month`}
      </p>
    </div>
  );
};
