# VOICEVOX BLOG

VOICEVOX の公式サイトのリポジトリです。  
https://voicevox.hiroshiba.jp/

## 環境構築

Node v14.17.4、npm v6.14.14 を用いて開発されています。

```bash
npm ci
```

## ローカル環境でチェック

```bash
npm run develop
```

もしくは

```bash
npm run build && npm run serve
```

## deploy

```bash
npm run clean && npm run deploy
```

## add resource

```bash
editor_url="https://raw.githubusercontent.com/VOICEVOX/voicevox"
resource_url="https://raw.githubusercontent.com/VOICEVOX/voicevox_resource"
tag="0.9.4"

# 規約
curl -s "$resource_url/$tag/editor/README.md" > src/markdowns/softwareReadme.md
curl -s "$resource_url/$tag/character_info/01_metan/policy.md" > src/markdowns/libraryReadmeTohoku.md
curl -s "$resource_url/$tag/character_info/03_tsumugi/policy.md" > src/markdowns/libraryReadmeTsumugi.md
curl -s "$resource_url/$tag/character_info/04_hau/policy.md" > src/markdowns/libraryReadmeHau.md
curl -s "$resource_url/$tag/character_info/05_ritsu/policy.md" > src/markdowns/libraryReadmeRitsu.md

# 使い方
curl -s "$editor_url/$tag/public/howtouse.md" > src/markdowns/howToUse.md
sed -r 's|src="([^"]+?)"|src="'$editor_url/$tag'/public/\1"|g' -i src/markdowns/howToUse.md

# TODO: Q&A

# 変更履歴
curl -s "$editor_url/$tag/public/updateInfos.json" > src/data/updateInfos.json
```

## LICENSE

VOICEVOX の開発のための利用のみ許可されます。  
異なるライセンスを取得したい場合は、ヒホ（twitter: @hiho_karuta）に求めてください。

## 謝辞

`src/images/nc238325.jpg` ･･･ https://commons.nicovideo.jp/material/nc238325
