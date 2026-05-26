import React from "react";

interface SkeletonProps {
  className?: string;
  rows?: number;
}

export const Skeleton: React.FC<SkeletonProps> = ({ className = "", rows = 1 }) => (
  <>
    {Array.from({ length: rows }).map((_, i) => (
      <div
        key={i}
        className={`animate-pulse bg-slate-200 rounded-lg ${className}`}
      />
    ))}
  </>
);

export const SkeletonCard: React.FC = () => (
  <div className="bg-white p-6 rounded-xl shadow-sm animate-pulse">
    <div className="flex justify-between items-start mb-4">
      <div className="w-10 h-10 bg-slate-200 rounded-lg" />
      <div className="w-16 h-5 bg-slate-200 rounded" />
    </div>
    <div className="w-24 h-3 bg-slate-200 rounded mb-2" />
    <div className="w-32 h-7 bg-slate-200 rounded" />
  </div>
);

export const SkeletonRow: React.FC = () => (
  <tr className="animate-pulse">
    <td className="px-6 py-4">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-slate-200 rounded-full" />
        <div className="space-y-1.5">
          <div className="w-32 h-3 bg-slate-200 rounded" />
          <div className="w-24 h-2.5 bg-slate-200 rounded" />
        </div>
      </div>
    </td>
    {[1, 2, 3, 4].map((i) => (
      <td key={i} className="px-6 py-4">
        <div className="w-20 h-3 bg-slate-200 rounded" />
      </td>
    ))}
    <td className="px-6 py-4 text-right">
      <div className="w-8 h-3 bg-slate-200 rounded ml-auto" />
    </td>
  </tr>
);
