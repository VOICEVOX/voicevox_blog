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

*/
import fs from "fs";
import semver from "semver";
import { parseArgs } from "util";
import z from "zod";

const args = parseArgs({
  options: {
    github_release_url: { type: "string" },
    output_path: { type: "string" },
  },
}).values;

if (args.github_release_url == undefined) {
  throw new Error("github_release_urlが指定されていません");
}
if (args.output_path == undefined) {
  throw new Error("output_pathが指定されていません");
}

/** 対応するvvpp.txtの名前 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getVvppTxtName(version: string): any {
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
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const output: any = {
  formatVersion: 1,
};

let releases = z
  .object({
    tag_name: z.string(),
    draft: z.boolean(),
    prerelease: z.boolean(),
    assets: z.array(
      z.object({
        name: z.string(),
        browser_download_url: z.string(),
        size: z.number(),
      }),
    ),
  })
  .array()
  .parse(await (await fetch(args.github_release_url)).json());

// draftとprereleaseを除外
releases = releases.filter((release) => !release.draft && !release.prerelease);

// semverにマッチするバージョンのみを抽出
releases = releases.filter((release) => semver.valid(release.tag_name));

// バージョンでソート
releases.sort((a, b) => semver.rcompare(a.tag_name, b.tag_name));

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
  const release = releases.find((release) =>
    release.assets.some((asset) =>
      asset.name.match(getVvppTxtName(release.tag_name)[os][arch][device]),
    ),
  );
  if (release == undefined) {
    throw new Error(`releaseが見つかりませんでした: ${os} ${arch} ${device}`);
  }

  // バージョンとvvpp.txtのURLを取得
  const version = release.tag_name;
  const vvppTxtUrl = release.assets.find((asset) =>
    asset.name.match(getVvppTxtName(version)[os][arch][device]),
  )?.browser_download_url;
  if (vvppTxtUrl == undefined) {
    throw new Error(`vvpp.txtが見つかりませんでした: ${os} ${arch} ${device}`);
  }

  // vvpp.txtからvvpp/vvpppのファイル名を取得
  const packageNames = (await (await fetch(vvppTxtUrl)).text())
    .trim()
    .split("\n");

  // 必要な情報を取得
  const packages = packageNames.map((packageName) => {
    const asset = release.assets.find((asset) =>
      asset.name.includes(packageName),
    );
    if (asset == undefined) {
      throw new Error(`ファイルが見つかりませんでした: ${packageName}`);
    }
    return {
      url: asset.browser_download_url,
      name: asset.name,
      size: asset.size,
    };
  });

  // 記録
  output[os] = output[os] || {};
  output[os][arch] = output[os][arch] || {};
  output[os][arch][device] = {
    version,
    packages,
  };

  // ログ
  console.log(`${os} ${arch} ${device}: ${version}`);
}

// 出力
fs.writeFileSync(args.output_path, JSON.stringify(output, null, 2));
