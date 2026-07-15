import React, { useState } from "react";

const DEFAULT_STEPS = [
  { id: "contract",   label: "Contract signed & returned" },
  { id: "id_check",  label: "Right to work verification" },
  { id: "it_setup",  label: "Laptop & access provisioned" },
  { id: "payroll",   label: "Payroll details collected" },
  { id: "induction", label: "Induction session booked" },
  { id: "buddy",     label: "Buddy / mentor assigned" },
  { id: "tour",      label: "Office / remote tour done" },
];

interface Props {
  employeeName: string;
  onClose: () => void;
}

export const EmployeeOnboardingChecklist: React.FC<Props> = ({ employeeName, onClose }) => {
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  const toggle = (id: string) =>
    setChecked((prev) => ({ ...prev, [id]: !prev[id] }));

  const done = Object.values(checked).filter(Boolean).length;
  const pct = Math.round((done / DEFAULT_STEPS.length) * 100);

  return (
    <div
      className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-emerald-50 rounded-lg flex items-center justify-center text-emerald-600">
              <span className="material-symbols-outlined text-xl">checklist</span>
            </div>
            <div>
              <h3 className="font-bold text-slate-800">Onboarding Checklist</h3>
              <p className="text-xs text-slate-500">{employeeName}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-lg text-slate-400 transition-colors"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <div className="px-6 py-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-500">Progress</span>
            <span className="text-xs font-bold text-slate-700">{done}/{DEFAULT_STEPS.length}</span>
          </div>
          <div className="h-2 bg-slate-100 rounded-full overflow-hidden mb-6">
            <div
              className="h-full bg-emerald-500 rounded-full transition-all duration-500"
              style={{ width: `${pct}%` }}
            />
          </div>

          <div className="space-y-3">
            {DEFAULT_STEPS.map((step) => {
              const isChecked = !!checked[step.id];
              return (
                <label
                  key={step.id}
                  className="flex items-center gap-3 cursor-pointer group"
                >
                  <div
                    className={`w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 transition-all ${
                      isChecked ? "bg-emerald-500 border-emerald-500" : "border-slate-300 group-hover:border-emerald-400"
                    }`}
                    onClick={() => toggle(step.id)}
                  >
                    {isChecked && (
                      <span className="material-symbols-outlined text-white text-xs font-bold" style={{ fontSize: 14 }}>check</span>
                    )}
                  </div>
                  <span
                    onClick={() => toggle(step.id)}
                    className={`text-sm transition-colors ${isChecked ? "line-through text-slate-400" : "text-slate-700 group-hover:text-slate-900"}`}
                  >
                    {step.label}
                  </span>
                </label>
              );
            })}
          </div>
        </div>

        <div className="px-6 py-4 border-t border-slate-100 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
          >
            Close
          </button>
          {pct === 100 && (
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-bold bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
            >
              Mark Complete
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
