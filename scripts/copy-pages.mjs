import { readFile, writeFile } from 'node:fs/promises';

const homePage = await readFile('dist/index.html', 'utf8');
const createExcludedPage = (title, description) =>
  homePage
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${title}</title>`)
    .replace(
      /<meta\s+name="description"[\s\S]*?\/>/,
      `<meta name="description" content="${description}" />`,
    )
    .replace(/<link rel="canonical"[^>]*\/>\s*/, '')
    .replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>\s*/, '')
    .replace(/<meta\s+(?:property="og:|name="twitter:)[\s\S]*?\/>\s*/g, '')
    .replace('</head>', '    <meta name="robots" content="noindex" />\n  </head>');

await Promise.all([
  writeFile(
    'dist/404.html',
    createExcludedPage(
      '404 — ページが見つかりません | Aotumuri',
      '指定したURLに該当するページはありません。公開中の作品はAotumuriのトップページからご覧ください。',
    ),
  ),
  writeFile(
    'dist/secret.html',
    createExcludedPage('隠しページ — Aotumuri', 'Aotumuriの隠しページです。'),
  ),
  writeFile('dist/.nojekyll', ''),
]);
