import { profile, sections } from '../content';

export function Navigation({ active }: { active: string }) {
  return (
    <>
      <header className="site-header">
        <a href="#home" className="wordmark" aria-label="Aotumuri 水面へ">
          {profile.name}
          <span className="wordmark-dot" />
        </a>
        <nav aria-label="メインナビゲーション">
          {sections.slice(1).map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              aria-current={active === section.id ? 'location' : undefined}
            >
              {section.name}
            </a>
          ))}
        </nav>
        <a
          className="header-github"
          href={profile.github}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub（新しいタブ）"
        >
          GitHub <span aria-hidden="true">↗</span>
        </a>
      </header>
      <nav className="depth-navigation" aria-label="水深ナビゲーション">
        {sections.map((section) => (
          <a
            key={section.id}
            href={`#${section.id}`}
            className={active === section.id ? 'is-active' : ''}
            aria-label={`${section.name}・水深 ${section.depth} m`}
            aria-current={active === section.id ? 'location' : undefined}
          >
            <span className="depth-label">{section.name}</span>
            <span className="mobile-section-label">{section.name}</span>
            <i />
          </a>
        ))}
      </nav>
      <div className="depth-readout" aria-hidden="true">
        <span className="depth-line" />
        <span>
          DEPTH <b data-depth>000</b>
          <small>m</small>
        </span>
      </div>
    </>
  );
}
