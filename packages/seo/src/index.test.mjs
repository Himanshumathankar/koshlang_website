import assert from "node:assert/strict";
import test from "node:test";

import { absoluteUrl, buildPageMetadata } from "./index.ts";

const config = {
  siteUrl: "https://koshlang.example",
  docsUrl: "https://docs.koshlang.example",
  playgroundUrl: "https://play.koshlang.example",
  registryUrl: "https://pkg.koshlang.example",
  analyticsProvider: "disabled"
};

test("absoluteUrl resolves paths against the site URL", () => {
  assert.equal(absoluteUrl(config, "/download"), "https://koshlang.example/download");
});

test("buildPageMetadata creates canonical metadata", () => {
  const metadata = buildPageMetadata(config, {
    title: "Download",
    description: "Download page",
    path: "/download"
  });

  assert.equal(metadata.title, "Download | KoshLang");
  assert.equal(metadata.alternates.canonical, "https://koshlang.example/download");
});
