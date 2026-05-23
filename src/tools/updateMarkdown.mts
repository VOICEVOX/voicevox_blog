/**
 * マークダウンファイルを標準入力のものに更新する。
 * すでにフロントマターが書かれていることを前提とする。
 */
import fs from "fs";
import { parseArgs } from "node:util";

const argv = parseArgs({
  options: {
    target: { type: "string", short: "t" },
    "remove-prefix": { type: "string" },
  },
}).values;
const { target } = argv;
const removePrefix = argv["remove-prefix"];

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

// 入力マークダウンを取得
const chunks = [];
for await (const chunk of process.stdin) chunks.push(chunk);
let input = Buffer.concat(chunks).toString("utf8");

// 接頭辞を削除
if (removePrefix != undefined) {
  if (!input.startsWith(removePrefix)) {
    throw new Error(
      "入力マークダウンがremove-prefixで指定した文字列から始まりません",
    );
  }
  input = input.slice(removePrefix.length);
}

// 置き換え
const output = frontmatter[0] + "\n\n" + input;

// ファイルに書き込み
fs.writeFileSync(target, output);
