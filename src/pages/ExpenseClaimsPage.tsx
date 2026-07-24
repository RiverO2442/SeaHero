import React, { useState } from "react";

type ClaimStatus = "Pending" | "Approved" | "Rejected";
type Category = "Travel" | "Software" | "Office Supplies" | "Training" | "Meals" | "Equipment";

interface ExpenseClaim {
  id: string;
  employee: string;
  initials: string;
  avatarColor: string;
  department: string;
  category: Category;
  description: string;
  amount: number;
  date: string;
  status: ClaimStatus;
  receipt: boolean;
}

const SEED: ExpenseClaim[] = [
  { id: "1", employee: "Marcus Chen",     initials: "MC", avatarColor: "bg-blue-100 text-blue-700",      department: "Engineering",    category: "Software",       description: "JetBrains IDE annual licence",   amount: 249,  date: "2026-07-20", status: "Pending",  receipt: true },
  { id: "2", employee: "Sarah Jenkins",   initials: "SJ", avatarColor: "bg-purple-100 text-purple-700",  department: "Product Design", category: "Software",       description: "Figma Pro subscription",         amount: 180,  date: "2026-07-19", status: "Approved", receipt: true },
  { id: "3", employee: "David Okoro",     initials: "DO", avatarColor: "bg-blue-100 text-blue-700",      department: "Engineering",    category: "Training",       description: "AWS Solutions Architect course",  amount: 399,  date: "2026-07-18", status: "Pending",  receipt: true },
  { id: "4", employee: "Elena Rodriguez", initials: "ER", avatarColor: "bg-slate-200 text-slate-700",   department: "Operations",     category: "Travel",         description: "Client visit — Birmingham rail",  amount: 62,   date: "2026-07-17", status: "Approved", receipt: true },
  { id: "5", employee: "Maya Thompson",   initials: "MT", avatarColor: "bg-emerald-100 text-emerald-700",department: "Marketing",      category: "Meals",          description: "Team lunch — campaign kickoff",   amount: 87,   date: "2026-07-16", status: "Rejected", receipt: false },
  { id: "6", employee: "James Wilson",    initials: "JW", avatarColor: "bg-amber-100 text-amber-700",   department: "Finance",        category: "Office Supplies",description: "Printer ink + paper restock",     amount: 34,   date: "2026-07-15", status: "Approved", receipt: true },
  { id: "7", employee: "Priya Nair",      initials: "PN", avatarColor: "bg-rose-100 text-rose-700",     department: "HR",             category: "Training",       description: "CIPD workshop attendance",        amount: 295,  date: "2026-07-14", status: "Pending",  receipt: true },
  { id: "8", employee: "Tom Bradley",     initials: "TB", avatarColor: "bg-indigo-100 text-indigo-700", department: "Engineering",    category: "Equipment",      description: "USB-C hub + monitor stand",       amount: 118,  date: "2026-07-13", status: "Pending",  receipt: false },
];

const CAT_COLORS: Record<Category, string> = {
  Travel:          "bg-sky-100 text-sky-700",
  Software:        "bg-blue-100 text-blue-700",
  "Office Supplies":"bg-slate-200 text-slate-600",
  Training:        "bg-purple-100 text-purple-700",
  Meals:           "bg-amber-100 text-amber-700",
  Equipment:       "bg-emerald-100 text-emerald-700",
};

const STATUS_STYLES: Record<ClaimStatus, string> = {
  Pending:  "bg-amber-50 text-amber-700 border-amber-200",
  Approved: "bg-emerald-50 text-emerald-700 border-emerald-200",
  Rejected: "bg-red-50 text-red-600 border-red-200",
};

const CATEGORIES: Category[] = ["Travel", "Software", "Office Supplies", "Training", "Meals", "Equipment"];

