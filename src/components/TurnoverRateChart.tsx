import React from "react";

const DATA = [
  { month: "Jan", rate: 2.1 },
  { month: "Feb", rate: 1.8 },
  { month: "Mar", rate: 2.4 },
  { month: "Apr", rate: 3.1 },
  { month: "May", rate: 2.7 },
  { month: "Jun", rate: 1.9 },
  { month: "Jul", rate: 2.2 },
  { month: "Aug", rate: 2.8 },
  { month: "Sep", rate: 3.4 },
  { month: "Oct", rate: 2.6 },
];

const W = 600;
const H = 140;
const PAD = { t: 10, r: 10, b: 30, l: 34 };
const cw = W - PAD.l - PAD.r;
const ch = H - PAD.t - PAD.b;
const maxRate = Math.max(...DATA.map((d) => d.rate));

function x(i: number) {
  return PAD.l + (i / (DATA.length - 1)) * cw;
}
function y(rate: number) {
  return PAD.t + ch - (rate / (maxRate * 1.2)) * ch;
}

const linePath = DATA.map((d, i) => `${i === 0 ? "M" : "L"}${x(i)},${y(d.rate)}`).join(" ");
const areaPath = `${linePath} L${x(DATA.length - 1)},${PAD.t + ch} L${x(0)},${PAD.t + ch} Z`;

const latestRate = DATA[DATA.length - 1].rate;
const prevRate = DATA[DATA.length - 2].rate;
const delta = latestRate - prevRate;

export const TurnoverRateChart: React.FC = () => (
  <div className="bg-white rounded-xl shadow-sm p-6">
    <div className="flex items-center justify-between mb-4">
      <div>
        <h4 className="font-bold text-slate-800 text-sm">Employee Turnover Rate</h4>
        <p className="text-xs text-slate-400">Monthly % — last 10 months</p>
      </div>
      <div className="text-right">
        <p className="text-lg font-extrabold text-slate-800 tabular-nums">{latestRate}%</p>
        <p className={`text-[10px] font-bold ${delta > 0 ? "text-red-500" : "text-green-500"}`}>
          {delta > 0 ? "▲" : "▼"} {Math.abs(delta).toFixed(1)}% vs last mo
        </p>
      </div>
    </div>
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ height: 120 }}>
      <defs>
        <linearGradient id="turnoverGrad" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#e11d48" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#e11d48" stopOpacity="0" />
        </linearGradient>
      </defs>
      {[1, 2, 3].map((tick) => {
        const yTick = y((maxRate * 1.2 * tick) / 3);
        const val = ((maxRate * 1.2 * tick) / 3).toFixed(1);
        return (
          <g key={tick}>
            <line x1={PAD.l} x2={W - PAD.r} y1={yTick} y2={yTick} stroke="#f1f5f9" strokeWidth="1" />
            <text x={PAD.l - 4} y={yTick + 3} textAnchor="end" fontSize="9" fill="#94a3b8">{val}%</text>
          </g>
        );
      })}
      <path d={areaPath} fill="url(#turnoverGrad)" />
      <path d={linePath} fill="none" stroke="#e11d48" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      {DATA.map((d, i) => (
        <circle key={d.month} cx={x(i)} cy={y(d.rate)} r="3" fill="#e11d48" />
      ))}
      {DATA.map((d, i) => (
        <text key={d.month + "l"} x={x(i)} y={H - 6} textAnchor="middle" fontSize="9" fill="#94a3b8">{d.month}</text>
      ))}
    </svg>
  </div>
);
