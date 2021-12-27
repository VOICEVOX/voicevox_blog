# VOICEVOX BLOG

https://voicevox.hiroshiba.jp/

## add resource

```bash
resource_url="https://raw.githubusercontent.com/VOICEVOX/voicevox_resource"
tag="0.9.4"

# 規約
curl -s "$resource_url/$tag/editor/README.md" > src/markdowns/softwareReadme.md
curl -s "$resource_url/$tag/character_info/01_metan/policy.md" > src/markdowns/libraryReadmeTohoku.md
curl -s "$resource_url/$tag/character_info/03_tsumugi/policy.md" > src/markdowns/libraryReadmeTsumugi.md
curl -s "$resource_url/$tag/character_info/04_hau/policy.md" > src/markdowns/libraryReadmeHau.md
curl -s "$resource_url/$tag/character_info/05_ritsu/policy.md" > src/markdowns/libraryReadmeRitsu.md

# 使い方
editor_url="https://raw.githubusercontent.com/VOICEVOX/voicevox"
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
