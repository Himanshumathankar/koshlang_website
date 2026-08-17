import { withPayload } from "@payloadcms/next/withPayload";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  transpilePackages: ["@koshlang/config", "@koshlang/content"]
};

export default withPayload(nextConfig);
