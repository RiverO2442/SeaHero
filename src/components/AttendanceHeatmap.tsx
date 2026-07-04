import React, { useMemo } from "react";

type DayStatus = "present" | "absent" | "half" | "leave" | "weekend" | "future";

const STATUS_COLORS: Record<DayStatus, string> = {
  present: "bg-emerald-400",
  absent: "bg-red-400",
  half: "bg-amber-400",
  leave: "bg-blue-400",
  weekend: "bg-slate-100",
  future: "bg-slate-100",
};

const STATUS_LABELS: Record<DayStatus, string> = {
  present: "Present",
  absent: "Absent",
  half: "Half Day",
  leave: "On Leave",
  weekend: "Weekend",
  future: "Upcoming",
};

const SEED_MAP: Record<number, DayStatus> = {
  1: "present", 2: "present", 3: "weekend", 4: "weekend", 5: "present",
  6: "present", 7: "half", 8: "present", 9: "present", 10: "leave",
  11: "weekend", 12: "weekend", 13: "present", 14: "present", 15: "present",
  16: "absent", 17: "present", 18: "weekend", 19: "weekend", 20: "present",
  21: "present", 22: "present", 23: "present", 24: "present", 25: "weekend",
  26: "weekend", 27: "present", 28: "present", 29: "present", 30: "present",
  31: "present",
};

export const AttendanceHeatmap: React.FC = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  const monthLabel = today.toLocaleDateString("en-US", { month: "long", year: "numeric" });
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const data = useMemo(() => {
    return Array.from({ length: daysInMonth }, (_, i) => {
      const d = i + 1;
      const dow = new Date(year, month, d).getDay();
      const isWeekend = dow === 0 || dow === 6;
      const isFuture = new Date(year, month, d) > today;
      let status: DayStatus;
      if (isWeekend) status = "weekend";
      else if (isFuture) status = "future";
      else status = SEED_MAP[d] ?? "present";
      return { date: d, status };
    });
  }, [year, month, daysInMonth]);

  const firstDow = new Date(year, month, 1).getDay();
  const offset = firstDow === 0 ? 6 : firstDow - 1;
  const cells: Array<{ date: number | null; status: DayStatus | null }> = [
    ...Array.from({ length: offset }, () => ({ date: null, status: null })),
    ...data,
  ];
  while (cells.length % 7 !== 0) cells.push({ date: null, status: null });

  const presentCount = data.filter((d) => d.status === "present").length;
  const absentCount = data.filter((d) => d.status === "absent").length;

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h4 className="font-bold text-slate-800">Attendance Heatmap</h4>
          <p className="text-xs text-slate-500 mt-0.5">{monthLabel}</p>
        </div>
        <div className="flex items-center gap-4 text-xs text-slate-500">
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-sm bg-emerald-400 inline-block" /> {presentCount} present
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-sm bg-red-400 inline-block" /> {absentCount} absent
          </span>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-1">
        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
          <div key={d} className="text-[9px] font-bold text-slate-400 text-center uppercase">{d}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {cells.map((cell, i) => (
          <div
            key={i}
            title={cell.date && cell.status ? `${cell.date}: ${STATUS_LABELS[cell.status]}` : undefined}
            className={`aspect-square rounded-sm relative ${cell.status ? STATUS_COLORS[cell.status] : "bg-transparent"}`}
          >
            {cell.date && (
              <span className="absolute inset-0 flex items-center justify-center text-[8px] font-bold text-white/90">
                {cell.date}
              </span>
            )}
          </div>
        ))}
      </div>

      <div className="flex items-center gap-4 mt-4 flex-wrap">
        {(["present", "absent", "half", "leave"] as DayStatus[]).map((s) => (
          <span key={s} className="flex items-center gap-1 text-[10px] text-slate-500">
            <span className={`w-2.5 h-2.5 rounded-sm ${STATUS_COLORS[s]} inline-block`} />
            {STATUS_LABELS[s]}
          </span>
        ))}
      </div>
    </div>
  );
};
