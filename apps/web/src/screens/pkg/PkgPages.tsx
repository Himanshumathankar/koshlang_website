import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router'
import { Icon } from '../../components/Icon'
import { Button } from '../../components/ui/Button'
import { Container, PageHeader, Breadcrumb } from '../../components/ui/layout'
import { Badge, Card, Eyebrow, Divider } from '../../components/ui/primitives'
import { Input, SegmentedControl, Tabs, Checkbox } from '../../components/ui/controls'
import { Alert, EmptyState } from '../../components/ui/feedback'
import { InstallCommand } from '../../components/dev/InstallCommand'
import { packages, packageCategories, type Pkg } from '../../data/content'

function UnavailableNotice() {
  return (
    <Alert tone="warning" title="Registry preview">
      The Kosh package registry is not publicly available yet. Packages shown here are
      clearly-labeled sample data to demonstrate the experience — none are real.
    </Alert>
  )
}

function PkgRow({ p }: { p: Pkg }) {
  return (
    <Link to={`/pkg/${p.name}`}>
      <Card interactive className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-mono font-semibold text-foreground">{p.name}</span>
              <span className="font-mono text-xs text-subtle">v{p.version}</span>
              {p.verified && <Badge tone="info" icon="shield">Verified</Badge>}
              {p.deprecated && <Badge tone="error">Deprecated</Badge>}
            </div>
            <p className="mt-1.5 truncate text-sm text-muted">{p.summary}</p>
            <p className="mt-2 font-mono text-xs text-subtle">Updated {p.updated} · Compatible with {p.compat} · {p.category}</p>
          </div>
          <Icon name="chevron-right" size={18} className="mt-1 shrink-0 text-subtle" />
        </div>
      </Card>
    </Link>
  )
}

/* ---- Registry home -------------------------------------------------------- */
export function PkgHome() {
  return (
    <>
      <PageHeader
        eyebrow={<Eyebrow icon="package">Packages</Eyebrow>}
        title="Kosh Packages"
        description="Find libraries for KoshLang. Small, focused packages that combine cleanly."
      >
        <div className="max-w-xl">
          <Link to="/pkg/search">
            <div className="flex h-12 items-center gap-3 rounded-[12px] border border-border bg-surface px-4 text-subtle hover:border-border-strong">
              <Icon name="search" size={18} />
              <span>Search packages…</span>
            </div>
          </Link>
        </div>
      </PageHeader>

      <Container className="py-14">
        <div className="mb-6"><UnavailableNotice /></div>

        <div className="grid gap-10 lg:grid-cols-[2fr_1fr]">
          <div>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="flex items-center gap-2 text-lg font-semibold text-foreground">
                <Icon name="refresh" size={17} className="text-accent" /> Recently updated
              </h2>
              <Link to="/pkg/search" className="text-sm text-accent hover:underline">View all</Link>
            </div>
            <div className="space-y-3">
              {packages.filter((p) => !p.deprecated).slice(0, 5).map((p) => (
                <PkgRow key={p.name} p={p} />
              ))}
            </div>
          </div>

          <div>
            <h2 className="mb-4 text-lg font-semibold text-foreground">Categories</h2>
            <div className="flex flex-wrap gap-2">
              {packageCategories.map((c) => (
                <Link key={c} to="/pkg/search">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-3 py-1.5 text-sm text-muted hover:border-border-strong hover:text-foreground">
                    <Icon name="module" size={14} /> {c}
                  </span>
                </Link>
              ))}
            </div>

            <Divider className="my-8" />
            <h2 className="mb-3 text-lg font-semibold text-foreground">Publish a package</h2>
            <p className="text-sm text-muted">Share your library with the KoshLang community once the registry opens.</p>
            <div className="mt-4"><InstallCommand command="kosh publish" /></div>
          </div>
        </div>
      </Container>
    </>
  )
}

/* ---- Package search ------------------------------------------------------- */
type Sort = 'relevance' | 'downloads' | 'updated' | 'verified'
export function PkgSearch() {
  const [q, setQ] = useState('')
  const [sort, setSort] = useState<Sort>('relevance')
  const [verifiedOnly, setVerifiedOnly] = useState(false)
  const [cats, setCats] = useState<string[]>([])

  const results = useMemo(() => {
    let r = packages.filter((p) => (p.name + p.summary).toLowerCase().includes(q.toLowerCase()))
    if (verifiedOnly) r = r.filter((p) => p.verified)
    if (cats.length) r = r.filter((p) => cats.includes(p.category))
    if (sort === 'verified') r = [...r].sort((a, b) => Number(b.verified) - Number(a.verified))
    if (sort === 'updated') r = [...r].sort((a, b) => a.updated.localeCompare(b.updated))
    return r
  }, [q, sort, verifiedOnly, cats])

  const toggleCat = (c: string) =>
    setCats((prev) => (prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c]))

  return (
    <Container className="py-10">
      <Breadcrumb items={[{ label: 'Packages', to: '/pkg' }, { label: 'Search' }]} />
      <h1 className="mt-4 text-3xl font-semibold tracking-tight text-foreground">Search packages</h1>

      <div className="mt-6 grid gap-8 lg:grid-cols-[240px_1fr]">
        {/* filters */}
        <aside className="space-y-6">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-subtle">Sort by</p>
            <SegmentedControl<Sort>
              size="sm"
              value={sort}
              onChange={setSort}
              className="flex-wrap"
              options={[
                { value: 'relevance', label: 'Relevance' },
                { value: 'updated', label: 'Updated' },
                { value: 'verified', label: 'Verified' },
              ]}
            />
          </div>
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-subtle">Filter</p>
            <Checkbox checked={verifiedOnly} onChange={setVerifiedOnly} label="Verified publishers only" />
          </div>
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-subtle">Category</p>
            <div className="space-y-2">
              {packageCategories.map((c) => (
                <Checkbox key={c} checked={cats.includes(c)} onChange={() => toggleCat(c)} label={c} />
              ))}
            </div>
          </div>
        </aside>

        {/* results */}
        <div>
          <Input icon="search" placeholder="Search by name or keyword…" value={q} onChange={(e) => setQ(e.target.value)} />
          <p className="mt-3 text-sm text-subtle">{results.length} package{results.length === 1 ? '' : 's'}</p>
          <div className="mt-4 space-y-3">
            {results.length === 0 ? (
              <EmptyState
                icon="package"
                title="No packages found"
                description="Try a different search term, or clear your filters."
                action={
                  <Button variant="secondary" onClick={() => { setQ(''); setVerifiedOnly(false); setCats([]) }}>
                    Clear filters
                  </Button>
                }
              />
            ) : (
              results.map((p) => <PkgRow key={p.name} p={p} />)
            )}
          </div>
        </div>
      </div>
    </Container>
  )
}

