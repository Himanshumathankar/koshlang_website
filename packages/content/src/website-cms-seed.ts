export type CmsLink = {
  label: string;
  href: string;
};

export type CmsPageSeed = {
  slug: string;
  title: string;
  description: string;
  phase: "phase-2-main-website";
  source: "copied-frontend";
  seo: {
    path: string;
    title: string;
    description: string;
  };
};

export type WebsiteCmsSeed = {
  siteSettings: {
    name: "KoshLang";
    version: string;
    channel: string;
    description: string;
  };
  header: {
    primaryNav: readonly CmsLink[];
  };
  footer: {
    columns: readonly { title: string; links: readonly CmsLink[] }[];
  };
  pages: readonly CmsPageSeed[];
  content: {
    homepage: {
      hero: {
        badge: string;
        title: string;
        accent: string;
        description: string;
        primaryCta: CmsLink;
        secondaryCta: CmsLink;
        installCommand: string;
      };
      trustStrip: readonly string[];
      principles: readonly { icon: string; title: string; body: string }[];
      codeExamples: readonly { title: string; description: string; code: string }[];
    };
    releases: readonly { version: string; channel: string; date: string; highlights: readonly string[]; platforms: readonly string[] }[];
    packages: readonly { name: string; version: string; summary: string; verified: boolean; updated: string; compat: string; category: string; deprecated?: boolean }[];
    examples: readonly { slug: string; title: string; category: string; summary: string; code: string }[];
    posts: readonly { slug: string; title: string; category: string; summary: string; author: string; date: string; readingTime: string }[];
    roadmap: readonly { area: string; items: readonly { title: string; status: string; note: string }[] }[];
    rfcs: readonly { id: string; title: string; status: string; authors: string; updated: string }[];
    docs: {
      groups: readonly { title: string; items: readonly { title: string; slug: string; badge?: string }[] }[];
      stdlib: readonly { name: string; kind: string; summary: string }[];
      cliCommands: readonly { name: string; summary: string; usage: string }[];
    };
    tools: {
      featured: readonly { slug: string; name: string; icon: string; tagline: string; status: string; capabilities: readonly string[] }[];
      communityIntegrations: readonly string[];
    };
    community: {
      areas: readonly { icon: string; title: string; body: string; cta: string; href: string }[];
      codeOfConduct: string;
    };
    contribute: {
      routes: readonly { icon: string; title: string; description: string }[];
      setupCommands: readonly string[];
    };
    governance: {
      sections: readonly { title: string; description: string }[];
    };
    security: {
      supportedVersions: readonly { version: string; status: string }[];
      verifyCommand: string;
      advisories: string;
    };
    about: {
      body: readonly string[];
      principles: readonly { title: string; description: string }[];
    };
    status: {
      summary: string;
      services: readonly { name: string; status: string }[];
      incidents: readonly { status: string; date: string; description: string }[];
    };
  };
};

const KOSH_VERSION = "1.4.0";
const KOSH_CHANNEL = "stable";

