import React from "react";

type InfoBoxVariant = "info" | "warning" | "error" | "success";

interface InfoBoxProps {
  variant?: InfoBoxVariant;
  title?: string;
  children: React.ReactNode;
  className?: string;
}

const STYLES: Record<InfoBoxVariant, { wrap: string; icon: string; iconColor: string }> = {
  info:    { wrap: "bg-blue-50 border-blue-200 text-blue-800",     icon: "info",            iconColor: "text-blue-500" },
  warning: { wrap: "bg-amber-50 border-amber-200 text-amber-800",  icon: "warning",         iconColor: "text-amber-500" },
  error:   { wrap: "bg-red-50 border-red-200 text-red-800",        icon: "error",           iconColor: "text-red-500" },
  success: { wrap: "bg-emerald-50 border-emerald-200 text-emerald-800", icon: "check_circle", iconColor: "text-emerald-500" },
};

const InfoBox: React.FC<InfoBoxProps> = ({ variant = "info", title, children, className = "" }) => {
  const s = STYLES[variant];
  return (
    <div className={`flex gap-3 p-4 rounded-xl border ${s.wrap} ${className}`} role="alert">
      <span className={`material-symbols-outlined text-xl shrink-0 mt-0.5 ${s.iconColor}`}>{s.icon}</span>
      <div className="text-sm">
        {title && <p className="font-semibold mb-0.5">{title}</p>}
        <div>{children}</div>
      </div>
    </div>
  );
};

export default InfoBox;
