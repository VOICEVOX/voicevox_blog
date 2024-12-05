# VOICEVOX BLOG

VOICEVOX の公式サイトのリポジトリです。  
https://voicevox.hiroshiba.jp/

## 環境構築

Node v20.12.2、pnpm v9.12.3 を用いて開発されています。

```bash
npm install -g pnpm
pnpm install
```

## ローカル環境でチェック

```bash
pnpm start
```

## deploy

```bash
pnpm run deploy
```

### プレビュー版

[プレビュー版ページ](https://preview--voicevox.netlify.app/)

Netlify を使ってプレビュー環境デプロイを行っています。
`preview`ブランチに push すると、Netlify のプレビュー環境にデプロイされます。

```bash
# ビルド
pnpm run preview-build
```

## リソース情報の更新

コードの更新

```bash
EDITOR_VERSION="0.21.1"
RESOURCE_VERSION="0.21.1"
NEMO_VERSION="0.21.0"

pnpm run updateVersion \
  --editor_version="$EDITOR_VERSION" \
  --resource_version="$RESOURCE_VERSION" \
  --nemo_version="$NEMO_VERSION"
```

リソースの更新

```bash
editor_tag="0.21.1"
editor_url="https://raw.githubusercontent.com/VOICEVOX/voicevox/$editor_tag"

resource_tag="0.21.1"
resource_url="https://raw.githubusercontent.com/VOICEVOX/voicevox_resource/$resource_tag"

# 規約
curl -s "$resource_url/editor/README.md" |
  pnpm run updateMarkdown -t "src/pages/term.md"

# 使い方
curl -s "$editor_url/public/howtouse.md" |
  sed -r 's|src="([^"]+?)"|src="'$editor_url'/public/\1"|g' |
  pnpm run updateMarkdown -t "src/pages/how_to_use.md"

# Q&A
curl -s "$editor_url/public/qAndA.md" |
  pnpm run updateMarkdown -t "src/pages/qa/index.md"

# 変更履歴
curl -s "$editor_url/public/updateInfos.json" \
  >src/pages/update_history/updateInfos.json

# デフォルトエンジンの更新情報
pnpm run generateLatestDefaultEngineInfos
```

## 音量に関して

ffmpeg で音量を調べて、だいたい LUFS 値が -20~-23 になるように調整しています。

```bash
# 音量を調べる
audio_file=audio.wav
ffmpeg -nostats -i $audio_file -filter_complex ebur128 -f null - </dev/null 2>&1 |
  grep -3 "Integrated loudness:" |
  grep "I:" |
  tail -n1

# 音量を調整する（例えば -17 LUFS を -20 LUFS くらいにしたい場合は volume=-3dB にする）
audio_file=audio.wav
output_file=output.wav
ffmpeg -i $audio_file -af volume=-3dB $output_file
```

## サムネイル生成

一部のサムネイルは HTML をレンダリングしたものを画像化しています。
次のコマンドで更新してください。

```bash
# 起動
pnpm start

# しばらくしてから実行
pnpm run generateThumb
```

## テスト

### e2e テスト

ビルドしたあと Playwright を使って e2e テストを行っています。Windows 環境でのテストを想定しています。

```bash
pnpm run test-build

pnpm run test:e2e
pnpm run test:e2e --update-snapshots # スナップショットを更新する場合
pnpm run test:e2e --ui # 開発時は UI モードが便利
```

### タイポチェック

[typos](https://github.com/crate-ci/typos) を使ってタイポのチェックを行っています。  
ブランチをプッシュすると自動でテストされます。

## TODO

- [ ] meta descriptのキャラ説明から`<br >`を抜く
- [ ] import 順序についてのルールを決める
- [ ] スマホ画面でのソングの売り文句が見切れてる
- [ ] canonical URL が以前と一致することを確認
- [ ] Google Analytics の疎通チェック
- [ ] たぶん font-smoothing が効いてないけど macOS でちゃんと動くか確認

## 開発者向け案内

### なんとなくのコーディングルール

- pages に置くアセット用のディレクトリはスネークケース
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

### モードと効果の表

|                        | デフォルト | isDevelopment | isProduction | isPreview | isTest |
| ---------------------- | ---------- | ------------- | ------------ | --------- | ------ |
| Google Analytics       | 有効       | 無効          |              | 無効      | 無効   |
| robots                 | 有効       |               |              | 無効      |        |
| キャラサムネ画像がない | 無視       |               | エラー       |           |        |

## LICENSE

VOICEVOX の開発のための利用のみ許可されます。  
異なるライセンスを取得したい場合は、ヒホ（twitter: @hiho_karuta）に求めてください。

## 謝辞

- https://commons.nicovideo.jp/material/nc238325
