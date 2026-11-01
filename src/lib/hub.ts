export type Project = { name: string; url: string; github_url: string; description: string };

function safeUrl(value: unknown): value is string {
  if (typeof value !== 'string') return false;
  try { return new URL(value).protocol === 'https:'; } catch { return false; }
}

export function readProjects(value: unknown): Project[] {
  if (!Array.isArray(value)) throw new Error('Invalid hub data');
  return value.filter((p): p is Project => p && typeof p.name === 'string'
    && typeof p.description === 'string' && safeUrl(p.url)
    && safeUrl(p.github_url) && new URL(p.github_url).hostname === 'github.com');
}

export function matchesPath(project: Project, requestedUrl: string) {
  try {
    const target = new URL(project.url);
    const requested = new URL(requestedUrl);
    const requestedPath = decodeURIComponent(requested.pathname).toLowerCase();
    const projectPath = decodeURIComponent(target.pathname).toLowerCase().replace(/\/$/, '');
    return target.origin === requested.origin && projectPath !== ''
      && (requestedPath === projectPath || requestedPath.startsWith(`${projectPath}/`));
  } catch { return false; }
}
