export default function ProfileCard({ profile }) {
  const {
    avatar_url,
    name,
    login,
    bio,
    followers,
    following,
    public_repos,
  } = profile;

  const stats = [
    { label: followers === 1 ? 'Follower' : 'Followers', value: followers },
    { label: 'Following', value: following },
    { label: 'Public Repos', value: public_repos },
  ];

  return (
    <div className="glass-card flex flex-col sm:flex-row gap-6 sm:gap-8 items-start p-6 sm:p-8">
      <img
        src={avatar_url}
        alt={`${login}'s avatar`}
        className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-2 border-white/10 ring-2 ring-purple-500/20"
      />
      <div className="flex-1 min-w-0">
        <h2 className="text-xl sm:text-2xl font-semibold text-white truncate">
          {name || `@${login}`}
        </h2>
        <p className="text-slate-400 text-sm mt-0.5">@{login}</p>
        {bio && <p className="text-slate-300 text-sm mt-2 leading-relaxed">{bio}</p>}
        <div className="flex flex-wrap gap-3 mt-5">
          {stats.map(({ label, value }) => (
            <div
              key={label}
              className="flex flex-col items-center px-4 py-2.5 rounded-xl border border-white/10 bg-white/5"
            >
              <span className="text-lg font-semibold text-white">
                {value.toLocaleString()}
              </span>
              <span className="text-xs text-slate-400 mt-0.5">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