const ExpenseClaimsPage: React.FC = () => {
  const [claims, setClaims] = useState<ExpenseClaim[]>(SEED);
  const [statusFilter, setStatusFilter] = useState<ClaimStatus | "All">("All");
  const [catFilter, setCatFilter] = useState<Category | "All">("All");
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ description: "", amount: "", category: "Travel" as Category });

  const filtered = claims.filter((c) => {
    const sMatch = statusFilter === "All" || c.status === statusFilter;
    const cMatch = catFilter === "All" || c.category === catFilter;
    return sMatch && cMatch;
  });

  const pending  = claims.filter((c) => c.status === "Pending").length;
  const totalPending = claims.filter((c) => c.status === "Pending").reduce((s, c) => s + c.amount, 0);
  const totalApproved = claims.filter((c) => c.status === "Approved").reduce((s, c) => s + c.amount, 0);

  const act = (id: string, status: ClaimStatus) => {
    setClaims((prev) => prev.map((c) => c.id === id ? { ...c, status } : c));
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.description || !form.amount) return;
    setClaims((prev) => [{
      id: String(Date.now()),
      employee: "Alex Thompson",
      initials: "AT",
      avatarColor: "bg-blue-600 text-white",
      department: "Management",
      category: form.category,
      description: form.description,
      amount: Number(form.amount),
      date: new Date().toISOString().slice(0, 10),
      status: "Pending",
      receipt: false,
    }, ...prev]);
    setForm({ description: "", amount: "", category: "Travel" });
    setShowForm(false);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-800">Expense Claims</h2>
          <p className="text-slate-500 font-medium mt-1">Submit, approve, and track expense reimbursements.</p>
        </div>
        <button onClick={() => setShowForm(true)} className="px-5 py-2.5 bg-gradient-to-br from-blue-600 to-blue-700 text-white text-sm font-semibold rounded-lg shadow-lg shadow-blue-200 hover:scale-[1.02] transition-transform flex items-center gap-2">
          <span className="material-symbols-outlined text-lg">add</span>
          Submit Claim
        </button>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-3 gap-6">
        {[
          { label: "Pending Claims", value: pending, sub: `£${totalPending.toLocaleString()} awaiting`, color: "text-amber-600", bg: "bg-amber-50", icon: "pending_actions" },
          { label: "Approved (Month)", value: claims.filter((c) => c.status === "Approved").length, sub: `£${totalApproved.toLocaleString()} paid`, color: "text-emerald-600", bg: "bg-emerald-50", icon: "check_circle" },
          { label: "Rejected", value: claims.filter((c) => c.status === "Rejected").length, sub: "This period", color: "text-red-500", bg: "bg-red-50", icon: "cancel" },
        ].map((card) => (
          <div key={card.label} className="bg-white rounded-xl shadow-sm p-5">
            <div className={`w-9 h-9 ${card.bg} rounded-lg flex items-center justify-center ${card.color} mb-3`}>
              <span className="material-symbols-outlined">{card.icon}</span>
            </div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">{card.label}</p>
            <h3 className={`text-3xl font-extrabold mt-1 ${card.color}`}>{card.value}</h3>
            <p className="text-xs text-slate-400 mt-1">{card.sub}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 items-center">
        <div className="flex bg-slate-100 p-1 rounded-lg">
          {(["All", "Pending", "Approved", "Rejected"] as const).map((s) => (
            <button key={s} onClick={() => setStatusFilter(s)} className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all ${statusFilter === s ? "bg-white shadow-sm text-slate-800" : "text-slate-500 hover:text-slate-700"}`}>{s}</button>
          ))}
        </div>
        <div className="relative">
          <select value={catFilter} onChange={(e) => setCatFilter(e.target.value as Category | "All")} className="appearance-none bg-white border border-slate-200 rounded-lg py-2 pl-4 pr-8 text-sm font-medium outline-none">
            <option value="All">All Categories</option>
            {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
          </select>
          <span className="material-symbols-outlined absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 text-sm">expand_more</span>
        </div>
        <span className="text-xs text-slate-400 ml-auto">{filtered.length} claims</span>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-100">
              {["Employee", "Category", "Description", "Date", "Amount", "Receipt", "Status", "Actions"].map((h) => (
                <th key={h} className="px-5 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filtered.map((c) => (
              <tr key={c.id} className="hover:bg-slate-50/60 transition-colors group">
                <td className="px-5 py-4">
                  <div className="flex items-center gap-2">
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${c.avatarColor}`}>{c.initials}</div>
                    <div>
                      <p className="text-sm font-bold text-slate-800">{c.employee}</p>
                      <p className="text-xs text-slate-400">{c.department}</p>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-4">
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${CAT_COLORS[c.category]}`}>{c.category}</span>
                </td>
                <td className="px-5 py-4 text-sm text-slate-600 max-w-[180px] truncate">{c.description}</td>
                <td className="px-5 py-4 text-xs text-slate-500">{c.date}</td>
                <td className="px-5 py-4 font-bold text-slate-800">£{c.amount.toLocaleString()}</td>
                <td className="px-5 py-4">
                  {c.receipt
                    ? <span className="material-symbols-outlined text-emerald-500">receipt_long</span>
                    : <span className="material-symbols-outlined text-slate-300">receipt_long</span>}
                </td>
                <td className="px-5 py-4">
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${STATUS_STYLES[c.status]}`}>{c.status}</span>
                </td>
                <td className="px-5 py-4">
                  {c.status === "Pending" && (
                    <div className="flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => act(c.id, "Approved")} className="px-2.5 py-1 bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold rounded-lg transition-colors">Approve</button>
                      <button onClick={() => act(c.id, "Rejected")} className="px-2.5 py-1 bg-red-500 hover:bg-red-600 text-white text-xs font-bold rounded-lg transition-colors">Reject</button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div className="py-12 text-center text-slate-400 text-sm">
            <span className="material-symbols-outlined text-3xl block mb-2">receipt_long</span>
            No claims match the current filters.
          </div>
        )}
      </div>

      {/* Submit claim modal */}
      {showForm && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowForm(false)}>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-bold text-slate-800">Submit Expense Claim</h3>
              <button onClick={() => setShowForm(false)} className="p-2 hover:bg-slate-100 rounded-lg text-slate-400"><span className="material-symbols-outlined">close</span></button>
            </div>
            <form onSubmit={submit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">Category</label>
                <select value={form.category} onChange={(e) => setForm((f) => ({ ...f, category: e.target.value as Category }))} className="w-full appearance-none px-4 py-2.5 rounded-lg border border-slate-200 text-sm outline-none focus:border-blue-400 bg-white">
                  {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">Description</label>
                <input type="text" value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} placeholder="What was this expense for?" className="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">Amount (£)</label>
                <input type="number" min="0" step="0.01" value={form.amount} onChange={(e) => setForm((f) => ({ ...f, amount: e.target.value }))} placeholder="0.00" className="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50" />
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowForm(false)} className="flex-1 py-2.5 rounded-lg border border-slate-200 text-sm font-semibold text-slate-600 hover:bg-slate-50">Cancel</button>
                <button type="submit" className="flex-1 py-2.5 rounded-lg bg-gradient-to-br from-blue-600 to-blue-700 text-white text-sm font-bold shadow-md shadow-blue-200">Submit</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExpenseClaimsPage;
