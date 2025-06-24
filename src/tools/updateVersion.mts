/**
 * このブログからダウンロードするVOICEVOXのバージョンを更新するスクリプト。
 * 複数箇所に書かれているバージョンを書き換える必要があり、それを一括で行える。
 */
import fs from "fs";
import { parseArgs } from "node:util";

const argv = parseArgs({
  options: {
    editor_version: { type: "string" },
    resource_version: { type: "string" },
    nemo_version: { type: "string" },
  },
}).values;
const {
  editor_version: editorVersion,
  resource_version: resourceVersion,
  nemo_version: nemoVersion,
} = argv;

function updateFile(path: string, before: RegExp, after: string) {
  if (!fs.existsSync(path)) {
    throw new Error(`ファイルが存在しません: パス "${path}"`);
  }

  const file = fs.readFileSync(path, "utf-8");
  if (!before.test(file)) {
    throw new Error(
      `置き換え対象が存在しません: パス "${path}": 正規表現 "${before}"`,
    );
  }

  const updated = file.replace(before, after);
  fs.writeFileSync(path, updated);
}

console.log(`editor_version: ${editorVersion}`);
console.log(`resource_version: ${resourceVersion}`);
console.log(`nemo_version: ${nemoVersion}`);

// README.md
if (editorVersion != undefined) {
  updateFile(
    "./README.md",
    /editor_tag=".*?"/,
    `editor_tag="${editorVersion}"`,
  );
}
if (resourceVersion != undefined) {
  updateFile(
    "./README.md",
    /resource_tag=".*?"/,
    `resource_tag="${resourceVersion}"`,
  );
}

// src/constants/index.ts
if (editorVersion != undefined) {
  updateFile(
    "./src/constants/index.ts",
    /export const APP_VERSION = ".*?"/,
    `export const APP_VERSION = "${editorVersion}"`,
  );
}
if (nemoVersion != undefined) {
  updateFile(
    "./src/constants/index.ts",
    /export const NEMO_VERSION = ".*?"/,
    `export const NEMO_VERSION = "${nemoVersion}"`,
  );
}

// src/assets/script/linuxInstallCpuX64.sh
if (editorVersion != undefined) {
  updateFile(
    "./src/assets/script/linuxInstallCpuX64.sh",
    /VOICEVOX\/voicevox\/.*?\//,
    `VOICEVOX/voicevox/${editorVersion}/`,
  );
  updateFile(
    "./src/assets/script/linuxInstallCpuX64.sh",
    /VERSION=.*?\s/,
    `VERSION=${editorVersion} `,
  );
}

// src/assets/script/linuxInstallCpuArm64.sh
if (editorVersion != undefined) {
  updateFile(
    "./src/assets/script/linuxInstallCpuArm64.sh",
    /VOICEVOX\/voicevox\/.*?\//,
    `VOICEVOX/voicevox/${editorVersion}/`,
  );
  updateFile(
    "./src/assets/script/linuxInstallCpuArm64.sh",
    /VERSION=.*?\s/,
    `VERSION=${editorVersion} `,
  );
}

// src/assets/script/linuxInstallNvidia.sh
if (editorVersion != undefined) {
  updateFile(
    "./src/assets/script/linuxInstallNvidia.sh",
    /VOICEVOX\/voicevox\/.*?\//,
    `VOICEVOX/voicevox/${editorVersion}/`,
  );
  updateFile(
    "./src/assets/script/linuxInstallNvidia.sh",
    /VERSION=.*?\s/,
    `VERSION=${editorVersion} `,
  );
}

// src/assets/script/linuxInstallCpuArm64.sh
if (editorVersion != undefined) {
  updateFile(
    "./src/assets/script/linuxInstallCpuArm64.sh",
    /VOICEVOX\/voicevox\/.*?\//,
    `VOICEVOX/voicevox/${editorVersion}/`,
  );
  updateFile(
    "./src/assets/script/linuxInstallCpuArm64.sh",
    /VERSION=.*?\s/,
    `VERSION=${editorVersion} `,
  );
}
