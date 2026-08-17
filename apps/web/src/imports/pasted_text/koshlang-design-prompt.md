# KoshLang — Master UI/UX Design Prompt for Figma

## Your Role

Act as a **world-class principal product designer, developer-experience designer, design-systems architect, interaction designer, and documentation UX specialist**.

You are designing the complete digital ecosystem for **KoshLang**, a new-generation programming language.

This is **NOT merely a programming-language landing page**.

You are designing the complete **KoshLang Developer Platform**:

* `koshlang.com`
* `docs.koshlang.com`
* `play.koshlang.com`
* `pkg.koshlang.com`
* downloads and installation
* releases
* examples
* developer tooling
* community
* blog
* roadmap
* search
* account/publisher experiences where required
* all states, responsive layouts, navigation systems and shared components

The final experience should make developers feel:

> **“This is what a modern programming language ecosystem should look like.”**

KoshLang is a new-generation language. Its digital experience must feel equally new-generation.

---

# 1. Product Vision

A developer discovering KoshLang should be able to complete this journey naturally:

```text
Discover
   ↓
Understand
   ↓
See real code
   ↓
Try KoshLang
   ↓
Install KoshLang
   ↓
Learn
   ↓
Build
   ↓
Find packages
   ↓
Use developer tools
   ↓
Read deep reference documentation
   ↓
Join the community
   ↓
Contribute
```

Design this entire journey as **one cohesive product**.

Do not design disconnected websites.

A developer moving between:

```text
koshlang.com
docs.koshlang.com
play.koshlang.com
pkg.koshlang.com
```

should immediately recognize that they are still inside the KoshLang ecosystem.

---

# 2. Core Design Ambition

Do not simply imitate:

* Python
* Rust
* Go
* Node.js
* Bun
* Vercel
* GitHub
* Stripe

Study the principles that make excellent developer products successful:

* clarity
* information density
* excellent typography
* code-first communication
* fast navigation
* powerful search
* progressive disclosure
* strong documentation hierarchy
* keyboard-first interactions
* predictable developer workflows

Then create a **distinct KoshLang identity**.

The result must not look like a template.

---

# 3. Brand Personality

KoshLang should visually communicate:

**Modern**

**Technical**

**Precise**

**Intelligent**

**Fast**

**Calm**

**Confident**

**Developer-first**

**Forward-looking**

**Premium**

Avoid making it feel:

* corporate
* childish
* cyberpunk
* overly futuristic
* gaming-oriented
* AI-generated
* excessively neon
* excessively gradient-heavy
* generic SaaS
* visually noisy

The sophistication should come from **excellent composition, typography, interaction and information architecture**, not decoration.

---

# 4. Design Philosophy

Think:

> Quiet confidence + powerful developer tooling.

Use:

* generous whitespace
* strong grids
* exceptional typography
* carefully controlled density
* beautiful code surfaces
* restrained borders
* layered information
* subtle depth
* subtle motion
* excellent dark mode
* intentional accent color
* strong hierarchy

The product should feel sophisticated even when animations are disabled.

---

# 5. Design for Developers

Developers are not normal marketing-site visitors.

Optimize for:

* scanning
* keyboard navigation
* copy/paste
* code readability
* search
* command discovery
* version awareness
* troubleshooting
* rapid navigation
* deep linking
* technical credibility
* information density without clutter

Avoid excessive marketing sections that force users to scroll through vague claims before seeing actual code.

**Code is part of the product identity.**

---

# 6. Create a Complete Design System First

Before designing final screens, create a KoshLang design system.

Create Figma variables/tokens for:

## Colors

Create semantic tokens rather than page-specific colors.

Examples:

```text
background/default
background/subtle
background/elevated

surface/default
surface/hover
surface/active
surface/code

text/primary
text/secondary
text/tertiary
text/inverse

border/default
border/subtle
border/strong

accent/default
accent/hover
accent/subtle

status/success
status/warning
status/error
status/info

code/keyword
code/string
code/function
code/type
code/comment
code/number
code/operator
```

Support complete:

* Light theme
* Dark theme

Use a distinctive KoshLang accent color, but keep it restrained.

---

# 7. Typography

Create a complete type scale.

Use separate typography for:

### Product/UI

Modern high-legibility sans serif.

### Code

Professional monospace font.

Create styles for:

