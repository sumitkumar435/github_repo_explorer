import { useState, useEffect, useCallback } from 'react';
import SearchBar from './components/SearchBar';
import RecentSearches from './components/RecentSearches';
import ProfileCard from './components/ProfileCard';
import SortControls from './components/SortControls';
import RepoList from './components/RepoList';
import LanguageChart from './components/LanguageChart';
import { fetchProfile, fetchRepos } from './api/github';
import { sortRepos } from './utils/sortRepos';

function errMsg({ message }) {
  return (
    <div className="p-4 rounded-2xl border border-red-500/30 bg-red-950/40 backdrop-blur-md text-red-300 text-sm">
      {message}
    </div>
  );
}

export default function App() {
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [profile, setProfile] = useState(null);
  const [repos, setRepos] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [sort, setSort] = useState('stars');
  const [expandedRepo, setExpandedRepo] = useState(null);
  const [error, setError] = useState(null);
  const [recent, setRecent] = useState([]);
  const [loadingMore, setLoadingMore] = useState(false);
  const [moreToLoadError, setmoreToLoadError] = useState(null);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('gh-recent') || '[]');
      if (Array.isArray(saved)) setRecent(saved);
    } catch {
      // bad data in localStorage, ignore
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('gh-recent', JSON.stringify(recent));
  }, [recent]);

  const isearch = useCallback(async (rawUsername) => {
    if (!rawUsername || !rawUsername.trim()) {
      setError('Please enter a GitHub username.');
      setProfile(null);
      return;
    }

    const normalized = rawUsername.trim().toLowerCase();
    setLoading(true);
    setError(null);
    setmoreToLoadError(null);
    setProfile(null);
    setRepos([]);
    setPage(1);
    setHasMore(false);
    setExpandedRepo(null);

    setRecent((prev) => [normalized, ...prev.filter((r) => r !== normalized)].slice(0, 5));

    const { profile: userProfile, error: profileError } = await fetchProfile(normalized);
    if (profileError) {
      setError(profileError);
      setLoading(false);
      return;
    }

    const { repos: userRepos, hasMore: more, error: reposError } = await fetchRepos(normalized);
    if (reposError) {
      setError(reposError);
      setLoading(false);
      return;
    }

    setUsername(normalized);
    setProfile(userProfile);
    setRepos(userRepos);
    setHasMore(more);
    setLoading(false);
  }, []);

  const moreToLoad = useCallback(async () => {
    setLoadingMore(true);
    setmoreToLoadError(null);
    const nextPage = page + 1;
    const { repos: moreRepos, hasMore: more, error: fetchError } = await fetchRepos(
      username,
      nextPage
    );
    setLoadingMore(false);

    if (fetchError) {
      setmoreToLoadError(fetchError);
      return;
    }

    setRepos((prev) => [...prev, ...moreRepos]);
    setHasMore(more);
    setPage(nextPage);
  }, [username, page]);

  const sortedrepo = repos.length > 0 ? sortRepos(repos, sort) : [];
  const searched = profile !== null || error !== null;

  return (
    <div className="app-bg">
      <div className="max-w-app mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <header className="text-center mb-10 md:mb-14">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3 tracking-tight">
            GitHub Repo Explorer
          </h1>
          <p className="text-sm sm:text-base text-slate-400 max-w-lg mx-auto">
            Search for any GitHub user to explore their profile and repositories
          </p>
        </header>

        <div className="max-w-2xl mx-auto mb-6">
          <SearchBar onSearch={isearch} loading={loading} />
          <div className="mt-3">
            <RecentSearches recent={recent} onSelect={isearch} />
          </div>
        </div>

        {!searched && !loading && (
          <div className="text-center mt-4">
            <p className="text-slate-500 text-sm">
              Type a username above to get started
            </p>
          </div>
        )}

        {loading && (
          <p className="text-center text-slate-400 text-sm animate-pulse mt-4">Loading...</p>
        )}

        {error && !loading && (
          <div className="mt-6">
            <errMsg message={error} />
          </div>
        )}

        {profile && !loading && (
          <div className="mt-6 space-y-8">
            <ProfileCard profile={profile} />
            <SortControls sort={sort} onChange={setSort} />
            <RepoList
              repos={sortedrepo}
              expandedRepo={expandedRepo}
              onToggle={(name) =>
                setExpandedRepo((prev) => (prev === name ? null : name))
              }
              onmoreToLoad={moreToLoad}
              hasMore={hasMore}
              loadingMore={loadingMore}
            />
            {moreToLoadError && <errMsg message={moreToLoadError} />}
            <LanguageChart repos={repos} />
          </div>
        )}
      </div>
    </div>
  );
}
