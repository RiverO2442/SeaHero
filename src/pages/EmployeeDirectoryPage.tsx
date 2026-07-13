import React, { useState, useEffect, useRef } from "react";
import { mergeStoredEmployees } from "../utils/employeeStore";
import { EmployeeProfileDrawer } from "../components/EmployeeProfileDrawer";
import type { DrawerEmployee } from "../components/EmployeeProfileDrawer";
import { EmployeeNotepad } from "../components/EmployeeNotepad";
import { useClipboard } from "../hooks/useClipboard";

const PER_PAGE = 5;

// â”€â”€â”€ Types â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

type EmployeeStatus = "Active" | "Inactive";

interface DirectoryEmployee {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  initials?: string;
  department: string;
  departmentColor: string;
  role: string;
  dailyWage: number;
  status: EmployeeStatus;
}

interface NewEmployeeForm {
  name: string;
  email: string;
  department: string;
  role: string;
  dailyWage: string;
  status: EmployeeStatus;
}

// â”€â”€â”€ Seed Data â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

const DEPT_COLORS: Record<string, string> = {
  Engineering: "bg-blue-100 text-blue-700",
  "Product Design": "bg-purple-100 text-purple-700",
  Operations: "bg-slate-200 text-slate-700",
  Marketing: "bg-emerald-100 text-emerald-700",
  Finance: "bg-amber-100 text-amber-700",
  HR: "bg-rose-100 text-rose-700",
};

const DEPARTMENTS = Object.keys(DEPT_COLORS);

const SEED_EMPLOYEES: DirectoryEmployee[] = [
  {
    id: "1",
    name: "Marcus Chen",
    email: "marcus.c@salarypro.com",
    avatarUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCYGVAPvh6BIuk9IJq1VylviVSpQeL877-BFIqF3TxNsIrsJ8TC9ER79KyNRcA5Mk-WZTmBebvTsIr3l7c-wHvH7kkVCi8OLI8AjwItZ5-i4vBVTdsCWm6L9Gz_4ld74MaSHzvC-smGur7CdFEJfvactyoL4LwD-iUtay2_4t8O9DS9K6_1VI8S_c1ctLf4npEqlFKhzLJmrMQPHG_-YkvGhcVJsbWSAjzrrBQM7TKPAY0fKvN4gXZL7Hkukjz2m9xbAauC7aamMME",
    department: "Engineering",
    departmentColor: DEPT_COLORS["Engineering"],
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
    departmentColor: DEPT_COLORS["Product Design"],
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
    departmentColor: DEPT_COLORS["Engineering"],
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
    departmentColor: DEPT_COLORS["Operations"],
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
    departmentColor: DEPT_COLORS["Marketing"],
    role: "Content Lead",
    dailyWage: 280,
    status: "Active",
  },
];

const STATUSES: EmployeeStatus[] = ["Active", "Inactive"];

const exportEmployeesCSV = (employees: DirectoryEmployee[]) => {
  const headers = ["ID", "Name", "Email", "Department", "Role", "Daily Wage", "Status"];
  const rows = employees.map((e) => [e.id, e.name, e.email, e.department, e.role, e.dailyWage.toFixed(2), e.status]);
  const csv = [headers, ...rows].map((r) => r.map((v) => `"${v}"`).join(",")).join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "employee_directory.csv";
  a.click();
  URL.revokeObjectURL(url);
};

// â”€â”€â”€ Add Employee Modal â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

const EMPTY_FORM: NewEmployeeForm = {
  name: "",
  email: "",
  department: "Engineering",
  role: "",
  dailyWage: "",
  status: "Active",
};

interface AddEmployeeModalProps {
  onClose: () => void;
  onAdd: (emp: DirectoryEmployee) => void;
}

