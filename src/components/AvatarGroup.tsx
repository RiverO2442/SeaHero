import React from "react";

interface AvatarGroupItem {
  name: string;
  src?: string;
  color?: string;
}

interface AvatarGroupProps {
  avatars: AvatarGroupItem[];
  max?: number;
  size?: "sm" | "md";
}

const SIZE = { sm: "w-7 h-7 text-[10px]", md: "w-9 h-9 text-xs" };

function initials(name: string) {
  const p = name.trim().split(/\s+/);
  return p.length === 1 ? p[0][0].toUpperCase() : (p[0][0] + p[p.length - 1][0]).toUpperCase();
}

const COLORS = ["bg-blue-500", "bg-emerald-500", "bg-violet-500", "bg-amber-500", "bg-rose-500"];

const AvatarGroup: React.FC<AvatarGroupProps> = ({ avatars, max = 4, size = "md" }) => {
  const visible = avatars.slice(0, max);
  const overflow = avatars.length - max;

  return (
    <div className="flex items-center">
      {visible.map((a, i) => (
        <div
          key={i}
          title={a.name}
          className={`${SIZE[size]} rounded-full border-2 border-white flex items-center justify-center font-bold text-white overflow-hidden -ml-2 first:ml-0 ${
            a.src ? "" : (a.color ?? COLORS[i % COLORS.length])
          }`}
          style={{ zIndex: visible.length - i }}
        >
          {a.src ? (
            <img src={a.src} alt={a.name} className="w-full h-full object-cover" />
          ) : (
            initials(a.name)
          )}
        </div>
      ))}
      {overflow > 0 && (
        <div
          className={`${SIZE[size]} rounded-full border-2 border-white bg-slate-200 text-slate-600 flex items-center justify-center font-bold -ml-2`}
          title={`+${overflow} more`}
        >
          +{overflow}
        </div>
      )}
    </div>
  );
};

export default AvatarGroup;
