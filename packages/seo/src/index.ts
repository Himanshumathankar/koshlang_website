import type { PublicRuntimeConfig } from "@koshlang/config";

export type SeoInput = {
  title: string;
  description: string;
  path?: string;
  noIndex?: boolean;
  imagePath?: string;
};

export function absoluteUrl(config: PublicRuntimeConfig, path = "/"): string {
  return new URL(path, `${config.siteUrl}/`).toString();
}

export function buildPageMetadata(config: PublicRuntimeConfig, input: SeoInput) {
  const canonical = absoluteUrl(config, input.path ?? "/");
  const title = input.title === "KoshLang" ? input.title : `${input.title} | KoshLang`;
  const image = input.imagePath ? absoluteUrl(config, input.imagePath) : undefined;

  return {
    title,
    description: input.description,
    alternates: { canonical },
    robots: {
      index: !input.noIndex,
      follow: !input.noIndex
    },
    openGraph: {
      title,
      description: input.description,
      url: canonical,
      siteName: "KoshLang",
      type: "website",
      images: image ? [{ url: image }] : undefined
    },
    twitter: {
      card: image ? "summary_large_image" : "summary",
      title,
      description: input.description,
      images: image ? [image] : undefined
    }
  };
}

export function organizationJsonLd(config: PublicRuntimeConfig) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "KoshLang",
    url: config.siteUrl,
    sameAs: config.githubUrl ? [config.githubUrl] : []
  };
}
