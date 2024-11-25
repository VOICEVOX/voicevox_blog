/**
 * マークダウンファイルを標準入力のものに更新する。
 * すでにフロントマターが書かれていることを前提とする。
 */

import { parseArgs } from "node:util";
import fs from "fs";

const argv = parseArgs({
  options: {
    target: { type: "string", short: "t" },
  },
}).values;
const { target } = argv;

console.log(`target: ${target}`);

if (target == undefined) {
  throw new Error("targetを指定してください");
}
if (!fs.existsSync(target)) {
  throw new Error(`ファイルが存在しません: ${target}`);
}

// フロントマターを取得
const frontmatter = fs
  .readFileSync(target, "utf-8")
  .match(/^---(\r?)\n(.*?)(\r?)\n---/s);
if (frontmatter == null) {
  throw new Error("フロントマターが見つかりませんでした");
}

// 入力マークダウンで置き換え
const chunks = [];
for await (const chunk of process.stdin) chunks.push(chunk);
const input = Buffer.concat(chunks).toString("utf8");
const output = frontmatter[0] + "\n\n" + input;

// ファイルに書き込み
fs.writeFileSync(target, output);
