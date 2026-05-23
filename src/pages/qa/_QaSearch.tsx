import SearchResultItem from "./_QaSearchResultItem";
import type { QaSearchItem } from "./_qa";
import { useImeAwareInput } from "./_useImeAwareInput";
import { useQaSearch } from "./_useQaSearch";
import { faMagnifyingGlass, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type QaSearchProps = {
  items: QaSearchItem[];
};

const SEARCH_INPUT_ID = "qa-search-input";
const PAGE_TITLE_ID = "qa-page-title";

export default function QaSearch({ items }: QaSearchProps) {
  const { input, committed, onChange, onCompositionEnd, clear } =
    useImeAwareInput("");
  const resultState = useQaSearch(items, committed);

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
                <SearchResultItem key={result.item.id} result={result} />
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
