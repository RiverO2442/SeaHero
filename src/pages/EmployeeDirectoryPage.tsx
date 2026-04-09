import React, { useState } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

type EmployeeStatus = "Active" | "Inactive";

interface DirectoryEmployee {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  department: string;
  departmentColor: string;
  role: string;
  dailyWage: number;
  status: EmployeeStatus;
}

// ─── Seed Data ────────────────────────────────────────────────────────────────

const EMPLOYEES: DirectoryEmployee[] = [
  {
    id: "1",
    name: "Marcus Chen",
    email: "marcus.c@salarypro.com",
    avatarUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCYGVAPvh6BIuk9IJq1VylviVSpQeL877-BFIqF3TxNsIrsJ8TC9ER79KyNRcA5Mk-WZTmBebvTsIr3l7c-wHvH7kkVCi8OLI8AjwItZ5-i4vBVTdsCWm6L9Gz_4ld74MaSHzvC-smGur7CdFEJfvactyoL4LwD-iUtay2_4t8O9DS9K6_1VI8S_c1ctLf4npEqlFKhzLJmrMQPHG_-YkvGhcVJsbWSAjzrrBQM7TKPAY0fKvN4gXZL7Hkukjz2m9xbAauC7aamMME",
    department: "Engineering",
    departmentColor: "bg-blue-100 text-blue-700",
    role: "Senior Fullstack Engineer",
    dailyWage: 450,
    status: "Active",
  },
  {
    id: "2",
    name: "Sarah Jenkins",
    email: "s.jenkins@salarypro.com",
    avatarUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDrms5ZEBNnbfK7FKAW_-4HL4XUBj7-QUMq8sDYUEl-qjbliqRU5rg2Ho4CmYr-Fg-N1aGpavjyzvuALm3jN9tzAoTCWeCGWpjoQN7KSVIXgslksl2iNE_qchJFCJGTcX5HB6VyBRClUGnJrfh9Tz-W1oeQdBxPkMBOPIWyLMozLbyMDkTWemVcRU9tRzhkoNsq6ktzXopfwEowy8hyPFeMzMQKH7gFcAVWLinjIBz5GGfP4Qrif1aqKO1YfaVOzFVF5kT1ITH0GCQ",
    department: "Product Design",
    departmentColor: "bg-purple-100 text-purple-700",
    role: "Principal UI Designer",
    dailyWage: 425,
    status: "Active",
  },
  {
    id: "3",
    name: "David Okoro",
    email: "d.okoro@salarypro.com",
    avatarUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCfI2RZuBiZ9koaWo2Kp_s5jDumAEe76wkP0vaOiO2GxcbklMlpDp6H6cMcLCfOnag7bBTFno-6OX3jIzlWBxEGxvulPFienHzKAcTl5LULgydRzSgROIS2dwJbJB0HZcvMQ5zMa6tcShA6oq-PaON_ZH1yZKrWmL4PR12Rh7P4BBIw4Yb7TPXQ3KLj_DdPxQGFeCE8OfuXCTAvVoFgUtzaDKKydtLpO37W7Vx66n-86zKehbC9DgJ-P8RXQyvofT8kjOdss2WBGdc",
    department: "Engineering",
    departmentColor: "bg-blue-100 text-blue-700",
    role: "DevOps Specialist",
    dailyWage: 390,
    status: "Active",
  },
  {
    id: "4",
    name: "Elena Rodriguez",
    email: "e.rodriguez@salarypro.com",
    avatarUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuB3dlKFvoJMFbdcnp9-EkkFvfndz17UxHSR2znrjHKKbcw4I22HwfYA5fJWMLpBLg-KUjE-trA3YpG1ocnX6gEtUM6HwirGTLO3fcHOU-UYUD919LwsH4frc4CbR_lDmJNK-nbVfGXhl1ZeRLYCB8WYT5417zw76JrU38MDAr_pyBqbe-D071c8hDbjNLP8NjvBp0uIXfEbtyZfftd70qLooZFPvgtjWHadsDyxADdv6HN7OSEXdKqO-9WImDKAOz9LKRn7fDRRF7Y",
    department: "Operations",
    departmentColor: "bg-slate-200 text-slate-700",
    role: "Logistics Manager",
    dailyWage: 310,
    status: "Inactive",
  },
  {
    id: "5",
    name: "Maya Thompson",
    email: "m.thompson@salarypro.com",
    avatarUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBQLeixBONhkcRMUWdvzUGHp_R6hZkbdaVvLIRXE24-U41WsASuznLQ3UL_kKZTdQb_auUvLJDTMxtStGxbBEvO-yTTeL47daS4sS-r95HKzZnRH9Z2QhI_fSe_3QSPn-U6JGktAzUlN53F6PEDeNH7Uupgz9xQEedfnSottccn3ST3NBsgTrkBVXH7M1JNZGfTzs2fDhAzC3I9KYZG79UKCtpLj3iT_yRFPCJIc70HpTVHui6NfNoGczP7wZRR_Ujnist8lY0zUBg",
    department: "Marketing",
    departmentColor: "bg-blue-100 text-blue-700",
    role: "Content Lead",
    dailyWage: 280,
    status: "Active",
  },
];

