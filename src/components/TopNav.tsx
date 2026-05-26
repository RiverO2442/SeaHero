import React, { useState, useEffect } from "react";
import type { Page } from "../App";

const PAGE_TITLES: Record<Page, string> = {
  dashboard: "Dashboard Overview",
  "daily-entry": "Daily Attendance",
  employees: "Employee Directory",
  payroll: "Payroll Management",
  settings: "Settings",
};

interface TopNavProps {
  activePage: Page;
}

export const TopNav: React.FC<TopNavProps> = ({ activePage }) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const timeStr = time.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  return (
    <header className="fixed top-0 right-0 w-[calc(100%-16rem)] h-16 bg-white/80 backdrop-blur-md flex justify-between items-center px-8 z-40 shadow-sm">
      {/* Page title */}
      <div className="flex items-center gap-3">
        <h1 className="text-lg font-bold text-slate-800">{PAGE_TITLES[activePage]}</h1>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-5">
        {/* Live clock */}
        <div className="flex items-center gap-1.5 text-slate-500 text-sm font-mono font-bold tabular-nums bg-slate-50 px-3 py-1.5 rounded-lg">
          <span className="material-symbols-outlined text-base text-slate-400">schedule</span>
          {timeStr}
        </div>

        <div className="h-8 w-px bg-slate-200" />

        <button className="text-slate-500 hover:text-blue-500 transition-colors relative">
          <span className="material-symbols-outlined">notifications</span>
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full" />
        </button>
        <div className="h-8 w-px bg-slate-200" />
        <img
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuAtmubz8pL13Dayqr_CShHSUu3OmVU9jM2VmJhwQtLxXH03u-X8KYa9lkbuwUg_80LLd3PzCktMpdugHOM0_o3401Z1nlqHnIh6cj_YenZUFhQmJPJqHsctc8qPqb5TIrttNlMKqe2jrrM_kg5GpIUzflI7UCJjBI3Xu8Ey2UWEZUKqicKYqWqRFFBa4Q5gPf45ruM9iyWtNAgNb1ZK6Wnt5JJsQ27RcP1JilqmoH_1oh8WhAue8jULJjHRQq_nHMFliU5YxaTM20g"
          alt="Admin Avatar"
          className="w-8 h-8 rounded-full border border-slate-200 object-cover"
        />
      </div>
    </header>
  );
};
