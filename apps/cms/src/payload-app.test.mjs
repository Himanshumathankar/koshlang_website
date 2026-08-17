import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import test from "node:test";

const root = path.resolve(import.meta.dirname, "..");

test("CMS app exposes a Payload admin route and API routes", () => {
  assert.ok(existsSync(path.join(root, "payload.config.ts")));
  assert.ok(existsSync(path.join(root, "app/(payload)/admin/[[...segments]]/page.tsx")));
  assert.ok(existsSync(path.join(root, "app/(payload)/api/[...slug]/route.ts")));
  assert.ok(existsSync(path.join(root, "app/(payload)/api/graphql/route.ts")));
});

test("CMS dev script opens the admin service on port 3001", () => {
  const manifest = JSON.parse(readFileSync(path.join(root, "package.json"), "utf8"));

  assert.equal(manifest.scripts.dev, "next dev -p 3001");
  assert.equal(manifest.dependencies.payload, "^3.88.0");
});
