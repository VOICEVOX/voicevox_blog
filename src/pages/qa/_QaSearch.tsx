import SearchResultItem from "./_QaSearchResultItem";
import type { QaSearchItem } from "./_qa";
import {
  assertNonNullable,
  ensureNotNullish,
  UnreachableError,
} from "@/helper";
import { faMagnifyingGlass, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Fuse from "fuse.js";
import type {
  FuseResultMatch,
  IFuseOptions,
  RangeTuple,
} from "fuse.js";
import { useMemo, useState } from "react";

type QaSearchProps = {
  items: QaSearchItem[];
};

type SearchState = { input: string; committed: string };

type SearchKey = "category" | "question" | "answer";

export type QaSearchResult = {
  item: QaSearchItem;
  indicesByKey: Record<SearchKey, readonly RangeTuple[]>;
};

type SearchResultState =
  | { kind: "idle" }
  | { kind: "empty" }
  | { kind: "matched"; results: QaSearchResult[] };

const SEARCH_INPUT_ID = "qa-search-input";
const PAGE_TITLE_ID = "qa-page-title";
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

export default function QaSearch({ items }: QaSearchProps) {
  const [searchState, setSearchState] = useState<SearchState>({
    input: "",
    committed: "",
  });
  const inputValue = searchState.input;
  const fuse = useMemo(() => new Fuse(items, FUSE_OPTIONS), [items]);
  const resultState = useMemo<SearchResultState>(() => {
    const trimmed = searchState.committed.trim();
    if (trimmed.length === 0) {
      return { kind: "idle" };
    }
    const results = fuse
      .search(trimmed, { limit: MAX_RESULTS })
      .map((result): QaSearchResult => ({
        item: result.item,
        indicesByKey: buildIndicesByKey(ensureNotNullish(result.matches)),
      }));
    if (results.length === 0) {
      return { kind: "empty" };
    }
    return { kind: "matched", results };
  }, [fuse, searchState.committed]);

  const clearQuery = () => {
    setSearchState({ input: "", committed: "" });
  };

  const handleSelect = (id: string) => {
    const target = document.getElementById(id);
    assertNonNullable(target);
    target.scrollIntoView();
    history.replaceState(null, "", `#${id}`);
  };

  return (
    <section className="mb-2xl" aria-labelledby={PAGE_TITLE_ID}>
      <div className="gap-md flex flex-col md:flex-row md:items-center md:justify-between">
        <h1
          id={PAGE_TITLE_ID}
          className="text-3xl font-extrabold text-neutral-700"
        >
          よくあるご質問
        </h1>
        <div className="gap-sm flex w-full items-center md:w-80 lg:w-96">
          <label
            htmlFor={SEARCH_INPUT_ID}
            className="shrink-0 text-sm font-bold text-neutral-700"
          >
            検索
          </label>
          <div className="relative flex-1">
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-neutral-500"
            />
            {/* NOTE: ブラウザ標準の消去ボタンと独自ボタンの重複を避けるため、type="search"を使わない */}
            <input
              id={SEARCH_INPUT_ID}
              type="text"
              role="searchbox"
              value={inputValue}
              enterKeyHint="search"
              placeholder="検索ワードを入力"
              className="h-12 w-full rounded-md border border-neutral-300 bg-white pr-12 pl-11 text-base text-neutral-950 placeholder:text-neutral-500"
              onChange={(event) => {
                const value = event.currentTarget.value;
                if (!(event.nativeEvent instanceof InputEvent)) {
                  throw new UnreachableError();
                }
                const isComposing = event.nativeEvent.isComposing;
                setSearchState((currentState) => ({
                  input: value,
                  committed: isComposing ? currentState.committed : value,
                }));
              }}
              onCompositionEnd={(event) => {
                const value = event.currentTarget.value;
                setSearchState({ input: value, committed: value });
              }}
              onKeyDown={(event) => {
                if (event.key === "Escape") {
                  clearQuery();
                }
              }}
            />
            {inputValue.length > 0 && (
              <button
                type="button"
                aria-label="検索ワードを消去"
                className="vv-status-layer absolute top-1/2 right-2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full text-neutral-600"
                onClick={clearQuery}
              >
                <FontAwesomeIcon icon={faXmark} />
              </button>
            )}
          </div>
        </div>
      </div>
      {resultState.kind !== "idle" && (
        <div
          className="mt-md p-md rounded-md border border-neutral-300 bg-white"
          aria-live="polite"
        >
          <h2 className="text-lg font-bold text-neutral-900">
            検索結果
            {resultState.kind === "matched" && (
              <span className="ml-sm text-sm font-normal text-neutral-600">
                {resultState.results.length}件
              </span>
            )}
          </h2>
          {resultState.kind === "matched" ? (
            <ol className="mt-sm divide-y divide-neutral-200">
              {resultState.results.map((result) => (
                <SearchResultItem
                  key={result.item.id}
                  result={result}
                  onSelect={handleSelect}
                />
              ))}
            </ol>
          ) : (
            <p className="mt-sm text-sm text-neutral-600">
              該当するQ&amp;Aがありません
            </p>
          )}
        </div>
      )}
    </section>
  );
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
