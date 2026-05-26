import { useState } from "react";
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

  return (
    <div className="bg-slate-50 text-slate-800 min-h-screen w-full">
      <SideNav activePage={activePage} onNavigate={setActivePage} />
      <TopNav />

      <main className="ml-64 pt-24 px-10 pb-12 min-h-screen">
        {activePage === "dashboard" && <DashboardOverview />}
        {activePage === "daily-entry" && <DailyEntryPage />}
        {activePage === "employees" && <EmployeeDirectoryPage />}
        {activePage === "payroll" && <PayrollPage />}
        {activePage === "settings" && <SettingsPage />}
      </main>
    </div>
  );
}

export default App;
