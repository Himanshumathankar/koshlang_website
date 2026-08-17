# KoshLang Developer Platform

This repository is the web ecosystem for KoshLang, guided by the product specification in `Docs/Chatgpt/KoshLang Web Master Plan.md`.

The current implementation starts with the Phase 1 foundation:

- pnpm/Turborepo monorepo
- Next.js App Router web app
- app boundaries for web, docs, playground and registry surfaces
- shared UI, SEO, config, content and client packages
- truthful unavailable states for releases, playground execution and registry data
- initial CMS schema documentation and environment contract

## Development

```bash
pnpm install
pnpm dev
```

## Source-of-truth policy

The site must not invent KoshLang syntax, compiler behavior, release versions, package-manager commands, package data or benchmark claims. Until canonical systems are connected, public pages show explicit unavailable states rather than simulated data.

## Repository Shape

The project follows the master-plan architecture:

- `apps/web`
- `apps/docs`
- `apps/playground`
- `apps/registry`
- `apps/cms`
- `packages/ui`
- `packages/icons`
- `packages/config`
- `packages/seo`
- `packages/analytics`
- `packages/markdown`
- `packages/content`
- `packages/compiler-client`
- `packages/release-client`
- `packages/registry-client`
- `packages/test-utils`
- `tooling/eslint`
- `tooling/typescript`
- `tooling/tailwind`
- `tooling/scripts`
- `tooling/ci`

`apps/cms` is a Phase 1 CMS boundary for Payload. Real Payload, PostgreSQL and media-storage wiring are tracked in the Phase 1 audit.
