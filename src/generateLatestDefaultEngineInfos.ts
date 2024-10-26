/**
 * VOICEVOX ENGINEのGithub releasesの情報から最新のvvppおよびvvpppのリンク先を取得し、
 * デフォルトエンジンの更新情報をjson形式で出力する。
 */

/*

jsonファイルの形式は以下の通り

```JSONC
{
  //[number] ファイル構造バージョン（仕様変更毎にインクリメントされる）
  "formatVersion": 1,

  // エンジンの情報
  "00000000-0000-0000-0000-000000000001": {
    // Windowsの情報
    "windows": {
      "x64": {
        "CPU": {
          //[string] バージョン
          "version": "x.x.x",

          // vvppやvvpppの情報
          "packages": [
            {
              //[string] ダウンロードURL
              "url": "https://example.com/",

              //[string] ファイル名
              "name": "example.vvpp",

              //[number] バイト数
              "size": 123456,

              //[string(Optional)] ハッシュ値
              "hash": "xxxxxxx",
            },
            //...
          ]
        },
        "GPU/CPU": {}
      }
    },

    "macos": {
      "x64": {
        "CPU": {}
      },
      "arm64": {
        "CPU": {}
      }
    },

    "linux": {
      "x64": {
        "CPU": {},
        "GPU/CPU": {}
      }
    }
  }
}
*/

import fs from "fs"
import semver from "semver"
import yargs from "yargs"
import { hideBin } from "yargs/helpers"

const argv = yargs(hideBin(process.argv))
  .option("output_path", {
    alias: "o",
    demandOption: true,
    type: "string",
    default: "src/data/latestDefaultEngineInfos.json",
  })
  .help()
  .parse()

const GITHUB_RELEASES_URL =
  "https://api.github.com/repos/VOICEVOX/voicevox_engine/releases"
const ENGINE_ID = "074fc39e-678b-4c13-8916-ffca8d505d1d"

/** 対応するvvpp.txtの名前 */
function getVvppTxtName(version: string) {
  return {
    windows: {
      x64: {
        CPU: `voicevox_engine-windows-cpu-${version}.vvpp.txt`,
        "GPU/CPU": `voicevox_engine-windows-directml-${version}.vvpp.txt`,
      },
    },
    macos: {
      x64: {
        CPU: `voicevox_engine-macos-x64-${version}.vvpp.txt`,
      },
      arm64: {
        CPU: `voicevox_engine-macos-arm64-${version}.vvpp.txt`,
      },
    },
    linux: {
      x64: {
        CPU: `voicevox_engine-linux-cpu-${version}.vvpp.txt`,
        "GPU/CPU": `voicevox_engine-linux-nvidia-${version}.vvpp.txt`,
      },
    },
  }
}

async function main() {
  const output = {
    formatVersion: 1,
    [ENGINE_ID]: {},
  }

  let releases = await (await fetch(GITHUB_RELEASES_URL)).json()

  // draftとprereleaseを除外
  releases = releases.filter(
    (release: any) => !release.draft && !release.prerelease
  )

  // semverにマッチするバージョンのみを抽出
  releases = releases.filter((release: any) => semver.valid(release.tag_name))

  // バージョンでソート
  releases.sort((a: any, b: any) => semver.rcompare(a.tag_name, b.tag_name))

  // OS・アーキテクチャ・デバイスごとに処理
  for (const [os, arch, device] of [
    ["windows", "x64", "CPU"],
    ["windows", "x64", "GPU/CPU"],
    ["macos", "x64", "CPU"],
    ["macos", "arm64", "CPU"],
    ["linux", "x64", "CPU"],
    ["linux", "x64", "GPU/CPU"],
  ]) {
    // vvpp.txtがある最新のリリースを取得
    const release = releases.find((release: any) =>
      release.assets.some((asset: any) =>
        asset.name.match(getVvppTxtName(release.tag_name)[os][arch][device])
      )
    )
    if (release == undefined) {
      throw new Error(`vvpp.txtが見つかりませんでした: ${os} ${arch} ${device}`)
    }

    // バージョンとvvpp.txtのURLを取得
    const version = release.tag_name
    const vvppTxtUrl = release.assets.find((asset: any) =>
      asset.name.match(getVvppTxtName(version)[os][arch][device])
    ).browser_download_url

    // vvpp.txtからvvpp/vvpppのファイル名を取得
    const packageNames = (await (await fetch(vvppTxtUrl)).text())
      .trim()
      .split("\n")

    // 必要な情報を取得
    const packages = packageNames.map(packageName => {
      const asset = release.assets.find((asset: any) =>
        asset.name.includes(packageName)
      )
      if (asset == undefined) {
        throw new Error(`ファイルが見つかりませんでした: ${packageName}`)
      }
      return {
        url: asset.browser_download_url,
        name: asset.name,
        size: asset.size,
      }
    })

    // 記録
    output[ENGINE_ID][os] = output[ENGINE_ID][os] || {}
    output[ENGINE_ID][os][arch] = output[ENGINE_ID][os][arch] || {}
    output[ENGINE_ID][os][arch][device] = {
      version,
      packages,
    }

    // ログ
    console.log(`${os} ${arch} ${device}: ${version}`)
  }

  // 出力
  fs.writeFileSync((await argv).output_path, JSON.stringify(output, null, 2))
}
main()
