import React from "react";

const HOLIDAYS = [
  { date: "2026-07-24", name: "Summer Bank Holiday (Scotland)" },
  { date: "2026-08-31", name: "Summer Bank Holiday (UK)" },
  { date: "2026-12-25", name: "Christmas Day" },
  { date: "2026-12-26", name: "Boxing Day" },
  { date: "2027-01-01", name: "New Year's Day" },
];

function daysUntil(dateStr: string): number {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const target = new Date(dateStr);
  return Math.ceil((target.getTime() - today.getTime()) / 86400000);
}

function fmtDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-GB", { day: "numeric", month: "short" });
}

export const HolidayCalendarWidget: React.FC = () => {
  const upcoming = HOLIDAYS.filter((h) => daysUntil(h.date) >= 0).slice(0, 4);

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h4 className="font-bold text-slate-800 text-sm">Public Holidays</h4>
          <p className="text-xs text-slate-400">Upcoming bank holidays</p>
        </div>
        <span className="material-symbols-outlined text-blue-500">event</span>
      </div>
      <div className="space-y-3">
        {upcoming.map((h) => {
          const days = daysUntil(h.date);
          const soon = days <= 30;
          return (
            <div key={h.date} className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-lg flex flex-col items-center justify-center text-[10px] font-bold leading-tight ${soon ? "bg-blue-50 text-blue-600" : "bg-slate-50 text-slate-500"}`}>
                <span>{fmtDate(h.date).split(" ")[0]}</span>
                <span>{fmtDate(h.date).split(" ")[1]}</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-slate-700 truncate">{h.name}</p>
                <p className={`text-[10px] font-bold ${days === 0 ? "text-green-500" : soon ? "text-amber-500" : "text-slate-400"}`}>
                  {days === 0 ? "Today!" : `${days}d away`}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
