import assert from "node:assert/strict";
import test from "node:test";

import { createPayloadCmsFoundation, websiteCmsSeed } from "./index.ts";

test("Payload CMS foundation maps config to concrete admin, database, media and editorial boundaries", () => {
  const foundation = createPayloadCmsFoundation({
    environment: "development",
    siteUrl: "http://localhost:3000",
    docsUrl: "http://localhost:3000/docs",
    playgroundUrl: "http://localhost:3000/play",
    registryUrl: "http://localhost:3000/packages",
    analyticsProvider: "disabled",
    featureFlags: {
      cmsPreview: true,
      downloads: false,
      playground: false,
      packageRegistry: false,
      search: false
    },
    payload: {
      publicServerUrl: "http://localhost:3000"
    },
    storage: {
      provider: "s3",
      bucket: "koshlang-media"
    }
  });

  assert.equal(foundation.admin.route, "/admin");
  assert.equal(foundation.database.adapter, "postgres");
  assert.equal(foundation.media.storageProvider, "s3");
  assert.ok(foundation.editorial.collections.includes("Pages"));
  assert.ok(foundation.editorial.globals.includes("Header"));
  assert.ok(foundation.ownershipBoundary.machineOwns.includes("release artifacts"));
  assert.equal(foundation.phaseTwoSeed.source, "copied-frontend");
  assert.equal(foundation.phaseTwoSeed.pageCount, websiteCmsSeed.pages.length);
  assert.equal(foundation.phaseTwoSeed.navigationCount, websiteCmsSeed.header.primaryNav.length);
});
