import { useState } from 'react'
import { Link, useParams } from 'react-router'
import { Icon } from '../components/Icon'
import { Button } from '../components/ui/Button'
import { Container, PageHeader, Breadcrumb } from '../components/ui/layout'
import { Badge, Card, Eyebrow } from '../components/ui/primitives'
import { SegmentedControl } from '../components/ui/controls'
import { InstallCommand } from '../components/dev/InstallCommand'
import { CopyButton } from '../components/dev/CodeBlock'
import { releases, type Channel } from '../data/content'

function channelTone(c: Channel) {
  return c === 'stable' ? 'success' : c === 'beta' ? 'warning' : 'info'
}

export function Releases() {
  const [filter, setFilter] = useState<Channel | 'all'>('all')
  const list = releases.filter((r) => filter === 'all' || r.channel === filter)

  return (
    <>
      <PageHeader
        eyebrow={<Eyebrow icon="version">Releases</Eyebrow>}
        title="KoshLang Releases"
        description="Every release, across every channel. Stable is recommended for production; beta and nightly are for early testing."
      >
        <SegmentedControl<Channel | 'all'>
          value={filter}
          onChange={setFilter}
          options={[
            { value: 'all', label: 'All' },
            { value: 'stable', label: 'Stable' },
            { value: 'beta', label: 'Beta' },
            { value: 'nightly', label: 'Nightly' },
          ]}
        />
      </PageHeader>

      <Container className="py-14">
        <div className="space-y-4">
          {list.map((r) => (
            <Card key={r.version} interactive className="p-6">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-3">
                    <Link to={`/releases/${r.version}`} className="font-mono text-xl font-semibold text-foreground hover:text-accent">
                      KoshLang {r.version}
                    </Link>
                    <Badge tone={channelTone(r.channel)}>{r.channel}</Badge>
                  </div>
                  <p className="mt-1 font-mono text-xs text-subtle">Released {r.date}</p>
                  <ul className="mt-4 space-y-1.5 text-sm text-muted">
                    {r.highlights.map((h) => (
                      <li key={h} className="flex gap-2">
                        <Icon name="check" size={15} className="mt-0.5 shrink-0 text-[var(--success)]" /> {h}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {r.platforms.map((p) => (
                      <Badge key={p}>{p}</Badge>
                    ))}
                  </div>
                </div>
                <Button to={`/releases/${r.version}`} variant="secondary" size="sm">
                  Release notes <Icon name="arrow-right" size={15} />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </>
  )
}

const detailSections = [
  'Highlights',
  'Breaking Changes',
  'Compiler',
  'Standard Library',
  'Tooling',
  'Performance',
  'Bug Fixes',
  'Known Issues',
  'Migration',
]

export function ReleaseDetail() {
  const { version } = useParams()
  const release = releases.find((r) => r.version === version) ?? releases[0]

  return (
    <Container className="py-12" size="narrow">
      <Breadcrumb items={[{ label: 'Releases', to: '/releases' }, { label: release.version }]} />
      <div className="mt-6 flex flex-wrap items-center gap-3">
        <h1 className="font-mono text-3xl font-semibold tracking-tight text-foreground">
          KoshLang {release.version}
        </h1>
        <Badge tone={channelTone(release.channel)}>{release.channel}</Badge>
      </div>
      <p className="mt-2 font-mono text-sm text-subtle">Released {release.date}</p>

      <div className="mt-8 space-y-8">
        {detailSections.map((section) => (
          <section key={section}>
            <h2 className="border-b border-border pb-2 text-lg font-semibold text-foreground">{section}</h2>
            {section === 'Highlights' ? (
              <ul className="mt-4 space-y-2 text-muted">
                {release.highlights.map((h) => (
                  <li key={h} className="flex gap-2">
                    <Icon name="check" size={16} className="mt-0.5 shrink-0 text-[var(--success)]" /> {h}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-4 text-muted">
                {section === 'Breaking Changes'
                  ? 'No breaking changes in this release.'
                  : `Illustrative placeholder notes for the ${section.toLowerCase()} section of this release.`}
              </p>
            )}
          </section>
        ))}

        <section>
          <h2 className="border-b border-border pb-2 text-lg font-semibold text-foreground">Downloads</h2>
          <div className="mt-4 space-y-3">
            <InstallCommand command={`brew install koshlang@${release.version}`} />
            {release.platforms.map((p) => (
              <div key={p} className="flex items-center justify-between rounded-[10px] border border-border bg-surface px-4 py-3">
                <span className="text-sm text-foreground">{p} · x86-64 / ARM64</span>
                <Button size="sm" variant="secondary"><Icon name="download" size={15} /> Download</Button>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="border-b border-border pb-2 text-lg font-semibold text-foreground">Checksums</h2>
          <div className="mt-4 flex items-center gap-2 rounded-[10px] border border-border bg-[var(--surface-code)] px-4 py-3">
            <code className="min-w-0 flex-1 truncate font-mono text-sm text-muted">
              SHA-256: e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
            </code>
            <CopyButton text="e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855" label="" />
          </div>
        </section>
      </div>
    </Container>
  )
}
