# KoshLang Developer Platform — Master Development Specification

> **Primary implementation document for Codex**
>
> This document defines the product, architecture, UX, CMS, SEO, documentation, release, playground, package ecosystem, security, accessibility, testing, deployment, and completion standards for the complete KoshLang web ecosystem.
>
> The target is not merely a programming-language landing page. The target is a cohesive **KoshLang Developer Platform**.

---

## 0. Executive Goal

Build a production-grade public ecosystem that lets a new visitor move naturally through:

**Discover KoshLang → Understand it → Try it → Install it → Learn it → Build with it → Find tools/packages → Read reference docs → Join the community → Contribute**

Primary surfaces:

- `koshlang.com` — public language/product website
- `docs.koshlang.com` — tutorials, guides, reference, standard library, CLI, compiler, internals
- `play.koshlang.com` — browser playground
- `pkg.koshlang.com` — package discovery/registry experience
- `status.koshlang.com` — service status
- Blog may live at `koshlang.com/blog` initially and can move to `blog.koshlang.com` later without breaking canonical URLs.

The architecture must support all surfaces from the beginning even when some are delivered in later implementation phases.

---

# 1. Non-Negotiable Product Principles

## 1.1 This is a developer platform, not a decorative marketing site

Every major user journey must work end-to-end.

Do not create pages merely to make the navigation look complete.

Do not create buttons that have no behavior.

Do not create cards that lead nowhere.

Do not create empty routes.

Do not create fake download links.

Do not create forms that silently discard submissions.

Do not create fake search.

Do not create fake compiler output.

Do not create fake package data presented as real registry data.

Do not ship `href="#"`, `javascript:void(0)`, empty `onClick`, TODO-only handlers, placeholder routes, or dead CTAs.

## 1.2 Completion contract

For every visible interactive element, one of the following MUST be true:

1. It performs its complete intended function.
2. It navigates to an implemented route containing meaningful content.
3. It opens a complete dialog/menu/sheet with functional actions.
4. It invokes a real integration/API and handles loading, success, empty, and error states.
5. If the underlying KoshLang subsystem genuinely does not exist yet, the UI must present an explicit, polished, truthful **Not Yet Released / Unavailable in this release** state and must not pretend the subsystem works.

The fifth option is an integration boundary, not permission to leave unfinished UI. The state itself must be designed, accessible, content-complete, CMS-manageable where appropriate, and tested.

## 1.3 No fabricated language semantics

Website implementation must never invent syntax, standard-library APIs, compiler behavior, package-manager commands, version numbers, performance claims, or compatibility claims unless they are supplied by an authoritative KoshLang source.

When language details are not yet available:

- build the complete content model and rendering system;
- seed clearly labeled demonstration/sample content only where explicitly appropriate;
- keep actual language-reference content sourced from the canonical KoshLang specification/repository/CMS;
- do not present invented examples as canonical language behavior.

---

# 2. Product Surfaces

## 2.1 `koshlang.com`

Responsibilities:

- brand and positioning
- overview of KoshLang
- code-first product demonstration
- download/install entry point
- releases
- learning entry points
- examples
- tooling
- packages discovery entry
- playground entry
- roadmap
- blog
- community
- contribution/governance/security
- brand resources
- global search entry
- language version/status visibility

## 2.2 `docs.koshlang.com`

Responsibilities:

- getting started
- installation
- tutorials
- language learning path
- language reference
- standard-library reference
- CLI reference
- package-manager docs
- compiler docs
- tooling/LSP/debugger/editor docs
- guides
- recipes
- examples
- internals
- formal specification
- contributing to KoshLang
- versioned documentation
- docs search
- on-page table of contents
- previous/next navigation
- code-copy/run/playground actions
- edit-page / report-issue actions where configured

## 2.3 `play.koshlang.com`

Responsibilities:

- editor
- runnable KoshLang programs when execution backend exists
- output/diagnostics
- stdin where supported
- examples
- formatting
- reset
- share
- shareable URLs
- version selection where supported
- keyboard shortcuts
- accessible controls
- execution limits and safe sandboxing
- compiler/AST/IR views only when supported by real compiler services

## 2.4 `pkg.koshlang.com`

Responsibilities:

- package search
- package details
- versions
- README
- dependency/dependent metadata
- documentation links
- repository/license/security metadata
- owner/publisher information
- install command
- package compatibility
- deprecation/yanked-version states
- publishing/auth/account workflows when registry backend is implemented

## 2.5 `status.koshlang.com`

Track at minimum:

- main website
- documentation
- download CDN
- playground
- registry
- public APIs

---

# 3. Target Sitemap

## 3.1 Main website

```text
koshlang.com
├── /
├── /download
│   ├── /windows
│   ├── /macos
│   ├── /linux
│   └── /source
├── /install
├── /learn
├── /play
├── /examples
│   └── /[slug]
├── /packages
├── /tools
│   ├── /vscode
│   ├── /formatter
│   ├── /lsp
│   └── /debugger
├── /releases
│   └── /[version]
├── /roadmap
├── /blog
│   ├── /category/[slug]
│   ├── /tag/[slug]
│   └── /[slug]
├── /community
├── /contribute
├── /governance
├── /security
├── /about
├── /brand
├── /search
├── /privacy
├── /terms
├── /accessibility
├── /404
└── /500
```

