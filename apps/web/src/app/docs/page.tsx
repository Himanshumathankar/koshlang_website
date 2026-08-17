import { getPublicConfig } from "@koshlang/config";
import { buildPageMetadata } from "@koshlang/seo";
import { ReviewApp } from "@/components/review-app";

export function generateMetadata() {
  return buildPageMetadata(getPublicConfig(), {
    title: "Docs",
    description: "KoshLang documentation architecture with canonical source requirements.",
    path: "/docs"
  });
}

export default function DocsIndexPage() {
  return <ReviewApp />;
}
