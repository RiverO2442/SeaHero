import React from "react";

interface KbdShortcutProps {
  keys: string[];
  className?: string;
}

const KbdShortcut: React.FC<KbdShortcutProps> = ({ keys, className = "" }) => (
  <span className={`inline-flex items-center gap-0.5 ${className}`}>
    {keys.map((key, i) => (
      <React.Fragment key={i}>
        {i > 0 && <span className="text-slate-400 text-xs mx-0.5">+</span>}
        <kbd className="inline-flex items-center justify-center px-1.5 py-0.5 text-[11px] font-semibold text-slate-600 bg-slate-100 border border-slate-300 rounded shadow-sm font-mono min-w-[20px]">
          {key}
        </kbd>
      </React.Fragment>
    ))}
  </span>
);

export default KbdShortcut;
