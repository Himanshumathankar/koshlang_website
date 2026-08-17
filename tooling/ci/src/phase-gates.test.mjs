import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const source = readFileSync(new URL("./phase-gates.ts", import.meta.url), "utf8");

test("phase gates enumerate the complete master-plan sequence", () => {
  for (const gate of [
    "phase-1-foundation",
    "phase-2-main-website",
    "phase-3-download-install-releases",
    "phase-4-docs-foundation",
    "phase-14-production-hardening"
  ]) {
    assert.match(source, new RegExp(`"${gate}"`));
  }
});
