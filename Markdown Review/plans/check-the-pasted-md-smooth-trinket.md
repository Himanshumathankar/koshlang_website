# KoshLang Developer Platform — Build Plan

## Context

The pasted brief (`src/imports/pasted_text/koshlang-design-prompt.md`) is a 58-section
specification for the complete design ecosystem of "KoshLang," a fictional new-generation
programming language: marketing site, docs, playground, package registry, downloads/releases,
blog, roadmap, community, governance, security, status, plus a full design system, all states,
and responsive variants.

The brief is written for **Figma** ("create Figma variables," "use Auto Layout," "build
prototypes"). This project is **React 19 + Vite + Tailwind v4** inside Figma Make, so we
produce the working product, not a Figma file. The translation is direct and loses nothing
essential:

| Brief asks for (Figma) | We build (code) |
|---|---|
| Variables / semantic tokens | CSS custom properties in `theme.css` + Tailwind `@theme` mappings |
| Light/Dark themes | `:root` / `.dark` token blocks + a theme provider (Light/Dark/System) |
| Components, variants, states | React components with prop-driven variants + real interaction states |
| Auto Layout / constraints | Flexbox + CSS Grid, responsive utilities |
| Prototypes / journeys | Real client-side routing between real pages |
| Developer handoff | A live `/brand` + `/handoff` reference page documenting tokens & components |

**The genuine tool limitation** (per the brief's §55): the language, compiler, registry, and
playground execution do not exist. So the playground/registry/releases are designed as the
*complete future experience* driven by clearly-labeled **local sample data** and a **simulated**
run/compile engine — never invented benchmark numbers, download counts, or fake published
packages presented as real. Unreleased services show honest "not yet available" states.

Scope is genuinely large. This plan builds the **entire surface architecture** — every screen,
state, and component listed in the brief exists and is reachable — with full craft depth on the
four flagship surfaces (Homepage, Documentation, Playground, Packages) and complete-but-leaner
treatment on secondary pages. Nothing from the brief's screen list (§53) is omitted.

## Aesthetic direction (committed)

Stance: **minimalist / technical precision** — "quiet confidence + powerful tooling." Generous
whitespace, strong grid, hairline borders, subtle depth, restrained motion that communicates
*state* not decoration. Code surfaces are treated as first-class visual objects.

- **Ground:** cool near-white (`#FBFCFD`-ish) in light; deep desaturated ink (`#0B0D10`-ish) in
  dark. Dark mode is designed intentionally, not inverted. Code contrast held to AA+.
- **Accent:** a single restrained **amber/gold signal** (`~#C98A2B`), used sparingly for primary
  actions, active states, and the run indicator — deliberately *not* the generic dev-tool blue.
- **Fonts (public Google Fonts, Vite `@import` in `index.css`):**
  - UI/product: **Hanken Grotesk** (high-legibility modern grotesk, not a trained default).
  - Code/terminal + wordmark: **JetBrains Mono** — reinforces "code is the identity."
- **Icons:** a small custom line-icon set (consistent 1.5px stroke, 24px grid) for KoshLang-specific
  glyphs (kosh file, compiler, package, module, terminal, docs, playground, version) plus generic
  UI icons drawn in the same system. No emoji as product iconography.
- **Syntax palette:** dedicated `code/keyword|string|function|type|comment|number|operator` tokens
  for both themes, applied by a lightweight `.kosh` tokenizer.

## Foundation

Create `src/styles/theme.css` (imported by `index.css`) holding the full semantic token set from
brief §6 mapped to the schema the aesthetic skill expects (`--background`, `--foreground`, `--card`,
`--primary`, `--muted`, `--accent`, `--border`, `--ring`, `--radius`, …) **plus** KoshLang-specific
namespaces: `--surface-code`, `--text-tertiary`, `--border-strong`, `--status-{success,warning,error,info}`,
and `--code-*`. Provide matching `.dark` block. Wire spacing scale (4→128) and type scale
(Display XL → Terminal, §7) as Tailwind `@theme` tokens / utility classes.

- `src/index.css` — Google Font `@import`s first, then `@import './styles/theme.css'`, then
  `@import 'tailwindcss'`, then base element defaults. (Import ordering matters for the build.)

## Architecture

Install `react-router`. Convert the entrypoint to Data-mode routing.

- `src/App.tsx` — `RouterProvider` + `ThemeProvider` (Light/Dark/System, persisted, respects
  `prefers-color-scheme`) + global `CommandPaletteProvider` (⌘K / Ctrl-K).
- `src/routes.tsx` — `createBrowserRouter`. Two shells to convey the multi-subdomain coherence:
  - **SiteShell** (global header + footer) for koshlang.com surfaces.
  - **DocsShell** (docs header + collapsible sidebar + on-this-page TOC) for docs.koshlang.com.
  - Playground and package/docs subsurfaces reuse the appropriate shell; a shared header keeps
    the ecosystem visually unified across the four "domains."

### Shared component library — `src/components/ui/`
Core (variants + Default/Hover/Pressed/Focus/Disabled/Loading/Selected/Error where applicable):
Button, IconButton, Link, Tabs, SegmentedControl, Dropdown, Select, Checkbox, Radio, Switch,
Input, Textarea, SearchInput, Tooltip, Popover, Dialog, Drawer, Toast, Alert, Badge, Tag, Avatar,
Breadcrumb, Pagination, Skeleton, Spinner, Progress, EmptyState, ErrorState, CommandPalette.

### Developer components — `src/components/dev/`
CodeBlock (with `.kosh` syntax highlighting), Terminal, CopyButton, RunButton, FileTab, OutputPanel,
DiagnosticsPanel, VersionSelector, OSSelector, ArchSelector, InstallCommand, DownloadCard,
ReleaseCard, PackageCard, ApiSignature, ParameterTable, CliCommand, KeyboardShortcut, Callout
(Note/Tip/Warning/Caution), Steps, CodeGroup.

### Sample data & simulation — `src/data/`
Typed, clearly-labeled placeholder data: docs tree, std-lib symbols, CLI commands, examples,
sample packages, releases, blog posts, roadmap items, RFCs. `src/lib/koshRunner.ts` — a *simulated*
compile/run engine driving playground states (deterministic, honest, no real execution).
`src/lib/highlight.ts` — the `.kosh` tokenizer. Version tokens are placeholders (e.g. `1.4 Stable`),
never claimed as a real release.

## Screens (all of brief §53 — grouped)

**Marketing (`src/pages/site/`)**
- Homepage — full IA §13: hero + interactive code hero (flagship motif), Why KoshLang, principles,
  code examples, tooling, package ecosystem, cross-platform, compiler/architecture, performance
  (labeled illustrative, no invented numbers), learning, docs preview, community, latest releases,
  contribution, final CTA, footer. Varied section rhythm — not repeated card grids.
- Download (recommended-for-your-system + other platforms + arch options + artifact details:
  filename/format/size/SHA-256/signature/date, verification instructions).
- Installation (OS tabs × methods: recommended/pkg-manager/installer/archive/source; each with
  command, copy, prerequisites, verify, update, uninstall, PATH troubleshooting — not buried).
- Releases index (Stable/Beta/Nightly/All filters) + Release detail (all §16 sections).
- Examples index (categories) + Example detail (run/copy/open-in-playground/download/source).
- Tools index + Tool detail (VS Code, LSP, formatter, debugger; screenshot/capabilities/setup/config/troubleshooting).
- Blog index (categories) + Blog article (TOC, code, related, share).
- Roadmap (§32 sections × statuses — not a generic kanban), Community, Contribute, Governance + RFCs,
  Security center, About, Brand (doubles as design-system showcase), Status page, Global search.

**Documentation (`src/pages/docs/`)** — DocsShell (sidebar + article + TOC).
- Docs home, Article template (breadcrumb/version-status/title/summary/last-updated/anchors/callouts/
  api tables/tabs/OS-variants/related/edit/report/prev-next), Std-lib index + symbol page, CLI reference,
  Compiler docs, Docs search overlay, old-version-viewing banner state.

**Playground (`src/pages/play/`)** — dedicated editor environment (editor/output/diagnostics/stdin/
examples/version/Run/Format/Reset/Copy/Share/settings/shortcuts/fullscreen). All §25 states:
idle/compiling/running/success/compile-error/runtime-error/timeout/unavailable/unsupported/rate-limited/
connection-failure — communicated with icon+text, not color alone. Advanced view: SOURCE | AST | IR |
LLVM IR | ASSEMBLY split panes (§24).

**Packages (`src/pages/pkg/`)** — Registry home, search (filters + facets), package detail
(README/Versions/Dependencies/Dependents/Security tabs + sidebar), and deprecated/yanked/advisory/
unverified + honest "registry not publicly available yet" empty state.

**System states (`src/pages/status/`)** — 404, 500, offline, and a states gallery covering
empty/loading(skeletons)/error/unavailable per brief §43–45.

## Responsive
Every shell and flagship screen adapts at ~1440/1280/768/390 intent. Mobile gets a real designed
nav (drawer, not a squeezed list), docs collapse to Header→Article→[Navigation]/[On this page]
drawers, and mobile playground/packages/download variants. Breakpoint(s) around ~768 and ~1024.

## Accessibility
Visible focus rings (`--ring`), keyboard nav for palette/tabs/menus/search, skip-link, accessible
dialogs (focus trap + `Esc`), non-color status indicators, AA contrast, logical heading order,
reduced-motion honored.

## Handoff
`/brand` (+ `/handoff`) renders the live design system: token swatches (light/dark), type scale,
spacing, icon set, and every component with its states — the code equivalent of the brief's
Foundations + Developer Handoff pages.

## Verification
- `pnpm build` (or the configured build) must pass — the largest risk is CSS `@import` ordering and
  Tailwind v4 token wiring; verify once after foundation is in place.
- Manually exercise in the preview: theme toggle (Light/Dark/System) across pages; ⌘K command
  palette + docs search (nav, zero-results, esc); playground Run cycling through success/compile-error/
  runtime-error/timeout; download OS/arch selection + copy buttons; docs sidebar expand/active/TOC;
  package tabs + honest empty state; 404 route; mobile drawer nav and mobile docs/playground.
- Confirm no invented metrics/versions/packages are presented as real; unreleased services show
  honest unavailable states.

## Post-build type-check fix (current task)

`pnpm build` passes (esbuild does not type-check), but `npx tsc --noEmit` reports 8
errors, all from one root cause: `ButtonAsLink` in `src/components/ui/Button.tsx:38`
is defined as `CommonProps & Omit<LinkProps, 'className'> & { to: string }`, which
strips `className` from the link variant's public type. Every call site that passes
`className` on a `Button` with a `to` prop (SiteShell.tsx:56, Download.tsx:163,
Home.tsx:153/175/340/355, MiscPages.tsx:94) therefore fails, and Examples.tsx:69 also
passes `href`/`target`/`rel` alongside `to`.

Fix (single component change, no call-site churn):
- In `src/components/ui/Button.tsx`, change `ButtonAsLink` to keep `className`:
  `type ButtonAsLink = CommonProps & Omit<LinkProps, 'className'> & { to: string; className?: string }`.
  The component already threads `className` through internally (line 48/60/77), so this
  only corrects the exported type.
- For Examples.tsx:69 ("View source" external link): it mixes anchor attributes with a
  react-router `to`. Change that one call site to a plain styled `<a href … target="_blank" rel="noreferrer">`
  (external GitHub link should not be a client-side `Link`), or drop `href/target/rel`
  and keep `to`. Prefer the plain `<a>` so the external link behaves correctly.

Verification:
- Re-run `npx tsc --noEmit` → expect zero errors.
- Re-run `pnpm build` → still passes.

## Notes on scope
This is a large multi-session build. Order of execution: (1) foundation/tokens/fonts/theme provider,
(2) routing + two shells + core UI library, (3) homepage + interactive code hero, (4) docs system,
(5) playground + states, (6) packages, (7) download/install/releases, (8) blog/roadmap/community/
contribute/governance/security/status/about/brand/global-search, (9) system states + responsive
polish + handoff. Each surface is complete before moving on so the app is always coherent.
