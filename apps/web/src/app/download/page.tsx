import { getPublicConfig } from "@koshlang/config";
import { buildPageMetadata } from "@koshlang/seo";
import { ReviewApp } from "@/components/review-app";

export function generateMetadata() {
  return buildPageMetadata(getPublicConfig(), {
    title: "Download",
    description: "Download KoshLang from canonical release artifacts when they are configured.",
    path: "/download"
  });
}

export default function DownloadPage() {
  return <ReviewApp />;
}