## 3.2 Documentation

```text
docs.koshlang.com
├── /
├── /getting-started
│   ├── /introduction
│   ├── /installation
│   ├── /hello-world
│   ├── /first-project
│   └── /editor-setup
├── /learn
│   └── /...
├── /reference
│   └── /...
├── /std
│   └── /...
├── /cli
│   └── /...
├── /packages
│   └── /...
├── /compiler
│   └── /...
├── /tooling
│   └── /...
├── /guides
│   └── /...
├── /examples
│   └── /...
├── /internals
│   └── /...
├── /spec
│   └── /...
├── /contributing
├── /search
└── /[version]/...      # if explicit version-path strategy is selected
```

Version routing must be chosen deliberately. Do not mix incompatible patterns.

---

# 4. Homepage

## 4.1 Hero

Must contain:

- KoshLang wordmark/logo
- concise positioning statement
- one-sentence value proposition
- latest stable version/status from real release data
- primary CTA: **Download KoshLang**
- secondary CTA: **Try KoshLang**
- tertiary path to documentation
- code sample
- copy action
- run action only if a real execution path exists
- graceful unsupported/unavailable state otherwise

Suggested information hierarchy:

```text
KOSHLANG

Programming, thoughtfully designed.

A modern programming language built for
simplicity, performance, and productive development.

[ Download KoshLang ]   [ Try Online ]

KoshLang <current stable version>
```

Actual product claims must be approved KoshLang claims, not invented marketing copy.

## 4.2 Homepage sections

Implement complete sections for:

1. Hero
2. Live/static code demonstration
3. Why KoshLang
4. Language features
5. Interactive examples
6. Tooling
7. Package ecosystem
8. Cross-platform support
9. Architecture/performance
10. Learning resources
11. Community
12. Latest releases
13. Open-source contribution
14. Newsletter/update CTA only if a real subscription integration exists
15. Footer

Every section must be responsive, accessible, and CMS-driven where content editors should control it.

---

# 5. Navigation and Global UX

## 5.1 Main navigation

Desktop:

- Learn
- Docs
- Packages
- Playground
- Community
- Blog
- Download
- GitHub

Mobile:

- fully functional accessible drawer
- nested items
- escape-to-close
- focus management
- current route indication

## 5.2 Global controls

- theme toggle: light / dark / system
- search
- version indicator/select where relevant
- GitHub link configured from CMS/global settings
- download CTA
- keyboard-accessible menus
- skip-to-content link

## 5.3 Command/search experience

`Cmd/Ctrl + K` should open global search where appropriate.

Search categories:

- Docs
- Standard library
- CLI
- Examples
- Blog
- Releases
- Packages (when available)

No fake search UI. If multiple indexes are used, normalize them into one coherent result interface.

---

# 6. Downloads and Installation

## 6.1 Download intelligence

Detect likely client platform from browser capability/user-agent only as a convenience.

Never hide other platforms.

Support:

- Windows x86-64
- Windows ARM64
- macOS Apple Silicon
- macOS Intel if supported
- Linux x86-64
- Linux ARM64 if supported
- source release
- archive formats actually produced by release pipeline

## 6.2 Download page

Must include:

- latest stable
- beta/preview
- nightly
- LTS only if KoshLang officially supports it
- OS tabs/filters
- architecture
- filename
- file size
- SHA-256
- signature/provenance where available
- release date
- system requirements
- release notes
- previous releases
- source builds
- package-manager install methods
- troubleshooting
- verification instructions

Never generate a download link for an artifact that does not exist.

## 6.3 Installation

Support real methods only.

Potential methods, subject to actual KoshLang publishing:

- Homebrew
- WinGet
- Chocolatey
- Scoop
- APT
- DNF
- Pacman
- Snap
- Docker
- shell installer
- source

Each method must include:

- command
- prerequisites
- verification
- update
- uninstall
- PATH troubleshooting
- architecture notes

## 6.4 Toolchain manager

Reserve architecture for a `koshup`-style toolchain manager if/when officially implemented.

Do not publish commands as official until the tool exists.

---

# 7. Releases

## 7.1 Release archive

`/releases` must support:

- stable/beta/nightly filtering
- semantic version display
- publication date
- summary
- download availability
- pagination or efficient historical browsing
- canonical release URL

## 7.2 Release detail

Each release should support:

- overview
- highlights
- breaking changes
- compiler changes
- standard-library changes
- package-manager changes
- performance notes
- bug fixes
- known issues
- migration guide
- downloads
- checksums/signatures
- changelog link
- source commit/tag

## 7.3 Automated source

Preferred source of truth:

1. signed release manifest generated by CI
2. GitHub release metadata
3. CMS editorial augmentation

Do not manually duplicate machine-owned artifact metadata in CMS when it can drift.

---

# 8. Documentation UX

## 8.1 Layout

Desktop:

- left documentation navigation
- center article
- right on-page table of contents
- sticky header
- search
- version selector
- theme control

Tablet/mobile:

- collapsible docs navigation
- collapsible TOC
- readable content width
- no horizontal overflow except intentional code/table scroll regions

