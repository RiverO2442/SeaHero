import React, { useState } from "react";
import { DateRangePicker } from "../components/DateRangePicker";
import type { DateRange } from "../components/DateRangePicker";
import { ExportFormatModal } from "../components/ExportFormatModal";

interface ReportDef {
  id: string;
  icon: string;
  title: string;
  description: string;
  format: string;
  category: "payroll" | "hr" | "tax";
  color: string;
  bg: string;
}

const REPORTS: ReportDef[] = [
  { id: "r1", icon: "payments", title: "Monthly Payroll Summary", description: "Net pay, gross, tax withheld and deductions for all employees", format: "CSV", category: "payroll", color: "text-blue-600", bg: "bg-blue-50" },
  { id: "r2", icon: "receipt_long", title: "Department Budget Report", description: "Payroll spend broken down by department for the current cycle", format: "CSV", category: "payroll", color: "text-blue-600", bg: "bg-blue-50" },
  { id: "r3", icon: "pending_actions", title: "Pending Approvals Report", description: "All payroll entries still awaiting manager approval", format: "CSV", category: "payroll", color: "text-amber-600", bg: "bg-amber-50" },
  { id: "r4", icon: "group", title: "Employee Headcount Report", description: "Active and inactive employee list with roles and daily rates", format: "CSV", category: "hr", color: "text-purple-600", bg: "bg-purple-50" },
  { id: "r5", icon: "badge", title: "New Hires Report", description: "Employees added in the last 30 days with onboarding status", format: "CSV", category: "hr", color: "text-purple-600", bg: "bg-purple-50" },
  { id: "r6", icon: "event_available", title: "Attendance Summary", description: "Days worked vs total working days per employee this period", format: "CSV", category: "hr", color: "text-emerald-600", bg: "bg-emerald-50" },
  { id: "r7", icon: "account_balance", title: "Tax Withholding Report", description: "Total tax withheld per employee, ready for remittance", format: "CSV", category: "tax", color: "text-red-600", bg: "bg-red-50" },
  { id: "r8", icon: "description", title: "Annual Earnings Statement", description: "Year-to-date earnings, deductions, and net pay per employee", format: "CSV", category: "tax", color: "text-red-600", bg: "bg-red-50" },
];

const CATEGORIES = ["all", "payroll", "hr", "tax"] as const;
const CATEGORY_LABELS: Record<string, string> = { all: "All Reports", payroll: "Payroll", hr: "HR", tax: "Tax" };

function downloadCsv(filename: string, headers: string[], rows: string[][]) {
  const csv = [headers, ...rows].map((r) => r.map((v) => `"${v}"`).join(",")).join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

const ReportsPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<typeof CATEGORIES[number]>("all");
  const [downloading, setDownloading] = useState<string | null>(null);
  const [dateRange, setDateRange] = useState<DateRange>({ from: "2026-10-01", to: "2026-10-31" });
  const [exportModal, setExportModal] = useState<ReportDef | null>(null);

  const filtered = REPORTS.filter((r) => activeCategory === "all" || r.category === activeCategory);

  const handleDownload = (report: ReportDef) => {
    setDownloading(report.id);
    setTimeout(() => {
      downloadCsv(
        `${report.title.replace(/\s+/g, "_").toLowerCase()}_${new Date().toISOString().slice(0, 10)}.csv`,
        ["Report", "Generated", "Period", "Status"],
        [[report.title, new Date().toLocaleDateString(), "October 2026", "Sample data"]],
      );
      setDownloading(null);
    }, 800);
  };

  return (
    <div className="space-y-10">
      {exportModal && (
        <ExportFormatModal
          reportTitle={exportModal.title}
          onExport={(fmt) => {
            if (fmt === "print") { window.print(); return; }
            handleDownload(exportModal);
          }}
          onClose={() => setExportModal(null)}
        />
      )}
      {/* Header */}
      <section className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-800">Reports</h2>
          <p className="text-slate-500 font-medium mt-1">Generate and download reports for payroll, HR, and compliance.</p>
        </div>
        <DateRangePicker value={dateRange} onChange={setDateRange} />
      </section>

      {/* Category filter */}
      <div className="flex gap-2 flex-wrap">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
              activeCategory === cat
                ? "bg-blue-600 text-white shadow-md shadow-blue-200"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            {CATEGORY_LABELS[cat]}
            <span className={`ml-1.5 px-1.5 py-0.5 rounded-full text-[10px] ${
              activeCategory === cat ? "bg-white/20 text-white" : "bg-slate-200 text-slate-500"
            }`}>
              {cat === "all" ? REPORTS.length : REPORTS.filter((r) => r.category === cat).length}
            </span>
          </button>
        ))}
      </div>

      {/* Report cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {filtered.map((report) => {
          const isLoading = downloading === report.id;
          return (
            <div key={report.id} className="bg-white rounded-xl shadow-sm p-6 flex flex-col gap-4 hover:shadow-md transition-shadow">
              <div className="flex items-start gap-4">
                <div className={`w-10 h-10 ${report.bg} rounded-xl flex items-center justify-center ${report.color} shrink-0`}>
                  <span className="material-symbols-outlined">{report.icon}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-slate-800 text-sm leading-snug">{report.title}</h4>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">{report.description}</p>
                </div>
              </div>
              <div className="flex items-center justify-between mt-auto pt-3 border-t border-slate-100">
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded">
                  <span className="material-symbols-outlined text-[11px]">table_chart</span>
                  {report.format}
                </span>
                <button
                  onClick={() => setExportModal(report)}
                  disabled={isLoading}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-white bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg shadow-sm shadow-blue-200 hover:scale-[1.02] transition-all disabled:opacity-70 disabled:scale-100"
                >
                  {isLoading ? (
                    <><span className="material-symbols-outlined text-xs animate-spin">progress_activity</span> Generating…</>
                  ) : (
                    <><span className="material-symbols-outlined text-xs">download</span> Export</>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ReportsPage;
