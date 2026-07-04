import React, { useState, useRef, useEffect } from "react";

export interface DateRange {
  from: string;
  to: string;
}

interface DateRangePickerProps {
  value: DateRange;
  onChange: (range: DateRange) => void;
}

const PRESETS = [
  { label: "This Month", from: "2026-10-01", to: "2026-10-31" },
  { label: "Last Month", from: "2026-09-01", to: "2026-09-30" },
  { label: "Last 3 Months", from: "2026-08-01", to: "2026-10-31" },
  { label: "This Year", from: "2026-01-01", to: "2026-12-31" },
];

function fmtDate(d: string): string {
  try {
    return new Date(d).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
  } catch {
    return d;
  }
}

export const DateRangePicker: React.FC<DateRangePickerProps> = ({ value, onChange }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors shadow-sm"
      >
        <span className="material-symbols-outlined text-base text-slate-400">date_range</span>
        {fmtDate(value.from)} — {fmtDate(value.to)}
        <span className="material-symbols-outlined text-slate-400 text-sm">expand_more</span>
      </button>

      {open && (
        <div className="absolute top-full mt-1 right-0 w-72 bg-white rounded-xl border border-slate-200 shadow-xl z-20 p-4 space-y-3">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Quick Select</p>
          <div className="grid grid-cols-2 gap-1.5">
            {PRESETS.map((p) => (
              <button
                key={p.label}
                onClick={() => { onChange({ from: p.from, to: p.to }); setOpen(false); }}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold text-left transition-colors ${
                  value.from === p.from && value.to === p.to
                    ? "bg-blue-600 text-white"
                    : "bg-slate-50 text-slate-600 hover:bg-slate-100"
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
          <div className="border-t border-slate-100 pt-3 space-y-2">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Custom Range</p>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[10px] font-bold text-slate-400 mb-1">FROM</label>
                <input
                  type="date"
                  value={value.from}
                  onChange={(e) => onChange({ ...value, from: e.target.value })}
                  className="w-full px-2 py-1.5 border border-slate-200 rounded-lg text-xs outline-none focus:border-blue-400"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-400 mb-1">TO</label>
                <input
                  type="date"
                  value={value.to}
                  onChange={(e) => onChange({ ...value, to: e.target.value })}
                  className="w-full px-2 py-1.5 border border-slate-200 rounded-lg text-xs outline-none focus:border-blue-400"
                />
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="w-full py-2 bg-blue-600 text-white text-xs font-bold rounded-lg hover:bg-blue-700 transition-colors"
            >
              Apply Range
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
