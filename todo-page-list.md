## 低難易度（カスタムスタイル0行）

### 0. `/dev/ui/base/` (Baseレイアウト確認ページ)

- [x] 実装完了
- ファイル:
  - `src/pages/dev/ui/base/index.astro` (ライトモード)
  - `src/pages/dev/ui/base/dark.astro` (ダークモード)
  - `src/pages/dev/ui/base/nemo.astro` (Nemoモード)
- E2Eテスト: `tests/e2e/ui/dev-ui/base.spec.ts`

### 1. `/update_history/` (変更履歴ページ)

- [x] 実装完了
- ファイル: `src/pages/update_history/index.astro` (39行)
- E2Eテスト: なし
- Bulmaクラス: 6種類
- カスタムスタイル: 0行

### 2. `/news/` (ニュース一覧ページ)

- [x] 実装完了
- ファイル: `src/pages/news/index.astro` (38行)
- E2Eテスト: なし
- Bulmaクラス: 5種類
- カスタムスタイル: 0行

### 3. `/news/[slug]` (ニュース詳細ページ)

- [x] 実装完了
- ファイル: `src/pages/news/[slug].astro` (39行)
- E2Eテスト: なし
- Bulmaクラス: 6種類
- カスタムスタイル: 0行

### 4. `/dormitory/top_illust/[topIllustIndex]` (トップイラストページ)

- [x] 実装完了
- ファイル: `src/pages/dormitory/top_illust/[topIllustIndex].astro` (52行)
- E2Eテスト: なし
- Bulmaクラス: 4種類
- カスタムスタイル: 0行

---

## 中難易度（カスタムスタイル20～100行）

### 5. `/qa/` (Q&Aページ群)

- [x] 実装完了
- ファイル: `src/pages/qa/_layout.astro` (26行)
- E2Eテスト: なし
- Bulmaクラス: Bulmaのhelpersを`@extend`で使用
- カスタムスタイル: 15行（グローバルスタイル）
- 依存: OneSectionMarkdown.astro（未Tailwind化）

### 6. `/` (トップページ - Talk)

- [x] 実装完了
- ファイル: `src/pages/index.astro` (170行)
- E2Eテスト: `tests/e2e/ui/talk.spec.ts` ⭐
- Bulmaクラス: 24種類
- カスタムスタイル: 43行（メディアクエリ3個）
- 依存: すべてTailwind化済み ✓

### 7. `/product/[characterId]` (製品ページ)

- [x] 実装完了
- ファイル: `src/pages/product/[characterId].astro` (150行)
- E2Eテスト: `tests/e2e/ui/product.spec.ts` ⭐
- Bulmaクラス: 13種類
- カスタムスタイル: 77行（メディアクエリ1個、z-index使用）
- 依存: すべてTailwind化済み ✓

---

## 高難易度（カスタムスタイル100行以上）

### 8. `/dormitory/` (ボイボ寮トップページ)

- [x] 実装完了
- ファイル: `src/pages/dormitory/index.astro` (393行)
- E2Eテスト: なし（重要ページ）
- Bulmaクラス: 多数
- カスタムスタイル: 105行（背景画像、メディアクエリ1個）
- 依存: 一部未Tailwind化（EventsContainer, TopIllustsContainer, Nakayoshi）

### 8-1. `/dormitory/[characterId]` (ボイボ寮個別ページ)

- [x] 実装完了
- ファイル: `src/pages/dormitory/[characterId]/[...descriptionType].astro`
- E2Eテスト: なし（重要ページ）

### 9. `/nemo/` (Nemoページ)

- [x] 実装完了
- ファイル: `src/pages/nemo/index.astro` (279行)
- E2Eテスト: `tests/e2e/ui/nemo.spec.ts` ⭐
- Bulmaクラス: 18種類
- カスタムスタイル: 142行（CSS変数2個、メディアクエリ4個、カスタムフォント）
- 依存: SpeakerComponent（混合スタイル、z-index使用）

### 10. `/song/` (Songページ)

- [x] 実装完了
- ファイル: `src/pages/song/index.astro` (334行)
- E2Eテスト: `tests/e2e/ui/song.spec.ts` ⭐
- Bulmaクラス: 21種類
- カスタムスタイル: 189行（CSS変数1個、メディアクエリ3個、背景エフェクト、z-index使用）
- 依存: すべてTailwind化済み ✓

### 11. `/dormitory/call_names/` (呼称表ページ)

- [x] 実装完了
- ファイル: `src/pages/dormitory/call_names/index.astro` (343行) + 関連ファイル
- E2Eテスト: なし
- Bulmaクラス: 4種類
- カスタムスタイル: 279行（メディアクエリ3個、position: sticky）
- 注意: 二重スクロール問題
