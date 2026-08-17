export const koshVersion = "1.4.0";

export const principles = [
  {
    title: "Thoughtful by default",
    body: "Sensible defaults, explicit when it matters. The language stays quiet until you need precision, then gives you exact control."
  },
  {
    title: "Fast where it counts",
    body: "An ahead-of-time compiler boundary is planned with predictable performance and a lean runtime."
  },
  {
    title: "Safe without friction",
    body: "The public language claims stay limited until canonical reference data is connected."
  },
  {
    title: "Tooling in the box",
    body: "Formatter, language server, package manager, test runner and docs generator have dedicated product surfaces."
  },
  {
    title: "Composable modules",
    body: "Package registry screens are designed around small, focused libraries and explicit unavailable states."
  },
  {
    title: "Transparent internals",
    body: "Playground views are reserved for AST, output and diagnostics once the compiler service is configured."
  }
];

export const codeExamples = [
  {
    title: "Pattern matching",
    description: "Illustrative syntax sample for visual design only.",
    code: `enum Shape {
    Circle(Float)
    Rect(Float, Float)
}

fn area(s: Shape) -> Float {
    match s {
        Circle(r) => 3.14159 * r * r
        Rect(w, h) => w * h
    }
}`
  },
  {
    title: "Errors as values",
    description: "Fallible flow is shown as an illustrative design sample until language docs are canonical.",
    code: `fn read_config(path: String) -> Result<Config> {
    let text = fs.read_to_string(path)?
    let cfg = parse(text)?
    return Ok(cfg)
}`
  },
  {
    title: "Structured tasks",
    description: "Playground execution remains disabled until a compiler endpoint is configured.",
    code: `async fn fetch_all(urls: List<String>) -> List<Response> {
    let tasks = urls.map(fn(u) { spawn get(u) })
    return await join(tasks)
}`
  }
];

export const platformNotes = [
  ["Release data", "Connected through @koshlang/release-client"],
  ["Compiler execution", "Connected through @koshlang/compiler-client"],
  ["Package records", "Connected through @koshlang/registry-client"],
  ["Editorial content", "Owned by Payload CMS"]
];
