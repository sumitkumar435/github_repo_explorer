export function sortRepos(repos, sort) {
  const copy = [...repos];

  switch (sort) {
    case 'stars':
      return copy.sort((a, b) => b.stargazers_count - a.stargazers_count);
    case 'name':
      return copy.sort((a, b) =>
        a.name.toLowerCase().localeCompare(b.name.toLowerCase())
      );
    case 'updated':
      return copy.sort(
        (a, b) => new Date(b.updated_at) - new Date(a.updated_at)
      );
    default:
      return copy;
  }
}
