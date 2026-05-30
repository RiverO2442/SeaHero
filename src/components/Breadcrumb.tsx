import React from "react";

interface BreadcrumbItem {
  label: string;
  onClick?: () => void;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items, className = "" }) => (
  <nav aria-label="Breadcrumb" className={`flex items-center gap-1 text-sm ${className}`}>
    {items.map((item, i) => {
      const isLast = i === items.length - 1;
      return (
        <React.Fragment key={i}>
          {i > 0 && (
            <span className="material-symbols-outlined text-slate-300 text-base select-none">
              chevron_right
            </span>
          )}
          {isLast || !item.onClick ? (
            <span className={`font-medium ${isLast ? "text-slate-900" : "text-slate-500"}`}>
              {item.label}
            </span>
          ) : (
            <button
              onClick={item.onClick}
              className="text-slate-500 hover:text-blue-600 font-medium transition-colors"
            >
              {item.label}
            </button>
          )}
        </React.Fragment>
      );
    })}
  </nav>
);

export default Breadcrumb;
