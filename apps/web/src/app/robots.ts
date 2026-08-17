import { getPublicConfig } from "@koshlang/config";

export default function robots() {
  const config = getPublicConfig();

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/admin/", "/preview/"]
      }
    ],
    sitemap: `${config.siteUrl}/sitemap.xml`
  };
}
