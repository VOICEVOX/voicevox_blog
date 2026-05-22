import { QUESTION_HEADING_PREFIX } from "./_qa";
import type { QaSearchResult } from "./_QaSearch";
import { assertNonNullable } from "@/helper";
import type { RangeTuple } from "fuse.js";
import type { ReactNode } from "react";

const MAX_EXCERPT_CHARACTER_COUNT = 140;
const EXCERPT_CONTEXT_BEFORE_MATCH_CHARACTER_COUNT = 40;

export default function SearchResultItem({
  result,
}: {
  result: QaSearchResult;
}) {
  const { item, indicesByKey } = result;
  const excerpt = buildExcerpt(item.answer, indicesByKey.answer);

  return (
    <li className="py-md">
      <a
        href={`#${item.id}`}
        className="vv-status-layer -mx-2xs px-2xs py-xs block rounded-md text-current no-underline"
        onClick={(event) => {
          event.preventDefault();
          const target = document.getElementById(item.id);
          assertNonNullable(target);
          target.scrollIntoView();
          history.replaceState(null, "", `#${item.id}`);
        }}
      >
        <p className="text-sm font-bold text-green-900">
          {highlightText(item.category, indicesByKey.category)}
        </p>
        <p className="mt-2xs text-lg font-bold text-neutral-900">
          {QUESTION_HEADING_PREFIX}
          {highlightText(item.question, indicesByKey.question)}
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
  const firstMatchStart = indices.length > 0 ? indices[0][0] : 0;
  const maxOffset = Math.max(0, text.length - MAX_EXCERPT_CHARACTER_COUNT);
  const offset = Math.min(
    Math.max(0, firstMatchStart - EXCERPT_CONTEXT_BEFORE_MATCH_CHARACTER_COUNT),
    maxOffset,
  );
  const end = Math.min(text.length, offset + MAX_EXCERPT_CHARACTER_COUNT);
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
