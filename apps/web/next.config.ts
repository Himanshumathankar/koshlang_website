import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: [
    "@koshlang/compiler-client",
    "@koshlang/config",
    "@koshlang/registry-client",
    "@koshlang/release-client",
    "@koshlang/seo",
    "@koshlang/ui"
  ],
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" }
        ]
      }
    ];
  }
};

export default nextConfig;
