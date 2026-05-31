import React from "react";

interface TagProps {
  label: string;
  onRemove?: () => void;
  color?: string;
  className?: string;
}

const Tag: React.FC<TagProps> = ({
  label,
  onRemove,
  color = "bg-slate-100 text-slate-700",
  className = "",
}) => (
  <span
    className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${color} ${className}`}
  >
    {label}
    {onRemove && (
      <button
        onClick={onRemove}
        aria-label={`Remove ${label}`}
        className="ml-0.5 hover:opacity-70 transition-opacity"
      >
        <span className="material-symbols-outlined text-sm leading-none">close</span>
      </button>
    )}
  </span>
);

export default Tag;
