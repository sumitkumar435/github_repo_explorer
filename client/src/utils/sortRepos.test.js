import { describe, it, expect } from 'vitest';
import { sortRepos } from './sortRepos';

describe('sortRepos', () => {
  const repos = [
    { name: 'beta', stargazers_count: 10, updated_at: '2024-01-01' },
    { name: 'alpha', stargazers_count: 100, updated_at: '2024-06-01' },
    { name: 'gamma', stargazers_count: 50, updated_at: '2024-03-01' },
  ];

  it('sorts by stars descending', () => {
    const sorted = sortRepos(repos, 'stars');
    expect(sorted[0].stargazers_count).toBe(100);
    expect(sorted[2].stargazers_count).toBe(10);
  });

  it('sorts by name alphabetically', () => {
    const sorted = sortRepos(repos, 'name');
    expect(sorted[0].name).toBe('alpha');
    expect(sorted[2].name).toBe('gamma');
  });
});
