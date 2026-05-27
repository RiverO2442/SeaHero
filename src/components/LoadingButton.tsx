import React from "react";

interface LoadingButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  variant?: "primary" | "danger" | "ghost";
}

const VARIANT_CLASSES: Record<NonNullable<LoadingButtonProps["variant"]>, string> = {
  primary: "bg-blue-600 hover:bg-blue-700 text-white",
  danger:  "bg-red-600 hover:bg-red-700 text-white",
  ghost:   "bg-transparent hover:bg-slate-100 text-slate-700 border border-slate-200",
};

const LoadingButton: React.FC<LoadingButtonProps> = ({
  loading = false,
  variant = "primary",
  children,
  disabled,
  className = "",
  ...rest
}) => (
  <button
    disabled={disabled || loading}
    className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-150 disabled:opacity-60 disabled:cursor-not-allowed ${VARIANT_CLASSES[variant]} ${className}`}
    {...rest}
  >
    {loading && (
      <svg
        className="animate-spin w-4 h-4 shrink-0"
        viewBox="0 0 24 24"
        fill="none"
      >
        <circle
          className="opacity-25"
          cx="12" cy="12" r="10"
          stroke="currentColor" strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
        />
      </svg>
    )}
    {children}
  </button>
);

export default LoadingButton;
