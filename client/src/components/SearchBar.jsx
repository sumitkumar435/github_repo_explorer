import { useState } from 'react';

function SearchIcon() {
  return (
    <svg
      className="w-5 h-5 text-slate-400 pointer-events-none"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21 21l-4.35-4.35M11 18a7 7 0 100-14 7 7 0 000 14z"
      />
    </svg>
  );
}

export default function SearchBar({ onSearch, loading }) {
  const [value, setValue] = useState('');

  function handleSubmit() {
    const trimmed = value.trim();
    if (trimmed) onSearch(trimmed);
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter') handleSubmit();
  }

  return (
    <div className="glass-pill flex items-center gap-2 p-2 w-full transition-all duration-300 hover:border-white/20 hover:shadow-purple-500/10">
      <div className="relative flex flex-1 items-center min-w-0">
        <span className="absolute left-4 sm:left-5 flex items-center">
          <SearchIcon />
        </span>
        <input
          id="search-input"
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Enter a GitHub username…"
          className="w-full pl-11 sm:pl-12 pr-3 py-3 sm:py-3.5 rounded-full bg-transparent text-sm sm:text-base text-slate-100 placeholder:text-slate-500 focus:outline-none"
          aria-label="GitHub username"
        />
      </div>
      <button
        id="search-button"
        onClick={handleSubmit}
        disabled={loading}
        className="shrink-0 rounded-full px-5 sm:px-7 py-3 sm:py-3.5 text-sm sm:text-base font-medium text-white bg-gradient-to-r from-violet-600 via-purple-600 to-blue-600 hover:from-violet-500 hover:via-purple-500 hover:to-blue-500 disabled:opacity-50 disabled:hover:from-violet-600 disabled:hover:via-purple-600 disabled:hover:to-blue-600 transition-all duration-300 hover:scale-[1.03] hover:shadow-lg hover:shadow-purple-500/30 active:scale-[0.98] whitespace-nowrap"
      >
        {loading ? 'Searching…' : 'Search'}
      </button>
    </div>
  );
}