## 8.2 Documentation categories

### Getting Started

- Introduction
- Why KoshLang
- Installation
- Hello World
- First project
- Editor setup
- What next

### Learn KoshLang

The exact chapter list MUST reflect the canonical language specification. Potential structural slots include:

- variables
- constants
- data types
- operators
- control flow
- functions
- collections
- modules
- error handling
- generics
- concurrency
- async programming

Do not publish unsupported concepts merely because they appear in this planning document.

### Language Reference

Structure for formal semantics:

- lexical structure
- source encoding
- identifiers
- keywords
- literals
- comments
- whitespace
- types
- expressions
- statements
- declarations
- functions
- modules
- scope
- name resolution
- type system
- memory model
- concurrency model
- errors
- grammar
- EBNF/formal grammar when available

### Standard Library

Support generated/reference pages for actual modules/types/functions.

Potential information architecture:

- Core
- Filesystem
- Networking
- HTTP
- JSON
- Time
- Math
- Crypto
- Concurrency
- IO
- Process
- Testing

Only render real library modules.

### CLI

Document actual commands and flags.

### Compiler

- architecture
- compilation model
- diagnostics
- optimization
- targets
- build pipeline
- advanced configuration
- internals where public

### Tooling

- formatter
- LSP
- debugger
- editors
- integrations

### Guides

Task-oriented content distinct from formal reference.

### Internals / Specification

Developer/contributor-oriented content with stable anchors and version history.

---

# 9. Documentation Components

Create reusable MDX/content components:

- `<Note>`
- `<Tip>`
- `<Warning>`
- `<Caution>`
- `<Steps>`
- `<CodeGroup>`
- `<CodeBlock>`
- `<Terminal>`
- `<OSOnly>`
- `<VersionSince>`
- `<Deprecated>`
- `<ApiSignature>`
- `<ParameterTable>`
- `<ReturnValue>`
- `<Example>`
- `<Tabs>`
- `<Accordion>`
- `<Figure>`
- `<Video>`
- `<LinkCard>`
- `<RelatedDocs>`
- `<PackageInstall>`
- `<VersionBadge>`

Every component must:

- be keyboard accessible
- work in light/dark mode
- have consistent spacing/typography
- be usable on mobile
- preserve semantic HTML
- avoid layout shift where practical

---

# 10. Code Blocks

KoshLang code blocks should support where appropriate:

- filename
- language label
- syntax highlighting
- copy
- selected-line highlighting
- line numbers where beneficial
- output pairing
- Run
- Open in Playground
- version context
- accessible copy confirmation

Run/Open in Playground must use real playground integration or a truthful unavailable state.

---

# 11. Examples

`koshlang.com/examples`

Potential categories:

- Basics
- Data
- Files
- Networking
- Concurrency
- CLI
- Real Projects

Each example page must include:

- title
- objective
- prerequisite
- explanation
- source
- expected output if authoritative
- copy
- run if supported
- playground link if supported
- downloadable source/project if available
- GitHub source if available
- related docs
- SEO metadata

---

# 12. Playground

## 12.1 Frontend

Use Monaco Editor unless bundle/performance analysis justifies a lighter editor.

Required UX:

- source editor
- output
- diagnostics
- Run
- Format
- Reset
- Copy
- Share
- Examples
- keyboard shortcuts
- responsive layout
- execution status
- version
- execution duration when real
- stdin when supported

## 12.2 Backend

Arbitrary code MUST NOT execute in the normal website process.

Use isolated workers/containers/microVMs with:

- strict CPU quotas
- memory quotas
- wall-clock timeout
- process limits
- filesystem isolation
- network disabled by default
- no host credentials
- read-only base filesystem where possible
- per-request ephemeral workspace
- output size limits
- abuse/rate controls
- audit/observability without retaining private code unnecessarily

## 12.3 Advanced views

Only when compiler APIs support them:

- AST
- IR
- LLVM IR / bytecode
- assembly
- diagnostics
- optimization views

Do not simulate these outputs.

---

# 13. Packages / Registry

## 13.1 Discovery

Package listing/search must support:

- query
- sorting
- categories/tags
- verified status
- compatibility
- latest version
- updated date
- deprecated/yanked state

## 13.2 Package page

- package name
- version
- summary
- install command
- README
- versions
- dependencies
- dependents
- download metrics if real
- license
- repository
- docs
- security
- owners
- publisher verification
- compatibility
- package size if known
- provenance

## 13.3 Security architecture

Plan for:

- account 2FA
- scoped publish tokens
- verified publishers
- signatures/provenance
- malware scanning
- dependency auditing
- typosquatting checks
- advisories
- reserved names
- ownership transfer
- deprecation
- version yanking
- audit logs
- rate limits

---

# 14. Editor and Tooling Support

Tooling page should support actual integrations.

Potential editors:

- VS Code
- JetBrains
- Neovim
- Vim
- Emacs
- Zed
- Sublime Text
- Visual Studio

Prefer an LSP architecture such as `kosh-lsp` for shared intelligence.

Potential LSP capabilities:

- syntax highlighting
- completion
- diagnostics
- definition
- references
- rename
- hover
- signature help
- formatting
- code actions
- semantic highlighting

