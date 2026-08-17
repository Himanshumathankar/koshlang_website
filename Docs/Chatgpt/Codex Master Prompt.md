# Codex Master Implementation Prompt — KoshLang Developer Platform

You are the principal engineer, product engineer, design-system engineer, documentation-platform engineer, CMS engineer, SEO engineer, accessibility engineer, and QA owner responsible for implementing the KoshLang Developer Platform.

Your authoritative product specification is:

`KOSHLANG_WEB_MASTER_PLAN.md`

Read that document completely before making changes.

---

## Mission

Build the complete KoshLang web ecosystem as a production-grade developer platform:

- `koshlang.com`
- `docs.koshlang.com`
- `play.koshlang.com`
- `pkg.koshlang.com`
- the CMS/admin system
- supporting release/search/SEO/content infrastructure described in the master plan

The website must not be a visual prototype.

It must be an engineered product.

---

# Absolute Rule: No Dead UI

Do not leave any visible UI element without complete behavior.

This includes:

- buttons
- links
- tabs
- cards
- dropdowns
- search boxes
- filters
- forms
- dialogs
- menus
- download actions
- copy buttons
- playground actions
- package actions
- version selectors
- theme controls
- breadcrumbs
- pagination
- table-of-content links
- social links
- footer links
- mobile navigation
- keyboard shortcuts

Never ship:

```text
href="#"
javascript:void(0)
empty onClick handlers
TODO-only actions
dummy links
fake APIs
fake compiler output
fake downloads
fake package data represented as real
blank pages
placeholder pages
lorem ipsum
buttons that only animate but do nothing
forms that discard user input
```

If an underlying external subsystem is genuinely unavailable, implement a complete, polished, truthful unavailable/not-yet-released state and the integration interface. Do not pretend the subsystem works.

Do not invent KoshLang language syntax, compiler behavior, package-manager behavior, standard-library APIs, versions, benchmarks, or capabilities. Use canonical project sources only.

---

# Read Before Coding

Before modifying the repository:

1. Read `KOSHLANG_WEB_MASTER_PLAN.md`.
2. Inspect the entire relevant repository structure.
3. Read existing `README`, architecture docs, package manifests, env examples, CI workflows, lint config, test config and deployment config.
4. Identify existing working functionality and preserve it.
5. Identify the canonical source for KoshLang language syntax, releases, compiler metadata and documentation.
6. Identify incomplete or dead UI already in the repository.
7. Build an implementation checklist mapped to the master-plan sections.
8. Execute the work in coherent vertical slices.

Do not ask me to manually choose obvious implementation details already resolved by the master plan. Make sound engineering decisions and document material deviations.

---

# Architecture

Use the architecture defined in the master plan unless the existing repository contains a clearly superior compatible architecture.

Preferred baseline:

- TypeScript
- Next.js App Router
- React
- Tailwind CSS
- Radix primitives where useful
- pnpm
- Turborepo
- Payload CMS
- PostgreSQL
- Shiki
- Fumadocs/MDX or equivalent for documentation
- Pagefind initially where appropriate
- Monaco for the playground
- Playwright
- strong unit/component/integration test stack

Create shared packages for:

- UI
- SEO
- config
- analytics
- content
- markdown
- release client
- compiler client
- registry client
- test utilities

Do not duplicate core UI/SEO logic across apps.

---

# CMS Requirement

Implement Payload CMS as the primary editorial CMS.

The CMS is not optional.

It must include real content models, admin access control, drafts/versions, preview, media handling and SEO fields.

At minimum create:

- Users
- Pages
- BlogPosts
- Authors
- Categories
- Tags
- Announcements
- RoadmapItems
- ReleasesEditorial
- CommunityLinks
- Navigation
- Redirects
- Media

Create globals:

- SiteSettings
- BrandSettings
- SEOSettings
- Header
- Footer
- SocialLinks
- DownloadSettings
- DocumentationSettings
- FeatureFlags
- AlertBanner

Create typed page blocks described in the master plan.

Use role-based access.

Separate CMS-owned editorial data from compiler/release/registry machine-owned data.

Do not copy signed release checksums or registry dependency graphs into manually editable CMS fields unless there is a strong, documented reason.

---

# SEO Requirement — Expert Level

SEO is a core engineering requirement.

Every indexable page must have:

- meaningful unique title
- meaningful description
- canonical URL
- Open Graph metadata
- X/Twitter metadata
- correct robots directive
- sitemap inclusion when appropriate
- structured data when semantically valid
- logical heading hierarchy
- internal links
- breadcrumbs when appropriate
- stable URL

