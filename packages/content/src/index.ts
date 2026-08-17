export type CmsRole = "super-admin" | "admin" | "editor" | "author" | "reviewer" | "SEO-editor";

export type EditorialStatus = "draft" | "review" | "published";

export type SeoFields = {
  title?: string;
  description?: string;
  canonicalUrlOverride?: string;
  noIndex?: boolean;
  noFollow?: boolean;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
};

export const cmsCollections = [
  "Users",
  "Pages",
  "BlogPosts",
  "Authors",
  "Categories",
  "Tags",
  "Announcements",
  "RoadmapItems",
  "ReleasesEditorial",
  "CommunityLinks",
  "Navigation",
  "Redirects",
  "Media",
  "DocsEditorial"
] as const;

export const cmsGlobals = [
  "SiteSettings",
  "BrandSettings",
  "SEOSettings",
  "Header",
  "Footer",
  "SocialLinks",
  "DownloadSettings",
  "DocumentationSettings",
  "FeatureFlags",
  "AlertBanner"
] as const;

export { getWebsiteCmsPage, websiteCmsSeed } from "./website-cms-seed.ts";
export type { CmsLink, CmsPageSeed, WebsiteCmsSeed } from "./website-cms-seed.ts";
