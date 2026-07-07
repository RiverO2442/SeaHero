import React, { useState, useEffect } from "react";

interface EmployeeNotepadProps {
  employeeId: string;
  employeeName: string;
  onClose: () => void;
}

const STORAGE_KEY = "salarypro_employee_notes";

function loadNotes(): Record<string, string> {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "{}");
  } catch {
    return {};
  }
}

export const EmployeeNotepad: React.FC<EmployeeNotepadProps> = ({
  employeeId,
  employeeName,
  onClose,
}) => {
  const [text, setText] = useState(() => loadNotes()[employeeId] ?? "");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const notes = loadNotes();
    setText(notes[employeeId] ?? "");
  }, [employeeId]);

  const handleSave = () => {
    const notes = loadNotes();
    notes[employeeId] = text;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
    setSaved(true);
    setTimeout(() => setSaved(false), 1500);
  };

  const handleClear = () => {
    setText("");
    const notes = loadNotes();
    delete notes[employeeId];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
  };

  return (
    <div
      className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-amber-50 rounded-lg flex items-center justify-center text-amber-500">
              <span className="material-symbols-outlined">sticky_note_2</span>
            </div>
            <div>
              <h3 className="font-bold text-slate-800 text-sm">Notes</h3>
              <p className="text-xs text-slate-500">{employeeName}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-lg text-slate-400 transition-colors"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <div className="px-6 py-5">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Add notes about this employee (performance, leave history, reminders…)"
            rows={6}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm text-slate-700 placeholder:text-slate-300 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50 resize-none transition-colors"
          />
          <p className="text-xs text-slate-400 mt-1.5 text-right">{text.length} chars</p>
        </div>

        <div className="flex gap-3 px-6 pb-5">
          <button
            onClick={handleClear}
            disabled={!text}
            className="px-4 py-2.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-500 hover:bg-slate-50 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Clear
          </button>
          <button
            onClick={handleSave}
            className="flex-1 py-2.5 rounded-lg bg-gradient-to-br from-blue-600 to-blue-700 text-white text-xs font-bold shadow-md shadow-blue-200 hover:scale-[1.02] transition-transform flex items-center justify-center gap-2"
          >
            {saved ? (
              <>
                <span className="material-symbols-outlined text-sm">check</span>
                Saved!
              </>
            ) : (
              "Save Note"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
