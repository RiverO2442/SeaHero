import React from "react";

export type PayGrade = "L1" | "L2" | "L3" | "L4" | "L5" | "L6";

const GRADE_STYLES: Record<PayGrade, { bg: string; text: string }> = {
  L1: { bg: "bg-slate-100", text: "text-slate-500" },
  L2: { bg: "bg-blue-50",   text: "text-blue-600"  },
  L3: { bg: "bg-indigo-50", text: "text-indigo-600" },
  L4: { bg: "bg-purple-50", text: "text-purple-600" },
  L5: { bg: "bg-amber-50",  text: "text-amber-600"  },
  L6: { bg: "bg-emerald-50",text: "text-emerald-600"},
};

interface Props {
  grade: PayGrade;
}

export const PayGradeTag: React.FC<Props> = ({ grade }) => {
  const s = GRADE_STYLES[grade] ?? { bg: "bg-slate-100", text: "text-slate-500" };
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold tracking-wider ${s.bg} ${s.text}`}>
      {grade}
    </span>
  );
};