```text
Display XL
Display
H1
H2
H3
H4
H5

Body Large
Body
Body Small

Label
Caption
Metadata

Code Large
Code
Code Small
Terminal
```

Documentation readability is extremely important.

Avoid excessively large landing-page typography that sacrifices useful information.

---

# 8. Grid and Spacing

Create a consistent spacing system.

Example:

```text
4
8
12
16
20
24
32
40
48
64
80
96
128
```

Use responsive grids for:

```text
Desktop
1440px

Laptop
1280px

Tablet
768px

Mobile
390px
```

Use Auto Layout extensively.

Avoid arbitrary spacing.

---

# 9. Component Library

Design reusable components with variants and states.

## Core

* Button
* Icon button
* Link
* Tabs
* Segmented control
* Dropdown
* Select
* Checkbox
* Radio
* Switch
* Text input
* Textarea
* Search input
* Command palette
* Tooltip
* Popover
* Dialog
* Drawer
* Toast
* Alert
* Badge
* Tag
* Avatar
* Breadcrumb
* Pagination
* Skeleton
* Spinner
* Progress
* Empty state
* Error state

## Developer Components

* Code block
* Terminal
* Copy button
* Run button
* File tab
* Editor tab
* Output panel
* Diagnostics panel
* Version selector
* OS selector
* Architecture selector
* Install-command block
* Download card
* Release card
* Package card
* API signature
* Parameter table
* Function reference
* Deprecation badge
* Version badge
* CLI command
* Keyboard shortcut

## Documentation Components

* Docs sidebar
* Table of contents
* Previous/Next
* Note
* Tip
* Warning
* Caution
* Steps
* Code group
* OS-specific content
* Version-specific content
* API reference block
* Related pages
* Heading anchors

Every component must contain states:

```text
Default
Hover
Pressed
Focus
Disabled
Loading
Selected
Error
```

where applicable.

---

# 10. Global Header

Create a sophisticated shared navigation system.

Desktop concept:

```text
KoshLang     Learn   Docs   Packages   Playground   Community   Blog

                         Search ⌘K       GitHub       Download
```

Keep it clean.

Include:

* logo
* product navigation
* search
* theme
* GitHub
* primary Download CTA

Mobile requires a fully designed navigation experience rather than merely collapsing everything into an unstructured list.

---

# 11. Homepage

Design a homepage that establishes KoshLang immediately.

## Hero

Show:

```text
KOSHLANG

Programming, thoughtfully designed.

A modern programming language built for
simplicity, performance and productive development.

[ Download KoshLang ]     [ Try Online ]

KoshLang <current version>
```

Use placeholder version tokens in the design rather than pretending a release exists.

The hero should incorporate **real-looking code presentation as a visual product element**, but final implementation content must come from the actual language specification.

Do not use meaningless abstract 3D illustrations.

Make **KoshLang code itself beautiful**.

---

# 12. Interactive Code Hero

Design something similar conceptually to:

```text
┌ main.kosh ────────────────────────────── Format   Copy   Run ▶ ┐
│                                                                │
│ fn main() {                                                    │
│     print("Hello from KoshLang!")                              │
│ }                                                              │
│                                                                │
├ OUTPUT ─────────────────────────────────────────────────────────┤
│ Hello from KoshLang                                            │
└────────────────────────────────────────────────────────────────┘
```

Design:

* syntax highlighting
* filename
* Run
* Copy
* Format
* output
* execution status
* error state
* loading state

The component must look excellent enough to become a recognizable KoshLang visual motif.

---

# 13. Homepage Information Architecture

Design all sections:

1. Hero
2. Interactive code
3. Why KoshLang
4. Language principles/features
5. Code examples
6. Tooling
7. Package ecosystem
8. Cross-platform development
9. Compiler/architecture
10. Performance section
11. Learning resources
12. Documentation preview
13. Community
14. Latest releases
15. Open-source/contribution
16. Final CTA
17. Footer

Avoid repeating the same card-grid design for every section.

Create visual rhythm.

---

# 14. Download Experience

This must be one of the strongest experiences.

Design:

```text
Download KoshLang

Recommended for your system

macOS
Apple Silicon

KoshLang <version>

[ Download ]

brew install koshlang

Copy
```

Then:

```text
Other platforms
```

with:

* Windows
* macOS
* Linux
* Source

Architecture options:

* x86-64
* ARM64
* Apple Silicon

Artifact details:

* filename
* format
* size
* SHA-256
* signature
* release date

Design verification instructions clearly.

---

# 15. Installation Experience

Design OS tabs:

```text
macOS | Windows | Linux
```

Then installation methods:

```text
Recommended
Package Manager
Installer
Archive
Build from Source
```

Each method should include:

* command
* copy
* prerequisites
* verification
* update
* uninstall
* PATH troubleshooting

Do not bury troubleshooting.

---

# 16. Releases

Design:

```text
KoshLang Releases
```

Filters:

```text
Stable
Beta
Nightly
All
```

Release cards should clearly communicate:

* version
* channel
* release date
* highlights
* supported platforms

Release detail:

```text
KoshLang <version>

Highlights
Breaking Changes
Compiler
Standard Library
Tooling
Performance
Bug Fixes
Known Issues
Migration
Downloads
Checksums
```

Design version history beautifully.

---

# 17. Documentation — Extremely Important

`docs.koshlang.com` must feel like a world-class technical product.

Desktop structure:

```text
┌────────────────────────────────────────────────────────────────────┐
│ KoshLang Docs    Search documentation...    Version ▼    GitHub ◐ │
├────────────────┬────────────────────────────────────┬──────────────┤
│                │                                    │              │
│ Getting Started│ # Functions                        │ ON THIS PAGE │
│ Introduction   │                                    │              │
│ Installation   │ Explanation...                     │ Parameters   │
│ Hello World    │                                    │ Returns      │
│                │ ┌────────────────────────────────┐ │ Examples     │
│ Learn          │ │ KoshLang code                  │ │              │
│ Variables      │ │                                │ │              │
│ Types          │ └────────────────────────────────┘ │              │
│ Functions      │                                    │              │
│ Control Flow   │ Previous                    Next → │              │
│                │                                    │              │
└────────────────┴────────────────────────────────────┴──────────────┘
```

The article itself must remain the visual focus.

---

# 18. Documentation Navigation

Create hierarchical navigation for:

```text
Getting Started

Learn KoshLang

Language Reference

Standard Library

CLI

Package Manager

Compiler

Tooling

Guides

Examples

Internals

Language Specification

Contributing
```

Support:

* expandable groups
* active state
* nested pages
* version indicator
* new/deprecated labels
* scroll position
* mobile drawer

---

# 19. Documentation Search

Design an excellent `⌘ K / Ctrl K` search.

Search overlay:

```text
Search KoshLang documentation...

────────────────────────────

Documentation

Functions
Learn → Functions

Standard Library

String
std → core → String

CLI

kosh build
CLI → build

────────────────────────────

↑ ↓ Navigate
↵ Open
esc Close
```

Support categories:

* Documentation
* Standard Library
* CLI
* Examples
* Packages
* Blog

Design:

* recent searches
* zero results
* loading
* error
* keyboard navigation

---

# 20. Documentation Article

Create a complete article template.

Elements:

* breadcrumb
* version/status
* title
* summary
* last updated
* article
* headings
* anchors
* code
* diagrams
* notes
* warnings
* API tables
* tabs
* OS variants
* related pages
* edit page
* report issue
* previous/next

Excellent reading experience is more important than decorative visuals.

---

# 21. Standard Library Reference

Design a dense but approachable reference interface.

Example:

```text
String

Represents...

Methods
Properties
Examples
```

Method:

```text
String.length()

string.length() → Int

Returns the number...

Parameters
None

Returns
Int

Example
...
```

Create reusable reference components.

---

# 22. CLI Reference

Design command reference pages.

Example:

```text
kosh build

Build the current KoshLang project.

USAGE

kosh build [OPTIONS]

OPTIONS

--release
--target <TARGET>
--output <PATH>
```

Include:

* copy
* examples
* options table
* related commands
* common errors

---

# 23. Playground — Flagship Product

`play.koshlang.com` should feel like a lightweight dedicated developer environment rather than a textarea placed on a webpage.

Desktop:

```text
┌───────────────────────────────────────────────────────────────────┐
│ Kosh Playground    Examples ▼     Share      Format      Run ▶   │
├────────────────────────────────┬──────────────────────────────────┤
│ main.kosh                      │ OUTPUT                           │
│                                │                                  │
│ fn main() {                    │ Hello from KoshLang              │
│    ...                         │                                  │
│ }                              │                                  │
│                                │                                  │
├────────────────────────────────┴──────────────────────────────────┤
│ KoshLang <version>     Ready       Execution <time>              │
└───────────────────────────────────────────────────────────────────┘
```

