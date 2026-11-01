import { useEffect, useState } from 'react';
import savedProjects from '../data/hub-projects.json';
import './ProjectFinder.css';
import { matchesPath, readProjects, type Project } from '../lib/hub';

const source = 'https://raw.githubusercontent.com/Aotumuri/hub/main/_data/projects.json';

export default function ProjectFinder() {
  const [projects, setProjects] = useState<Project[]>(savedProjects);
  const [query, setQuery] = useState('');
  const [sourceState, setSourceState] = useState('保存済みの一覧を表示しています。');
  useEffect(() => {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 5000);
    fetch(source, { signal: controller.signal })
      .then(async response => {
        if (!response.ok) throw new Error('Hub unavailable');
        const next = readProjects(await response.json());
        if (!controller.signal.aborted) {
          setProjects(next);
          setSourceState('hubの一覧を読み込みました。');
        }
      })
      .catch(() => { /* The bundled list remains available offline. */ })
      .finally(() => clearTimeout(timer));
    return () => { clearTimeout(timer); controller.abort(); };
  }, []);
  const normalized = query.trim().toLocaleLowerCase();
  const filtered = projects.filter(p => `${p.name} ${p.description}`.toLocaleLowerCase().includes(normalized));
  const suggested = projects.filter(p => matchesPath(p, location.href)).sort((a, b) => b.url.length - a.url.length)[0];
  return (
    <section className="project-finder" aria-labelledby="finder-title">
      {suggested && (
        <aside className="project-suggestion" aria-label="URLに対応する作品">
          <p>このURLに対応する作品が一覧にあります。</p>
          <a href={suggested.url}>{suggested.name} のトップへ <span aria-hidden="true">↗</span></a>
        </aside>
      )}
      <div className="finder-heading">
        <h2 id="finder-title">作品を探す</h2>
        <a href="https://aotumuri.github.io/hub/">hubを開く <span aria-hidden="true">↗</span></a>
      </div>
      <p className="finder-description">GitHub Pagesの公開設定がある作品の一覧です。リンク先の公開状況は変わることがあります。</p>
      <label htmlFor="project-search">作品名・説明で検索</label>
      <input id="project-search" type="search" value={query} onChange={event => setQuery(event.target.value)} placeholder="例：sim、旗、json" />
      <p className="finder-count" role="status">{filtered.length}件{normalized ? 'が見つかりました' : 'の作品'}</p>
      <ul className="finder-results">
        {filtered.map(project => (
          <li key={project.github_url}>
            <a className="finder-project" href={project.url}>{project.name} <span aria-hidden="true">↗</span></a>
            {project.description && <p>{project.description}</p>}
            <a className="finder-repository" href={project.github_url} aria-label={`${project.name}をGitHubで見る`}>GitHubで見る</a>
          </li>
        ))}
      </ul>
      {filtered.length === 0 && <p className="finder-empty">一致する作品がありません。別の言葉で検索してみてください。</p>}
      <p className="finder-source">{sourceState} <a href="https://github.com/Aotumuri/hub">一覧の提供元：hub</a></p>
    </section>
  );
}
