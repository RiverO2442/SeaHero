import React, { useEffect } from "react";

interface DrawerProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  width?: string;
}

const Drawer: React.FC<DrawerProps> = ({
  open,
  onClose,
  title,
  children,
  width = "w-96",
}) => {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[150] flex">
      {/* Backdrop */}
      <div
        className="flex-1 bg-black/30 transition-opacity"
        onClick={onClose}
        aria-hidden
      />

      {/* Panel */}
      <div
        className={`${width} h-full bg-white shadow-2xl flex flex-col animate-slideInRight`}
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          {title && <h2 className="font-bold text-slate-900 text-base">{title}</h2>}
          <button
            onClick={onClose}
            className="ml-auto p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"
            aria-label="Close"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-6 py-4">{children}</div>
      </div>
    </div>
  );
};

export default Drawer;
