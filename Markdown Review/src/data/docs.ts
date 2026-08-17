/* Documentation tree + a few fully-written article bodies. Placeholder content
   describing the fictional KoshLang. */

export type DocNode = { title: string; slug: string; badge?: 'new' | 'deprecated' }
export type DocGroup = { title: string; items: DocNode[] }

export const docsTree: DocGroup[] = [
  {
    title: 'Getting Started',
    items: [
      { title: 'Introduction', slug: 'introduction' },
      { title: 'Installation', slug: 'installation' },
      { title: 'Hello World', slug: 'hello-world' },
    ],
  },
  {
    title: 'Learn KoshLang',
    items: [
      { title: 'Variables', slug: 'variables' },
      { title: 'Types', slug: 'types' },
      { title: 'Functions', slug: 'functions' },
      { title: 'Control Flow', slug: 'control-flow' },
      { title: 'Pattern Matching', slug: 'pattern-matching' },
      { title: 'Error Handling', slug: 'error-handling' },
      { title: 'Concurrency', slug: 'concurrency', badge: 'new' },
    ],
  },
  {
    title: 'Language Reference',
    items: [
      { title: 'Overview', slug: 'reference' },
      { title: 'Grammar', slug: 'grammar' },
      { title: 'Modules', slug: 'modules' },
      { title: 'Traits', slug: 'traits' },
    ],
  },
  {
    title: 'Standard Library',
    items: [{ title: 'Overview', slug: 'stdlib' }],
  },
  {
    title: 'CLI',
    items: [{ title: 'Overview', slug: 'cli' }],
  },
  {
    title: 'Guides',
    items: [
      { title: 'Project Layout', slug: 'project-layout' },
      { title: 'Testing', slug: 'testing' },
      { title: 'Publishing a Package', slug: 'publishing' },
    ],
  },
  {
    title: 'Internals',
    items: [
      { title: 'Compiler', slug: 'compiler' },
      { title: 'Intermediate Representation', slug: 'ir' },
    ],
  },
]

export type ArticleBlock =
  | { t: 'p'; text: string }
  | { t: 'h2'; text: string }
  | { t: 'h3'; text: string }
  | { t: 'code'; code: string; filename?: string }
  | { t: 'callout'; kind: 'note' | 'tip' | 'warning' | 'caution'; title?: string; text: string }
  | { t: 'params'; rows: { name: string; type: string; desc: string }[] }

export type Article = {
  slug: string
  group: string
  title: string
  summary: string
  updated: string
  status?: 'stable' | 'new' | 'experimental'
  blocks: ArticleBlock[]
  toc: string[]
}

const functions: Article = {
  slug: 'functions',
  group: 'Learn KoshLang',
  title: 'Functions',
  summary: 'Declare, call, and pass functions — including closures and higher-order functions.',
  updated: '2026-07-30',
  status: 'stable',
  toc: ['Declaring functions', 'Parameters', 'Return values', 'Closures', 'Examples'],
  blocks: [
    { t: 'p', text: 'Functions are the primary unit of computation in KoshLang. They are declared with the fn keyword, take typed parameters, and return a single value. Type inference means you rarely need to annotate local variables, but function signatures are always explicit — a signature is a contract.' },
    { t: 'h2', text: 'Declaring functions' },
    { t: 'p', text: 'A function declaration names the function, lists its parameters with their types, and states its return type after the arrow.' },
    { t: 'code', filename: 'functions.kosh', code: `fn add(a: Int, b: Int) -> Int {\n    return a + b\n}\n\nfn greet(name: String) {\n    print("Hello, " + name)\n}` },
    { t: 'callout', kind: 'note', text: 'A function with no explicit return type returns Unit, KoshLang’s equivalent of “no meaningful value”.' },
    { t: 'h2', text: 'Parameters' },
    { t: 'p', text: 'Parameters are immutable by default. Prefix a parameter with mut to allow reassignment inside the function body. Parameters are always passed by value; large values are moved rather than copied.' },
    { t: 'params', rows: [
      { name: 'name', type: 'String', desc: 'The identifier introduced into the enclosing scope.' },
      { name: 'params', type: 'List<Param>', desc: 'Ordered, typed parameters. May be empty.' },
      { name: 'ret', type: 'Type', desc: 'The return type. Defaults to Unit when omitted.' },
    ] },
    { t: 'h2', text: 'Return values' },
    { t: 'p', text: 'Use return to produce a value. The final expression of a block is also its value, so short functions can omit return entirely.' },
    { t: 'code', code: `fn square(x: Int) -> Int {\n    x * x\n}` },
    { t: 'h2', text: 'Closures' },
    { t: 'p', text: 'Anonymous functions capture their environment and can be stored, passed, and returned. They use the same fn keyword without a name.' },
    { t: 'code', code: `let nums = [1, 2, 3, 4]\nlet doubled = nums.map(fn(n) { n * 2 })\nprint(doubled.to_string())` },
    { t: 'callout', kind: 'tip', title: 'Format on save', text: 'kosh fmt normalizes closure spacing and trailing commas so diffs stay small.' },
    { t: 'h2', text: 'Examples' },
    { t: 'p', text: 'Higher-order functions compose cleanly with the standard collection methods.' },
    { t: 'code', code: `let total = [1, 2, 3, 4, 5]\n    .filter(fn(n) { n % 2 == 1 })\n    .fold(0, fn(a, b) { a + b })\n\nprint(total.to_string())  // 9` },
  ],
}

