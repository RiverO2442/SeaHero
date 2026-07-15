import React from "react";

const DATA = [
  { month: "Jan", count: 1180 },
  { month: "Feb", count: 1195 },
  { month: "Mar", count: 1204 },
  { month: "Apr", count: 1218 },
  { month: "May", count: 1210 },
  { month: "Jun", count: 1229 },
  { month: "Jul", count: 1241 },
  { month: "Aug", count: 1248 },
  { month: "Sep", count: 1252 },
  { month: "Oct", count: 1261 },
];

const W = 600;
const H = 140;
const PAD = { t: 10, r: 10, b: 30, l: 40 };
const cw = W - PAD.l - PAD.r;
const ch = H - PAD.t - PAD.b;
const minCount = Math.min(...DATA.map((d) => d.count)) - 20;
const maxCount = Math.max(...DATA.map((d) => d.count)) + 10;

function x(i: number) {
  return PAD.l + (i / (DATA.length - 1)) * cw;
}
function y(count: number) {
  return PAD.t + ch - ((count - minCount) / (maxCount - minCount)) * ch;
}

const linePath = DATA.map((d, i) => `${i === 0 ? "M" : "L"}${x(i)},${y(d.count)}`).join(" ");
const areaPath = `${linePath} L${x(DATA.length - 1)},${PAD.t + ch} L${x(0)},${PAD.t + ch} Z`;

const latest = DATA[DATA.length - 1].count;
const prev = DATA[DATA.length - 2].count;
const delta = latest - prev;

export const HeadcountTrendChart: React.FC = () => (
  <div className="bg-white rounded-xl shadow-sm p-6">
    <div className="flex items-center justify-between mb-4">
      <div>
        <h4 className="font-bold text-slate-800 text-sm">Headcount Trend</h4>
        <p className="text-xs text-slate-400">Total employees — last 10 months</p>
      </div>
      <div className="text-right">
        <p className="text-lg font-extrabold text-slate-800 tabular-nums">{latest.toLocaleString()}</p>
        <p className={`text-[10px] font-bold ${delta >= 0 ? "text-green-500" : "text-red-500"}`}>
          {delta >= 0 ? "▲" : "▼"} {Math.abs(delta)} vs last mo
        </p>
      </div>
    </div>
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ height: 120 }}>
      <defs>
        <linearGradient id="headcountGrad" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#2563eb" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#2563eb" stopOpacity="0" />
        </linearGradient>
      </defs>
      {[0, 1, 2].map((tick) => {
        const val = Math.round(minCount + ((maxCount - minCount) * tick) / 2);
        const yTick = y(val);
        return (
          <g key={tick}>
            <line x1={PAD.l} x2={W - PAD.r} y1={yTick} y2={yTick} stroke="#f1f5f9" strokeWidth="1" />
            <text x={PAD.l - 4} y={yTick + 3} textAnchor="end" fontSize="9" fill="#94a3b8">{val.toLocaleString()}</text>
          </g>
        );
      })}
      <path d={areaPath} fill="url(#headcountGrad)" />
      <path d={linePath} fill="none" stroke="#2563eb" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      {DATA.map((d, i) => (
        <circle key={d.month} cx={x(i)} cy={y(d.count)} r="3" fill="#2563eb" />
      ))}
      {DATA.map((d, i) => (
        <text key={d.month + "l"} x={x(i)} y={H - 6} textAnchor="middle" fontSize="9" fill="#94a3b8">{d.month}</text>
      ))}
    </svg>
  </div>
);
