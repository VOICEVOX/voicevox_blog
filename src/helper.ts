/**
 * キーごとに複数のアセットを分配する。
 * 元のパスも返す。
 * １つもない場合は空配列を返す。
 */
export function makeAssetsRecordWithPath<K extends string, T>(
  keys: readonly K[],
  ids: Record<K, { id: string }>,
  globRecord: Record<string, T>,
): Record<K, { path: string; asset: T }[]> {
  const record = {} as Record<K, { path: string; asset: T }[]>;
  for (const key of keys) {
    record[key] = [];
  }
  const sortedPaths = Object.keys(globRecord).sort();
  for (const path of sortedPaths) {
    const key = keys.find((key) => path.includes(ids[key].id));
    if (key == undefined) continue;
    record[key].push({ path, asset: globRecord[path] });
  }
  return record;
}

/**
 * キーごとに複数のアセットを分配する。
 * １つもない場合は空配列を返す。
 */
export function makeAssetsRecord<K extends string, T>(
  keys: readonly K[],
  ids: Record<K, { id: string }>,
  globRecord: Record<string, T>,
): Record<K, T[]> {
  const baseRecord = makeAssetsRecordWithPath(keys, ids, globRecord);
  const record = {} as Record<K, T[]>;
  for (const key of keys) {
    record[key] = baseRecord[key].map(({ asset }) => asset);
  }
  return record;
}

/**
 * キーごとに複数のアセットを分配する。
 * 空配列の部分はundefinedにする。
 */
export function makeAssetsRecordOptional<K extends string, T>(
  keys: readonly K[],
  ids: Record<K, { id: string }>,
  globRecord: Record<string, T>,
): Record<K, T[] | undefined> {
  const baseRecord = makeAssetsRecord(keys, ids, globRecord);
  const record: Record<K, T[] | undefined> = {
    ...baseRecord,
  };
  for (const key of keys) {
    if (baseRecord[key].length === 0) {
      record[key] = undefined;
    }
  }
  return record;
}

/**
 * キーごとに必ず１つ以上のアセットを分配する。
 * １つもない場合はエラーを投げる。
 */
export function makeAssetsRecordRequired<K extends string, T>(
  keys: readonly K[],
  ids: Record<K, { id: string }>,
  globRecord: Record<string, T>,
): Record<K, T[]> {
  const record = makeAssetsRecord(keys, ids, globRecord);
  for (const key of keys) {
    if (record[key].length === 0) {
      throw new Error(`No asset for ${key}`);
    }
  }
  return record;
}

/**
 * キーごとに１つのアセットを分配する。
 * １つではない場合はエラーを投げる。
 */
export function makeAssetsRecordSingle<K extends string, T>(
  keys: readonly K[],
  ids: Record<K, { id: string }>,
  globRecord: Record<string, T>,
): Record<K, T> {
  const baseRecord = makeAssetsRecord(keys, ids, globRecord);
  const record = {} as Record<K, T>;
  for (const key of keys) {
    if (baseRecord[key].length !== 1) {
      throw new Error(`Not a single asset for ${key}`);
    }
    record[key] = baseRecord[key][0];
  }
  return record;
}

/** import.meta.glob()で取得したものを、パスをソートした順番で返す */
export function sortedImportGlob<T>(record: Record<string, T>) {
  return Object.entries(record)
    .sort(([key1], [key2]) => key1.localeCompare(key2))
    .map(([_, value]) => value);
}

/** 到達しないであろうコードに到達したことを示すエラー */
export class UnreachableError extends Error {
  constructor(message?: string) {
    super(message || "Unreachable code was executed.");
    this.name = "UnreachableError";
  }
}
