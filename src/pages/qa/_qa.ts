import { stripHtmlTags } from "@/helper";

export type MarkdownHeading = {
  depth: number;
  slug: string;
  text: string;
};

type ParsedHeading = {
  depth: number;
  text: string;
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
  let currentCategory: string | undefined;
  let currentQuestion: string | undefined;
  let currentSlug: string | undefined;
  let answerLines: string[] = [];
  let questionIndex = 0;
  let inCodeFence = false;

  const pushCurrentItem = () => {
    if (currentQuestion == undefined) {
      return;
    }
    if (currentCategory == undefined) {
      throw new Error("Q&A検索用データのカテゴリがありません");
    }
    if (currentSlug == undefined) {
      throw new Error("Q&A検索用データの見出しIDがありません");
    }

    items.push({
      id: currentSlug,
      category: currentCategory,
      question: currentQuestion,
      answer: normalizeAnswerText(answerLines),
    });
  };

  for (const line of markdown.split(/\r?\n/)) {
    if (isCodeFenceLine(line)) {
      inCodeFence = !inCodeFence;
      if (currentQuestion != undefined) {
        answerLines.push(line);
      }
      continue;
    }

    if (inCodeFence) {
      if (currentQuestion != undefined) {
        answerLines.push(line);
      }
      continue;
    }

    const heading = parseHeading(line);
    if (heading == undefined) {
      if (currentQuestion != undefined) {
        answerLines.push(line);
      }
      continue;
    }

    if (heading.depth === 2) {
      pushCurrentItem();
      currentCategory = normalizeMarkdownText(heading.text);
      currentQuestion = undefined;
      currentSlug = undefined;
      answerLines = [];
      continue;
    }

    if (heading.depth === 3) {
      pushCurrentItem();
      if (currentCategory == undefined) {
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

      currentQuestion = parseQuestionText(questionText);
      currentSlug = questionHeading.slug;
      answerLines = [];
      questionIndex += 1;
      continue;
    }

    if (currentQuestion != undefined) {
      answerLines.push(heading.text);
    }
  }

  if (inCodeFence) {
    throw new Error("Q&A検索用データのコードブロックが閉じていません");
  }

  pushCurrentItem();

  if (questionIndex !== questionHeadings.length) {
    throw new Error("Q&A検索用データに未処理の質問見出しがあります");
  }

  return items;
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
