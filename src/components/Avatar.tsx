import React from "react";

interface AvatarProps {
  name: string;
  src?: string;
  color?: string;
  size?: "sm" | "md" | "lg";
}

const SIZE_CLASSES = {
  sm: "w-8 h-8 text-xs",
  md: "w-10 h-10 text-sm",
  lg: "w-12 h-12 text-base",
};

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0][0].toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

const Avatar: React.FC<AvatarProps> = ({
  name,
  src,
  color = "bg-blue-600",
  size = "md",
}) => {
  const base = `${SIZE_CLASSES[size]} rounded-full flex items-center justify-center font-bold text-white shrink-0 overflow-hidden`;

  if (src) {
    return (
      <img
        src={src}
        alt={name}
        className={`${base} object-cover`}
      />
    );
  }

  return (
    <div className={`${base} ${color}`} aria-label={name} title={name}>
      {getInitials(name)}
    </div>
  );
};

export default Avatar;
