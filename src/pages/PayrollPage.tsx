import React, { useState } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

type PayrollStatus = "Approved" | "Pending" | "On Hold" | "Released";

interface PayrollEntry {
  id: string;
  name: string;
  avatarUrl?: string;
  initials?: string;
  department: string;
  departmentColor: string;
  role: string;
  daysWorked: number;
  totalDays: number;
  dailyRate: number;
  overtime: number; // extra hours
  grossPay: number;
  taxRate: number; // percentage e.g. 0.15
  deductions: number;
  netPay: number;
  status: PayrollStatus;
}

interface PayrollRun {
  id: string;
  period: string;
  releasedDate: string;
  totalAmount: string;
  employees: number;
  status: "Completed" | "Processing" | "Scheduled";
}

// ─── Seed Data ────────────────────────────────────────────────────────────────

function buildEntry(
  id: string,
  name: string,
  dept: string,
  deptColor: string,
  role: string,
  daysWorked: number,
  dailyRate: number,
  overtime: number,
  taxRate: number,
  deductions: number,
  status: PayrollStatus,
  avatarUrl?: string,
  initials?: string,
): PayrollEntry {
  const grossPay = daysWorked * dailyRate + overtime * (dailyRate / 8) * 1.5;
  const netPay = grossPay - grossPay * taxRate - deductions;
  return {
    id,
    name,
    avatarUrl,
    initials,
    department: dept,
    departmentColor: deptColor,
    role,
    daysWorked,
    totalDays: 22,
    dailyRate,
    overtime,
    grossPay: Math.round(grossPay * 100) / 100,
    taxRate,
    deductions,
    netPay: Math.round(netPay * 100) / 100,
    status,
  };
}

