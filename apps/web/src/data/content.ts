/* Clearly-labeled placeholder data for the KoshLang platform. Nothing here is
   real: KoshLang is a fictional language. No invented benchmark numbers,
   download counts, or user metrics are presented as real. */

import type { IconName } from '../components/Icon'

export const KOSH_VERSION = '1.4.0'
export const KOSH_CHANNEL = 'stable'

/* ---- Navigation ----------------------------------------------------------- */
export const primaryNav = [
  { label: 'Learn', to: '/docs' },
  { label: 'Docs', to: '/docs/reference' },
  { label: 'Packages', to: '/pkg' },
  { label: 'Playground', to: '/play' },
  { label: 'Community', to: '/community' },
  { label: 'Blog', to: '/blog' },
]

export const footerNav: { title: string; links: { label: string; to: string }[] }[] = [
  {
    title: 'Product',
    links: [
      { label: 'Download', to: '/download' },
      { label: 'Install', to: '/install' },
      { label: 'Releases', to: '/releases' },
      { label: 'Playground', to: '/play' },
      { label: 'Tools', to: '/tools' },
    ],
  },
  {
    title: 'Learn',
    links: [
      { label: 'Documentation', to: '/docs' },
      { label: 'Language Reference', to: '/docs/reference' },
      { label: 'Standard Library', to: '/docs/stdlib' },
      { label: 'CLI', to: '/docs/cli' },
      { label: 'Examples', to: '/examples' },
    ],
  },
  {
    title: 'Ecosystem',
    links: [
      { label: 'Packages', to: '/pkg' },
      { label: 'Roadmap', to: '/roadmap' },
      { label: 'Blog', to: '/blog' },
      { label: 'Status', to: '/status' },
      { label: 'Security', to: '/security' },
    ],
  },
  {
    title: 'Community',
    links: [
      { label: 'Community Hub', to: '/community' },
      { label: 'Contribute', to: '/contribute' },
      { label: 'Governance', to: '/governance' },
      { label: 'About', to: '/about' },
      { label: 'Brand', to: '/brand' },
    ],
  },
]

/* ---- Homepage principles / features -------------------------------------- */
export const principles: { icon: IconName; title: string; body: string }[] = [
  {
    icon: 'sparkles',
    title: 'Thoughtful by default',
    body: 'Sensible defaults, explicit when it matters. The language stays out of your way until you need precision, then gives you exact control.',
  },
  {
    icon: 'bolt',
    title: 'Fast where it counts',
    body: 'An ahead-of-time compiler with a lean runtime. Predictable performance without ceremony or manual memory bookkeeping.',
  },
  {
    icon: 'shield',
    title: 'Safe without friction',
    body: 'A strong type system with inference, exhaustive matching, and no null surprises — errors are values you handle, not exceptions you forget.',
  },
  {
    icon: 'terminal',
    title: 'Tooling in the box',
    body: 'Formatter, language server, package manager, test runner and docs generator ship together and speak the same conventions.',
  },
  {
    icon: 'module',
    title: 'Composable modules',
    body: 'A clear module system and a package registry designed for small, focused libraries that combine cleanly.',
  },
  {
    icon: 'cpu',
    title: 'Transparent internals',
    body: 'Inspect the AST, IR and generated assembly from the playground. Nothing about the compiler is hidden from you.',
  },
]

export const codeExamples: { title: string; description: string; code: string }[] = [
  {
    title: 'Pattern matching',
    description: 'Exhaustive matching over enums, with the compiler proving you handled every case.',
    code: `enum Shape {
    Circle(Float)
    Rect(Float, Float)
}

fn area(s: Shape) -> Float {
    match s {
        Circle(r) => 3.14159 * r * r
        Rect(w, h) => w * h
    }
}`,
  },
  {
    title: 'Errors as values',
    description: 'No exceptions. Fallible calls return Result and the ? operator threads failures cleanly.',
    code: `fn read_config(path: String) -> Result<Config> {
    let text = fs.read_to_string(path)?
    let cfg = parse(text)?
    return Ok(cfg)
}`,
  },
  {
    title: 'Lightweight concurrency',
    description: 'Structured tasks with a scheduler built in — spawn work and await results safely.',
    code: `async fn fetch_all(urls: List<String>) -> List<Response> {
    let tasks = urls.map(fn(u) { spawn get(u) })
    return await join(tasks)
}`,
  },
]

