import React, { useState } from "react";

interface Doc {
  name: string;
  type: "Contract" | "ID" | "Certificate" | "Offer Letter" | "NDA";
  date: string;
  size: string;
}

const DOC_ICON: Record<Doc["type"], string> = {
  Contract:       "description",
  ID:             "badge",
  Certificate:    "workspace_premium",
  "Offer Letter": "mail",
  NDA:            "policy",
};

const DOC_COLOR: Record<Doc["type"], string> = {
  Contract:       "text-blue-600 bg-blue-50",
  ID:             "text-purple-600 bg-purple-50",
  Certificate:    "text-amber-600 bg-amber-50",
  "Offer Letter": "text-emerald-600 bg-emerald-50",
  NDA:            "text-slate-600 bg-slate-100",
};

const DOCS: Doc[] = [
  { name: "Employment Contract", type: "Contract",       date: "2024-03-15", size: "142 KB" },
  { name: "Passport Copy",       type: "ID",             date: "2024-03-15", size: "2.1 MB" },
  { name: "AWS Certification",   type: "Certificate",    date: "2025-11-02", size: "318 KB" },
  { name: "Offer Letter",        type: "Offer Letter",   date: "2024-03-01", size: "88 KB"  },
  { name: "NDA Agreement",       type: "NDA",            date: "2024-03-15", size: "96 KB"  },
];

export const DocumentVaultWidget: React.FC = () => {
  const [search, setSearch] = useState("");

  const filtered = DOCS.filter(
    (d) =>
      !search ||
      d.name.toLowerCase().includes(search.toLowerCase()) ||
      d.type.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="px-6 py-5 border-t border-slate-100">
      <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Document Vault</p>
      <div className="relative mb-3">
        <span className="material-symbols-outlined absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm">
          search
        </span>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search documents…"
          className="w-full pl-8 pr-3 py-1.5 bg-slate-50 rounded-lg text-xs outline-none focus:ring-2 focus:ring-blue-100 border border-slate-100"
        />
      </div>
      <div className="space-y-1">
        {filtered.map((doc) => (
          <div
            key={doc.name}
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50 transition-colors group"
          >
            <div className={`p-1.5 rounded-lg shrink-0 ${DOC_COLOR[doc.type]}`}>
              <span className="material-symbols-outlined text-sm">{DOC_ICON[doc.type]}</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-slate-700 truncate">{doc.name}</p>
              <p className="text-[10px] text-slate-400">
                {doc.type} · {doc.size}
              </p>
            </div>
            <button
              className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-slate-200 rounded"
              title="Download"
            >
              <span className="material-symbols-outlined text-sm text-slate-400">download</span>
            </button>
          </div>
        ))}
        {filtered.length === 0 && (
          <p className="text-xs text-slate-400 italic py-2 text-center">No documents found</p>
        )}
      </div>
      <button className="mt-3 w-full py-2 bg-slate-50 border border-dashed border-slate-200 rounded-lg text-xs font-semibold text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors flex items-center justify-center gap-1.5">
        <span className="material-symbols-outlined text-sm">upload</span>
        Upload Document
      </button>
    </div>
  );
};
