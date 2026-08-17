import { useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router'
import { Icon, type IconName } from '../components/Icon'
import { Button } from '../components/ui/Button'
import { Container, PageHeader, Section } from '../components/ui/layout'
import { Badge, Card, Eyebrow, StatusDot, Divider } from '../components/ui/primitives'
import { Input } from '../components/ui/controls'
import { Alert, EmptyState } from '../components/ui/feedback'
import { InstallCommand } from '../components/dev/InstallCommand'
import {
  roadmap,
  rfcs,
  posts,
  packages,
  examples,
  type RoadmapStatus,
} from '../data/content'
import { docsTree, stdlib, cliCommands } from '../data/docs'

/* ---- Roadmap -------------------------------------------------------------- */
const statusTone: Record<RoadmapStatus, 'neutral' | 'accent' | 'success' | 'warning' | 'info' | 'error'> = {
  Exploring: 'neutral',
  Planned: 'info',
  'In Progress': 'accent',
  Beta: 'warning',
  Shipped: 'success',
  Paused: 'error',
}
export function Roadmap() {
  return (
    <>
      <PageHeader
        eyebrow={<Eyebrow icon="map">Roadmap</Eyebrow>}
        title="Public Roadmap"
        description="Where KoshLang is headed, organized by area. Status reflects direction, not commitments or dates."
      />
      <Container className="py-14">
        <div className="mb-8 flex flex-wrap gap-2">
          {(Object.keys(statusTone) as RoadmapStatus[]).map((s) => (
            <span key={s} className="inline-flex items-center gap-1.5 text-sm text-muted">
              <StatusDot tone={statusTone[s]} /> {s}
            </span>
          ))}
        </div>
        <div className="space-y-10">
          {roadmap.map((area) => (
            <div key={area.area}>
              <h2 className="mb-4 flex items-center gap-2 text-xl font-semibold text-foreground">
                <Icon name="module" size={18} className="text-accent" /> {area.area}
              </h2>
              <div className="grid gap-3 md:grid-cols-3">
                {area.items.map((item) => (
                  <Card key={item.title} className="p-5">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="font-medium text-foreground">{item.title}</h3>
                      <Badge tone={statusTone[item.status]}>{item.status}</Badge>
                    </div>
                    <p className="mt-2 text-sm text-muted">{item.note}</p>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </>
  )
}

/* ---- Community ------------------------------------------------------------ */
export function Community() {
  const areas: { icon: IconName; title: string; body: string; cta: string; to: string }[] = [
    { icon: 'github', title: 'GitHub', body: 'Source, issues and pull requests across all repositories.', cta: 'Open GitHub', to: 'https://github.com' },
    { icon: 'users', title: 'Discussions', body: 'Ask questions and share what you’re building.', cta: 'Browse discussions', to: '/community' },
    { icon: 'branch', title: 'RFCs', body: 'Propose and debate changes to the language.', cta: 'View RFCs', to: '/governance' },
    { icon: 'book', title: 'Events', body: 'Community calls, meetups and talks.', cta: 'See events', to: '/community' },
  ]
  return (
    <>
      <PageHeader
        eyebrow={<Eyebrow icon="users">Community</Eyebrow>}
        title="Join the community"
        description="KoshLang is built in the open with the people who use it. Everyone is welcome."
      />
      <Container className="py-14">
        <div className="grid gap-4 sm:grid-cols-2">
          {areas.map((a) => (
            <Card key={a.title} className="flex flex-col p-6">
              <div className="grid size-11 place-items-center rounded-[12px] bg-[var(--accent-subtle)] text-accent">
                <Icon name={a.icon} size={22} />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-foreground">{a.title}</h3>
              <p className="mt-1 flex-1 text-sm text-muted">{a.body}</p>
              <Button to={a.to} variant="secondary" size="sm" className="mt-4 self-start">{a.cta}</Button>
            </Card>
          ))}
        </div>
        <Divider className="my-12" label="Code of Conduct" />
        <Card className="p-6 text-center">
          <p className="mx-auto max-w-xl text-muted">
            We are committed to a welcoming, harassment-free community. All participation
            is governed by our Code of Conduct.
          </p>
          <Button variant="secondary" size="sm" className="mt-4">Read the Code of Conduct</Button>
        </Card>
      </Container>
    </>
  )
}

/* ---- Contribute ----------------------------------------------------------- */
export function Contribute() {
  const routes: { icon: IconName; title: string; desc: string }[] = [
    { icon: 'compiler', title: 'Compiler', desc: 'Rust-based compiler and codegen. Good for systems programmers.' },
    { icon: 'module', title: 'Standard Library', desc: 'Core types and modules written in KoshLang.' },
    { icon: 'docs', title: 'Documentation', desc: 'Guides, references and examples. Great first contribution.' },
    { icon: 'cpu', title: 'Tooling', desc: 'LSP, formatter, debugger and editor extensions.' },
    { icon: 'grid', title: 'Website', desc: 'This site — React, accessible, design-system driven.' },
    { icon: 'package', title: 'Packages', desc: 'Publish and maintain community libraries.' },
  ]
  return (
    <>
      <PageHeader
        eyebrow={<Eyebrow icon="branch">Contribute</Eyebrow>}
        title="Choose how you want to contribute"
        description="Every kind of contribution matters. Pick an area to see prerequisites, the repository, and the workflow."
      />
      <Container className="py-14">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {routes.map((r) => (
            <Card key={r.title} interactive className="p-6">
              <div className="grid size-11 place-items-center rounded-[12px] bg-[var(--accent-subtle)] text-accent">
                <Icon name={r.icon} size={22} />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-foreground">{r.title}</h3>
              <p className="mt-1 text-sm text-muted">{r.desc}</p>
              <ul className="mt-4 space-y-1.5 text-sm text-muted">
                {['Prerequisites', 'Repository', 'Setup', 'Workflow', 'Standards'].map((s) => (
                  <li key={s} className="flex items-center gap-2"><Icon name="check" size={14} className="text-[var(--success)]" /> {s} documented</li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
        <Card className="mt-8 p-6">
          <h2 className="text-lg font-semibold text-foreground">Get set up</h2>
          <div className="mt-4 space-y-3">
            <InstallCommand command="git clone https://github.com/koshlang/kosh" />
            <InstallCommand command="cd kosh && ./bootstrap build" />
            <InstallCommand command="kosh test" />
          </div>
        </Card>
      </Container>
    </>
  )
}

/* ---- Governance + RFCs ---------------------------------------------------- */
export function Governance() {
  return (
    <>
      <PageHeader
        eyebrow={<Eyebrow icon="shield">Governance</Eyebrow>}
        title="Governance & RFCs"
        description="How KoshLang is stewarded, how decisions are made, and how the language evolves."
      />
      <Container className="py-14">
        <div className="grid gap-6 lg:grid-cols-[1fr_1.4fr]">
          <div className="space-y-4">
            {[
              ['Maintainers', 'A team of core maintainers stewards each subsystem.'],
              ['Decision process', 'Substantial changes go through the RFC process; day-to-day changes via review.'],
              ['Working groups', 'Language, Compiler, Runtime and Tooling groups own their areas.'],
              ['Language evolution', 'Backwards compatibility within a major version is a priority.'],
            ].map(([t, d]) => (
              <Card key={t} className="p-5">
                <h3 className="font-semibold text-foreground">{t}</h3>
                <p className="mt-1 text-sm text-muted">{d}</p>
              </Card>
            ))}
          </div>
          <div>
            <h2 className="mb-4 text-lg font-semibold text-foreground">Recent RFCs</h2>
            <div className="space-y-3">
              {rfcs.map((r) => (
                <Card key={r.id} interactive className="p-5">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="font-mono text-sm font-semibold text-accent">{r.id}</span>
                    <Badge tone={r.status === 'Shipped' ? 'success' : r.status === 'Accepted' ? 'info' : 'neutral'}>{r.status}</Badge>
                  </div>
                  <h3 className="mt-1 font-medium text-foreground">{r.title}</h3>
                  <p className="mt-1 font-mono text-xs text-subtle">Authors: {r.authors} · Updated {r.updated}</p>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </>
  )
}

/* ---- Security ------------------------------------------------------------- */
export function Security() {
  return (
    <>
      <PageHeader
        eyebrow={<Eyebrow icon="shield">Security</Eyebrow>}
        title="Security Center"
        description="Report vulnerabilities, verify releases, and review our security policy."
      />
      <Container className="py-14">
        <Alert tone="caution" title="Report a vulnerability" action={<Button size="sm">Report privately</Button>}>
          Please disclose security issues privately. Do not open public issues for vulnerabilities.
        </Alert>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <Card className="p-6">
            <h2 className="text-lg font-semibold text-foreground">Supported versions</h2>
            <table className="mt-4 w-full text-left text-sm">
              <tbody>
                {[['1.4.x', 'Supported'], ['1.3.x', 'Security fixes only'], ['≤ 1.2', 'End of life']].map(([v, s]) => (
                  <tr key={v} className="border-b border-border-subtle last:border-0">
                    <td className="py-2.5 font-mono text-foreground">{v}</td>
                    <td className="py-2.5 text-muted">{s}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
          <Card className="p-6">
            <h2 className="text-lg font-semibold text-foreground">Verify a release</h2>
            <p className="mt-2 text-sm text-muted">Every artifact is signed. Verify before installing.</p>
            <div className="mt-4"><InstallCommand command="kosh verify koshlang-1.4.0.tar.gz --sig koshlang-1.4.0.sig" /></div>
          </Card>
        </div>
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <Card className="p-6">
            <h2 className="text-lg font-semibold text-foreground">Security advisories</h2>
            <p className="mt-2 text-sm text-muted">No active advisories at this time.</p>
          </Card>
          <Card className="p-6">
            <h2 className="text-lg font-semibold text-foreground">Package security</h2>
            <p className="mt-2 text-sm text-muted">The registry scans dependencies and surfaces advisories on each package’s Security tab.</p>
          </Card>
        </div>
      </Container>
    </>
  )
}

/* ---- About ---------------------------------------------------------------- */
export function About() {
  return (
    <>
      <PageHeader
        eyebrow={<Eyebrow icon="sparkles">About</Eyebrow>}
        title="About KoshLang"
        description="A design concept for what a modern programming-language ecosystem could feel like."
      />
      <Container className="py-14" size="narrow">
        <div className="space-y-4 text-lg text-muted">
          <p>KoshLang is a fictional programming language created to explore the design of a complete developer platform — from the language’s visual identity to its documentation, playground and package registry.</p>
          <p>The goal is a coherent, calm, developer-first experience where code itself is the centerpiece and every surface feels part of one system.</p>
        </div>
        <Divider className="my-10" label="Principles" />
        <div className="grid gap-4 sm:grid-cols-2">
          {[
            ['Clarity over cleverness', 'The interface should be understood before it is read.'],
            ['Code is the identity', 'Beautiful code surfaces, everywhere.'],
            ['Honest by default', 'No invented metrics; unreleased things say so.'],
            ['Coherence across surfaces', 'Docs, playground and registry feel like one product.'],
          ].map(([t, d]) => (
            <Card key={t} className="p-5">
              <h3 className="font-semibold text-foreground">{t}</h3>
              <p className="mt-1 text-sm text-muted">{d}</p>
            </Card>
          ))}
        </div>
      </Container>
    </>
  )
}

/* ---- Status --------------------------------------------------------------- */
export function Status() {
  const services = [
    { name: 'Website', status: 'Operational' },
    { name: 'Documentation', status: 'Operational' },
    { name: 'Downloads', status: 'Operational' },
    { name: 'Package Registry', status: 'Not yet available' },
    { name: 'Playground', status: 'Operational' },
    { name: 'API', status: 'Operational' },
  ]
  return (
    <>
      <PageHeader
        eyebrow={<Eyebrow icon="bolt">Status</Eyebrow>}
        title="System Status"
      >
        <div className="inline-flex items-center gap-2.5 rounded-full border border-[color-mix(in_srgb,var(--success)_40%,transparent)] bg-[color-mix(in_srgb,var(--success)_10%,transparent)] px-4 py-2">
          <StatusDot tone="success" />
          <span className="font-medium text-foreground">All systems operational</span>
        </div>
      </PageHeader>
      <Container className="py-14" size="narrow">
        <Card className="divide-y divide-border">
          {services.map((s) => (
            <div key={s.name} className="flex items-center justify-between p-4">
              <span className="font-medium text-foreground">{s.name}</span>
              <span className="flex items-center gap-2 text-sm text-muted">
                <StatusDot tone={s.status === 'Operational' ? 'success' : 'neutral'} />
                {s.status}
              </span>
            </div>
          ))}
        </Card>

        <h2 className="mt-10 text-lg font-semibold text-foreground">Uptime (90 days)</h2>
        <div className="mt-3 flex gap-0.5">
          {Array.from({ length: 90 }).map((_, i) => (
            <span
              key={i}
              className="h-8 flex-1 rounded-[2px]"
              style={{ background: i === 42 ? 'var(--warning)' : 'color-mix(in srgb, var(--success) 70%, transparent)' }}
              title={i === 42 ? 'Degraded' : 'Operational'}
            />
          ))}
        </div>

        <h2 className="mt-10 text-lg font-semibold text-foreground">Past incidents</h2>
        <Card className="mt-3 p-5">
          <div className="flex items-center gap-2">
            <Badge tone="warning">Resolved</Badge>
            <span className="font-mono text-xs text-subtle">2026-07-06</span>
          </div>
          <p className="mt-2 text-sm text-muted">Elevated download latency for ~40 minutes. No data affected.</p>
        </Card>
      </Container>
    </>
  )
}

/* ---- Global search -------------------------------------------------------- */
type Hit = { label: string; group: string; to: string; icon: IconName; desc?: string }
export function GlobalSearch() {
  const [params, setParams] = useSearchParams()
  const [q, setQ] = useState(params.get('q') ?? '')

  const index = useMemo<Hit[]>(() => {
    const out: Hit[] = []
    docsTree.forEach((g) => g.items.forEach((i) => out.push({ label: i.title, group: 'Docs', to: '/docs/' + i.slug, icon: 'docs' })))
    stdlib.forEach((s) => out.push({ label: s.name, group: 'Standard Library', to: '/docs/stdlib/' + s.name.toLowerCase(), icon: 'module', desc: s.summary }))
    cliCommands.forEach((c) => out.push({ label: c.name, group: 'CLI', to: '/docs/cli/' + c.name.split(' ')[1], icon: 'terminal', desc: c.summary }))
    packages.forEach((p) => out.push({ label: p.name, group: 'Packages', to: '/pkg/' + p.name, icon: 'package', desc: p.summary }))
    examples.forEach((e) => out.push({ label: e.title, group: 'Examples', to: '/examples/' + e.slug, icon: 'playground', desc: e.summary }))
    posts.forEach((p) => out.push({ label: p.title, group: 'Blog', to: '/blog/' + p.slug, icon: 'book', desc: p.category }))
    return out
  }, [])

  const results = useMemo(
    () => (q ? index.filter((h) => (h.label + (h.desc ?? '')).toLowerCase().includes(q.toLowerCase())) : []),
    [q, index],
  )
  const grouped = useMemo(() => {
    const g: Record<string, Hit[]> = {}
    results.forEach((r) => (g[r.group] ??= []).push(r))
    return g
  }, [results])

  return (
    <Container className="py-12" size="narrow">
      <h1 className="text-3xl font-semibold tracking-tight text-foreground">Search KoshLang</h1>
      <p className="mt-2 text-muted">One search across docs, the standard library, CLI, packages, examples and the blog.</p>
      <div className="mt-6">
        <Input
          icon="search"
          autoFocus
          placeholder="Search everything…"
          value={q}
          onChange={(e) => {
            setQ(e.target.value)
            setParams(e.target.value ? { q: e.target.value } : {})
          }}
        />
      </div>

      <div className="mt-8">
        {!q && (
          <EmptyState icon="search" title="Search the entire ecosystem" description="Start typing to search docs, packages, CLI commands, examples and blog posts." />
        )}
        {q && results.length === 0 && (
          <EmptyState icon="search" title={`No results for “${q}”`} description="Try a different term or browse the documentation." action={<Button to="/docs" variant="secondary">Browse docs</Button>} />
        )}
        {Object.entries(grouped).map(([group, hits]) => (
          <div key={group} className="mb-8">
            <h2 className="mb-3 font-mono text-xs uppercase tracking-wider text-subtle">{group}</h2>
            <div className="space-y-2">
              {hits.map((h) => (
                <Link key={h.to} to={h.to}>
                  <Card interactive className="flex items-center gap-3 p-4">
                    <Icon name={h.icon} size={18} className="text-accent" />
                    <div className="min-w-0">
                      <p className="font-medium text-foreground">{h.label}</p>
                      {h.desc && <p className="truncate text-sm text-subtle">{h.desc}</p>}
                    </div>
                    <Icon name="arrow-right" size={16} className="ml-auto text-subtle" />
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Container>
  )
}