/* ---- Releases ------------------------------------------------------------- */
export type Channel = 'stable' | 'beta' | 'nightly'
export type Release = {
  version: string
  channel: Channel
  date: string
  highlights: string[]
  platforms: string[]
}
export const releases: Release[] = [
  {
    version: '1.4.0',
    channel: 'stable',
    date: '2026-07-28',
    highlights: [
      'Incremental compilation is now on by default',
      'New std.json module with streaming parser',
      'Language server: inlay type hints',
    ],
    platforms: ['macOS', 'Linux', 'Windows'],
  },
  {
    version: '1.5.0',
    channel: 'beta',
    date: '2026-08-11',
    highlights: ['Const generics (preview)', 'Faster pattern-match codegen'],
    platforms: ['macOS', 'Linux', 'Windows'],
  },
  {
    version: '1.6.0',
    channel: 'nightly',
    date: '2026-08-16',
    highlights: ['Experimental effect handlers', 'Playground AST export'],
    platforms: ['macOS', 'Linux'],
  },
  {
    version: '1.3.2',
    channel: 'stable',
    date: '2026-05-30',
    highlights: ['Bug fixes for the formatter', 'Improved error spans'],
    platforms: ['macOS', 'Linux', 'Windows'],
  },
  {
    version: '1.3.0',
    channel: 'stable',
    date: '2026-04-02',
    highlights: ['Trait objects', 'Package registry lockfiles'],
    platforms: ['macOS', 'Linux', 'Windows'],
  },
]

/* ---- Packages (sample registry data — not real published packages) ------- */
export type Pkg = {
  name: string
  version: string
  summary: string
  verified: boolean
  updated: string
  compat: string
  category: string
  deprecated?: boolean
}
export const packages: Pkg[] = [
  { name: 'kosh-http', version: '2.4.1', summary: 'Fast, ergonomic HTTP client and server toolkit.', verified: true, updated: '3 days ago', compat: '1.3+', category: 'Networking' },
  { name: 'serde-kosh', version: '1.9.0', summary: 'Serialization framework for JSON, TOML and MsgPack.', verified: true, updated: '1 week ago', compat: '1.2+', category: 'Data' },
  { name: 'kosh-cli', version: '0.8.3', summary: 'Build expressive command-line interfaces with subcommands.', verified: true, updated: '2 weeks ago', compat: '1.4+', category: 'CLI' },
  { name: 'sqlx-kosh', version: '3.1.0', summary: 'Async, compile-time-checked SQL for Postgres and SQLite.', verified: false, updated: '5 days ago', compat: '1.3+', category: 'Data' },
  { name: 'tokio-kosh', version: '1.2.0', summary: 'Structured concurrency runtime and utilities.', verified: true, updated: '1 month ago', compat: '1.2+', category: 'Concurrency' },
  { name: 'kosh-test', version: '0.5.2', summary: 'Snapshot testing and property-based test helpers.', verified: false, updated: '4 days ago', compat: '1.4+', category: 'Testing' },
  { name: 'chrono-kosh', version: '2.0.1', summary: 'Timezone-aware dates, durations and formatting.', verified: true, updated: '2 months ago', compat: '1.1+', category: 'Data' },
  { name: 'legacy-net', version: '0.2.0', summary: 'Older networking helpers — superseded by kosh-http.', verified: false, updated: '1 year ago', compat: '1.0+', category: 'Networking', deprecated: true },
]

export const packageCategories = ['Networking', 'Data', 'CLI', 'Concurrency', 'Testing', 'Web', 'Math']

/* ---- Examples ------------------------------------------------------------- */
export type Example = {
  slug: string
  title: string
  category: string
  summary: string
  code: string
}
export const examples: Example[] = [
  {
    slug: 'hello-world',
    title: 'Hello, World',
    category: 'Basics',
    summary: 'The smallest KoshLang program.',
    code: `fn main() {\n    print("Hello from KoshLang!")\n}`,
  },
  {
    slug: 'fizzbuzz',
    title: 'FizzBuzz',
    category: 'Basics',
    summary: 'Control flow and the match expression.',
    code: `fn main() {\n    for n in 1..=20 {\n        match (n % 3, n % 5) {\n            (0, 0) => print("FizzBuzz")\n            (0, _) => print("Fizz")\n            (_, 0) => print("Buzz")\n            _ => print(n.to_string())\n        }\n    }\n}`,
  },
  {
    slug: 'word-count',
    title: 'Word Count',
    category: 'Data',
    summary: 'Build a frequency map from text.',
    code: `fn main() {\n    let text = "the quick brown fox the lazy dog the"\n    let mut counts = Map<String, Int>()\n    for word in text.split(" ") {\n        counts[word] = counts.get(word, 0) + 1\n    }\n    print(counts.to_string())\n}`,
  },
  {
    slug: 'http-server',
    title: 'HTTP Server',
    category: 'Networking',
    summary: 'A minimal HTTP server with routing.',
    code: `use kosh.http\n\nfn main() {\n    let app = http.Server()\n    app.get("/", fn(req) {\n        return http.ok("Hello from KoshLang!")\n    })\n    app.listen(8080)\n}`,
  },
  {
    slug: 'concurrent-fetch',
    title: 'Concurrent Fetch',
    category: 'Concurrency',
    summary: 'Fetch many URLs in parallel with structured tasks.',
    code: `use kosh.http\n\nasync fn main() {\n    let urls = ["/a", "/b", "/c"]\n    let tasks = urls.map(fn(u) { spawn http.get(u) })\n    let results = await join(tasks)\n    print("fetched " + results.len().to_string())\n}`,
  },
  {
    slug: 'read-file',
    title: 'Read a File',
    category: 'Files',
    summary: 'Read a file and handle errors as values.',
    code: `use kosh.fs\n\nfn main() -> Result<Unit> {\n    let text = fs.read_to_string("notes.txt")?\n    print(text)\n    return Ok(())\n}`,
  },
]

