import React, { useState } from "react";

interface OrgNode {
  id: string;
  name: string;
  role: string;
  initials: string;
  color: string;
  children?: OrgNode[];
}

const ORG: OrgNode = {
  id: "ceo",
  name: "Alex Thompson",
  role: "CEO",
  initials: "AT",
  color: "bg-blue-600 text-white",
  children: [
    {
      id: "cto",
      name: "Marcus Chen",
      role: "CTO",
      initials: "MC",
      color: "bg-blue-100 text-blue-700",
      children: [
        { id: "fe",  name: "David Okoro",    role: "DevOps Lead",       initials: "DO", color: "bg-blue-50 text-blue-600" },
        { id: "be",  name: "Tom Bradley",    role: "Junior Developer",  initials: "TB", color: "bg-blue-50 text-blue-600" },
      ],
    },
    {
      id: "cpo",
      name: "Sarah Jenkins",
      role: "CPO",
      initials: "SJ",
      color: "bg-purple-100 text-purple-700",
      children: [
        { id: "ux", name: "Lisa Park",   role: "UX Researcher",   initials: "LP", color: "bg-purple-50 text-purple-600" },
      ],
    },
    {
      id: "coo",
      name: "Elena Rodriguez",
      role: "COO",
      initials: "ER",
      color: "bg-slate-200 text-slate-700",
      children: [
        { id: "mkt", name: "Maya Thompson", role: "Content Lead",     initials: "MT", color: "bg-emerald-50 text-emerald-600" },
        { id: "fin", name: "James Wilson",  role: "Senior Accountant",initials: "JW", color: "bg-amber-50 text-amber-600" },
        { id: "hr",  name: "Priya Nair",   role: "HR Business Partner",initials:"PN", color: "bg-rose-50 text-rose-600" },
      ],
    },
  ],
};

const NodeCard: React.FC<{ node: OrgNode; depth: number; expanded: Set<string>; toggle: (id: string) => void }> = ({ node, depth, expanded, toggle }) => {
  const hasChildren = !!node.children?.length;
  const isOpen = expanded.has(node.id);

  return (
    <div className="flex flex-col items-center">
      <div className="relative">
        <button
          onClick={() => hasChildren && toggle(node.id)}
          className={`flex flex-col items-center p-3 rounded-xl border-2 shadow-sm transition-all min-w-[100px] text-center ${node.color} ${hasChildren ? "cursor-pointer hover:shadow-md" : "cursor-default"} border-white`}
        >
          <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold mb-1 ${depth === 0 ? "bg-white/20" : "bg-white/60"}`}>
            {node.initials}
          </div>
          <p className="text-xs font-bold leading-tight">{node.name.split(" ")[0]}</p>
          <p className="text-[9px] opacity-70 mt-0.5 leading-tight">{node.role}</p>
          {hasChildren && (
            <span className="material-symbols-outlined text-xs mt-1 opacity-60">
              {isOpen ? "expand_less" : "expand_more"}
            </span>
          )}
        </button>
      </div>

      {hasChildren && isOpen && (
        <div className="flex flex-col items-center">
          <div className="w-px h-5 bg-slate-300" />
          <div className="flex items-start gap-4">
            {node.children!.map((child, idx) => (
              <div key={child.id} className="flex flex-col items-center">
                {node.children!.length > 1 && (
                  <div className="relative h-5 w-full flex justify-center">
                    {idx === 0 && <div className="absolute top-0 right-0 left-1/2 h-px bg-slate-300 top-[50%]" />}
                    {idx === node.children!.length - 1 && <div className="absolute top-0 left-0 right-1/2 h-px bg-slate-300 top-[50%]" />}
                    {idx > 0 && idx < node.children!.length - 1 && <div className="absolute inset-x-0 h-px bg-slate-300 top-[50%]" />}
                    <div className="w-px h-1/2 bg-slate-300 self-end" />
                  </div>
                )}
                <NodeCard node={child} depth={depth + 1} expanded={expanded} toggle={toggle} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export const TeamOrgChart: React.FC = () => {
  const [expanded, setExpanded] = useState<Set<string>>(new Set(["ceo", "coo"]));

  const toggle = (id: string) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center gap-2 mb-6">
        <span className="material-symbols-outlined text-blue-500">account_tree</span>
        <h4 className="font-bold text-slate-800">Team Org Chart</h4>
        <span className="text-xs text-slate-400 ml-auto">Click a node to expand/collapse</span>
      </div>
      <div className="overflow-x-auto">
        <div className="flex justify-center min-w-max pb-4">
          <NodeCard node={ORG} depth={0} expanded={expanded} toggle={toggle} />
        </div>
      </div>
    </div>
  );
};
