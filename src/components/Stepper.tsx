import React from "react";

interface StepperProps {
  steps: string[];
  current: number;
  className?: string;
}

const Stepper: React.FC<StepperProps> = ({ steps, current, className = "" }) => (
  <div className={`flex items-center ${className}`}>
    {steps.map((label, i) => {
      const done    = i < current;
      const active  = i === current;
      const last    = i === steps.length - 1;

      return (
        <React.Fragment key={i}>
          <div className="flex flex-col items-center gap-1.5 shrink-0">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
                done
                  ? "bg-blue-600 text-white"
                  : active
                  ? "bg-blue-600 text-white ring-4 ring-blue-100"
                  : "bg-slate-100 text-slate-400"
              }`}
            >
              {done ? (
                <span className="material-symbols-outlined text-base">check</span>
              ) : (
                i + 1
              )}
            </div>
            <span className={`text-xs font-medium whitespace-nowrap ${active ? "text-blue-600" : done ? "text-slate-700" : "text-slate-400"}`}>
              {label}
            </span>
          </div>
          {!last && (
            <div className={`flex-1 h-0.5 mx-2 mb-5 ${i < current ? "bg-blue-600" : "bg-slate-200"}`} />
          )}
        </React.Fragment>
      );
    })}
  </div>
);

export default Stepper;