Design:

* editor
* output
* diagnostics
* stdin
* examples
* compiler version
* Run
* Format
* Reset
* Copy
* Share
* settings
* keyboard shortcuts
* fullscreen
* mobile mode

---

# 24. Playground Advanced Mode

Design a future advanced mode:

```text
SOURCE | AST | IR | LLVM IR | ASSEMBLY
```

Allow split views.

Example:

```text
SOURCE             LLVM IR

fn add(...)        define ...
```

This should make KoshLang appealing to compiler enthusiasts and students.

---

# 25. Playground States

Design explicitly:

* idle
* compiling
* running
* success
* compile error
* runtime error
* timeout
* execution unavailable
* unsupported compiler version
* rate limited
* connection failure

Do not rely only on color to communicate errors.

---

# 26. Examples Explorer

Design:

```text
Examples
```

Categories:

* Basics
* Data
* Files
* Networking
* Concurrency
* CLI
* Applications

Cards should preview useful code.

Example page:

```text
HTTP Server

Explanation

[code]

Run
Copy
Open in Playground
Download Project
View Source

How it works

Related documentation
```

---

# 27. Packages

Design `pkg.koshlang.com` as a serious package ecosystem.

Homepage:

```text
Kosh Packages

Find libraries for KoshLang.

[ Search packages... ]
```

Include:

* trending if backed by real data
* recently updated
* categories
* verified publishers

Do not visually imply popularity metrics unless real data exists.

---

# 28. Package Search

Filters:

* relevance
* downloads
* recently updated
* verified
* compatibility
* category

Package card:

```text
kosh-http

Fast HTTP toolkit

v2.4.1
Verified

Updated ...
Compatible with ...
```

---

# 29. Package Detail

Design:

```text
kosh-http
v2.4.1

Fast HTTP toolkit

kosh add kosh-http        Copy

README | Versions | Dependencies | Dependents | Security
```

Sidebar:

```text
Repository
Documentation
License
Owners
Latest version
Compatibility
Package size
```

Also design:

* deprecated package
* yanked version
* security advisory
* unverified publisher

---

# 30. Developer Tooling

Design `/tools`.

Cards for real integrations such as:

```text
VS Code
Kosh LSP
Formatter
Debugger
```

Future integrations can include:

* JetBrains
* Neovim
* Vim
* Zed
* Emacs
* Sublime

Tool page should show:

* screenshot/visual
* capabilities
* installation
* setup
* commands
* configuration
* troubleshooting

---

# 31. Blog

Design a technical engineering blog rather than a corporate news feed.

Categories:

```text
Announcements
Releases
Language Design
Compiler
Performance
Community
Tutorials
Case Studies
```

Article template:

* category
* title
* summary
* author
* publish date
* reading time
* hero visual
* TOC
* technical content
* code
* diagrams
* related articles
* share

---

# 32. Roadmap

Design a transparent roadmap.

Sections:

```text
Language
Compiler
Tooling
Documentation
Ecosystem
Infrastructure
```

Statuses:

```text
Exploring
Planned
In Progress
Beta
Shipped
Paused
```

Avoid looking like a generic Kanban board.

Create a polished public roadmap optimized for understanding product direction.

---

# 33. Community

Design community hub.

Potential areas:

* GitHub
* Discussions
* Discord/community chat
* Events
* Contributors
* Community projects
* RFCs
* Code of Conduct

Make open-source contribution feel welcoming without becoming visually childish.

---

# 34. Contribute

Design a contributor onboarding journey:

```text
Choose how you want to contribute

Compiler
Standard Library
Documentation
Tooling
Website
Packages
Community
```

Each route should explain:

* prerequisites
* repository
* setup
* contribution workflow
* coding/documentation standards
* issues
* RFC requirements

---

# 35. Governance + RFCs

Create serious technical pages for:

* governance
* maintainers
* decision process
* RFC process
* language evolution

RFC listing:

```text
RFC 0012
Pattern Matching

Status: Discussion
Authors: ...
Updated: ...
```

RFC detail should optimize long technical reading.

---

# 36. Security

Design a clear security center:

* report vulnerability
* supported versions
* security advisories
* release verification
* package security
* security policy