/* ---- Blog ----------------------------------------------------------------- */
export type Post = {
  slug: string
  title: string
  category: string
  summary: string
  author: string
  date: string
  readingTime: string
}
export const posts: Post[] = [
  { slug: 'introducing-kosh-1-4', title: 'Introducing KoshLang 1.4', category: 'Releases', summary: 'Incremental compilation lands by default, plus a new streaming JSON module and inlay hints.', author: 'The KoshLang Team', date: '2026-07-28', readingTime: '6 min' },
  { slug: 'designing-error-handling', title: 'Why KoshLang has no exceptions', category: 'Language Design', summary: 'A tour of the reasoning behind errors-as-values and the ? operator.', author: 'A. Maintainer', date: '2026-06-14', readingTime: '11 min' },
  { slug: 'incremental-compilation', title: 'How incremental compilation works', category: 'Compiler', summary: 'The dependency graph, query caching, and what changed to make rebuilds fast.', author: 'Compiler WG', date: '2026-05-20', readingTime: '14 min' },
  { slug: 'perf-notes', title: 'Notes on the new codegen backend', category: 'Performance', summary: 'What we changed in pattern-match lowering and why it matters.', author: 'Compiler WG', date: '2026-04-09', readingTime: '9 min' },
]

/* ---- Roadmap -------------------------------------------------------------- */
export type RoadmapStatus = 'Exploring' | 'Planned' | 'In Progress' | 'Beta' | 'Shipped' | 'Paused'
export const roadmap: { area: string; items: { title: string; status: RoadmapStatus; note: string }[] }[] = [
  {
    area: 'Language',
    items: [
      { title: 'Const generics', status: 'Beta', note: 'Available behind a flag in 1.5.' },
      { title: 'Effect handlers', status: 'Exploring', note: 'Prototype in nightly.' },
      { title: 'Pattern-match guards', status: 'Shipped', note: 'Stable since 1.3.' },
    ],
  },
  {
    area: 'Compiler',
    items: [
      { title: 'Incremental compilation', status: 'Shipped', note: 'On by default in 1.4.' },
      { title: 'Parallel codegen', status: 'In Progress', note: 'Targeting 1.6.' },
      { title: 'WASM backend', status: 'Planned', note: 'Design under review.' },
    ],
  },
  {
    area: 'Tooling',
    items: [
      { title: 'Inlay hints', status: 'Shipped', note: 'Shipped with the 1.4 LSP.' },
      { title: 'Debugger (DAP)', status: 'In Progress', note: 'Alpha in the VS Code extension.' },
      { title: 'JetBrains plugin', status: 'Planned', note: 'Community-led.' },
    ],
  },
  {
    area: 'Ecosystem',
    items: [
      { title: 'Package registry', status: 'Exploring', note: 'Not publicly available yet.' },
      { title: 'Docs versioning', status: 'In Progress', note: 'Rolling out per-minor docs.' },
    ],
  },
]

/* ---- RFCs ----------------------------------------------------------------- */
export const rfcs: { id: string; title: string; status: string; authors: string; updated: string }[] = [
  { id: 'RFC 0012', title: 'Pattern Matching Ergonomics', status: 'Discussion', authors: 'A. Maintainer, B. Contributor', updated: '2026-08-10' },
  { id: 'RFC 0011', title: 'Const Generics', status: 'Accepted', authors: 'Compiler WG', updated: '2026-07-01' },
  { id: 'RFC 0009', title: 'Effect Handlers', status: 'Draft', authors: 'Language WG', updated: '2026-08-02' },
  { id: 'RFC 0007', title: 'Structured Concurrency', status: 'Shipped', authors: 'Runtime WG', updated: '2026-03-15' },
]
