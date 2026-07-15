import React, { useState } from "react";

type ShiftType = "Morning" | "Afternoon" | "Night" | "Off";

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const EMPLOYEES = [
  "Julian Wan",
  "Sasha Ho",
  "Michael Kholin",
  "David Smith",
  "Emma Lawson",
];

const SHIFT_STYLES: Record<ShiftType, { bg: string; text: string; label: string }> = {
  Morning:   { bg: "bg-amber-100",   text: "text-amber-700",   label: "AM" },
  Afternoon: { bg: "bg-blue-100",    text: "text-blue-700",    label: "PM" },
  Night:     { bg: "bg-indigo-100",  text: "text-indigo-700",  label: "N" },
  Off:       { bg: "bg-slate-100",   text: "text-slate-400",   label: "—" },
};

const CYCLE: ShiftType[] = ["Morning", "Afternoon", "Night", "Off"];

type Grid = Record<string, Record<string, ShiftType>>;

function buildInitialGrid(): Grid {
  const g: Grid = {};
  EMPLOYEES.forEach((emp, ei) => {
    g[emp] = {};
    DAYS.forEach((day, di) => {
      const idx = (ei + di) % CYCLE.length;
      g[emp][day] = CYCLE[idx];
    });
  });
  return g;
}

export const ShiftScheduleGrid: React.FC = () => {
  const [grid, setGrid] = useState<Grid>(buildInitialGrid);

  const cycle = (emp: string, day: string) => {
    setGrid((prev) => {
      const cur = prev[emp][day];
      const nextIdx = (CYCLE.indexOf(cur) + 1) % CYCLE.length;
      return { ...prev, [emp]: { ...prev[emp], [day]: CYCLE[nextIdx] } };
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
        <div>
          <h4 className="font-bold text-slate-800 text-sm">Weekly Shift Schedule</h4>
          <p className="text-xs text-slate-400">Click a cell to cycle shift — AM / PM / Night / Off</p>
        </div>
        <div className="flex gap-3 text-[10px] font-bold">
          {(["Morning", "Afternoon", "Night", "Off"] as ShiftType[]).map((s) => {
            const st = SHIFT_STYLES[s];
            return (
              <span key={s} className={`px-2 py-1 rounded ${st.bg} ${st.text}`}>{s}</span>
            );
          })}
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr className="bg-slate-50">
              <th className="px-4 py-3 text-left font-bold text-slate-500 uppercase tracking-wider w-36">Employee</th>
              {DAYS.map((d) => (
                <th key={d} className="px-2 py-3 text-center font-bold text-slate-500 uppercase tracking-wider">{d}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {EMPLOYEES.map((emp) => (
              <tr key={emp} className="hover:bg-slate-50/40 transition-colors">
                <td className="px-4 py-3 font-semibold text-slate-700 whitespace-nowrap">{emp}</td>
                {DAYS.map((day) => {
                  const shift = grid[emp][day];
                  const st = SHIFT_STYLES[shift];
                  return (
                    <td key={day} className="px-2 py-2 text-center">
                      <button
                        onClick={() => cycle(emp, day)}
                        className={`w-10 h-8 rounded-lg font-bold text-[11px] transition-colors cursor-pointer ${st.bg} ${st.text} hover:opacity-80`}
                        title={shift}
                      >
                        {st.label}
                      </button>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
