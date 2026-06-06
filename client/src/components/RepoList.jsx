import RepoCard from './RepoCard';

export default function RepoList({
  repos,
  expandedRepo,
  onToggle,
  onLoadMore,
  hasMore,
  loadingMore,
}) {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
        {repos.map((repo) => (
          <RepoCard
            key={repo.id}
            repo={repo}
            expanded={expandedRepo === repo.full_name}
            onToggle={onToggle}
          />
        ))}
      </div>
      {hasMore && (
        <button
          onClick={onLoadMore}
          disabled={loadingMore}
          className="w-full mt-6 py-3 rounded-full border border-white/10 bg-surface-card/50 backdrop-blur-md text-sm text-slate-300 hover:border-purple-500/40 hover:text-white hover:shadow-lg hover:shadow-purple-500/10 transition-all duration-300 disabled:opacity-50"
        >
          {loadingMore ? 'Loading…' : 'Load more'}
        </button>
      )}
    </div>
  );
}
