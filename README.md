# GitHub Explorer

I built this as a small full-stack app for searching GitHub users. You type a username, and it shows their profile and public repos. The React frontend talks to an Express backend, which calls the GitHub API — so the browser never hits GitHub directly. That way I can cache responses and keep an API token on the server if needed.

## Running it locally

You need two terminals open at the same time.

**Backend:**

```bash
cd server
npm install
npm run dev
```

**Frontend:**

```bash
cd client
npm install
npm run dev
```

Open http://localhost:5173 in your browser.

To run tests:

```bash
cd client
npm test
```

### GitHub token (optional)

Without a token, GitHub only gives you 60 requests per hour. If you want more, create a `server/.env` file:

```
GITHUB_TOKEN=your_token_here
```

A classic token with no scopes is enough for public data — you can make one at https://github.com/settings/tokens

## What it does

- Search by username (Enter or click Search)
- Shows avatar, name, bio, followers, following, and public repo count
- Lists public repos with name, description, language, stars, and last updated date
- Sort repos by stars, name, or last updated
- Error message if the username doesn't exist
- Handles network errors and rate limits without crashing
- Backend caches responses for 60 seconds
- "Load more" for users with more than 30 repos
- Click a repo to see default branch and open issues count
- Recently searched usernames saved in localStorage
- Simple bar chart of repo languages (from loaded repos only)

## What doesn't work perfectly

- Search only happens when you press Enter or click the button — I didn't add debounced search-as-you-type
- "Load more" guesses whether there are more pages by checking if GitHub returned exactly 30 repos, instead of using the Link header
- Sorting only applies to repos you've already loaded
- The language chart only counts repos you've loaded so far
- Cache is in-memory and resets when you restart the server
- Any 403 from GitHub gets treated as a rate limit, which isn't always accurate

## If I had more time

I'd add debounced search, use GitHub's pagination headers properly, and write at least one integration test for the backend routes.
