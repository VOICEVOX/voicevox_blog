# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 開発コマンド

### 基本コマンド

```bash
pnpm install
pnpm start
pnpm run test-build
pnpm run test:e2e
pnpm run fmt
pnpm run lint
```

詳細は README.md を参照。

### リソース更新

```bash
pnpm run updateVersion --editor_version="0.25.1" --resource_version="0.25.1" --nemo_version="0.24.0"
pnpm run generateLatestDefaultEngineInfos --github_release_url="..." --output_path="..."
pnpm run generateThumb
curl -s "$resource_url/editor/README.md" | pnpm run updateMarkdown -t "src/pages/term.md"
```

### スナップショット更新

```bash
gh workflow run "Test" --repo <fork-repo> --ref <branch> -f update_snapshots=true
```

スナップショット更新後は空コミットをプッシュしてテストを再実行する。

## アーキテクチャ

### 技術スタック

- **フレームワーク**: Astro 5
- **UI**: React 19（インタラクティブなコンポーネント用）
- **スタイリング**: Tailwind CSS v4 + Radix UI
- **状態管理**: nanostores
- **テスト**: Playwright（E2E、VRT）

### ディレクトリ構造

- `src/pages/`: ページコンポーネント（Astro）
- `src/components/`: 再利用可能なコンポーネント
  - Astroファイル: 大文字始まりはコンポーネント
  - React: インタラクティブな機能が必要な場合
- `src/constants/`: 定数定義、キャラクター情報
- `src/store/`: nanostoresによるグローバル状態
- `src/assets/`: 静的アセット（画像、音声）
- `tests/e2e/`: Playwrightテスト

## デザイン

### 目的

音声合成ソフトやキャラクターをより身近なものにするため

### デザインの対象

- いつ
  - 家にいるとき
- どこで
  - PCネイティブソフトウェア
- 誰に
  - 試しに使ってみる人
  - ゲーム実況したい人
  - 劇場を作りたい人
  - （動画投稿を仕事にしたい人？）
- なぜ
  - その作品を完成してもらうために
  - 良い作品にしてもらうために
  - ソフトウェアに思考のリソースを割かさせないために
- どのように
  - 使いたくなるように感じる
  - 性能が低いように感じない
  - 作品の完成形が想像できるような？

### デザインイメージ

- 作品作りの品質が上がるファーストビュー
- 作業の流れがわかるファーストビュー
- 若々しい
- 落ち着いた
- クリエイティブな
- ツール感のない
- シンプルな
- カジュアルな
- 自然な
- 今風な

### デザインルール

- アニメーションは禁止
  - 素早く動作することが最優先
  - マウスホバー時のフィードバックなどはアニメーションに含まれない
  - どうしてもアニメーションさせないとUXを損なう場合は例外的にOK
  - アニメーションさせる場合はメンテナやユーザーに確認すること
