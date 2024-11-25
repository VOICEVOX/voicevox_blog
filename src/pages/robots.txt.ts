/**
 * https://docs.astro.build/ja/guides/integrations-guide/sitemap/#sitemap-link-in-robotstxt からコピー
 */

import type { APIRoute } from "astro";

const getRobotsTxt = (sitemapURL: URL) => `User-agent: *
${import.meta.env.PREVIEW ? "Disallow" : "Allow"}: /

Sitemap: ${sitemapURL.href}
`;

export const GET: APIRoute = ({ site }) => {
  const sitemapURL = new URL("sitemap-index.xml", site);
  return new Response(getRobotsTxt(sitemapURL));
};
