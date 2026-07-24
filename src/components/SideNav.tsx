import React, { useState } from "react";
import type { Page } from "../App";

interface NavItem {
  icon: string;
  label: string;
  page: Page;
}

const NAV_ITEMS: NavItem[] = [
  { icon: "dashboard", label: "Dashboard", page: "dashboard" },
  { icon: "group", label: "Employee Directory", page: "employees" },
  { icon: "event_available", label: "Daily Entry", page: "daily-entry" },
  { icon: "payments", label: "Payroll", page: "payroll" },
  { icon: "bar_chart", label: "Analytics", page: "analytics" },
  { icon: "summarize", label: "Reports", page: "reports" },
  { icon: "history", label: "Audit Log", page: "audit-log" },
  { icon: "calendar_month", label: "Leave", page: "leave" },
  { icon: "work", label: "Recruitment", page: "recruitment" },
  { icon: "insights", label: "Performance", page: "performance" },
  { icon: "receipt_long", label: "Expenses", page: "expenses" },
  { icon: "volunteer_activism", label: "Benefits", page: "benefits" },
  { icon: "settings", label: "Settings", page: "settings" },
];

interface SideNavProps {
  activePage: Page;
  onNavigate: (page: Page) => void;
}

export const SideNav: React.FC<SideNavProps> = ({ activePage, onNavigate }) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={`bg-slate-100 h-screen fixed left-0 top-0 flex flex-col p-4 text-sm font-medium z-50 transition-all duration-300 ${collapsed ? "w-16" : "w-64"}`}
    >
      {/* Brand */}
      <div className={`mb-8 px-2 flex items-center gap-3 overflow-hidden ${collapsed ? "justify-center" : ""}`}>
        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white shrink-0">
          <span className="material-symbols-outlined text-lg">payments</span>
        </div>
        {!collapsed && (
          <span className="text-xl font-bold text-slate-900 whitespace-nowrap">SalaryPro</span>
        )}
      </div>

      {/* Nav links */}
      <nav className="flex-1 space-y-1">
        {NAV_ITEMS.map((item) => {
          const isActive = activePage === item.page;
          return (
            <button
              key={item.page}
              onClick={() => onNavigate(item.page)}
              title={collapsed ? item.label : undefined}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors duration-150 text-left ${collapsed ? "justify-center" : ""} ${
                isActive
                  ? "text-blue-600 font-bold bg-slate-200"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-200"
              }`}
            >
              <span className="material-symbols-outlined shrink-0">{item.icon}</span>
              {!collapsed && item.label}
            </button>
          );
        })}
      </nav>

      {/* Collapse toggle */}
      <button
        onClick={() => setCollapsed((c) => !c)}
        className="flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-slate-500 hover:bg-slate-200 transition-colors mt-2"
        title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        <span className="material-symbols-outlined">
          {collapsed ? "chevron_right" : "chevron_left"}
        </span>
        {!collapsed && <span className="text-xs font-medium">Collapse</span>}
      </button>

      {/* User profile */}
      {!collapsed && (
        <div className="mt-3 pt-4 border-t border-slate-200">
          <div className="flex items-center gap-3 px-2">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDrysIW2ej-yoYj8KPxrSsZZwvsUXufcg9IsDOHG-GVYsZE1R69xXvdQ39oEyFR95S030CtTwcIF5Xj9ophECL7MIIFX7fCJpHxEfYzsWMsk_6rvOO6C2F2RgXChcN9cloVQJ4bean74q4X2f7QW-cjp97Kn6ATGLMOXeALeus1fNdk0Tac82Og0NiZMRDajTfkktMLJU5JDW-QMPYFKQDed2s0h6uuRxPuS3UxjcA4KCugHO8_PexJkBJoNngVeEPZjP0i0mNJ-KA"
              alt="Admin User Profile"
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <p className="text-xs font-bold text-slate-900">Admin Console</p>
              <p className="text-[10px] text-slate-500">Alex Thompson</p>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
};
