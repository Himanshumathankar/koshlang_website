import { getPublicConfig } from "@koshlang/config";
import { buildPageMetadata } from "@koshlang/seo";
import { ReviewApp } from "@/components/review-app";

export function generateMetadata() {
  return buildPageMetadata(getPublicConfig(), {
    title: "Search",
    description: "Search entry point for implemented KoshLang platform pages.",
    path: "/search",
    noIndex: true
  });
}

export default function SearchPage() {
  return <ReviewApp />;
}
