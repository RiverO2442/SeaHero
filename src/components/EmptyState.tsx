import React from "react";

interface EmptyStateProps {
  icon?: string;
  title: string;
  description?: string;
  action?: React.ReactNode;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  icon = "inbox",
  title,
  description,
  action,
}) => (
  <div className="flex flex-col items-center justify-center py-16 text-center">
    <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mb-4">
      <span className="material-symbols-outlined text-3xl text-slate-400">{icon}</span>
    </div>
    <p className="text-slate-800 font-semibold text-base mb-1">{title}</p>
    {description && (
      <p className="text-slate-500 text-sm max-w-xs">{description}</p>
    )}
    {action && <div className="mt-4">{action}</div>}
  </div>
);

export default EmptyState;
