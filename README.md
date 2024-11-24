```sh
pnpm start

pnpm run eslint
```

### TODO

- [ ] sitemap の比較
- [ ] ニュースの RSS？
- [ ] Bulma の scss が重い
- [ ] canonical URL が以前と一致することを確認
- [ ] Google Analytics の疎通チェック
- [ ] ダウンロードボタンから利用規約に飛ぶと React から`Invalid hook call`エラーが出てモーダルが出なくなる
- [ ] たぶん font-smoothing が効いてないけど macOS でちゃんと動くか確認

### なんとなくのコーディングルールメモ

- アセット用のディレクトリはスネークケース
- インポート済みの画像は定数(constants)として良い
- 大文字始まりの Astro ファイルはコンポーネント
- インタラクティブが必要なものは無理せず React にしたほうが良い
  - 単純なボタンとかだけでも React のほうがコーディングしやすい
  - けど Astro 考えると`<script>`のが考えること少ないこともあり、判断が難し
- React コンポーネントへのスタイル適用は helper.scss か、Astro でラップして`<style>`に書く
  - CSS in JS を使わない理由は単によく知らないから
  - Bulma から Tailwind に移行したいかも
- コンポーネントをまたぐインタラクティブな挙動は Store を使う
  - React hook は Astro 内で使えないので、なるべく使わない方針が良さそう？
- 静的ページやコンポーネントは Astro で作るのを意識すると楽
  - 画像の読み込みとか、ディレクティブとかが便利
- 子へのスタイル適用は Astro 内の is:global を使うと楽
