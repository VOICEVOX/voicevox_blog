## Tailwind化タスクリスト（簡単順）

### ✅ 完了済み

- [x] **MarkdownModal** `src/components/modal/MarkdownModal.tsx`
  - モーダルベースコンポーネント

- [x] **PrivacyPolicyModal** `src/components/modal/MarkdownModals.tsx`
  - プライバシーポリシーモーダル

- [x] **NemoTermModal** `src/components/modal/MarkdownModals.tsx`
  - VOICEVOX Nemo 利用規約モーダル

- [x] **LibraryTermIntroModal** `src/components/modal/LibraryTermIntroModal.tsx`
  - 利用規約モーダル

- [x] **NemoGuidanceModal** `src/components/modal/NemoGuidanceModal.tsx`
  - VOICEVOX Nemo ご利用案内モーダル

- [x] **DownloadNemoModal** `src/components/modal/download/DownloadNemoModal.tsx`
  - Nemo エンジン ダウンロードモーダル

- [x] **DownloadModal** `src/components/modal/download/DownloadModal.tsx`
  - VOICEVOX ダウンロードモーダル

### 低難易度（基本レイアウトのみ、状態管理なし）

- [x] **Footer** `src/components/Footer.astro`
  - `button`, `is-small`, `is-dark` → Tailwindのボタンスタイル
  - `container`, `is-flex`, `is-justify-content-center` → Flexboxレイアウト

- [x] **TopIllustContainer** `src/pages/dormitory/_TopIllustContainer.astro`
  - シンプルなコンテナレイアウト → Tailwindで再現

- [x] **SoftwareFeature** `src/pages/_SoftwareFeature.astro`
  - Bulmaのグリッド・タイポグラフィ → Tailwindのグリッド・テキストスタイル

- [x] **EngineGuidanceSection** `src/pages/_EngineGuidanceSection.astro`
  - セクションレイアウト → Tailwindで再現

- [x] **OssGuidanceSection** `src/pages/_OssGuidanceSection.astro`
  - セクションレイアウト → Tailwindで再現

- [x] **LinkListSection** `src/pages/_LinkListSection.astro`
  - リストレイアウト → Tailwindで再現

- [x] **ExplainSection** `src/pages/dormitory/_ExplainSection.astro`
  - 基本的なセクションレイアウト → Tailwindで再現

- [ ] **CharacterCard (dormitory)** `src/pages/dormitory/_CharacterCard.astro`
  - カードスタイル → Tailwindで再現

- [ ] **CharacterCard (talk)** `src/pages/talk/_CharacterCard.astro`
  - カードスタイル → Tailwindで再現

### 中難易度（カスタムスタイルまたは軽い状態管理）

- [ ] **TypeButton** `src/pages/dormitory/[characterId]/_TypeButton.astro`
  - タブボタンのスタイル → Tailwindで再現

- [ ] **AudioSample (product)** `src/pages/product/AudioSample.tsx`
  - サンプルボイスUI（React版） → Tailwindで再現

- [ ] **AudioSample (talk)** `src/pages/talk/AudioSample.tsx`
  - サンプルボイスUI（React版） → Tailwindで再現

- [ ] **CharacterCard (song)** `src/pages/song/CharacterCard.tsx`
  - カードスタイル（React版） → Tailwindで再現

- [ ] **SpeakerComponent (nemo)** `src/pages/nemo/_SpeakerComponent.astro`
  - CVドロップダウン＋ボタン＋サンプルボイス → Tailwindで再現

- [ ] **CallBox** `src/pages/dormitory/[characterId]/_CallBox.astro`
  - ボックスレイアウト → Tailwindで再現

### 高難易度（複雑な状態管理・インタラクション）

- [ ] **PlayButton** `src/components/PlayButton/PlayButton.tsx`
  - `button`, `is-primary`, `is-loading` → Tailwindのボタン＋ローディング状態
  - `circle-icon` → カスタムスタイル（そのまま残すかTailwindで再現）
  - 複雑な状態管理、カスタムフック、CSSカスタムプロパティ

- [ ] **Product TopContainer** `src/pages/product/_TopContainer.astro`
  - 複雑なレイアウト（キャラ表示＋キャラ一覧） → Tailwindで再現
  - nanostores、スクロール制御、110行以上のSCSS

- [ ] **StyleDropdown** `src/components/StyleDropdown.tsx`
  - `dropdown`, `dropdown-trigger`, `dropdown-menu`, `dropdown-content` → zag.jsのドロップダウン + Tailwindスタイル
  - `dropdown-item`, `button`, `is-rounded` → Tailwindで再現

