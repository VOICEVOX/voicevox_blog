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

  // Runtime Target (os-arch-device)をキーとする
  "windows-x64-cpu": {
    //[string] バージョン
    "version": "x.x.x",

    // vvppやvvpppの情報
    "files": [
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
  "windows-x64-directml": {},
  "macos-x64-cpu": {},
  "macos-arm64-cpu": {},
  "linux-x64-cpu": {},
  "linux-x64-cuda": {}
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

type RuntimeTarget = {
  os: string;
  arch: string;
  device: string;
};

const runtimeTargets: RuntimeTarget[] = [
  { os: "windows", arch: "x64", device: "cpu" },
  { os: "windows", arch: "x64", device: "directml" },
  { os: "macos", arch: "x64", device: "cpu" },
  { os: "macos", arch: "arm64", device: "cpu" },
  { os: "linux", arch: "x64", device: "cpu" },
  { os: "linux", arch: "x64", device: "cuda" },
];

function getVvppTxtName(target: string, version: string): string {
  const mapping: Record<string, string> = {
    "windows-x64-cpu": `voicevox_engine-windows-cpu-${version}.vvpp.txt`,
    "windows-x64-directml": `voicevox_engine-windows-directml-${version}.vvpp.txt`,
    "macos-x64-cpu": `voicevox_engine-macos-x64-${version}.vvpp.txt`,
    "macos-arm64-cpu": `voicevox_engine-macos-arm64-${version}.vvpp.txt`,
    "linux-x64-cpu": `voicevox_engine-linux-cpu-x64-${version}.vvpp.txt`,
    "linux-x64-cuda": `voicevox_engine-linux-nvidia-${version}.vvpp.txt`,
  };

  const result = mapping[target];
  if (result === undefined) {
    throw new Error(`対応していないRuntime Targetです: ${target}`);
  }
  return result;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const output: any = {
  formatVersion: 1,
  files: {},
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

releases = releases.filter((release) => !release.draft && !release.prerelease);

releases = releases.filter((release) => semver.valid(release.tag_name));

releases.sort((a, b) => semver.rcompare(a.tag_name, b.tag_name));

for (const { os, arch, device } of runtimeTargets) {
  const target = `${os}-${arch}-${device}`;

  const release = releases.find((release) =>
    release.assets.some((asset) =>
      asset.name.match(getVvppTxtName(target, release.tag_name)),
    ),
  );
  if (release == undefined) {
    throw new Error(`releaseが見つかりませんでした: ${target}`);
  }

  const version = release.tag_name;
  const vvppTxtUrl = release.assets.find((asset) =>
    asset.name.match(getVvppTxtName(target, version)),
  )?.browser_download_url;
  if (vvppTxtUrl == undefined) {
    throw new Error(`vvpp.txtが見つかりませんでした: ${target}`);
  }

  const packageNames = (await (await fetch(vvppTxtUrl)).text())
    .trim()
    .split("\n");

  const files = packageNames.map((packageName) => {
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

  output.files[target] = {
    version,
    files,
  };

  console.log(`${target}: ${version}`);
}

fs.writeFileSync(args.output_path, JSON.stringify(output, null, 2));
