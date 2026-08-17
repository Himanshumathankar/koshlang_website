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
  assert.equal(manifest.scripts.seed, "payload run src/seed-website-content.ts");
  assert.equal(manifest.dependencies.payload, "^3.88.0");
});

test("CMS has a website seed runner that writes Phase 2 website records", () => {
  const seedScript = readFileSync(path.join(root, "src/seed-website-content.ts"), "utf8");

  assert.match(seedScript, /websiteCmsSeed/);
  assert.match(seedScript, /seedPages/);
  assert.match(seedScript, /seedBlogPosts/);
  assert.match(seedScript, /updateGlobal/);
  assert.match(seedScript, /upsertCollection/);
});
