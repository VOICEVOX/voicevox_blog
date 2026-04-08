---
paths:
  - "src/**/*.{astro,tsx,css}"
---

## Tailwind CSS ルール

- レスポンシブクラスは必要な範囲にのみ適用せよ
- 特定のブレークポイント未満でのみ必要なスタイルには `max-*` バリアントを使え
  - Good: `max-md:mb-4`
  - Bad(全体に付与してから md 以上で打ち消す): `mb-4 md:mb-0`
- `leading-*` は原則使うな
  - 上下の幅を広げたい場合は padding や margin で制御せよ
  - ボタン系の `leading-none` や、複数行テキストの見た目調整には使ってよい
