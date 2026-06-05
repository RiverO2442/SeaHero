import React, { useRef, useEffect } from "react";

interface CheckboxOption {
  value: string;
  label: string;
}

interface CheckboxGroupProps {
  options: CheckboxOption[];
  selected: string[];
  onChange: (selected: string[]) => void;
  showSelectAll?: boolean;
  className?: string;
}

const CheckboxGroup: React.FC<CheckboxGroupProps> = ({
  options,
  selected,
  onChange,
  showSelectAll = true,
  className = "",
}) => {
  const allRef = useRef<HTMLInputElement>(null);
  const allChecked = selected.length === options.length;
  const someChecked = selected.length > 0 && !allChecked;

  useEffect(() => {
    if (allRef.current) allRef.current.indeterminate = someChecked;
  }, [someChecked]);

  const toggle = (value: string) => {
    onChange(
      selected.includes(value)
        ? selected.filter((v) => v !== value)
        : [...selected, value]
    );
  };

  const toggleAll = () =>
    onChange(allChecked ? [] : options.map((o) => o.value));

  return (
    <div className={`space-y-2 ${className}`}>
      {showSelectAll && (
        <label className="flex items-center gap-2.5 px-1 cursor-pointer">
          <input
            ref={allRef}
            type="checkbox"
            checked={allChecked}
            onChange={toggleAll}
            className="w-4 h-4 accent-blue-600"
          />
          <span className="text-sm font-semibold text-slate-700">Select all</span>
        </label>
      )}
      {options.map((opt) => (
        <label key={opt.value} className="flex items-center gap-2.5 px-1 cursor-pointer">
          <input
            type="checkbox"
            checked={selected.includes(opt.value)}
            onChange={() => toggle(opt.value)}
            className="w-4 h-4 accent-blue-600"
          />
          <span className="text-sm text-slate-700">{opt.label}</span>
        </label>
      ))}
    </div>
  );
};

export default CheckboxGroup;
