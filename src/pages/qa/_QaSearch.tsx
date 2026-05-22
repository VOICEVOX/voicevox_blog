import { assertNonNullable } from "@/helper";
import { faMagnifyingGlass, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Fuse from "fuse.js";
import type { FuseResultMatch } from "fuse.js";
import { useMemo, useRef, useState } from "react";
import type { ReactNode } from "react";
import { z } from "zod";

const qaSearchItemSchema = z.object({
  id: z.string().min(1),
  category: z.string().min(1),
  question: z.string().min(1),
  answer: z.string(),
});

const qaSearchPropsSchema = z.object({
  items: z.array(qaSearchItemSchema),
});

type QaSearchItem = z.infer<typeof qaSearchItemSchema>;
type QaSearchProps = z.infer<typeof qaSearchPropsSchema>;
type SearchKey = "category" | "question" | "answer";
type MatchRange = readonly [number, number];

const SEARCH_INPUT_ID = "qa-search-input";
const PAGE_TITLE_ID = "qa-page-title";
const QUESTION_HEADING_PREFIX = "Q. ";
const MAX_EXCERPT_LENGTH = 140;

export default function QaSearch(rawProps: QaSearchProps) {
  const { items } = qaSearchPropsSchema.parse(rawProps);
  const [query, setQuery] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const isComposingRef = useRef(false);
  const trimmedSearchQuery = searchQuery.trim();
  const fuse = useMemo(
    () =>
      new Fuse(items, {
        keys: [
          { name: "question", weight: 0.55 },
          { name: "answer", weight: 0.35 },
          { name: "category", weight: 0.1 },
        ],
        includeMatches: true,
        includeScore: true,
        ignoreLocation: true,
        threshold: 0.2,
      }),
    [items],
  );
  const results = useMemo(() => {
    if (trimmedSearchQuery.length === 0) {
      return [];
    }
    return fuse.search(trimmedSearchQuery, { limit: 12 });
  }, [fuse, trimmedSearchQuery]);

  const clearQuery = () => {
    setQuery("");
    setSearchQuery("");
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
            <input
              id={SEARCH_INPUT_ID}
              type="text"
              role="searchbox"
              value={query}
              enterKeyHint="search"
              placeholder="キーワードを入力"
              className="h-12 w-full rounded-md border border-neutral-300 bg-white pr-12 pl-11 text-base text-neutral-950 placeholder:text-neutral-500"
              onChange={(event) => {
                const value = event.currentTarget.value;
                setQuery(value);
                if (!isComposingRef.current) {
                  setSearchQuery(value);
                }
              }}
              onCompositionStart={() => {
                isComposingRef.current = true;
              }}
              onCompositionEnd={(event) => {
                isComposingRef.current = false;
                setSearchQuery(event.currentTarget.value);
              }}
              onKeyDown={(event) => {
                if (event.key === "Escape") {
                  clearQuery();
                }
              }}
            />
            {query.length > 0 && (
              <button
                type="button"
                aria-label="検索ワードを消去"
                className="vv-status-layer absolute top-1/2 right-2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full text-neutral-600"
                onClick={() => clearQuery()}
              >
                <FontAwesomeIcon icon={faXmark} />
              </button>
            )}
          </div>
        </div>
      </div>
      {trimmedSearchQuery.length > 0 && (
        <div
          className="mt-md p-md rounded-md border border-neutral-300 bg-white"
          aria-live="polite"
        >
          <h2 className="text-lg font-bold text-neutral-900">
            検索結果
            {results.length > 0 && (
              <span className="ml-sm text-sm font-normal text-neutral-600">
                {results.length}件
              </span>
            )}
          </h2>
          {results.length === 0 ? (
            <p className="mt-sm text-sm text-neutral-600">
              該当するQ&amp;Aがありません
            </p>
          ) : (
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
          )}
        </div>
      )}
    </section>
  );
}

function SearchResultItem({
  item,
  matches,
  onSelect,
}: {
  item: QaSearchItem;
  matches?: readonly FuseResultMatch[];
  onSelect: (id: string) => void;
}) {
  const categoryMatch = findMatch(matches, "category");
  const questionMatch = findMatch(matches, "question");
  const answerMatch = findMatch(matches, "answer");
  const answerIndices = answerMatch?.indices ?? [];
  const excerpt = buildExcerpt(item.answer, answerIndices);
  const excerptRanges = sliceMatchRanges(
    answerIndices,
    excerpt.offset,
    excerpt.text.length,
  );

  return (
    <li className="py-md">
      <a
        href={`#${item.id}`}
        className="vv-status-layer -mx-2xs px-2xs py-xs block rounded-md text-current no-underline"
        onClick={(event) => {
          event.preventDefault();
          onSelect(item.id);
        }}
      >
        <p className="text-sm font-bold text-green-900">
          {highlightText(item.category, categoryMatch?.indices ?? [])}
        </p>
        <p className="mt-2xs text-lg font-bold text-neutral-900">
          {QUESTION_HEADING_PREFIX}
          {highlightText(item.question, questionMatch?.indices ?? [])}
        </p>
        <p className="mt-xs text-sm text-neutral-700">
          {excerpt.hasLeadingEllipsis && "..."}
          {highlightText(excerpt.text, excerptRanges)}
          {excerpt.hasTrailingEllipsis && "..."}
        </p>
      </a>
    </li>
  );
}

function findMatch(
  matches: readonly FuseResultMatch[] | undefined,
  key: SearchKey,
): FuseResultMatch | undefined {
  if (matches == undefined) {
    return undefined;
  }
  return matches.find((match) => match.key === key);
}

function buildExcerpt(
  text: string,
  indices: readonly MatchRange[],
): {
  text: string;
  offset: number;
  hasLeadingEllipsis: boolean;
  hasTrailingEllipsis: boolean;
} {
  if (text.length <= MAX_EXCERPT_LENGTH) {
    return {
      text,
      offset: 0,
      hasLeadingEllipsis: false,
      hasTrailingEllipsis: false,
    };
  }

  const firstMatch = indices[0];
  const firstMatchStart = firstMatch == undefined ? 0 : firstMatch[0];
  const maxOffset = text.length - MAX_EXCERPT_LENGTH;
  const offset = Math.min(Math.max(0, firstMatchStart - 40), maxOffset);
  const end = offset + MAX_EXCERPT_LENGTH;

  return {
    text: text.slice(offset, end),
    offset,
    hasLeadingEllipsis: offset > 0,
    hasTrailingEllipsis: end < text.length,
  };
}

function sliceMatchRanges(
  indices: readonly MatchRange[],
  offset: number,
  length: number,
): MatchRange[] {
  const ranges: MatchRange[] = [];
  const endOffset = offset + length - 1;
  for (const [start, end] of indices) {
    if (end < offset || start > endOffset) {
      continue;
    }
    ranges.push([
      Math.max(start, offset) - offset,
      Math.min(end, endOffset) - offset,
    ]);
  }
  return ranges;
}

function highlightText(
  text: string,
  indices: readonly MatchRange[],
): ReactNode {
  if (indices.length === 0) {
    return text;
  }

  const chunks: ReactNode[] = [];
  let lastIndex = 0;
  indices.forEach(([start, end], index) => {
    if (start > lastIndex) {
      chunks.push(text.slice(lastIndex, start));
    }
    chunks.push(
      <mark
        key={`${start}-${end}-${index}`}
        className="rounded-sm bg-yellow-100 px-0.5 text-inherit"
      >
        {text.slice(start, end + 1)}
      </mark>,
    );
    lastIndex = end + 1;
  });

  if (lastIndex < text.length) {
    chunks.push(text.slice(lastIndex));
  }

  return chunks;
}
