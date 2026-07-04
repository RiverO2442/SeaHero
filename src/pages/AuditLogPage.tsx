import React, { useState } from "react";

type EventKind = "payroll" | "employee" | "system" | "auth";

interface AuditEvent {
  id: string;
  kind: EventKind;
  icon: string;
  iconBg: string;
  iconColor: string;
  title: string;
  detail: string;
  user: string;
  timestamp: string;
}

const EVENTS: AuditEvent[] = [
  { id: "1", kind: "payroll", icon: "payments", iconBg: "bg-blue-50", iconColor: "text-blue-600", title: "Payroll batch approved", detail: "October 2026 cycle — 7 entries approved", user: "Alex Thompson", timestamp: "2026-10-14 09:42" },
  { id: "2", kind: "employee", icon: "person_add", iconBg: "bg-emerald-50", iconColor: "text-emerald-600", title: "New employee added", detail: "Maya Thompson joined Marketing", user: "Alex Thompson", timestamp: "2026-10-13 14:15" },
  { id: "3", kind: "system", icon: "warning", iconBg: "bg-red-50", iconColor: "text-red-500", title: "API sync failed", detail: "Payroll 002 — automatic retry queued", user: "System", timestamp: "2026-10-13 11:08" },
  { id: "4", kind: "payroll", icon: "ios_share", iconBg: "bg-purple-50", iconColor: "text-purple-600", title: "Payroll released", detail: "$12,400 disbursed to Marketing dept", user: "Alex Thompson", timestamp: "2026-10-12 16:30" },
  { id: "5", kind: "employee", icon: "edit", iconBg: "bg-amber-50", iconColor: "text-amber-600", title: "Employee record updated", detail: "David Okoro — daily rate adjusted to $390", user: "Alex Thompson", timestamp: "2026-10-11 10:22" },
  { id: "6", kind: "auth", icon: "login", iconBg: "bg-slate-100", iconColor: "text-slate-600", title: "Admin login", detail: "Session started from 192.168.1.42", user: "Alex Thompson", timestamp: "2026-10-11 09:01" },
  { id: "7", kind: "payroll", icon: "receipt_long", iconBg: "bg-blue-50", iconColor: "text-blue-600", title: "September payroll completed", detail: "$438,200 processed — 124 employees", user: "System", timestamp: "2026-09-30 18:00" },
  { id: "8", kind: "employee", icon: "person_off", iconBg: "bg-red-50", iconColor: "text-red-500", title: "Employee deactivated", detail: "Elena Rodriguez — status set to Inactive", user: "Alex Thompson", timestamp: "2026-09-28 13:45" },
  { id: "9", kind: "system", icon: "check_circle", iconBg: "bg-emerald-50", iconColor: "text-emerald-600", title: "API sync restored", detail: "Payroll sync back to normal", user: "System", timestamp: "2026-09-27 09:15" },
  { id: "10", kind: "auth", icon: "logout", iconBg: "bg-slate-100", iconColor: "text-slate-600", title: "Admin logout", detail: "Session ended gracefully", user: "Alex Thompson", timestamp: "2026-09-26 17:59" },
];

const KIND_COLORS: Record<EventKind, string> = {
  payroll: "bg-blue-50 text-blue-600",
  employee: "bg-emerald-50 text-emerald-600",
  system: "bg-red-50 text-red-500",
  auth: "bg-slate-100 text-slate-500",
};

const KIND_FILTERS: Array<{ key: EventKind | "all"; label: string }> = [
  { key: "all", label: "All Events" },
  { key: "payroll", label: "Payroll" },
  { key: "employee", label: "Employees" },
  { key: "system", label: "System" },
  { key: "auth", label: "Auth" },
];

const AuditLogPage: React.FC = () => {
  const [filter, setFilter] = useState<EventKind | "all">("all");
  const [search, setSearch] = useState("");

  const visible = EVENTS.filter((e) => {
    const kindMatch = filter === "all" || e.kind === filter;
    const q = search.toLowerCase();
    const searchMatch =
      !q ||
      e.title.toLowerCase().includes(q) ||
      e.detail.toLowerCase().includes(q) ||
      e.user.toLowerCase().includes(q);
    return kindMatch && searchMatch;
  });

  return (
    <div className="space-y-10">
      <section className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-800">Audit Log</h2>
          <p className="text-slate-500 font-medium mt-1">
            Full history of system actions and admin events.
          </p>
        </div>
        <button className="px-5 py-2.5 bg-slate-200 text-slate-800 text-sm font-semibold rounded-lg hover:bg-slate-300 transition-colors flex items-center gap-2">
          <span className="material-symbols-outlined text-base">download</span>
          Export Log
        </button>
      </section>

      <div className="flex flex-wrap items-center gap-4">
        <div className="relative">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">
            search
          </span>
          <input
            type="text"
            placeholder="Search events…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50 w-64"
          />
        </div>
        <div className="flex gap-1.5 flex-wrap">
          {KIND_FILTERS.map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                filter === f.key
                  ? "bg-blue-600 text-white shadow-md shadow-blue-200"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <p className="font-bold text-slate-800">
            {visible.length} event{visible.length !== 1 ? "s" : ""}
          </p>
          <p className="text-xs text-slate-400">{EVENTS.length} total in log</p>
        </div>
        <div className="divide-y divide-slate-50">
          {visible.length === 0 ? (
            <div className="px-6 py-12 text-center">
              <span className="material-symbols-outlined text-3xl text-slate-300 block mb-2">
                search_off
              </span>
              <p className="text-sm text-slate-400">No events match your filters.</p>
            </div>
          ) : (
            visible.map((event) => (
              <div
                key={event.id}
                className="flex items-start gap-4 px-6 py-4 hover:bg-slate-50/60 transition-colors"
              >
                <div
                  className={`w-9 h-9 ${event.iconBg} rounded-lg flex items-center justify-center ${event.iconColor} shrink-0 mt-0.5`}
                >
                  <span className="material-symbols-outlined text-sm">{event.icon}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-slate-800">{event.title}</p>
                  <p className="text-xs text-slate-500 mt-0.5">{event.detail}</p>
                  <div className="flex items-center gap-3 mt-1.5">
                    <span className="text-[10px] font-bold text-slate-400">{event.user}</span>
                    <span className="w-1 h-1 rounded-full bg-slate-300" />
                    <span className="text-[10px] text-slate-400">{event.timestamp}</span>
                  </div>
                </div>
                <span
                  className={`text-[10px] font-bold px-2 py-1 rounded-full shrink-0 ${KIND_COLORS[event.kind]}`}
                >
                  {event.kind}
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default AuditLogPage;
