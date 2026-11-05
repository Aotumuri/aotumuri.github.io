import { useCallback, useEffect, useRef, useState } from 'react';
import { contacts, profile, skills } from './content';
import Ocean, { Fish, Jellyfish } from './components/Ocean';
import Works from './components/Works';
import ProjectFinder from './components/ProjectFinder';
import BelowSeabed from './components/BelowSeabed';
import { Navigation } from './components/Navigation';
import { hasSeenIntro, LogoIntro } from './components/LogoIntro';
import { useAuroraShortcut, useOcean, useReducedMotion } from './hooks/useOcean';

function SectionLabel({
  number,
  depth,
  children,
}: {
  number: string;
  depth: string;
  children: React.ReactNode;
}) {
  return (
    <div className="section-eyebrow">
      <span>
        {number} / {children}
      </span>
      <span className="section-depth">{depth} M BELOW THE SURFACE</span>
    </div>
  );
}

function HiddenPage({ secret }: { secret: boolean }) {
  const [opened, setOpened] = useState(false);
  useEffect(() => {
    document.title = secret ? '隠しページ — Aotumuri' : '404 — ページが見つかりません | Aotumuri';
    const description = secret
      ? 'Aotumuriの隠しページです。'
      : '指定したURLに該当するページはありません。公開中の作品はAotumuriのトップページからご覧ください。';
    document
      .querySelector<HTMLMetaElement>('meta[name="description"]')
      ?.setAttribute('content', description);
    let robots = document.querySelector<HTMLMetaElement>('meta[name="robots"]');
    if (!robots) {
      robots = document.createElement('meta');
      robots.name = 'robots';
      document.head.append(robots);
    }
    robots.content = 'noindex';
  }, [secret]);
  return (
    <main className={`hidden-page ${secret ? 'secret-page' : 'not-found-page'}`}>
      <div className="secret-stars" aria-hidden="true" />
      <span className="eyebrow hidden-masthead">
        AOTUMURI / {secret ? 'THE UNCHARTED' : 'LOST AT SEA'}
      </span>
      {secret ? (
        <>
          <button
            className={`treasure ${opened ? 'is-open' : ''}`}
            onClick={() => setOpened(!opened)}
            aria-label={opened ? '宝箱を閉じる' : '宝箱を開く'}
            aria-expanded={opened}
          >
            <svg viewBox="0 0 180 150" fill="none" aria-hidden="true">
              <ellipse cx="90" cy="126" rx="65" ry="9" fill="#8fdbef" opacity=".1" />
              <g className="chest-lid">
                <path d="M36 73V61Q36 39 59 39H121Q144 39 144 61V73Z" fill="#143144" />
                <path
                  d="M36 73V61Q36 39 59 39H121Q144 39 144 61V73ZM59 39V73M121 39V73"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </g>
              <path d="M36 75H144V118H36Z" fill="#0b2034" stroke="currentColor" strokeWidth="2" />
              <path d="M59 75V118M121 75V118" stroke="currentColor" strokeWidth="2" />
              <rect x="82" y="68" width="16" height="20" rx="2" fill="#8cdce4" />
              <path d="M90 74v8" stroke="#13304a" />
            </svg>
          </button>
          <p className="eyebrow">3,200 M / A SMALL DISCOVERY</p>
          <h1>宝箱発見！</h1>
          <p className="hidden-message" role="status">
            {opened ? '中身はまだありません（？）' : 'とりあえず宝箱を置いてみました。'}
          </p>
        </>
      ) : (
        <>
          <div className="lost-fish">
            <Fish />
          </div>
          <h1 className="error-number">404</h1>
          <p className="hidden-message">このURLには今、ページがありません。</p>
          <p className="secret-note">以前公開していた作品やページは、移動したり、公開を終了したりしている可能性があります。URLが間違っている場合もあります。</p>
        </>
      )}
      <a className="underlined-link" href={import.meta.env.BASE_URL}>
        {secret ? 'Return to surface' : 'Aotumuriのトップへ'} <span aria-hidden="true">↗</span>
      </a>
      {!secret && <ProjectFinder />}
    </main>
  );
}

