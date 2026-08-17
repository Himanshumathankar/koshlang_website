import assert from "node:assert/strict";
import test from "node:test";

import { getRegistryAvailability } from "./index.ts";

test("registry is unavailable without endpoint", () => {
  const state = getRegistryAvailability();

  assert.equal(state.status, "unconfigured");
  assert.equal(state.canSearch, false);
});
