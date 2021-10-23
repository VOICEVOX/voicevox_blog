# VOICEVOX BLOG

https://voicevox.hiroshiba.jp/

## add resource

```bash
resource_url="https://raw.githubusercontent.com/Hiroshiba/voicevox_resource"
tag="0.7.5"

curl -s "$resource_url/$tag/VOICEVOX/README.md" > src/markdowns/softwareReadme.md
curl -s "$resource_url/$tag/VOICEVOX%20LIBRARY/README.md" > src/markdowns/libraryReadme.md

# 使い方（工事中）
curl -sL https://github.com/Hiroshiba/voicevox/archive/refs/tags/$tag.zip >/tmp/voicevox.zip

unzip /tmp/voicevox -d /tmp/
ls /tmp/voicevox-$tag/public/howtouse.md
```

## debug

```bash
npm run develop
```

## deploy

```bash
npm run clean && npm run deploy
```
