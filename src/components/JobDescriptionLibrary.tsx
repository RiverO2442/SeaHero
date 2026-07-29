import React, { useState } from "react";

interface JDTemplate {
  id: string;
  title: string;
  department: string;
  level: "Junior" | "Mid" | "Senior" | "Lead" | "Manager";
  employmentType: "Full-time" | "Part-time" | "Contract";
  summary: string;
  responsibilities: string[];
  requirements: string[];
}

const TEMPLATES: JDTemplate[] = [
  {
    id: "jd1", title: "Frontend Engineer", department: "Engineering", level: "Mid", employmentType: "Full-time",
    summary: "Build and maintain responsive web interfaces using React and TypeScript.",
    responsibilities: ["Develop reusable React components", "Collaborate with designers on UI/UX", "Write unit and integration tests", "Participate in code reviews"],
    requirements: ["3+ years React experience", "TypeScript proficiency", "Familiarity with CSS frameworks", "Git workflow"],
  },
  {
    id: "jd2", title: "Product Designer", department: "Design", level: "Senior", employmentType: "Full-time",
    summary: "Lead end-to-end product design from research to high-fidelity prototypes.",
    responsibilities: ["Conduct user research and usability testing", "Create wireframes and prototypes in Figma", "Define design systems and components", "Work closely with engineering"],
    requirements: ["5+ years product design experience", "Expert Figma skills", "Portfolio of shipped products", "User research methods"],
  },
  {
    id: "jd3", title: "DevOps Engineer", department: "Engineering", level: "Mid", employmentType: "Full-time",
    summary: "Maintain and improve CI/CD pipelines and cloud infrastructure.",
    responsibilities: ["Manage AWS/GCP infrastructure", "Build and maintain CI/CD pipelines", "Monitor application performance", "Incident response and on-call"],
    requirements: ["Experience with AWS or GCP", "Docker and Kubernetes", "Terraform or Pulumi", "Strong scripting skills (Bash/Python)"],
  },
  {
    id: "jd4", title: "Account Executive", department: "Sales", level: "Mid", employmentType: "Full-time",
    summary: "Drive revenue by owning the full sales cycle from prospecting to close.",
    responsibilities: ["Prospect and qualify new leads", "Manage pipeline in CRM", "Deliver product demos", "Negotiate and close deals"],
    requirements: ["2+ years B2B SaaS sales", "Proven quota attainment", "Strong communication skills", "CRM experience (Salesforce)"],
  },
  {
    id: "jd5", title: "HR Business Partner", department: "HR", level: "Senior", employmentType: "Full-time",
    summary: "Partner with business leaders to drive people strategy and employee experience.",
    responsibilities: ["Advise managers on HR policies", "Lead talent reviews and succession planning", "Manage employee relations", "Drive D&I initiatives"],
    requirements: ["CIPD Level 5+", "5+ years HRBP experience", "Strong stakeholder management", "Employment law knowledge (UK)"],
  },
  {
    id: "jd6", title: "Marketing Manager", department: "Marketing", level: "Manager", employmentType: "Full-time",
    summary: "Own the marketing strategy, campaigns, and content roadmap.",
    responsibilities: ["Define and execute marketing strategy", "Manage marketing budget", "Lead a team of 3 marketers", "Track KPIs and report to leadership"],
    requirements: ["5+ years B2B marketing", "Team leadership experience", "Strong analytical skills", "Experience with HubSpot or Marketo"],
  },
];

const LEVEL_COLORS: Record<string, string> = {
  Junior:  "bg-green-100 text-green-700",
  Mid:     "bg-blue-100 text-blue-700",
  Senior:  "bg-violet-100 text-violet-700",
  Lead:    "bg-amber-100 text-amber-700",
  Manager: "bg-rose-100 text-rose-700",
};

const DEPT_ICONS: Record<string, string> = {
  Engineering: "code",
  Design:      "palette",
  Sales:       "handshake",
  HR:          "badge",
  Marketing:   "campaign",
  Finance:     "account_balance",
};