const introduction: Article = {
  slug: 'introduction',
  group: 'Getting Started',
  title: 'Introduction',
  summary: 'What KoshLang is, who it is for, and how the documentation is organized.',
  updated: '2026-07-28',
  status: 'stable',
  toc: ['What is KoshLang', 'Design goals', 'How to read these docs'],
  blocks: [
    { t: 'p', text: 'KoshLang is a modern, statically typed programming language designed for clarity, performance, and a productive development loop. It compiles ahead of time to native code and ships with a complete toolchain — formatter, language server, package manager, and test runner — that shares one set of conventions.' },
    { t: 'callout', kind: 'note', title: 'Placeholder documentation', text: 'KoshLang is a design concept. Syntax and APIs shown here are illustrative and are not a real language specification.' },
    { t: 'h2', text: 'What is KoshLang' },
    { t: 'p', text: 'The language pairs a strong type system with type inference so that code stays terse without becoming untyped. Errors are values, concurrency is structured, and pattern matching is exhaustive by construction.' },
    { t: 'h2', text: 'Design goals' },
    { t: 'p', text: 'Thoughtful defaults, transparent internals, and tooling that works the same on every machine. You can inspect the compiler’s intermediate representations directly from the playground.' },
    { t: 'code', code: `fn main() {\n    print("Hello from KoshLang!")\n}` },
    { t: 'h2', text: 'How to read these docs' },
    { t: 'p', text: 'Start with Installation and Hello World, then work through Learn KoshLang. Reference material lives under Language Reference and Standard Library.' },
  ],
}

export const articles: Record<string, Article> = {
  functions,
  introduction,
}

/** Fallback generator so every slug in the tree resolves to a real page. */
export function getArticle(slug: string): Article {
  if (articles[slug]) return articles[slug]
  const node = docsTree.flatMap((g) => g.items.map((i) => ({ ...i, group: g.title }))).find((i) => i.slug === slug)
  const title = node?.title ?? 'Documentation'
  return {
    slug,
    group: node?.group ?? 'Documentation',
    title,
    summary: `Reference documentation for ${title.toLowerCase()} in KoshLang.`,
    updated: '2026-07-28',
    status: node?.badge === 'new' ? 'new' : 'stable',
    toc: ['Overview', 'Example', 'See also'],
    blocks: [
      { t: 'p', text: `This page documents ${title.toLowerCase()} in KoshLang. Content shown here is illustrative placeholder documentation for the design.` },
      { t: 'h2', text: 'Overview' },
      { t: 'p', text: `${title} is part of the KoshLang core language. The examples below demonstrate typical usage.` },
      { t: 'code', code: `fn main() {\n    // ${title} example\n    let value = 42\n    print(value.to_string())\n}` },
      { t: 'h2', text: 'Example' },
      { t: 'p', text: 'A minimal, runnable illustration you can open directly in the playground.' },
      { t: 'code', code: `fn main() {\n    let items = [1, 2, 3]\n    for i in items {\n        print(i.to_string())\n    }\n}` },
      { t: 'h2', text: 'See also' },
      { t: 'p', text: 'Related topics are listed under the Learn KoshLang and Language Reference sections in the sidebar.' },
    ],
  }
}

