/**
 * このブログからダウンロードするVOICEVOXのバージョンを更新するスクリプト。
 * 複数箇所に書かれているバージョンを書き換える必要があり、それを一括で行える。
 */

import yargs from "yargs"
import { hideBin } from "yargs/helpers"

import fs from "fs"

const argv = yargs(hideBin(process.argv))
  .option("editor_version", {
    type: "string",
  })
  .option("resource_version", {
    type: "string",
  })
  .option("nemo_version", {
    type: "string",
  })
  .help()
  .parse()

function updateFile(path: string, before: RegExp, after: string) {
  if (!fs.existsSync(path)) {
    throw new Error(`ファイルが存在しません: パス "${path}"`)
  }

  const file = fs.readFileSync(path, "utf-8")
  if (!before.test(file)) {
    throw new Error(
      `置き換え対象が存在しません: パス "${path}": 正規表現 "${before}"`
    )
  }

  const updated = file.replace(before, after)
  fs.writeFileSync(path, updated)
}

async function main() {
  const editorVersion = (await argv).editor_version
  const resourceVersion = (await argv).resource_version
  const nemoVersion = (await argv).nemo_version

  console.log(`editor_version: ${editorVersion}`)
  console.log(`resource_version: ${resourceVersion}`)
  console.log(`nemo_version: ${nemoVersion}`)

  // README.md
  if (editorVersion != undefined) {
    updateFile(
      "./README.md",
      /editor_tag=".*?"/,
      `editor_tag="${editorVersion}"`
    )
  }
  if (resourceVersion != undefined) {
    updateFile(
      "./README.md",
      /resource_tag=".*?"/,
      `resource_tag="${resourceVersion}"`
    )
  }

  // src/constants.ts
  if (editorVersion != undefined) {
    updateFile(
      "./src/constants.ts",
      /export const APP_VERSION = ".*?"/,
      `export const APP_VERSION = "${editorVersion}"`
    )
  }
  if (nemoVersion != undefined) {
    updateFile(
      "./src/constants.ts",
      /export const NEMO_VERSION = ".*?"/,
      `export const NEMO_VERSION = "${nemoVersion}"`
    )
  }

  // src/scripts/linuxInstallCpu.sh
  if (editorVersion != undefined) {
    updateFile(
      "./src/scripts/linuxInstallCpu.sh",
      /VOICEVOX\/voicevox\/.*?\//,
      `VOICEVOX/voicevox/${editorVersion}/`
    )
    updateFile(
      "./src/scripts/linuxInstallCpu.sh",
      /VERSION=.*?\s/,
      `VERSION=${editorVersion} `
    )
  }

  // src/scripts/linuxInstallNvidia.sh
  if (editorVersion != undefined) {
    updateFile(
      "./src/scripts/linuxInstallNvidia.sh",
      /VOICEVOX\/voicevox\/.*?\//,
      `VOICEVOX/voicevox/${editorVersion}/`
    )
    updateFile(
      "./src/scripts/linuxInstallNvidia.sh",
      /VERSION=.*?\s/,
      `VERSION=${editorVersion} `
    )
  }
}
main()
