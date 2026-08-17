import assert from "node:assert/strict";
import test from "node:test";

import { componentContracts } from "./components/contracts.ts";
import { cx } from "./lib/classes.ts";
import { primaryNav } from "./navigation.ts";
import { colorTokens } from "./tokens/index.ts";

test("ui tokens expose light and dark color foundations", () => {
  assert.equal(colorTokens.light.background, "#FAFAFA");
  assert.equal(colorTokens.dark.background, "#0B0C0E");
});

test("component contracts encode accessibility requirements", () => {
  assert.equal(componentContracts.button.requiresAccessibleName, true);
  assert.equal(componentContracts.drawer.requiresEscapeClose, true);
  assert.equal(componentContracts.drawer.requiresReturnFocus, true);
});

test("primary navigation follows the master-plan top-level items", () => {
  assert.deepEqual(
    primaryNav.map((item) => item.label),
    ["Learn", "Docs", "Packages", "Playground", "Community", "Blog", "Download"]
  );
});

test("cx joins truthy class names only", () => {
  assert.equal(cx("one", false, undefined, "two"), "one two");
});
