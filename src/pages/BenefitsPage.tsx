import React, { useState } from "react";

type BenefitCategory = "Health" | "Pension" | "Perks" | "Insurance";

interface Benefit {
  id: string;
  name: string;
  category: BenefitCategory;
  description: string;
  provider: string;
  monthlyCost: number;
  enrolled: number;
  eligible: number;
  icon: string;
  color: string;
}

const BENEFITS: Benefit[] = [
  { id: "1", name: "BUPA Health Cover",       category: "Health",    description: "Comprehensive private medical cover incl. dental and optical add-ons.",  provider: "BUPA",           monthlyCost: 89,  enrolled: 312, eligible: 400, icon: "health_and_safety", color: "text-rose-500 bg-rose-50" },
  { id: "2", name: "Company Pension (5%)",     category: "Pension",   description: "Employer 5% contribution on top of statutory minimum, auto-enrolled.",    provider: "Nest",           monthlyCost: 226, enrolled: 398, eligible: 400, icon: "savings",           color: "text-blue-500 bg-blue-50" },
  { id: "3", name: "Life Insurance (4x)",      category: "Insurance", description: "Group life cover: 4× annual salary paid to nominated beneficiaries.",      provider: "Legal & General",monthlyCost: 18,  enrolled: 388, eligible: 400, icon: "shield",            color: "text-indigo-500 bg-indigo-50" },
  { id: "4", name: "Cycle to Work",            category: "Perks",     description: "Tax-efficient bike purchase scheme — up to £3,000 saved.",                 provider: "Cyclescheme",    monthlyCost: 0,   enrolled: 67,  eligible: 400, icon: "directions_bike",   color: "text-emerald-500 bg-emerald-50" },
  { id: "5", name: "Gym Membership",           category: "Perks",     description: "Discounted access to 1,000+ UK gyms via the corporate wellness plan.",     provider: "Gympass",        monthlyCost: 30,  enrolled: 142, eligible: 400, icon: "fitness_center",    color: "text-amber-500 bg-amber-50" },
  { id: "6", name: "Mental Health Support",    category: "Health",    description: "24/7 employee assistance programme and 6 free counselling sessions/yr.",   provider: "Health Assured", monthlyCost: 8,   enrolled: 400, eligible: 400, icon: "psychology",        color: "text-purple-500 bg-purple-50" },
  { id: "7", name: "Season Ticket Loan",       category: "Perks",     description: "Interest-free commuter rail loan repaid via payroll over 12 months.",      provider: "Internal",       monthlyCost: 0,   enrolled: 54,  eligible: 400, icon: "train",             color: "text-sky-500 bg-sky-50" },
  { id: "8", name: "Income Protection (75%)",  category: "Insurance", description: "75% of salary covered for up to 5 years if unable to work through illness.",provider: "Aviva",          monthlyCost: 24,  enrolled: 280, eligible: 400, icon: "security",          color: "text-teal-500 bg-teal-50" },
];

const CAT_COLORS: Record<BenefitCategory, string> = {
  Health:    "bg-rose-100 text-rose-700",
  Pension:   "bg-blue-100 text-blue-700",
  Insurance: "bg-indigo-100 text-indigo-700",
  Perks:     "bg-emerald-100 text-emerald-700",
};