export const websiteCmsSeed: WebsiteCmsSeed = {
  siteSettings: {
    name: "KoshLang",
    version: KOSH_VERSION,
    channel: KOSH_CHANNEL,
    description: "A modern programming language built for simplicity, performance and productive development."
  },
  header: {
    primaryNav: [
      { label: "Learn", href: "/docs" },
      { label: "Docs", href: "/docs/reference" },
      { label: "Packages", href: "/pkg" },
      { label: "Playground", href: "/play" },
      { label: "Community", href: "/community" },
      { label: "Blog", href: "/blog" }
    ]
  },
  footer: {
    columns: [
      { title: "Product", links: links([["Download", "/download"], ["Install", "/install"], ["Releases", "/releases"], ["Playground", "/play"], ["Tools", "/tools"]]) },
      { title: "Learn", links: links([["Documentation", "/docs"], ["Language Reference", "/docs/reference"], ["Standard Library", "/docs/stdlib"], ["CLI", "/docs/cli"], ["Examples", "/examples"]]) },
      { title: "Ecosystem", links: links([["Packages", "/pkg"], ["Roadmap", "/roadmap"], ["Blog", "/blog"], ["Status", "/status"], ["Security", "/security"]]) },
      { title: "Community", links: links([["Community Hub", "/community"], ["Contribute", "/contribute"], ["Governance", "/governance"], ["About", "/about"], ["Brand", "/brand"]]) }
    ]
  },
  pages: [
    page("/", "Programming, thoughtfully designed.", "A modern programming language built for simplicity, performance and productive development."),
    page("/about", "About KoshLang", "A design concept for what a modern programming-language ecosystem could feel like."),
    page("/brand", "Brand", "KoshLang identity assets, tone, and product language."),
    page("/community", "Join the community", "KoshLang is built in the open with the people who use it. Everyone is welcome."),
    page("/contribute", "Choose how you want to contribute", "Every kind of contribution matters. Pick an area to see prerequisites, the repository, and the workflow."),
    page("/docs", "Documentation", "Learn KoshLang with guides, reference material, standard library notes, and CLI docs."),
    page("/download", "Download KoshLang", "Install the KoshLang compiler and toolchain for macOS, Linux, and Windows."),
    page("/examples", "Examples", "Runnable KoshLang examples for language basics, data, networking, concurrency, and files."),
    page("/governance", "Governance & RFCs", "How KoshLang is stewarded, how decisions are made, and how the language evolves."),
    page("/install", "Install KoshLang", "Set up the KoshLang toolchain on your machine."),
    page("/pkg", "Packages", "Browse package records for the KoshLang ecosystem."),
    page("/play", "Playground", "Write, run, and inspect KoshLang code in the browser."),
    page("/releases", "Releases", "Review KoshLang release channels, highlights, and supported platforms."),
    page("/roadmap", "Public Roadmap", "Where KoshLang is headed, organized by area."),
    page("/search", "Search KoshLang", "One search across docs, the standard library, CLI, packages, examples and the blog."),
    page("/security", "Security Center", "Report vulnerabilities, verify releases, and review our security policy."),
    page("/status", "System Status", "Current service health for the KoshLang platform."),
    page("/tools", "Developer Tools", "Editor integrations and command-line tools that make KoshLang productive from the first keystroke.")
  ],
  content: {
    homepage: {
      hero: {
        badge: `KoshLang ${KOSH_VERSION} is here`,
        title: "Programming,",
        accent: "thoughtfully designed.",
        description: "A modern programming language built for simplicity, performance and productive development - with a complete toolchain in the box.",
        primaryCta: { label: "Download KoshLang", href: "/download" },
        secondaryCta: { label: "Try Online", href: "/play" },
        installCommand: "brew install koshlang"
      },
      trustStrip: ["Ahead-of-time compiled", "Type inference", "Errors as values", "Structured concurrency", "Batteries-included tooling"],
      principles: [
        principle("sparkles", "Thoughtful by default", "Sensible defaults, explicit when it matters. The language stays out of your way until you need precision, then gives you exact control."),
        principle("bolt", "Fast where it counts", "An ahead-of-time compiler with a lean runtime. Predictable performance without ceremony or manual memory bookkeeping."),
        principle("shield", "Safe without friction", "A strong type system with inference, exhaustive matching, and no null surprises - errors are values you handle, not exceptions you forget."),
        principle("terminal", "Tooling in the box", "Formatter, language server, package manager, test runner and docs generator ship together and speak the same conventions."),
        principle("module", "Composable modules", "A clear module system and a package registry designed for small, focused libraries that combine cleanly."),
        principle("cpu", "Transparent internals", "Inspect the AST, IR and generated assembly from the playground. Nothing about the compiler is hidden from you.")
      ],
      codeExamples: [
        codeExample("Pattern matching", "Exhaustive matching over enums, with the compiler proving you handled every case.", "enum Shape {\n    Circle(Float)\n    Rect(Float, Float)\n}\n\nfn area(s: Shape) -> Float {\n    match s {\n        Circle(r) => 3.14159 * r * r\n        Rect(w, h) => w * h\n    }\n}"),
        codeExample("Errors as values", "No exceptions. Fallible calls return Result and the ? operator threads failures cleanly.", "fn read_config(path: String) -> Result<Config> {\n    let text = fs.read_to_string(path)?\n    let cfg = parse(text)?\n    return Ok(cfg)\n}"),
        codeExample("Lightweight concurrency", "Structured tasks with a scheduler built in - spawn work and await results safely.", "async fn fetch_all(urls: List<String>) -> List<Response> {\n    let tasks = urls.map(fn(u) { spawn get(u) })\n    return await join(tasks)\n}")
      ]
    },
    releases: [
      release("1.4.0", "stable", "2026-07-28", ["Incremental compilation is now on by default", "New std.json module with streaming parser", "Language server: inlay type hints"], ["macOS", "Linux", "Windows"]),
      release("1.5.0", "beta", "2026-08-11", ["Const generics (preview)", "Faster pattern-match codegen"], ["macOS", "Linux", "Windows"]),
      release("1.6.0", "nightly", "2026-08-16", ["Experimental effect handlers", "Playground AST export"], ["macOS", "Linux"]),
      release("1.3.2", "stable", "2026-05-30", ["Bug fixes for the formatter", "Improved error spans"], ["macOS", "Linux", "Windows"]),
      release("1.3.0", "stable", "2026-04-02", ["Trait objects", "Package registry lockfiles"], ["macOS", "Linux", "Windows"])
    ],
    packages: [
      pkg("kosh-http", "2.4.1", "Fast, ergonomic HTTP client and server toolkit.", true, "3 days ago", "1.3+", "Networking"),
      pkg("serde-kosh", "1.9.0", "Serialization framework for JSON, TOML and MsgPack.", true, "1 week ago", "1.2+", "Data"),
      pkg("kosh-cli", "0.8.3", "Build expressive command-line interfaces with subcommands.", true, "2 weeks ago", "1.4+", "CLI"),
      pkg("sqlx-kosh", "3.1.0", "Async, compile-time-checked SQL for Postgres and SQLite.", false, "5 days ago", "1.3+", "Data"),
      pkg("tokio-kosh", "1.2.0", "Structured concurrency runtime and utilities.", true, "1 month ago", "1.2+", "Concurrency"),
      pkg("kosh-test", "0.5.2", "Snapshot testing and property-based test helpers.", false, "4 days ago", "1.4+", "Testing"),
      pkg("chrono-kosh", "2.0.1", "Timezone-aware dates, durations and formatting.", true, "2 months ago", "1.1+", "Data"),
      pkg("legacy-net", "0.2.0", "Older networking helpers - superseded by kosh-http.", false, "1 year ago", "1.0+", "Networking", true)
    ],
    examples: [
      example("hello-world", "Hello, World", "Basics", "The smallest KoshLang program.", "fn main() {\n    print(\"Hello from KoshLang!\")\n}"),
      example("fizzbuzz", "FizzBuzz", "Basics", "Control flow and the match expression.", "fn main() {\n    for n in 1..=20 {\n        match (n % 3, n % 5) {\n            (0, 0) => print(\"FizzBuzz\")\n            (0, _) => print(\"Fizz\")\n            (_, 0) => print(\"Buzz\")\n            _ => print(n.to_string())\n        }\n    }\n}"),
      example("word-count", "Word Count", "Data", "Build a frequency map from text.", "fn main() {\n    let text = \"the quick brown fox the lazy dog the\"\n    let mut counts = Map<String, Int>()\n    for word in text.split(\" \") {\n        counts[word] = counts.get(word, 0) + 1\n    }\n    print(counts.to_string())\n}"),
      example("http-server", "HTTP Server", "Networking", "A minimal HTTP server with routing.", "use kosh.http\n\nfn main() {\n    let app = http.Server()\n    app.get(\"/\", fn(req) {\n        return http.ok(\"Hello from KoshLang!\")\n    })\n    app.listen(8080)\n}"),
      example("concurrent-fetch", "Concurrent Fetch", "Concurrency", "Fetch many URLs in parallel with structured tasks.", "use kosh.http\n\nasync fn main() {\n    let urls = [\"/a\", \"/b\", \"/c\"]\n    let tasks = urls.map(fn(u) { spawn http.get(u) })\n    let results = await join(tasks)\n    print(\"fetched \" + results.len().to_string())\n}"),
      example("read-file", "Read a File", "Files", "Read a file and handle errors as values.", "use kosh.fs\n\nfn main() -> Result<Unit> {\n    let text = fs.read_to_string(\"notes.txt\")?\n    print(text)\n    return Ok(())\n}")
    ],
    posts: [
      post("introducing-kosh-1-4", "Introducing KoshLang 1.4", "Releases", "Incremental compilation lands by default, plus a new streaming JSON module and inlay hints.", "The KoshLang Team", "2026-07-28", "6 min"),
      post("designing-error-handling", "Why KoshLang has no exceptions", "Language Design", "A tour of the reasoning behind errors-as-values and the ? operator.", "A. Maintainer", "2026-06-14", "11 min"),
      post("incremental-compilation", "How incremental compilation works", "Compiler", "The dependency graph, query caching, and what changed to make rebuilds fast.", "Compiler WG", "2026-05-20", "14 min"),
      post("perf-notes", "Notes on the new codegen backend", "Performance", "What we changed in pattern-match lowering and why it matters.", "Compiler WG", "2026-04-09", "9 min")
    ],
    roadmap: [
      roadmapArea("Language", [["Const generics", "Beta", "Available behind a flag in 1.5."], ["Effect handlers", "Exploring", "Prototype in nightly."], ["Pattern-match guards", "Shipped", "Stable since 1.3."]]),
      roadmapArea("Compiler", [["Incremental compilation", "Shipped", "On by default in 1.4."], ["Parallel codegen", "In Progress", "Targeting 1.6."], ["WASM backend", "Planned", "Design under review."]]),
      roadmapArea("Tooling", [["Inlay hints", "Shipped", "Shipped with the 1.4 LSP."], ["Debugger (DAP)", "In Progress", "Alpha in the VS Code extension."], ["JetBrains plugin", "Planned", "Community-led."]]),
      roadmapArea("Ecosystem", [["Package registry", "Exploring", "Not publicly available yet."], ["Docs versioning", "In Progress", "Rolling out per-minor docs."]])
    ],
    rfcs: [
      { id: "RFC 0012", title: "Pattern Matching Ergonomics", status: "Discussion", authors: "A. Maintainer, B. Contributor", updated: "2026-08-10" },
      { id: "RFC 0011", title: "Const Generics", status: "Accepted", authors: "Compiler WG", updated: "2026-07-01" },
      { id: "RFC 0009", title: "Effect Handlers", status: "Draft", authors: "Language WG", updated: "2026-08-02" },
      { id: "RFC 0007", title: "Structured Concurrency", status: "Shipped", authors: "Runtime WG", updated: "2026-03-15" }
    ],
    docs: {
      groups: [
        docGroup("Getting Started", [["Introduction", "introduction"], ["Installation", "installation"], ["Hello World", "hello-world"]]),
        docGroup("Learn KoshLang", [["Variables", "variables"], ["Types", "types"], ["Functions", "functions"], ["Control Flow", "control-flow"], ["Pattern Matching", "pattern-matching"], ["Error Handling", "error-handling"], ["Concurrency", "concurrency", "new"]]),
        docGroup("Language Reference", [["Overview", "reference"], ["Grammar", "grammar"], ["Modules", "modules"], ["Traits", "traits"]]),
        docGroup("Standard Library", [["Overview", "stdlib"]]),
        docGroup("CLI", [["Overview", "cli"]]),
        docGroup("Guides", [["Project Layout", "project-layout"], ["Testing", "testing"], ["Publishing a Package", "publishing"]]),
        docGroup("Internals", [["Compiler", "compiler"], ["Intermediate Representation", "ir"]])
      ],
      stdlib: [
        { name: "String", kind: "type", summary: "An immutable sequence of Unicode characters." },
        { name: "List", kind: "type", summary: "A growable, ordered collection of values of a single type." },
        { name: "Map", kind: "type", summary: "An unordered collection of key-value pairs." },
        { name: "json", kind: "module", summary: "Encode and decode JSON, with a streaming parser for large inputs." }
      ],
      cliCommands: [
        { name: "kosh build", summary: "Build the current KoshLang project.", usage: "kosh build [OPTIONS]" },
        { name: "kosh run", summary: "Compile and run the current project.", usage: "kosh run [OPTIONS] [-- ARGS]" },
        { name: "kosh test", summary: "Run the project test suite.", usage: "kosh test [OPTIONS] [FILTER]" },
        { name: "kosh add", summary: "Add a dependency to the current project.", usage: "kosh add <PACKAGE>[@VERSION]" },
        { name: "kosh fmt", summary: "Format source files in place.", usage: "kosh fmt [OPTIONS] [PATHS]" }
      ]
    },
    tools: {
      featured: [
        tool("vscode", "VS Code", "grid", "Official extension with full language support.", "Available", ["Syntax highlighting", "Inlay hints", "Go to definition", "Refactorings"]),
        tool("lsp", "Kosh LSP", "compiler", "The language server that powers every editor.", "Available", ["Diagnostics", "Completions", "Hover docs", "Rename"]),
        tool("formatter", "Formatter", "terminal", "Deterministic formatting, zero configuration.", "Available", ["Format on save", "CI check mode", "Idempotent output"]),
        tool("debugger", "Debugger", "cpu", "DAP-based debugging with breakpoints and stepping.", "Beta", ["Breakpoints", "Step in/out", "Watch expressions"])
      ],
      communityIntegrations: ["JetBrains", "Neovim", "Vim", "Zed", "Emacs", "Sublime"]
    },
    community: {
      areas: [
        { icon: "github", title: "GitHub", body: "Source, issues and pull requests across all repositories.", cta: "Open GitHub", href: "https://github.com" },
        { icon: "users", title: "Discussions", body: "Ask questions and share what you are building.", cta: "Browse discussions", href: "/community" },
        { icon: "branch", title: "RFCs", body: "Propose and debate changes to the language.", cta: "View RFCs", href: "/governance" },
        { icon: "book", title: "Events", body: "Community calls, meetups and talks.", cta: "See events", href: "/community" }
      ],
      codeOfConduct: "We are committed to a welcoming, harassment-free community. All participation is governed by our Code of Conduct."
    },
    contribute: {
      routes: [
        { icon: "compiler", title: "Compiler", description: "Rust-based compiler and codegen. Good for systems programmers." },
        { icon: "module", title: "Standard Library", description: "Core types and modules written in KoshLang." },
        { icon: "docs", title: "Documentation", description: "Guides, references and examples. Great first contribution." },
        { icon: "cpu", title: "Tooling", description: "LSP, formatter, debugger and editor extensions." },
        { icon: "grid", title: "Website", description: "This site - React, accessible, design-system driven." },
        { icon: "package", title: "Packages", description: "Publish and maintain community libraries." }
      ],
      setupCommands: ["git clone https://github.com/koshlang/kosh", "cd kosh && ./bootstrap build", "kosh test"]
    },
    governance: {
      sections: [
        { title: "Maintainers", description: "A team of core maintainers stewards each subsystem." },
        { title: "Decision process", description: "Substantial changes go through the RFC process; day-to-day changes via review." },
        { title: "Working groups", description: "Language, Compiler, Runtime and Tooling groups own their areas." },
        { title: "Language evolution", description: "Backwards compatibility within a major version is a priority." }
      ]
    },
    security: {
      supportedVersions: [
        { version: "1.4.x", status: "Supported" },
        { version: "1.3.x", status: "Security fixes only" },
        { version: "<= 1.2", status: "End of life" }
      ],
      verifyCommand: "kosh verify koshlang-1.4.0.tar.gz --sig koshlang-1.4.0.sig",
      advisories: "No active advisories at this time."
    },
    about: {
      body: [
        "KoshLang is a fictional programming language created to explore the design of a complete developer platform - from the language's visual identity to its documentation, playground and package registry.",
        "The goal is a coherent, calm, developer-first experience where code itself is the centerpiece and every surface feels part of one system."
      ],
      principles: [
        { title: "Clarity over cleverness", description: "The interface should be understood before it is read." },
        { title: "Code is the identity", description: "Beautiful code surfaces, everywhere." },
        { title: "Honest by default", description: "No invented metrics; unreleased things say so." },
        { title: "Coherence across surfaces", description: "Docs, playground and registry feel like one product." }
      ]
    },
    status: {
      summary: "All systems operational",
      services: [
        { name: "Website", status: "Operational" },
        { name: "Documentation", status: "Operational" },
        { name: "Downloads", status: "Operational" },
        { name: "Package Registry", status: "Not yet available" },
        { name: "Playground", status: "Operational" },
        { name: "API", status: "Operational" }
      ],
      incidents: [{ status: "Resolved", date: "2026-07-06", description: "Elevated download latency for ~40 minutes. No data affected." }]
    }
  }
} as const;

