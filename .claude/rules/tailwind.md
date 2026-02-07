---
paths:
  - "src/**/*.{astro,tsx,css}"
---

## Tailwind CSS ルール

- レスポンシブクラスは必要な範囲にのみ適用せよ
- 特定のブレークポイント未満でのみ必要なスタイルには `max-*` バリアントを使え
- Good: `max-md:mb-4`
- Bad: `mb-4 md:mb-0`
  - 全体に付与してから md 以上で打ち消している
