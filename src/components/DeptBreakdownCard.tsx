import React, { useState } from "react";

interface DeptRow {
  dept: string;
  color: string;
  headcount: number;
  totalPay: number;
  avgPay: number;
  status: "Released" | "Pending" | "On Hold";
}

const DEPT_DATA: DeptRow[] = [
  { dept: "Engineering",    color: "bg-blue-100 text-blue-700",    headcount: 42, totalPay: 142800, avgPay: 3400, status: "Released" },
  { dept: "Product Design", color: "bg-purple-100 text-purple-700", headcount: 18, totalPay: 58500,  avgPay: 3250, status: "Released" },
  { dept: "Operations",     color: "bg-slate-200 text-slate-700",   headcount: 35, totalPay: 91000,  avgPay: 2600, status: "Pending"  },
  { dept: "Marketing",      color: "bg-emerald-100 text-emerald-700", headcount: 24, totalPay: 62400, avgPay: 2600, status: "Released" },
  { dept: "Finance",        color: "bg-amber-100 text-amber-700",   headcount: 15, totalPay: 52500,  avgPay: 3500, status: "On Hold"  },
  { dept: "HR",             color: "bg-rose-100 text-rose-700",     headcount: 12, totalPay: 33600,  avgPay: 2800, status: "Pending"  },
];

const STATUS_STYLE: Record<string, string> = {
  Released: "text-emerald-600 bg-emerald-50",
  Pending:  "text-amber-600 bg-amber-50",
  "On Hold": "text-red-600 bg-red-50",
};

export const DeptBreakdownCard: React.FC = () => {
  const [open, setOpen] = useState(false);
  const total = DEPT_DATA.reduce((s, d) => s + d.totalPay, 0);

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between px-6 py-4 hover:bg-slate-50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600">
            <span className="material-symbols-outlined">apartment</span>
          </div>
          <div className="text-left">
            <p className="font-bold text-slate-800">Department Breakdown</p>
            <p className="text-xs text-slate-500">Total: ${total.toLocaleString()}</p>
          </div>
        </div>
        <span className={`material-symbols-outlined text-slate-400 transition-transform duration-200 ${open ? "rotate-180" : ""}`}>
          expand_more
        </span>
      </button>

      {open && (
        <div className="border-t border-slate-100">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50">
                {["Department", "Headcount", "Total Pay", "Avg Pay", "Status"].map((col) => (
                  <th
                    key={col}
                    className={`px-6 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider ${
                      col === "Department" ? "text-left" : "text-right last:text-center"
                    }`}
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {DEPT_DATA.map((row) => (
                <tr key={row.dept} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-3">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${row.color}`}>
                      {row.dept}
                    </span>
                  </td>
                  <td className="px-6 py-3 text-right font-semibold text-slate-700">{row.headcount}</td>
                  <td className="px-6 py-3 text-right font-bold text-slate-800">${row.totalPay.toLocaleString()}</td>
                  <td className="px-6 py-3 text-right text-slate-600">${row.avgPay.toLocaleString()}</td>
                  <td className="px-6 py-3 text-center">
                    <span className={`px-2 py-0.5 rounded text-xs font-bold ${STATUS_STYLE[row.status] ?? ""}`}>
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="px-6 py-4 border-t border-slate-100">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Payroll Distribution</p>
            <div className="space-y-2">
              {DEPT_DATA.map((row) => (
                <div key={row.dept} className="flex items-center gap-3">
                  <span className="text-xs text-slate-500 w-28 shrink-0">{row.dept}</span>
                  <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-500 rounded-full transition-all duration-500"
                      style={{ width: `${(row.totalPay / total) * 100}%` }}
                    />
                  </div>
                  <span className="text-xs font-bold text-slate-600 w-8 text-right">
                    {Math.round((row.totalPay / total) * 100)}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