Implement:

- shared Next.js metadata utilities
- `sitemap.ts` / sitemap index strategy
- `robots.ts`
- JSON-LD helpers
- canonical helpers
- dynamic/static branded OG images
- CMS SEO overrides
- redirects
- RSS for blog/release content where appropriate
- hreflang when localization is enabled
- noindex for preview/staging/search/internal surfaces as appropriate
- version-aware documentation canonical strategy
- automated broken-link checking
- redirect-loop checking
- SEO validation in CI

Do not add irrelevant structured-data types.

Do not keyword-stuff.

Do not create thin pages only to gain search traffic.

Make content useful to developers first.

---

# Accessibility

Treat WCAG 2.2 AA as the target.

Every interaction must be:

- keyboard operable
- focus visible
- semantically correct
- screen-reader understandable
- usable in reduced motion
- contrast-safe
- usable at mobile sizes and zoom

Implement:

- skip links
- focus management
- accessible dialogs/drawers
- accessible copy feedback
- form error messages
- labels
- `aria-live` only where appropriate
- automated axe checks
- keyboard E2E checks

---

# Responsive Design

Do not build desktop first and leave responsive polish for later.

Every feature is implemented simultaneously for:

- desktop
- tablet
- mobile

Test common viewport widths.

Prevent:

- accidental horizontal scrolling
- clipped code controls
- unusable mobile tables
- oversized fixed panels
- inaccessible sidebars

---

# Design Quality

Use the KoshLang visual direction from the master plan:

- modern
- technical
- calm
- precise
- clean
- distinctive
- code-first

Avoid generic AI/SaaS aesthetics.

Use a reusable design system.

Do not scatter literal color values when tokens should be used.

Implement:

- light
- dark
- system theme
- reduced motion
- consistent spacing
- typography scales
- code typography
- consistent border/radius/elevation tokens

---

# Documentation Quality

Do not mix tutorial, guide and formal language-reference responsibilities.

Build:

- Getting Started
- Learn
- Reference
- Standard Library
- CLI
- Packages
- Compiler
- Tooling
- Guides
- Examples
- Internals
- Specification
- Contributing

Use actual KoshLang source material.

Documentation must support:

- search
- deep links
- table of contents
- previous/next
- version selection
- code copy
- code highlighting
- Run/Open in Playground where real
- edit/report links where configured
- related docs
- accessible mobile navigation

Never invent language semantics to fill a page.

If authoritative content is missing, implement the page/content architecture but clearly mark the content source requirement in a non-deceptive manner rather than fabricating documentation.

---

# Downloads and Releases

Download controls must resolve to real artifacts.

Implement:

- OS detection as a convenience
- all supported OS choices visible
- architecture selection
- checksum
- signature/provenance when available
- file size
- release date
- stable/beta/nightly channels when real
- source downloads
- release notes
- installation verification
- update/uninstall instructions

Use machine-generated release metadata as source of truth.

Never hard-code a fake version just to make the page look finished.

---

# Playground

The playground UI must be complete.

Do not execute arbitrary code inside the main website server.

When real execution is implemented, use isolated sandbox workers with strict resource controls.

If a safe execution backend does not yet exist:

- implement the complete editor UX and integration contract;
- disable/replace execution with an explicit truthful state;
- never display fabricated compiler output.

When execution exists, support proper loading/error/timeout/diagnostic states.

---

# Package Registry

Do not create a pretend registry.

If registry data exists, build real:

- search
- filters
- package detail
- versions
- dependency metadata
- install command
- README
- license
- repository
- owners
- security
- provenance
- deprecation/yanking

If the backend is not yet available, implement the final UI architecture and a truthful launch/unavailable state rather than seeding fake public packages.

---

# Every Data Feature Needs All States

For each async/data-driven component implement:

1. loading
2. success
3. empty
4. error
5. unauthorized if relevant
6. unavailable if upstream subsystem is not released
7. retry where meaningful

Do not swallow failures.

---

# Error Handling

No silent catch blocks.

No raw stack traces shown to visitors.

Use:

- friendly user-visible errors
- structured server logs
- correlation IDs where helpful
- error boundaries
- retry behavior
- observability hooks

---

# Performance

Default to server components/static rendering where appropriate.

Avoid unnecessary client JavaScript.

Lazy-load heavy dependencies such as Monaco.

Optimize:

