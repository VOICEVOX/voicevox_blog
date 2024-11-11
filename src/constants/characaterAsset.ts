import type { AstroImage } from "@types";

import {
  characterEntries,
  type CharacterKey,
  characterKeys,
} from "./characterEntry";

/**
 * キャラクターごとに複数のアセットを分配する。
 * １つもない場合は空配列を返す。
 */
export function makeCharacterAssetsRecord<T>(
  globRecord: Record<string, () => Promise<T>>,
): Record<CharacterKey, Promise<T>[]> {
  const record = {} as Record<CharacterKey, Promise<T>[]>;
  for (const key of characterKeys) {
    record[key] = [];
  }
  const sortedPaths = Object.keys(globRecord).sort();
  for (const path of sortedPaths) {
    const key = characterKeys.find((key) =>
      path.includes(characterEntries[key].id),
    );
    if (key == undefined) throw new Error(`Unknown character: ${path}`);
    record[key].push(globRecord[path]());
  }
  return record;
}

/**
 * キャラクターごとに複数のアセットを分配する。
 * 空配列の部分はundefinedにする。
 */
export function makeCharacterAssetsRecordOptional<T>(
  globRecord: Record<string, () => Promise<T>>,
): Record<CharacterKey, Promise<T>[] | undefined> {
  const baseRecord = makeCharacterAssetsRecord(globRecord);
  const record: Record<CharacterKey, Promise<T>[] | undefined> = {
    ...baseRecord,
  };
  for (const key of characterKeys) {
    if (baseRecord[key].length === 0) {
      record[key] = undefined;
    }
  }
  return record;
}

/**
 * キャラクターごとに必ず１つ以上のアセットを分配する。
 * １つもない場合はエラーを投げる。
 */
export function makeCharacterAssetsRecordRequired<T>(
  globRecord: Record<string, () => Promise<T>>,
): Record<CharacterKey, Promise<T>[]> {
  const record = makeCharacterAssetsRecord(globRecord);
  for (const key of characterKeys) {
    if (record[key].length === 0) {
      throw new Error(`No asset for ${key}`);
    }
  }
  return record;
}

/**
 * キャラクターごとに１つのアセットを分配する。
 * １つではない場合はエラーを投げる。
 */
export function makeCharacterAssetsRecordSingle<T>(
  globRecord: Record<string, () => Promise<T>>,
): Record<CharacterKey, Promise<T>> {
  const record = makeCharacterAssetsRecord(globRecord);
  for (const key of characterKeys) {
    if (record[key].length !== 1) {
      throw new Error(`Not a single asset for ${key}`);
    }
  }
  return Object.fromEntries(
    Object.entries(record).map(([key, [value]]) => [key, value]),
  ) as Record<CharacterKey, Promise<T>>;
}

/** バストアップ画像。必ず１つある。 */
export const bustupImages = makeCharacterAssetsRecordSingle(
  import.meta.glob<AstroImage>("./bustup-images/*.png"),
);

/** 立ち絵画像。必ず１つある。 */
export const portraitImages = makeCharacterAssetsRecordSingle(
  import.meta.glob<AstroImage>("./portrait-images/*.png"),
);

/** ボイボ寮用音声。１つもないときもある。 */
export const dormitoryAudioArrays = makeCharacterAssetsRecordOptional(
  import.meta.glob<string>("./dormitory-audios/*.wav"),
);
