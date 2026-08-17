import { getPublicConfig } from "@koshlang/config";
import { buildPageMetadata } from "@koshlang/seo";
import { ReviewApp } from "@/components/review-app";

export function generateMetadata() {
  return buildPageMetadata(getPublicConfig(), {
    title: "Playground",
    description: "KoshLang playground frontend with execution disabled until the sandbox service is configured.",
    path: "/play"
  });
}

export default function PlaygroundPage() {
  return <ReviewApp />;
}
