import React from 'react';

export const KpiCards: React.FC = () => (
  <div className="grid grid-cols-4 gap-6 mb-10">
    {/* Total Employees */}
    <div className="bg-white p-6 rounded-xl shadow-[0_10px_40px_rgba(42,52,57,0.06)]">
      <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Total Employees</p>
      <h3 className="text-3xl font-extrabold text-slate-800">142</h3>
      <div className="mt-4 flex items-center gap-2 text-blue-600">
        <span className="text-xs font-bold">12 New this month</span>
      </div>
    </div>

    {/* Marked Present */}
    <div className="bg-white p-6 rounded-xl shadow-[0_10px_40px_rgba(42,52,57,0.06)]">
      <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Marked Present</p>
      <h3 className="text-3xl font-extrabold text-slate-800">128</h3>
      <div className="mt-4 w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
        <div className="bg-blue-600 h-full w-[90%]" />
      </div>
    </div>

    {/* Total Daily Payout */}
    <div className="bg-white p-6 rounded-xl shadow-[0_10px_40px_rgba(42,52,57,0.06)] border-l-4 border-blue-600">
      <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Total Daily Payout</p>
      <h3 className="text-3xl font-extrabold text-slate-800">$12,450</h3>
      <p className="mt-4 text-xs font-medium text-slate-500">Estimated based on log</p>
    </div>

    {/* Completion Status */}
    <div className="bg-gradient-to-br from-blue-600 to-blue-700 p-6 rounded-xl shadow-[0_10px_40px_rgba(42,52,57,0.06)] text-white">
      <p className="text-xs font-bold uppercase tracking-wider opacity-80 mb-1">Completion Status</p>
      <h3 className="text-3xl font-extrabold">88%</h3>
      <button className="mt-4 w-full bg-white/20 hover:bg-white/30 transition-colors py-2 rounded-lg text-xs font-bold">
        FINALIZE LOG
      </button>
    </div>
  </div>
);
