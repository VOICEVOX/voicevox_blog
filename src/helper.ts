/** import.meta.glob()で取得したものを、パスをソートした順番で返す */
export function sortedImportGlob<T>(record: Record<string, T>) {
  return Object.entries(record)
    .sort(([key1], [key2]) => key1.localeCompare(key2))
    .map(([_, value]) => value);
}
