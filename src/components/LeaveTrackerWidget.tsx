import React from "react";

interface LeaveType {
  label: string;
  icon: string;
  color: string;
  bg: string;
  track: string;
  used: number;
  total: number;
}

const LEAVE_TYPES: LeaveType[] = [
  { label: "Annual Leave", icon: "beach_access", color: "text-blue-600", bg: "bg-blue-50", track: "bg-blue-500", used: 8, total: 20 },
  { label: "Sick Days", icon: "local_hospital", color: "text-red-500", bg: "bg-red-50", track: "bg-red-400", used: 2, total: 10 },
  { label: "Personal Days", icon: "self_improvement", color: "text-purple-600", bg: "bg-purple-50", track: "bg-purple-500", used: 1, total: 5 },
];

export const LeaveTrackerWidget: React.FC = () => (
  <div className="bg-white p-6 rounded-xl shadow-sm">
    <div className="flex items-center justify-between mb-5">
      <div>
        <h4 className="font-bold text-slate-800">Leave Balances</h4>
        <p className="text-xs text-slate-500 mt-0.5">Current cycle — Alex Thompson</p>
      </div>
      <button className="text-xs font-bold text-blue-600 hover:text-blue-700 transition-colors">
        Request Leave
      </button>
    </div>
    <div className="space-y-4">
      {LEAVE_TYPES.map((lt) => {
        const remaining = lt.total - lt.used;
        const pct = Math.round((lt.used / lt.total) * 100);
        return (
          <div key={lt.label}>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className={`w-7 h-7 ${lt.bg} rounded-lg flex items-center justify-center ${lt.color}`}>
                  <span className="material-symbols-outlined text-sm">{lt.icon}</span>
                </div>
                <span className="text-sm font-semibold text-slate-700">{lt.label}</span>
              </div>
              <span className="text-xs font-bold text-slate-600">
                {remaining}{" "}
                <span className="font-normal text-slate-400">/ {lt.total} days left</span>
              </span>
            </div>
            <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full ${lt.track} transition-all duration-500`}
                style={{ width: `${pct}%` }}
              />
            </div>
          </div>
        );
      })}
    </div>
  </div>
);
