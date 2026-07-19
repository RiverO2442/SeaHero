import React, { useState, useEffect } from "react";

interface Props {
  onClose: () => void;
}

function calcTax(gross: number): number {
  const PA = 12570;
  const BR_LIMIT = 50270;
  const HR_LIMIT = 125140;
  if (gross <= PA) return 0;
  if (gross <= BR_LIMIT) return (gross - PA) * 0.20;
  if (gross <= HR_LIMIT) return (BR_LIMIT - PA) * 0.20 + (gross - BR_LIMIT) * 0.40;
  return (BR_LIMIT - PA) * 0.20 + (HR_LIMIT - BR_LIMIT) * 0.40 + (gross - HR_LIMIT) * 0.45;
}

function calcNI(gross: number): number {
  const L1 = 12570;
  const L2 = 50270;
  if (gross <= L1) return 0;
  if (gross <= L2) return (gross - L1) * 0.08;
  return (L2 - L1) * 0.08 + (gross - L2) * 0.02;
}

const fmt = (n: number) =>
  n.toLocaleString("en-GB", { style: "currency", currency: "GBP", maximumFractionDigits: 0 });

const fmtM = (n: number) =>
  (n / 12).toLocaleString("en-GB", { style: "currency", currency: "GBP", maximumFractionDigits: 0 });

const Row: React.FC<{ label: string; annual: number; icon: string; color: string; sub?: boolean }> = ({
  label, annual, icon, color, sub,
}) => (
  <div className={`flex items-center justify-between py-3 ${sub ? "pl-4 border-l-2 border-slate-100" : "border-t border-slate-100"}`}>
    <div className="flex items-center gap-2">
      <span className={`material-symbols-outlined text-base ${color}`}>{icon}</span>
      <span className={`text-sm ${sub ? "text-slate-500" : "font-semibold text-slate-700"}`}>{label}</span>
    </div>
    <div className="text-right">
      <p className={`text-sm font-bold ${sub ? "text-slate-500" : "text-slate-800"}`}>{fmt(annual)}</p>
      <p className="text-[10px] text-slate-400">{fmtM(annual)} / mo</p>
    </div>
  </div>
);

export const SalaryCalculatorModal: React.FC<Props> = ({ onClose }) => {
  const [gross, setGross] = useState(35000);
  const [pension, setPension] = useState(5);

  const paye   = calcTax(gross);
  const ni     = calcNI(gross);
  const pensionAmt = gross * (pension / 100);
  const net    = gross - paye - ni - pensionAmt;

  const effectiveRate = gross > 0 ? ((paye + ni) / gross) * 100 : 0;

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm" onClick={onClose}>
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-br from-blue-600 to-blue-700 px-6 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-white text-xl">calculate</span>
              <div>
                <h3 className="text-white font-extrabold text-lg">Salary Calculator</h3>
                <p className="text-blue-200 text-xs">UK take-home estimator (2024/25 rates)</p>
              </div>
            </div>
            <button onClick={onClose} className="text-blue-200 hover:text-white transition-colors">
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Gross salary input */}
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
              Gross Annual Salary
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-lg">£</span>
              <input
                type="number"
                min={0}
                max={500000}
                step={500}
                value={gross}
                onChange={(e) => setGross(Math.max(0, Number(e.target.value)))}
                className="w-full pl-9 pr-4 py-3 text-xl font-extrabold text-slate-800 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400"
              />
            </div>
            <input
              type="range"
              min={0}
              max={200000}
              step={500}
              value={Math.min(gross, 200000)}
              onChange={(e) => setGross(Number(e.target.value))}
              className="w-full mt-2 accent-blue-600"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-medium">
              <span>£0</span><span>£100k</span><span>£200k</span>
            </div>
          </div>

          {/* Pension slider */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Pension Contribution
              </label>
              <span className="text-sm font-extrabold text-blue-600">{pension}%</span>
            </div>
            <input
              type="range"
              min={0}
              max={10}
              step={1}
              value={pension}
              onChange={(e) => setPension(Number(e.target.value))}
              className="w-full accent-blue-600"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-medium mt-1">
              {[0,1,2,3,4,5,6,7,8,9,10].map((v) => (
                <span key={v}>{v}%</span>
              ))}
            </div>
          </div>

          {/* Breakdown */}
          <div className="bg-slate-50 rounded-xl px-4 py-2">
            <Row label="Gross Salary"     annual={gross}      icon="account_balance_wallet" color="text-blue-500" />
            <Row label="Income Tax (PAYE)" annual={paye}      icon="receipt_long"           color="text-rose-500" sub />
            <Row label="National Insurance" annual={ni}       icon="security"               color="text-orange-500" sub />
            <Row label={`Pension (${pension}%)`} annual={pensionAmt} icon="savings"         color="text-purple-500" sub />
          </div>

          {/* Net take-home */}
          <div className="bg-emerald-50 rounded-xl px-5 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center">
                <span className="material-symbols-outlined text-white text-lg">payments</span>
              </div>
              <div>
                <p className="text-xs font-bold text-emerald-700 uppercase tracking-wider">Take-Home Pay</p>
                <p className="text-[10px] text-emerald-600">Effective tax rate: {effectiveRate.toFixed(1)}%</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-2xl font-extrabold text-emerald-700">{fmt(net)}</p>
              <p className="text-xs font-semibold text-emerald-500">{fmtM(net)} / month</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
