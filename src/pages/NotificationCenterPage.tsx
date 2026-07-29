import React, { useState } from "react";

type NotifCategory = "Payroll" | "Leave" | "Recruitment" | "Performance" | "Compliance" | "System";
type NotifStatus = "unread" | "read";

interface Notification {
  id: string;
  category: NotifCategory;
  title: string;
  body: string;
  timestamp: string;
  status: NotifStatus;
  icon: string;
}

const SEED: Notification[] = [
  { id: "n1",  category: "Payroll",     title: "Payroll run completed",             body: "October 2026 payroll has been processed. £452,890 disbursed to 82 employees.",            timestamp: "2026-07-28T09:15:00Z", status: "unread", icon: "payments" },
  { id: "n2",  category: "Leave",       title: "Leave request pending",             body: "Marcus Chen has submitted a 5-day annual leave request from 21–25 Jul 2026.",             timestamp: "2026-07-28T08:02:00Z", status: "unread", icon: "calendar_month" },
  { id: "n3",  category: "Recruitment", title: "New candidate: Frontend Engineer",  body: "Priya Sharma has applied for the Frontend Engineer role (Applied stage).",                timestamp: "2026-07-27T16:44:00Z", status: "unread", icon: "work" },
  { id: "n4",  category: "Performance", title: "Review overdue",                    body: "Tom Bradley's Q2 performance review was due 2026-07-15. Please complete it.",            timestamp: "2026-07-27T09:00:00Z", status: "read",   icon: "insights" },
  { id: "n5",  category: "Compliance",  title: "Policy expiry warning",             body: "Health & Safety Manual expires in 3 days (2026-07-01). Renew sign-offs required.",       timestamp: "2026-07-26T14:30:00Z", status: "unread", icon: "policy" },
  { id: "n6",  category: "Payroll",     title: "Expense claim approved",            body: "James Wilson's £340 tech equipment claim has been approved by Finance.",                  timestamp: "2026-07-26T11:18:00Z", status: "read",   icon: "receipt_long" },
  { id: "n7",  category: "System",      title: "New login detected",                body: "Admin login from new device (Windows 11, London IP) on 2026-07-26 at 09:01.",            timestamp: "2026-07-26T09:01:00Z", status: "read",   icon: "security" },
  { id: "n8",  category: "Leave",       title: "Leave approved",                    body: "Sarah Jenkins' sick leave (17–18 Jul) has been approved.",                               timestamp: "2026-07-25T15:00:00Z", status: "read",   icon: "check_circle" },
  { id: "n9",  category: "Recruitment", title: "Candidate moved to Offer",          body: "David Osei has been moved from Interview to Offer stage for DevOps Engineer.",           timestamp: "2026-07-25T10:22:00Z", status: "read",   icon: "thumb_up" },
  { id: "n10", category: "Compliance",  title: "Data Protection sign-off pending",  body: "17 employees have not yet signed the GDPR policy. Reminder sent.",                       timestamp: "2026-07-24T08:45:00Z", status: "read",   icon: "verified_user" },
];

const CAT_COLORS: Record<NotifCategory, string> = {
  Payroll:     "bg-blue-100 text-blue-700",
  Leave:       "bg-teal-100 text-teal-700",
  Recruitment: "bg-violet-100 text-violet-700",
  Performance: "bg-amber-100 text-amber-700",
  Compliance:  "bg-red-100 text-red-700",
  System:      "bg-slate-100 text-slate-600",
};

const CATEGORIES: NotifCategory[] = ["Payroll","Leave","Recruitment","Performance","Compliance","System"];

function timeAgo(ts: string) {
  const diff = Math.floor((Date.now() - new Date(ts).getTime()) / 60000);
  if (diff < 60) return `${diff}m ago`;
  if (diff < 1440) return `${Math.floor(diff / 60)}h ago`;
  return `${Math.floor(diff / 1440)}d ago`;
}