const DEPARTMENTS = [
  "All Departments",
  "Engineering",
  "Product Design",
  "Operations",
  "Marketing",
];
const STATUSES = ["All Statuses", "Active", "Inactive"];

// ─── Sub-components ───────────────────────────────────────────────────────────

const StatusBadge: React.FC<{ status: EmployeeStatus }> = ({ status }) =>
  status === "Active" ? (
    <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600">
      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
      Active
    </span>
  ) : (
    <span className="inline-flex items-center gap-1 text-xs font-bold text-slate-500">
      <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
      Inactive
    </span>
  );

const AnalyticsCards: React.FC = () => (
  <div className="mt-12 grid grid-cols-12 gap-6">
    <div className="col-span-12 md:col-span-4 bg-white p-6 rounded-xl shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">
          Headcount
        </span>
        <span className="material-symbols-outlined text-blue-600">group</span>
      </div>
      <h3 className="text-3xl font-extrabold text-slate-800">124</h3>
      <p className="text-xs font-medium text-emerald-600 mt-2 flex items-center gap-1">
        <span className="material-symbols-outlined text-sm">trending_up</span>
        +4 this month
      </p>
    </div>

    <div className="col-span-12 md:col-span-4 bg-white p-6 rounded-xl shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">
          Avg. Daily Wage
        </span>
        <span className="material-symbols-outlined text-blue-600">
          payments
        </span>
      </div>
      <h3 className="text-3xl font-extrabold text-slate-800">$342.50</h3>
      <p className="text-xs font-medium text-slate-500 mt-2">
        Platform average: $310.00
      </p>
    </div>

    <div className="col-span-12 md:col-span-4 bg-gradient-to-br from-blue-600 to-blue-700 text-white p-6 rounded-xl shadow-lg shadow-blue-200">
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-bold opacity-80 uppercase tracking-widest">
          Payroll Status
        </span>
        <span className="material-symbols-outlined">verified_user</span>
      </div>
      <h3 className="text-xl font-bold">All reports ready</h3>
      <p className="text-xs font-medium opacity-90 mt-2">
        Next payroll cycle: Oct 30, 2023
      </p>
      <div className="mt-4 h-1 w-full bg-white/20 rounded-full overflow-hidden">
        <div className="h-full bg-white w-3/4 rounded-full" />
      </div>
    </div>
  </div>
);

// ─── Page ─────────────────────────────────────────────────────────────────────

