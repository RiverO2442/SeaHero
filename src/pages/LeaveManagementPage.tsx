import React, { useState } from "react";

type LeaveType = "Annual" | "Sick" | "Maternity" | "Paternity" | "Unpaid";
type LeaveStatus = "Pending" | "Approved" | "Rejected";

interface LeaveRequest {
  id: string;
  employeeName: string;
  department: string;
  type: LeaveType;
  from: string;
  to: string;
  days: number;
  status: LeaveStatus;
  note?: string;
}

const SEED: LeaveRequest[] = [
  { id: "1", employeeName: "Marcus Chen",     department: "Engineering",    type: "Annual",    from: "2026-07-21", to: "2026-07-25", days: 5,  status: "Pending",  note: "Summer holiday" },
  { id: "2", employeeName: "Sarah Jenkins",   department: "Product Design", type: "Sick",      from: "2026-07-17", to: "2026-07-18", days: 2,  status: "Approved" },
  { id: "3", employeeName: "David Okoro",     department: "Engineering",    type: "Annual",    from: "2026-08-04", to: "2026-08-08", days: 5,  status: "Pending",  note: "Family trip" },
  { id: "4", employeeName: "Elena Rodriguez", department: "Operations",     type: "Maternity", from: "2026-07-01", to: "2026-09-30", days: 65, status: "Approved" },
  { id: "5", employeeName: "Maya Thompson",   department: "Marketing",      type: "Annual",    from: "2026-07-28", to: "2026-07-29", days: 2,  status: "Rejected", note: "Peak campaign period" },
  { id: "6", employeeName: "Marcus Chen",     department: "Engineering",    type: "Sick",      from: "2026-06-10", to: "2026-06-10", days: 1,  status: "Approved" },
  { id: "7", employeeName: "Sarah Jenkins",   department: "Product Design", type: "Unpaid",    from: "2026-08-18", to: "2026-08-22", days: 5,  status: "Pending",  note: "Personal reasons" },
];

const BALANCE: { type: LeaveType; used: number; total: number; color: string; icon: string }[] = [
  { type: "Annual",    used: 7,  total: 25, color: "blue",   icon: "beach_access" },
  { type: "Sick",      used: 3,  total: 10, color: "rose",   icon: "medical_services" },
  { type: "Maternity", used: 65, total: 90, color: "purple", icon: "child_care" },
  { type: "Paternity", used: 0,  total: 10, color: "cyan",   icon: "family_restroom" },
];

const TYPE_COLORS: Record<LeaveType, string> = {
  Annual:    "bg-blue-100 text-blue-700",
  Sick:      "bg-rose-100 text-rose-700",
  Maternity: "bg-purple-100 text-purple-700",
  Paternity: "bg-cyan-100 text-cyan-700",
  Unpaid:    "bg-slate-100 text-slate-600",
};

const STATUS_CONFIG: Record<LeaveStatus, { cls: string; icon: string }> = {
  Pending:  { cls: "bg-amber-100 text-amber-700",   icon: "schedule" },
  Approved: { cls: "bg-emerald-100 text-emerald-700", icon: "check_circle" },
  Rejected: { cls: "bg-red-100 text-red-700",        icon: "cancel" },
};

const DEPT_COLORS: Record<string, string> = {
  Engineering:    "bg-blue-100 text-blue-700",
  "Product Design": "bg-purple-100 text-purple-700",
  Operations:     "bg-slate-200 text-slate-700",
  Marketing:      "bg-emerald-100 text-emerald-700",
  Finance:        "bg-amber-100 text-amber-700",
  HR:             "bg-rose-100 text-rose-700",
};

const fmt = (d: string) =>
  new Date(d).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });

const LeaveManagementPage: React.FC = () => {
  const [requests, setRequests] = useState<LeaveRequest[]>(SEED);
  const [typeFilter, setTypeFilter] = useState<"All" | LeaveType>("All");
  const [statusFilter, setStatusFilter] = useState<"All" | LeaveStatus>("All");
  const [search, setSearch] = useState("");

  const approve = (id: string) =>
    setRequests((prev) => prev.map((r) => (r.id === id ? { ...r, status: "Approved" } : r)));
  const reject = (id: string) =>
    setRequests((prev) => prev.map((r) => (r.id === id ? { ...r, status: "Rejected" } : r)));

  const filtered = requests.filter((r) => {
    const q = search.toLowerCase();
    const matchSearch = !q || r.employeeName.toLowerCase().includes(q) || r.department.toLowerCase().includes(q);
    const matchType   = typeFilter   === "All" || r.type   === typeFilter;
    const matchStatus = statusFilter === "All" || r.status === statusFilter;
    return matchSearch && matchType && matchStatus;
  });

  const pending  = requests.filter((r) => r.status === "Pending").length;
  const approved = requests.filter((r) => r.status === "Approved").length;
  const rejected = requests.filter((r) => r.status === "Rejected").length;

  return (
    <>
      {/* Header */}
      <div className="flex justify-between items-end mb-10">
        <div>
          <h2 className="text-3xl font-extrabold text-slate-800 tracking-tight">Leave Management</h2>
          <p className="text-slate-500 mt-1 text-sm font-medium">
            Review, approve, and track employee leave requests.
          </p>
        </div>
        <div className="flex gap-2 text-xs font-bold">
          <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-100 text-amber-700">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />{pending} Pending
          </span>
          <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-100 text-emerald-700">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />{approved} Approved
          </span>
          <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-red-100 text-red-700">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500" />{rejected} Rejected
          </span>
        </div>
      </div>

      {/* Balance cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {BALANCE.map((b) => {
          const pct = Math.round((b.used / b.total) * 100);
          const over = pct > 80;
          return (
            <div key={b.type} className="bg-white rounded-xl p-5 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <span className={`text-xs font-bold uppercase tracking-wider text-${b.color}-600`}>{b.type}</span>
                <span className={`material-symbols-outlined text-${b.color}-400`}>{b.icon}</span>
              </div>
              <p className="text-2xl font-extrabold text-slate-800">{b.total - b.used}<span className="text-sm font-normal text-slate-400"> / {b.total} days</span></p>
              <p className="text-xs text-slate-500 mb-2">{b.used} days used</p>
              <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full ${over ? `bg-${b.color}-500` : `bg-${b.color}-400`}`}
                  style={{ width: `${Math.min(pct, 100)}%` }}
                />
              </div>
              <p className={`text-[10px] font-bold mt-1 ${over ? `text-${b.color}-600` : "text-slate-400"}`}>{pct}% used</p>
            </div>
          );
        })}
      </div>

      {/* Filter bar */}
      <div className="bg-slate-100 rounded-xl p-4 mb-6 flex flex-wrap items-center gap-4">
        {/* Search */}
        <div className="relative flex-1 max-w-xs">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">search</span>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search employee or department…"
            className="w-full pl-9 pr-4 py-2 bg-white rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-100 border-none"
          />
        </div>

        {/* Type chips */}
        <div className="flex flex-wrap gap-1.5">
          {(["All", "Annual", "Sick", "Maternity", "Paternity", "Unpaid"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTypeFilter(t)}
              className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
                typeFilter === t ? "bg-blue-600 text-white shadow-sm" : "bg-white text-slate-600 hover:bg-slate-200"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Status select */}
        <div className="relative ml-auto">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as "All" | LeaveStatus)}
            className="appearance-none bg-white border-none rounded-lg py-2 pl-4 pr-10 text-sm font-medium focus:ring-2 focus:ring-blue-100 cursor-pointer text-slate-800 outline-none"
          >
            {(["All", "Pending", "Approved", "Rejected"] as const).map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
          <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 text-sm">expand_more</span>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl overflow-hidden shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50">
              {["Employee", "Department", "Type", "From", "To", "Days", "Note", "Status", "Actions"].map((h) => (
                <th key={h} className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={9} className="px-6 py-12 text-center text-slate-400 text-sm">
                  <span className="material-symbols-outlined text-3xl block mb-2">search_off</span>
                  No leave requests match the current filters.
                </td>
              </tr>
            ) : filtered.map((r) => {
              const sc = STATUS_CONFIG[r.status];
              return (
                <tr key={r.id} className="hover:bg-slate-50/60 transition-colors group">
                  {/* Employee */}
                  <td className="px-6 py-4">
                    <p className="text-sm font-bold text-slate-800">{r.employeeName}</p>
                  </td>
                  {/* Dept */}
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${DEPT_COLORS[r.department] ?? "bg-slate-100 text-slate-600"}`}>
                      {r.department}
                    </span>
                  </td>
                  {/* Type */}
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${TYPE_COLORS[r.type]}`}>
                      {r.type}
                    </span>
                  </td>
                  {/* From */}
                  <td className="px-6 py-4 text-sm text-slate-600">{fmt(r.from)}</td>
                  {/* To */}
                  <td className="px-6 py-4 text-sm text-slate-600">{fmt(r.to)}</td>
                  {/* Days */}
                  <td className="px-6 py-4">
                    <span className="font-bold text-slate-800">{r.days}</span>
                    <span className="text-xs text-slate-400 ml-1">d</span>
                  </td>
                  {/* Note */}
                  <td className="px-6 py-4 text-xs text-slate-500 max-w-[140px] truncate" title={r.note}>
                    {r.note ?? <span className="text-slate-300">—</span>}
                  </td>
                  {/* Status */}
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold ${sc.cls}`}>
                      <span className="material-symbols-outlined text-xs">{sc.icon}</span>
                      {r.status}
                    </span>
                  </td>
                  {/* Actions */}
                  <td className="px-6 py-4">
                    {r.status === "Pending" ? (
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => approve(r.id)}
                          className="px-3 py-1 text-xs font-bold bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg transition-colors flex items-center gap-1"
                        >
                          <span className="material-symbols-outlined text-xs">check</span>
                          Approve
                        </button>
                        <button
                          onClick={() => reject(r.id)}
                          className="px-3 py-1 text-xs font-bold bg-red-100 hover:bg-red-200 text-red-700 rounded-lg transition-colors flex items-center gap-1"
                        >
                          <span className="material-symbols-outlined text-xs">close</span>
                          Reject
                        </button>
                      </div>
                    ) : (
                      <span className="text-xs text-slate-300 italic">No action</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {/* Footer count */}
        <div className="px-6 py-4 bg-slate-50/30 border-t border-slate-100">
          <p className="text-xs font-medium text-slate-500 italic">
            Showing {filtered.length} of {requests.length} leave requests
          </p>
        </div>
      </div>
    </>
  );
};

export default LeaveManagementPage;
