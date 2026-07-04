import React from "react";

interface TopEarner {
  id: string;
  name: string;
  departmentColor: string;
  netPay: number;
  avatarUrl?: string;
  initials?: string;
}

const TOP_EARNERS: TopEarner[] = [
  {
    id: "1",
    name: "Marcus Chen",
    departmentColor: "bg-blue-100 text-blue-700",
    netPay: 8432,
    avatarUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCYGVAPvh6BIuk9IJq1VylviVSpQeL877-BFIqF3TxNsIrsJ8TC9ER79KyNRcA5Mk-WZTmBebvTsIr3l7c-wHvH7kkVCi8OLI8AjwItZ5-i4vBVTdsCWm6L9Gz_4ld74MaSHzvC-smGur7CdFEJfvactyoL4LwD-iUtay2_4t8O9DS9K6_1VI8S_c1ctLf4npEqlFKhzLJmrMQPHG_-YkvGhcVJsbWSAjzrrBQM7TKPAY0fKvN4gXZL7Hkukjz2m9xbAauC7aamMME",
  },
  {
    id: "2",
    name: "Sarah Jenkins",
    departmentColor: "bg-purple-100 text-purple-700",
    netPay: 7623,
    avatarUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDrms5ZEBNnbfK7FKAW_-4HL4XUBj7-QUMq8sDYUEl-qjbliqRU5rg2Ho4CmYr-Fg-N1aGpavjyzvuALm3jN9tzAoTCWeCGWpjoQN7KSVIXgslksl2iNE_qchJFCJGTcX5HB6VyBRClUGnJrfh9Tz-W1oeQdBxPkMBOPIWyLMozLbyMDkTWemVcRU9tRzhkoNsq6ktzXopfwEowy8hyPFeMzMQKH7gFcAVWLinjIBz5GGfP4Qrif1aqKO1YfaVOzFVF5kT1ITH0GCQ",
  },
  { id: "6", name: "Julian Wan", departmentColor: "bg-blue-100 text-blue-700", netPay: 6228, initials: "JW" },
  {
    id: "3",
    name: "David Okoro",
    departmentColor: "bg-blue-100 text-blue-700",
    netPay: 6179,
    avatarUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCfI2RZuBiZ9koaWo2Kp_s5jDumAEe76wkP0vaOiO2GxcbklMlpDp6H6cMcLCfOnag7bBTFno-6OX3jIzlWBxEGxvulPFienHzKAcTl5LULgydRzSgROIS2dwJbJB0HZcvMQ5zMa6tcShA6oq-PaON_ZH1yZKrWmL4PR12Rh7P4BBIw4Yb7TPXQ3KLj_DdPxQGFeCE8OfuXCTAvVoFgUtzaDKKydtLpO37W7Vx66n-86zKehbC9DgJ-P8RXQyvofT8kjOdss2WBGdc",
  },
  { id: "7", name: "Priya Nair", departmentColor: "bg-purple-100 text-purple-700", netPay: 5601, initials: "PN" },
];

const fmt = (n: number) =>
  n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

export const TopEarnersWidget: React.FC = () => {
  const max = TOP_EARNERS[0].netPay;

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h4 className="font-bold text-slate-800">Top Earners</h4>
          <p className="text-xs text-slate-500 mt-0.5">October 2026 — net pay</p>
        </div>
        <span className="material-symbols-outlined text-amber-500">emoji_events</span>
      </div>
      <div className="space-y-3">
        {TOP_EARNERS.map((emp, i) => (
          <div key={emp.id} className="flex items-center gap-3">
            <span
              className={`text-xs font-extrabold w-5 text-center ${i === 0 ? "text-amber-500" : "text-slate-400"}`}
            >
              {i + 1}
            </span>
            {emp.avatarUrl ? (
              <img src={emp.avatarUrl} alt={emp.name} className="w-8 h-8 rounded-full object-cover shrink-0" />
            ) : (
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 ${emp.departmentColor}`}
              >
                {emp.initials}
              </div>
            )}
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-slate-800 truncate">{emp.name}</p>
              <div className="h-1 bg-slate-100 rounded-full mt-1 overflow-hidden">
                <div
                  className={`h-full rounded-full ${i === 0 ? "bg-amber-400" : "bg-blue-400"} transition-all duration-500`}
                  style={{ width: `${(emp.netPay / max) * 100}%` }}
                />
              </div>
            </div>
            <span className="text-xs font-extrabold text-slate-700 shrink-0">{fmt(emp.netPay)}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
