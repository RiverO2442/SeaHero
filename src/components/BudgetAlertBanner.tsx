import React from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

interface BudgetAlertBannerProps {
  totalPayroll: number;
  budgetThreshold?: number;
}

export const BudgetAlertBanner: React.FC<BudgetAlertBannerProps> = ({
  totalPayroll,
  budgetThreshold = 450000,
}) => {
  const [dismissed, setDismissed] = useLocalStorage("budget_alert_dismissed_oct2026", false);

  if (dismissed || totalPayroll <= budgetThreshold) return null;

  const overage = totalPayroll - budgetThreshold;
  const pct = ((overage / budgetThreshold) * 100).toFixed(1);

  return (
    <div className="flex items-center gap-4 px-5 py-3 bg-amber-50 border border-amber-200 rounded-xl">
      <div className="w-9 h-9 bg-amber-100 rounded-lg flex items-center justify-center text-amber-600 shrink-0">
        <span className="material-symbols-outlined">warning</span>
      </div>
      <div className="flex-1">
        <p className="text-sm font-bold text-amber-800">Budget Threshold Exceeded</p>
        <p className="text-xs text-amber-700">
          Total payroll ${totalPayroll.toLocaleString("en-US")} exceeds budget of $
          {budgetThreshold.toLocaleString("en-US")} by{" "}
          <span className="font-bold">
            ${overage.toLocaleString("en-US")} ({pct}%)
          </span>
          . Review payroll allocations.
        </p>
      </div>
      <button
        onClick={() => setDismissed(true)}
        className="p-1.5 text-amber-500 hover:text-amber-700 hover:bg-amber-100 rounded-lg transition-colors shrink-0"
      >
        <span className="material-symbols-outlined text-sm">close</span>
      </button>
    </div>
  );
};
