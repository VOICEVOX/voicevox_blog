# VOICEVOX BLOG

https://voicevox.hiroshiba.jp/

## add resource

```bash
resource_url="https://raw.githubusercontent.com/Hiroshiba/voicevox_resource"
tag="0.9.1"

# 規約
curl -s "$resource_url/$tag/editor/README.md" > src/markdowns/softwareReadme.md
curl -s "$resource_url/$tag/core/README.md" > src/markdowns/libraryReadme.md

# 使い方
editor_url="https://raw.githubusercontent.com/Hiroshiba/voicevox"
curl -s "$editor_url/$tag/public/howtouse.md" > src/markdowns/howToUse.md
sed -r 's|src="([^"]+?)"|src="'$editor_url/$tag'/public/\1"|g' -i src/markdowns/howToUse.md
```

## debug

```bash
npm run develop
```

## deploy

```bash
npm run clean && npm run deploy
```

## LICENSE

VOICEVOX の開発のための利用のみ許可されます。  
異なるライセンスを取得したい場合は、ヒホ（twitter: @hiho_karuta）に求めてください。

## 謝辞

`src/images/nc238325.jpg` ･･･ https://commons.nicovideo.jp/material/nc238325
