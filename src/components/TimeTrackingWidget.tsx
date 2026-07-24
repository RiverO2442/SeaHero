import React, { useState, useEffect, useRef } from "react";

interface TimeEntry {
  id: string;
  label: string;
  start: string;
  end: string;
  hours: number;
}

const SEED_ENTRIES: TimeEntry[] = [
  { id: "1", label: "Morning standup",    start: "09:00", end: "09:30", hours: 0.5 },
  { id: "2", label: "Feature development",start: "09:30", end: "12:30", hours: 3 },
  { id: "3", label: "Lunch / break",      start: "12:30", end: "13:30", hours: 1 },
  { id: "4", label: "Code review",        start: "13:30", end: "15:00", hours: 1.5 },
];

function fmt(seconds: number) {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

export const TimeTrackingWidget: React.FC = () => {
  const [entries, setEntries] = useState<TimeEntry[]>(SEED_ENTRIES);
  const [running, setRunning] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [label, setLabel] = useState("");
  const startRef = useRef<number | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (running) {
      startRef.current = Date.now() - elapsed * 1000;
      timerRef.current = setInterval(() => {
        setElapsed(Math.floor((Date.now() - startRef.current!) / 1000));
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [running]);

  const handleStop = () => {
    setRunning(false);
    if (elapsed > 0) {
      const hours = +(elapsed / 3600).toFixed(2);
      const now = new Date();
      const endStr = `${String(now.getHours()).padStart(2,"0")}:${String(now.getMinutes()).padStart(2,"0")}`;
      const startDate = new Date(now.getTime() - elapsed * 1000);
      const startStr = `${String(startDate.getHours()).padStart(2,"0")}:${String(startDate.getMinutes()).padStart(2,"0")}`;
      setEntries((prev) => [{
        id: String(Date.now()),
        label: label || "Tracked session",
        start: startStr,
        end: endStr,
        hours,
      }, ...prev]);
    }
    setElapsed(0);
    setLabel("");
  };

  const totalHours = entries.reduce((s, e) => s + e.hours, 0);

  return (
    <div className="bg-white rounded-xl shadow-sm p-5">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-blue-500">timer</span>
          <h4 className="font-bold text-slate-800 text-sm">Time Tracker</h4>
        </div>
        <span className="text-xs font-bold text-slate-400">{totalHours.toFixed(1)}h logged today</span>
      </div>

      {/* Timer display */}
      <div className={`rounded-xl p-4 mb-4 text-center ${running ? "bg-blue-50" : "bg-slate-50"}`}>
        <p className={`text-4xl font-mono font-extrabold tabular-nums ${running ? "text-blue-600" : "text-slate-700"}`}>
          {fmt(elapsed)}
        </p>
        {running && <p className="text-xs text-blue-400 mt-1 animate-pulse">Recording…</p>}
      </div>

      {/* Label input */}
      <input
        type="text"
        value={label}
        onChange={(e) => setLabel(e.target.value)}
        placeholder="What are you working on?"
        disabled={running}
        className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50 mb-3 disabled:bg-slate-50 disabled:text-slate-400"
      />

      {/* Controls */}
      <div className="flex gap-2 mb-5">
        {!running ? (
          <button
            onClick={() => setRunning(true)}
            className="flex-1 py-2 bg-gradient-to-br from-blue-600 to-blue-700 text-white text-xs font-bold rounded-lg shadow-md shadow-blue-200 flex items-center justify-center gap-1.5 hover:scale-[1.02] transition-transform"
          >
            <span className="material-symbols-outlined text-sm">play_arrow</span> Start
          </button>
        ) : (
          <button
            onClick={handleStop}
            className="flex-1 py-2 bg-red-500 hover:bg-red-600 text-white text-xs font-bold rounded-lg flex items-center justify-center gap-1.5 transition-colors"
          >
            <span className="material-symbols-outlined text-sm">stop</span> Stop & Save
          </button>
        )}
        <button
          onClick={() => { setRunning(false); setElapsed(0); setLabel(""); }}
          className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-bold rounded-lg transition-colors"
        >
          Reset
        </button>
      </div>

      {/* Log */}
      <div className="space-y-2">
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Today's Log</p>
        {entries.slice(0, 6).map((e) => (
          <div key={e.id} className="flex items-center gap-2 text-xs">
            <span className="text-slate-400 tabular-nums w-24 shrink-0">{e.start} – {e.end}</span>
            <span className="flex-1 text-slate-600 truncate">{e.label}</span>
            <span className="font-bold text-slate-700 shrink-0">{e.hours.toFixed(1)}h</span>
          </div>
        ))}
      </div>
    </div>
  );
};
