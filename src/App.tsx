import { useState, useEffect, useRef, useCallback } from "react";
import { SideNav } from "./components/SideNav";
import { TopNav } from "./components/TopNav";
import DailyEntryPage from "./pages/DailyEntryPage";
import { DashboardOverview } from "./pages/DashboardOverview";
import EmployeeDirectoryPage from "./pages/EmployeeDirectoryPage";
import PayrollPage from "./pages/PayrollPage";
import SettingsPage from "./pages/SettingsPage";
import AnalyticsPage from "./pages/AnalyticsPage";
import ReportsPage from "./pages/ReportsPage";
import AuditLogPage from "./pages/AuditLogPage";
import LeaveManagementPage from "./pages/LeaveManagementPage";
import RecruitmentPage from "./pages/RecruitmentPage";
import PerformanceReviewPage from "./pages/PerformanceReviewPage";
import ExpenseClaimsPage from "./pages/ExpenseClaimsPage";
import BenefitsPage from "./pages/BenefitsPage";
import WorkforcePlanningPage from "./pages/WorkforcePlanningPage";
import CompliancePage from "./pages/CompliancePage";
import NotificationCenterPage from "./pages/NotificationCenterPage";
import BackToTop from "./components/BackToTop";
import { NetworkStatusBanner } from "./components/NetworkStatusBanner";
import { CommandPalette } from "./components/CommandPalette";
import { useKeyboardShortcuts } from "./hooks/useKeyboardShortcuts";
import { SkeletonCard, SkeletonRow } from "./components/Skeleton";
import { useDarkMode } from "./hooks/useDarkMode";

export type Page = "dashboard" | "daily-entry" | "employees" | "payroll" | "analytics" | "reports" | "audit-log" | "leave" | "recruitment" | "performance" | "expenses" | "benefits" | "workforce" | "compliance" | "notifications" | "settings";

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
  const [darkMode, setDarkMode] = useDarkMode();
  const [cmdOpen, setCmdOpen] = useState(false);
  const [pageKey, setPageKey] = useState(0);
  const [appReady, setAppReady] = useState(false);
  const prevPage = useRef<Page>("dashboard");
  const gPending = useRef(false);
  const gTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleGSequence = useCallback((e: KeyboardEvent) => {
    if (
      e.target instanceof HTMLInputElement ||
      e.target instanceof HTMLTextAreaElement ||
      e.target instanceof HTMLSelectElement
    ) return;

    if (e.key === "g" || e.key === "G") {
      gPending.current = true;
      if (gTimer.current) clearTimeout(gTimer.current);
      gTimer.current = setTimeout(() => { gPending.current = false; }, 1000);
      return;
    }

    if (gPending.current) {
      gPending.current = false;
      if (gTimer.current) clearTimeout(gTimer.current);
      const map: Record<string, Page> = {
        d: "dashboard", D: "dashboard",
        e: "employees", E: "employees",
        p: "payroll",   P: "payroll",
        a: "analytics", A: "analytics",
        r: "reports",   R: "reports",
            l: "audit-log", L: "audit-log",
            s: "settings",  S: "settings",
      };
      if (map[e.key]) { e.preventDefault(); navigate(map[e.key]); }
    }
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", handleGSequence);
    return () => window.removeEventListener("keydown", handleGSequence);
  }, [handleGSequence]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setCmdOpen(v => !v);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  // Simulate initial data load — show skeleton for 1s on first visit
  useEffect(() => {
    const t = setTimeout(() => setAppReady(true), 1000);
    return () => clearTimeout(t);
  }, []);

  const navigate = (p: Page) => {
    setActivePage(p);
    setPageKey((k) => k + 1);
    // Scroll main content area back to top
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 min-h-screen w-full">
      <SideNav activePage={activePage} onNavigate={navigate} />
      <TopNav activePage={activePage} darkMode={darkMode} onToggleDark={() => setDarkMode((d) => !d)} />

      <BackToTop />
      <NetworkStatusBanner />
      <CommandPalette isOpen={cmdOpen} onClose={() => setCmdOpen(false)} onNavigate={navigate} />
      <main className="ml-64 pt-24 px-10 pb-12 min-h-screen">
        {!appReady ? (
          <AppSkeleton />
        ) : (
          <div key={pageKey} className="animate-fadeSlideIn">
            {activePage === "dashboard" && <DashboardOverview onNavigate={(p) => { prevPage.current = activePage; navigate(p); }} />}
            {activePage === "daily-entry" && <DailyEntryPage />}
            {activePage === "employees" && <EmployeeDirectoryPage />}
            {activePage === "payroll" && <PayrollPage />}
            {activePage === "analytics" && <AnalyticsPage />}
            {activePage === "reports" && <ReportsPage />}
            {activePage === "audit-log" && <AuditLogPage />}
            {activePage === "leave" && <LeaveManagementPage />}
            {activePage === "recruitment" && <RecruitmentPage />}
            {activePage === "performance" && <PerformanceReviewPage />}
            {activePage === "expenses" && <ExpenseClaimsPage />}
            {activePage === "benefits" && <BenefitsPage />}
            {activePage === "workforce" && <WorkforcePlanningPage />}
            {activePage === "compliance" && <CompliancePage />}
            {activePage === "notifications" && <NotificationCenterPage />}
            {activePage === "settings" && <SettingsPage />}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
