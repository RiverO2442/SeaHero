import { useState, useEffect, useRef } from "react";
import { SideNav } from "./components/SideNav";
import { TopNav } from "./components/TopNav";
import DailyEntryPage from "./pages/DailyEntryPage";
import { DashboardOverview } from "./pages/DashboardOverview";
import EmployeeDirectoryPage from "./pages/EmployeeDirectoryPage";
import PayrollPage from "./pages/PayrollPage";
import SettingsPage from "./pages/SettingsPage";

export type Page = "dashboard" | "daily-entry" | "employees" | "payroll" | "settings";

function App() {
  const [activePage, setActivePage] = useState<Page>("dashboard");
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    try { return localStorage.getItem("settings_darkMode") === "true"; } catch { return false; }
  });
  const [pageKey, setPageKey] = useState(0);
  const prevPage = useRef<Page>("dashboard");

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("settings_darkMode", String(darkMode));
  }, [darkMode]);

  return (
    <div className="bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 min-h-screen w-full">
      <SideNav activePage={activePage} onNavigate={(p) => { setActivePage(p); setPageKey((k) => k + 1); }} />
      <TopNav activePage={activePage} darkMode={darkMode} onToggleDark={() => setDarkMode((d) => !d)} />

      <main className="ml-64 pt-24 px-10 pb-12 min-h-screen">
        <div
          key={pageKey}
          className="animate-fadeSlideIn"
        >
          {activePage === "dashboard" && <DashboardOverview onNavigate={(p) => { prevPage.current = activePage; setActivePage(p); setPageKey((k) => k + 1); }} />}
          {activePage === "daily-entry" && <DailyEntryPage />}
          {activePage === "employees" && <EmployeeDirectoryPage />}
          {activePage === "payroll" && <PayrollPage />}
          {activePage === "settings" && <SettingsPage />}
        </div>
      </main>
    </div>
  );
}

export default App;
