import React from "react";

interface CompareEmployee {
  id: string;
  name: string;
  initials: string;
  avatarColor: string;
  role: string;
  department: string;
  dailyWage: number;
  status: string;
  contractType?: string;
  payGrade?: string;
}

interface EmployeeComparisonModalProps {
  empA: CompareEmployee;
  empB: CompareEmployee;
  onClose: () => void;
}

const fmt = (n: number) => n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

const Row: React.FC<{ label: string; a: string; b: string; highlight?: boolean }> = ({ label, a, b, highlight }) => (
  <div className={`grid grid-cols-[1fr_auto_1fr] gap-2 items-center py-2.5 border-b border-slate-100 last:border-0 ${highlight ? "bg-blue-50/40 -mx-4 px-4 rounded" : ""}`}>
    <span className="text-sm font-semibold text-slate-800 text-right">{a}</span>
    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center w-28">{label}</span>
    <span className="text-sm font-semibold text-slate-800">{b}</span>
  </div>
);

export const EmployeeComparisonModal: React.FC<EmployeeComparisonModalProps> = ({ empA, empB, onClose }) => {
  const wageA = empA.dailyWage;
  const wageB = empB.dailyWage;
  const diff = wageA - wageB;
  const monthA = wageA * 22;
  const monthB = wageB * 22;

  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-blue-500">compare</span>
            <h3 className="font-bold text-slate-800">Employee Comparison</h3>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-lg text-slate-400"><span className="material-symbols-outlined">close</span></button>
        </div>

        {/* Avatar header */}
        <div className="grid grid-cols-2 gap-4 px-6 pt-6 pb-4">
          {[empA, empB].map((e) => (
            <div key={e.id} className="flex flex-col items-center text-center">
              <div className={`w-14 h-14 rounded-full flex items-center justify-center text-lg font-bold ${e.avatarColor}`}>{e.initials}</div>
              <p className="font-bold text-slate-800 mt-2 text-sm">{e.name}</p>
              <p className="text-xs text-slate-500">{e.role}</p>
            </div>
          ))}
        </div>

        {/* Rows */}
        <div className="px-6 pb-6">
          <Row label="Department"   a={empA.department}              b={empB.department} />
          <Row label="Contract"     a={empA.contractType ?? "—"}     b={empB.contractType ?? "—"} />
          <Row label="Pay Grade"    a={empA.payGrade ?? "—"}         b={empB.payGrade ?? "—"} />
          <Row label="Status"       a={empA.status}                  b={empB.status} />
          <Row label="Daily Rate"   a={fmt(wageA)}                   b={fmt(wageB)} highlight />
          <Row label="Est. Monthly" a={fmt(monthA)}                  b={fmt(monthB)} />

          {/* Wage diff bar */}
          <div className="mt-4 p-3 bg-slate-50 rounded-xl">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Daily Rate Difference</p>
            <div className="flex items-center gap-3">
              <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full ${diff >= 0 ? "bg-blue-500 ml-auto" : "bg-purple-500"}`}
                  style={{ width: `${Math.abs(diff) / Math.max(wageA, wageB) * 100}%`, marginLeft: diff >= 0 ? "auto" : undefined }}
                />
              </div>
              <span className={`text-sm font-extrabold ${diff === 0 ? "text-slate-500" : diff > 0 ? "text-blue-600" : "text-purple-600"}`}>
                {diff === 0 ? "Equal" : `${diff > 0 ? empA.name.split(" ")[0] : empB.name.split(" ")[0]} +${fmt(Math.abs(diff))}/day`}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