Only advertise implemented capabilities.

---

# 15. Blog

CMS-managed.

Categories:

- Announcements
- Releases
- Language Design
- Compiler
- Performance
- Community
- Tutorials
- Case Studies

Features:

- authors
- categories
- tags
- hero/OG image
- code blocks
- table of contents
- related posts
- RSS/Atom
- social metadata
- canonical URL
- publish/update dates
- author profile where appropriate
- archive/category/tag pages
- search integration

---

# 16. Roadmap

CMS-managed or synced from a canonical roadmap source.

Sections:

- Language
- Compiler
- Tooling
- Ecosystem
- Documentation
- Infrastructure

Statuses should be explicit and configurable:

- planned
- exploring
- in progress
- beta
- shipped
- paused
- cancelled

Avoid promising dates that are not authoritative.

---

# 17. Community, Governance, Contribution, Security

Pages:

- Community
- Contribute
- Governance
- RFC Process
- Code of Conduct
- Security Policy
- Contributors
- Community Projects
- Events

External links must be configured centrally and validated.

Security page must include a real vulnerability-reporting path before public launch.

---

# 18. Design Direction

## 18.1 Personality

KoshLang should feel:

- modern
- technical
- calm
- precise
- confident
- code-first
- highly legible

Avoid:

- generic SaaS visual language
- excessive gradients
- excessive neon
- cyberpunk styling
- visual clutter
- decorative animations that slow reading
- copying the visual identity of another programming language

## 18.2 Visual system

Use:

- generous whitespace
- strong grid
- excellent typography
- restrained borders
- intentional elevation
- subtle motion
- distinctive single primary brand accent
- polished code blocks
- strong dark mode

Initial neutral tokens may use:

```text
Light background  #FAFAFA
Light surface     #FFFFFF
Primary text      #101114
Secondary text    #64676D
Border            #E7E7E9

Dark background   #0B0C0E
Dark surface      #111317
Dark text         #F3F4F6
Dark muted        #A1A5AD
```

Brand/accent color must be centralized as tokens and finalized with brand identity.

## 18.3 Typography

Use separate UI and monospace font families.

Possible UI:
- Geist
- Inter

Possible code:
- Geist Mono
- JetBrains Mono
- IBM Plex Mono

Use locally/legal webfont delivery or trusted hosting with performance-conscious loading.

---

# 19. Shared Design System

Package:

```text
packages/ui
```

Core components:

- Button
- IconButton
- LinkButton
- Tabs
- Dropdown
- Navigation
- MobileNav
- Sidebar
- Breadcrumb
- Search
- CommandPalette
- Card
- Badge
- Tooltip
- Popover
- Dialog
- Drawer
- Toast
- Alert
- Callout
- CodeBlock
- Terminal
- CopyButton
- VersionSelector
- Steps
- Table
- DataTable
- Pagination
- TableOfContents
- EmptyState
- ErrorState
- Skeleton
- Spinner/Progress
- OSSelector
- ArchitectureSelector
- DownloadCard
- ReleaseCard
- PackageCard
- ArticleCard

All components require:

- TypeScript types
- accessibility
- keyboard behavior
- focus states
- reduced-motion handling
- responsive behavior
- light/dark tokens
- test coverage for important interactions

---

# 20. Recommended Technology Stack

## 20.1 Monorepo

- pnpm
- Turborepo
- TypeScript

## 20.2 Web applications

- Next.js App Router
- React
- Tailwind CSS
- Radix primitives where useful
- Motion for restrained animation
- Lucide plus custom KoshLang icons
- Shiki for syntax highlighting
- Monaco for playground/editor
- PostgreSQL
- Drizzle where an application-owned DB layer is needed

## 20.3 Documentation

Recommended baseline:

- Next.js
- Fumadocs or an equivalent composable docs layer
- MDX for developer-owned canonical docs
- Shiki
- Pagefind initially where static indexing fits
- use a stronger search service later only when scale/requirements justify it

Documentation architecture must support content versioning and generated API/reference data.

---

# 21. CMS — Payload CMS

## 21.1 Decision

Use **Payload CMS** as the default content-management system.

Reasons for this project:

- TypeScript/code-first configuration
- integrates naturally into a Next.js/TypeScript ecosystem
- self-hostable
- PostgreSQL support
- admin UI
- drafts/versions
- access control
- localization
- preview/live-preview capability
- extensible content modeling
- API access
- reduces the number of unrelated runtimes in the monorepo

Strapi remains a valid alternative if organizational needs later demand it, but do not run both CMSs.

## 21.2 CMS responsibility boundary

CMS SHOULD manage:

- homepage/editorial blocks
- feature descriptions
- marketing pages
- About
- Community
- Contribute
- Governance
- Security page editorial copy
- Roadmap
- Blog
- authors
- announcements
- external/community links
- SEO overrides
- navigation labels/selected links where safe
- redirects
- release editorial notes
- documentation editorial pages that are intentionally CMS-owned
- site banners

CMS SHOULD NOT be the sole source for:

- compiler-generated API references
- package registry records
- binary checksums
- signed release artifacts
- package dependency graphs
- real execution results

Those must come from their authoritative systems.

## 21.3 Collections

Implement at minimum:

