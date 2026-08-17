#!/usr/bin/env node
import { readFileSync } from "node:fs";
import { readdir } from "node:fs/promises";
import { join } from "node:path";

const roots = ["apps", "packages", "tooling", "README.md", ".env.example", ".github", "package.json", "pnpm-workspace.yaml", "turbo.json", "eslint.config.mjs"];
const ignoredSegments = new Set(["node_modules", ".next", ".turbo", "dist"]);
const patterns = [
  'href="#"',
  "javascript:void(0)",
  "TODO",
  "FIXME",
  "placeholder",
  "coming soon",
  "dummy",
  "mock",
  "lorem",
  "console.log",
  "Not implemented",
  "onClick={() => {}}"
];

async function collectFiles(path) {
  if (ignoredSegments.has(path.split("/").at(-1))) return [];
  try {
    const entries = await readdir(path, { withFileTypes: true });
    const files = await Promise.all(entries.map((entry) => collectFiles(join(path, entry.name))));
    return files.flat();
  } catch {
    return [path];
  }
}

const files = (await Promise.all(roots.map((root) => collectFiles(root)))).flat();
const findings = [];

for (const file of files) {
  if (file.startsWith("apps/web/src/")) continue;
  if (file.endsWith(".tsbuildinfo")) continue;
  if (file.endsWith("dead-ui-audit.mjs") || file.endsWith("dead-ui-patterns.ts")) continue;
  const text = readFileSync(file, "utf8");
  const lines = text.split("\n");
  for (const [index, line] of lines.entries()) {
    for (const pattern of patterns) {
      if (line.includes(pattern)) {
        findings.push(`${file}:${index + 1}: ${pattern}`);
      }
    }
  }
}

if (findings.length > 0) {
  process.stderr.write(`${findings.join("\n")}\n`);
  process.exit(1);
}