export default function NotificationCenterPage() {
  const [notifications, setNotifications] = useState<Notification[]>(SEED);
  const [catFilter, setCatFilter] = useState<"All" | NotifCategory>("All");
  const [statusFilter, setStatusFilter] = useState<"all" | "unread" | "read">("all");
  const [muted, setMuted] = useState<Set<NotifCategory>>(new Set());

  const markAllRead = () => setNotifications(prev => prev.map(n => ({ ...n, status: "read" as NotifStatus })));
  const markRead = (id: string) => setNotifications(prev => prev.map(n => n.id === id ? { ...n, status: "read" as NotifStatus } : n));
  const deleteNotif = (id: string) => setNotifications(prev => prev.filter(n => n.id !== id));

  const toggleMute = (cat: NotifCategory) => {
    setMuted(prev => {
      const next = new Set(prev);
      if (next.has(cat)) next.delete(cat); else next.add(cat);
      return next;
    });
  };

  const filtered = notifications.filter(n => {
    const matchCat = catFilter === "All" || n.category === catFilter;
    const matchStatus = statusFilter === "all" || n.status === statusFilter;
    return matchCat && matchStatus;
  });

  const unreadCount = notifications.filter(n => n.status === "unread").length;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-3">
            Notification Center
            {unreadCount > 0 && (
              <span className="px-2.5 py-0.5 bg-red-500 text-white text-xs font-bold rounded-full">{unreadCount} new</span>
            )}
          </h1>
          <p className="text-sm text-slate-500 mt-1">All alerts, reminders, and system messages in one place</p>
        </div>
        <button onClick={markAllRead}
          className="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-300 text-sm font-medium rounded-lg transition-colors">
          <span className="material-symbols-outlined text-base">done_all</span>
          Mark all read
        </button>
      </div>

      <div className="grid grid-cols-4 gap-6">
        {/* Main feed */}
        <div className="col-span-3 space-y-4">
          {/* Filters */}
          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex gap-2 flex-wrap">
              {(["All", ...CATEGORIES] as const).map(c => (
                <button key={c} onClick={() => setCatFilter(c as "All" | NotifCategory)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${catFilter === c ? "bg-blue-600 text-white" : "bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200"}`}>
                  {c}
                </button>
              ))}
            </div>
            <div className="ml-auto flex gap-2">
              {(["all","unread","read"] as const).map(s => (
                <button key={s} onClick={() => setStatusFilter(s)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-colors ${statusFilter === s ? "bg-blue-600 text-white" : "bg-slate-100 dark:bg-slate-700 text-slate-600 hover:bg-slate-200"}`}>
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Notification list */}
          <div className="space-y-2">
            {filtered.length === 0 && (
              <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700 p-12 text-center text-slate-400">
                <span className="material-symbols-outlined text-4xl block mb-2">notifications_off</span>
                <p className="text-sm">No notifications match the current filters</p>
              </div>
            )}
            {filtered.map(n => (
              <div key={n.id}
                className={`bg-white dark:bg-slate-800 rounded-xl border transition-colors flex items-start gap-4 px-5 py-4 ${n.status === "unread" ? "border-blue-200 dark:border-blue-800 shadow-sm" : "border-slate-100 dark:border-slate-700"}`}>
                {/* Unread dot */}
                <div className="w-2 h-2 rounded-full mt-2 shrink-0" style={{ background: n.status === "unread" ? "#3b82f6" : "transparent" }} />

                {/* Icon */}
                <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${CAT_COLORS[n.category]}`}>
                  <span className="material-symbols-outlined text-base">{n.icon}</span>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <p className={`text-sm font-semibold ${n.status === "unread" ? "text-slate-900 dark:text-slate-100" : "text-slate-700 dark:text-slate-300"}`}>{n.title}</p>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium shrink-0 ${CAT_COLORS[n.category]}`}>{n.category}</span>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed">{n.body}</p>
                  <p className="text-[10px] text-slate-400 mt-1">{timeAgo(n.timestamp)}</p>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1 shrink-0">
                  {n.status === "unread" && (
                    <button onClick={() => markRead(n.id)} title="Mark as read"
                      className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg text-slate-400 hover:text-blue-500 transition-colors">
                      <span className="material-symbols-outlined text-sm">mark_email_read</span>
                    </button>
                  )}
                  <button onClick={() => deleteNotif(n.id)} title="Delete"
                    className="p-1.5 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg text-slate-400 hover:text-red-500 transition-colors">
                    <span className="material-symbols-outlined text-sm">delete</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Preferences sidebar */}
        <div className="space-y-4">
          <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700 overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-100 dark:border-slate-700">
              <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-100">Notification Preferences</h3>
              <p className="text-xs text-slate-400 mt-0.5">Mute categories you don't want alerts for</p>
            </div>
            <div className="divide-y divide-slate-100 dark:divide-slate-700">
              {CATEGORIES.map(cat => {
                const isMuted = muted.has(cat);
                const count = notifications.filter(n => n.category === cat && n.status === "unread").length;
                return (
                  <div key={cat} className="px-5 py-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${isMuted ? "bg-slate-300" : "bg-blue-500"}`} />
                      <span className="text-sm text-slate-700 dark:text-slate-300">{cat}</span>
                      {count > 0 && !isMuted && (
                        <span className="text-[10px] font-bold bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded-full">{count}</span>
                      )}
                    </div>
                    <button onClick={() => toggleMute(cat)}
                      className={`relative w-10 h-5 rounded-full transition-colors ${isMuted ? "bg-slate-200 dark:bg-slate-600" : "bg-blue-500"}`}>
                      <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${isMuted ? "left-0.5" : "left-5"}`} />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Summary */}
          <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700 p-5 space-y-3">
            <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-100">Summary</h3>
            {[
              { label: "Total",   value: notifications.length,                                 color: "text-slate-700" },
              { label: "Unread",  value: notifications.filter(n => n.status === "unread").length, color: "text-blue-600 font-bold" },
              { label: "Muted categories", value: muted.size, color: "text-slate-500" },
            ].map(s => (
              <div key={s.label} className="flex justify-between text-sm">
                <span className="text-slate-500">{s.label}</span>
                <span className={s.color}>{s.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
