const LANG_COLORS = {
  JavaScript: '#f1e05a',
  TypeScript: '#3178c6',
  Python: '#3572A5',
  Java: '#b07219',
  Go: '#00ADD8',
  Ruby: '#701516',
  Rust: '#dea584',
  HTML: '#e34c26',
  CSS: '#563d7c',
};

function colorLang(name) {
  return LANG_COLORS[name] || '#8b949e';
}

export default function langChart({ repos }) {
  const counts = {};
  repos.forEach((repo) => {
    if (repo.language) {
      counts[repo.language] = (counts[repo.language] || 0) + 1;
    }
  });

  const data = Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([name, count]) => ({ name, count }));

  if (data.length === 0) return null;

  const maxCount = data[0].count;

  return (
    <div className="glass-card p-6 sm:p-8">
      <h3 className="text-sm font-medium text-slate-300 mb-5">Repo languages</h3>
      <div className="space-y-4">
        {data.map((entry) => (
          <div key={entry.name} className="flex items-center gap-3 text-xs text-slate-400">
            <span className="w-20 shrink-0 truncate">{entry.name}</span>
            <div className="flex-1 h-2.5 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                  width: `${(entry.count / maxCount) * 100}%`,
                  background: colorLang(entry.name),
                }}
              />
            </div>
            <span className="w-8 text-right text-slate-500">{entry.count}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
