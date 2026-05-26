import React from "react";
import type { Employee, AttendanceStatus } from "./types";

interface AttendanceRowProps {
  employee: Employee;
  onStatusChange: (id: string, status: AttendanceStatus) => void;
  onHoursChange: (id: string, hours: number) => void;
}

const STATUS_OPTIONS: AttendanceStatus[] = [
  "Present",
  "Half-day",
  "Absent",
  "On Leave",
];

const ROW_BG: Record<AttendanceStatus, string> = {
  Present: "hover:bg-emerald-50/60",
  "Half-day": "bg-amber-50/20 hover:bg-amber-50/50",
  Absent: "bg-red-50/30 hover:bg-red-50/60",
  "On Leave": "bg-slate-50/60 hover:bg-slate-100/60",
};

export const AttendanceRow: React.FC<AttendanceRowProps> = ({
  employee,
  onStatusChange,
  onHoursChange,
}) => {
  const isAbsent = employee.status === "Absent";
  const totalPayable = isAbsent ? 0 : employee.hoursWorked * employee.dailyRate;

  const selectClass = isAbsent
    ? "bg-red-50 border border-red-200 text-red-600 text-sm font-bold rounded-lg px-3 py-1.5 outline-none focus:ring-4 focus:ring-red-100 transition-all"
    : "bg-white border border-slate-200 text-sm font-medium rounded-lg px-3 py-1.5 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all";

  return (
    <tr className={`group transition-colors ${ROW_BG[employee.status]}`}>
      {/* Employee */}
      <td className="px-8 py-5">
        <div className="flex items-center gap-3">
          {employee.avatarUrl ? (
            <img
              src={employee.avatarUrl}
              alt={employee.name}
              className="w-10 h-10 rounded-full object-cover"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-700 font-bold text-sm">
              {employee.initials}
            </div>
          )}
          <div>
            <p className="font-bold text-slate-800">{employee.name}</p>
            <p className="text-xs text-slate-500">{employee.email}</p>
          </div>
        </div>
      </td>

      {/* Department */}
      <td className="px-6 py-5">
        <span className="text-sm font-medium text-slate-600">
          {employee.department}
        </span>
      </td>

      {/* Status */}
      <td className="px-6 py-5">
        <select
          value={employee.status}
          onChange={(e) =>
            onStatusChange(employee.id, e.target.value as AttendanceStatus)
          }
          className={selectClass}
        >
          {STATUS_OPTIONS.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </td>

      {/* Hours Worked */}
      <td className="px-6 py-5 text-center">
        <input
          type="number"
          value={employee.hoursWorked}
          disabled={isAbsent}
          onChange={(e) => onHoursChange(employee.id, Number(e.target.value))}
          className={`w-20 text-center bg-white border border-slate-200 rounded-lg py-1.5 font-bold focus:ring-2 focus:ring-blue-500 outline-none transition-all ${
            isAbsent ? "opacity-50 cursor-not-allowed" : ""
          }`}
        />
      </td>

      {/* Daily Rate */}
      <td className="px-6 py-5 text-right font-medium text-slate-500">
        ${employee.dailyRate.toFixed(2)}
      </td>

      {/* Total Payable */}
      <td
        className={`px-8 py-5 text-right font-bold ${isAbsent ? "text-slate-400" : "text-blue-600"}`}
      >
        ${totalPayable.toFixed(2)}
      </td>
    </tr>
  );
};
