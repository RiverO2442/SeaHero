import React from "react";

interface DividerProps {
  label?: string;
  className?: string;
}

const Divider: React.FC<DividerProps> = ({ label, className = "" }) => {
  if (label) {
    return (
      <div className={`flex items-center gap-3 ${className}`}>
        <div className="flex-1 h-px bg-slate-200" />
        <span className="text-xs font-medium text-slate-400 whitespace-nowrap">{label}</span>
        <div className="flex-1 h-px bg-slate-200" />
      </div>
    );
  }

  return <hr className={`border-0 border-t border-slate-200 ${className}`} />;
};

export default Divider;
