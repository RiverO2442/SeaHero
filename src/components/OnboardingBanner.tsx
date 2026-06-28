import React from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

export const OnboardingBanner: React.FC = () => {
  const [dismissed, setDismissed] = useLocalStorage("onboarding_dismissed", false);

  if (dismissed) return null;

  return (
    <div className="relative bg-gradient-to-r from-blue-600 to-blue-500 rounded-xl px-6 py-4 text-white shadow-lg shadow-blue-200 overflow-hidden">
      <div className="absolute right-6 top-1/2 -translate-y-1/2 text-white/10 text-[90px] font-extrabold leading-none select-none pointer-events-none">
        SalaryPro
      </div>
      <div className="flex items-start gap-4 relative">
        <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center shrink-0 mt-0.5">
          <span className="material-symbols-outlined">rocket_launch</span>
        </div>
        <div className="flex-1">
          <h3 className="font-bold text-lg leading-tight">Welcome to SalaryPro!</h3>
          <p className="text-blue-100 text-sm mt-0.5">
            Get started by adding employees, logging attendance, or running your first payroll.
          </p>
          <div className="flex gap-2 mt-3 flex-wrap">
            {[
              { icon: "group_add", text: "Add employees" },
              { icon: "event_available", text: "Log attendance" },
              { icon: "payments", text: "Run payroll" },
            ].map(({ icon, text }) => (
              <span
                key={text}
                className="inline-flex items-center gap-1.5 text-xs font-semibold bg-white/20 rounded-lg px-3 py-1.5"
              >
                <span className="material-symbols-outlined text-sm">{icon}</span>
                {text}
              </span>
            ))}
          </div>
        </div>
        <button
          onClick={() => setDismissed(true)}
          className="text-blue-200 hover:text-white transition-colors shrink-0 mt-0.5"
          aria-label="Dismiss welcome banner"
        >
          <span className="material-symbols-outlined">close</span>
        </button>
      </div>
    </div>
  );
};
