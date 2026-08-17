import { Link } from 'react-router'
import { Icon } from '../components/Icon'
import { Button } from '../components/ui/Button'
import { Container, Section } from '../components/ui/layout'
import { Badge, Card, Eyebrow } from '../components/ui/primitives'
import { CodeHero } from '../components/dev/CodeHero'
import { CodeBlock, CopyButton } from '../components/dev/CodeBlock'
import { InstallCommand } from '../components/dev/InstallCommand'
import {
  principles,
  codeExamples,
  releases,
  packages,
  KOSH_VERSION,
} from '../data/content'

export function Home() {
  return (
    <>
      {/* Hero */}
      <div className="relative overflow-hidden border-b border-border">
        <div className="pointer-events-none absolute inset-0 grain opacity-60" />
        <Container className="relative py-16 md:py-24">
          <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)]">
            <div>
              <Badge tone="accent" icon="sparkles" className="mb-6">
                KoshLang {KOSH_VERSION} is here
              </Badge>
              <h1 className="text-balance text-5xl font-semibold leading-[1.03] tracking-tight text-foreground md:text-[4.25rem]">
                Programming,{' '}
                <span className="text-accent">thoughtfully designed.</span>
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
                A modern programming language built for simplicity, performance and
                productive development — with a complete toolchain in the box.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Button to="/download" size="lg">
                  <Icon name="download" size={17} /> Download KoshLang
                </Button>
                <Button to="/play" size="lg" variant="secondary">
                  <Icon name="playground" size={17} /> Try Online
                </Button>
              </div>
              <div className="mt-6 max-w-md">
                <InstallCommand command="brew install koshlang" />
              </div>
            </div>

            <div className="relative">
              <CodeHero />
            </div>
          </div>
        </Container>
      </div>

      {/* Trust strip */}
      <div className="border-b border-border bg-background-subtle">
        <Container className="flex flex-wrap items-center justify-center gap-x-10 gap-y-3 py-6 text-sm text-subtle">
          <span className="font-mono">Ahead-of-time compiled</span>
          <span className="hidden h-1 w-1 rounded-full bg-border-strong sm:inline-block" />
          <span className="font-mono">Type inference</span>
          <span className="hidden h-1 w-1 rounded-full bg-border-strong sm:inline-block" />
          <span className="font-mono">Errors as values</span>
          <span className="hidden h-1 w-1 rounded-full bg-border-strong sm:inline-block" />
          <span className="font-mono">Structured concurrency</span>
          <span className="hidden h-1 w-1 rounded-full bg-border-strong sm:inline-block" />
          <span className="font-mono">Batteries-included tooling</span>
        </Container>
      </div>

      {/* Why KoshLang / principles */}
      <Section bordered>
        <Container>
          <div className="max-w-2xl">
            <Eyebrow icon="bolt">Why KoshLang</Eyebrow>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
              A language that respects your time
            </h2>
            <p className="mt-4 text-lg text-muted">
              The sophistication is in the defaults, not the ceremony. Every feature earns
              its place by removing a decision you shouldn’t have to make.
            </p>
          </div>
          <div className="mt-12 grid gap-px overflow-hidden rounded-[16px] border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
            {principles.map((p) => (
              <div key={p.title} className="bg-background p-6 transition-colors hover:bg-surface-hover">
                <div className="grid size-10 place-items-center rounded-[10px] bg-[var(--accent-subtle)] text-accent">
                  <Icon name={p.icon} size={20} />
                </div>
                <h3 className="mt-4 font-semibold text-foreground">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{p.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Code examples — alternating layout for rhythm */}
      <Section subtle bordered>
        <Container>
          <div className="mb-12 flex flex-wrap items-end justify-between gap-4">
            <div className="max-w-xl">
              <Eyebrow icon="terminal">Code is the identity</Eyebrow>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
                Read it, and you already understand it
              </h2>
            </div>
            <Button to="/examples" variant="outline">
              Browse all examples <Icon name="arrow-right" size={16} />
            </Button>
          </div>
          <div className="space-y-6">
            {codeExamples.map((ex, i) => (
              <Card key={ex.title} className="grid items-center gap-6 p-6 md:grid-cols-2 md:p-8">
                <div className={i % 2 === 1 ? 'md:order-2' : ''}>
                  <h3 className="text-xl font-semibold text-foreground">{ex.title}</h3>
                  <p className="mt-2 text-muted">{ex.description}</p>
                  <Link
                    to="/play"
                    className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:underline"
                  >
                    <Icon name="play" size={13} /> Open in Playground
                  </Link>
                </div>
                <CodeBlock code={ex.code} filename={`${ex.title.toLowerCase().replace(/\s+/g, '-')}.kosh`} />
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* Tooling + cross-platform split */}
      <Section bordered>
        <Container>
          <div className="grid gap-6 lg:grid-cols-2">
            <Card className="flex flex-col p-8">
              <Eyebrow icon="cpu">One toolchain</Eyebrow>
              <h3 className="mt-3 text-2xl font-semibold tracking-tight text-foreground">
                Everything ships together
              </h3>
              <p className="mt-3 text-muted">
                Formatter, language server, package manager, test runner and docs
                generator — installed with the compiler, configured by convention.
              </p>
              <div className="mt-6 space-y-2 font-mono text-sm">
                {['kosh build', 'kosh test --watch', 'kosh fmt', 'kosh add kosh-http'].map((c) => (
                  <div key={c} className="flex items-center gap-2 text-muted">
                    <Icon name="chevron-right" size={14} className="text-accent" /> {c}
                  </div>
                ))}
              </div>
              <Button to="/docs/cli" variant="secondary" className="mt-auto self-start pt-4">
                CLI reference <Icon name="arrow-right" size={16} />
              </Button>
            </Card>

            <Card className="flex flex-col p-8">
              <Eyebrow icon="grid">Cross-platform</Eyebrow>
              <h3 className="mt-3 text-2xl font-semibold tracking-tight text-foreground">
                Build once, target anywhere
              </h3>
              <p className="mt-3 text-muted">
                First-class support for macOS, Linux and Windows across x86-64,
                ARM64 and Apple Silicon.
              </p>
              <div className="mt-6 grid grid-cols-3 gap-3">
                {['macOS', 'Linux', 'Windows'].map((os) => (
                  <div key={os} className="rounded-[10px] border border-border bg-background-subtle p-4 text-center">
                    <p className="text-sm font-medium text-foreground">{os}</p>
                    <p className="mt-1 font-mono text-xs text-subtle">x64 · arm64</p>
                  </div>
                ))}
              </div>
              <Button to="/download" variant="secondary" className="mt-auto self-start pt-4">
                Download builds <Icon name="arrow-right" size={16} />
              </Button>
            </Card>
          </div>
        </Container>
      </Section>

      {/* Performance — honest, illustrative, no invented numbers */}
      <Section subtle bordered>
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <Eyebrow icon="bolt">Performance</Eyebrow>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
                Predictable, ahead-of-time
              </h2>
              <p className="mt-4 text-lg text-muted">
                KoshLang compiles to native code with a lean runtime and no
                stop-the-world pauses in the hot path. Incremental compilation keeps
                rebuilds fast as projects grow.
              </p>
              <p className="mt-4 text-sm text-subtle">
                Benchmark figures are intentionally omitted — KoshLang is a design
                concept, and we don’t publish numbers we can’t reproduce.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: 'bolt', k: 'Startup', v: 'No warm-up' },
                { icon: 'cpu', k: 'Runtime', v: 'Lean, native' },
                { icon: 'refresh', k: 'Rebuilds', v: 'Incremental' },
                { icon: 'shield', k: 'Memory', v: 'No GC pauses' },
              ].map((s) => (
                <Card key={s.k} className="p-5">
                  <Icon name={s.icon as never} size={20} className="text-accent" />
                  <p className="mt-3 text-sm text-subtle">{s.k}</p>
                  <p className="text-lg font-semibold text-foreground">{s.v}</p>
                </Card>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* Package ecosystem preview */}
      <Section bordered>
        <Container>
          <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
            <div className="max-w-xl">
              <Eyebrow icon="package">Ecosystem</Eyebrow>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
                Small, focused packages
              </h2>
            </div>
            <Button to="/pkg" variant="outline">
              Explore packages <Icon name="arrow-right" size={16} />
            </Button>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {packages.slice(0, 6).map((p) => (
              <Link key={p.name} to={`/pkg/${p.name}`}>
                <Card interactive className="h-full p-5">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-sm font-semibold text-foreground">{p.name}</span>
                    {p.verified && <Badge tone="info" icon="shield">Verified</Badge>}
                  </div>
                  <p className="mt-2 text-sm text-muted">{p.summary}</p>
                  <p className="mt-3 font-mono text-xs text-subtle">v{p.version} · {p.compat}</p>
                </Card>
              </Link>
            ))}
          </div>
        </Container>
      </Section>

      {/* Learn + docs preview */}
      <Section subtle bordered>
        <Container>
          <div className="grid gap-6 lg:grid-cols-[1fr_1.1fr]">
            <div>
              <Eyebrow icon="book">Learn</Eyebrow>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
                Documentation built for reading
              </h2>
              <p className="mt-4 text-lg text-muted">
                From your first program to compiler internals — clear hierarchy,
                excellent typography, and code you can run in one click.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button to="/docs">Read the docs</Button>
                <Button to="/docs/stdlib" variant="secondary">Standard library</Button>
              </div>
            </div>
            <Card className="overflow-hidden">
              <div className="flex items-center gap-2 border-b border-border px-4 py-2.5 text-sm text-muted">
                <Icon name="docs" size={15} className="text-accent" /> docs.koshlang.com / functions
              </div>
              <div className="p-6">
                <h4 className="text-lg font-semibold text-foreground"># Functions</h4>
                <p className="mt-2 text-sm text-muted">
                  Functions are the primary unit of computation in KoshLang. They are
                  declared with the fn keyword…
                </p>
                <CodeBlock className="mt-4" showLineNumbers={false} code={`fn add(a: Int, b: Int) -> Int {\n    return a + b\n}`} />
              </div>
            </Card>
          </div>
        </Container>
      </Section>

      {/* Latest releases */}
      <Section bordered>
        <Container>
          <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
            <div>
              <Eyebrow icon="version">Releases</Eyebrow>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
                Shipping in the open
              </h2>
            </div>
            <Button to="/releases" variant="outline">
              All releases <Icon name="arrow-right" size={16} />
            </Button>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {releases.slice(0, 3).map((r) => (
              <Link key={r.version} to={`/releases/${r.version}`}>
                <Card interactive className="h-full p-6">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-lg font-semibold text-foreground">{r.version}</span>
                    <Badge tone={r.channel === 'stable' ? 'success' : r.channel === 'beta' ? 'warning' : 'info'}>
                      {r.channel}
                    </Badge>
                  </div>
                  <p className="mt-1 font-mono text-xs text-subtle">{r.date}</p>
                  <ul className="mt-4 space-y-1.5 text-sm text-muted">
                    {r.highlights.slice(0, 2).map((h) => (
                      <li key={h} className="flex gap-2">
                        <Icon name="check" size={15} className="mt-0.5 shrink-0 text-[var(--success)]" /> {h}
                      </li>
                    ))}
                  </ul>
                </Card>
              </Link>
            ))}
          </div>
        </Container>
      </Section>

      {/* Community + contribution */}
      <Section subtle bordered>
        <Container>
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="flex flex-col justify-between p-8">
              <div>
                <Eyebrow icon="users">Community</Eyebrow>
                <h3 className="mt-3 text-2xl font-semibold tracking-tight text-foreground">
                  Built with the people who use it
                </h3>
                <p className="mt-3 text-muted">
                  Discussions, RFCs, events and community projects — join the people
                  shaping KoshLang’s direction.
                </p>
              </div>
              <Button to="/community" variant="secondary" className="mt-6 self-start">
                Join the community <Icon name="arrow-right" size={16} />
              </Button>
            </Card>
            <Card className="flex flex-col justify-between p-8">
              <div>
                <Eyebrow icon="branch">Open source</Eyebrow>
                <h3 className="mt-3 text-2xl font-semibold tracking-tight text-foreground">
                  Contribute to the language
                </h3>
                <p className="mt-3 text-muted">
                  Compiler, standard library, docs, tooling or the website — there’s a
                  path in for every kind of contributor.
                </p>
              </div>
              <Button to="/contribute" variant="secondary" className="mt-6 self-start">
                Start contributing <Icon name="arrow-right" size={16} />
              </Button>
            </Card>
          </div>
        </Container>
      </Section>

      {/* Final CTA */}
      <Section>
        <Container>
          <div className="relative overflow-hidden rounded-[24px] border border-border bg-foreground px-6 py-16 text-center md:py-20">
            <div className="pointer-events-none absolute inset-0 grain opacity-30" />
            <div className="relative">
              <h2 className="mx-auto max-w-2xl text-balance text-3xl font-semibold tracking-tight text-background md:text-4xl">
                Start writing KoshLang today
              </h2>
              <p className="mx-auto mt-4 max-w-lg text-[color-mix(in_srgb,var(--background)_70%,transparent)]">
                Install in seconds, or try it instantly in your browser.
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <Button to="/download" size="lg">
                  <Icon name="download" size={17} /> Download {KOSH_VERSION}
                </Button>
                <Button to="/play" size="lg" variant="secondary">
                  Open the Playground
                </Button>
              </div>
              <div className="mx-auto mt-8 flex max-w-sm items-center justify-center gap-2 rounded-[10px] border border-[color-mix(in_srgb,var(--background)_20%,transparent)] px-4 py-2.5 font-mono text-sm text-background">
                <span className="text-accent">$</span> brew install koshlang
                <CopyButton text="brew install koshlang" className="ml-auto text-background hover:bg-white/10" />
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  )
}
