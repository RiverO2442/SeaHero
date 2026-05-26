import React, { useState, useEffect, useRef } from "react";
import type { Page } from "../App";

const PAGE_TITLES: Record<Page, string> = {
  dashboard: "Dashboard Overview",
  "daily-entry": "Daily Attendance",
  employees: "Employee Directory",
  payroll: "Payroll Management",
  settings: "Settings",
};

const NOTIFICATIONS = [
  { id: 1, icon: "payments", color: "text-blue-600 bg-blue-50", title: "Payroll batch released", detail: "$12,400 sent to Marketing", time: "45m ago" },
  { id: 2, icon: "warning", color: "text-red-500 bg-red-50", title: "API sync failed", detail: "Payroll 002 — retry required", time: "2h ago" },
  { id: 3, icon: "person_add", color: "text-emerald-600 bg-emerald-50", title: "New employee added", detail: "Maya Thompson joined Marketing", time: "3h ago" },
  { id: 4, icon: "check_circle", color: "text-purple-600 bg-purple-50", title: "Payroll approved", detail: "Oct cycle ready for release", time: "5h ago" },
];

interface TopNavProps {
  activePage: Page;
  darkMode?: boolean;
  onToggleDark?: () => void;
}

export const TopNav: React.FC<TopNavProps> = ({ activePage, darkMode, onToggleDark }) => {
  const [time, setTime] = useState(new Date());
  const [showNotifs, setShowNotifs] = useState(false);
  const [readAll, setReadAll] = useState(false);
  const notifRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setShowNotifs(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
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

        {/* Notifications */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => { setShowNotifs((v) => !v); setReadAll(true); }}
            className="text-slate-500 hover:text-blue-500 transition-colors relative"
          >
            <span className="material-symbols-outlined">notifications</span>
            {!readAll && (
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full" />
            )}
          </button>

          {showNotifs && (
            <div className="absolute right-0 top-10 w-80 bg-white rounded-2xl shadow-2xl border border-slate-100 z-50 overflow-hidden">
              <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100">
                <p className="font-bold text-slate-800 text-sm">Notifications</p>
                <span className="text-xs font-bold text-blue-600 cursor-pointer hover:underline" onClick={() => setReadAll(true)}>Mark all read</span>
              </div>
              <div className="divide-y divide-slate-50">
                {NOTIFICATIONS.map((n) => (
                  <div key={n.id} className="flex items-start gap-3 px-4 py-3 hover:bg-slate-50 transition-colors cursor-pointer">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${n.color}`}>
                      <span className="material-symbols-outlined text-sm">{n.icon}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold text-slate-800">{n.title}</p>
                      <p className="text-xs text-slate-500 truncate">{n.detail}</p>
                      <p className="text-[10px] text-slate-400 mt-0.5">{n.time}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="px-4 py-3 border-t border-slate-100">
                <button className="w-full text-xs font-bold text-blue-600 hover:text-blue-700 transition-colors">View all notifications</button>
              </div>
            </div>
          )}
        </div>

        {/* Dark mode toggle */}
        {onToggleDark && (
          <button
            onClick={onToggleDark}
            title={darkMode ? "Switch to light mode" : "Switch to dark mode"}
            className="text-slate-500 hover:text-blue-500 transition-colors"
          >
            <span className="material-symbols-outlined">{darkMode ? "light_mode" : "dark_mode"}</span>
          </button>
        )}

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
