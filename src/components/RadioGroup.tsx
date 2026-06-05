import React from "react";

interface RadioOption {
  value: string;
  label: string;
  description?: string;
}

interface RadioGroupProps {
  name: string;
  options: RadioOption[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

const RadioGroup: React.FC<RadioGroupProps> = ({
  name,
  options,
  value,
  onChange,
  className = "",
}) => (
  <fieldset className={`space-y-2 ${className}`}>
    {options.map((opt) => {
      const checked = opt.value === value;
      return (
        <label
          key={opt.value}
          className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-colors ${
            checked
              ? "border-blue-500 bg-blue-50"
              : "border-slate-200 hover:border-slate-300 hover:bg-slate-50"
          }`}
        >
          <input
            type="radio"
            name={name}
            value={opt.value}
            checked={checked}
            onChange={() => onChange(opt.value)}
            className="mt-0.5 accent-blue-600"
          />
          <div>
            <p className={`text-sm font-medium ${checked ? "text-blue-700" : "text-slate-800"}`}>
              {opt.label}
            </p>
            {opt.description && (
              <p className="text-xs text-slate-500 mt-0.5">{opt.description}</p>
            )}
          </div>
        </label>
      );
    })}
  </fieldset>
);

export default RadioGroup;
