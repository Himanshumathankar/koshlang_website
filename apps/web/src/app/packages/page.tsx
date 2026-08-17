import { getPublicConfig } from "@koshlang/config";
import { buildPageMetadata } from "@koshlang/seo";
import { ReviewApp } from "@/components/review-app";

export function generateMetadata() {
  return buildPageMetadata(getPublicConfig(), {
    title: "Packages",
    description: "KoshLang package registry surface with search enabled only when the registry API is configured.",
    path: "/packages"
  });
}

export default function PackagesPage() {
  return <ReviewApp />;
}
