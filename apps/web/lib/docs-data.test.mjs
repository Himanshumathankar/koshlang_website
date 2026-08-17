import assert from "node:assert/strict";
import test from "node:test";

import { docsPages, getDocsPage } from "./docs-data.ts";

test("docs registry exposes planned documentation pages", () => {
  assert.ok(docsPages.length >= 10);
  assert.equal(getDocsPage("getting-started/installation")?.title, "Installation");
});

test("docs registry keeps unknown pages absent", () => {
  assert.equal(getDocsPage("reference/invented-syntax"), undefined);
});
