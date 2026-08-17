import { getPublicConfig } from "@koshlang/config";
import { docsPages } from "@/lib/docs-data";
import { overviewPages } from "@/lib/page-data";

export default function sitemap() {
  const config = getPublicConfig();
  const now = new Date();
  const routes = [
    "/",
    "/download",
    "/play",
    "/packages",
    "/search",
    "/releases",
    ...overviewPages.map((page) => `/${page.slug}`),
    ...docsPages.map((page) => `/docs/${page.slug}`)
  ];

  return routes.map((route) => ({
    url: new URL(route, `${config.siteUrl}/`).toString(),
    lastModified: now
  }));
}
