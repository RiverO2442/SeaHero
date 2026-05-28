import React, { useRef } from "react";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

const SearchInput: React.FC<SearchInputProps> = ({
  value,
  onChange,
  placeholder = "Search...",
  className = "",
}) => {
  const ref = useRef<HTMLInputElement>(null);

  return (
    <div className={`relative flex items-center ${className}`}>
      <span className="material-symbols-outlined absolute left-3 text-slate-400 text-lg pointer-events-none select-none">
        search
      </span>
      <input
        ref={ref}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-10 pr-8 py-2 text-sm bg-slate-100 border border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all placeholder:text-slate-400"
      />
      {value && (
        <button
          onClick={() => { onChange(""); ref.current?.focus(); }}
          aria-label="Clear search"
          className="absolute right-2.5 text-slate-400 hover:text-slate-600 transition-colors"
        >
          <span className="material-symbols-outlined text-base">close</span>
        </button>
      )}
    </div>
  );
};

export default SearchInput;