const BenefitsPage: React.FC = () => {
  const [catFilter, setCatFilter] = useState<BenefitCategory | "All">("All");
  const [selected, setSelected] = useState<Benefit | null>(null);

  const filtered = catFilter === "All" ? BENEFITS : BENEFITS.filter((b) => b.category === catFilter);
  const totalMonthly = BENEFITS.reduce((s, b) => s + b.monthlyCost * b.enrolled, 0);
  const avgEnrollment = Math.round(BENEFITS.reduce((s, b) => s + (b.enrolled / b.eligible) * 100, 0) / BENEFITS.length);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-800">Benefits Management</h2>
          <p className="text-slate-500 font-medium mt-1">Health, pension, perks and insurance programmes for your workforce.</p>
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-4 gap-5">
        {[
          { label: "Total Benefits",       value: BENEFITS.length,    sub: "Active schemes",             icon: "star",             color: "text-blue-500 bg-blue-50" },
          { label: "Avg Enrolment",         value: `${avgEnrollment}%`, sub: "Across all schemes",         icon: "group",            color: "text-emerald-500 bg-emerald-50" },
          { label: "Monthly Spend",         value: `£${(totalMonthly/1000).toFixed(0)}k`, sub: "All enrolled staff", icon: "account_balance_wallet", color: "text-purple-500 bg-purple-50" },
          { label: "Fully Enrolled",        value: BENEFITS.filter((b) => b.enrolled === b.eligible).length, sub: "100% take-up schemes", icon: "verified", color: "text-amber-500 bg-amber-50" },
        ].map((c) => (
          <div key={c.label} className="bg-white rounded-xl shadow-sm p-5">
            <div className={`w-9 h-9 rounded-lg flex items-center justify-center mb-3 ${c.color}`}>
              <span className="material-symbols-outlined">{c.icon}</span>
            </div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">{c.label}</p>
            <h3 className="text-2xl font-extrabold text-slate-800 mt-1">{c.value}</h3>
            <p className="text-xs text-slate-400 mt-1">{c.sub}</p>
          </div>
        ))}
      </div>

      {/* Category filter */}
      <div className="flex gap-2">
        {(["All", "Health", "Pension", "Insurance", "Perks"] as const).map((c) => (
          <button
            key={c}
            onClick={() => setCatFilter(c)}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${catFilter === c ? "bg-blue-600 text-white shadow-md shadow-blue-200" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Benefits grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {filtered.map((b) => {
          const pct = Math.round((b.enrolled / b.eligible) * 100);
          return (
            <div
              key={b.id}
              onClick={() => setSelected(b)}
              className="bg-white rounded-xl shadow-sm p-5 cursor-pointer hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${b.color}`}>
                  <span className="material-symbols-outlined">{b.icon}</span>
                </div>
                <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${CAT_COLORS[b.category]}`}>{b.category}</span>
              </div>
              <h4 className="font-bold text-slate-800 text-sm mb-1">{b.name}</h4>
              <p className="text-xs text-slate-400 mb-3 leading-relaxed line-clamp-2">{b.description}</p>
              <div className="flex justify-between text-xs text-slate-500 mb-2">
                <span>{b.enrolled}/{b.eligible} enrolled</span>
                <span className="font-bold text-slate-700">{pct}%</span>
              </div>
              <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden mb-3">
                <div className={`h-full rounded-full ${pct === 100 ? "bg-emerald-500" : "bg-blue-500"}`} style={{ width: `${pct}%` }} />
              </div>
              <p className="text-xs text-slate-400">
                {b.monthlyCost > 0 ? `£${b.monthlyCost}/mo per employee · ` : "No cost · "}
                <span className="font-medium">{b.provider}</span>
              </p>
            </div>
          );
        })}
      </div>

      {/* Detail modal */}
      {selected && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setSelected(null)}>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-5">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${selected.color}`}>
                <span className="material-symbols-outlined">{selected.icon}</span>
              </div>
              <button onClick={() => setSelected(null)} className="p-2 hover:bg-slate-100 rounded-lg text-slate-400"><span className="material-symbols-outlined">close</span></button>
            </div>
            <h3 className="font-extrabold text-slate-800 text-lg mb-1">{selected.name}</h3>
            <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${CAT_COLORS[selected.category]}`}>{selected.category}</span>
            <p className="text-sm text-slate-600 mt-4 leading-relaxed">{selected.description}</p>
            <div className="mt-5 space-y-3 text-sm">
              {[
                ["Provider",        selected.provider],
                ["Enrolled",        `${selected.enrolled} / ${selected.eligible} employees`],
                ["Monthly cost",    selected.monthlyCost > 0 ? `£${selected.monthlyCost} per employee` : "Free"],
                ["Total monthly",   selected.monthlyCost > 0 ? `£${(selected.monthlyCost * selected.enrolled).toLocaleString()}` : "—"],
              ].map(([l, v]) => (
                <div key={l} className="flex justify-between border-b border-slate-100 pb-2 last:border-0">
                  <span className="text-slate-500">{l}</span>
                  <span className="font-semibold text-slate-800">{v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BenefitsPage;