### Users
Fields:
- name
- email
- role
- avatar
- status
- lastLogin where appropriate

Roles:
- super-admin
- admin
- editor
- author
- reviewer
- SEO-editor

### Pages
- title
- slug
- status
- page type
- structured page-builder blocks
- excerpt
- SEO
- canonical override
- redirects from old slugs
- locale
- publish date
- updated date

### BlogPosts
- title
- slug
- excerpt
- body
- authors
- category
- tags
- cover image
- OG override
- SEO
- publishedAt
- updatedAt
- related content

### Authors
- name
- slug
- bio
- avatar
- links

### Categories
### Tags
### Announcements
### RoadmapItems
### ReleasesEditorial
### CommunityLinks
### Navigation
### Redirects
### Media

Potential:
### DocsEditorial
for CMS-owned guides only.

## 21.4 Globals

- SiteSettings
- BrandSettings
- SEOSettings
- Footer
- Header
- SocialLinks
- DownloadSettings
- DocumentationSettings
- FeatureFlags
- AlertBanner

## 21.5 Page builder blocks

Create reusable, typed blocks:

- Hero
- RichText
- FeatureGrid
- CodeDemo
- Stats
- LogoCloud
- LinkCards
- CTA
- Quote
- FAQ
- Timeline
- ReleaseHighlight
- DownloadCTA
- ToolingGrid
- CommunityGrid
- RoadmapPreview
- BlogPreview
- DocsPreview
- MediaText
- Callout

Do not make page building so unconstrained that editors can destroy design consistency.

## 21.6 Editorial workflow

Support:

Draft → Review → Publish

Where Payload capabilities and project workflow allow, include:

- autosave
- versions
- preview/live preview
- scheduled publishing if implemented
- revision history
- role-based permissions

## 21.7 CMS preview

Editors should preview the target website page before publishing.

Preview must:

- use draft content securely
- require authorization
- not leak draft URLs into indexes
- add `noindex` to preview environments
- work for relevant page types

---

# 22. Expert-Level SEO Architecture

SEO is a first-class system and has automated acceptance criteria.

## 22.1 Technical SEO

Implement:

- server-rendered/static HTML where appropriate
- unique title for every indexable page
- unique meta description
- canonical URL
- robots directives
- XML sitemaps
- sitemap index if scale requires
- image metadata
- Open Graph
- X/Twitter card metadata
- hreflang when localization is active
- correct HTTP status codes
- 301/308 redirects for permanent URL changes
- useful 404
- no soft-404 behavior
- trailing-slash policy applied consistently
- lowercase/stable slugs
- pagination/indexing strategy
- no accidental indexing of admin, preview, internal API, search-result or duplicate pages
- alternate/canonical strategy for versioned docs
- content update dates where meaningful

## 22.2 Next.js metadata

Create a shared SEO utility that generates:

- title
- title template
- description
- metadataBase
- canonical
- alternates
- robots
- Open Graph
- X/Twitter
- icons
- app links only if relevant

Do not manually duplicate metadata logic across routes.

## 22.3 Structured data / JSON-LD

Use JSON-LD only when schema accurately describes visible page content.

Potential types where appropriate:

- Organization
- WebSite
- WebPage
- TechArticle
- Article
- BreadcrumbList
- SoftwareApplication
- FAQPage only where policy/eligibility and visible content make it appropriate
- Person for author profiles where useful
- SoftwareSourceCode where appropriate

Validate structured data.

Do not add irrelevant schema merely to chase rich results.

## 22.4 Documentation SEO

Docs require:

- stable slugs
- canonical version rules
- previous-version discoverability
- latest-version canonical policy defined carefully
- breadcrumbs
- internal cross-links
- descriptive headings
- anchor IDs
- indexable static content
- code samples that do not hide core explanation
- generated sitemap entries
- update date
- proper deprecated/version banners

## 22.5 Blog SEO

- author
- publish date
- modified date
- category
- tags
- Article/TechArticle structured data where appropriate
- OG image
- canonical
- related posts
- RSS
- no thin tag/category pages

## 22.6 SEO content model

Each CMS indexable item should support:

```text
seo.title
seo.description
seo.canonicalUrlOverride
seo.noIndex
seo.noFollow
seo.ogTitle
seo.ogDescription
seo.ogImage
seo.twitterTitle
seo.twitterDescription
seo.twitterImage
seo.schemaOverrides (restricted / validated)
```

Default values should be generated intelligently so editors are not forced to fill every field.

## 22.7 Dynamic OG images

Create branded templates for:

- homepage
- docs
- blog
- releases
- examples
- packages

Avoid expensive runtime generation when static/build-time generation is sufficient.

## 22.8 Sitemap strategy

Generate separate sitemaps when useful:

- main
- docs
- blog
- releases
- examples
- packages

Exclude:

- preview pages
- drafts
- admin
- internal APIs
- auth callbacks
- intentionally noindex pages
- invalid/deprecated duplicates

## 22.9 Robots

Production:
- permit intended public routes
- point to sitemap(s)

Preview/staging:
- noindex
- preferably authentication
- do not rely only on `robots.txt` to protect private environments

## 22.10 Redirect management

CMS-managed Redirects collection:

