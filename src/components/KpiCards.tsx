import React from "react";
import type { Employee } from "./types";

interface KpiCardsProps {
  employees: Employee[];
}

export const KpiCards: React.FC<KpiCardsProps> = ({ employees }) => {
  const present = employees.filter((e) => e.status === "Present").length;
  const halfDay = employees.filter((e) => e.status === "Half-day").length;
  const absent = employees.filter((e) => e.status === "Absent").length;
  const totalPayout = employees.reduce((sum, e) => {
    if (e.status === "Absent") return sum;
    return sum + e.hoursWorked * e.dailyRate;
  }, 0);
  const completionPct = employees.length > 0
    ? Math.round(((present + halfDay) / employees.length) * 100)
    : 0;

  return (
    <div className="grid grid-cols-4 gap-6 mb-10">
      {/* Total Employees */}
      <div className="bg-white p-6 rounded-xl shadow-[0_10px_40px_rgba(42,52,57,0.06)]">
        <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Total Employees</p>
        <h3 className="text-3xl font-extrabold text-slate-800">{employees.length}</h3>
        <div className="mt-4 flex items-center gap-2 text-blue-600">
          <span className="text-xs font-bold">{absent} absent today</span>
        </div>
      </div>

      {/* Marked Present */}
      <div className="bg-white p-6 rounded-xl shadow-[0_10px_40px_rgba(42,52,57,0.06)]">
        <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Marked Present</p>
        <h3 className="text-3xl font-extrabold text-slate-800">{present}</h3>
        <div className="mt-4 w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
          <div className="bg-blue-600 h-full transition-all duration-500" style={{ width: `${completionPct}%` }} />
        </div>
      </div>

      {/* Total Daily Payout */}
      <div className="bg-white p-6 rounded-xl shadow-[0_10px_40px_rgba(42,52,57,0.06)] border-l-4 border-blue-600">
        <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Total Daily Payout</p>
        <h3 className="text-3xl font-extrabold text-slate-800">${totalPayout.toFixed(0)}</h3>
        <p className="mt-4 text-xs font-medium text-slate-500">Live from current log</p>
      </div>

      {/* Completion Status */}
      <div className="bg-gradient-to-br from-blue-600 to-blue-700 p-6 rounded-xl shadow-[0_10px_40px_rgba(42,52,57,0.06)] text-white">
        <p className="text-xs font-bold uppercase tracking-wider opacity-80 mb-1">Completion Status</p>
        <h3 className="text-3xl font-extrabold">{completionPct}%</h3>
        <button className="mt-4 w-full bg-white/20 hover:bg-white/30 transition-colors py-2 rounded-lg text-xs font-bold">
          FINALIZE LOG
        </button>
      </div>
    </div>
  );
};
