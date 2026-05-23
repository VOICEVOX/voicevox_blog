import SearchResultItem from "./_QaSearchResultItem";
import type { QaSearchResult } from "./_QaSearchResultItem";
import type { QaSearchItem } from "./_qa";
import { ensureNotNullish, UnreachableError } from "@/helper";
import { faMagnifyingGlass, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Fuse from "fuse.js";
import type { FuseResultMatch, IFuseOptions } from "fuse.js";
import {
  useMemo,
  useState,
  type ChangeEventHandler,
  type CompositionEventHandler,
} from "react";

type QaSearchProps = {
  items: QaSearchItem[];
  debugInitialInput?: string;
};

type SearchKey = "category" | "question" | "answer";

type SearchResultState =
  | { kind: "idle" }
  | { kind: "empty" }
  | { kind: "matched"; results: QaSearchResult[] };

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

/**
 * Q&Aページの検索フォームと検索結果を表示するコンポーネント。
 * 入力ワードでカテゴリ・質問・回答を横断してfuzzy searchし、マッチ箇所をハイライトした結果一覧を表示する。
 */
export default function QaSearch({
  items,
  debugInitialInput = "",
}: QaSearchProps) {
  const [inputState, setInputState] = useState({
    input: debugInitialInput,
    committed: debugInitialInput,
  });
  const { input, committed } = inputState;

  const onChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const value = event.currentTarget.value;
    if (!(event.nativeEvent instanceof InputEvent)) {
      throw new UnreachableError();
    }
    const isComposing = event.nativeEvent.isComposing;
    setInputState((current) => ({
      input: value,
      committed: isComposing ? current.committed : value,
    }));
  };

  const onCompositionEnd: CompositionEventHandler<HTMLInputElement> = (
    event,
  ) => {
    const value = event.currentTarget.value;
    setInputState({ input: value, committed: value });
  };

  const clear = () => {
    setInputState({ input: "", committed: "" });
  };

  const fuse = useMemo(() => new Fuse(items, FUSE_OPTIONS), [items]);
  const resultState = useMemo<SearchResultState>(() => {
    const trimmed = committed.trim();
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
  }, [fuse, committed]);

  return (
    <section className="mb-2xl" aria-labelledby={PAGE_TITLE_ID}>
      <div className="gap-md flex flex-col md:flex-row md:items-center md:justify-between">
        <h1 id={PAGE_TITLE_ID} className="text-3xl font-bold text-neutral-950">
          よくあるご質問
        </h1>
        <search className="flex w-full items-center md:w-80 lg:w-96">
          <div className="relative flex-1">
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-neutral-500"
            />
            {/* NOTE: ブラウザ標準の消去ボタンと独自ボタンの重複を避けるため、type="search"を使わない */}
            <input
              type="text"
              role="searchbox"
              aria-label="検索"
              value={input}
              enterKeyHint="search"
              placeholder="検索ワードを入力"
              className="h-12 w-full rounded-md border border-neutral-300 bg-white pr-12 pl-11 text-base text-neutral-950 placeholder:text-neutral-500"
              onChange={onChange}
              onCompositionEnd={onCompositionEnd}
              onKeyDown={(event) => {
                if (event.key === "Escape") {
                  clear();
                }
              }}
            />
            {input.length > 0 && (
              <button
                type="button"
                aria-label="検索ワードを消去"
                className="vv-status-layer absolute top-1/2 right-2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full text-neutral-600"
                onClick={clear}
              >
                <FontAwesomeIcon icon={faXmark} />
              </button>
            )}
          </div>
        </search>
      </div>
      <div aria-live="polite">
        {resultState.kind !== "idle" && (
          <div className="mt-md p-md rounded-md border border-neutral-300 bg-white">
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
                    key={result.item.anchorId}
                    result={result}
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
      </div>
    </section>
  );
}

function buildIndicesByKey(
  matches: readonly FuseResultMatch[],
): QaSearchResult["indicesByKey"] {
  const indicesByKey: QaSearchResult["indicesByKey"] = {
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