interface Props {
  onUseTemplate?: (jd: JDTemplate) => void;
}

export const JobDescriptionLibrary: React.FC<Props> = ({ onUseTemplate }) => {
  const [search, setSearch] = useState("");
  const [deptFilter, setDeptFilter] = useState("All");
  const [selected, setSelected] = useState<JDTemplate>(TEMPLATES[0]);

  const depts = ["All", ...Array.from(new Set(TEMPLATES.map(t => t.department)))];

  const visible = TEMPLATES.filter(t => {
    const q = search.toLowerCase();
    const matchQ = !q || t.title.toLowerCase().includes(q) || t.department.toLowerCase().includes(q);
    const matchD = deptFilter === "All" || t.department === deptFilter;
    return matchQ && matchD;
  });

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden">
      <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-700">
        <h2 className="text-base font-semibold text-slate-800 dark:text-slate-100">Job Description Library</h2>
        <p className="text-xs text-slate-500 mt-0.5">Reusable JD templates — select to view or use</p>
      </div>

      <div className="flex h-[480px]">
        {/* List panel */}
        <div className="w-72 border-r border-slate-100 dark:border-slate-700 flex flex-col">
          <div className="p-3 space-y-2 border-b border-slate-100 dark:border-slate-700">
            <div className="relative">
              <span className="material-symbols-outlined absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm">search</span>
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search roles…"
                className="w-full pl-8 pr-3 py-1.5 text-sm bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800 dark:text-slate-100" />
            </div>
            <div className="flex gap-1 flex-wrap">
              {depts.map(d => (
                <button key={d} onClick={() => setDeptFilter(d)}
                  className={`px-2.5 py-0.5 rounded-full text-xs font-medium transition-colors ${deptFilter === d ? "bg-blue-600 text-white" : "bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200"}`}>
                  {d}
                </button>
              ))}
            </div>
          </div>

          <div className="flex-1 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-700">
            {visible.length === 0 && (
              <div className="flex flex-col items-center justify-center h-32 text-slate-400 text-xs">No templates found</div>
            )}
            {visible.map(t => (
              <button key={t.id} onClick={() => setSelected(t)}
                className={`w-full text-left p-4 hover:bg-slate-50 dark:hover:bg-slate-700/40 transition-colors ${selected.id === t.id ? "bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500" : ""}`}>
                <div className="flex items-center gap-2 mb-1">
                  <span className="material-symbols-outlined text-base text-slate-400">{DEPT_ICONS[t.department] ?? "work"}</span>
                  <p className="text-sm font-semibold text-slate-800 dark:text-slate-100 truncate">{t.title}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${LEVEL_COLORS[t.level]}`}>{t.level}</span>
                  <span className="text-[10px] text-slate-400">{t.department}</span>
                  <span className="text-[10px] text-slate-400">· {t.employmentType}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Detail panel */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">{selected.title}</h3>
              <div className="flex items-center gap-2 mt-1">
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${LEVEL_COLORS[selected.level]}`}>{selected.level}</span>
                <span className="text-xs text-slate-500">{selected.department} · {selected.employmentType}</span>
              </div>
            </div>
            {onUseTemplate && (
              <button onClick={() => onUseTemplate(selected)}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg transition-colors shrink-0">
                <span className="material-symbols-outlined text-base">content_copy</span>
                Use Template
              </button>
            )}
          </div>

          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">Role Summary</p>
            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">{selected.summary}</p>
          </div>

          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">Responsibilities</p>
            <ul className="space-y-1.5">
              {selected.responsibilities.map((r, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-300">
                  <span className="material-symbols-outlined text-blue-400 text-sm mt-0.5 shrink-0">check_circle</span>
                  {r}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">Requirements</p>
            <ul className="space-y-1.5">
              {selected.requirements.map((r, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-300">
                  <span className="material-symbols-outlined text-violet-400 text-sm mt-0.5 shrink-0">star</span>
                  {r}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