const PAYROLL_ENTRIES: PayrollEntry[] = [
  buildEntry(
    "1",
    "Marcus Chen",
    "Engineering",
    "bg-blue-100 text-blue-700",
    "Senior Fullstack Engineer",
    22,
    450,
    8,
    0.18,
    120,
    "Approved",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuCYGVAPvh6BIuk9IJq1VylviVSpQeL877-BFIqF3TxNsIrsJ8TC9ER79KyNRcA5Mk-WZTmBebvTsIr3l7c-wHvH7kkVCi8OLI8AjwItZ5-i4vBVTdsCWm6L9Gz_4ld74MaSHzvC-smGur7CdFEJfvactyoL4LwD-iUtay2_4t8O9DS9K6_1VI8S_c1ctLf4npEqlFKhzLJmrMQPHG_-YkvGhcVJsbWSAjzrrBQM7TKPAY0fKvN4gXZL7Hkukjz2m9xbAauC7aamMME",
  ),
  buildEntry(
    "2",
    "Sarah Jenkins",
    "Product Design",
    "bg-purple-100 text-purple-700",
    "Principal UI Designer",
    20,
    425,
    4,
    0.18,
    100,
    "Approved",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuDrms5ZEBNnbfK7FKAW_-4HL4XUBj7-QUMq8sDYUEl-qjbliqRU5rg2Ho4CmYr-Fg-N1aGpavjyzvuALm3jN9tzAoTCWeCGWpjoQN7KSVIXgslksl2iNE_qchJFCJGTcX5HB6VyBRClUGnJrfh9Tz-W1oeQdBxPkMBOPIWyLMozLbyMDkTWemVcRU9tRzhkoNsq6ktzXopfwEowy8hyPFeMzMQKH7gFcAVWLinjIBz5GGfP4Qrif1aqKO1YfaVOzFVF5kT1ITH0GCQ",
  ),
  buildEntry(
    "3",
    "David Okoro",
    "Engineering",
    "bg-blue-100 text-blue-700",
    "DevOps Specialist",
    21,
    390,
    0,
    0.15,
    90,
    "Pending",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuCfI2RZuBiZ9koaWo2Kp_s5jDumAEe76wkP0vaOiO2GxcbklMlpDp6H6cMcLCfOnag7bBTFno-6OX3jIzlWBxEGxvulPFienHzKAcTl5LULgydRzSgROIS2dwJbJB0HZcvMQ5zMa6tcShA6oq-PaON_ZH1yZKrWmL4PR12Rh7P4BBIw4Yb7TPXQ3KLj_DdPxQGFeCE8OfuXCTAvVoFgUtzaDKKydtLpO37W7Vx66n-86zKehbC9DgJ-P8RXQyvofT8kjOdss2WBGdc",
  ),
  buildEntry(
    "4",
    "Elena Rodriguez",
    "Operations",
    "bg-slate-200 text-slate-700",
    "Logistics Manager",
    18,
    310,
    0,
    0.15,
    80,
    "On Hold",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuB3dlKFvoJMFbdcnp9-EkkFvfndz17UxHSR2znrjHKKbcw4I22HwfYA5fJWMLpBLg-KUjE-trA3YpG1ocnX6gEtUM6HwirGTLO3fcHOU-UYUD919LwsH4frc4CbR_lDmJNK-nbVfGXhl1ZeRLYCB8WYT5417zw76JrU38MDAr_pyBqbe-D071c8hDbjNLP8NjvBp0uIXfEbtyZfftd70qLooZFPvgtjWHadsDyxADdv6HN7OSEXdKqO-9WImDKAOz9LKRn7fDRRF7Y",
  ),
  buildEntry(
    "5",
    "Maya Thompson",
    "Marketing",
    "bg-emerald-100 text-emerald-700",
    "Content Lead",
    22,
    280,
    6,
    0.12,
    70,
    "Released",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuBQLeixBONhkcRMUWdvzUGHp_R6hZkbdaVvLIRXE24-U41WsASuznLQ3UL_kKZTdQb_auUvLJDTMxtStGxbBEvO-yTTeL47daS4sS-r95HKzZnRH9Z2QhI_fSe_3QSPn-U6JGktAzUlN53F6PEDeNH7Uupgz9xQEedfnSottccn3ST3NBsgTrkBVXH7M1JNZGfTzs2fDhAzC3I9KYZG79UKCtpLj3iT_yRFPCJIc70HpTVHui6NfNoGczP7wZRR_Ujnist8lY0zUBg",
  ),
  buildEntry(
    "6",
    "Julian Wan",
    "Engineering",
    "bg-blue-100 text-blue-700",
    "Frontend Developer",
    21,
    320,
    12,
    0.15,
    85,
    "Pending",
    undefined,
    "JW",
  ),
  buildEntry(
    "7",
    "Priya Nair",
    "Product Design",
    "bg-purple-100 text-purple-700",
    "UX Researcher",
    19,
    295,
    0,
    0.12,
    75,
    "Approved",
    undefined,
    "PN",
  ),
];