- [ ] **Header** `src/components/Header/Header.tsx`
  - `navbar`, `navbar-brand`, `navbar-item`, `navbar-menu` → Tailwindのナビゲーション
  - `navbar-burger`, `navbar-end` → レスポンシブメニュー（zag.js検討）
  - `is-fixed-top`, `has-shadow` → Tailwindのfixed + shadow
  - Intersection Observer、状態管理はそのまま維持

---

## 参考情報

### Tailwind化の方針

1. **デザインを大きく変えない**
   - 既存のスクリーンショットと細かいところまで見比べる
   - レイアウト、余白、サイズ、色を可能な限り維持

2. **カラーパレット**
   - Primary color: カスタムカラー（既存のまま）
   - その他: Tailwindの標準カラーを使用

3. **zag.jsの使用判断**
   - 状態管理が複雑なコンポーネント（ドロップダウン、メニュー等）で検討
   - シンプルなコンポーネントは不要

4. **実装の流れ**
   - 元のコンポーネントを直接Tailwindで置き換え
   - Bulma版のcomputed styleを確認(特にmargin-bottom)
   - 開発サーバーでPlaywrightを使って動作確認
   - ユーザーに確認を依頼（AskSkill）
   - スクリーンショット更新: `pnpm run test:e2e --update-snapshots=all tests/e2e/ui/dev-ui/`

### 主要なBulmaクラスとTailwind対応（適宜更新）

| Bulmaクラス                  | Tailwind対応例                                                                                                     |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| `section`                    | `py-12`                                                                                                            |
| `title`(h2, 32px)            | `text-3xl font-bold mb-6` (Bulmaのmargin-bottomは24px)                                                             |
| `title is-4`(h2, 24px)       | `text-2xl font-bold mb-6` (Bulmaのmargin-bottomは24px)                                                             |
| `is-size-5`                  | `text-xl`                                                                                                          |
| `is-size-6`(p)               | `text-base` (Bulmaのmargin-bottomは0px)                                                                            |
| `has-text-weight-bold`       | `font-bold`                                                                                                        |
| `is-underlined`              | `underline`                                                                                                        |
| `button`                     | `px-4 py-2 rounded font-medium`                                                                                    |
| `buttons`                    | `flex flex-wrap gap-2`                                                                                             |
| `is-primary`                 | `bg-primary text-white hover:bg-primary-dark`                                                                      |
| `is-small`                   | `text-sm px-3 py-1`                                                                                                |
| `is-dark`                    | `bg-gray-800 text-white`                                                                                           |
| `is-loading`                 | カスタムローディングスピナー＋`opacity-50 cursor-wait`                                                             |
| `is-rounded`                 | `rounded-full`                                                                                                     |
| `container`                  | `container mx-auto px-4`                                                                                           |
| `is-max-desktop`             | `max-w-[960px]`                                                                                                    |
| `is-flex`                    | `flex`                                                                                                             |
| `is-flex-direction-column`   | `flex-col`                                                                                                         |
| `is-justify-content-center`  | `justify-center`                                                                                                   |
| `mt-3`                       | `mt-3` (Bulmaと同じ)                                                                                               |
| リンク色 (`$link: $primary`) | `text-[rgb(48,100,57)] hover:text-[rgb(38,80,47)] dark:text-[rgb(165,212,173)] dark:hover:text-[rgb(185,232,193)]` |
| `jump-anchor-header-padding` | `pt-[calc(3.25rem+1rem)] -mt-[calc(3.25rem+1rem)]`                                                                 |
| `navbar`                     | `fixed top-0 w-full bg-white shadow`                                                                               |
| `dropdown`                   | zag.jsのドロップダウン + Tailwindスタイル                                                                          |

### 複雑さの目安

| レベル  | コンポーネント                                                                                                                                                   | 備考                               |
| ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------- |
| ✅ 完了 | Modal系（MarkdownModal, PrivacyPolicyModal, NemoTermModal, LibraryTermIntroModal, NemoGuidanceModal, DownloadModal, DownloadNemoModal）, Footer, SoftwareFeature | zag.js dialog + Tailwind化完了     |
| 低      | TopIllustContainer, EngineGuidanceSection, OssGuidanceSection, LinkListSection, ExplainSection, CharacterCard (dormitory/talk)                                   | 基本レイアウトのみ、状態管理なし   |
| 中      | TypeButton, AudioSample, CharacterCard (song), SpeakerComponent, CallBox                                                                                         | カスタムスタイルまたは軽い状態管理 |
| 高      | PlayButton, Product TopContainer, StyleDropdown, Header                                                                                                          | 複雑な状態管理・インタラクション   |
