import assert from "node:assert/strict";
import test from "node:test";

import { getCompilerAvailability } from "./index.ts";

test("compiler is unavailable without endpoint", () => {
  const state = getCompilerAvailability();

  assert.equal(state.status, "unconfigured");
  assert.equal(state.canExecute, false);
});

test("compiler is available with endpoint", () => {
  const state = getCompilerAvailability("https://compiler.example.com");

  assert.equal(state.status, "available");
  assert.equal(state.canExecute, true);
});
