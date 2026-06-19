import React from "react";
import type { Employee, AttendanceStatus } from "./types";
import { AttendanceRow } from "./AttendanceRow";

interface AttendanceTableProps {
  employees: Employee[];
  onStatusChange: (id: string, status: AttendanceStatus) => void;
  onHoursChange: (id: string, hours: number) => void;
  onMarkAllPresent: () => void;
  onMarkAllAbsent: () => void;
  onDraftSave: () => void;
  onCommit: () => void;
}

export const AttendanceTable: React.FC<AttendanceTableProps> = ({
  employees,
  onStatusChange,
  onHoursChange,
  onMarkAllPresent,
  onMarkAllAbsent,
  onDraftSave,
  onCommit,
}) => (
  <div className="bg-white rounded-xl shadow-[0_10px_40px_rgba(42,52,57,0.06)] overflow-hidden hid">
    {/* Toolbar */}
    <div className="p-6 bg-slate-50/50 flex justify-between items-center">
      <div className="flex gap-4">
        <button
          onClick={onMarkAllPresent}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-bold flex items-center gap-2 hover:bg-blue-700 transition-colors"
        >
          <span className="material-symbols-outlined text-sm">done_all</span>
          Mark All Present
        </button>
        <button
          onClick={onMarkAllAbsent}
          className="px-4 py-2 bg-red-50 text-red-600 border border-red-100 rounded-lg text-sm font-bold flex items-center gap-2 hover:bg-red-100 transition-colors"
        >
          <span className="material-symbols-outlined text-sm">person_off</span>
          Mark All Absent
        </button>
        <button className="px-4 py-2 bg-slate-200 text-slate-800 rounded-lg text-sm font-bold flex items-center gap-2 hover:bg-slate-300 transition-colors">
          <span className="material-symbols-outlined text-sm">filter_list</span>
          Filter
        </button>
      </div>
      <div className="text-sm font-medium text-slate-500">
        Showing {employees.length} of 142 Employees
      </div>
    </div>

    {/* Table */}
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-slate-50/30">
            {[
              "Employee",
              "Department",
              "Status",
              "Hours Worked",
              "Daily Rate",
              "Total Payable",
            ].map((col, i) => (
              <th
                key={col}
                className={`px-${i === 0 || i === 5 ? "8" : "6"} py-4 text-xs font-bold uppercase tracking-wider text-slate-500 ${
                  i === 3 ? "text-center" : i >= 4 ? "text-right" : ""
                }`}
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {employees.map((emp) => (
            <AttendanceRow
              key={emp.id}
              employee={emp}
              onStatusChange={onStatusChange}
              onHoursChange={onHoursChange}
            />
          ))}
        </tbody>
      </table>
    </div>

    {/* Totals row */}
    <div className="px-8 py-4 bg-slate-50 border-t border-slate-200 grid grid-cols-4 gap-4 text-sm">
      <div>
        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Present</span>
        <p className="font-bold text-emerald-600 mt-0.5">{employees.filter((e) => e.status === "Present" || e.status === "Half-day").length}</p>
      </div>
      <div>
        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Absent / Leave</span>
        <p className="font-bold text-red-500 mt-0.5">{employees.filter((e) => e.status === "Absent" || e.status === "On Leave").length}</p>
      </div>
      <div>
        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Hours</span>
        <p className="font-bold text-slate-700 mt-0.5">{employees.reduce((s, e) => s + e.hoursWorked, 0)}h</p>
      </div>
      <div>
        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Est. Payout</span>
        <p className="font-bold text-blue-600 mt-0.5">
          ${employees.reduce((s, e) => s + (e.status === "Absent" || e.status === "On Leave" ? 0 : (e.hoursWorked / 8) * e.dailyRate), 0).toFixed(2)}
        </p>
      </div>
    </div>

    {/* Footer */}
    <div className="px-8 py-6 border-t border-slate-100 flex justify-between items-center bg-slate-50/10">
      <p className="text-sm text-slate-500">
        Records update automatically on blur.
      </p>
      <div className="flex gap-2">
        <button
          onClick={onDraftSave}
          className="px-6 py-2.5 bg-slate-200 font-bold text-slate-800 rounded-lg hover:bg-slate-300 transition-colors"
        >
          Draft Save
        </button>
        <button
          onClick={onCommit}
          className="px-8 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold rounded-lg shadow-lg shadow-blue-200 hover:scale-[1.02] transition-transform active:scale-95"
        >
          Commit Entries
        </button>
      </div>
    </div>
  </div>
);