export default function App() {
  const base = import.meta.env.BASE_URL;
  const path = location.pathname;
  const isSecret = path === `${base}secret.html`;
  const isHome = path === base || path === `${base}index.html` || path === base.replace(/\/$/, '');
  const reduced = useReducedMotion();
  const [intro, setIntro] = useState(() => isHome && !hasSeenIntro());
  const [fishFound, setFishFound] = useState(false);
  const [aurora, setAurora] = useState(false);
  const introOrigin = useRef<HTMLElement | null>(null);
  const closeIntro = useCallback(() => setIntro(false), []);
  const discover = useCallback(() => {
    if (isHome && !intro) setAurora(true);
  }, [isHome, intro]);
  const active = useOcean(isHome);
  useAuroraShortcut(discover);
  useEffect(() => {
    if (!fishFound) return;
    const timer = setTimeout(() => setFishFound(false), 4200);
    return () => clearTimeout(timer);
  }, [fishFound]);
  useEffect(() => {
    if (!aurora) return;
    const timer = setTimeout(() => setAurora(false), 10000);
    return () => clearTimeout(timer);
  }, [aurora]);
  useEffect(() => {
    if (!intro) return;
    const old = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const key = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeIntro();
    };
    addEventListener('keydown', key);
    return () => {
      document.body.style.overflow = old;
      removeEventListener('keydown', key);
    };
  }, [intro, closeIntro]);
  if (!isHome) return <HiddenPage secret={isSecret} />;

  return (
    <>
      <div className={`ocean-world ${aurora ? 'aurora-active' : ''}`} inert={intro}>
        <a className="skip-link" href="#main">
          コンテンツへ移動
        </a>
        <Ocean />
        <div className="aurora" aria-hidden="true" />
        <Navigation active={active} />
        <main id="main">
          <section id="home" className="hero" aria-labelledby="home-title">
            <div className="hero-content">
              <p className="eyebrow hero-eyebrow">
                <span /> PERSONAL WEBSITE
              </p>
              <h1 id="home-title">
                {profile.name}
                {profile.tagline && <span>{profile.tagline}</span>}
              </h1>
              <p className="hero-japanese">
                {profile.headline.map((line) => (
                  <span key={line}>{line}</span>
                ))}
              </p>
              <a href="#about" className="dive-link">
                <span className="dive-circle" aria-hidden="true">
                  ↓
                </span>
                <span>
                  下へスクロール<small>SCROLL</small>
                </span>
              </a>
            </div>
            <div className="hero-fish-group">
              <div className="shoal shoal-one" aria-hidden="true">
                <Fish /><Fish /><Fish /><Fish /><Fish />
              </div>
            <button
              className={`curious-fish ${fishFound ? 'is-found' : ''}`}
              onClick={() => setFishFound(true)}
              aria-label="小さな魚に触れる"
            >
              <Fish />
              <span className="fish-spark" aria-hidden="true">
                ✧
              </span>
            </button>
            </div>
            <div className="hero-footer">
              <span>AOTUMURI / PERSONAL WEBSITE</span>
              <span>
                THE SURFACE <i /> 000 M
              </span>
            </div>
          </section>

          <section
            id="about"
            className="content-section about-section"
            aria-labelledby="about-title"
          >
            <div className="section-inner" data-reveal>
              <SectionLabel number="01" depth="100">
                ABOUT
              </SectionLabel>
              <div className="about-grid">
                <div>
                  <h2 id="about-title">
                    About <em>me.</em>
                  </h2>
                  <p className="section-subtitle">自己紹介</p>
                </div>
                <div className="about-copy">
                  <span className="small-label">HELLO, I’M AOTUMURI.</span>
                  <p className="about-lead">
                    {profile.about[0]}
                    <br />
                    {profile.about[1]}
                  </p>
                  <p>{profile.about[2]}</p>
                  <div className="interest-tags">
                    <span>Programming</span>
                    <span>AI & RL</span>
                    <span>Open source</span>
                    <span>Games</span>
                  </div>
                  <a
                    className="underlined-link"
                    href={profile.github}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Find me on GitHub <span aria-hidden="true">↗</span>
                  </a>
                </div>
              </div>
              <div className="section-footnote">
                <span>A LITTLE ABOUT ME</span>
                <span>「.w.」はドットタングステンドットです（？）</span>
              </div>
            </div>
          </section>

          <section
            id="works"
            className="content-section works-section"
            aria-labelledby="works-title"
          >
            <div className="section-inner" data-reveal>
              <SectionLabel number="02" depth="500">
                SELECTED WORKS
              </SectionLabel>
              <Works />
            </div>
          </section>

          <section
            id="skills"
            className="content-section skills-section"
            aria-labelledby="skills-title"
          >
            <div className="section-inner" data-reveal>
              <SectionLabel number="03" depth="1,000">
                SKILLS & INTERESTS
              </SectionLabel>
              <div className="skills-grid">
                <div className="skills-intro">
                  <h2 id="skills-title">
                    Skills &amp;
                    <br />
                    <em>interests.</em>
                  </h2>
                  <p className="section-subtitle">使っている技術・勉強していること</p>
                  <p className="muted-copy">
                    AIやゲーム開発に興味があります。
                    <br />
                    まだ勉強中のものも含みます。
                  </p>
                  <div className="skills-jellies" aria-hidden="true">
                    <Jellyfish className="jelly-one" />
                    <Jellyfish className="jelly-two" />
                  </div>
                </div>
                <div className="skill-list">
                  {skills.map((skill) => (
                    <div className="skill" key={skill.name}>
                      <span className="skill-symbol" aria-hidden="true">
                        {skill.symbol}
                      </span>
                      <span>
                        <h3>{skill.name}</h3>
                        <small>{skill.field}</small>
                      </span>
                      <span className="skill-plus" aria-hidden="true">
                        +
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section
            id="contact"
            className="content-section contact-section"
            aria-labelledby="contact-title"
          >
            <div className="section-inner" data-reveal>
              <SectionLabel number="04" depth="3,000">
                CONTACT
              </SectionLabel>
              <p className="small-label contact-prelude">GITHUB / QIITA</p>
              <h2 id="contact-title">
                Find me <em>here.</em>
              </h2>
              <p className="section-subtitle">AI系統の話、ぜひ！</p>
              <div className="contact-links">
                {contacts
                  .filter((contact) => contact.url.trim())
                  .map((contact) => (
                    <a
                      key={contact.name}
                      href={contact.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span>
                        {contact.name}
                        <small>{contact.handle}</small>
                      </span>
                      <span aria-hidden="true">↗</span>
                    </a>
                  ))}
              </div>
            </div>
          </section>
        </main>
        <footer className="site-footer">
          <button
            className="text-button"
            onClick={(event) => {
              introOrigin.current = event.currentTarget;
              setIntro(true);
            }}
          >
            ロゴをもう一度再生 <span aria-hidden="true">↻</span>
          </button>
          <span className="footer-copyright">© {new Date().getFullYear()} Aotumuri · Built with Codex, directed and reviewed by me.</span>
          <a href="#home">
            Back to surface <span aria-hidden="true">↑</span>
          </a>
        </footer>
        <BelowSeabed enabled={!intro} />
        <div
          className={`discovery-toast ${fishFound || aurora ? 'show' : ''}`}
          role="status"
          aria-live="polite"
        >
          {aurora ? '.w. < 呼んだ？' : fishFound ? 'きららん！ひかる魚！' : ''}
          {aurora && (
            <button onClick={() => setAurora(false)} aria-label="特別な演出を閉じる">
              ×
            </button>
          )}
        </div>
      </div>
      {intro && (
        <LogoIntro onDone={closeIntro} reduced={reduced} returnFocus={introOrigin.current} />
      )}
    </>
  );
}
