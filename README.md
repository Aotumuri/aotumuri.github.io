# Aotumuri

私用のサイトです。
特に他に人に再利用できると思って作っていないのです。

隠し要素のネタバレもあるのでここはみないでね。

## 起動・確認

Node.js 22 LTSを推奨します（Viteの要件はNode.js 20.19以上または22.12以上）。

```sh
npm ci
npm run dev
```

表示されたローカルURLを開きます。

```sh
npm run typecheck
npm run build
npm run preview
```

`dist/` がそのまま公開できます。開発サーバーを停止するにはターミナルで `Ctrl+C`。

実施した検証と未検証事項は [検証記録](docs/verification.md) を参照してください。

## 内容を編集する

- `src/content.ts`：名前、キャッチコピー、自己紹介、制作物、技術、連絡先。
- `src/styles.css`：連続した背景グラデーション、余白、文字、動き、モバイル表示。
- `src/components/Ocean.tsx`：波、光、泡、魚、クラゲ、海底のSVG装飾。
- `src/components/OceanScenery.css`：水の反射、遠くの魚群・エイ・クラゲ、深海の光、岩・海藻・遺跡の配置と動き。装飾はセクションの位置と高さに追従します。
- `src/components/Works.tsx` / `Works.css`：OpenFrontの参加実績と制作物一覧。
- 制作物の「使ってみる」は `src/data/github-activity.json` の `homepage`、ソースコードは `url` に進みます。`homepage` が未設定の場合、「使ってみる」は表示しません。
- スマートフォンでは水深ナビゲーションが画面下の固定メニューに切り替わります。既存の英語表記で現在位置を表示し、端末下部のセーフエリアに対応しています。
- `src/data/github-activity.json`：OpenFrontの役割・代表PR・MLSリンクと、公開リポジトリ情報。
- `src/components/LogoIntro.tsx`：初回のロゴ表示、スキップ、フェード。
- `src/components/BelowSeabed.tsx`：海底の停止位置でスクロールを遮断し、次の下方向の操作で解除・秘密のリンクを表示。
- `src/hooks/useOcean.ts`：表示領域の検出、深度表示、`.w.` ショートカット。
- `src/App.tsx`：各セクション、秘密のページ、404。
- `src/components/ProjectFinder.tsx` / `ProjectFinder.css`：404の作品検索と、アクセスしたURLに対応する作品のトップへの案内。
- `src/data/hub-projects.json`：hubの作品一覧の保存データ（2026年11月1日取得）。404ではhubの公開JSONを読み込み、接続できない場合はこのデータを表示します。トップの厳選作品には追加しません。

404の一覧の提供元は [hub](https://github.com/Aotumuri/hub) の `_data/projects.json` です。作品名・説明で検索できます。URLのホストと作品パスが一致する場合だけ、作品のトップを候補として案内します。自動転送はしません。hubは過去の公開終了・移転履歴やリンクの稼働状況を記録していないため、一覧から作品の削除理由や現在の閲覧可否は断定しません。保存データを更新する場合は、hubの同ファイルの内容をコピーしてください。

制作物は本人所有の公開リポジトリから選び、説明・READMEを確認して掲載しています。仮のMemoxt・AI Researchカードは外しました。表示する制作物と分類、日本語の説明は `src/content.ts`、GitHub由来のメタデータは `src/data/github-activity.json` で編集できます。

連絡先は `url` が空の場合は表示しません。メールは `mailto:you@example.com`、Discordは公開可能な実際のリンクを設定してください。経験年数やスキルの数値は掲載していません。

### 制作物・OpenFrontの掲載方針

制作物はユーザー指定の12件だけを掲載します。掲載対象を自動追加する処理はありません。SKILLSとCONTACTも既存の内容を維持します。

OpenFrontは **Translation Lead（2026年10月現在）**、**マージ済みPR 100+**、指定された代表PR **#786 / #412** を固定表示します。同じ欄に **MLS Project** のCrowdin・Discordリンクを掲載します。日々変わる正確なPR件数、未マージ件数、確認日の更新表示は使いません。GitHub APIによる集計・更新スクリプトも外しています。

変更する場合は `src/data/github-activity.json` の `openfront` を編集してください。参照元は [掲載データの根拠](docs/works-sources.md) に記録しています。閲覧・ビルドにGitHub APIへの接続は不要です。

Google Fontsは任意の外部リクエストです。接続できない場合もシステムフォントで表示します。完全に外部リクエストをなくしたい場合は、CSS冒頭の `@import` を削除できます。

## GitHub Pagesへの公開

この作業フォルダーには最初からGitリポジトリやリモート設定がありませんでした。必要に応じてGitHub上でリポジトリを作成し、このフォルダーのファイルを登録してください。

1. GitHubリポジトリの **Settings → Pages → Build and deployment → Source** を **GitHub Actions** にします。
2. `main` ブランチにファイルをpushします（別のデフォルトブランチなら `.github/workflows/deploy.yml` の対象を変更）。
3. **Actions → Deploy to GitHub Pages** の成功後、**Settings → Pages** の公開URLを開きます。

ワークフローは `actions/configure-pages` の `base_path` をViteの `BASE_PATH` に渡します。`Aotumuri-site` 等のプロジェクトサイトと、`Aotumuri.github.io` のルートサイトの両方に対応します。
このリポジトリの公開先は `https://aotumuri.github.io/` です。canonical URLとsitemapはこのルートURLを指します。

`public/robots.txt` はGoogle・Bing・DuckDuckGo・Apple・Baidu・Yandex・Naverの検索用クローラーとGoogleのURL検査を許可し、その他は原則拒否します。Google検索のAI Overviews・AI Modeは許可対象です。Google-Extended（Geminiの学習・グラウンディング）とApplebot-Extended（AI学習）は許可しません。これはクローラーへの巡回方針であり、アクセス制限ではありません。ルートのrobots.txtは同じホスト配下のプロジェクトサイトにも適用されます。

手動でプロジェクトパスでのアセット動作を確認する場合（検索用canonicalは引き続き公開ルートを指します）：

```sh
BASE_PATH=/Aotumuri-site/ npm run build
npm run preview -- --base /Aotumuri-site/
```

このとき `/Aotumuri-site/` で表示を確認します。画像・JS・秘密のページ・水面へのリンクはすべてこのbaseに従います。

### 独自ドメイン

GitHub PagesのSettingsで独自ドメインとDNSを設定し、HTTPSを有効にします。必要な場合は実際のドメインだけを書いた `public/CNAME` を追加してください。ドメインを勝手に設定するファイルは用意していません。

独自ドメインでは通常baseは `/` です。Pages側で正しくドメインを設定すればワークフローが対応します。手動公開する場合は `BASE_PATH=/ npm run build` を使用します。

## 実装上の配慮

- 各セクションの背景を分割せず、ページ全体を1つのグラデーションにします。
- 深度メーターは演出上の水深です。スクロール更新はrequestAnimationFrame内のDOM更新にまとめ、スクロールごとのReact再描画を避けます。
- セクションの表示とナビの現在位置はIntersection Observerを使用します。
- 装飾は読み上げ対象から外し、リンクと魚・宝箱はキーボードで操作できます。
- ロゴ表示中は背景をinertにし、再生後には元の操作位置へフォーカスを戻します。
- 不要なSNSやメールアドレス、未設定のリンクは表示しません。
- ロゴの提供元ファイルの利用条件は、権利者の条件に従ってください。
