import { getPublicConfig } from "@koshlang/config";
import { buildPageMetadata, organizationJsonLd } from "@koshlang/seo";
import { ReviewApp } from "@/components/review-app";

export function generateMetadata() {
  return buildPageMetadata(getPublicConfig(), {
    title: "KoshLang",
    description: "The public developer platform foundation for KoshLang.",
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
