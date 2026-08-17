# Copied Frontend Phase Status

The active website UI in `apps/web/src` was copied from `Markdown Review/` by user request. Demo data and placeholder copy are allowed inside this frontend copy while the project advances phase by phase.

## Phase 1 Foundation

Status: foundation complete after validation gates.

- The frontend is located in the existing web app structure: `apps/web/src`.
- Next routes live in `apps/web/src/app`.
- React route screens live in `apps/web/src/screens` to avoid Next Pages Router conflicts.
- Layout, theme, responsive navigation, footer, docs shell and route coverage have tests.
- CI includes lint, typecheck, tests, dead-UI audit, build and Playwright smoke checks.
- Phase 2 now has a CMS seed in `packages/content` that mirrors the current website data while the frontend continues to render from the copied local data.

## Later-Phase Prototype Surfaces

These routes exist visually, but are not phase-complete product slices until connected to canonical sources:

- Phase 2: `/`, `/about`, `/learn`, `/tools`, `/community`, `/contribute`, `/governance`, `/security`, `/brand`, `/search`, `/status`
- Phase 3: `/download`, `/install`, `/releases`, `/releases/:version`
- Phase 4: `/docs`, docs navigation, docs search, docs article layout
- Phase 5: getting-started and learning docs content
- Phase 6: language reference, standard library and CLI content
- Phase 7: `/examples`, `/examples/:slug`
- Phase 8: `/play`
- Phase 10: `/blog`, `/blog/:slug`, `/roadmap`
- Phase 11: `/tools/:slug`
- Phase 12: `/pkg`, `/pkg/search`, `/pkg/:name`

## Replacement Rule

Each later phase must replace demo data with the canonical source for that phase before being marked complete. The copied UI may remain as the visual shell, but its data, links, execution paths, metadata and tests must be upgraded phase by phase.
