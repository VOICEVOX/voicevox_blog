/**
 * https://docs.astro.build/ja/guides/integrations-guide/sitemap/#sitemap-link-in-robotstxt からコピー
 */
import { isPreview } from "@helper";
import type { APIRoute } from "astro";

const getRobotsTxt = (sitemapURL: URL) => `User-agent: *
${isPreview ? "Disallow" : "Allow"}: /

Sitemap: ${sitemapURL.href}
`;

export const GET: APIRoute = ({ site }) => {
  const sitemapURL = new URL("sitemap-index.xml", site);
  return new Response(getRobotsTxt(sitemapURL));
};
