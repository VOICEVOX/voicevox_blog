# VOICEVOX BLOG

https://voicevox.hiroshiba.jp/

## add resource

```bash
resource_url="https://raw.githubusercontent.com/Hiroshiba/voicevox_resource"
tag="0.7.3"

curl -s "$resource_url/$tag/VOICEVOX/README.md" > src/markdowns/softwareReadme.md
curl -s "$resource_url/$tag/VOICEVOX%20LIBRARY/README.md" > src/markdowns/libraryReadme.md
```

## debug

```bash
npm run develop
```

## deploy

```bash
npm run clean && npm run deploy
```
