# Master Plan Implementation Map

This file is the working implementation map derived from:

- `Docs/Chatgpt/Codex Master Prompt.md`
- `Docs/Chatgpt/KoshLang Web Master Plan.md`
- `Docs/Chatgpt/chat.md`

The Markdown files are the project specification. Implementation must proceed phase by phase. The chat transcript is supporting context when the master plan is unclear.

## Source Priority

1. Current user instructions
2. Codex/system safety and tool instructions
3. `Codex Master Prompt.md`
4. `KoshLang Web Master Plan.md`
5. `chat.md`
6. Existing repository code

## Non-Negotiable Rules

- Do not invent KoshLang syntax, commands, releases, package data, compiler behavior, standard-library APIs, benchmarks or compatibility claims.
- Do not create fake downloads, fake playground output, fake packages or fake search results.
- Do not ship dead UI: no broken buttons, empty handlers, fake links, placeholder routes or silent forms.
- Prefer truthful unavailable states when canonical upstream systems are missing.
- Complete phases in order. Later-phase code may exist only as a boundary/scaffold and must not be represented as complete.
- UI design polish is not the current goal. Correct architecture, data boundaries and completion gates come first.

## Phase Gates

### Phase 1 — Foundation

Required by the master plan:

- monorepo
- design tokens
- design system
- global layout
- theme
- responsive nav
- footer
- env validation
- CI
- lint/typecheck/test
- SEO utility
- CMS foundation

Phase 1 is not complete until these exist as real, tested foundations and are documented.

### Phase 2 — Main Website

- homepage
- About
- Learn landing
- Tools landing
- Community
- Contribute
- Governance
- Security
- Brand
- legal/accessibility pages
- global search foundation

Do not treat generic route shells as finished Phase 2 pages.

### Phase 3 — Download / Install / Releases

- real release source integration
- OS detection
- downloads
- install
- releases
- checksums
- release detail
- historical versions
- no fake artifacts

Until release metadata exists, only truthful unavailable states may be visible.

### Phase 4 — Docs Foundation

- docs app
- navigation
- TOC
- search
- versioning
- MDX components
- syntax highlighting
- SEO
- docs content pipeline

Documentation content must come from canonical sources.

### Phase 5 — Learning Documentation

- Getting Started
- Learn
- editor setup
- guides
- content only from canonical language sources

### Phase 6 — Reference

- language reference
- standard library
- CLI
- compiler
- tooling
- generated reference pipeline

### Phase 7 — Examples

- example index
- example details
- code actions
- downloadable examples where real
- playground links

### Phase 8 — Playground Frontend

- editor
- output/diagnostics layout
- examples
- theme
- version UI
- share UX
- no fake execution

### Phase 9 — Playground Sandbox

- execution API
- isolation
- quotas
- abuse protection
- rate limits
- observability
- E2E

### Phase 10 — Blog / Roadmap / Editorial

- CMS-powered blog
- authors/categories/tags
- roadmap
- announcements
- RSS
- structured data

### Phase 11 — Tooling Pages

- VS Code
- LSP
- formatter
- debugger
- other editor integrations based on real capabilities

### Phase 12 — Package Registry

- frontend
- API
- package metadata
- search
- publisher/account model
- security
- publishing
- storage

### Phase 13 — Release and Docs Automation

- compiler release ingestion
- generated docs
- versioned deployment
- artifacts
- package-manager hooks

### Phase 14 — Production Hardening

- accessibility audit
- security audit
- SEO crawl
- Core Web Vitals
- link audit
- dead-UI audit
- backup/restore drill
- monitoring
- status page
- incident/runbook docs

## Current Correction

The repository must be aligned with Phase 1 before more feature work. Existing later-phase route shells are not complete product work; they are temporary architectural boundaries and must not be presented as finished implementation.
