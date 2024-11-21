```sh
pnpm start
```

### TODO

- [ ] favicon 等の設定
- [ ] sitemap 確認
- [ ] ニュースの RSS？
- [ ] Bulma の scss が重い
- [ ] canonical URL が以前と一致することを確認
- [ ] Google Analytics の設定
- [ ] ダウンロードボタンから利用規約に飛ぶと React から`Invalid hook call`エラーが出てモーダルが出なくなる

### なんとなくのコーディングルールメモ

- アセット用のディレクトリはスネークケース
- インポート済みの画像は定数(constants)として良い
- 大文字始まりの Astro ファイルはコンポーネント
