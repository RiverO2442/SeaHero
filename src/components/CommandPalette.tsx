import React, { useState, useEffect, useRef, useCallback } from "react";
import type { Page } from "../App";

interface Command {
  id: string;
  icon: string;
  label: string;
  description?: string;
  group: string;
  action: () => void;
}

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (page: Page) => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({ isOpen, onClose, onNavigate }) => {
  const [query, setQuery] = useState("");
  const [activeIdx, setActiveIdx] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const commands: Command[] = [
    { id: "nav-dashboard",  icon: "dashboard",        label: "Dashboard",          description: "Overview & KPIs",          group: "Navigate", action: () => { onNavigate("dashboard");   onClose(); } },
    { id: "nav-employees",  icon: "group",             label: "Employee Directory", description: "Browse & search employees", group: "Navigate", action: () => { onNavigate("employees");  onClose(); } },
    { id: "nav-daily",      icon: "event_available",   label: "Daily Entry",        description: "Attendance records",        group: "Navigate", action: () => { onNavigate("daily-entry"); onClose(); } },
    { id: "nav-payroll",    icon: "payments",          label: "Payroll",            description: "Manage salary runs",        group: "Navigate", action: () => { onNavigate("payroll");    onClose(); } },
    { id: "nav-analytics",  icon: "bar_chart",         label: "Analytics",          description: "Charts & trends",           group: "Navigate", action: () => { onNavigate("analytics");  onClose(); } },
    { id: "nav-reports",    icon: "summarize",         label: "Reports",            description: "Export & download",         group: "Navigate", action: () => { onNavigate("reports");    onClose(); } },
    { id: "nav-audit",      icon: "history",           label: "Audit Log",          description: "Event history",             group: "Navigate", action: () => { onNavigate("audit-log"); onClose(); } },
    { id: "nav-settings",   icon: "settings",          label: "Settings",           description: "App preferences",           group: "Navigate", action: () => { onNavigate("settings");   onClose(); } },
    { id: "act-dark",       icon: "dark_mode",         label: "Toggle Dark Mode",   group: "Actions", action: () => { document.documentElement.classList.toggle("dark"); onClose(); } },
    { id: "act-top",        icon: "vertical_align_top",label: "Scroll to Top",      group: "Actions", action: () => { window.scrollTo({ top: 0, behavior: "smooth" }); onClose(); } },
  ];

  const q = query.trim().toLowerCase();
  const filtered = q
    ? commands.filter(c =>
        c.label.toLowerCase().includes(q) ||
        c.description?.toLowerCase().includes(q) ||
        c.group.toLowerCase().includes(q)
      )
    : commands;

  const groups = [...new Set(filtered.map(c => c.group))];

  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setActiveIdx(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  useEffect(() => { setActiveIdx(0); }, [query]);

  useEffect(() => {
    const el = listRef.current?.querySelector(`[data-idx="${activeIdx}"]`);
    el?.scrollIntoView({ block: "nearest" });
  }, [activeIdx]);

  const handleKey = useCallback((e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") { e.preventDefault(); setActiveIdx(i => Math.min(i + 1, filtered.length - 1)); }
    if (e.key === "ArrowUp")   { e.preventDefault(); setActiveIdx(i => Math.max(i - 1, 0)); }
    if (e.key === "Enter")     { e.preventDefault(); filtered[activeIdx]?.action(); }
    if (e.key === "Escape")    { onClose(); }
  }, [filtered, activeIdx, onClose]);

  if (!isOpen) return null;

  let flatIdx = 0;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh] bg-slate-900/40 backdrop-blur-sm"
      onMouseDown={e => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        className="w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden"
        onKeyDown={handleKey}
      >
        {/* Search input */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-slate-100">
          <span className="material-symbols-outlined text-slate-400">search</span>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search pages or actions…"
            className="flex-1 text-sm text-slate-800 placeholder-slate-400 outline-none bg-transparent"
          />
          <kbd className="text-[10px] font-mono bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded">ESC</kbd>
        </div>

        {/* Results */}
        <div ref={listRef} className="max-h-80 overflow-y-auto py-2">
          {filtered.length === 0 && (
            <p className="text-center text-sm text-slate-400 py-8">No results for "{query}"</p>
          )}
          {groups.map(group => (
            <div key={group}>
              <p className="px-4 pt-3 pb-1 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                {group}
              </p>
              {filtered.filter(c => c.group === group).map(cmd => {
                const idx = flatIdx++;
                const active = idx === activeIdx;
                return (
                  <button
                    key={cmd.id}
                    data-idx={idx}
                    onMouseEnter={() => setActiveIdx(idx)}
                    onClick={cmd.action}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors ${active ? "bg-blue-50" : "hover:bg-slate-50"}`}
                  >
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${active ? "bg-blue-100 text-blue-600" : "bg-slate-100 text-slate-500"}`}>
                      <span className="material-symbols-outlined text-sm">{cmd.icon}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm font-medium ${active ? "text-blue-700" : "text-slate-800"}`}>{cmd.label}</p>
                      {cmd.description && (
                        <p className="text-xs text-slate-400 truncate">{cmd.description}</p>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="flex items-center gap-4 px-4 py-2.5 border-t border-slate-100 text-[10px] text-slate-400">
          <span><kbd className="font-mono bg-slate-100 px-1 py-0.5 rounded mr-1">↑↓</kbd>navigate</span>
          <span><kbd className="font-mono bg-slate-100 px-1 py-0.5 rounded mr-1">↵</kbd>select</span>
          <span><kbd className="font-mono bg-slate-100 px-1 py-0.5 rounded mr-1">esc</kbd>close</span>
        </div>
      </div>
    </div>
  );
};
