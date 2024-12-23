import { sortedImportGlob } from "@/helper";
import type { MarkdownInstance } from "astro";
import z from "zod";

const articleSchema = z.object({
  slug: z.string(),
  title: z.string(),
  date: z.string(),
});
type Article = z.infer<typeof articleSchema>;

export const articles = sortedImportGlob<MarkdownInstance<Article>>(
  import.meta.glob("@/assets/news/*.md", { eager: true }),
).reverse();

// バリデーション
articles.forEach((article) => {
  articleSchema.parse(article.frontmatter);
});
