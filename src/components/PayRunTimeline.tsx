import React from "react";

export interface PayRun {
  id: string;
  period: string;
  releasedDate: string;
  totalAmount: string;
  employees: number;
  status: "Completed" | "Processing" | "Scheduled";
}

const STATUS_META: Record<PayRun["status"], { icon: string; color: string; bg: string }> = {
  Completed: { icon: "check_circle", color: "text-emerald-600", bg: "bg-emerald-50" },
  Processing: { icon: "autorenew", color: "text-blue-600", bg: "bg-blue-50" },
  Scheduled: { icon: "schedule", color: "text-amber-600", bg: "bg-amber-50" },
};

interface PayRunTimelineProps {
  runs: PayRun[];
}

export const PayRunTimeline: React.FC<PayRunTimelineProps> = ({ runs }) => (
  <div className="bg-white rounded-xl shadow-sm p-6">
    <h4 className="font-bold text-slate-800 mb-1">Pay Run Timeline</h4>
    <p className="text-xs text-slate-500 mb-6">Recent payroll cycle history</p>
    <div className="relative">
      <div className="absolute left-4 top-2 bottom-2 w-px bg-slate-100" />
      <div className="space-y-6">
        {runs.map((run) => {
          const s = STATUS_META[run.status];
          return (
            <div key={run.id} className="flex gap-5 items-start relative">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${s.bg} relative z-10`}>
                <span className={`material-symbols-outlined text-sm ${s.color}`}>{s.icon}</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start gap-2">
                  <div>
                    <p className="text-sm font-bold text-slate-800">{run.period}</p>
                    <p className="text-xs text-slate-500">{run.employees} employees · {run.releasedDate}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-sm font-extrabold text-slate-800">{run.totalAmount}</p>
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${s.bg} ${s.color}`}>
                      {run.status}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  </div>
);
