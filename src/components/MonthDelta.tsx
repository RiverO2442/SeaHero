import React from "react";

interface MonthDeltaProps {
  current: number;
  previous: number;
  title?: string;
}

export const MonthDelta: React.FC<MonthDeltaProps> = ({ current, previous, title }) => {
  if (previous === 0) return null;
  const pct = ((current - previous) / previous) * 100;
  const up = pct >= 0;

  return (
    <span
      className={`inline-flex items-center gap-0.5 text-[11px] font-bold px-1.5 py-0.5 rounded-full ${
        up ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-500"
      }`}
      title={title ?? `vs previous period`}
    >
      <span className="material-symbols-outlined" style={{ fontSize: 11 }}>
        {up ? "arrow_upward" : "arrow_downward"}
      </span>
      {Math.abs(pct).toFixed(1)}% MoM
    </span>
  );
};
