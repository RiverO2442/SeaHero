import React from "react";

interface SearchHighlightProps {
  text: string;
  query: string;
  className?: string;
}

export const SearchHighlight: React.FC<SearchHighlightProps> = ({ text, query, className }) => {
  if (!query.trim()) return <span className={className}>{text}</span>;

  const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const parts = text.split(new RegExp(`(${escaped})`, "gi"));

  return (
    <span className={className}>
      {parts.map((part, i) =>
        part.toLowerCase() === query.toLowerCase() ? (
          <mark key={i} className="bg-yellow-100 text-yellow-800 rounded px-0.5 font-bold">
            {part}
          </mark>
        ) : (
          part
        ),
      )}
    </span>
  );
};
