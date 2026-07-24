import React from "react";

interface TaxRow {
  label: string;
  amount: number;
  rate: string;
  color: string;
  icon: string;
}

const GROSS = 452890;

const ROWS: TaxRow[] = [
  { label: "Gross Payroll",   amount: GROSS,  rate: "100%",   color: "text-slate-800", icon: "account_balance_wallet" },
  { label: "PAYE Income Tax", amount: 90578,  rate: "20%",    color: "text-red-600",   icon: "receipt_long" },
  { label: "Employer NI",     amount: 49817,  rate: "11%",    color: "text-amber-600", icon: "business" },
  { label: "Employee NI",     amount: 54347,  rate: "12%",    color: "text-orange-600",icon: "person" },
  { label: "Pension (Emp.)",  amount: 18116,  rate: "4%",     color: "text-blue-600",  icon: "savings" },
  { label: "Pension (Er.)",   amount: 22645,  rate: "5%",     color: "text-purple-600",icon: "corporate_fare" },
];

const NET = GROSS - ROWS.slice(1).reduce((s, r) => s + r.amount, 0);

export const PayrollTaxBreakdown: React.FC = () => (
  <div className="bg-white rounded-xl shadow-sm p-6">
    <div className="flex items-center gap-2 mb-5">
      <span className="material-symbols-outlined text-blue-500">calculate</span>
      <h4 className="font-bold text-slate-800">Tax & Deductions Breakdown</h4>
      <span className="text-xs text-slate-400 ml-auto">Jul 2026</span>
    </div>

    <div className="space-y-3">
      {ROWS.map((row) => (
        <div key={row.label} className="flex items-center gap-3">
          <span className={`material-symbols-outlined text-sm ${row.color}`}>{row.icon}</span>
          <span className="text-sm text-slate-600 flex-1">{row.label}</span>
          <span className="text-xs font-bold text-slate-400 w-10 text-right">{row.rate}</span>
          <span className={`text-sm font-bold w-24 text-right tabular-nums ${row.color}`}>
            £{row.amount.toLocaleString()}
          </span>
        </div>
      ))}

      {/* Net divider */}
      <div className="border-t border-slate-200 pt-3 flex items-center gap-3">
        <span className="material-symbols-outlined text-sm text-emerald-600">check_circle</span>
        <span className="text-sm font-bold text-slate-800 flex-1">Net Employee Pay</span>
        <span className="text-xs font-bold text-slate-400 w-10 text-right">
          {((NET / GROSS) * 100).toFixed(0)}%
        </span>
        <span className="text-sm font-extrabold text-emerald-600 w-24 text-right tabular-nums">
          £{NET.toLocaleString()}
        </span>
      </div>
    </div>

    {/* Visual bar */}
    <div className="mt-5">
      <div className="flex h-3 rounded-full overflow-hidden gap-0.5">
        <div className="bg-emerald-400" style={{ width: `${(NET/GROSS)*100}%` }} title={`Net: ${((NET/GROSS)*100).toFixed(0)}%`} />
        <div className="bg-red-400"    style={{ width: `${(ROWS[1].amount/GROSS)*100}%` }} title="PAYE" />
        <div className="bg-amber-400"  style={{ width: `${(ROWS[2].amount/GROSS)*100}%` }} title="Employer NI" />
        <div className="bg-orange-400" style={{ width: `${(ROWS[3].amount/GROSS)*100}%` }} title="Employee NI" />
        <div className="bg-blue-400"   style={{ width: `${(ROWS[4].amount/GROSS)*100}%` }} title="Pension Emp" />
        <div className="bg-purple-400" style={{ width: `${(ROWS[5].amount/GROSS)*100}%` }} title="Pension Er" />
      </div>
      <div className="flex gap-3 mt-2 flex-wrap">
        {[
          { label: "Net Pay", color: "bg-emerald-400" },
          { label: "PAYE",    color: "bg-red-400" },
          { label: "NI",      color: "bg-amber-400" },
          { label: "Pension", color: "bg-blue-400" },
        ].map((l) => (
          <div key={l.label} className="flex items-center gap-1">
            <div className={`w-2.5 h-2.5 rounded-sm ${l.color}`} />
            <span className="text-[10px] text-slate-500">{l.label}</span>
          </div>
        ))}
      </div>
    </div>
  </div>
);