Make vulnerability reporting prominent.

---

# 37. Status Experience

Design:

```text
All systems operational
```

Services:

* Website
* Documentation
* Downloads
* Package Registry
* Playground
* API

Include:

* incidents
* maintenance
* uptime history

---

# 38. Search Across Ecosystem

Think beyond docs search.

Global KoshLang search could eventually search:

```text
Docs
API
Standard Library
Packages
Examples
Blog
Releases
```

Design the UX so search feels unified.

---

# 39. Version Awareness

Programming languages evolve.

Version must be visible where relevant without dominating the UI.

Design:

```text
KoshLang 1.4 Stable ▼
```

Possible options:

```text
1.5 Nightly
1.4 Stable
1.3
1.2
```

Old docs require:

```text
You are viewing documentation for an older version.

[ View latest documentation ]
```

Design this carefully.

---

# 40. Theme

Support:

```text
Light
Dark
System
```

Dark mode is not simply inverted light mode.

Design both intentionally.

Code contrast must remain excellent.

---

# 41. Responsive Experience

Create complete designs for:

```text
1440 desktop
1280 laptop
768 tablet
390 mobile
```

At minimum produce responsive variants for all critical screens.

Mobile docs need special attention.

Desktop:

```text
Sidebar | Article | TOC
```

Mobile:

```text
Header
Article

[Navigation]
[On this page]
```

Do not squeeze desktop sidebars onto mobile.

---

# 42. Accessibility

Design toward WCAG 2.2 AA.

Include:

* visible focus
* keyboard navigation
* large enough touch targets
* contrast
* labels
* error messages
* reduced-motion consideration
* non-color status indicators
* logical heading hierarchy
* skip navigation
* accessible dialogs

Create focus states in the component library.

---

# 43. Loading States

Design proper skeletons for:

* homepage dynamic content
* releases
* packages
* search
* playground
* blog
* roadmap

Avoid generic centered spinners everywhere.

---

# 44. Empty States

Design useful empty states.

Examples:

```text
No packages found
```

Offer:

* clear filters
* change search
* documentation

For an unreleased service:

```text
The Kosh package registry is not publicly available yet.
```

Do not display fake packages.

---

# 45. Error States

Design:

* 404
* 500
* offline
* search error
* API error
* package unavailable
* compiler unavailable
* playground timeout
* download unavailable

Error pages should still provide useful navigation.

---

# 46. SEO-Aware Design

The implementation will have expert-level SEO, so design pages that naturally support:

* one clear H1
* logical H2/H3 structure
* breadcrumbs
* descriptive page introductions
* related content
* author/date metadata
* version metadata
* internal linking
* crawlable navigation

Do not hide essential information entirely inside tabs or client-only interactions.

---

# 47. CMS-Aware Design

The website will use a lightweight code-first CMS such as Payload CMS.

Design editorial sections as reusable content blocks rather than one-off layouts.

CMS-manageable areas include:

* homepage content
* feature sections
* About
* community
* roadmap
* announcements
* blog
* navigation
* footer
* SEO content
* banners
* editorial release notes

Create predictable component boundaries that developers can map to CMS blocks.

---

# 48. Motion

Use motion carefully.

Good uses:

* command palette
* navigation transitions
* hover feedback
* tabs
* code execution state
* copy confirmation
* expandable docs navigation
* small hero interactions

Avoid:

* excessive parallax
* continuously moving backgrounds
* unnecessary floating objects
* animations that interrupt reading

Motion should communicate **state**, not decorate emptiness.

---

# 49. Iconography

Create a coherent icon system.

Use simple line icons.

Potential custom icons:

* KoshLang file
* compiler
* package
* module
* terminal
* documentation
* playground
* language version

Do not use random emoji as core product iconography.

---

# 50. Figma File Organization

Organize the Figma file professionally.

```text
00 — Foundations

01 — Variables
02 — Typography
03 — Icons
04 — Components
05 — Patterns

10 — Website
11 — Homepage
12 — Download
13 — Releases
14 — Examples
15 — Tools
16 — Blog
17 — Community
18 — Roadmap

20 — Documentation

30 — Playground

40 — Package Registry

50 — Responsive

60 — States

70 — Prototypes

80 — Developer Handoff
```

Use:

* components
* component properties
* variants
* variables
* Auto Layout
* constraints
* semantic naming

Do not flatten the design.

---

