import React, { useState } from "react";
import { SuccessionPlanningPanel } from "../components/SuccessionPlanningPanel";
import { GoalSettingModal } from "../components/GoalSettingModal";

interface ReviewEmployee {
  id: string;
  name: string;
  initials: string;
  avatarColor: string;
  department: string;
  role: string;
  performance: 1 | 2 | 3; // 1=low, 2=mid, 3=high
  potential: 1 | 2 | 3;
  rating: number; // 1-5
  lastReview: string;
  reviewer: string;
  notes: string;
}

const EMPLOYEES: ReviewEmployee[] = [
  { id: "1", name: "Marcus Chen",     initials: "MC", avatarColor: "bg-blue-100 text-blue-700",      department: "Engineering",    role: "Senior Fullstack Engineer", performance: 3, potential: 3, rating: 4.8, lastReview: "Jun 2026", reviewer: "A. Thompson", notes: "Exceptional delivery on Q2 platform migration." },
  { id: "2", name: "Sarah Jenkins",   initials: "SJ", avatarColor: "bg-purple-100 text-purple-700",  department: "Product Design", role: "Principal UI Designer",     performance: 3, potential: 2, rating: 4.5, lastReview: "Jun 2026", reviewer: "A. Thompson", notes: "Consistent high-quality output, strong execution." },
  { id: "3", name: "David Okoro",     initials: "DO", avatarColor: "bg-blue-100 text-blue-700",      department: "Engineering",    role: "DevOps Specialist",         performance: 2, potential: 3, rating: 3.9, lastReview: "May 2026", reviewer: "A. Thompson", notes: "Great initiative, needs to build on reliability." },
  { id: "4", name: "Elena Rodriguez", initials: "ER", avatarColor: "bg-slate-200 text-slate-700",   department: "Operations",     role: "Logistics Manager",         performance: 2, potential: 2, rating: 3.4, lastReview: "May 2026", reviewer: "A. Thompson", notes: "Steady performer, good team collaboration." },
  { id: "5", name: "Maya Thompson",   initials: "MT", avatarColor: "bg-emerald-100 text-emerald-700",department: "Marketing",      role: "Content Lead",              performance: 1, potential: 3, rating: 3.1, lastReview: "Apr 2026", reviewer: "A. Thompson", notes: "High potential — invest in coaching." },
  { id: "6", name: "James Wilson",    initials: "JW", avatarColor: "bg-amber-100 text-amber-700",   department: "Finance",        role: "Senior Accountant",         performance: 3, potential: 1, rating: 4.2, lastReview: "Jun 2026", reviewer: "A. Thompson", notes: "Excellent performer, specialist track suited." },
  { id: "7", name: "Priya Nair",      initials: "PN", avatarColor: "bg-rose-100 text-rose-700",     department: "HR",             role: "HR Business Partner",       performance: 2, potential: 1, rating: 3.2, lastReview: "Apr 2026", reviewer: "A. Thompson", notes: "Consistent output, growth path to define." },
  { id: "8", name: "Tom Bradley",     initials: "TB", avatarColor: "bg-indigo-100 text-indigo-700", department: "Engineering",    role: "Junior Developer",          performance: 1, potential: 2, rating: 2.8, lastReview: "Mar 2026", reviewer: "A. Thompson", notes: "Developing skills, needs structured mentoring." },
  { id: "9", name: "Lisa Park",       initials: "LP", avatarColor: "bg-teal-100 text-teal-700",     department: "Product Design", role: "UX Researcher",             performance: 1, potential: 1, rating: 2.3, lastReview: "Mar 2026", reviewer: "A. Thompson", notes: "Performance improvement plan in progress." },
];

const PERF_LABELS: Record<number, string> = { 1: "Low", 2: "Moderate", 3: "High" };
const POT_LABELS:  Record<number, string> = { 1: "Low", 2: "Moderate", 3: "High" };