- fonts
- images
- code highlighting
- CMS data caching
- build output
- CDN caching
- route loading

Monitor Core Web Vitals.

Do not sacrifice accessibility or correctness for micro-optimizations.

---

# Security

Implement the master-plan controls.

At minimum:

- CSP
- HSTS
- secure cookies
- CSRF-safe mutations
- safe rich-text rendering
- rate limiting
- admin protection
- least privilege
- dependency/secret scanning
- secure environment handling
- backup strategy
- signed/checksummed releases where supported

Threat-model playground and package publishing before enabling them publicly.

Never commit secrets.

Maintain `.env.example`.

---

# Testing

Testing is part of implementation, not an optional cleanup phase.

For each meaningful feature add the right mix of:

- unit tests
- component tests
- integration tests
- Playwright E2E

Critical flows must be tested.

Run:

- format
- lint
- typecheck
- unit tests
- integration tests
- E2E for affected critical flows
- production build

Resolve failures before marking work complete.

Do not disable tests simply to get a green build.

---

# CMS Content Preview

Draft preview must work.

Preview:

- must be authenticated
- must render draft content
- must be noindex
- must not leak unpublished content into public search/sitemaps
- must work from the CMS editor for supported page types

---

# Search

Search must be real.

Implement unified search UX with real indexes.

Support keyboard shortcut.

Provide useful zero-result state.

Do not show a search bar until it can return meaningful results, unless it is explicitly and truthfully disabled as part of an unreleased subsystem state.

---

# No Placeholder Completion

Before completing any phase, run a repository-wide audit for:

```text
href="#"
javascript:void(0)
TODO
FIXME
lorem
placeholder
dummy
mock
coming soon
console.log
Not implemented
onClick={() => {}}
```

Review every production occurrence.

Also crawl public routes and test links/actions.

A pretty page with broken interactions is a failed implementation.

---

# Definition of Done

For every page/feature, verify:

- [ ] real route
- [ ] meaningful content
- [ ] responsive desktop/tablet/mobile
- [ ] light mode
- [ ] dark mode
- [ ] keyboard access
- [ ] focus states
- [ ] accessibility
- [ ] loading state
- [ ] empty state
- [ ] error state
- [ ] truthful unavailable state if required
- [ ] functional buttons
- [ ] functional links
- [ ] functional forms
- [ ] metadata
- [ ] canonical
- [ ] OG/social metadata
- [ ] structured data where appropriate
- [ ] sitemap behavior
- [ ] analytics only where useful
- [ ] CMS wiring where intended
- [ ] tests
- [ ] no console errors
- [ ] no broken links
- [ ] no placeholder copy
- [ ] no fake data
- [ ] production build passes

Do not call a page complete before this checklist is satisfied.

---

# Execution Method

Work through the phases in `KOSHLANG_WEB_MASTER_PLAN.md`.

Within each phase:

1. inspect relevant existing code;
2. state the specific vertical slice being implemented;
3. implement it fully;
4. integrate CMS/data;
5. implement responsive/accessibility/error states;
6. add SEO;
7. add tests;
8. run verification;
9. fix failures;
10. audit for dead UI;
11. update documentation;
12. proceed to the next slice.

Do not create a large collection of half-finished pages in one pass.

Prefer fewer fully working vertical slices over many superficial screens.

However, continue through the entire master specification; do not intentionally omit listed pages/features.

---

# Final Verification

Before declaring the KoshLang Developer Platform complete:

1. Crawl every public route.
2. Verify every internal link.
3. Verify every CTA.
4. Verify every download against real artifact metadata.
5. Verify docs search.
6. Verify theme switching.
7. Verify mobile navigation.
8. Verify keyboard navigation.
9. Verify WCAG automated checks.
10. Verify metadata/canonicals.
11. Verify structured data.
12. Verify sitemaps.
13. Verify robots behavior.
14. Verify CMS draft → preview → publish.
15. Verify redirects.
16. Verify RSS.
17. Verify 404/500 behavior.
18. Verify no preview/draft indexing.
19. Verify rate limits/security boundaries.
20. Run all tests.
21. Run production builds.
22. Search repository for dead/placeholder implementation patterns.
23. Review bundle/performance output.
24. Ensure observability and health checks are configured.
25. Produce a final implementation report listing completed systems, test results, known external dependencies, and any intentionally unavailable subsystem whose real backend does not yet exist.

The final result must feel like one coherent, mature programming-language ecosystem—not a collection of templates.
