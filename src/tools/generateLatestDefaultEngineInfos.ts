/**
 * VOICEVOX ENGINEのGithub releasesの情報から最新のvvppおよびvvpppのリンク先を取得し、
 * デフォルトエンジンの更新情報をjson形式で出力する。
 */
/*

jsonファイルの形式は以下の通り。

```JSONC
{
  //[number] ファイル構造バージョン（仕様変更毎にインクリメントされる）
  "formatVersion": 1,

  // Runtime Target (os-arch-device)をキーとする
  "packages": {
    "windows-x64-cpu": {
      //[string] バージョン
      "version": "x.x.x",

      // パッケージの表示情報
      "displayInfo": {
        //[string] ラベル
        "label": "CPU版",

        //[string] ヒント
        "hint": "CPUで音声を生成します",

        //[number] 表示順序
        "order": 0,

        //[boolean(Optional)] デフォルトとして選択するか
        "default": true,
      },

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
}

displayInfoの仕様
- label: 「対応モード」として案内される表示名
- hint: ラベルの説明文として案内される表示名
- order: 各OS/アーキテクチャごとに0から始まる連続した数値
- default: 各OS/アーキテクチャごとにtrueのものが1つだけ存在
```

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

type DisplayInfo = {
  label: string;
  hint: string;
  order: number;
  default?: boolean;
};

type RuntimeTarget = {
  os: string;
  arch: string;
  device: string;
  displayInfo: DisplayInfo;
};

const runtimeTargets: RuntimeTarget[] = [
  {
    os: "windows",
    arch: "x64",
    device: "cpu",
    displayInfo: { label: "CPU", hint: "CPUで音声を生成します", order: 0 },
  },
  {
    os: "windows",
    arch: "x64",
    device: "directml",
    displayInfo: {
      label: "GPU / CPU",
      hint: "DirectML対応のGPUでも音声を生成できます",
      order: 1,
      default: true,
    },
  },
  {
    os: "macos",
    arch: "x64",
    device: "cpu",
    displayInfo: {
      label: "CPU",
      hint: "CPUで音声を生成します",
      order: 0,
      default: true,
    },
  },
  {
    os: "macos",
    arch: "arm64",
    device: "cpu",
    displayInfo: {
      label: "CPU",
      hint: "CPUで音声を生成します",
      order: 0,
      default: true,
    },
  },
  {
    os: "linux",
    arch: "x64",
    device: "cpu",
    displayInfo: {
      label: "CPU",
      hint: "CPUで音声を生成します",
      order: 0,
      default: true,
    },
  },
  {
    os: "linux",
    arch: "x64",
    device: "cuda",
    displayInfo: {
      label: "GPU(CUDA)",
      hint: "CUDA対応のNVIDIA製GPUでも音声を生成できます",
      order: 1,
    },
  },
];

function validateDisplayInfo(targets: RuntimeTarget[]): void {
  const groupedByOsArch = new Map<string, RuntimeTarget[]>();
  for (const target of targets) {
    const key = `${target.os}-${target.arch}`;
    const group = groupedByOsArch.get(key) ?? [];
    group.push(target);
    groupedByOsArch.set(key, group);
  }

  for (const [osArch, group] of groupedByOsArch) {
    const defaultCount = group.filter((t) => t.displayInfo.default).length;
    if (defaultCount !== 1) {
      throw new Error(
        `${osArch} のデフォルトは1つである必要があります（現在: ${defaultCount}個）`,
      );
    }

    const orders = group.map((t) => t.displayInfo.order).sort((a, b) => a - b);
    const expectedOrders = Array.from({ length: group.length }, (_, i) => i);
    if (orders.join(",") !== expectedOrders.join(",")) {
      throw new Error(
        `${osArch} のorderは0から始まる連続した数値である必要があります（現在: ${orders.join(", ")}）`,
      );
    }
  }
}

validateDisplayInfo(runtimeTargets);

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
  packages: {},
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

for (const { os, arch, device, displayInfo } of runtimeTargets) {
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

  output.packages[target] = {
    version,
    displayInfo,
    files,
  };

  console.log(`${target}: ${version}`);
}

fs.writeFileSync(args.output_path, JSON.stringify(output, null, 2));
