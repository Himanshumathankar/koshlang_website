import { getPublicConfig } from "@koshlang/config";
import { buildPageMetadata } from "@koshlang/seo";
import { getOverviewPage, overviewPages } from "@/lib/page-data";
import { ReviewApp } from "@/components/review-app";

type CatchAllPageProps = {
  params: Promise<{ slug: string[] }>;
};

export function generateStaticParams() {
  return overviewPages.map((page) => ({ slug: page.slug.split("/") }));
}

export async function generateMetadata({ params }: CatchAllPageProps) {
  const { slug } = await params;
  const page = getOverviewPage(slug.join("/"));
  if (!page) return {};

  return buildPageMetadata(getPublicConfig(), {
    title: page.title,
    description: page.description,
    path: `/${page.slug}`
  });
}

export default async function CatchAllOverviewPage({ params }: CatchAllPageProps) {
  await params;
  return <ReviewApp />;
}
