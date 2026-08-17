# Phase 1 Foundation Audit

Status values:

- `done`: implemented and verified
- `partial`: exists, but does not yet meet the master-plan bar
- `missing`: not implemented

## Required Items

| Item | Status | Notes |
| --- | --- | --- |
| Monorepo | done | pnpm workspace and Turborepo exist. |
| Repository architecture | done | `apps/web/src/app` owns the active web app. `apps/docs`, `apps/playground`, `apps/registry`, `apps/cms`, packages and tooling boundaries exist. Later app boundaries remain service scaffolds. |
| Design tokens | done | Shared token exports and CSS variables live in `packages/ui`. |
| Design system | partial | `packages/ui` now has shared primitives, tokens and accessibility contracts; full component coverage from the master plan is not complete. |
| Global layout | done | The copied frontend shell has skip link, header, footer, responsive content area and route tests. |
| Theme | done | Light, dark and system theme modes exist with persistence and tests. |
| Responsive nav | done | Desktop nav, mobile menu, current-route state and tests exist. |
| Footer | partial | Full frontend footer exists; CMS/global settings integration is still a later CMS wiring task. |
| Env validation | done | `@koshlang/config` validates public runtime, server runtime, Payload, database, storage, API endpoints, analytics and feature flags. |
| CI | done | GitHub Actions runs install, lint, typecheck, unit tests, dead-UI audit, build and Playwright smoke tests. |
| Lint/typecheck/test | done | Workspace scripts run across packages. |
| SEO utility | partial | Shared metadata helper exists; sitemap strategy, JSON-LD validation and CMS overrides are incomplete. |
| CMS foundation | done | Payload CMS foundation contract maps admin, PostgreSQL, media storage, collections, globals, preview and ownership boundaries. |

## Immediate Phase 1 Work Remaining

None. Phase 1 foundation is complete.

Next work starts Phase 2 and must replace copied demo/prototype surfaces with real vertical slices where the master plan requires canonical data, CMS ownership, metadata, tests and non-deceptive behavior.
