export const isDevelopment = import.meta.env?.DEV == true;
export const isProduction = import.meta.env?.PROD == true;
export const isPreview = import.meta.env?.PREVIEW == true;
export const isTest = import.meta.env?.TEST == true;

/**
 * HTML文字列をエスケープ
 *
 * Copyright © 2012 TJ Holowaychuk <tj@vision-media.ca>
 * Released under the MIT License.
 * https://github.com/component/escape-html
 */
export function escapeHtml(text: string): string {
  const str = "" + text;
  const match = /["'&<>]/.exec(str);

  if (!match) {
    return str;
  }

  let escape;
  let html = "";
  let index = 0;
  let lastIndex = 0;

  for (index = match.index; index < str.length; index++) {
    switch (str.charCodeAt(index)) {
      case 34: // "
        escape = "&quot;";
        break;
      case 38: // &
        escape = "&amp;";
        break;
      case 39: // '
        escape = "&#39;";
        break;
      case 60: // <
        escape = "&lt;";
        break;
      case 62: // >
        escape = "&gt;";
        break;
      default:
        continue;
    }

    if (lastIndex !== index) {
      html += str.substring(lastIndex, index);
    }

    lastIndex = index + 1;
    html += escape;
  }

  return lastIndex !== index ? html + str.substring(lastIndex, index) : html;
}
/** 文字列からHTMLタグを除外する */
export function stripHtmlTags(text: string): string {
  return text.replace(/<\/?[^>]+(>|$)/g, "");
}

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

/**
 * キーごとに１つのアセットを分配する。
 * ２つ以上ある場合はエラーを投げる。
 * １つもない場合はundefinedを返す。
 */
export function makeAssetsRecordSingleOptional<K extends string, T>(
  keys: readonly K[],
  ids: Record<K, { id: string }>,
  globRecord: Record<string, T>,
): Record<K, T | undefined> {
  const baseRecord = makeAssetsRecord(keys, ids, globRecord);
  const record = {} as Record<K, T | undefined>;
  for (const key of keys) {
    if (baseRecord[key].length > 1) {
      throw new Error(`Multiple assets for ${key}`);
    } else if (baseRecord[key].length === 1) {
      record[key] = baseRecord[key][0];
    } else {
      record[key] = undefined;
    }
  }
  return record;
}

/** import.meta.glob()で取得したものを、パスをソートした順番で返す */
export function sortedImportGlob<T>(record: Record<string, T>) {
  return Object.entries(record)
    .sort(([key1], [key2]) => key1.localeCompare(key2))
    .map(([, value]) => value);
}

/** 到達しないであろうコードに到達したことを示すエラー */
export class UnreachableError extends Error {
  constructor(message?: string) {
    super(message || "Unreachable code was executed.");
    this.name = "UnreachableError";
  }
}

/** Google Analyticsのイベントを送信 */
export function sendEvent(event: string, eventCategory: string) {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", event, { event_category: eventCategory });
  }
}

/** パスにViteのBASE_URLを追加する関数 */
export function withBaseUrl(path: string) {
  const baseUrl = import.meta.env.BASE_URL;
  return baseUrl ? `${baseUrl}${path}` : path;
}