/* ---- Package detail ------------------------------------------------------- */
type PkgTab = 'readme' | 'versions' | 'deps' | 'dependents' | 'security'
export function PkgDetail() {
  const { name } = useParams()
  const pkg = packages.find((p) => p.name === name) ?? packages[0]
  const [tab, setTab] = useState<PkgTab>('readme')

  return (
    <Container className="py-10">
      <Breadcrumb items={[{ label: 'Packages', to: '/pkg' }, { label: pkg.name }]} />

      {pkg.deprecated && (
        <div className="mt-4">
          <Alert tone="caution" title="This package is deprecated">
            {pkg.name} is no longer maintained. Consider migrating to a supported alternative such as kosh-http.
          </Alert>
        </div>
      )}

      <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_280px]">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="font-mono text-3xl font-semibold tracking-tight text-foreground">{pkg.name}</h1>
            <span className="font-mono text-sm text-subtle">v{pkg.version}</span>
            {pkg.verified ? (
              <Badge tone="info" icon="shield">Verified publisher</Badge>
            ) : (
              <Badge tone="warning">Unverified publisher</Badge>
            )}
          </div>
          <p className="mt-2 text-lg text-muted">{pkg.summary}</p>

          <div className="mt-5 max-w-md">
            <InstallCommand command={`kosh add ${pkg.name}`} />
          </div>

          <div className="mt-8">
            <Tabs<PkgTab>
              value={tab}
              onChange={setTab}
              tabs={[
                { value: 'readme', label: 'README' },
                { value: 'versions', label: 'Versions' },
                { value: 'deps', label: 'Dependencies' },
                { value: 'dependents', label: 'Dependents' },
                { value: 'security', label: 'Security' },
              ]}
            />
            <div className="py-6 text-muted">
              {tab === 'readme' && (
                <div className="space-y-4">
                  <p>{pkg.name} provides {pkg.summary.toLowerCase()} Illustrative placeholder README content follows.</p>
                  <InstallCommand command={`use ${pkg.name.replace(/-/g, '.')}`} prompt="" />
                  <p>See the documentation link in the sidebar for the full API reference.</p>
                </div>
              )}
              {tab === 'versions' && (
                <ul className="space-y-2">
                  {[pkg.version, '2.3.0', '2.2.1', '2.0.0'].map((v, i) => (
                    <li key={v} className="flex items-center justify-between rounded-[10px] border border-border px-4 py-2.5">
                      <span className="font-mono text-foreground">{v}</span>
                      <span className="flex items-center gap-2 text-sm text-subtle">
                        {i === 0 && <Badge tone="success">latest</Badge>}
                        {i === 3 && <Badge tone="error">yanked</Badge>}
                        {pkg.updated}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
              {tab === 'deps' && (
                <ul className="space-y-2 font-mono text-sm">
                  {['serde-kosh@^1.9', 'kosh-io@^0.4'].map((d) => (
                    <li key={d} className="flex items-center gap-2"><Icon name="package" size={15} className="text-accent" /> {d}</li>
                  ))}
                </ul>
              )}
              {tab === 'dependents' && (
                <p>Dependent-package data will appear once the registry is public.</p>
              )}
              {tab === 'security' && (
                <div className="space-y-3">
                  {pkg.verified ? (
                    <p className="flex items-center gap-2 text-[var(--success)]"><Icon name="shield" size={16} /> No known advisories for this package.</p>
                  ) : (
                    <Alert tone="warning" title="Unverified publisher">
                      This package’s publisher has not completed identity verification. Review the source before use.
                    </Alert>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        <aside className="space-y-4">
          <Card className="p-5 text-sm">
            {[
              ['Repository', 'github.com/…'],
              ['Documentation', 'docs link'],
              ['License', 'MIT'],
              ['Latest version', 'v' + pkg.version],
              ['Compatibility', pkg.compat],
              ['Package size', '142 KB'],
            ].map(([k, v]) => (
              <div key={k} className="flex items-center justify-between border-b border-border-subtle py-2 last:border-0">
                <span className="text-subtle">{k}</span>
                <span className="font-mono text-foreground">{v}</span>
              </div>
            ))}
          </Card>
          <Card className="p-5">
            <p className="text-sm font-medium text-foreground">Owners</p>
            <div className="mt-3 flex items-center gap-2">
              <span className="grid size-8 place-items-center rounded-full bg-accent text-xs font-semibold text-[var(--accent-contrast)]">KL</span>
              <span className="text-sm text-muted">koshlang-team</span>
            </div>
          </Card>
        </aside>
      </div>
    </Container>
  )
}
