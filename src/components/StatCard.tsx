import React from "react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon?: string;
  trend?: number;
  trendLabel?: string;
  iconColor?: string;
  className?: string;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon,
  trend,
  trendLabel,
  iconColor = "bg-blue-100 text-blue-600",
  className = "",
}) => {
  const up = trend !== undefined && trend >= 0;

  return (
    <div className={`bg-white rounded-xl shadow-sm p-6 ${className}`}>
      <div className="flex items-start justify-between mb-4">
        {icon && (
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${iconColor}`}>
            <span className="material-symbols-outlined">{icon}</span>
          </div>
        )}
        {trend !== undefined && (
          <span
            className={`inline-flex items-center gap-0.5 text-xs font-semibold px-2 py-0.5 rounded-full ${
              up ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-700"
            }`}
          >
            <span className="material-symbols-outlined text-sm">
              {up ? "arrow_upward" : "arrow_downward"}
            </span>
            {Math.abs(trend)}%
          </span>
        )}
      </div>
      <p className="text-xs font-medium text-slate-500 mb-1">{title}</p>
      <p className="text-2xl font-bold text-slate-900">{value}</p>
      {trendLabel && <p className="text-xs text-slate-400 mt-1">{trendLabel}</p>}
    </div>
  );
};

export default StatCard;
