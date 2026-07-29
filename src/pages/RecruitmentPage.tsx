import React, { useState } from "react";
import { CostPerHireWidget } from "../components/CostPerHireWidget";
import { JobDescriptionLibrary } from "../components/JobDescriptionLibrary";

type Stage = "Applied" | "Screen" | "Interview" | "Offer" | "Hired";

interface Candidate {
  id: string;
  name: string;
  role: string;
  department: string;
  appliedDate: string;
  stage: Stage;
  initials: string;
  source: "LinkedIn" | "Indeed" | "Referral" | "Direct" | "Agency";
  tags: string[];
}

const STAGES: Stage[] = ["Applied", "Screen", "Interview", "Offer", "Hired"];

const STAGE_CONFIG: Record<Stage, { color: string; icon: string; bg: string; header: string }> = {
  Applied:   { color: "text-slate-600",   icon: "inbox",         bg: "bg-slate-100",  header: "bg-slate-200"  },
  Screen:    { color: "text-blue-600",    icon: "phone_in_talk", bg: "bg-blue-50",    header: "bg-blue-100"   },
  Interview: { color: "text-purple-600",  icon: "groups",        bg: "bg-purple-50",  header: "bg-purple-100" },
  Offer:     { color: "text-amber-600",   icon: "description",   bg: "bg-amber-50",   header: "bg-amber-100"  },
  Hired:     { color: "text-emerald-600", icon: "verified",      bg: "bg-emerald-50", header: "bg-emerald-100"},
};

const SOURCE_COLORS: Record<Candidate["source"], string> = {
  LinkedIn: "bg-blue-100 text-blue-700",
  Indeed:   "bg-indigo-100 text-indigo-700",
  Referral: "bg-purple-100 text-purple-700",
  Direct:   "bg-slate-100 text-slate-600",
  Agency:   "bg-rose-100 text-rose-700",
};

const SEED: Candidate[] = [
  { id: "1",  name: "James Patel",     role: "Senior Frontend Dev",  department: "Engineering",    appliedDate: "2026-07-10", stage: "Applied",   initials: "JP", source: "LinkedIn", tags: ["React", "TypeScript"] },
  { id: "2",  name: "Olivia Grant",    role: "UX Designer",          department: "Product Design", appliedDate: "2026-07-08", stage: "Applied",   initials: "OG", source: "Indeed",   tags: ["Figma", "UI/UX"] },
  { id: "3",  name: "Noah Williams",   role: "Backend Engineer",     department: "Engineering",    appliedDate: "2026-07-05", stage: "Screen",    initials: "NW", source: "Referral", tags: ["Node.js", "AWS"] },
  { id: "4",  name: "Ava Chen",        role: "Product Manager",      department: "Product Design", appliedDate: "2026-07-02", stage: "Screen",    initials: "AC", source: "LinkedIn", tags: ["Agile", "B2B"] },
  { id: "5",  name: "Liam Foster",     role: "Data Analyst",         department: "Analytics",      appliedDate: "2026-06-28", stage: "Interview", initials: "LF", source: "Direct",   tags: ["SQL", "Python"] },
  { id: "6",  name: "Sophia Turner",   role: "Marketing Executive",  department: "Marketing",      appliedDate: "2026-06-25", stage: "Interview", initials: "ST", source: "Agency",   tags: ["SEO", "Content"] },
  { id: "7",  name: "Ethan Moreira",   role: "DevOps Engineer",      department: "Engineering",    appliedDate: "2026-06-20", stage: "Offer",     initials: "EM", source: "Referral", tags: ["Docker", "K8s"] },
  { id: "8",  name: "Chloe Anand",     role: "HR Business Partner",  department: "HR",             appliedDate: "2026-06-18", stage: "Hired",     initials: "CA", source: "LinkedIn", tags: ["HRBP", "L&D"] },
  { id: "9",  name: "Daniel Okafor",   role: "Frontend Developer",   department: "Engineering",    appliedDate: "2026-07-12", stage: "Applied",   initials: "DO", source: "Indeed",   tags: ["Vue", "CSS"] },
  { id: "10", name: "Isabella Knight", role: "Finance Manager",      department: "Finance",        appliedDate: "2026-06-15", stage: "Hired",     initials: "IK", source: "Agency",   tags: ["ACCA", "FP&A"] },
];

const fmt = (d: string) =>
  new Date(d).toLocaleDateString("en-GB", { day: "numeric", month: "short" });

