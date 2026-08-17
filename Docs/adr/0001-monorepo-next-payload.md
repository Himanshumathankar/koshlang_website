# ADR 0001: Monorepo, Next.js and Payload Boundary

## Status

Accepted.

## Context

The master plan calls for a production-grade developer platform with multiple public surfaces, shared design primitives, shared SEO behavior, CMS-managed editorial content and machine-owned release/compiler/registry data.

## Decision

Use a pnpm/Turborepo monorepo with Next.js App Router applications and shared TypeScript packages. Keep Payload CMS as the required editorial CMS. Create an `apps/cms` boundary because the chat context recommends Payload on the VPS/backend side, with PostgreSQL and media storage wiring added during Phase 1 foundation work.

## Consequences

Shared UI, SEO, environment and client packages prevent drift between apps. Machine-owned data remains outside the CMS editing surface to avoid fabricated or stale release, compiler and registry information.
