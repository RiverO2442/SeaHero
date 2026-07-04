import React, { useState } from "react";

interface ExportFormat {
  id: "csv" | "json" | "print";
  icon: string;
  label: string;
  description: string;
  color: string;
  bg: string;
}

const FORMATS: ExportFormat[] = [
  { id: "csv", icon: "table_chart", label: "CSV", description: "Comma-separated values — opens in Excel or Google Sheets", color: "text-emerald-600", bg: "bg-emerald-50" },
  { id: "json", icon: "data_object", label: "JSON", description: "Machine-readable format for APIs and data pipelines", color: "text-blue-600", bg: "bg-blue-50" },
  { id: "print", icon: "print", label: "Print / PDF", description: "Print-friendly view — save as PDF from the browser dialog", color: "text-purple-600", bg: "bg-purple-50" },
];

interface ExportFormatModalProps {
  reportTitle: string;
  onExport: (format: "csv" | "json" | "print") => void;
  onClose: () => void;
}

export const ExportFormatModal: React.FC<ExportFormatModalProps> = ({
  reportTitle,
  onExport,
  onClose,
}) => {
  const [selected, setSelected] = useState<"csv" | "json" | "print">("csv");

  const handleExport = () => {
    onExport(selected);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100">
          <div>
            <h3 className="font-bold text-slate-800">Export Report</h3>
            <p className="text-xs text-slate-500 mt-0.5 truncate max-w-xs">{reportTitle}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-lg text-slate-400 transition-colors"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <div className="px-6 py-5 space-y-3">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">
            Choose Export Format
          </p>
          {FORMATS.map((f) => (
            <button
              key={f.id}
              onClick={() => setSelected(f.id)}
              className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all text-left ${
                selected === f.id
                  ? "border-blue-500 bg-blue-50/50"
                  : "border-slate-100 hover:border-slate-200 hover:bg-slate-50"
              }`}
            >
              <div className={`w-10 h-10 ${f.bg} rounded-lg flex items-center justify-center ${f.color} shrink-0`}>
                <span className="material-symbols-outlined">{f.icon}</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-slate-800">{f.label}</p>
                <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{f.description}</p>
              </div>
              <div
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${
                  selected === f.id ? "border-blue-500 bg-blue-500" : "border-slate-300"
                }`}
              >
                {selected === f.id && (
                  <span className="material-symbols-outlined text-white text-xs">check</span>
                )}
              </div>
            </button>
          ))}
        </div>

        <div className="px-6 pb-6 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 bg-slate-100 text-slate-700 text-sm font-bold rounded-xl hover:bg-slate-200 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleExport}
            className="flex-1 py-2.5 bg-gradient-to-br from-blue-600 to-blue-700 text-white text-sm font-bold rounded-xl shadow-lg shadow-blue-200 hover:scale-[1.02] transition-transform flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined text-sm">download</span>
            Export {FORMATS.find((f) => f.id === selected)?.label}
          </button>
        </div>
      </div>
    </div>
  );
};
