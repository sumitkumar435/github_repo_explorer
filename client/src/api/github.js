const API_BASE = import.meta.env.VITE_API_URL || '';
export async function fetchProfile(username) {
  try {
    const res = await fetch(`${API_BASE}/api/user/${encodeURIComponent(username)}`);
    const json = await res.json();
    if (!res.ok) {
      return { profile: null, error: json.error || 'Failed to fetch profile' };
    }
    return { profile: json, error: null };
  } catch {
    return { profile: null, error: 'Could not connect. Check your connection.' };
  }
}

export async function fetchRepos(username, page = 1) {
  try {
    const res = await fetch(
    `${API_BASE}/api/user/${encodeURIComponent(username)}/repos?page=${page}&per_page=30`
    );
    const json = await res.json();
    if (!res.ok) {
      return { repos: [], hasMore: false, error: json.error || 'Failed to fetch repos' };
    }
    return { repos: json, hasMore: json.length === 30, error: null };
  } catch {
    return { repos: [], hasMore: false, error: 'Could not connect. Check your connection.' };
  }
}
