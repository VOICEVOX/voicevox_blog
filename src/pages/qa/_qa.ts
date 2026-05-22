import { stripHtmlTags } from "@/helper";
import type { MarkdownHeading } from "astro";

type ParsedHeading = {
  depth: number;
  text: string;
};

type ParsedLine =
  | { kind: "codeFence" }
  | { kind: "heading"; heading: ParsedHeading }
  | { kind: "text"; text: string };

type ParseState =
  | { kind: "init" }
  | { kind: "category"; category: string }
  | {
      kind: "question";
      category: string;
      question: string;
      slug: string;
      answerLines: string[];
    };

export type QaSearchItem = {
  id: string;
  category: string;
  question: string;
  answer: string;
};

export const QUESTION_HEADING_PREFIX = "Q. ";

export function buildQaSearchItems(
  markdown: string,
  headings: MarkdownHeading[],
): QaSearchItem[] {
  const questionHeadings = headings.filter((heading) => heading.depth === 3);
  const items: QaSearchItem[] = [];
  let state: ParseState = { kind: "init" };
  let questionIndex = 0;
  let inCodeFence = false;

  const pushCurrentItem = () => {
    if (state.kind !== "question") {
      return;
    }

    items.push({
      id: state.slug,
      category: state.category,
      question: state.question,
      answer: normalizeAnswerText(state.answerLines),
    });
  };

  const pushAnswerLine = (line: string) => {
    if (state.kind !== "question") {
      return;
    }
    state.answerLines.push(line);
  };

  for (const line of markdown.split(/\r?\n/)) {
    const parsedLine = parseLine(line, inCodeFence);

    switch (parsedLine.kind) {
      case "codeFence":
        inCodeFence = !inCodeFence;
        pushAnswerLine(line);
        break;
      case "text":
        pushAnswerLine(parsedLine.text);
        break;
      case "heading": {
        const { heading } = parsedLine;
        if (heading.depth === 2) {
          pushCurrentItem();
          state = {
            kind: "category",
            category: normalizeMarkdownText(heading.text),
          };
          break;
        }

        if (heading.depth === 3) {
          pushCurrentItem();
          if (state.kind === "init") {
            throw new Error("Q&A検索用データのカテゴリより前に質問があります");
          }

          const questionHeading = questionHeadings[questionIndex];
          if (questionHeading == undefined) {
            throw new Error("Q&A検索用データの見出しIDが足りません");
          }

          const questionText = normalizeMarkdownText(heading.text);
          if (normalizeMarkdownText(questionHeading.text) !== questionText) {
            throw new Error("Q&A検索用データの見出し順が一致しません");
          }

          state = {
            kind: "question",
            category: state.category,
            question: parseQuestionText(questionText),
            slug: questionHeading.slug,
            answerLines: [],
          };
          questionIndex += 1;
          break;
        }

        pushAnswerLine(heading.text);
        break;
      }
    }
  }

  if (inCodeFence === true) {
    throw new Error("Q&A検索用データのコードブロックが閉じていません");
  }

  pushCurrentItem();

  if (questionIndex !== questionHeadings.length) {
    throw new Error("Q&A検索用データに未処理の質問見出しがあります");
  }

  return items;
}

function parseLine(line: string, inCodeFence: boolean): ParsedLine {
  if (isCodeFenceLine(line) === true) {
    return { kind: "codeFence" };
  }

  if (inCodeFence === true) {
    return { kind: "text", text: line };
  }

  const heading = parseHeading(line);
  if (heading == undefined) {
    return { kind: "text", text: line };
  }

  return { kind: "heading", heading };
}

function isCodeFenceLine(line: string): boolean {
  return /^(`{3,}|~{3,})/.test(line);
}

function parseHeading(line: string): ParsedHeading | undefined {
  const match = /^(#{1,6})\s+(.+?)\s*#*\s*$/.exec(line);
  if (match == undefined) {
    return undefined;
  }

  return {
    depth: match[1].length,
    text: match[2],
  };
}

function normalizeAnswerText(lines: string[]): string {
  return lines
    .map((line) => normalizeMarkdownText(line))
    .filter((line) => line.length > 0)
    .join(" ");
}

function parseQuestionText(text: string): string {
  if (!text.startsWith(QUESTION_HEADING_PREFIX)) {
    throw new Error("Q&A検索用データの質問見出しがQ. から始まっていません");
  }

  const questionText = text.slice(QUESTION_HEADING_PREFIX.length).trim();
  if (questionText.length === 0) {
    throw new Error("Q&A検索用データの質問が空です");
  }

  return questionText;
}

function normalizeMarkdownText(text: string): string {
  return stripHtmlTags(text)
    .replace(/!\[([^\]]*)\]\([^)]+\)/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/`([^`]*)`/g, "$1")
    .replace(/[*_~]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}
