import { QUESTION_HEADING_PREFIX } from "./_qa";
import type { QaSearchItem } from "./_qa";
import type { FuseResultMatch, RangeTuple } from "fuse.js";
import type { ReactNode } from "react";

const MAX_EXCERPT_CHARACTER_COUNT = 140;
const EXCERPT_CONTEXT_BEFORE_MATCH_CHARACTER_COUNT = 40;

export default function SearchResultItem({
  item,
  matches,
  onSelect,
}: {
  item: QaSearchItem;
  matches?: readonly FuseResultMatch[];
  onSelect: (id: string) => void;
}) {
  const categoryMatch = matches?.find((match) => match.key === "category");
  const questionMatch = matches?.find((match) => match.key === "question");
  const answerMatch = matches?.find((match) => match.key === "answer");
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
          {excerpt.hasLeadingEllipsis === true && "..."}
          {highlightText(excerpt.text, excerptRanges)}
          {excerpt.hasTrailingEllipsis === true && "..."}
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
  offset: number;
  hasLeadingEllipsis: boolean;
  hasTrailingEllipsis: boolean;
} {
  if (text.length <= MAX_EXCERPT_CHARACTER_COUNT) {
    return {
      text,
      offset: 0,
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

  return {
    text: text.slice(offset, end),
    offset,
    hasLeadingEllipsis: offset > 0,
    hasTrailingEllipsis: end < text.length,
  };
}

function sliceMatchRanges(
  indices: readonly RangeTuple[],
  offset: number,
  length: number,
): RangeTuple[] {
  const ranges: RangeTuple[] = [];
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
