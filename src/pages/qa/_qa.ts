import type { MarkdownHeading } from "astro";
import { toString as mdastToString } from "mdast-util-to-string";
import remarkParse from "remark-parse";
import { unified } from "unified";

type QuestionParseState = {
  kind: "question";
  category: string;
  question: string;
  slug: string;
  answerLines: string[];
};

type ParseState =
  | { kind: "init" }
  | { kind: "category"; category: string }
  | QuestionParseState;

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
  const tree = unified().use(remarkParse).parse(markdown);
  const items: QaSearchItem[] = [];
  let state: ParseState = { kind: "init" };
  let questionIndex = 0;

  const pushQuestionItem = (questionState: QuestionParseState) => {
    items.push({
      id: questionState.slug,
      category: questionState.category,
      question: questionState.question,
      answer: questionState.answerLines.join(" "),
    });
  };

  for (const node of tree.children) {
    if (node.type === "heading" && node.depth === 2) {
      if (state.kind === "question") {
        pushQuestionItem(state);
      }
      state = { kind: "category", category: mdastToString(node) };
      continue;
    }

    if (node.type === "heading" && node.depth === 3) {
      if (state.kind === "question") {
        pushQuestionItem(state);
      }
      if (state.kind === "init") {
        throw new Error("Q&A検索用データのカテゴリより前に質問があります");
      }
      const questionHeading = questionHeadings[questionIndex];
      if (questionHeading == undefined) {
        throw new Error("Q&A検索用データの見出しIDが足りません");
      }
      state = {
        kind: "question",
        category: state.category,
        question: parseQuestionText(mdastToString(node)),
        slug: questionHeading.slug,
        answerLines: [],
      };
      questionIndex += 1;
      continue;
    }

    if (node.type === "html") {
      continue;
    }

    if (state.kind === "question") {
      const text = mdastToString(node).trim();
      if (text.length > 0) {
        state.answerLines.push(text);
      }
    }
  }

  if (state.kind === "question") {
    pushQuestionItem(state);
  }

  if (questionIndex !== questionHeadings.length) {
    throw new Error("Q&A検索用データに未処理の質問見出しがあります");
  }

  return items;
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
