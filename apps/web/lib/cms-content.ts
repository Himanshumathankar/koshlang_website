import { getWebsiteCmsPage } from "@koshlang/content";

export type WebsitePageContent = {
  slug: string;
  title: string;
  description: string;
  path: string;
  seo: {
    title?: string;
    description?: string;
    canonicalPath?: string;
    noIndex?: boolean;
  };
  source: "cms" | "seed";
};

type PayloadPagesResponse = {
  docs?: Array<{
    slug?: string;
    title?: string;
    description?: string;
    path?: string;
    seo?: {
      title?: string;
      description?: string;
      canonicalPath?: string;
      noIndex?: boolean;
    };
  }>;
};

export async function getWebsitePageContent(path: string, env: NodeJS.ProcessEnv = process.env): Promise<WebsitePageContent | undefined> {
  const cmsPage = await fetchWebsitePageFromCms(path, env);
  if (cmsPage) return cmsPage;

  const seededPage = getWebsiteCmsPage(path);
  if (!seededPage) return undefined;

  return {
    slug: seededPage.slug,
    title: seededPage.title,
    description: seededPage.description,
    path: seededPage.seo.path,
    seo: {
      title: seededPage.seo.title,
      description: seededPage.seo.description,
      canonicalPath: seededPage.seo.path,
      noIndex: false
    },
    source: "seed"
  };
}

async function fetchWebsitePageFromCms(path: string, env: NodeJS.ProcessEnv): Promise<WebsitePageContent | undefined> {
  const baseUrl = env.PAYLOAD_PUBLIC_SERVER_URL?.trim();
  if (!baseUrl) return undefined;

  const url = new URL("/api/pages", baseUrl);
  url.searchParams.set("where[path][equals]", path);
  url.searchParams.set("limit", "1");
  url.searchParams.set("depth", "0");

  try {
    const response = await fetch(url, {
      next: {
        revalidate: 60
      }
    });

    if (!response.ok) return undefined;

    const payload = (await response.json()) as PayloadPagesResponse;
    const page = payload.docs?.[0];

    if (!page?.slug || !page.title || !page.description || !page.path) return undefined;

    return {
      slug: page.slug,
      title: page.title,
      description: page.description,
      path: page.path,
      seo: {
        title: page.seo?.title,
        description: page.seo?.description,
        canonicalPath: page.seo?.canonicalPath,
        noIndex: page.seo?.noIndex
      },
      source: "cms"
    };
  } catch {
    return undefined;
  }
}