const BOX_META: Record<string, { label: string; color: string; bg: string }> = {
  "3-3": { label: "Star",          color: "text-amber-700",  bg: "bg-amber-50 border-amber-200" },
  "3-2": { label: "High Performer",color: "text-blue-700",   bg: "bg-blue-50 border-blue-200" },
  "3-1": { label: "Expert",        color: "text-indigo-700", bg: "bg-indigo-50 border-indigo-200" },
  "2-3": { label: "High Potential",color: "text-emerald-700",bg: "bg-emerald-50 border-emerald-200" },
  "2-2": { label: "Core Player",   color: "text-slate-700",  bg: "bg-slate-50 border-slate-200" },
  "2-1": { label: "Solid Performer",color:"text-slate-600",  bg: "bg-slate-50 border-slate-200" },
  "1-3": { label: "Enigma",        color: "text-purple-700", bg: "bg-purple-50 border-purple-200" },
  "1-2": { label: "Developing",    color: "text-sky-700",    bg: "bg-sky-50 border-sky-200" },
  "1-1": { label: "Underperformer",color: "text-red-700",    bg: "bg-red-50 border-red-200" },
};

function boxKey(p: number, pot: number) { return `${p}-${pot}`; }

const Stars: React.FC<{ rating: number }> = ({ rating }) => (
  <div className="flex items-center gap-0.5">
    {[1,2,3,4,5].map((i) => (
      <span key={i} className={`material-symbols-outlined text-sm ${i <= Math.round(rating) ? "text-amber-400" : "text-slate-200"}`}>star</span>
    ))}
    <span className="text-xs font-bold text-slate-600 ml-1">{rating.toFixed(1)}</span>
  </div>
);

