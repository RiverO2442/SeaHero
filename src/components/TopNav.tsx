import React from 'react';

export const TopNav: React.FC = () => (
  <header className="fixed top-0 right-0 w-[calc(100%-16rem)] h-16 bg-white/80 backdrop-blur-md flex justify-between items-center px-8 z-40 shadow-sm">
    {/* Search */}
    <div className="flex items-center bg-slate-50 rounded-full px-4 py-1.5 w-96">
      <span className="material-symbols-outlined text-slate-400 text-sm mr-2">search</span>
      <input
        type="text"
        placeholder="Search employees..."
        className="bg-transparent border-none focus:ring-0 text-sm w-full placeholder:text-slate-400 outline-none"
      />
    </div>

    {/* Actions */}
    <div className="flex items-center gap-6">
      <button className="text-slate-500 hover:text-blue-500 transition-colors">
        <span className="material-symbols-outlined">notifications</span>
      </button>
      <button className="text-slate-500 hover:text-blue-500 transition-colors">
        <span className="material-symbols-outlined">settings</span>
      </button>
      <div className="h-8 w-px bg-slate-200" />
      <img
        src="https://lh3.googleusercontent.com/aida-public/AB6AXuAtmubz8pL13Dayqr_CShHSUu3OmVU9jM2VmJhwQtLxXH03u-X8KYa9lkbuwUg_80LLd3PzCktMpdugHOM0_o3401Z1nlqHnIh6cj_YenZUFhQmJPJqHsctc8qPqb5TIrttNlMKqe2jrrM_kg5GpIUzflI7UCJjBI3Xu8Ey2UWEZUKqicKYqWqRFFBa4Q5gPf45ruM9iyWtNAgNb1ZK6Wnt5JJsQ27RcP1JilqmoH_1oh8WhAue8jULJjHRQq_nHMFliU5YxaTM20g"
        alt="Admin Avatar"
        className="w-8 h-8 rounded-full border border-slate-200 object-cover"
      />
    </div>
  </header>
);
