# UI Showcase

コンポーネントの目視確認とスクリーンショット VRT 用のページ群。本番には出ない。

## ページ追加手順

1. `src/pages/dev/showcase/<kebab-name>/index.astro` を作る（単一ファイルなら `src/pages/dev/showcase/<kebab-name>.astro`）
2. `_Showcase.astro` をレイアウトとして使い、`title` にコンポーネント名を入れる
3. 実プロダクトで使われる形に近い最小構成のサンプルを並べる
4. section/装飾クラス/ラベル文言は書かない

適用するclassは周囲のコードに合わせておくとより良い。

```astro
---
import MyComponent from "@/components/MyComponent.astro";
import Showcase from "../_Showcase.astro";
---

<Showcase title="MyComponent">
  <MyComponent />
</Showcase>
```

ダーク背景が必要な場合は `bodyClass` を使う:

```astro
<Showcase title="MyComponent" bodyClass="bg-black text-white">
  <MyComponent />
</Showcase>
```
