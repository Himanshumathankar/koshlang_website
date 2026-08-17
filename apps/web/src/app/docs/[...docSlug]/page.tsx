import { getPublicConfig } from "@koshlang/config";
import { buildPageMetadata } from "@koshlang/seo";
import { docsPages, getDocsPage } from "@/lib/docs-data";
import { ReviewApp } from "@/components/review-app";

type DocsPageProps = {
  params: Promise<{ docSlug: string[] }>;
};

export function generateStaticParams() {
  return docsPages.map((page) => ({ docSlug: page.slug.split("/") }));
}

export async function generateMetadata({ params }: DocsPageProps) {
  const { docSlug } = await params;
  const page = getDocsPage(docSlug.join("/"));
  if (!page) return {};

  return buildPageMetadata(getPublicConfig(), {
    title: `${page.title} Docs`,
    description: page.description,
    path: `/docs/${page.slug}`
  });
}

export default async function DocsDetailPage({ params }: DocsPageProps) {
  await params;
  return <ReviewApp />;
}
