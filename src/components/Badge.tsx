import React from "react";

type BadgeVariant = "success" | "error" | "warning" | "info" | "neutral";

interface BadgeProps {
  label: string;
  variant?: BadgeVariant;
  dot?: boolean;
}

const STYLES: Record<BadgeVariant, string> = {
  success: "bg-emerald-100 text-emerald-700",
  error:   "bg-red-100 text-red-700",
  warning: "bg-amber-100 text-amber-700",
  info:    "bg-blue-100 text-blue-700",
  neutral: "bg-slate-100 text-slate-600",
};

const DOT_STYLES: Record<BadgeVariant, string> = {
  success: "bg-emerald-500",
  error:   "bg-red-500",
  warning: "bg-amber-500",
  info:    "bg-blue-500",
  neutral: "bg-slate-400",
};

const Badge: React.FC<BadgeProps> = ({ label, variant = "neutral", dot = false }) => (
  <span
    className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold ${STYLES[variant]}`}
  >
    {dot && <span className={`w-1.5 h-1.5 rounded-full ${DOT_STYLES[variant]}`} />}
    {label}
  </span>
);

export default Badge;
