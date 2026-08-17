import assert from "node:assert/strict";
import test from "node:test";

import { getPublicConfig, getServerConfig } from "./index.ts";

test("getPublicConfig applies local defaults", () => {
  const config = getPublicConfig({});

  assert.equal(config.environment, "development");
  assert.equal(config.siteUrl, "http://localhost:3000");
  assert.equal(config.analyticsProvider, "disabled");
  assert.equal(config.featureFlags.cmsPreview, true);
});

test("getPublicConfig rejects invalid URLs", () => {
  assert.throws(() => getPublicConfig({ NEXT_PUBLIC_SITE_URL: "not a url" }), /valid absolute URL/);
});

test("getPublicConfig derives feature flags from configured services", () => {
  const config = getPublicConfig({
    COMPILER_API_URL: "https://compiler.koshlang.dev",
    REGISTRY_API_URL: "https://registry.koshlang.dev",
    SEARCH_API_URL: "https://search.koshlang.dev"
  });

  assert.equal(config.featureFlags.playground, true);
  assert.equal(config.featureFlags.packageRegistry, true);
  assert.equal(config.featureFlags.search, true);
});

test("getServerConfig requires production server secrets", () => {
  assert.throws(() => getServerConfig({ APP_ENV: "production" }), /DATABASE_URL is required in production/);
});

test("getServerConfig validates S3-compatible storage requirements", () => {
  assert.throws(() => getServerConfig({ STORAGE_PROVIDER: "s3" }), /S3_BUCKET is required/);

  const config = getServerConfig({
    STORAGE_PROVIDER: "s3",
    S3_BUCKET: "koshlang-downloads",
    S3_ENDPOINT: "https://account.r2.cloudflarestorage.com",
    S3_REGION: "auto",
    S3_ACCESS_KEY_ID: "key",
    S3_SECRET_ACCESS_KEY: "secret"
  });

  assert.equal(config.storage.provider, "s3");
  assert.equal(config.storage.region, "auto");
});
