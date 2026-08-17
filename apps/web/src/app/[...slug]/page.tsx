import { getPublicConfig } from "@koshlang/config";
import { buildPageMetadata } from "@koshlang/seo";
import { getOverviewPage, overviewPages } from "@/lib/page-data";
import { ReviewApp } from "@/components/review-app";
import { getWebsitePageContent } from "@/lib/cms-content";

type CatchAllPageProps = {
  params: Promise<{ slug: string[] }>;
};

export function generateStaticParams() {
  return overviewPages.map((page) => ({ slug: page.slug.split("/") }));
}

export async function generateMetadata({ params }: CatchAllPageProps) {
  const { slug } = await params;
  const routePath = `/${slug.join("/")}`;
  const cmsPage = await getWebsitePageContent(routePath);
  const page = cmsPage ?? getOverviewPage(slug.join("/"));
  if (!page) return {};

  return buildPageMetadata(getPublicConfig(), {
    title: "seo" in page ? (page.seo.title ?? page.title) : page.title,
    description: "seo" in page ? (page.seo.description ?? page.description) : page.description,
    path: "path" in page ? page.path : `/${page.slug}`
  });
}

export default async function CatchAllOverviewPage({ params }: CatchAllPageProps) {
  await params;
  return <ReviewApp />;
}
