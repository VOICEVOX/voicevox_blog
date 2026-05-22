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
import type { IFuseOptions } from "fuse.js";
import { useMemo, useState } from "react";

type QaSearchProps = {
  items: QaSearchItem[];
};

type SearchState = { input: string; committed: string };

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
  const trimmedSearchQuery = searchState.committed.trim();
  const isSearching = trimmedSearchQuery.length > 0;
  const fuse = useMemo(() => new Fuse(items, FUSE_OPTIONS), [items]);
  const results = useMemo(() => {
    if (!isSearching) {
      return [];
    }
    return fuse
      .search(trimmedSearchQuery, { limit: MAX_RESULTS })
      .map((result) => ({
        ...result,
        matches: ensureNotNullish(result.matches),
      }));
  }, [fuse, isSearching, trimmedSearchQuery]);
  const hasResults = results.length > 0;

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
              placeholder="キーワードを入力"
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
      {isSearching && (
        <div
          className="mt-md p-md rounded-md border border-neutral-300 bg-white"
          aria-live="polite"
        >
          <h2 className="text-lg font-bold text-neutral-900">
            検索結果
            {hasResults && (
              <span className="ml-sm text-sm font-normal text-neutral-600">
                {results.length}件
              </span>
            )}
          </h2>
          {hasResults ? (
            <ol className="mt-sm divide-y divide-neutral-200">
              {results.map(({ item, matches }) => (
                <SearchResultItem
                  key={item.id}
                  item={item}
                  matches={matches}
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