const PAYROLL_HISTORY: PayrollRun[] = [
  {
    id: "h1",
    period: "September 2026",
    releasedDate: "Sep 30, 2026",
    totalAmount: "$438,200",
    employees: 124,
    status: "Completed",
  },
  {
    id: "h2",
    period: "August 2026",
    releasedDate: "Aug 31, 2026",
    totalAmount: "$421,650",
    employees: 120,
    status: "Completed",
  },
  {
    id: "h3",
    period: "July 2026",
    releasedDate: "Jul 31, 2026",
    totalAmount: "$415,080",
    employees: 118,
    status: "Completed",
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

const STATUS_STYLES: Record<PayrollStatus, string> = {
  Approved: "bg-emerald-50 text-emerald-700 border border-emerald-200",
  Pending: "bg-amber-50 text-amber-700 border border-amber-200",
  "On Hold": "bg-red-50 text-red-600 border border-red-200",
  Released: "bg-blue-50 text-blue-700 border border-blue-200",
};

const fmt = (n: number) =>
  n.toLocaleString("en-US", { style: "currency", currency: "USD" });

// ─── Sub-components ───────────────────────────────────────────────────────────

const SummaryCards: React.FC<{ entries: PayrollEntry[] }> = ({ entries }) => {
  const totalGross = entries.reduce((s, e) => s + e.grossPay, 0);
  const totalNet = entries.reduce((s, e) => s + e.netPay, 0);
  const totalTax = entries.reduce((s, e) => s + e.grossPay * e.taxRate, 0);
  const pending = entries.filter((e) => e.status === "Pending").length;

  const cards = [
    {
      icon: "account_balance_wallet",
      bg: "bg-blue-50",
      color: "text-blue-600",
      label: "Total Gross Payroll",
      value: fmt(totalGross),
      sub: "October 2026 cycle",
    },
    {
      icon: "payments",
      bg: "bg-emerald-50",
      color: "text-emerald-600",
      label: "Net Payout",
      value: fmt(totalNet),
      sub: `After tax & deductions`,
    },
    {
      icon: "receipt_long",
      bg: "bg-purple-50",
      color: "text-purple-600",
      label: "Total Tax Withheld",
      value: fmt(totalTax),
      sub: "Remitted to authorities",
    },
    {
      icon: "pending_actions",
      bg: "bg-amber-50",
      color: "text-amber-600",
      label: "Awaiting Approval",
      value: String(pending),
      sub: "Employees pending review",
      pulse: pending > 0,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
      {cards.map((c) => (
        <div
          key={c.label}
          className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="flex justify-between items-start mb-4">
            <div className={`p-3 ${c.bg} rounded-lg ${c.color}`}>
              <span className="material-symbols-outlined">{c.icon}</span>
            </div>
            {c.pulse && (
              <span className="flex h-2 w-2 rounded-full bg-amber-500 animate-pulse mt-1" />
            )}
          </div>
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            {c.label}
          </p>
          <h3 className="font-extrabold text-2xl mt-1 text-slate-800">
            {c.value}
          </h3>
          <p className="text-xs text-slate-400 mt-1">{c.sub}</p>
        </div>
      ))}
    </div>
  );
};

const StatusBadge: React.FC<{ status: PayrollStatus }> = ({ status }) => (
  <span
    className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold ${STATUS_STYLES[status]}`}
  >
    {status}
  </span>
);

const exportPayrollCSV = (entries: PayrollEntry[]) => {
  const headers = ["Name", "Department", "Role", "Days Worked", "Daily Rate", "Overtime (h)", "Gross Pay", "Tax Rate", "Tax Withheld", "Net Pay", "Status"];
  const rows = entries.map((e) => [
    e.name, e.department, e.role, e.daysWorked, e.dailyRate, e.overtime,
    e.grossPay.toFixed(2), `${(e.taxRate * 100).toFixed(0)}%`,
    (e.grossPay * e.taxRate).toFixed(2), e.netPay.toFixed(2), e.status,
  ]);
  const csv = [headers, ...rows].map((r) => r.map((v) => `"${v}"`).join(",")).join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `payroll_oct2026.csv`;
  a.click();
  URL.revokeObjectURL(url);
};

// ─── Send Payslip Modal ──────────────────────────────────────────────────────

const SendPayslipModal: React.FC<{ entry: PayrollEntry; onClose: () => void }> = ({ entry, onClose }) => {
  const [email, setEmail] = useState(entry.name.toLowerCase().replace(" ", ".") + "@salarypro.com");
  const [sent, setSent] = useState(false);

  const handleSend = () => {
    setSent(true);
    setTimeout(onClose, 1800);
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
        <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-bold text-slate-800">Send Payslip</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition-colors">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>
        <div className="px-6 py-5 space-y-4">
          {/* Employee info */}
          <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
            {entry.avatarUrl ? (
              <img src={entry.avatarUrl} alt={entry.name} className="w-10 h-10 rounded-full object-cover" />
            ) : (
              <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-xs font-bold text-slate-600">{entry.initials}</div>
            )}
            <div>
              <p className="text-sm font-bold text-slate-800">{entry.name}</p>
              <p className="text-xs text-slate-500">{entry.role} · {entry.department}</p>
            </div>
            <div className="ml-auto text-right">
              <p className="text-xs text-slate-400">Net Pay</p>
              <p className="font-extrabold text-blue-600">{fmt(entry.netPay)}</p>
            </div>
          </div>
          {/* Summary */}
          <div className="grid grid-cols-3 gap-3 text-center">
            {[
              { label: "Gross", value: fmt(entry.grossPay), color: "text-slate-800" },
              { label: "Tax", value: `-${fmt(entry.grossPay * entry.taxRate)}`, color: "text-red-500" },
              { label: "Deductions", value: `-${fmt(entry.deductions)}`, color: "text-amber-600" },
            ].map((item) => (
              <div key={item.label} className="bg-slate-50 rounded-lg p-2">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{item.label}</p>
                <p className={`text-sm font-bold ${item.color}`}>{item.value}</p>
              </div>
            ))}
          </div>
          {/* Email input */}
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Recipient Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50"
            />
          </div>
        </div>
        <div className="px-6 pb-6 flex gap-3">
          <button onClick={onClose} className="flex-1 px-4 py-2.5 bg-slate-100 text-slate-800 text-sm font-bold rounded-xl hover:bg-slate-200 transition-colors">
            Cancel
          </button>
          <button
            onClick={handleSend}
            disabled={sent}
            className="flex-1 px-4 py-2.5 bg-gradient-to-br from-blue-600 to-blue-700 text-white text-sm font-bold rounded-xl shadow-lg shadow-blue-200 hover:scale-[1.02] transition-all disabled:opacity-70 disabled:scale-100 flex items-center justify-center gap-2"
          >
            {sent ? (
              <><span className="material-symbols-outlined text-sm">check_circle</span> Sent!</>
            ) : (
              <><span className="material-symbols-outlined text-sm">send</span> Send Payslip</>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

const PayrollTable: React.FC<{
  entries: PayrollEntry[];
  onApprove: (id: string) => void;
  onHold: (id: string) => void;
  onRelease: (id: string) => void;
}> = ({ entries, onApprove, onHold, onRelease }) => {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [payslipEntry, setPayslipEntry] = useState<PayrollEntry | null>(null);

  return (
    <>
    {payslipEntry && <SendPayslipModal entry={payslipEntry} onClose={() => setPayslipEntry(null)} />}
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      {/* Table header */}
      <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
        <div>
          <h3 className="font-bold text-slate-800">Payroll Run — October 2026</h3>
          <p className="text-xs text-slate-500 mt-0.5">
            {entries.length} employees • Cycle closes Oct 31, 2026
          </p>
        </div>
        <div className="flex gap-2">
          <button
            className="px-4 py-2 text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
            onClick={() => exportPayrollCSV(entries)}
          >
            Export CSV
          </button>
          <button
            className="px-4 py-2 text-xs font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded-lg transition-colors"
            onClick={() => {
              const pendingIds = entries.filter((e) => e.status === "Pending").map((e) => e.id);
              pendingIds.forEach((id) => onApprove(id));
            }}
          >
            Approve All Pending
          </button>
          <button
            className="px-4 py-2 text-xs font-bold text-white bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg shadow-sm shadow-blue-200 hover:scale-[1.02] transition-transform"
            onClick={() => entries.filter((e) => e.status === "Approved").forEach((e) => onRelease(e.id))}
          >
            Release All Approved
          </button>
        </div>
      </div>

      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-slate-50">
            {[
              "Employee",
              "Department",
              "Days / Rate",
              "Gross Pay",
              "Tax",
              "Net Pay",
              "Status",
              "Actions",
            ].map((col) => (
              <th
                key={col}
                className="px-5 py-3.5 text-xs font-bold text-slate-500 uppercase tracking-wider"
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {entries.map((entry) => (
            <React.Fragment key={entry.id}>
              <tr
                className="hover:bg-slate-50/60 transition-colors cursor-pointer"
                onClick={() =>
                  setExpandedId(expandedId === entry.id ? null : entry.id)
                }
              >
                {/* Employee */}
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    {entry.avatarUrl ? (
                      <img
                        src={entry.avatarUrl}
                        alt={entry.name}
                        className="w-9 h-9 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-9 h-9 rounded-full bg-slate-200 flex items-center justify-center text-xs font-bold text-slate-600">
                        {entry.initials}
                      </div>
                    )}
                    <div>
                      <p className="text-sm font-semibold text-slate-800">
                        {entry.name}
                      </p>
                      <p className="text-xs text-slate-400">{entry.role}</p>
                    </div>
                  </div>
                </td>

                {/* Department */}
                <td className="px-5 py-4">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${entry.departmentColor}`}
                  >
                    {entry.department}
                  </span>
                </td>

                {/* Days / Rate */}
                <td className="px-5 py-4">
                  <p className="text-sm font-semibold text-slate-800">
                    {entry.daysWorked}
                    <span className="text-slate-400 font-normal">
                      /{entry.totalDays} days
                    </span>
                  </p>
                  <p className="text-xs text-slate-400">
                    {fmt(entry.dailyRate)}/day
                    {entry.overtime > 0 && (
                      <span className="ml-1 text-amber-600 font-bold">
                        +{entry.overtime}h OT
                      </span>
                    )}
                  </p>
                </td>

                {/* Gross */}
                <td className="px-5 py-4 font-semibold text-slate-800 text-sm">
                  {fmt(entry.grossPay)}
                </td>

                {/* Tax */}
                <td className="px-5 py-4 text-sm text-slate-500">
                  <span className="font-medium text-red-500">
                    -{fmt(entry.grossPay * entry.taxRate)}
                  </span>
                  <span className="block text-xs text-slate-400">
                    {(entry.taxRate * 100).toFixed(0)}% rate
                  </span>
                </td>

                {/* Net */}
                <td className="px-5 py-4">
                  <span className="font-extrabold text-slate-800 text-sm">
                    {fmt(entry.netPay)}
                  </span>
                </td>

                {/* Status */}
                <td className="px-5 py-4">
                  <StatusBadge status={entry.status} />
                </td>

                {/* Actions */}
                <td
                  className="px-5 py-4 text-right"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex gap-1 justify-end">
                    {entry.status === "Pending" && (
                      <>
                        <button
                          onClick={() => onApprove(entry.id)}
                          className="px-2.5 py-1 text-xs font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded-lg transition-colors"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => onHold(entry.id)}
                          className="px-2.5 py-1 text-xs font-bold text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
                        >
                          Hold
                        </button>
                      </>
                    )}
                    {entry.status === "Approved" && (
                      <button
                        onClick={() => onRelease(entry.id)}
                        className="px-2.5 py-1 text-xs font-bold text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
                      >
                        Release
                      </button>
                    )}
                    {entry.status === "On Hold" && (
                      <button
                        onClick={() => onApprove(entry.id)}
                        className="px-2.5 py-1 text-xs font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded-lg transition-colors"
                      >
                        Re-approve
                      </button>
                    )}
                    {entry.status === "Released" && (
                      <span className="text-xs text-slate-400 italic px-2">
                        Paid
                      </span>
                    )}
                    <button
                      onClick={() => setPayslipEntry(entry)}
                      title="Send payslip"
                      className="p-1.5 text-slate-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      <span className="material-symbols-outlined text-sm">send</span>
                    </button>
                  </div>
                </td>
              </tr>

              {/* Expanded detail row */}
              {expandedId === entry.id && (
                <tr className="bg-blue-50/40">
                  <td colSpan={8} className="px-8 py-4">
                    <div className="grid grid-cols-4 gap-6 text-sm">
                      <div>
                        <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                          Base Pay
                        </p>
                        <p className="font-semibold text-slate-800">
                          {fmt(entry.daysWorked * entry.dailyRate)}
                        </p>
                        <p className="text-xs text-slate-400">
                          {entry.daysWorked} days × {fmt(entry.dailyRate)}
                        </p>
                      </div>
                      {entry.overtime > 0 && (
                        <div>
                          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                            Overtime
                          </p>
                          <p className="font-semibold text-amber-600">
                            +
                            {fmt(
                              entry.overtime *
                                (entry.dailyRate / 8) *
                                1.5,
                            )}
                          </p>
                          <p className="text-xs text-slate-400">
                            {entry.overtime}h × 1.5x rate
                          </p>
                        </div>
                      )}
                      <div>
                        <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                          Tax Withheld
                        </p>
                        <p className="font-semibold text-red-500">
                          -{fmt(entry.grossPay * entry.taxRate)}
                        </p>
                        <p className="text-xs text-slate-400">
                          {(entry.taxRate * 100).toFixed(0)}% income tax
                        </p>
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                          Other Deductions
                        </p>
                        <p className="font-semibold text-slate-600">
                          -{fmt(entry.deductions)}
                        </p>
                        <p className="text-xs text-slate-400">
                          Benefits & contributions
                        </p>
                      </div>
                    </div>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>

        {/* Footer totals */}
        <tfoot>
          <tr className="bg-slate-50 border-t-2 border-slate-200">
            <td
              colSpan={3}
              className="px-5 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider"
            >
              Totals — {entries.length} employees
            </td>
            <td className="px-5 py-4 font-extrabold text-slate-800">
              {fmt(entries.reduce((s, e) => s + e.grossPay, 0))}
            </td>
            <td className="px-5 py-4 font-bold text-red-500">
              -{fmt(entries.reduce((s, e) => s + e.grossPay * e.taxRate, 0))}
            </td>
            <td className="px-5 py-4 font-extrabold text-blue-700 text-base">
              {fmt(entries.reduce((s, e) => s + e.netPay, 0))}
            </td>
            <td colSpan={2} />
          </tr>
        </tfoot>
      </table>
    </div>
    </>
  );
};

const DeptBreakdown: React.FC<{ entries: PayrollEntry[] }> = ({ entries }) => {
  const depts = Array.from(new Set(entries.map((e) => e.department)));
  const total = entries.reduce((s, e) => s + e.netPay, 0);

  const rows = depts.map((dept) => {
    const deptEntries = entries.filter((e) => e.department === dept);
    const deptTotal = deptEntries.reduce((s, e) => s + e.netPay, 0);
    const pct = Math.round((deptTotal / total) * 100);
    const color = deptEntries[0]?.departmentColor ?? "";
    return { dept, deptTotal, pct, count: deptEntries.length, color };
  });

  const BAR_COLORS: Record<string, string> = {
    Engineering: "bg-blue-500",
    "Product Design": "bg-purple-500",
    Operations: "bg-slate-400",
    Marketing: "bg-emerald-500",
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <h4 className="font-bold text-slate-800 mb-1">Department Breakdown</h4>
      <p className="text-xs text-slate-500 mb-6">Net payout by department</p>
      <div className="space-y-4">
        {rows.map(({ dept, deptTotal, pct, count }) => (
          <div key={dept}>
            <div className="flex justify-between text-sm mb-1.5">
              <span className="font-semibold text-slate-700">{dept}</span>
              <div className="text-right">
                <span className="font-bold text-slate-800">{fmt(deptTotal)}</span>
                <span className="text-xs text-slate-400 ml-2">
                  {count} emp.
                </span>
              </div>
            </div>
            <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full ${BAR_COLORS[dept] ?? "bg-slate-400"} transition-all duration-500`}
                style={{ width: `${pct}%` }}
              />
            </div>
            <p className="text-xs text-slate-400 mt-1">{pct}% of total</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const HISTORY_DETAILS: Record<string, { avgNet: string; topDept: string; onTime: string }> = {
  h1: { avgNet: "$3,820", topDept: "Engineering", onTime: "98%" },
  h2: { avgNet: "$3,670", topDept: "Engineering", onTime: "100%" },
  h3: { avgNet: "$3,610", topDept: "Product Design", onTime: "97%" },
};

const PayrollHistory: React.FC = () => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <h4 className="font-bold text-slate-800 mb-1">Payroll History</h4>
      <p className="text-xs text-slate-500 mb-6">Last 3 completed cycles — click to expand</p>
      <div className="space-y-3">
        {PAYROLL_HISTORY.map((run) => {
          const isOpen = expandedId === run.id;
          const detail = HISTORY_DETAILS[run.id];
          return (
            <div key={run.id} className="rounded-xl overflow-hidden border border-slate-100">
              <button
                onClick={() => setExpandedId(isOpen ? null : run.id)}
                className="w-full flex items-center justify-between p-4 bg-slate-50 hover:bg-slate-100 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600">
                    <span className="material-symbols-outlined">receipt_long</span>
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-bold text-slate-800">{run.period}</p>
                    <p className="text-xs text-slate-500">
                      Released {run.releasedDate} · {run.employees} employees
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <p className="font-extrabold text-slate-800">{run.totalAmount}</p>
                    <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                      {run.status}
                    </span>
                  </div>
                  <span className={`material-symbols-outlined text-slate-400 transition-transform ${isOpen ? "rotate-180" : ""}`}>
                    expand_more
                  </span>
                </div>
              </button>
              {isOpen && detail && (
                <div className="px-4 py-3 bg-white grid grid-cols-3 gap-4 border-t border-slate-100">
                  {[
                    { label: "Avg Net Pay", value: detail.avgNet, color: "text-blue-600" },
                    { label: "Top Dept", value: detail.topDept, color: "text-purple-600" },
                    { label: "On-Time Rate", value: detail.onTime, color: "text-emerald-600" },
                  ].map((item) => (
                    <div key={item.label} className="text-center">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{item.label}</p>
                      <p className={`text-sm font-extrabold ${item.color} mt-0.5`}>{item.value}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
      <button className="w-full mt-4 py-2 text-xs font-bold text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors">
        View Full History
      </button>
    </div>
  );
};

// ─── Main Page ────────────────────────────────────────────────────────────────

const PERIODS = ["October 2026", "November 2026", "December 2026", "January 2027"];

const PAYROLL_STATUSES: Array<PayrollStatus | "All"> = ["All", "Pending", "Approved", "On Hold", "Released"];

const PayrollPage: React.FC = () => {
  const [entries, setEntries] = useState<PayrollEntry[]>(PAYROLL_ENTRIES);
  const [period, setPeriod] = useState("October 2026");
  const [statusFilter, setStatusFilter] = useState<PayrollStatus | "All">("All");

  const handleApprove = (id: string) => {
    setEntries((prev) =>
      prev.map((e) => (e.id === id ? { ...e, status: "Approved" } : e)),
    );
  };

  const handleHold = (id: string) => {
    setEntries((prev) =>
      prev.map((e) => (e.id === id ? { ...e, status: "On Hold" } : e)),
    );
  };

  const handleRelease = (id: string) => {
    setEntries((prev) =>
      prev.map((e) => (e.id === id ? { ...e, status: "Released" } : e)),
    );
  };

  return (
    <div className="space-y-10">
      {/* Page header */}
      <section className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-800">
            Payroll Management
          </h2>
          <p className="text-slate-500 font-medium mt-1">
            Review, approve, and release payroll for the current cycle.
          </p>
        </div>
        <div className="flex gap-3">
          <div className="relative">
            <select
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
              className="appearance-none pl-4 pr-10 py-2.5 bg-white border border-slate-200 text-slate-800 text-sm font-semibold rounded-lg outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50"
            >
              {PERIODS.map((p) => <option key={p}>{p}</option>)}
            </select>
            <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 text-sm">expand_more</span>
          </div>
          <button className="px-5 py-2.5 bg-slate-200 text-slate-800 text-sm font-semibold rounded-lg hover:bg-slate-300 transition-colors">
            Export Report
          </button>
          <button className="px-5 py-2.5 bg-gradient-to-br from-blue-600 to-blue-700 text-white text-sm font-semibold rounded-lg shadow-lg shadow-blue-200 hover:scale-[1.02] transition-transform">
            Run New Payroll
          </button>
        </div>
      </section>

      {/* Summary KPI cards */}
      <SummaryCards entries={entries} />

      {/* Status filter tabs */}
      <div className="flex items-center gap-2 flex-wrap">
        {PAYROLL_STATUSES.map((s) => {
          const counts: Record<string, number> = {};
          PAYROLL_STATUSES.forEach((st) => { counts[st] = st === "All" ? entries.length : entries.filter((e) => e.status === st).length; });
          const active = statusFilter === s;
          return (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${active ? "bg-blue-600 text-white shadow-md shadow-blue-200" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}
            >
              {s} <span className={`ml-1 px-1.5 py-0.5 rounded-full text-[10px] ${active ? "bg-white/20 text-white" : "bg-slate-200 text-slate-500"}`}>{counts[s]}</span>
            </button>
          );
        })}
      </div>

      {/* Payroll table */}
      <PayrollTable
        entries={statusFilter === "All" ? entries : entries.filter((e) => e.status === statusFilter)}
        onApprove={handleApprove}
        onHold={handleHold}
        onRelease={handleRelease}
      />

      {/* Bottom panels */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <DeptBreakdown entries={entries} />
        <PayrollHistory />
      </section>
    </div>
  );
};

export default PayrollPage;