const PerformanceReviewPage: React.FC = () => {
  const [selected, setSelected] = useState<ReviewEmployee | null>(null);
  const [filterBox, setFilterBox] = useState<string | null>(null);
  const [goalOpen, setGoalOpen] = useState(false);

  const displayed = filterBox ? EMPLOYEES.filter((e) => boxKey(e.performance, e.potential) === filterBox) : EMPLOYEES;

  return (
    <div className="space-y-8">
      <GoalSettingModal isOpen={goalOpen} onClose={() => setGoalOpen(false)} />
      {/* Header */}
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-800">Performance Reviews</h2>
          <p className="text-slate-500 font-medium mt-1">9-box talent matrix and individual review cards.</p>
        </div>
        <div className="flex gap-2">
          <button onClick={() => setGoalOpen(true)} className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg transition-colors">
            <span className="material-symbols-outlined text-base">flag</span>
            Manage OKRs
          </button>
          {filterBox && (
            <button onClick={() => setFilterBox(null)} className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 text-sm font-semibold rounded-lg flex items-center gap-2 transition-colors">
              <span className="material-symbols-outlined text-sm">close</span>
              Clear filter
            </button>
          )}
        </div>
      </div>

      {/* 9-box matrix */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center gap-2 mb-5">
          <span className="material-symbols-outlined text-blue-500">grid_view</span>
          <h4 className="font-bold text-slate-800">9-Box Talent Matrix</h4>
          <span className="text-xs text-slate-400 ml-auto">Click a cell to filter employees</span>
        </div>

        <div className="flex gap-4">
          {/* Y-axis label */}
          <div className="flex flex-col justify-between items-center py-2 w-6">
            <span className="text-[10px] font-bold text-slate-400 rotate-[-90deg] whitespace-nowrap">HIGH POTENTIAL</span>
            <span className="text-[10px] font-bold text-slate-400 rotate-[-90deg] whitespace-nowrap">LOW POTENTIAL</span>
          </div>

          <div className="flex-1">
            {/* Grid: rows = potential (3 down to 1), cols = performance (1 to 3) */}
            <div className="grid grid-rows-3 gap-2">
              {([3,2,1] as const).map((pot) => (
                <div key={pot} className="grid grid-cols-3 gap-2">
                  {([1,2,3] as const).map((perf) => {
                    const key = boxKey(perf, pot);
                    const meta = BOX_META[key];
                    const emps = EMPLOYEES.filter((e) => e.performance === perf && e.potential === pot);
                    const active = filterBox === key;
                    return (
                      <button
                        key={key}
                        onClick={() => setFilterBox(active ? null : key)}
                        className={`border rounded-lg p-3 text-left transition-all hover:shadow-md ${meta.bg} ${meta.color} ${active ? "ring-2 ring-blue-400 shadow-md" : ""}`}
                      >
                        <p className="text-xs font-bold mb-1">{meta.label}</p>
                        <div className="flex flex-wrap gap-1">
                          {emps.map((e) => (
                            <span key={e.id} className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-[9px] font-bold ${e.avatarColor}`}>
                              {e.initials}
                            </span>
                          ))}
                          {emps.length === 0 && <span className="text-[10px] opacity-40">—</span>}
                        </div>
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>

            {/* X-axis labels */}
            <div className="grid grid-cols-3 gap-2 mt-2">
              {["Low Performance","Moderate Performance","High Performance"].map((l) => (
                <p key={l} className="text-[10px] font-bold text-slate-400 text-center">{l}</p>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Succession planning */}
      <SuccessionPlanningPanel />

      {/* Employee review cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {displayed.map((emp) => {
          const key = boxKey(emp.performance, emp.potential);
          const meta = BOX_META[key];
          return (
            <div
              key={emp.id}
              onClick={() => setSelected(emp)}
              className={`bg-white rounded-xl shadow-sm p-5 cursor-pointer hover:shadow-md transition-shadow border-l-4 ${meta.bg.replace("bg-", "border-l-").replace("-50", "-300")}`}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${emp.avatarColor}`}>
                  {emp.initials}
                </div>
                <div>
                  <p className="font-bold text-slate-800 text-sm">{emp.name}</p>
                  <p className="text-xs text-slate-500">{emp.role}</p>
                </div>
                <span className={`ml-auto text-xs font-bold px-2 py-0.5 rounded-full border ${meta.bg} ${meta.color}`}>
                  {meta.label}
                </span>
              </div>
              <Stars rating={emp.rating} />
              <div className="mt-3 flex gap-4 text-xs text-slate-500">
                <span>Perf: <strong className="text-slate-700">{PERF_LABELS[emp.performance]}</strong></span>
                <span>Potential: <strong className="text-slate-700">{POT_LABELS[emp.potential]}</strong></span>
              </div>
              <p className="mt-2 text-xs text-slate-400 italic truncate">{emp.notes}</p>
            </div>
          );
        })}
      </div>

      {/* Detail modal */}
      {selected && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setSelected(null)}>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-bold text-slate-800">Review Details</h3>
              <button onClick={() => setSelected(null)} className="p-2 hover:bg-slate-100 rounded-lg text-slate-400"><span className="material-symbols-outlined">close</span></button>
            </div>
            <div className="flex items-center gap-4 mb-5">
              <div className={`w-14 h-14 rounded-full flex items-center justify-center text-lg font-bold ${selected.avatarColor}`}>{selected.initials}</div>
              <div>
                <p className="font-extrabold text-slate-800">{selected.name}</p>
                <p className="text-sm text-slate-500">{selected.role} · {selected.department}</p>
                <Stars rating={selected.rating} />
              </div>
            </div>
            <div className="space-y-3 text-sm">
              {[
                ["Performance",  PERF_LABELS[selected.performance]],
                ["Potential",    POT_LABELS[selected.potential]],
                ["Box",          BOX_META[boxKey(selected.performance, selected.potential)].label],
                ["Last Review",  selected.lastReview],
                ["Reviewer",     selected.reviewer],
              ].map(([l, v]) => (
                <div key={l} className="flex justify-between">
                  <span className="text-slate-500">{l}</span>
                  <span className="font-semibold text-slate-800">{v}</span>
                </div>
              ))}
              <div className="pt-3 border-t border-slate-100">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Notes</p>
                <p className="text-sm text-slate-700">{selected.notes}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PerformanceReviewPage;
