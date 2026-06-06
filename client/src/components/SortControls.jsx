const options = [
  { key: 'stars', label: 'Stars' },
  { key: 'name', label: 'Name' },
  { key: 'updated', label: 'Last Updated' },
];

export default function SortControls({ sort, onChange }) {
  return (
    <div className="flex flex-wrap items-center gap-2 sm:gap-3">
      <span className="text-xs text-slate-500 font-medium w-full sm:w-auto mb-1 sm:mb-0">
        Sort by:
      </span>
      {options.map(({ key, label }) => (
        <button
          key={key}
          onClick={() => onChange(key)}
          className={`text-sm px-4 py-2 rounded-full border transition-all duration-300 ${
            sort === key
              ? 'bg-gradient-to-r from-violet-600 to-blue-600 text-white border-transparent shadow-md shadow-purple-500/20'
              : 'bg-surface-card/50 text-slate-400 border-white/10 hover:border-purple-500/40 hover:text-slate-200'
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
