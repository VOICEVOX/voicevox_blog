import type { MarkdownHeading } from "astro";
import type { Heading, RootContent } from "mdast";
import { toString as mdastToString } from "mdast-util-to-string";
import remarkParse from "remark-parse";
import { unified } from "unified";

type QuestionSection = {
  category: string;
  questionHeading: Heading;
  bodyNodes: RootContent[];
};

export type QaSearchItem = {
  anchorId: string;
  category: string;
  question: string;
  answer: string;
};

export const QUESTION_HEADING_PREFIX = "Q. ";

/** Markdown本文と見出し一覧からQ&A検索用アイテムを生成する */
export function buildQaSearchItems(
  markdown: string,
  headings: MarkdownHeading[],
): QaSearchItem[] {
  const questionHeadings = headings.filter((heading) => heading.depth === 3);
  const tree = unified().use(remarkParse).parse(markdown);
  const sections = extractQuestionSections(tree.children);

  if (sections.length !== questionHeadings.length) {
    throw new Error("Q&A検索用データの質問数と見出しIDの数が一致しません");
  }

  return sections.map((section, index) => ({
    anchorId: questionHeadings[index].slug,
    category: section.category,
    question: stripQuestionPrefix(mdastToString(section.questionHeading)),
    answer: buildAnswerText(section.bodyNodes),
  }));
}

function extractQuestionSections(nodes: RootContent[]): QuestionSection[] {
  const sections: QuestionSection[] = [];
  let currentCategory: string | null = null;
  let currentSection: QuestionSection | null = null;

  for (const node of nodes) {
    if (node.type === "heading" && node.depth === 2) {
      if (currentSection != null) {
        sections.push(currentSection);
        currentSection = null;
      }
      currentCategory = mdastToString(node);
      continue;
    }

    if (node.type === "heading" && node.depth === 3) {
      if (currentSection != null) {
        sections.push(currentSection);
      }
      if (currentCategory == null) {
        throw new Error("Q&A検索用データのカテゴリより前に質問があります");
      }
      currentSection = {
        category: currentCategory,
        questionHeading: node,
        bodyNodes: [],
      };
      continue;
    }

    if (currentSection != null) {
      currentSection.bodyNodes.push(node);
    }
  }

  if (currentSection != null) {
    sections.push(currentSection);
  }

  return sections;
}

function buildAnswerText(bodyNodes: RootContent[]): string {
  return bodyNodes
    .filter((node) => node.type !== "html")
    .map((node) => mdastToString(node).trim())
    .filter((text) => text.length > 0)
    .join(" ");
}

function stripQuestionPrefix(text: string): string {
  if (!text.startsWith(QUESTION_HEADING_PREFIX)) {
    throw new Error("Q&A検索用データの質問見出しがQ. から始まっていません");
  }
  return text.slice(QUESTION_HEADING_PREFIX.length);
}
