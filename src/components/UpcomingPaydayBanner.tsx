import React, { useState } from "react";

interface UpcomingPaydayBannerProps {
  paydayDate?: Date;
}

function daysUntil(target: Date): number {
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const t = new Date(target);
  t.setHours(0, 0, 0, 0);
  return Math.max(0, Math.round((t.getTime() - now.getTime()) / 86400000));
}

export const UpcomingPaydayBanner: React.FC<UpcomingPaydayBannerProps> = ({
  paydayDate,
}) => {
  const [dismissed, setDismissed] = useState(false);

  const target = paydayDate ?? (() => {
    const d = new Date();
    d.setDate(28);
    if (d < new Date()) d.setMonth(d.getMonth() + 1);
    return d;
  })();

  const days = daysUntil(target);
  const dateStr = target.toLocaleDateString("en-US", { month: "long", day: "numeric" });

  if (dismissed || days > 14) return null;

  const urgent = days <= 2;

  return (
    <div
      className={`flex items-center gap-4 px-5 py-3 rounded-xl text-sm font-semibold ${
        urgent
          ? "bg-red-50 border border-red-100 text-red-700"
          : "bg-blue-50 border border-blue-100 text-blue-700"
      }`}
    >
      <span className={`material-symbols-outlined text-xl ${urgent ? "text-red-500" : "text-blue-500"}`}>
        payments
      </span>
      <span className="flex-1">
        {days === 0
          ? "Payday is today! Make sure all payroll batches are released."
          : days === 1
          ? "Payday is tomorrow — review and approve any pending payroll."
          : `Payday in ${days} days (${dateStr}) — ${urgent ? "action needed" : "plan ahead"}.`}
      </span>
      <button
        onClick={() => setDismissed(true)}
        className="opacity-60 hover:opacity-100 transition-opacity ml-auto shrink-0"
        aria-label="Dismiss"
      >
        <span className="material-symbols-outlined text-sm">close</span>
      </button>
    </div>
  );
};
