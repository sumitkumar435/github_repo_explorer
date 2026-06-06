export default function RecentSearches({ recent, onSelect }) {
  if (!recent || recent.length === 0) return null;

  return (
    <div className="flex items-center gap-2 flex-wrap">
      <span className="text-xs text-slate-500 font-medium">Recent:</span>
      {recent.map((username) => (
        <button
          key={username}
          onClick={() => onSelect(username)}
          className="text-xs px-3 py-1.5 rounded-full border border-white/10 bg-surface-card/50 text-slate-300 hover:border-purple-500/40 hover:text-white transition-all duration-300"
        >
          {username}
        </button>
      ))}
    </div>
  );
}