- source
- destination
- status (301/308; temporary only when justified)
- note/reason
- created date

Add automated checks for loops and chains.

## 22.11 SEO quality gates

CI should fail or warn based on severity for:

- missing title
- duplicate title
- missing description on important pages
- invalid canonical
- orphaned important routes
- broken internal links
- missing alt text
- invalid structured data syntax
- accidental `noindex`
- missing sitemap route
- redirect loop
- malformed heading hierarchy
- indexable empty/thin pages

Run Lighthouse and dedicated crawl/link checks in CI or scheduled QA.

---

# 23. Accessibility

Target WCAG 2.2 AA where reasonably applicable.

Required:

- semantic HTML
- keyboard navigation
- visible focus
- skip links
- proper labels
- correct form errors
- accessible dialogs
- focus trapping/return
- screen-reader announcements for important dynamic status
- contrast compliance
- reduced motion
- no interaction requiring only pointer hover
- code-copy feedback
- accessible tables
- descriptive link text
- alt text policy
- responsive zoom
- touch target sizing

Automate with axe where possible and supplement with manual keyboard/screen-reader checks.

---

# 24. Performance and Core Web Vitals

Targets should be ambitious but evidence-driven.

Principles:

- minimize client JavaScript
- server components by default where beneficial
- lazy-load Monaco and other heavy playground dependencies
- optimize fonts
- responsive images
- immutable CDN caching for assets
- CMS content cache/revalidation
- static generation for stable content
- streaming only where useful
- avoid hydration for static documentation
- bundle analysis
- no large animation libraries on pages that do not use them

Monitor:

- LCP
- INP
- CLS
- TTFB
- bundle size

---

# 25. Analytics

Use privacy-conscious analytics.

Track product signals such as:

- download OS
- architecture
- install → download conversion
- docs search
- zero-result docs search
- docs page popularity
- broken/404 docs navigation
- playground run success/failure
- package searches
- outbound editor/tool clicks
- release downloads

Do not record sensitive source code from playground telemetry.

Potential providers:
- PostHog
- Plausible
- Umami

Pick one; do not ship multiple overlapping analytics SDKs without reason.

Cookie consent must match actual legal/analytics behavior.

---

# 26. Security

## 26.1 Website/CMS

- CSP
- HSTS
- secure cookies
- CSRF protection
- XSS-safe rendering
- sanitization for CMS rich content
- rate limiting
- secret scanning
- dependency scanning
- SAST
- protected admin
- MFA where supported
- least privilege
- audit logging for high-risk CMS actions
- backup/restore testing

## 26.2 Downloads

- SHA-256
- cryptographic signatures when supported
- SBOM
- provenance
- reproducible builds as a future/advanced goal
- secure artifact storage
- immutable release artifacts after publishing

## 26.3 Package registry

See package security section.

## 26.4 Playground

See sandbox section. It is a high-risk subsystem and must undergo threat modeling before public execution is enabled.

---

# 27. Infrastructure

Suggested logical architecture:

```text
Cloudflare
    │
    ├── koshlang.com
    │      └── Next.js web
    │
    ├── docs.koshlang.com
    │      └── Next.js/static docs
    │
    ├── play.koshlang.com
    │      ├── Next.js frontend
    │      └── isolated execution API/workers
    │
    ├── pkg.koshlang.com
    │      ├── registry frontend
    │      ├── registry API
    │      ├── PostgreSQL
    │      └── object storage
    │
    └── status.koshlang.com
```

Payload CMS:
- deploy as part of an appropriate Next.js app/service or as its own deployment boundary
- PostgreSQL
- object storage for media
- restricted admin route
- backups

Downloads/object storage:
- Cloudflare R2 or equivalent S3-compatible object storage
- CDN
- signed/immutable artifact strategy

---

# 28. Release Automation

Target pipeline:

```text
Git tag
  ↓
CI
  ↓
Build matrix
  ├─ Windows x64
  ├─ Windows ARM64
  ├─ macOS x64
  ├─ macOS ARM64
  ├─ Linux x64
  └─ Linux ARM64
  ↓
Tests
  ↓
Sign
  ↓
Generate checksums + manifest + provenance/SBOM
  ↓
GitHub Release
  ↓
Object storage/CDN
  ↓
Website release ingestion/revalidation
  ↓
Package manager publishing where supported
```

The exact matrix must reflect compiler support.

---

# 29. Documentation Build Automation

Target flow:

```text
Compiler/release source
  ↓
Generate API / standard-library reference
  ↓
Merge with authored docs
  ↓
Build versioned docs
  ↓
Search index
  ↓
SEO/sitemap generation
  ↓
Broken-link validation
  ↓
Deploy
```

Support offline docs later:

- offline HTML
- downloadable archive
- EPUB
- PDF/manual if intentionally maintained

Potential CLI entry such as `kosh doc` should only be documented after implementation.

---

# 30. Repository Architecture

