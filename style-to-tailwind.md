# style から Tailwind へ置き換えられる箇所の棚卸し

## 対象範囲

- `src` / `public` 配下を対象に、`style=...` と `<style>...</style>` を検索
- `node_modules`、build 出力、レポート類は除外
- 検出件数:
  - `style=`: 82 箇所
  - `<style>` ブロック: 2 箇所

## 判定基準

- `可`: `style` を消して Tailwind クラスへ直接置換できる
- `一部可`: static な部分は Tailwind 化できるが、動的値やコンポーネント API の都合で `style` を完全には消せない
- `不可寄り`: 任意の `style` 受け渡しや動的値注入が主目的で、Tailwind 置換は不自然

## 一覧

| 箇所                                           | 現在の記述                                                                              | 判定     | Tailwind 置換案                                                                                                                                                                                                  | メモ                                                             |
| ---------------------------------------------- | --------------------------------------------------------------------------------------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------- |
| `src/pages/qa/_layout.astro:25`                | `.qa-content .markdown h2/h3` の padding / 背景色 / 文字色を `<style is:global>` で指定 | 可       | 親に `"[&_.markdown_h2]:p-4 [&_.markdown_h2]:bg-primary [&_.markdown_h2]:text-[#3f213a] [&_.markdown_h3]:p-2 [&_.markdown_h3]:bg-[oklch(96.2%_0.044_156.743)] [&_.markdown_h3]:text-[oklch(13%_0.028_261.692)]"` | 可読性は少し落ちるが、Tailwind だけで表現可能                    |
| `src/components/PlayButton/index.astro:23`     | `style` prop をそのまま子へ転送                                                         | 不可寄り | なし                                                                                                                                                                                                             | コンポーネント API として任意 style を受けているため             |
| `src/components/PlayButton/PlayButton.tsx:129` | `style` prop と `color` を合成して `IconButton` へ渡す                                  | 不可寄り | なし                                                                                                                                                                                                             | 任意 style 転送が主目的。`color` だけなら CSS 変数化の余地はある |
| `src/pages/_SoftwareFeature.astro:17`          | ルート `div` に任意 `style` prop を転送                                                 | 不可寄り | なし                                                                                                                                                                                                             | これもコンポーネント API                                         |
| `src/pages/song/_CharacterCard.tsx:100`        | `LinkToProductPage` が任意 `style` を受ける                                             | 不可寄り | なし                                                                                                                                                                                                             | コンポーネント API                                               |

## まとめ

- `style` が残りやすいのは:
  - 既存実装として CSS 変数注入を使っている箇所
  - コンポーネントの任意 `style` 転送
  - `Button` のように CSS 変数注入を前提にした API
- 完全になくすには、単純な class 置換だけでなく:
  - コンポーネント API を `class` / `tone` 寄りに寄せる
    といった設計変更が必要な箇所もあります。