const EmployeeDirectoryPage: React.FC = () => {
  const [deptFilter, setDeptFilter] = useState("All Departments");
  const [statusFilter, setStatusFilter] = useState("All Statuses");

  const filtered = EMPLOYEES.filter((emp) => {
    const deptMatch =
      deptFilter === "All Departments" || emp.department === deptFilter;
    const statusMatch =
      statusFilter === "All Statuses" || emp.status === statusFilter;
    return deptMatch && statusMatch;
  });

  return (
    <>
      {/* Page header */}
      <div className="flex justify-between items-end mb-10">
        <div>
          <h2 className="text-3xl font-extrabold text-slate-800 tracking-tight">
            Employee Directory
          </h2>
          <p className="text-slate-500 mt-1 text-sm font-medium">
            Manage your workforce, roles, and compensation details.
          </p>
        </div>
        <button className="bg-gradient-to-br from-blue-600 to-blue-700 text-white px-5 py-2.5 rounded-lg flex items-center gap-2 font-semibold shadow-lg shadow-blue-200 hover:scale-[1.02] transition-transform">
          <span className="material-symbols-outlined text-xl">add</span>
          Add Employee
        </button>
      </div>

      {/* Filter bar */}
      <div className="bg-slate-100 rounded-xl p-4 mb-6 flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2 text-sm font-medium text-slate-500">
          <span className="material-symbols-outlined text-lg">filter_list</span>
          Filters:
        </div>

        {/* Department filter */}
        <div className="relative">
          <select
            value={deptFilter}
            onChange={(e) => setDeptFilter(e.target.value)}
            className="appearance-none bg-white border-none rounded-lg py-2 pl-4 pr-10 text-sm font-medium focus:ring-2 focus:ring-blue-100 cursor-pointer text-slate-800 outline-none"
          >
            {DEPARTMENTS.map((d) => (
              <option key={d}>{d}</option>
            ))}
          </select>
          <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 text-sm">
            expand_more
          </span>
        </div>

        {/* Status filter */}
        <div className="relative">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="appearance-none bg-white border-none rounded-lg py-2 pl-4 pr-10 text-sm font-medium focus:ring-2 focus:ring-blue-100 cursor-pointer text-slate-800 outline-none"
          >
            {STATUSES.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
          <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 text-sm">
            expand_more
          </span>
        </div>

        <div className="ml-auto flex items-center gap-2">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">
            Sort By:
          </span>
          <button className="text-sm font-bold text-blue-600 flex items-center gap-1">
            Recently Joined
            <span className="material-symbols-outlined text-sm">
              arrow_downward
            </span>
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl overflow-hidden shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50">
              {[
                "Employee Name",
                "Department",
                "Role",
                "Daily Wage",
                "Status",
                "",
              ].map((col) => (
                <th
                  key={col}
                  className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider"
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filtered.map((emp) => (
              <tr
                key={emp.id}
                className="hover:bg-slate-50/60 transition-colors group"
              >
                {/* Employee */}
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={emp.avatarUrl}
                      alt={emp.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <p className="text-sm font-bold text-slate-800">
                        {emp.name}
                      </p>
                      <p className="text-xs text-slate-500">{emp.email}</p>
                    </div>
                  </div>
                </td>

                {/* Department */}
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${emp.departmentColor}`}
                  >
                    {emp.department}
                  </span>
                </td>

                {/* Role */}
                <td className="px-6 py-4 text-sm font-medium text-slate-500">
                  {emp.role}
                </td>

                {/* Daily wage */}
                <td className="px-6 py-4">
                  <span className="font-bold text-slate-800">
                    ${emp.dailyWage.toFixed(2)}
                  </span>
                </td>

                {/* Status */}
                <td className="px-6 py-4">
                  <StatusBadge status={emp.status} />
                </td>

                {/* Actions */}
                <td className="px-6 py-4 text-right">
                  <button className="opacity-0 group-hover:opacity-100 transition-opacity p-2 hover:bg-slate-100 rounded-lg text-slate-500">
                    <span className="material-symbols-outlined">more_vert</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination footer */}
        <div className="px-6 py-4 bg-slate-50/30 flex justify-between items-center border-t border-slate-100">
          <p className="text-xs font-medium text-slate-500 italic">
            Showing 1 to {filtered.length} of 124 employees
          </p>
          <div className="flex gap-2 items-center">
            <button
              disabled
              className="px-3 py-1 text-sm font-bold text-slate-400 disabled:opacity-30"
            >
              Previous
            </button>
            <div className="flex items-center gap-1">
              {[1, 2, 3].map((n) => (
                <button
                  key={n}
                  className={`w-8 h-8 rounded-lg text-xs font-bold transition-colors ${
                    n === 1
                      ? "bg-blue-600 text-white"
                      : "hover:bg-slate-100 text-slate-500"
                  }`}
                >
                  {n}
                </button>
              ))}
              <span className="text-slate-400 text-xs mx-1">...</span>
              <button className="w-8 h-8 rounded-lg hover:bg-slate-100 text-slate-500 text-xs font-bold transition-colors">
                25
              </button>
            </div>
            <button className="px-3 py-1 text-sm font-bold text-blue-600 hover:text-blue-700 transition-colors">
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Analytics cards */}
      <AnalyticsCards />
    </>
  );
};

export default EmployeeDirectoryPage;
