/**
 * フォントサブセットを生成するAstro integration。
 * srcとpublic以下のgit管理されたテキストファイルに登場する文字を集め、
 * `resources/fonts` 以下のフォントをその文字だけを含むwoff2にサブセット化する。
 * 生成結果はAstroのキャッシュディレクトリに保存し、Viteのアセットとして配信する。
 */
import type { AstroIntegration, AstroIntegrationLogger } from "astro";
import { execFile } from "node:child_process";
import { createHash } from "node:crypto";
import { existsSync } from "node:fs";
import {
  mkdtempDisposable,
  mkdir,
  readFile,
  readdir,
  rename,
  stat,
} from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";

const CACHE_VERSION = 4;
const FONT_SUBSET_CACHE_DIR = "voicevox-font-subsets";
const SOURCE_FONTS_DIR = "resources/fonts";

const execFileAsync = promisify(execFile);

type GeneratedFontSubsets = {
  directoryPath: string;
  sourcePaths: string[];
};

/** Astro integration */
export function fontSubsetIntegration(): AstroIntegration {
  return {
    name: "voicevox-font-subset",
    hooks: {
      // フォントサブセットを生成し、走査したソースファイルを監視対象にする
      "astro:config:setup": async ({
        addWatchFile,
        command,
        config,
        logger,
        updateConfig,
      }) => {
        if (command !== "dev" && command !== "build") {
          return;
        }
        const generatedFontSubsets = await generateFontSubsets(
          fileURLToPath(config.root),
          fileURLToPath(config.cacheDir),
          logger,
        );
        updateConfig({
          vite: {
            resolve: {
              alias: {
                "/fonts": generatedFontSubsets.directoryPath,
              },
            },
          },
        });
        for (const sourcePath of generatedFontSubsets.sourcePaths) {
          addWatchFile(sourcePath);
        }
      },
    },
  };
}

async function generateFontSubsets(
  rootPath: string,
  cacheDirPath: string,
  logger: AstroIntegrationLogger,
): Promise<GeneratedFontSubsets> {
  const sourceFontsPath = join(rootPath, SOURCE_FONTS_DIR);
  const { characters, filePaths } = await collectSourceText(rootPath);
  const fontFiles = await collectSourceFontFiles(sourceFontsPath);
  const cacheKey = await createCacheKey(characters, sourceFontsPath, fontFiles);
  const directoryPath = join(cacheDirPath, FONT_SUBSET_CACHE_DIR, cacheKey);

  const reused = existsSync(directoryPath);
  if (!reused) {
    await writeFontSubsets(
      directoryPath,
      characters,
      sourceFontsPath,
      fontFiles,
    );
  }

  const totalInputBytes = await calculateTotalBytes(sourceFontsPath, fontFiles);
  const totalOutputBytes = await calculateTotalBytes(directoryPath, fontFiles);
  logger.info(
    `フォントサブセットを${reused ? "再利用" : "生成"}しました。` +
      `対象は${characters.length}文字、容量は合計${formatBytes(
        totalInputBytes,
      )}から${formatBytes(totalOutputBytes)}になりました。`,
  );

  return {
    directoryPath,
    sourcePaths: [...filePaths, sourceFontsPath],
  };
}

async function writeFontSubsets(
  directoryPath: string,
  characters: string,
  sourceFontsPath: string,
  fontFiles: string[],
): Promise<void> {
  const cacheRootPath = dirname(directoryPath);
  await mkdir(cacheRootPath, { recursive: true });

  await using temporaryDirectory = await mkdtempDisposable(
    join(cacheRootPath, "temporary-"),
  );
  for (const fontFile of fontFiles) {
    await runPyftsubset([
      join(sourceFontsPath, fontFile),
      `--text=${characters}`,
      `--output-file=${join(temporaryDirectory.path, fontFile)}`,
      "--name-IDs=*", // NOTE: 商標情報などを残す
      "--flavor=woff2",
    ]);
  }
  try {
    await rename(temporaryDirectory.path, directoryPath);
  } catch (error) {
    // エディタのAstro拡張などが同じキャッシュキーの生成を並行して完了させることがあり、その場合は完成済みの結果を使う
    if (!existsSync(directoryPath)) {
      throw error;
    }
  }
}

async function collectSourceText(
  rootPath: string,
): Promise<{ characters: string; filePaths: string[] }> {
  const { stdout } = await execFileAsync(
    "git",
    ["grep", "-Ilz", "", "--", "src", "public"],
    { cwd: rootPath, maxBuffer: Number.POSITIVE_INFINITY },
  );
  const filePaths = stdout
    .split("\0")
    .filter((path) => path !== "")
    .map((path) => resolve(rootPath, path));
  if (filePaths.length === 0) {
    throw new Error("フォントサブセット生成の走査対象が見つかりません");
  }
  const sourceTexts = await Promise.all(
    filePaths.map((filePath) => readFile(filePath, "utf-8")),
  );
  return {
    // 制御文字はグリフが不要なため除く
    characters: [...new Set(sourceTexts.join(""))]
      .filter((character) => !/\p{Cc}/u.test(character))
      .sort()
      .join(""),
    filePaths,
  };
}

async function collectSourceFontFiles(
  sourceFontsPath: string,
): Promise<string[]> {
  const fontFiles = (await readdir(sourceFontsPath))
    .filter((fileName) => fileName.endsWith(".woff2"))
    .sort();
  if (fontFiles.length === 0) {
    throw new Error("サブセット対象の元フォントが見つかりません");
  }
  return fontFiles;
}

async function createCacheKey(
  characters: string,
  sourceFontsPath: string,
  fontFiles: string[],
): Promise<string> {
  const hash = createHash("sha256");
  hash.update(
    JSON.stringify({ characters, fontFiles, version: CACHE_VERSION }),
  );
  for (const fontFile of fontFiles) {
    hash.update(await readFile(join(sourceFontsPath, fontFile)));
  }
  return hash.digest("hex").slice(0, 16);
}

async function calculateTotalBytes(
  directoryPath: string,
  fontFiles: string[],
): Promise<number> {
  const fileStats = await Promise.all(
    fontFiles.map((fontFile) => stat(join(directoryPath, fontFile))),
  );
  return fileStats.reduce((total, fileStat) => total + fileStat.size, 0);
}

async function runPyftsubset(args: string[]): Promise<void> {
  try {
    await execFileAsync("pyftsubset", args);
  } catch (error) {
    if (error instanceof Error && "code" in error && error.code === "ENOENT") {
      throw new Error(
        "pyftsubsetが見つかりません。fontToolsをインストールしてください。",
      );
    }
    throw error;
  }
}

function formatBytes(bytes: number): string {
  if (bytes >= 1024 * 1024) {
    return `${(bytes / 1024 / 1024).toFixed(1)} MiB`;
  }
  return `${(bytes / 1024).toFixed(1)} KiB`;
}
