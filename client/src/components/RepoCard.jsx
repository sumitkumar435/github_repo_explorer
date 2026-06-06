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

function langColor(name) {
  return LANG_COLORS[name] || '#8b949e';
}

export default function RepoCard({ repo, expanded, onToggle }) {
  const updatedDate = new Date(repo.updated_at).toLocaleDateString();

  return (
    <div
      onClick={() => onToggle(repo.full_name)}
      className="glass-card cursor-pointer overflow-hidden transition-all duration-300 hover:border-purple-500/30 hover:shadow-purple-500/10"
    >
      <div className="p-4 sm:p-5">
        <a
          href={repo.html_url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="text-purple-300 hover:text-purple-200 hover:underline font-medium text-sm transition-colors"
        >
          {repo.name}
        </a>
        <p className="text-slate-400 text-xs mt-1.5 line-clamp-2">
          {repo.description || <em className="text-slate-500">No description</em>}
        </p>
        <div className="flex flex-wrap items-center gap-3 mt-3 text-xs text-slate-500">
          {repo.language && (
            <span className="flex items-center gap-1.5">
              <span
                className="inline-block w-2 h-2 rounded-full"
                style={{ background: langColor(repo.language) }}
              />
              {repo.language}
            </span>
          )}
          <span>{repo.stargazers_count.toLocaleString()} stars</span>
          <span>Updated {updatedDate}</span>
        </div>
      </div>

      <div
        style={{
          maxHeight: expanded ? '120px' : '0px',
          transition: 'max-height 0.3s ease',
          overflow: 'hidden',
        }}
      >
        <div className="border-t border-white/10 px-4 sm:px-5 py-3 bg-white/5 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-400">
          <div>
            <span className="font-medium text-slate-500">Default branch:</span>{' '}
            {repo.default_branch}
          </div>
          <div>
            <span className="font-medium text-slate-500">Open issues:</span>{' '}
            {repo.open_issues_count.toLocaleString()}
          </div>
        </div>
      </div>
    </div>
  );
}
