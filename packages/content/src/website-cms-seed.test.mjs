import assert from "node:assert/strict";
import test from "node:test";

import { getWebsiteCmsPage, websiteCmsSeed } from "./index.ts";

test("website CMS seed mirrors copied frontend navigation and main pages", () => {
  assert.deepEqual(
    websiteCmsSeed.header.primaryNav.map((link) => link.label),
    ["Learn", "Docs", "Packages", "Playground", "Community", "Blog"]
  );

  assert.equal(websiteCmsSeed.footer.columns.length, 4);
  assert.ok(getWebsiteCmsPage("/"));
  assert.ok(getWebsiteCmsPage("/docs"));
  assert.ok(getWebsiteCmsPage("/tools"));
  assert.ok(getWebsiteCmsPage("/community"));
  assert.ok(getWebsiteCmsPage("/security"));
});

test("website CMS seed carries current website records without changing frontend data", () => {
  assert.equal(websiteCmsSeed.siteSettings.version, "1.4.0");
  assert.equal(websiteCmsSeed.content.homepage.principles.length, 6);
  assert.equal(websiteCmsSeed.content.homepage.codeExamples.length, 3);
  assert.equal(websiteCmsSeed.content.releases.length, 5);
  assert.equal(websiteCmsSeed.content.packages.length, 8);
  assert.equal(websiteCmsSeed.content.examples.length, 6);
  assert.equal(websiteCmsSeed.content.posts.length, 4);
  assert.equal(websiteCmsSeed.content.tools.featured.length, 4);
  assert.equal(websiteCmsSeed.content.docs.cliCommands.length, 5);
});
