import { openfront, profile, projectGroups, projects } from '../content';
import './Works.css';

export default function Works() {
  return (
    <>
      <div className="section-heading">
        <div>
          <h2 id="works-title">
            Works &amp; <em>OSS.</em>
          </h2>
          <p className="section-subtitle">参加しているものと、自分で作ったもの</p>
        </div>
        <span className="small-label">PUBLIC PROJECTS / {projects.length}</span>
      </div>

      <article className="oss-contribution" aria-labelledby="openfront-title">
        <div className="oss-overview">
          <div>
            <p className="small-label">OSSへの参加</p>
            <h3 id="openfront-title">
              <a
                href="https://github.com/openfrontio/OpenFrontIO"
                target="_blank"
                rel="noopener noreferrer"
              >
                OpenFront <span aria-hidden="true">↗</span>
              </a>
            </h3>
            <p>
              ブラウザで遊べるリアルタイムストラテジーゲームです。
              <br />
              翻訳を取りまとめる{openfront.role}を担当しています（{openfront.asOf}）。
              <br />
              UIの改善や不具合修正など、開発にも参加しています。
            </p>
          </div>
        </div>
        <dl className="contribution-statistics">
          <div>
            <dt>マージ済みPR</dt>
            <dd>
              <a
                href={openfront.mergedUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="マージ済みPR 100件以上。GitHubで確認"
              >
                {openfront.mergedDisplay}
              </a>
            </dd>
          </div>
        </dl>
        <div className="contribution-examples">
          <span>代表的なPR</span>
          <ul>
            {openfront.examples.map((example) => (
              <li key={example.number}>
                <a href={example.url} target="_blank" rel="noopener noreferrer">
                  <span>#{example.number}</span>
                  {example.title}
                  <span aria-hidden="true">↗</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
        <section className="mls-project" aria-labelledby="mls-title">
          <div>
            <h4 id="mls-title">{openfront.mls.name}</h4>
            <p>{openfront.mls.description}</p>
          </div>
          <div className="mls-links">
            {openfront.mls.links.map(link => (
              <a
                className="underlined-link"
                key={link.label}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {link.label}<span aria-hidden="true">↗</span>
              </a>
            ))}
          </div>
        </section>
      </article>

      <div className="own-projects-heading">
        <h3>その他作ったもの</h3>
        <span>公開しているものから、いくつか。</span>
      </div>
      <div className="project-groups">
        {projectGroups.map((group) => (
          <section
            className="project-group"
            key={group.id}
            aria-labelledby={`project-group-${group.id}`}
          >
            <h4 id={`project-group-${group.id}`}>{group.name}</h4>
            <ul>
              {projects
                .filter((project) => project.group === group.id)
                .map((project) => (
                  <li key={project.name}>
                    <a
                      className="repository-link"
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span className="repository-name">{project.name}</span>
                      <span aria-hidden="true">↗</span>
                    </a>
                    <p>{project.description}</p>
                    {project.language && (
                      <span className="repository-language">{project.language}</span>
                    )}
                    <div className="project-actions">
                      {project.homepage && (
                        <a
                          className="project-visit"
                          href={project.homepage}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${project.name}を使ってみる（新しいタブ）`}
                        >
                          使ってみる <span aria-hidden="true">↗</span>
                        </a>
                      )}
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${project.name}のソースコードをGitHubで見る（新しいタブ）`}
                      >
                        ソースコード <span aria-hidden="true">↗</span>
                      </a>
                    </div>
                  </li>
                ))}
            </ul>
          </section>
        ))}
      </div>
      <div className="works-footer">
        <a
          href={`${profile.github}?tab=repositories`}
          target="_blank"
          rel="noopener noreferrer"
          className="underlined-link"
        >
          GitHubの一覧へ <span aria-hidden="true">↗</span>
        </a>
      </div>
    </>
  );
}
