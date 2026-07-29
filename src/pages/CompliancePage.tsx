import React, { useState } from "react";

interface Policy {
  id: string;
  title: string;
  category: "HR" | "Safety" | "Data" | "Finance" | "Legal";
  version: string;
  effectiveDate: string;
  expiryDate: string;
  totalEmployees: number;
  signedCount: number;
}

interface SignOff {
  employee: string;
  dept: string;
  status: "signed" | "pending" | "overdue";
  signedDate?: string;
}

const POLICIES: Policy[] = [
  { id: "p1", title: "Code of Conduct",             category: "HR",      version: "v3.1", effectiveDate: "2026-01-01", expiryDate: "2027-01-01", totalEmployees: 82, signedCount: 79 },
  { id: "p2", title: "Data Protection Policy (UK GDPR)", category: "Data", version: "v2.4", effectiveDate: "2026-01-01", expiryDate: "2027-01-01", totalEmployees: 82, signedCount: 65 },
  { id: "p3", title: "Health & Safety Manual",       category: "Safety",  version: "v1.8", effectiveDate: "2025-07-01", expiryDate: "2026-07-01", totalEmployees: 82, signedCount: 50 },
  { id: "p4", title: "Anti-Bribery & Corruption",   category: "Legal",   version: "v1.2", effectiveDate: "2026-03-01", expiryDate: "2027-03-01", totalEmployees: 82, signedCount: 82 },
  { id: "p5", title: "Expense Reimbursement Policy",category: "Finance", version: "v2.0", effectiveDate: "2026-04-01", expiryDate: "2027-04-01", totalEmployees: 82, signedCount: 71 },
  { id: "p6", title: "Remote Work Agreement",        category: "HR",      version: "v1.5", effectiveDate: "2026-02-01", expiryDate: "2027-02-01", totalEmployees: 82, signedCount: 60 },
];

const SIGNOFFS: SignOff[] = [
  { employee: "Alice Chen",    dept: "Engineering", status: "signed",  signedDate: "2026-07-01" },
  { employee: "Bob Patel",     dept: "Sales",       status: "pending" },
  { employee: "Carol Smith",   dept: "HR",          status: "signed",  signedDate: "2026-06-28" },
  { employee: "David Kim",     dept: "Design",      status: "overdue" },
  { employee: "Emma Wilson",   dept: "Finance",     status: "signed",  signedDate: "2026-07-05" },
  { employee: "Frank Osei",    dept: "Marketing",   status: "overdue" },
  { employee: "Grace Lee",     dept: "Engineering", status: "pending" },
  { employee: "Hiro Tanaka",   dept: "Operations",  status: "signed",  signedDate: "2026-07-10" },
];

const CAT_COLORS: Record<string, string> = {
  HR:      "bg-blue-100 text-blue-700",
  Safety:  "bg-amber-100 text-amber-700",
  Data:    "bg-violet-100 text-violet-700",
  Finance: "bg-green-100 text-green-700",
  Legal:   "bg-red-100 text-red-700",
};

const STATUS_COLORS: Record<string, string> = {
  signed:  "bg-green-100 text-green-700",
  pending: "bg-amber-100 text-amber-700",
  overdue: "bg-red-100 text-red-700",
};

function daysUntil(dateStr: string) {
  const diff = new Date(dateStr).getTime() - Date.now();
  return Math.ceil(diff / 86400000);
}