const AddEmployeeModal: React.FC<AddEmployeeModalProps> = ({
  onClose,
  onAdd,
}) => {
  const [form, setForm] = useState<NewEmployeeForm>(EMPTY_FORM);
  const [errors, setErrors] = useState<Partial<NewEmployeeForm>>({});

  const set = (field: keyof NewEmployeeForm, value: string) => {
    setForm((f) => ({ ...f, [field]: value }));
    setErrors((e) => ({ ...e, [field]: undefined }));
  };

  const validate = (): boolean => {
    const errs: Partial<NewEmployeeForm> = {};
    if (!form.name.trim()) errs.name = "Name is required";
    if (!form.email.trim()) errs.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      errs.email = "Invalid email address";
    if (!form.role.trim()) errs.role = "Role is required";
    if (!form.dailyWage.trim()) errs.dailyWage = "Daily wage is required";
    else if (isNaN(Number(form.dailyWage)) || Number(form.dailyWage) <= 0)
      errs.dailyWage = "Enter a valid amount";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const initials = form.name
      .split(" ")
      .map((w) => w[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);

    onAdd({
      id: String(Date.now()),
      name: form.name.trim(),
      email: form.email.trim(),
      initials,
      department: form.department,
      departmentColor: DEPT_COLORS[form.department] ?? "bg-slate-100 text-slate-700",
      role: form.role.trim(),
      dailyWage: Number(form.dailyWage),
      status: form.status,
    });
    onClose();
  };

  return (
    /* Backdrop */
    <div
      className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      {/* Modal card */}
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600">
              <span className="material-symbols-outlined">person_add</span>
            </div>
            <div>
              <h3 className="font-bold text-slate-800">Add New Employee</h3>
              <p className="text-xs text-slate-500">
                Fill in the details below
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-lg text-slate-400 transition-colors"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
          {/* Name */}
          <div>
            <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">
              Full Name
            </label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => set("name", e.target.value)}
              placeholder="e.g. Alex Johnson"
              className={`w-full px-4 py-2.5 rounded-lg border text-sm outline-none transition-colors ${
                errors.name
                  ? "border-red-300 bg-red-50 focus:ring-2 focus:ring-red-100"
                  : "border-slate-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-50"
              }`}
            />
            {errors.name && (
              <p className="text-xs text-red-500 mt-1">{errors.name}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">
              Email Address
            </label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => set("email", e.target.value)}
              placeholder="e.g. alex.j@salarypro.com"
              className={`w-full px-4 py-2.5 rounded-lg border text-sm outline-none transition-colors ${
                errors.email
                  ? "border-red-300 bg-red-50 focus:ring-2 focus:ring-red-100"
                  : "border-slate-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-50"
              }`}
            />
            {errors.email && (
              <p className="text-xs text-red-500 mt-1">{errors.email}</p>
            )}
          </div>

          {/* Department + Role side by side */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">
                Department
              </label>
              <div className="relative">
                <select
                  value={form.department}
                  onChange={(e) => set("department", e.target.value)}
                  className="w-full appearance-none px-4 py-2.5 rounded-lg border border-slate-200 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50 bg-white"
                >
                  {DEPARTMENTS.map((d) => (
                    <option key={d}>{d}</option>
                  ))}
                </select>
                <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 text-sm">
                  expand_more
                </span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">
                Status
              </label>
              <div className="relative">
                <select
                  value={form.status}
                  onChange={(e) =>
                    set("status", e.target.value as EmployeeStatus)
                  }
                  className="w-full appearance-none px-4 py-2.5 rounded-lg border border-slate-200 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50 bg-white"
                >
                  {STATUSES.map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </select>
                <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 text-sm">
                  expand_more
                </span>
              </div>
            </div>
          </div>

          {/* Role */}
          <div>
            <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">
              Job Role / Title
            </label>
            <input
              type="text"
              value={form.role}
              onChange={(e) => set("role", e.target.value)}
              placeholder="e.g. Frontend Developer"
              className={`w-full px-4 py-2.5 rounded-lg border text-sm outline-none transition-colors ${
                errors.role
                  ? "border-red-300 bg-red-50 focus:ring-2 focus:ring-red-100"
                  : "border-slate-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-50"
              }`}
            />
            {errors.role && (
              <p className="text-xs text-red-500 mt-1">{errors.role}</p>
            )}
          </div>

          {/* Daily wage */}
          <div>
            <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">
              Daily Wage (USD)
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-bold">
                $
              </span>
              <input
                type="number"
                min="0"
                step="0.01"
                value={form.dailyWage}
                onChange={(e) => set("dailyWage", e.target.value)}
                placeholder="0.00"
                className={`w-full pl-8 pr-4 py-2.5 rounded-lg border text-sm outline-none transition-colors ${
                  errors.dailyWage
                    ? "border-red-300 bg-red-50 focus:ring-2 focus:ring-red-100"
                    : "border-slate-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-50"
                }`}
              />
            </div>
            {errors.dailyWage && (
              <p className="text-xs text-red-500 mt-1">{errors.dailyWage}</p>
            )}
          </div>

          {/* Footer buttons */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 rounded-lg border border-slate-200 text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-2.5 rounded-lg bg-gradient-to-br from-blue-600 to-blue-700 text-white text-sm font-bold shadow-md shadow-blue-200 hover:scale-[1.02] transition-transform"
            >
              Add Employee
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// â”€â”€â”€ Sub-components â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

// ─── Edit Employee Modal ──────────────────────────────────────────────────────

interface EditEmployeeModalProps {
  employee: DirectoryEmployee;
  onClose: () => void;
  onSave: (emp: DirectoryEmployee) => void;
}

const EditEmployeeModal: React.FC<EditEmployeeModalProps> = ({ employee, onClose, onSave }) => {
  const [form, setForm] = useState<NewEmployeeForm>({
    name: employee.name,
    email: employee.email,
    department: employee.department,
    role: employee.role,
    dailyWage: String(employee.dailyWage),
    status: employee.status,
  });

  const set = (field: keyof NewEmployeeForm, value: string) =>
    setForm((f) => ({ ...f, [field]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...employee,
      name: form.name.trim(),
      email: form.email.trim(),
      department: form.department,
      departmentColor: DEPT_COLORS[form.department] ?? "bg-slate-100 text-slate-700",
      role: form.role.trim(),
      dailyWage: Number(form.dailyWage),
      status: form.status,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg">
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-amber-50 rounded-lg flex items-center justify-center text-amber-600">
              <span className="material-symbols-outlined">edit</span>
            </div>
            <div>
              <h3 className="font-bold text-slate-800">Edit Employee</h3>
              <p className="text-xs text-slate-500">{employee.name}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-lg text-slate-400 transition-colors">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>
        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
          {(["name", "email", "role"] as const).map((field) => (
            <div key={field}>
              <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">
                {field === "role" ? "Job Role" : field.charAt(0).toUpperCase() + field.slice(1)}
              </label>
              <input type={field === "email" ? "email" : "text"} value={form[field]} onChange={(e) => set(field, e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50" />
            </div>
          ))}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">Department</label>
              <select value={form.department} onChange={(e) => set("department", e.target.value)}
                className="w-full appearance-none px-4 py-2.5 rounded-lg border border-slate-200 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50 bg-white">
                {DEPARTMENTS.map((d) => <option key={d}>{d}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">Daily Wage ($)</label>
              <input type="number" min="0" value={form.dailyWage} onChange={(e) => set("dailyWage", e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50" />
            </div>
          </div>
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="flex-1 py-2.5 rounded-lg border border-slate-200 text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-colors">Cancel</button>
            <button type="submit" className="flex-1 py-2.5 rounded-lg bg-gradient-to-br from-amber-500 to-amber-600 text-white text-sm font-bold shadow-md shadow-amber-200 hover:scale-[1.02] transition-transform">Save Changes</button>
          </div>
        </form>
      </div>
    </div>
  );
};

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

const AnalyticsCards: React.FC<{ employees: DirectoryEmployee[] }> = ({
  employees,
}) => {
  const active = employees.filter((e) => e.status === "Active");
  const avgWage =
    active.length > 0
      ? active.reduce((s, e) => s + e.dailyWage, 0) / active.length
      : 0;

  return (
    <div className="mt-12 grid grid-cols-12 gap-6">
      <div className="col-span-12 md:col-span-4 bg-white p-6 rounded-xl shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">
            Headcount
          </span>
          <span className="material-symbols-outlined text-blue-600">group</span>
        </div>
        <h3 className="text-3xl font-extrabold text-slate-800">
          {employees.length}
        </h3>
        <p className="text-xs font-medium text-emerald-600 mt-2 flex items-center gap-1">
          <span className="material-symbols-outlined text-sm">trending_up</span>
          {active.length} active employees
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
        <h3 className="text-3xl font-extrabold text-slate-800">
          ${avgWage.toFixed(2)}
        </h3>
        <p className="text-xs font-medium text-slate-500 mt-2">
          Active employees only
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
          Next payroll cycle: Oct 30
        </p>
        <div className="mt-4 h-1 w-full bg-white/20 rounded-full overflow-hidden">
          <div className="h-full bg-white w-3/4 rounded-full" />
        </div>
      </div>
    </div>
  );
};

// â”€â”€â”€ Page â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

const EmployeeDirectoryPage: React.FC = () => {
  const [employees, setEmployees] = useState<DirectoryEmployee[]>(() => {
    try {
      const saved = localStorage.getItem("salarypro_employees");
      return saved ? (JSON.parse(saved) as DirectoryEmployee[]) : SEED_EMPLOYEES;
    } catch {
      return SEED_EMPLOYEES;
    }
  });
  const { copy, copiedKey } = useClipboard();
  const [search, setSearch] = useState("");
  const [deptFilter, setDeptFilter] = useState("All Departments");
  const [statusFilter, setStatusFilter] = useState("All Statuses");
  const [showModal, setShowModal] = useState(false);
  const [editEmployee, setEditEmployee] = useState<DirectoryEmployee | null>(null);
  const [profileEmployee, setProfileEmployee] = useState<DrawerEmployee | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [noteEmployee, setNoteEmployee] = useState<DirectoryEmployee | null>(null);

  const handleSaveEmployee = (emp: DirectoryEmployee) => {
    setEmployees((prev) => {
      const next = prev.map((e) => (e.id === emp.id ? emp : e));
      localStorage.setItem("salarypro_employees", JSON.stringify(next));
      return next;
    });
  };
  const [page, setPage] = useState(1);
  const [sortField, setSortField] = useState<"name" | "dailyWage" | "role" | null>(null);
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    mergeStoredEmployees(employees.map((e) => ({
      id: e.id,
      name: e.name,
      email: e.email,
      department: e.department,
      avatarUrl: e.avatarUrl,
      initials: e.initials,
      dailyRate: e.dailyWage,
      role: e.role,
      status: e.status,
    })));
  }, [employees]);

  useEffect(() => { setPage(1); }, [search, deptFilter, statusFilter]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "/" && document.activeElement?.tagName !== "INPUT" && document.activeElement?.tagName !== "TEXTAREA") {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  const toggleSort = (field: "name" | "dailyWage" | "role") => {
    if (sortField === field) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortDir("asc");
    }
    setPage(1);
  };

  const handleDeleteEmployee = (id: string) => {
    setEmployees((prev) => {
      const next = prev.filter((e) => e.id !== id);
      localStorage.setItem("salarypro_employees", JSON.stringify(next));
      return next;
    });
    setDeleteConfirm(null);
  };

  const handleBulkDelete = () => {
    setEmployees((prev) => {
      const next = prev.filter((e) => !selectedIds.has(e.id));
      localStorage.setItem("salarypro_employees", JSON.stringify(next));
      return next;
    });
    setSelectedIds(new Set());
  };

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };

  const someSelected = selectedIds.size > 0;

  const handleAddEmployee = (emp: DirectoryEmployee) => {
    setEmployees((prev) => {
      const next = [emp, ...prev];
      localStorage.setItem("salarypro_employees", JSON.stringify(next));
      return next;
    });
  };

  const filtered = employees.filter((emp) => {
    const q = search.toLowerCase();
    const searchMatch =
      !q ||
      emp.name.toLowerCase().includes(q) ||
      emp.email.toLowerCase().includes(q) ||
      emp.role.toLowerCase().includes(q);
    const deptMatch =
      deptFilter === "All Departments" || emp.department === deptFilter;
    const statusMatch =
      statusFilter === "All Statuses" || emp.status === statusFilter;
    return searchMatch && deptMatch && statusMatch;
  });

  const sorted = sortField
    ? [...filtered].sort((a, b) => {
        const v =
          sortField === "name" ? a.name.localeCompare(b.name) :
          sortField === "role" ? a.role.localeCompare(b.role) :
          a.dailyWage - b.dailyWage;
        return sortDir === "asc" ? v : -v;
      })
    : filtered;

  const totalPages = Math.max(1, Math.ceil(sorted.length / PER_PAGE));
  const paginated = sorted.slice((page - 1) * PER_PAGE, page * PER_PAGE);
  const allOnPageSelected = paginated.length > 0 && paginated.every((e) => selectedIds.has(e.id));

  return (
    <>
      {/* Employee Profile Drawer */}
      <EmployeeProfileDrawer
        employee={profileEmployee}
        onClose={() => setProfileEmployee(null)}
      />

      {/* Employee Notepad */}
      {noteEmployee && (
        <EmployeeNotepad
          employeeId={noteEmployee.id}
          employeeName={noteEmployee.name}
          onClose={() => setNoteEmployee(null)}
        />
      )}

      {/* Add Employee Modal */}
      {showModal && (
        <AddEmployeeModal
          onClose={() => setShowModal(false)}
          onAdd={handleAddEmployee}
        />
      )}
      {/* Edit Employee Modal */}
      {editEmployee && (
        <EditEmployeeModal
          employee={editEmployee}
          onClose={() => setEditEmployee(null)}
          onSave={handleSaveEmployee}
        />
      )}

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
        <div className="flex gap-3">
          <button
            onClick={() => exportEmployeesCSV(filtered.length > 0 ? filtered : employees)}
            className="bg-white border border-slate-200 text-slate-700 px-4 py-2.5 rounded-lg flex items-center gap-2 font-semibold hover:bg-slate-50 transition-colors shadow-sm"
          >
            <span className="material-symbols-outlined text-xl">download</span>
            Export CSV
          </button>
          <button
            onClick={() => setShowModal(true)}
            className="bg-gradient-to-br from-blue-600 to-blue-700 text-white px-5 py-2.5 rounded-lg flex items-center gap-2 font-semibold shadow-lg shadow-blue-200 hover:scale-[1.02] transition-transform"
          >
            <span className="material-symbols-outlined text-xl">add</span>
            Add Employee
          </button>
        </div>
      </div>

      {/* Filter bar */}
      <div className="bg-slate-100 rounded-xl p-4 mb-6 flex flex-wrap items-center gap-4">
        {/* Search */}
        <div className="relative flex-1 max-w-xs">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">search</span>
          <input
            ref={searchInputRef}
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder='Search name, email or role… (press "/" to focus)'
            className="w-full pl-9 pr-8 py-2 bg-white rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-100 border-none"
          />
          {search && (
            <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
              <span className="material-symbols-outlined text-sm">close</span>
            </button>
          )}
        </div>
        <div className="flex items-center gap-2 text-sm font-medium text-slate-500">
          <span className="material-symbols-outlined text-lg">filter_list</span>
          Filters:
          {(search || deptFilter !== "All Departments" || statusFilter !== "All Statuses") && (
            <span className="ml-1 px-1.5 py-0.5 text-[10px] font-bold bg-blue-600 text-white rounded-full">
              {[search, deptFilter !== "All Departments", statusFilter !== "All Statuses"].filter(Boolean).length}
            </span>
          )}
        </div>

        {/* Department filter chips */}
        <div className="flex flex-wrap gap-1.5">
          {["All Departments", ...DEPARTMENTS].map((d) => {
            const active = deptFilter === d;
            return (
              <button
                key={d}
                onClick={() => setDeptFilter(d)}
                className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
                  active
                    ? "bg-blue-600 text-white shadow-sm shadow-blue-200"
                    : "bg-white text-slate-600 hover:bg-slate-200"
                }`}
              >
                {d === "All Departments" ? "All" : d}
              </button>
            );
          })}
        </div>

        {/* Status filter */}
        <div className="relative">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="appearance-none bg-white border-none rounded-lg py-2 pl-4 pr-10 text-sm font-medium focus:ring-2 focus:ring-blue-100 cursor-pointer text-slate-800 outline-none"
          >
            {["All Statuses", ...STATUSES].map((s) => (
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
          {(["name", "role", "dailyWage"] as const).map((f) => {
            const labels = { name: "Name", role: "Role", dailyWage: "Wage" };
            const active = sortField === f;
            return (
              <button
                key={f}
                onClick={() => toggleSort(f)}
                className={`text-xs font-bold px-2.5 py-1 rounded-lg flex items-center gap-0.5 transition-colors ${
                  active ? "text-blue-600 bg-blue-50" : "text-slate-500 hover:text-slate-700 hover:bg-slate-200"
                }`}
              >
                {labels[f]}
                <span className="material-symbols-outlined text-xs">
                  {active ? (sortDir === "asc" ? "arrow_upward" : "arrow_downward") : "unfold_more"}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Bulk action bar */}
      {someSelected && (
        <div className="mb-4 px-4 py-3 bg-blue-600 text-white rounded-xl flex items-center gap-4 shadow-lg shadow-blue-200">
          <span className="text-sm font-bold">{selectedIds.size} employee{selectedIds.size > 1 ? "s" : ""} selected</span>
          <button
            onClick={handleBulkDelete}
            className="ml-auto px-4 py-1.5 bg-red-500 hover:bg-red-600 text-white text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5"
          >
            <span className="material-symbols-outlined text-sm">delete_sweep</span>
            Delete Selected
          </button>
          <button onClick={() => setSelectedIds(new Set())} className="px-4 py-1.5 bg-white/20 hover:bg-white/30 text-xs font-bold rounded-lg transition-colors">
            Clear
          </button>
        </div>
      )}

      {/* Table */}
      <div className="bg-white rounded-xl overflow-hidden shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50">
              {/* Checkbox col */}
              <th className="pl-6 pr-2 py-4 w-10">
                <input
                  type="checkbox"
                  checked={allOnPageSelected}
                  onChange={() => {
                    if (allOnPageSelected) {
                      setSelectedIds((prev) => {
                        const next = new Set(prev);
                        paginated.forEach((e) => next.delete(e.id));
                        return next;
                      });
                    } else {
                      setSelectedIds((prev) => {
                        const next = new Set(prev);
                        paginated.forEach((e) => next.add(e.id));
                        return next;
                      });
                    }
                  }}
                  className="w-4 h-4 accent-blue-600 cursor-pointer"
                />
              </th>
              {(["Employee Name", "Department", "Role", "Daily Wage", "Status", ""] as const).map((col) => {
                const field = col === "Employee Name" ? "name" : col === "Daily Wage" ? "dailyWage" : col === "Role" ? "role" : null;
                const isActive = sortField === field;
                return (
                  <th
                    key={col}
                    onClick={field ? () => toggleSort(field) : undefined}
                    className={`px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider ${field ? "cursor-pointer hover:text-blue-600 select-none" : ""} ${isActive ? "text-blue-600" : ""}`}
                  >
                    <span className="inline-flex items-center gap-1">
                      {col}
                      {field && (
                        <span className="material-symbols-outlined text-xs">
                          {isActive ? (sortDir === "asc" ? "arrow_upward" : "arrow_downward") : "unfold_more"}
                        </span>
                      )}
                    </span>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filtered.length === 0 ? (
              <tr>
                <td
                  colSpan={7}
                  className="px-6 py-12 text-center text-slate-400 text-sm"
                >
                  <span className="material-symbols-outlined text-3xl block mb-2">
                    search_off
                  </span>
                  No employees match the current filters.
                </td>
              </tr>
            ) : (
              paginated.map((emp) => (
                <tr
                  key={emp.id}
                  className={`hover:bg-slate-50/60 transition-colors group ${selectedIds.has(emp.id) ? "bg-blue-50/40" : ""}`}
                >
                  {/* Checkbox */}
                  <td className="pl-6 pr-2 py-4">
                    <input
                      type="checkbox"
                      checked={selectedIds.has(emp.id)}
                      onChange={() => toggleSelect(emp.id)}
                      className="w-4 h-4 accent-blue-600 cursor-pointer"
                    />
                  </td>
                  {/* Employee */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      {emp.avatarUrl ? (
                        <img
                          src={emp.avatarUrl}
                          alt={emp.name}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                      ) : (
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold ${emp.departmentColor}`}>
                          {emp.initials ?? emp.name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()}
                        </div>
                      )}
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
                    {deleteConfirm === emp.id ? (
                      <div className="flex items-center justify-end gap-1.5">
                        <button onClick={() => handleDeleteEmployee(emp.id)} className="px-2.5 py-1 text-xs font-bold text-white bg-red-500 hover:bg-red-600 rounded-lg transition-colors">Confirm</button>
                        <button onClick={() => setDeleteConfirm(null)} className="px-2.5 py-1 text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors">Cancel</button>
                      </div>
                    ) : (
                      <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => setProfileEmployee(emp)}
                          title="View profile"
                          className="p-2 hover:bg-blue-50 hover:text-blue-500 rounded-lg text-slate-400 transition-colors"
                        >
                          <span className="material-symbols-outlined">account_circle</span>
                        </button>
                        <button
                          onClick={() => copy(emp.email, emp.id)}
                          title={copiedKey === emp.id ? "Copied!" : "Copy email"}
                          className={`p-2 rounded-lg transition-colors ${copiedKey === emp.id ? "bg-emerald-50 text-emerald-500" : "hover:bg-slate-100 hover:text-blue-500 text-slate-400"}`}
                        >
                          <span className="material-symbols-outlined">
                            {copiedKey === emp.id ? "check" : "content_copy"}
                          </span>
                        </button>
                        <button
                          onClick={() => setNoteEmployee(emp)}
                          title="Add note"
                          className="p-2 hover:bg-amber-50 hover:text-amber-500 rounded-lg text-slate-400 transition-colors"
                        >
                          <span className="material-symbols-outlined">sticky_note_2</span>
                        </button>
                        <button onClick={() => setEditEmployee(emp)} className="p-2 hover:bg-amber-50 hover:text-amber-500 rounded-lg text-slate-400 transition-colors">
                          <span className="material-symbols-outlined">edit</span>
                        </button>
                        <button onClick={() => setDeleteConfirm(emp.id)} className="p-2 hover:bg-red-50 hover:text-red-500 rounded-lg text-slate-400 transition-colors">
                          <span className="material-symbols-outlined">delete</span>
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {/* Pagination footer */}
        <div className="px-6 py-4 bg-slate-50/30 flex justify-between items-center border-t border-slate-100">
          <p className="text-xs font-medium text-slate-500 italic">
            Showing {Math.min((page - 1) * PER_PAGE + 1, sorted.length)}–{Math.min(page * PER_PAGE, sorted.length)} of {sorted.length} employees
          </p>
          <div className="flex gap-1 items-center">
            <button
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
              className="px-3 py-1 text-sm font-bold text-slate-600 hover:text-blue-600 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={`w-8 h-8 rounded-lg text-xs font-bold transition-colors ${p === page ? "bg-blue-600 text-white" : "text-slate-600 hover:bg-slate-100"}`}
              >
                {p}
              </button>
            ))}
            <button
              disabled={page === totalPages}
              onClick={() => setPage((p) => p + 1)}
              className="px-3 py-1 text-sm font-bold text-slate-600 hover:text-blue-600 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Analytics cards */}
      <AnalyticsCards employees={employees} />
    </>
  );
};

export default EmployeeDirectoryPage;
