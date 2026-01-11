/**
 * スナップショット更新をトリガーするコミットをプッシュする
 */
import { execSync } from "child_process";

const message = process.argv[2] || "";
const commitMessage = message
  ? `${message} [update snapshots]`
  : "[update snapshots]";

console.log(`コミット中: ${commitMessage}`);
execSync(`git commit --allow-empty -m "${commitMessage}"`, {
  stdio: "inherit",
});

console.log("\nプッシュ中...");
execSync("git push", { stdio: "inherit" });

console.log("\n完了しました");
console.log("Github Actionsでスナップショットが更新されます");
