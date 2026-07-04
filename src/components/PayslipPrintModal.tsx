import React from "react";

export interface PayslipEntry {
  name: string;
  role: string;
  department: string;
  avatarUrl?: string;
  initials?: string;
  daysWorked: number;
  totalDays: number;
  dailyRate: number;
  overtime: number;
  grossPay: number;
  taxRate: number;
  deductions: number;
  netPay: number;
}

interface PayslipPrintModalProps {
  entry: PayslipEntry;
  period: string;
  onClose: () => void;
}

const fmt = (n: number) =>
  n.toLocaleString("en-US", { style: "currency", currency: "USD" });

export const PayslipPrintModal: React.FC<PayslipPrintModalProps> = ({
  entry,
  period,
  onClose,
}) => {
  const tax = entry.grossPay * entry.taxRate;
  const basePay = entry.daysWorked * entry.dailyRate;
  const otPay = entry.overtime * (entry.dailyRate / 8) * 1.5;

  return (
    <>
      <style>{`
        @media print {
          body > *:not(#payslip-print-modal) { display: none !important; }
          #payslip-print-modal { position: static !important; background: white !important; }
          .no-print { display: none !important; }
          .print-card { box-shadow: none !important; border: 1px solid #e2e8f0 !important; }
        }
      `}</style>
      <div
        id="payslip-print-modal"
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      >
        <div className="print-card bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden">
          <div className="no-print flex items-center justify-between px-6 py-4 border-b border-slate-100">
            <h3 className="font-bold text-slate-800">Payslip Preview</h3>
            <div className="flex gap-2">
              <button
                onClick={() => window.print()}
                className="px-4 py-2 bg-blue-600 text-white text-xs font-bold rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-1.5"
              >
                <span className="material-symbols-outlined text-sm">print</span>
                Print
              </button>
              <button
                onClick={onClose}
                className="p-2 hover:bg-slate-100 rounded-lg text-slate-400 transition-colors"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
          </div>

          <div className="px-6 py-5">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
              <div>
                <p className="font-extrabold text-slate-800 text-lg">SalaryPro</p>
                <p className="text-xs text-slate-500">Payslip for {period}</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-slate-500">Generated</p>
                <p className="text-xs font-bold text-slate-700">
                  {new Date().toLocaleDateString("en-GB")}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 mb-6">
              {entry.avatarUrl ? (
                <img
                  src={entry.avatarUrl}
                  alt={entry.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
              ) : (
                <div className="w-12 h-12 rounded-full bg-slate-200 flex items-center justify-center text-sm font-bold text-slate-600">
                  {entry.initials}
                </div>
              )}
              <div>
                <p className="font-extrabold text-slate-800">{entry.name}</p>
                <p className="text-xs text-slate-500">
                  {entry.role} · {entry.department}
                </p>
                <p className="text-xs text-slate-400 mt-0.5">
                  {entry.daysWorked}/{entry.totalDays} days worked
                </p>
              </div>
            </div>

            <div className="border border-slate-100 rounded-xl overflow-hidden mb-4">
              <div className="bg-slate-50 px-4 py-2 grid grid-cols-2 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                <span>Earnings</span>
                <span className="text-right">Amount</span>
              </div>
              {[
                { label: "Base Pay", value: fmt(basePay), detail: `${entry.daysWorked} days × ${fmt(entry.dailyRate)}` },
                ...(entry.overtime > 0
                  ? [{ label: "Overtime", value: `+${fmt(otPay)}`, detail: `${entry.overtime}h × 1.5x` }]
                  : []),
                { label: "Gross Pay", value: fmt(entry.grossPay), detail: "" },
              ].map((row) => (
                <div
                  key={row.label}
                  className="px-4 py-2.5 grid grid-cols-2 border-t border-slate-50 text-sm"
                >
                  <div>
                    <p className="font-semibold text-slate-700">{row.label}</p>
                    {row.detail && <p className="text-[10px] text-slate-400">{row.detail}</p>}
                  </div>
                  <span className="text-right font-bold text-slate-800">{row.value}</span>
                </div>
              ))}
            </div>

            <div className="border border-red-100 rounded-xl overflow-hidden mb-4">
              <div className="bg-red-50 px-4 py-2 grid grid-cols-2 text-[10px] font-bold text-red-500 uppercase tracking-wider">
                <span>Deductions</span>
                <span className="text-right">Amount</span>
              </div>
              {[
                {
                  label: "Income Tax",
                  value: `-${fmt(tax)}`,
                  detail: `${(entry.taxRate * 100).toFixed(0)}% rate`,
                },
                {
                  label: "Other Deductions",
                  value: `-${fmt(entry.deductions)}`,
                  detail: "Benefits & contributions",
                },
              ].map((row) => (
                <div
                  key={row.label}
                  className="px-4 py-2.5 grid grid-cols-2 border-t border-red-50 text-sm"
                >
                  <div>
                    <p className="font-semibold text-slate-700">{row.label}</p>
                    <p className="text-[10px] text-slate-400">{row.detail}</p>
                  </div>
                  <span className="text-right font-bold text-red-500">{row.value}</span>
                </div>
              ))}
            </div>

            <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl px-5 py-4 flex justify-between items-center">
              <div>
                <p className="text-xs font-bold text-blue-200 uppercase tracking-wider">Net Pay</p>
                <p className="text-xs text-blue-300 mt-0.5">After all deductions</p>
              </div>
              <p className="text-2xl font-extrabold text-white">{fmt(entry.netPay)}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
