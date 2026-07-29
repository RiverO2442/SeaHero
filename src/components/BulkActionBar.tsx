import React, { useState } from "react";

interface Props {
  selectedCount: number;
  selectedNames: string[];
  onClear: () => void;
  onBulkDeptChange: (dept: string) => void;
  onBulkExport: () => void;
  onBulkEmail: () => void;
}

const DEPTS = ["Engineering", "Design", "Marketing", "Sales", "HR", "Finance", "Operations"];

export const BulkActionBar: React.FC<Props> = ({
  selectedCount,
  selectedNames,
  onClear,
  onBulkDeptChange,
  onBulkExport,
  onBulkEmail,
}) => {
  const [deptPickerOpen, setDeptPickerOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  if (selectedCount === 0) return null;

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
  };

  const handleExport = () => {
    onBulkExport();
    showToast(`Exported ${selectedCount} employee${selectedCount > 1 ? "s" : ""} to CSV`);
  };

  const handleEmail = () => {
    onBulkEmail();
    showToast(`Email draft opened for ${selectedCount} employee${selectedCount > 1 ? "s" : ""}`);
  };

  const handleDept = (dept: string) => {
    onBulkDeptChange(dept);
    setDeptPickerOpen(false);
    showToast(`Moved ${selectedCount} employee${selectedCount > 1 ? "s" : ""} to ${dept}`);
  };

  return (
    <>
      {/* Floating bar */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 animate-fadeSlideIn">
        <div className="bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 rounded-2xl shadow-2xl px-5 py-3 flex items-center gap-4 min-w-[480px]">
          {/* Selection count */}
          <div className="flex items-center gap-2 mr-2">
            <span className="w-7 h-7 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold">{selectedCount}</span>
            <span className="text-sm font-medium">
              {selectedCount === 1 ? selectedNames[0] : `${selectedCount} employees selected`}
            </span>
          </div>

          <div className="w-px h-5 bg-white/20 dark:bg-slate-900/20" />

          {/* Actions */}
          <div className="flex items-center gap-2">
            {/* Change dept */}
            <div className="relative">
              <button onClick={() => setDeptPickerOpen(v => !v)}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-white/10 dark:bg-slate-900/10 hover:bg-white/20 dark:hover:bg-slate-900/20 rounded-lg text-sm font-medium transition-colors">
                <span className="material-symbols-outlined text-base">business</span>
                Change Dept
                <span className="material-symbols-outlined text-sm">expand_more</span>
              </button>
              {deptPickerOpen && (
                <div className="absolute bottom-full mb-2 left-0 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 overflow-hidden w-44 z-50">
                  {DEPTS.map(d => (
                    <button key={d} onClick={() => handleDept(d)}
                      className="w-full text-left px-4 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
                      {d}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Export */}
            <button onClick={handleExport}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-white/10 dark:bg-slate-900/10 hover:bg-white/20 dark:hover:bg-slate-900/20 rounded-lg text-sm font-medium transition-colors">
              <span className="material-symbols-outlined text-base">download</span>
              Export CSV
            </button>

            {/* Email */}
            <button onClick={handleEmail}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-white/10 dark:bg-slate-900/10 hover:bg-white/20 dark:hover:bg-slate-900/20 rounded-lg text-sm font-medium transition-colors">
              <span className="material-symbols-outlined text-base">mail</span>
              Email
            </button>
          </div>

          <div className="w-px h-5 bg-white/20 dark:bg-slate-900/20" />

          {/* Clear */}
          <button onClick={onClear}
            className="flex items-center gap-1 px-2 py-1.5 hover:bg-white/10 dark:hover:bg-slate-900/10 rounded-lg text-sm font-medium transition-colors text-white/70 dark:text-slate-600 hover:text-white dark:hover:text-slate-900">
            <span className="material-symbols-outlined text-base">close</span>
            Clear
          </button>
        </div>
      </div>

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 bg-green-600 text-white text-sm font-medium px-5 py-2.5 rounded-xl shadow-lg animate-fadeSlideIn">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-base">check_circle</span>
            {toast}
          </div>
        </div>
      )}
    </>
  );
};