```text
koshlang-web/
├── apps/
│   ├── web/
│   ├── docs/
│   ├── playground/
│   ├── registry/
│   └── cms/                 # if Payload is deployed separately
├── packages/
│   ├── ui/
│   ├── icons/
│   ├── config/
│   ├── seo/
│   ├── analytics/
│   ├── markdown/
│   ├── content/
│   ├── compiler-client/
│   ├── release-client/
│   ├── registry-client/
│   └── test-utils/
├── tooling/
│   ├── eslint/
│   ├── typescript/
│   ├── tailwind/
│   ├── scripts/
│   └── ci/
├── docs/
│   ├── architecture/
│   ├── adr/
│   ├── runbooks/
│   └── contributing/
├── .github/
│   └── workflows/
├── turbo.json
├── pnpm-workspace.yaml
└── package.json
```

If Payload runs inside `apps/web`, omit `apps/cms` and keep the boundary clear.

---

# 31. Environment Configuration

Provide `.env.example` files containing keys only, never secrets.

Define environments:

- local
- test
- preview/staging
- production

Centralize:

- public URLs
- CMS URL
- DB URL
- storage
- GitHub/release API details
- analytics
- search
- playground API
- registry API
- feature flags

Validate env variables at startup.

---

# 32. Testing Strategy

## 32.1 Unit

Test:

- SEO generators
- URL builders
- release parsing
- CMS mappers
- utility functions
- markdown transforms
- schema validation

## 32.2 Component

Test:

- navigation
- search
- dialogs
- forms
- downloads
- tabs
- copy
- version selector
- theme controls
- docs components

## 32.3 Integration

- CMS fetch/draft/publish
- release ingestion
- search indexing
- redirect resolution
- playground API boundary
- package API boundary

## 32.4 End-to-end

Use Playwright.

Critical journeys:

1. Homepage → Download → correct OS artifact
2. Homepage → Docs → search → article
3. Docs → copy code
4. Docs → version change
5. Homepage → Playground → run → result, when backend exists
6. Examples → playground
7. Releases → release detail → artifact
8. Blog → article
9. Package search → package page
10. CMS editor draft → preview → publish
11. mobile navigation
12. theme persistence
13. 404 and redirect behavior

## 32.5 Accessibility

- axe automated checks
- keyboard E2E
- focus management
- contrast checks
- reduced-motion test

## 32.6 SEO

Automated:

- metadata
- canonicals
- sitemap
- robots
- JSON-LD serialization
- broken links
- redirect loops
- status codes

---

# 33. Observability

Implement:

- structured logs
- error reporting
- request correlation for APIs
- uptime monitoring
- playground/registry service metrics
- download availability checks
- release-ingestion alerts
- CMS health checks

Never expose secrets/source code in logs.

---

# 34. Content Quality Rules

No lorem ipsum in production.

No generic AI filler.

No unsupported claims.

No fake testimonials.

No fake companies/users/download counts.

No made-up benchmarks.

No made-up release dates.

No invented command syntax.

All public claims should come from:

- KoshLang maintainers
- canonical language spec
- compiler/source repository
- signed release metadata
- approved CMS content

---

# 35. Empty, Loading, Error, and Unreleased States

Every data-driven surface must intentionally implement:

- loading
- empty
- error
- success
- stale/offline where relevant
- unauthorized where relevant

Examples:

### No releases yet
Explain that no public release is available. Offer docs/source/notification paths only if real.

### Registry not launched
Provide a polished registry-launch information page; do not show fake packages.

### Playground unavailable
Keep editor/demo educational if useful, but disable execution with a clear reason; do not fabricate output.

### Search zero results
Show query, suggestions, categories, and useful navigation.

---

# 36. Admin/CMS UX

Provide editors with:

- dashboard
- recent drafts
- scheduled/pending review where implemented
- media library
- page management
- blog
- roadmap
- announcements
- redirects
- SEO fields
- preview
- role-appropriate permissions

Protect technical/system-owned fields from casual editing.

---

# 37. Definition of Done for Every Page

A page is NOT done merely because it renders.

A page is done only when:

- desktop complete
- tablet complete
- mobile complete
- light mode complete
- dark mode complete
- keyboard navigation complete
- loading/empty/error states complete if data-driven
- SEO metadata complete
- canonical defined
- OG/social metadata complete where indexable
- structured data added where appropriate
- accessibility tested
- links functional
- buttons functional
- analytics events added only where useful
- content sourced correctly
- CMS wiring complete where applicable
- no placeholders/TODOs
- tests pass
- no console errors
- no obvious layout shift
- no broken links
- no fake functionality

---

# 38. Repository-Wide Dead-UI Audit

Before declaring a phase finished, search for and resolve:

```text
href="#"
javascript:void(0)
TODO
FIXME
placeholder
coming soon
dummy
mock
lorem
console.log
throw new Error("Not implemented")
onClick={() => {}}
```

Not every occurrence is automatically invalid (e.g. test fixtures), but every production occurrence must be justified.

Also programmatically crawl all public routes and verify:

- status code
- canonical
- title
- description
- internal links
- no dead CTAs
- no orphaned required pages

---

# 39. Implementation Phases

Phases are organizational. The final product target includes the entire specification.

## Phase 1 — Foundation

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

## Phase 2 — Main Website

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

## Phase 3 — Download / Install / Releases

- real release source integration
- OS detection
- downloads
- install
- releases
- checksums
- release detail
- historical versions
- no fake artifacts

## Phase 4 — Docs Foundation