/* ---- Standard library symbols -------------------------------------------- */
export type StdMethod = { signature: string; returns: string; desc: string }
export type StdSymbol = {
  name: string
  kind: 'type' | 'module'
  summary: string
  methods: StdMethod[]
}
export const stdlib: StdSymbol[] = [
  {
    name: 'String',
    kind: 'type',
    summary: 'An immutable sequence of Unicode characters.',
    methods: [
      { signature: 'string.length() -> Int', returns: 'Int', desc: 'Returns the number of characters in the string.' },
      { signature: 'string.split(sep: String) -> List<String>', returns: 'List<String>', desc: 'Splits the string on each occurrence of sep.' },
      { signature: 'string.trim() -> String', returns: 'String', desc: 'Returns the string with leading and trailing whitespace removed.' },
      { signature: 'string.to_upper() -> String', returns: 'String', desc: 'Returns an uppercased copy of the string.' },
    ],
  },
  {
    name: 'List',
    kind: 'type',
    summary: 'A growable, ordered collection of values of a single type.',
    methods: [
      { signature: 'list.len() -> Int', returns: 'Int', desc: 'Returns the number of elements.' },
      { signature: 'list.map(f: fn(T) -> U) -> List<U>', returns: 'List<U>', desc: 'Applies f to every element, returning a new list.' },
      { signature: 'list.filter(f: fn(T) -> Bool) -> List<T>', returns: 'List<T>', desc: 'Keeps elements for which f returns true.' },
      { signature: 'list.fold(init: U, f: fn(U, T) -> U) -> U', returns: 'U', desc: 'Reduces the list to a single value.' },
    ],
  },
  {
    name: 'Map',
    kind: 'type',
    summary: 'An unordered collection of key–value pairs.',
    methods: [
      { signature: 'map.get(key: K, default: V) -> V', returns: 'V', desc: 'Returns the value for key, or default if absent.' },
      { signature: 'map.keys() -> List<K>', returns: 'List<K>', desc: 'Returns all keys as a list.' },
      { signature: 'map.contains(key: K) -> Bool', returns: 'Bool', desc: 'Reports whether key is present.' },
    ],
  },
  {
    name: 'json',
    kind: 'module',
    summary: 'Encode and decode JSON, with a streaming parser for large inputs.',
    methods: [
      { signature: 'json.parse(text: String) -> Result<Value>', returns: 'Result<Value>', desc: 'Parses a JSON document into a dynamic Value.' },
      { signature: 'json.stringify(value: Value) -> String', returns: 'String', desc: 'Serializes a Value to compact JSON.' },
    ],
  },
]

/* ---- CLI commands --------------------------------------------------------- */
export type CliCommand = {
  name: string
  summary: string
  usage: string
  options: { flag: string; desc: string }[]
  examples: string[]
}
export const cliCommands: CliCommand[] = [
  {
    name: 'kosh build',
    summary: 'Build the current KoshLang project.',
    usage: 'kosh build [OPTIONS]',
    options: [
      { flag: '--release', desc: 'Build with optimizations enabled.' },
      { flag: '--target <TARGET>', desc: 'Build for a specific target triple.' },
      { flag: '--output <PATH>', desc: 'Write the artifact to PATH.' },
    ],
    examples: ['kosh build --release', 'kosh build --target aarch64-apple-darwin'],
  },
  {
    name: 'kosh run',
    summary: 'Compile and run the current project.',
    usage: 'kosh run [OPTIONS] [-- ARGS]',
    options: [
      { flag: '--release', desc: 'Run an optimized build.' },
      { flag: '--quiet', desc: 'Suppress compiler progress output.' },
    ],
    examples: ['kosh run', 'kosh run -- --port 8080'],
  },
  {
    name: 'kosh test',
    summary: 'Run the project test suite.',
    usage: 'kosh test [OPTIONS] [FILTER]',
    options: [
      { flag: '--watch', desc: 'Re-run tests when files change.' },
      { flag: '--filter <NAME>', desc: 'Only run tests matching NAME.' },
    ],
    examples: ['kosh test', 'kosh test --watch parser'],
  },
  {
    name: 'kosh add',
    summary: 'Add a dependency to the current project.',
    usage: 'kosh add <PACKAGE>[@VERSION]',
    options: [{ flag: '--dev', desc: 'Add as a development-only dependency.' }],
    examples: ['kosh add kosh-http', 'kosh add serde-kosh@1.9'],
  },
  {
    name: 'kosh fmt',
    summary: 'Format source files in place.',
    usage: 'kosh fmt [OPTIONS] [PATHS]',
    options: [{ flag: '--check', desc: 'Exit non-zero if files would change.' }],
    examples: ['kosh fmt', 'kosh fmt --check'],
  },
]
