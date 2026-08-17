import { getPublicConfig } from "@koshlang/config";
import { buildPageMetadata, organizationJsonLd } from "@koshlang/seo";
import { ReviewApp } from "@/components/review-app";
import { getWebsitePageContent } from "@/lib/cms-content";

export async function generateMetadata() {
  const page = await getWebsitePageContent("/");

  return buildPageMetadata(getPublicConfig(), {
    title: page?.seo.title ?? page?.title ?? "KoshLang",
    description: page?.seo.description ?? page?.description ?? "The public developer platform foundation for KoshLang.",
    path: "/"
  });
}

export default async function HomePage() {
  const config = getPublicConfig();

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd(config)) }} />
      <ReviewApp />
    </>
  );
}
