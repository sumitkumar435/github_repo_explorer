require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;
const token = process.env.GITHUB_TOKEN;

const cache = new Map();
const CACHE_TTL = 60_000;

function to_cache(key) {
  const entry = cache.get(key);
  if (!entry || Date.now() - entry.time > CACHE_TTL) return null;
  return entry.data;
}

function setCached(key, data) {
  cache.set(key, { data, time: Date.now() });
}

app.use(cors());

function fetching(path) {
  const headers = {
    Accept: 'application/vnd.github.v3+json',
    'User-Agent': 'github-explorer',
  };
  if (token) {
    headers.Authorization = `token ${token}`;
  }
  return fetch(`https://api.github.com${path}`, { headers });
}

function handleError(res, status) {
  if (status === 404) {
    return res.status(404).json({ error: 'User not found' });
  }
  if (status === 403 || status === 429) {
    return res.status(429).json({ error: 'GitHub rate limit exceeded. Please wait a moment.' });
  }
  return res.status(502).json({ error: `GitHub API error (HTTP ${status})` });
}

app.get('/api/user/:username', async (req, res) => {
  const username = req.params.username.toLowerCase().trim();
  const Ckey = `user:${username}`;
  const cached = to_cache(Ckey);

  if (cached) {
    return res.json(cached);
  }

  let response;
  try {
    response = await fetching(`/users/${username}`);
  } catch (err) {
    return res.status(502).json({ error: 'Failed to reach GitHub API' });
  }

  if (!response.ok) {
    return handleError(res, response.status);
  }

  const data = await response.json();
  setCached(Ckey, data);
  return res.json(data);
});

app.get('/api/user/:username/repos', async (req, res) => {
  const username = req.params.username.toLowerCase().trim();
  const page = req.query.page || '1';
  let perPage = parseInt(req.query.per_page, 10) || 30;
  if (perPage > 100) perPage = 100;
  const Ckey = `repos:${username}:${page}:${perPage}`;
  const cached = to_cache(Ckey);

  if (cached) {
    return res.json(cached);
  }

  let response;
  try {
    response = await fetching(
      `/users/${username}/repos?type=public&page=${page}&per_page=${perPage}`
    );
  } catch (err) {
    return res.status(502).json({ error: 'Failed to reach GitHub API' });
  }

  if (!response.ok) {
    return handleError(res, response.status);
  }

  const data = await response.json();
  setCached(Ckey, data);
  return res.json(data);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