const RecruitmentPage: React.FC = () => {
  const [candidates, setCandidates] = useState<Candidate[]>(SEED);
  const [search, setSearch] = useState("");
  const [deptFilter, setDeptFilter] = useState("All");

  const departments = ["All", ...Array.from(new Set(SEED.map((c) => c.department))).sort()];

  const filtered = candidates.filter((c) => {
    const q = search.toLowerCase();
    const matchSearch = !q || c.name.toLowerCase().includes(q) || c.role.toLowerCase().includes(q);
    const matchDept = deptFilter === "All" || c.department === deptFilter;
    return matchSearch && matchDept;
  });

  const move = (id: string, direction: "next" | "prev") => {
    setCandidates((prev) =>
      prev.map((c) => {
        if (c.id !== id) return c;
        const idx = STAGES.indexOf(c.stage);
        const next = direction === "next" ? idx + 1 : idx - 1;
        if (next < 0 || next >= STAGES.length) return c;
        return { ...c, stage: STAGES[next] };
      })
    );
  };

  const byStage = (stage: Stage) => filtered.filter((c) => c.stage === stage);

  const total = candidates.length;
  const hired = candidates.filter((c) => c.stage === "Hired").length;
  const inProgress = candidates.filter((c) => c.stage !== "Hired" && c.stage !== "Applied").length;

  return (
    <>
      {/* Header */}
      <div className="flex justify-between items-end mb-10">
        <div>
          <h2 className="text-3xl font-extrabold text-slate-800 tracking-tight">Recruitment</h2>
          <p className="text-slate-500 mt-1 text-sm font-medium">
            Track candidates through the hiring pipeline.
          </p>
        </div>
        <div className="flex gap-2 text-xs font-bold">
          <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 text-slate-700">
            <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />{total} Total
          </span>
          <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-purple-100 text-purple-700">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />{inProgress} In Progress
          </span>
          <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-100 text-emerald-700">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />{hired} Hired
          </span>
        </div>
      </div>

      {/* Filter bar */}
      <div className="bg-slate-100 rounded-xl p-4 mb-6 flex flex-wrap items-center gap-4">
        <div className="relative flex-1 max-w-xs">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">search</span>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search name or role…"
            className="w-full pl-9 pr-4 py-2 bg-white rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-100 border-none"
          />
        </div>
        <div className="flex flex-wrap gap-1.5">
          {departments.map((d) => (
            <button
              key={d}
              onClick={() => setDeptFilter(d)}
              className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
                deptFilter === d ? "bg-blue-600 text-white shadow-sm" : "bg-white text-slate-600 hover:bg-slate-200"
              }`}
            >
              {d}
            </button>
          ))}
        </div>
      </div>

      {/* Kanban board */}
      <div className="grid grid-cols-5 gap-4 items-start">
        {STAGES.map((stage) => {
          const cfg = STAGE_CONFIG[stage];
          const cards = byStage(stage);
          return (
            <div key={stage} className={`rounded-xl ${cfg.bg} min-h-[200px]`}>
              {/* Column header */}
              <div className={`${cfg.header} rounded-t-xl px-4 py-3 flex items-center justify-between`}>
                <div className="flex items-center gap-2">
                  <span className={`material-symbols-outlined text-sm ${cfg.color}`}>{cfg.icon}</span>
                  <span className={`text-xs font-bold uppercase tracking-wider ${cfg.color}`}>{stage}</span>
                </div>
                <span className={`text-xs font-extrabold ${cfg.color}`}>{cards.length}</span>
              </div>

              {/* Cards */}
              <div className="p-3 space-y-3">
                {cards.length === 0 && (
                  <div className="py-6 text-center text-xs text-slate-400 italic">No candidates</div>
                )}
                {cards.map((c) => {
                  const stageIdx = STAGES.indexOf(c.stage);
                  return (
                    <div key={c.id} className="bg-white rounded-xl p-3.5 shadow-sm">
                      {/* Avatar + name */}
                      <div className="flex items-center gap-2.5 mb-2.5">
                        <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-[10px] font-bold shrink-0">
                          {c.initials}
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs font-bold text-slate-800 truncate">{c.name}</p>
                          <p className="text-[10px] text-slate-500 truncate">{c.role}</p>
                        </div>
                      </div>
                      {/* Tags */}
                      <div className="flex flex-wrap gap-1 mb-2.5">
                        {c.tags.map((t) => (
                          <span key={t} className="px-1.5 py-0.5 bg-slate-100 text-slate-600 rounded text-[10px] font-medium">{t}</span>
                        ))}
                      </div>
                      {/* Source + date */}
                      <div className="flex items-center justify-between mb-3">
                        <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${SOURCE_COLORS[c.source]}`}>{c.source}</span>
                        <span className="text-[10px] text-slate-400">{fmt(c.appliedDate)}</span>
                      </div>
                      {/* Move buttons */}
                      <div className="flex gap-1.5">
                        {stageIdx > 0 && (
                          <button
                            onClick={() => move(c.id, "prev")}
                            className="flex-1 py-1 text-[10px] font-bold text-slate-500 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors flex items-center justify-center gap-0.5"
                          >
                            <span className="material-symbols-outlined text-xs">arrow_back</span>
                            {STAGES[stageIdx - 1]}
                          </button>
                        )}
                        {stageIdx < STAGES.length - 1 && (
                          <button
                            onClick={() => move(c.id, "next")}
                            className="flex-1 py-1 text-[10px] font-bold text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors flex items-center justify-center gap-0.5"
                          >
                            {STAGES[stageIdx + 1]}
                            <span className="material-symbols-outlined text-xs">arrow_forward</span>
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
      {/* Cost per hire breakdown */}
      <CostPerHireWidget />
      {/* JD library */}
      <JobDescriptionLibrary />
    </>
  );
};

export default RecruitmentPage;