# 51. Prototype Important Journeys

Create interactive Figma prototypes for:

### Journey A

```text
Homepage
→ Download
→ OS detected
→ installation instructions
```

### Journey B

```text
Homepage
→ Docs
→ Search
→ Functions
→ code example
→ Playground
```

### Journey C

```text
Homepage
→ Playground
→ edit
→ run
→ output/error
→ share
```

### Journey D

```text
Packages
→ Search
→ Package
→ Version
→ Documentation
```

### Journey E

```text
Release
→ Downloads
→ architecture
→ checksum verification
```

### Journey F

```text
Mobile homepage
→ navigation
→ docs
→ search
→ article
```

---

# 52. Developer Handoff

Every important component must communicate:

* dimensions
* spacing
* responsive behavior
* typography
* colors/tokens
* states
* hover
* focus
* disabled
* loading
* error
* dark mode
* interaction behavior

Developers should not need to guess the intended UX.

---

# 53. Screens That MUST Be Designed

Do not stop after the homepage.

Design at minimum:

1. Homepage
2. Download
3. OS-specific download
4. Installation
5. Releases
6. Release detail
7. Learn landing
8. Examples
9. Example detail
10. Tools
11. Tool detail
12. Blog
13. Blog article
14. Roadmap
15. Community
16. Contribute
17. Governance
18. Security
19. About
20. Brand
21. Global search
22. Documentation home
23. Documentation article
24. Standard-library index
25. Standard-library symbol
26. CLI reference
27. Compiler documentation
28. Documentation search
29. Old-version documentation state
30. Playground
31. Playground compilation error
32. Playground runtime error
33. Playground advanced/compiler view
34. Package registry home
35. Package search
36. Package detail
37. Package security/deprecated state
38. Status page
39. 404
40. 500
41. Empty state
42. Loading states
43. Error states
44. Mobile homepage
45. Mobile documentation
46. Mobile playground
47. Mobile packages
48. Mobile download

Do not omit secondary screens simply because they are less visually exciting.

---

# 54. Do Not Leave Features Undefined

For every button, determine:

```text
What happens when clicked?
Where does it navigate?
What happens while loading?
What happens if it fails?
What happens if there is no data?
What happens on mobile?
What happens using keyboard navigation?
What does focus look like?
What happens in dark mode?
```

If this cannot be answered, the component is not finished.

---

# 55. Design Truthfully

Some KoshLang backend systems may still be under development.

Therefore distinguish between:

```text
DESIGNED PRODUCT EXPERIENCE
```

and

```text
CURRENTLY AVAILABLE FUNCTIONALITY
```

We can design the complete future experience.

However, do not invent:

* benchmark numbers
* package download counts
* user counts
* company logos
* release versions
* language capabilities
* syntax
* compiler internals

Use clearly labeled design data/placeholders when real product data is unavailable.

---

# 56. Quality Bar

Do not optimize for the fastest possible Figma output.

Optimize for a design system that could support KoshLang for **many years**.

The finished experience should feel appropriate for:

* a student learning their first language
* an experienced engineer evaluating KoshLang
* a compiler engineer reading internals
* a library author publishing packages
* an open-source contributor
* an organization evaluating adoption

Each should be able to find what they need quickly.

---

# 57. Final Emotional Goal

When an experienced developer opens KoshLang for the first time, the interface should communicate before they read much text:

> This language is serious.

Then:

> This ecosystem is unusually well thought out.

And after using the documentation/playground:

> This feels like a programming language built for the next generation of developers.

Achieve this through **clarity, speed, typography, code presentation, developer workflows, thoughtful interactions and coherence** — not hype.

---

# 58. Final Deliverables

Produce:

* complete KoshLang visual identity direction
* light/dark foundations
* semantic variables
* typography system
* spacing/grid system
* icon direction
* complete component library
* component variants and interaction states
* desktop screens
* tablet adaptations
* mobile screens
* documentation system
* playground system
* package-registry system
* download/install system
* release system
* blog/editorial system
* roadmap/community/contribution system
* search experience
* empty/loading/error/unavailable states
* interactive prototypes
* developer-handoff page

Before considering the design complete, audit the file against every section of this brief.

**Do not leave a major screen, component, interaction, responsive state, or developer workflow undesigned.**

The final output must be a **complete UI/UX system for the KoshLang Developer Platform**, not a collection of attractive mockups.