- docs app
- navigation
- TOC
- search
- versioning
- MDX components
- syntax highlighting
- SEO
- docs content pipeline

## Phase 5 — Learning Documentation

- Getting Started
- Learn
- editor setup
- guides
- content only from canonical language sources

## Phase 6 — Reference

- language reference
- standard library
- CLI
- compiler
- tooling
- generated reference pipeline

## Phase 7 — Examples

- example index
- example details
- code actions
- downloadable examples where real
- playground links

## Phase 8 — Playground Frontend

- editor
- output/diagnostics layout
- examples
- theme
- version UI
- share UX
- no fake execution

## Phase 9 — Playground Sandbox

- execution API
- isolation
- quotas
- abuse protection
- rate limits
- observability
- E2E

## Phase 10 — Blog / Roadmap / Editorial

- CMS-powered blog
- authors/categories/tags
- roadmap
- announcements
- RSS
- structured data

## Phase 11 — Tooling Pages

- VS Code
- LSP
- formatter
- debugger
- other editor integrations based on real capabilities

## Phase 12 — Package Registry

- frontend
- API
- package metadata
- search
- publisher/account model
- security
- publishing
- storage

## Phase 13 — Release and Docs Automation

- compiler release ingestion
- generated docs
- versioned deployment
- artifacts
- package-manager hooks

## Phase 14 — Production Hardening

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

---

# 40. Codex Working Rules

Codex must:

1. Read this entire document before implementation.
2. Inspect the existing repository before making architectural assumptions.
3. Preserve working functionality unless a change is required.
4. Prefer production-quality implementation over visual stubs.
5. Work feature-by-feature end-to-end.
6. Add tests with implementation.
7. Run lint/typecheck/tests after material changes.
8. Use real source-of-truth data.
9. Never invent KoshLang technical facts.
10. Never hide unfinished functionality behind attractive UI.
11. Never leave dead controls.
12. Never silently swallow errors.
13. Build responsive/accessibility states at the same time as desktop UI.
14. Update documentation and `.env.example`.
15. Create ADRs for material architectural decisions.
16. Keep CMS and machine-owned data boundaries explicit.
17. Keep SEO requirements in the definition of done.
18. Complete the current feature before starting unrelated polish.

---

# 41. Acceptance Checklist

## Architecture
- [ ] Monorepo established
- [ ] Shared UI
- [ ] Shared SEO
- [ ] Shared config
- [ ] Environment validation
- [ ] CMS connected
- [ ] PostgreSQL configured
- [ ] Object storage abstraction
- [ ] CI

## Website
- [ ] Homepage
- [ ] Download
- [ ] Install
- [ ] Learn
- [ ] Examples
- [ ] Tools
- [ ] Releases
- [ ] Roadmap
- [ ] Blog
- [ ] Community
- [ ] Contribute
- [ ] Governance
- [ ] Security
- [ ] About
- [ ] Brand
- [ ] Legal/accessibility
- [ ] Search

## Docs
- [ ] Getting Started
- [ ] Learn
- [ ] Reference
- [ ] Standard Library
- [ ] CLI
- [ ] Packages
- [ ] Compiler
- [ ] Tooling
- [ ] Guides
- [ ] Examples
- [ ] Internals
- [ ] Specification
- [ ] Contributing
- [ ] Search
- [ ] Versioning

## CMS
- [ ] Roles
- [ ] Pages
- [ ] Blog posts
- [ ] Authors
- [ ] Categories
- [ ] Tags
- [ ] Announcements
- [ ] Roadmap
- [ ] Navigation
- [ ] Redirects
- [ ] Media
- [ ] SEO settings
- [ ] Preview
- [ ] Draft/version workflow

## SEO
- [ ] metadata
- [ ] canonical
- [ ] OG
- [ ] X/Twitter metadata
- [ ] JSON-LD
- [ ] sitemaps
- [ ] robots
- [ ] redirects
- [ ] hreflang if localized
- [ ] RSS
- [ ] structured-data tests
- [ ] broken-link crawl
- [ ] SEO CI checks

## Quality
- [ ] Responsive
- [ ] Light mode
- [ ] Dark mode
- [ ] WCAG target
- [ ] keyboard
- [ ] reduced motion
- [ ] E2E
- [ ] no dead buttons
- [ ] no empty routes
- [ ] no placeholders
- [ ] no fake data
- [ ] no console errors
- [ ] production build passes

---

# 42. Final Product Standard

KoshLang web development is complete only when the ecosystem feels like one coherent developer product:

```text
                    KOSHLANG
                       │
        ┌──────────────┴──────────────┐
        │                             │
   koshlang.com                docs.koshlang.com
        │                             │
 Discover / Download            Learn / Reference
        │                             │
        ├────────────┬────────────────┤
        │            │                │
        ▼            ▼                ▼
    Playground    Packages          Tools
        │            │                │
        └────────────┴────────────────┘
                     │
                  Compiler
                     │
                Kosh Ecosystem
```

The quality bar is a serious programming-language ecosystem: coherent, fast, searchable, accessible, secure, version-aware, thoroughly documented, CMS-manageable, SEO-strong, and free of dead or deceptive UI.

**No route, button, control, or advertised feature should exist merely for appearance.**