export default function CompliancePage() {
  const [selected, setSelected] = useState<Policy>(POLICIES[0]);
  const [filter, setFilter] = useState<"all" | "signed" | "pending" | "overdue">("all");
  const [catFilter, setCatFilter] = useState<string>("All");

  const categories = ["All", ...Array.from(new Set(POLICIES.map(p => p.category)))];

  const visiblePolicies = POLICIES.filter(p => catFilter === "All" || p.category === catFilter);
  const visibleSignoffs = SIGNOFFS.filter(s => filter === "all" || s.status === filter);

  const totalSigned = POLICIES.reduce((a, p) => a + p.signedCount, 0);
  const totalRequired = POLICIES.reduce((a, p) => a + p.totalEmployees, 0);
  const overallPct = Math.round((totalSigned / totalRequired) * 100);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Compliance</h1>
          <p className="text-sm text-slate-500 mt-1">Policy sign-off tracker and expiry alerts</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg transition-colors">
          <span className="material-symbols-outlined text-base">upload_file</span>
          Add Policy
        </button>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-4 gap-5">
        {[
          { label: "Overall Compliance", value: `${overallPct}%`, icon: "verified", color: overallPct >= 90 ? "text-green-600" : "text-amber-500" },
          { label: "Policies Active",    value: POLICIES.length,  icon: "policy",   color: "text-blue-600" },
          { label: "Pending Sign-offs",  value: SIGNOFFS.filter(s => s.status === "pending").length, icon: "pending_actions", color: "text-amber-600" },
          { label: "Overdue Sign-offs",  value: SIGNOFFS.filter(s => s.status === "overdue").length, icon: "warning",         color: "text-red-600" },
        ].map(c => (
          <div key={c.label} className="bg-white dark:bg-slate-800 rounded-xl p-5 shadow-sm border border-slate-100 dark:border-slate-700">
            <div className="flex items-center gap-2 mb-2">
              <span className={`material-symbols-outlined text-lg ${c.color}`}>{c.icon}</span>
              <span className="text-xs text-slate-500 font-medium">{c.label}</span>
            </div>
            <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">{c.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-5 gap-6">
        {/* Policy list */}
        <div className="col-span-2 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-100 dark:border-slate-700">
            <h2 className="text-sm font-semibold text-slate-800 dark:text-slate-100 mb-3">Policies</h2>
            <div className="flex gap-2 flex-wrap">
              {categories.map(c => (
                <button key={c} onClick={() => setCatFilter(c)}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${catFilter === c ? "bg-blue-600 text-white" : "bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200"}`}>
                  {c}
                </button>
              ))}
            </div>
          </div>
          <div className="divide-y divide-slate-100 dark:divide-slate-700">
            {visiblePolicies.map(p => {
              const pct = Math.round((p.signedCount / p.totalEmployees) * 100);
              const days = daysUntil(p.expiryDate);
              const expiring = days <= 60;
              return (
                <button key={p.id} onClick={() => setSelected(p)}
                  className={`w-full text-left px-5 py-4 hover:bg-slate-50 dark:hover:bg-slate-700/40 transition-colors ${selected.id === p.id ? "bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500" : ""}`}>
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-slate-800 dark:text-slate-100 truncate">{p.title}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${CAT_COLORS[p.category]}`}>{p.category}</span>
                        <span className="text-[10px] text-slate-400">{p.version}</span>
                      </div>
                    </div>
                    {expiring && (
                      <span className="material-symbols-outlined text-amber-500 text-base shrink-0" title={`Expires in ${days} days`}>schedule</span>
                    )}
                  </div>
                  <div className="mt-2">
                    <div className="flex justify-between text-[10px] text-slate-500 mb-1">
                      <span>{p.signedCount}/{p.totalEmployees} signed</span>
                      <span>{pct}%</span>
                    </div>
                    <div className="h-1.5 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                      <div className={`h-full rounded-full ${pct >= 90 ? "bg-green-500" : pct >= 70 ? "bg-amber-400" : "bg-red-400"}`} style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Sign-off detail */}
        <div className="col-span-3 space-y-4">
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 p-5">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-base font-bold text-slate-900 dark:text-slate-100">{selected.title}</h2>
                <div className="flex items-center gap-3 mt-1 text-xs text-slate-500">
                  <span>{selected.version}</span>
                  <span>·</span>
                  <span>Effective {selected.effectiveDate}</span>
                  <span>·</span>
                  <span className={daysUntil(selected.expiryDate) <= 60 ? "text-amber-600 font-semibold" : ""}>
                    Expires {selected.expiryDate} ({daysUntil(selected.expiryDate)} days)
                  </span>
                </div>
              </div>
              <span className={`text-[11px] font-medium px-2.5 py-1 rounded-full ${CAT_COLORS[selected.category]}`}>{selected.category}</span>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-4">
              {[
                { label: "Signed",  value: selected.signedCount, color: "text-green-600" },
                { label: "Pending", value: selected.totalEmployees - selected.signedCount, color: "text-amber-600" },
                { label: "Total",   value: selected.totalEmployees, color: "text-slate-700" },
              ].map(s => (
                <div key={s.label} className="bg-slate-50 dark:bg-slate-700/40 rounded-lg p-3 text-center">
                  <p className={`text-xl font-bold ${s.color}`}>{s.value}</p>
                  <p className="text-xs text-slate-500 mt-0.5">{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-100 dark:border-slate-700 flex items-center justify-between">
              <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-100">Employee Sign-offs</h3>
              <div className="flex gap-2">
                {(["all","signed","pending","overdue"] as const).map(f => (
                  <button key={f} onClick={() => setFilter(f)}
                    className={`px-3 py-1 rounded-full text-xs font-medium transition-colors capitalize ${filter === f ? "bg-blue-600 text-white" : "bg-slate-100 dark:bg-slate-700 text-slate-600 hover:bg-slate-200"}`}>
                    {f}
                  </button>
                ))}
              </div>
            </div>
            <table className="w-full text-sm">
              <thead className="bg-slate-50 dark:bg-slate-700/50">
                <tr className="text-xs text-slate-500 uppercase tracking-wide">
                  <th className="px-5 py-3 text-left">Employee</th>
                  <th className="px-4 py-3 text-left">Department</th>
                  <th className="px-4 py-3 text-left">Status</th>
                  <th className="px-4 py-3 text-left">Signed Date</th>
                  <th className="px-4 py-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                {visibleSignoffs.map(s => (
                  <tr key={s.employee} className="hover:bg-slate-50 dark:hover:bg-slate-700/30">
                    <td className="px-5 py-3 font-medium text-slate-800 dark:text-slate-200">{s.employee}</td>
                    <td className="px-4 py-3 text-slate-500">{s.dept}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${STATUS_COLORS[s.status]}`}>{s.status}</span>
                    </td>
                    <td className="px-4 py-3 text-slate-500">{s.signedDate ?? "—"}</td>
                    <td className="px-4 py-3 text-right">
                      {s.status !== "signed" && (
                        <button className="text-xs text-blue-500 hover:text-blue-700 font-medium">Send reminder</button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
