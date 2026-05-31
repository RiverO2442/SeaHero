import React from "react";

interface NumberInputProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  className?: string;
}

const NumberInput: React.FC<NumberInputProps> = ({
  value,
  onChange,
  min = 0,
  max = Infinity,
  step = 1,
  disabled = false,
  className = "",
}) => {
  const dec = () => onChange(Math.max(min, value - step));
  const inc = () => onChange(Math.min(max, value + step));

  const btnClass =
    "w-8 h-8 flex items-center justify-center rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 disabled:opacity-40 disabled:cursor-not-allowed transition-colors";

  return (
    <div className={`inline-flex items-center gap-2 ${className}`}>
      <button onClick={dec} disabled={disabled || value <= min} className={btnClass} aria-label="Decrease">
        <span className="material-symbols-outlined text-base">remove</span>
      </button>
      <input
        type="number"
        value={value}
        min={min}
        max={max}
        step={step}
        disabled={disabled}
        onChange={(e) => {
          const n = Number(e.target.value);
          if (!isNaN(n)) onChange(Math.min(max, Math.max(min, n)));
        }}
        className="w-16 text-center text-sm font-semibold border border-slate-200 rounded-lg py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
      />
      <button onClick={inc} disabled={disabled || value >= max} className={btnClass} aria-label="Increase">
        <span className="material-symbols-outlined text-base">add</span>
      </button>
    </div>
  );
};

export default NumberInput;
