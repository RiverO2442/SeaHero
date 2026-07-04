import React from "react";

export interface DrawerEmployee {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  initials?: string;
  department: string;
  departmentColor: string;
  role: string;
  dailyWage: number;
  status: "Active" | "Inactive";
}

interface EmployeeProfileDrawerProps {
  employee: DrawerEmployee | null;
  onClose: () => void;
}

const fmt = (n: number) =>
  n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

export const EmployeeProfileDrawer: React.FC<EmployeeProfileDrawerProps> = ({
  employee,
  onClose,
}) => {
  if (!employee) return null;

  const monthlyEst = employee.dailyWage * 22;
  const annualEst = employee.dailyWage * 260;

  return (
    <>
      <div
        className="fixed inset-0 bg-slate-900/30 backdrop-blur-sm z-40"
        onClick={onClose}
      />
      <div className="fixed top-0 right-0 h-full w-96 bg-white z-50 shadow-2xl flex flex-col overflow-y-auto">
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100">
          <h3 className="font-bold text-slate-800">Employee Profile</h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-lg text-slate-400 transition-colors"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <div className="flex flex-col items-center pt-8 pb-6 px-6 border-b border-slate-100">
          {employee.avatarUrl ? (
            <img
              src={employee.avatarUrl}
              alt={employee.name}
              className="w-24 h-24 rounded-full object-cover shadow-lg"
            />
          ) : (
            <div
              className={`w-24 h-24 rounded-full flex items-center justify-center text-2xl font-bold shadow-lg ${employee.departmentColor}`}
            >
              {employee.initials ??
                employee.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .slice(0, 2)
                  .toUpperCase()}
            </div>
          )}
          <h4 className="mt-4 font-extrabold text-xl text-slate-800">{employee.name}</h4>
          <p className="text-sm text-slate-500 mt-0.5">{employee.role}</p>
          <span
            className={`mt-2 inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${employee.departmentColor}`}
          >
            {employee.department}
          </span>
        </div>

        <div className="px-6 py-5 border-b border-slate-100 space-y-3">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Contact</p>
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-slate-400 text-base">mail</span>
            <span className="text-sm text-slate-700">{employee.email}</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-slate-400 text-base">
              {employee.status === "Active" ? "check_circle" : "cancel"}
            </span>
            <span
              className={`text-sm font-semibold ${employee.status === "Active" ? "text-emerald-600" : "text-slate-500"}`}
            >
              {employee.status}
            </span>
          </div>
        </div>

        <div className="px-6 py-5">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">
            Compensation
          </p>
          <div className="space-y-3">
            {[
              { label: "Daily Rate", value: fmt(employee.dailyWage), color: "text-slate-800" },
              { label: "Est. Monthly", value: fmt(monthlyEst), color: "text-blue-600" },
              { label: "Est. Annual", value: fmt(annualEst), color: "text-purple-600" },
            ].map((row) => (
              <div
                key={row.label}
                className="flex justify-between items-center py-2 border-b border-slate-100 last:border-0"
              >
                <span className="text-sm text-slate-500">{row.label}</span>
                <span className={`text-sm font-extrabold ${row.color}`}>{row.value}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="px-6 pb-8 mt-auto flex gap-3">
          <button
            onClick={() => navigator.clipboard.writeText(employee.email)}
            className="flex-1 py-2.5 bg-slate-100 text-slate-700 text-xs font-bold rounded-xl hover:bg-slate-200 transition-colors flex items-center justify-center gap-1.5"
          >
            <span className="material-symbols-outlined text-sm">content_copy</span>
            Copy Email
          </button>
          <button className="flex-1 py-2.5 bg-gradient-to-br from-blue-600 to-blue-700 text-white text-xs font-bold rounded-xl shadow-md shadow-blue-200 hover:scale-[1.02] transition-transform flex items-center justify-center gap-1.5">
            <span className="material-symbols-outlined text-sm">edit</span>
            Edit Profile
          </button>
        </div>
      </div>
    </>
  );
};
