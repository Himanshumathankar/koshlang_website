import assert from "node:assert/strict";
import test from "node:test";

import { getWebsitePageContent } from "./cms-content.ts";

test("website CMS content falls back to the Phase 2 seed when CMS URL is absent", async () => {
  const page = await getWebsitePageContent("/", {});

  assert.equal(page?.source, "seed");
  assert.equal(page?.title, "Programming, thoughtfully designed.");
  assert.equal(page?.seo.canonicalPath, "/");
});

test("website CMS content reads Payload records when a CMS URL is configured", async (t) => {
  const originalFetch = globalThis.fetch;

  t.after(() => {
    globalThis.fetch = originalFetch;
  });

  globalThis.fetch = async (url) => {
    assert.match(String(url), /where%5Bpath%5D%5Bequals%5D=%2Fabout/);

    return Response.json({
      docs: [
        {
          slug: "about",
          title: "About KoshLang from CMS",
          description: "CMS-owned about page copy.",
          path: "/about",
          seo: {
            title: "CMS About",
            description: "CMS SEO description.",
            canonicalPath: "/about",
            noIndex: false
          }
        }
      ]
    });
  };

  const page = await getWebsitePageContent("/about", {
    PAYLOAD_PUBLIC_SERVER_URL: "http://localhost:3003"
  });

  assert.equal(page?.source, "cms");
  assert.equal(page?.title, "About KoshLang from CMS");
  assert.equal(page?.seo.title, "CMS About");
});
