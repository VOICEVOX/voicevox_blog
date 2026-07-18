/**
 * https://docs.astro.build/ja/guides/integrations-guide/sitemap/#sitemap-link-in-robotstxt からコピー
 */
import { isPreview, withBaseUrl } from "@/helper";
import type { APIRoute } from "astro";

const getRobotsTxt = (sitemapURL: URL) => `User-agent: *
${isPreview ? "Disallow" : "Allow"}: /

Sitemap: ${sitemapURL.href}
`;

export const GET: APIRoute = ({ site }) => {
  const sitemapURL = new URL(withBaseUrl("/sitemap-index.xml"), site);
  return new Response(getRobotsTxt(sitemapURL));
};
