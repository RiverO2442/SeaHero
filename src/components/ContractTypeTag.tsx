import React from "react";

export type ContractType = "Full-time" | "Part-time" | "Contract" | "Intern";

const STYLES: Record<ContractType, string> = {
  "Full-time": "bg-blue-100 text-blue-700",
  "Part-time": "bg-amber-100 text-amber-700",
  "Contract": "bg-purple-100 text-purple-700",
  "Intern": "bg-emerald-100 text-emerald-700",
};

export const ContractTypeTag: React.FC<{ type: ContractType }> = ({ type }) => (
  <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-bold ${STYLES[type]}`}>
    {type}
  </span>
);
