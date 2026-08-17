# Phase 2 Main Website CMS Map

This phase takes the current copied website content and represents it in the CMS content package without changing the frontend render path.

## Implemented

- Added `websiteCmsSeed` in `packages/content/src/website-cms-seed.ts`.
- Mapped the current site settings, header navigation, footer navigation, main pages, homepage content, releases, package records, examples, blog posts, roadmap items, RFCs, docs navigation, standard-library summaries, CLI command summaries, tools, community, contribute, governance, security, about, and status data.
- Exposed the seed through `@koshlang/content`.
- Exposed the same seed through `@koshlang/cms` and included a Phase 2 seed summary in the CMS foundation object.
- Added a local Payload CMS app in `apps/cms` with admin, REST API, GraphQL API, SQLite development storage, editor roles, draft/version-enabled editorial collections, media handling, SEO fields, and website globals.
- Added `pnpm --filter @koshlang/cms seed` to write the Phase 2 website seed into Payload globals and collections.
- Added a web CMS reader in `apps/web/lib/cms-content.ts` that reads Payload page records for metadata and falls back to the Phase 2 seed when the CMS is unavailable.
- Added tests to keep the CMS seed aligned with the copied frontend data counts and key route coverage.

## Boundary

The website still renders its visible UI from the copied frontend files in `apps/web/src`. Phase 2 prepares the CMS-owned data layer, a working local admin, seeded records, and a typed web read boundary without changing the current UI output.

## Local Access

Run `pnpm --filter @koshlang/cms dev`, then open `http://localhost:3001/admin`. Payload will prompt you to create the first admin user on an empty local SQLite database.

Run `pnpm --filter @koshlang/cms seed` to copy the current website content into CMS records. The seed updates existing records when run again.

## Next Phase Use

When the Payload collections are implemented, this seed becomes the import source for initial CMS records. The frontend can then move one route at a time from local data to CMS reads while preserving the visible content.
