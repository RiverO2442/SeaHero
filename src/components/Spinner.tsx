import React from "react";

interface SpinnerProps {
  size?: "sm" | "md" | "lg";
  color?: string;
  className?: string;
}

const SIZE_CLASSES = {
  sm: "w-4 h-4 border-2",
  md: "w-7 h-7 border-2",
  lg: "w-10 h-10 border-[3px]",
};

const Spinner: React.FC<SpinnerProps> = ({
  size = "md",
  color = "border-blue-600",
  className = "",
}) => (
  <span
    role="status"
    aria-label="Loading"
    className={`inline-block rounded-full border-transparent animate-spin ${SIZE_CLASSES[size]} ${color} border-t-current ${className}`}
  />
);

export default Spinner;
