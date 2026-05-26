import { useState, useEffect, useRef } from "react";
import { SideNav } from "./components/SideNav";
import { TopNav } from "./components/TopNav";
import DailyEntryPage from "./pages/DailyEntryPage";
import { DashboardOverview } from "./pages/DashboardOverview";
import EmployeeDirectoryPage from "./pages/EmployeeDirectoryPage";
import PayrollPage from "./pages/PayrollPage";
import SettingsPage from "./pages/SettingsPage";
import { SkeletonCard, SkeletonRow } from "./components/Skeleton";

export type Page = "dashboard" | "daily-entry" | "employees" | "payroll" | "settings";

// ─── App-wide splash skeleton ─────────────────────────────────────────────────
const AppSkeleton: React.FC = () => (
  <div className="space-y-10 animate-pulse">
    <div className="flex justify-between items-end">
      <div className="space-y-2">
        <div className="w-56 h-8 bg-slate-200 rounded-lg" />
        <div className="w-72 h-4 bg-slate-100 rounded" />
      </div>
      <div className="flex gap-3">
        <div className="w-24 h-10 bg-slate-200 rounded-lg" />
        <div className="w-32 h-10 bg-blue-200 rounded-lg" />
      </div>
    </div>
    <div className="grid grid-cols-4 gap-6">
      {[0,1,2,3].map((i) => <SkeletonCard key={i} />)}
    </div>
    <div className="bg-white rounded-xl overflow-hidden shadow-sm">
      <div className="px-6 py-4 border-b border-slate-100">
        <div className="w-40 h-5 bg-slate-200 rounded" />
      </div>
      <table className="w-full">
        <tbody>
          {[0,1,2,3,4].map((i) => <SkeletonRow key={i} />)}
        </tbody>
      </table>
    </div>
  </div>
);

import React from "react";

function App() {
  const [activePage, setActivePage] = useState<Page>("dashboard");
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    try { return localStorage.getItem("settings_darkMode") === "true"; } catch { return false; }
  });
  const [pageKey, setPageKey] = useState(0);
  const [appReady, setAppReady] = useState(false);
  const prevPage = useRef<Page>("dashboard");

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("settings_darkMode", String(darkMode));
  }, [darkMode]);

  // Simulate initial data load — show skeleton for 1s on first visit
  useEffect(() => {
    const t = setTimeout(() => setAppReady(true), 1000);
    return () => clearTimeout(t);
  }, []);

  const navigate = (p: Page) => { setActivePage(p); setPageKey((k) => k + 1); };

  return (
    <div className="bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 min-h-screen w-full">
      <SideNav activePage={activePage} onNavigate={navigate} />
      <TopNav activePage={activePage} darkMode={darkMode} onToggleDark={() => setDarkMode((d) => !d)} />

      <main className="ml-64 pt-24 px-10 pb-12 min-h-screen">
        {!appReady ? (
          <AppSkeleton />
        ) : (
          <div key={pageKey} className="animate-fadeSlideIn">
            {activePage === "dashboard" && <DashboardOverview onNavigate={(p) => { prevPage.current = activePage; navigate(p); }} />}
            {activePage === "daily-entry" && <DailyEntryPage />}
            {activePage === "employees" && <EmployeeDirectoryPage />}
            {activePage === "payroll" && <PayrollPage />}
            {activePage === "settings" && <SettingsPage />}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
