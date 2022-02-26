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
editor_tag="0.10.4"
editor_url="https://raw.githubusercontent.com/VOICEVOX/voicevox/$editor_tag"

resource_tag="0.10.0"
resource_url="https://raw.githubusercontent.com/VOICEVOX/voicevox_resource/$resource_tag"

# 規約
curl -s "$resource_url/editor/README.md" > src/markdowns/softwareReadme.md
curl -s "$resource_url/character_info/388f246b-8c41-4ac1-8e2d-5d79f3ff56d9/policy.md" > src/markdowns/libraryReadmeTohoku.md
curl -s "$resource_url/character_info/35b2c544-660e-401e-b503-0e14c635303a/policy.md" > src/markdowns/libraryReadmeTsumugi.md
curl -s "$resource_url/character_info/3474ee95-c274-47f9-aa1a-8322163d96f1/policy.md" > src/markdowns/libraryReadmeHau.md
curl -s "$resource_url/character_info/b1a81618-b27b-40d2-b0ea-27a9ad408c4b/policy.md" > src/markdowns/libraryReadmeRitsu.md

# 使い方
curl -s "$editor_url/public/howtouse.md" > src/markdowns/howToUse.md
sed -r 's|src="([^"]+?)"|src="'$editor_url'/public/\1"|g' -i src/markdowns/howToUse.md

# Q&A
curl -s "$editor_url/public/qAndA.md" > src/markdowns/qAndA.md

# 変更履歴
curl -s "$editor_url/public/updateInfos.json" > src/data/updateInfos.json
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

## LICENSE

VOICEVOX の開発のための利用のみ許可されます。  
異なるライセンスを取得したい場合は、ヒホ（twitter: @hiho_karuta）に求めてください。

## 謝辞

`src/images/nc238325.jpg` ･･･ https://commons.nicovideo.jp/material/nc238325
