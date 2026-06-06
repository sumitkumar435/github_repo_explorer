# GitHub Repo Explorer

A full-stack app built as part of a take-home assessment. Search any GitHub username to view their profile and public repositories. The React frontend talks to an Express backend that proxies requests to the GitHub API — keeping any auth token server-side and adding a 60-second response cache to avoid rate limits.

---

## Live Demo Links

- **Frontend:** https://github-repo-explorer-self.vercel.app
- **Backend API:** https://github-repo-explorer-api-nkqm.onrender.com
- **Source Code:** https://github.com/sumitkumar435/github_repo_explorer

> The Render backend is on a free tier — first request may take ~30 seconds to wake up.

---

## Tech Stack

| Technology | Why |
|-----------|-----|
| React 18 + Vite | Fast dev setup; component model suits the card-based UI |
| Tailwind CSS | Utility-first styling without a separate stylesheet |
| Express.js | Lightweight proxy/cache layer between the frontend and GitHub API |
| Node.js | Shared language across the stack |
| GitHub REST API v3 | Official source; no auth needed for public data |
| Vercel | Zero-config React deployment, auto-deploys on push |
| Render | Free Node.js hosting for the Express backend |

---

## How to Run Locally

You need **two terminals** — one for the server, one for the client.

```bash
# Terminal 1 — backend
cd server
npm install
npm run dev
# Runs on http://localhost:3000

# Terminal 2 — frontend
cd client
npm install
npm run dev
# Open http://localhost:5173
```

**Optional — GitHub token** (raises rate limit from 60 to 5000 req/hr):

Create `server/.env`:
```
GITHUB_TOKEN=your_token_here
```
Generate a token (no scopes needed) at https://github.com/settings/tokens

**Run tests:**
```bash
cd client && npm test
```

---

## API Documentation

Base URL: `https://github-repo-explorer-api-nkqm.onrender.com`

### `GET /api/user/:username`
Fetch a user's public profile.

**Response `200`**
```json
{
  "login": "torvalds",
  "name": "Linus Torvalds",
  "avatar_url": "https://avatars.githubusercontent.com/u/1024025",
  "bio": "Nothing to see here",
  "followers": 230000,
  "following": 0,
  "public_repos": 8,
  "html_url": "https://github.com/torvalds"
}
```
**Response `404`** `{ "error": "User not found" }`

---

### `GET /api/user/:username/repos?page=1&per_page=30`
Fetch a page of public repos.

**Query params:**

| Param | Type | Default | Description |
|-------|------|---------|-------------|
| `page` | integer | `1` | Page number |
| `per_page` | integer | `30` | Results per page |

**Response `200`** — returns a plain array of repo objects
```json
[
  {
    "id": 2325298,
    "name": "linux",
    "full_name": "torvalds/linux",
    "description": "Linux kernel source tree",
    "stargazers_count": 180000,
    "forks_count": 55000,
    "language": "C",
    "updated_at": "2024-06-01T12:00:00Z",
    "default_branch": "master",
    "open_issues_count": 0,
    "html_url": "https://github.com/torvalds/linux"
  }
]
```
**Response `404`** `{ "error": "User not found" }`

---

## Project Structure

```
github_repo_explorer/
├── client/                  # React frontend (Vite)
│   └── src/
│       ├── api/github.js    # Calls the Express backend
│       ├── components/      # SearchBar, ProfileCard, RepoList, RepoCard,
│       │                    # RecentSearches, SortControls, LanguageChart
│       ├── utils/sortRepos.js  # Pure sort helper (stars / name / updated)
│       └── App.jsx          # Root component; owns all state
│
├── server/                  # Express backend
│   ├── index.js             # Entry point, mounts routes
│   ├── routes/github.js     # /api/user/:username handlers
│   └── cache.js             # In-memory TTL cache (60s)
│
└── README.md
```

---

## Next Steps

**Known limitations I didn't address:**
- Search fires on Enter/click only — no debounced live search
- "Load more" detects next pages by checking if GitHub returned exactly 30 repos instead of reading the `Link` header properly
- Sorting only applies to already-loaded repos
- Cache is in-memory and resets on server restart
- No backend integration tests

**What I'd build next:**
- Proper pagination via GitHub's `Link` response header
- Debounced search-as-you-type
- Backend route tests with Supertest
- Repo language filter in the UI
- Persistent cache with Redis