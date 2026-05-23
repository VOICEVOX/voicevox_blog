import type { QaSearchItem } from "./_qa";
import { ensureNotNullish, UnreachableError } from "@/helper";
import Fuse from "fuse.js";
import type { FuseResultMatch, IFuseOptions, RangeTuple } from "fuse.js";
import { useMemo } from "react";

type SearchKey = "category" | "question" | "answer";

export type QaSearchResult = {
  item: QaSearchItem;
  indicesByKey: Record<SearchKey, readonly RangeTuple[]>;
};

export type SearchResultState =
  | { kind: "idle" }
  | { kind: "empty" }
  | { kind: "matched"; results: QaSearchResult[] };

const MAX_RESULTS = 12;
const FUSE_OPTIONS = {
  keys: [
    { name: "question", weight: 0.55 },
    { name: "answer", weight: 0.35 },
    { name: "category", weight: 0.1 },
  ],
  includeMatches: true,
  includeScore: true,
  ignoreLocation: true,
  threshold: 0.2,
} satisfies IFuseOptions<QaSearchItem>;

export function useQaSearch(
  items: QaSearchItem[],
  query: string,
): SearchResultState {
  const fuse = useMemo(() => new Fuse(items, FUSE_OPTIONS), [items]);
  return useMemo<SearchResultState>(() => {
    const trimmed = query.trim();
    if (trimmed.length === 0) {
      return { kind: "idle" };
    }
    const results = fuse.search(trimmed, { limit: MAX_RESULTS }).map(
      (result): QaSearchResult => ({
        item: result.item,
        indicesByKey: buildIndicesByKey(ensureNotNullish(result.matches)),
      }),
    );
    if (results.length === 0) {
      return { kind: "empty" };
    }
    return { kind: "matched", results };
  }, [fuse, query]);
}

function buildIndicesByKey(
  matches: readonly FuseResultMatch[],
): Record<SearchKey, readonly RangeTuple[]> {
  const indicesByKey: Record<SearchKey, readonly RangeTuple[]> = {
    category: [],
    question: [],
    answer: [],
  };
  for (const match of matches) {
    indicesByKey[parseSearchKey(match.key)] = match.indices;
  }
  return indicesByKey;
}

function parseSearchKey(key: string | undefined): SearchKey {
  if (key === "category" || key === "question" || key === "answer") {
    return key;
  }
  throw new UnreachableError();
}
