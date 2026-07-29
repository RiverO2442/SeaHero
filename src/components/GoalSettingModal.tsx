import React, { useState } from "react";

interface KeyResult {
  id: string;
  description: string;
  target: number;
  current: number;
  unit: string;
}

interface Goal {
  id: string;
  title: string;
  owner: string;
  quarter: string;
  priority: "High" | "Medium" | "Low";
  keyResults: KeyResult[];
}

const PRIORITY_COLORS = {
  High:   "bg-red-100 text-red-700",
  Medium: "bg-amber-100 text-amber-700",
  Low:    "bg-slate-100 text-slate-600",
};

function krProgress(kr: KeyResult) {
  return Math.min(100, Math.round((kr.current / kr.target) * 100));
}

function goalProgress(g: Goal) {
  if (!g.keyResults.length) return 0;
  return Math.round(g.keyResults.reduce((s, kr) => s + krProgress(kr), 0) / g.keyResults.length);
}

const SEED_GOALS: Goal[] = [
  {
    id: "g1", title: "Improve Engineering Hiring Velocity", owner: "Alice Chen", quarter: "Q3 2026", priority: "High",
    keyResults: [
      { id: "kr1", description: "Reduce time-to-offer to ≤14 days", target: 14, current: 18, unit: "days" },
      { id: "kr2", description: "Conduct 20 technical interviews",   target: 20, current: 12, unit: "interviews" },
      { id: "kr3", description: "Achieve 85% offer acceptance rate", target: 85, current: 72, unit: "%" },
    ],
  },
  {
    id: "g2", title: "Launch Q3 Marketing Campaign", owner: "Maya Thompson", quarter: "Q3 2026", priority: "Medium",
    keyResults: [
      { id: "kr4", description: "Publish 12 blog posts",  target: 12, current: 9,  unit: "posts" },
      { id: "kr5", description: "Generate 500 MQLs",      target: 500, current: 320, unit: "leads" },
    ],
  },
];

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const GoalSettingModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const [goals, setGoals] = useState<Goal[]>(SEED_GOALS);
  const [selected, setSelected] = useState<Goal | null>(null);
  const [adding, setAdding] = useState(false);
  const [newGoal, setNewGoal] = useState({ title: "", owner: "", quarter: "Q3 2026", priority: "Medium" as Goal["priority"] });
  const [newKR, setNewKR] = useState({ description: "", target: "", current: "", unit: "" });
  const [addingKR, setAddingKR] = useState(false);

  if (!isOpen) return null;

  const saveGoal = () => {
    if (!newGoal.title.trim()) return;
    const g: Goal = { id: `g${Date.now()}`, ...newGoal, keyResults: [] };
    setGoals(prev => [...prev, g]);
    setAdding(false);
    setNewGoal({ title: "", owner: "", quarter: "Q3 2026", priority: "Medium" });
    setSelected(g);
  };

  const saveKR = () => {
    if (!selected || !newKR.description.trim()) return;
    const kr: KeyResult = {
      id: `kr${Date.now()}`,
      description: newKR.description,
      target: Number(newKR.target) || 100,
      current: Number(newKR.current) || 0,
      unit: newKR.unit || "%",
    };
    const updated = { ...selected, keyResults: [...selected.keyResults, kr] };
    setGoals(prev => prev.map(g => g.id === selected.id ? updated : g));
    setSelected(updated);
    setAddingKR(false);
    setNewKR({ description: "", target: "", current: "", unit: "" });
  };

  const updateKRProgress = (goalId: string, krId: string, value: number) => {
    setGoals(prev => prev.map(g => g.id === goalId
      ? { ...g, keyResults: g.keyResults.map(kr => kr.id === krId ? { ...kr, current: value } : kr) }
      : g
    ));
    if (selected?.id === goalId) {
      setSelected(prev => prev ? {
        ...prev,
        keyResults: prev.keyResults.map(kr => kr.id === krId ? { ...kr, current: value } : kr)
      } : prev);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col" onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-700 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">Goal Setting</h2>
            <p className="text-xs text-slate-500 mt-0.5">OKR management — create objectives and track key results</p>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
            <span className="material-symbols-outlined text-slate-500">close</span>
          </button>
        </div>

        <div className="flex flex-1 min-h-0">
          {/* Goal list */}
          <div className="w-72 border-r border-slate-100 dark:border-slate-700 flex flex-col">
            <div className="p-4 border-b border-slate-100 dark:border-slate-700">
              <button onClick={() => setAdding(true)}
                className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg transition-colors">
                <span className="material-symbols-outlined text-base">add</span>
                New Objective
              </button>
            </div>

            {adding && (
              <div className="p-4 border-b border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-700/50 space-y-2">
                <input placeholder="Objective title" value={newGoal.title} onChange={e => setNewGoal(v => ({ ...v, title: e.target.value }))}
                  className="w-full text-sm border border-slate-200 dark:border-slate-600 rounded-lg px-3 py-1.5 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                <input placeholder="Owner" value={newGoal.owner} onChange={e => setNewGoal(v => ({ ...v, owner: e.target.value }))}
                  className="w-full text-sm border border-slate-200 dark:border-slate-600 rounded-lg px-3 py-1.5 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                <div className="flex gap-2">
                  <select value={newGoal.quarter} onChange={e => setNewGoal(v => ({ ...v, quarter: e.target.value }))}
                    className="flex-1 text-xs border border-slate-200 dark:border-slate-600 rounded-lg px-2 py-1.5 bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-100 focus:outline-none">
                    {["Q1 2026","Q2 2026","Q3 2026","Q4 2026"].map(q => <option key={q}>{q}</option>)}
                  </select>
                  <select value={newGoal.priority} onChange={e => setNewGoal(v => ({ ...v, priority: e.target.value as Goal["priority"] }))}
                    className="flex-1 text-xs border border-slate-200 dark:border-slate-600 rounded-lg px-2 py-1.5 bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-100 focus:outline-none">
                    {["High","Medium","Low"].map(p => <option key={p}>{p}</option>)}
                  </select>
                </div>
                <div className="flex gap-2">
                  <button onClick={saveGoal} className="flex-1 bg-blue-600 text-white text-xs font-semibold py-1.5 rounded-lg hover:bg-blue-700">Save</button>
                  <button onClick={() => setAdding(false)} className="flex-1 bg-slate-200 text-slate-700 text-xs font-semibold py-1.5 rounded-lg hover:bg-slate-300">Cancel</button>
                </div>
              </div>
            )}

            <div className="flex-1 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-700">
              {goals.map(g => {
                const pct = goalProgress(g);
                return (
                  <button key={g.id} onClick={() => setSelected(g)}
                    className={`w-full text-left p-4 hover:bg-slate-50 dark:hover:bg-slate-700/40 transition-colors ${selected?.id === g.id ? "bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500" : ""}`}>
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <p className="text-sm font-semibold text-slate-800 dark:text-slate-100 leading-tight">{g.title}</p>
                      <span className={`text-[10px] px-1.5 py-0.5 rounded font-medium shrink-0 ${PRIORITY_COLORS[g.priority]}`}>{g.priority}</span>
                    </div>
                    <p className="text-xs text-slate-400 mb-2">{g.owner} · {g.quarter}</p>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-1.5 bg-slate-200 dark:bg-slate-600 rounded-full overflow-hidden">
                        <div className={`h-full rounded-full ${pct >= 80 ? "bg-green-500" : pct >= 50 ? "bg-amber-400" : "bg-blue-400"}`} style={{ width: `${pct}%` }} />
                      </div>
                      <span className="text-[10px] text-slate-500 font-medium">{pct}%</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Key results panel */}
          <div className="flex-1 overflow-y-auto p-6">
            {!selected ? (
              <div className="flex flex-col items-center justify-center h-full text-center text-slate-400">
                <span className="material-symbols-outlined text-5xl mb-3">flag</span>
                <p className="text-sm font-medium">Select an objective to view key results</p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">{selected.title}</h3>
                    <p className="text-xs text-slate-500 mt-0.5">{selected.owner} · {selected.quarter}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-blue-600">{goalProgress(selected)}%</p>
                    <p className="text-xs text-slate-400">overall progress</p>
                  </div>
                </div>

                <div className="space-y-3">
                  {selected.keyResults.map(kr => {
                    const pct = krProgress(kr);
                    return (
                      <div key={kr.id} className="bg-slate-50 dark:bg-slate-700/40 rounded-xl p-4">
                        <div className="flex items-start justify-between gap-3 mb-2">
                          <p className="text-sm font-medium text-slate-800 dark:text-slate-100">{kr.description}</p>
                          <span className={`text-sm font-bold shrink-0 ${pct >= 100 ? "text-green-600" : pct >= 70 ? "text-amber-600" : "text-blue-600"}`}>{pct}%</span>
                        </div>
                        <div className="h-2 bg-slate-200 dark:bg-slate-600 rounded-full overflow-hidden mb-2">
                          <div className={`h-full rounded-full transition-all ${pct >= 100 ? "bg-green-500" : pct >= 70 ? "bg-amber-400" : "bg-blue-500"}`} style={{ width: `${Math.min(pct, 100)}%` }} />
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-xs text-slate-400">{kr.current} / {kr.target} {kr.unit}</span>
                          <div className="flex items-center gap-1 ml-auto">
                            <span className="text-xs text-slate-400">Update:</span>
                            <input type="number" value={kr.current}
                              onChange={e => updateKRProgress(selected.id, kr.id, Number(e.target.value))}
                              className="w-16 text-xs border border-slate-200 dark:border-slate-600 rounded px-2 py-1 bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-blue-500" />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {addingKR ? (
                  <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 border border-blue-200 dark:border-blue-800 space-y-2">
                    <p className="text-xs font-semibold text-blue-700 dark:text-blue-300 mb-2">New Key Result</p>
                    <input placeholder="Description" value={newKR.description} onChange={e => setNewKR(v => ({ ...v, description: e.target.value }))}
                      className="w-full text-sm border border-slate-200 dark:border-slate-600 rounded-lg px-3 py-1.5 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    <div className="flex gap-2">
                      <input placeholder="Target" type="number" value={newKR.target} onChange={e => setNewKR(v => ({ ...v, target: e.target.value }))}
                        className="flex-1 text-sm border border-slate-200 dark:border-slate-600 rounded-lg px-3 py-1.5 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none" />
                      <input placeholder="Current" type="number" value={newKR.current} onChange={e => setNewKR(v => ({ ...v, current: e.target.value }))}
                        className="flex-1 text-sm border border-slate-200 dark:border-slate-600 rounded-lg px-3 py-1.5 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none" />
                      <input placeholder="Unit (%)" value={newKR.unit} onChange={e => setNewKR(v => ({ ...v, unit: e.target.value }))}
                        className="w-20 text-sm border border-slate-200 dark:border-slate-600 rounded-lg px-3 py-1.5 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none" />
                    </div>
                    <div className="flex gap-2">
                      <button onClick={saveKR} className="flex-1 bg-blue-600 text-white text-xs font-semibold py-1.5 rounded-lg hover:bg-blue-700">Add</button>
                      <button onClick={() => setAddingKR(false)} className="flex-1 bg-slate-200 text-slate-700 text-xs font-semibold py-1.5 rounded-lg hover:bg-slate-300">Cancel</button>
                    </div>
                  </div>
                ) : (
                  <button onClick={() => setAddingKR(true)}
                    className="w-full border-2 border-dashed border-slate-200 dark:border-slate-600 rounded-xl py-3 text-sm text-slate-400 hover:border-blue-400 hover:text-blue-500 transition-colors flex items-center justify-center gap-2">
                    <span className="material-symbols-outlined text-base">add</span>
                    Add Key Result
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