export function getWebsiteCmsPage(path: string): CmsPageSeed | undefined {
  return websiteCmsSeed.pages.find((seedPage) => seedPage.seo.path === path);
}

function links(rows: [string, string][]): CmsLink[] {
  return rows.map(([label, href]) => ({ label, href }));
}

function page(path: string, title: string, description: string): CmsPageSeed {
  return {
    slug: path === "/" ? "home" : path.slice(1),
    title,
    description,
    phase: "phase-2-main-website",
    source: "copied-frontend",
    seo: { path, title, description }
  };
}

function principle(icon: string, title: string, body: string) {
  return { icon, title, body };
}

function codeExample(title: string, description: string, code: string) {
  return { title, description, code };
}

function release(version: string, channel: string, date: string, highlights: string[], platforms: string[]) {
  return { version, channel, date, highlights, platforms };
}

function pkg(name: string, version: string, summary: string, verified: boolean, updated: string, compat: string, category: string, deprecated?: boolean) {
  return { name, version, summary, verified, updated, compat, category, ...(deprecated ? { deprecated } : {}) };
}

function example(slug: string, title: string, category: string, summary: string, code: string) {
  return { slug, title, category, summary, code };
}

function post(slug: string, title: string, category: string, summary: string, author: string, date: string, readingTime: string) {
  return { slug, title, category, summary, author, date, readingTime };
}

function roadmapArea(area: string, rows: [string, string, string][]) {
  return {
    area,
    items: rows.map(([title, status, note]) => ({ title, status, note }))
  };
}

function docGroup(title: string, items: [string, string, string?][]) {
  return {
    title,
    items: items.map(([itemTitle, slug, badge]) => ({ title: itemTitle, slug, ...(badge ? { badge } : {}) }))
  };
}

function tool(slug: string, name: string, icon: string, tagline: string, status: string, capabilities: string[]) {
  return { slug, name, icon, tagline, status, capabilities };
}
