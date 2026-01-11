/**
 * スナップショット更新後にテストを再実行するための空コミットをプッシュする
 */
import { execSync } from "child_process";

console.log("空コミットを作成中...");
execSync('git commit --allow-empty -m "（テストを再実行）"', { stdio: "inherit" });

console.log("\nプッシュ中...");
execSync("git push", { stdio: "inherit" });

console.log("\n完了しました");
console.log("Github Actionsでテストが再実行されます");
