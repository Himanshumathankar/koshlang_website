# Repository Architecture

The repository follows the structure from `KoshLang Web Master Plan.md`.

```text
apps/
  web/          active Next.js implementation for koshlang.com and initial route surfaces
  docs/         docs.koshlang.com deployment boundary
  playground/   play.koshlang.com deployment boundary
  registry/     pkg.koshlang.com deployment boundary
  cms/          Payload CMS/admin deployment boundary

packages/
  ui/
  icons/
  config/
  seo/
  analytics/
  markdown/
  content/
  compiler-client/
  release-client/
  registry-client/
  test-utils/

tooling/
  eslint/
  typescript/
  tailwind/
  scripts/
  ci/
```

On this machine, the existing uppercase `Docs/` directory is the same filesystem entry that a lowercase `docs/` path would use, so architecture documentation is stored under `Docs/architecture`.
