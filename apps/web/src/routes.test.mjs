import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const routes = readFileSync(new URL("./routes.tsx", import.meta.url), "utf8");
const siteShell = readFileSync(new URL("./components/shells/SiteShell.tsx", import.meta.url), "utf8");
const docsShell = readFileSync(new URL("./components/shells/DocsShell.tsx", import.meta.url), "utf8");
const theme = readFileSync(new URL("./lib/theme.tsx", import.meta.url), "utf8");

test("frontend route table covers the phase-map public surfaces", () => {
  for (const path of [
    "download",
    "install",
    "releases",
    "examples",
    "tools",
    "blog",
    "play",
    "pkg",
    "roadmap",
    "community",
    "contribute",
    "governance",
    "security",
    "about",
    "brand",
    "search",
    "status"
  ]) {
    assert.match(routes, new RegExp(`path: '${path.replace("/", "\\/")}'`));
  }
});

test("global layout has skip link, responsive navigation and footer columns", () => {
  assert.match(siteShell, /href="#main"/);
  assert.match(siteShell, /lg:hidden/);
  assert.match(siteShell, /footerNav\.map/);
  assert.match(siteShell, /CommandPaletteProvider/);
});

test("docs shell wraps command palette hook in its provider", () => {
  assert.match(docsShell, /function DocsShellInner/);
  assert.match(docsShell, /<CommandPaletteProvider>/);
  assert.match(docsShell, /<DocsShellInner \/>/);
});

test("theme foundation supports light, dark and system modes", () => {
  assert.match(theme, /ThemeChoice = 'light' \| 'dark' \| 'system'/);
  assert.match(theme, /prefers-color-scheme: dark/);
  assert.match(theme, /localStorage\.setItem/);
});
