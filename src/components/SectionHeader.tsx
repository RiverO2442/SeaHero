import React from "react";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
  className?: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  subtitle,
  actions,
  className = "",
}) => (
  <div className={className}>
    <div className="flex items-center justify-between mb-1">
      <div>
        <h2 className="text-base font-bold text-slate-900">{title}</h2>
        {subtitle && <p className="text-xs text-slate-500 mt-0.5">{subtitle}</p>}
      </div>
      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </div>
    <hr className="border-0 border-t border-slate-200 mt-3" />
  </div>
);

export default SectionHeader;
