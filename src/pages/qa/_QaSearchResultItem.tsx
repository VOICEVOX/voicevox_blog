import { QUESTION_HEADING_PREFIX } from "./_qa";
import type { QaSearchItem } from "./_qa";
import type { FuseResultMatch, RangeTuple } from "fuse.js";
import type { ReactNode } from "react";

const MAX_EXCERPT_CHARACTER_COUNT = 140;
const EXCERPT_CONTEXT_BEFORE_MATCH_CHARACTER_COUNT = 40;
type SearchKey = "category" | "question" | "answer";

export default function SearchResultItem({
  item,
  matches,
  onSelect,
}: {
  item: QaSearchItem;
  matches?: readonly FuseResultMatch[];
  onSelect: (id: string) => void;
}) {
  const matchesByKey = buildMatchesByKey(matches);
  const categoryMatch = matchesByKey.get("category");
  const questionMatch = matchesByKey.get("question");
  const answerMatch = matchesByKey.get("answer");
  const answerIndices = answerMatch?.indices ?? [];
  const excerpt = buildExcerpt(item.answer, answerIndices);

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
          {highlightText(excerpt.text, excerpt.ranges)}
          {excerpt.hasTrailingEllipsis && "..."}
        </p>
      </a>
    </li>
  );
}

function buildExcerpt(
  text: string,
  indices: readonly RangeTuple[],
): {
  text: string;
  ranges: readonly RangeTuple[];
  hasLeadingEllipsis: boolean;
  hasTrailingEllipsis: boolean;
} {
  if (text.length <= MAX_EXCERPT_CHARACTER_COUNT) {
    return {
      text,
      ranges: indices,
      hasLeadingEllipsis: false,
      hasTrailingEllipsis: false,
    };
  }

  const firstMatch = indices[0];
  const firstMatchStart = firstMatch == undefined ? 0 : firstMatch[0];
  const maxOffset = text.length - MAX_EXCERPT_CHARACTER_COUNT;
  const offset = Math.min(
    Math.max(0, firstMatchStart - EXCERPT_CONTEXT_BEFORE_MATCH_CHARACTER_COUNT),
    maxOffset,
  );
  const end = offset + MAX_EXCERPT_CHARACTER_COUNT;
  const ranges: RangeTuple[] = [];
  const endOffset = end - 1;
  for (const [start, rangeEnd] of indices) {
    if (rangeEnd < offset || start > endOffset) {
      continue;
    }
    ranges.push([
      Math.max(start, offset) - offset,
      Math.min(rangeEnd, endOffset) - offset,
    ]);
  }

  return {
    text: text.slice(offset, end),
    ranges,
    hasLeadingEllipsis: offset > 0,
    hasTrailingEllipsis: end < text.length,
  };
}

function highlightText(
  text: string,
  indices: readonly RangeTuple[],
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

function buildMatchesByKey(
  matches: readonly FuseResultMatch[] | undefined,
): ReadonlyMap<SearchKey, FuseResultMatch> {
  const matchesByKey = new Map<SearchKey, FuseResultMatch>();
  if (matches == undefined) {
    return matchesByKey;
  }

  for (const match of matches) {
    matchesByKey.set(parseSearchKey(match.key), match);
  }

  return matchesByKey;
}

function parseSearchKey(key: string | undefined): SearchKey {
  if (key === "category" || key === "question" || key === "answer") {
    return key;
  }

  throw new Error("Q&A検索結果のキーが不正です");
}
