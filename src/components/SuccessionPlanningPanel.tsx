import React, { useState } from "react";

type Readiness = "Ready Now" | "6–12 Months" | "12–24 Months" | "Needs Development";

const READINESS_COLOR: Record<Readiness, string> = {
  "Ready Now":         "bg-emerald-100 text-emerald-700 border-emerald-200",
  "6–12 Months":       "bg-blue-100 text-blue-700 border-blue-200",
  "12–24 Months":      "bg-amber-100 text-amber-700 border-amber-200",
  "Needs Development": "bg-red-100 text-red-700 border-red-200",
};

interface Successor {
  name: string;
  initials: string;
  color: string;
  readiness: Readiness;
}

interface KeyRole {
  title: string;
  incumbent: string;
  department: string;
  flightRisk: "Low" | "Medium" | "High";
  successors: Successor[];
}

const ROLES: KeyRole[] = [
  {
    title: "VP Engineering",
    incumbent: "Marcus Chen",
    department: "Engineering",
    flightRisk: "Low",
    successors: [
      { name: "David Okoro", initials: "DO", color: "bg-blue-100 text-blue-700",   readiness: "6–12 Months"  },
      { name: "Aisha Patel", initials: "AP", color: "bg-teal-100 text-teal-700",   readiness: "12–24 Months" },
    ],
  },
  {
    title: "Head of Design",
    incumbent: "Sarah Jenkins",
    department: "Product Design",
    flightRisk: "Medium",
    successors: [
      { name: "Riya Sharma", initials: "RS", color: "bg-purple-100 text-purple-700", readiness: "Ready Now" },
    ],
  },
  {
    title: "Finance Director",
    incumbent: "James Wilson",
    department: "Finance",
    flightRisk: "High",
    successors: [
      { name: "Tom Harper",  initials: "TH", color: "bg-amber-100 text-amber-700", readiness: "12–24 Months"      },
      { name: "Nina Farouq", initials: "NF", color: "bg-rose-100 text-rose-700",   readiness: "Needs Development" },
    ],
  },
  {
    title: "HR Director",
    incumbent: "Priya Nair",
    department: "HR",
    flightRisk: "Low",
    successors: [
      { name: "Lucy Chan", initials: "LC", color: "bg-emerald-100 text-emerald-700", readiness: "6–12 Months" },
    ],
  },
];

const FLIGHT_COLOR: Record<KeyRole["flightRisk"], string> = {
  Low:    "text-emerald-600 bg-emerald-50",
  Medium: "text-amber-600 bg-amber-50",
  High:   "text-red-600 bg-red-50",
};

export const SuccessionPlanningPanel: React.FC = () => {
  const [expanded, setExpanded] = useState<string | null>(ROLES[0].title);

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center gap-2 mb-5">
        <span className="material-symbols-outlined text-indigo-500">account_tree</span>
        <h4 className="font-bold text-slate-800">Succession Planning</h4>
        <span className="ml-auto text-xs text-slate-400">{ROLES.length} key roles</span>
      </div>
      <div className="space-y-3">
        {ROLES.map((role) => {
          const isOpen = expanded === role.title;
          return (
            <div key={role.title} className="border border-slate-100 rounded-xl overflow-hidden">
              <button
                onClick={() => setExpanded(isOpen ? null : role.title)}
                className="w-full flex items-center gap-3 px-4 py-3 hover:bg-slate-50 transition-colors text-left"
              >
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-sm text-slate-800">{role.title}</p>
                  <p className="text-xs text-slate-500 truncate">
                    Incumbent: {role.incumbent} · {role.department}
                  </p>
                </div>
                <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full shrink-0 ${FLIGHT_COLOR[role.flightRisk]}`}>
                  {role.flightRisk} Risk
                </span>
                <span
                  className="material-symbols-outlined text-slate-300 shrink-0 text-sm transition-transform duration-200"
                  style={{ transform: isOpen ? "rotate(90deg)" : "rotate(0deg)" }}
                >
                  chevron_right
                </span>
              </button>

              {isOpen && (
                <div className="px-4 pb-4 bg-slate-50/50 border-t border-slate-100">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider pt-3 mb-2">
                    Successors
                  </p>
                  {role.successors.length === 0 ? (
                    <p className="text-xs text-red-500 italic">No successors identified — action required</p>
                  ) : (
                    <div className="space-y-2">
                      {role.successors.map((s) => (
                        <div key={s.name} className="flex items-center gap-3">
                          <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 ${s.color}`}>
                            {s.initials}
                          </div>
                          <p className="text-xs font-semibold text-slate-700 flex-1">{s.name}</p>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border shrink-0 ${READINESS_COLOR[s.readiness]}`}>
                            {s.readiness}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
