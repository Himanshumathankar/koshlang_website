import { useState } from 'react'
import { Icon, type IconName } from '../components/Icon'
import { Button } from '../components/ui/Button'
import { Container, PageHeader } from '../components/ui/layout'
import { Badge, Card, Eyebrow } from '../components/ui/primitives'
import { SegmentedControl } from '../components/ui/controls'
import { InstallCommand } from '../components/dev/InstallCommand'
import { CopyButton } from '../components/dev/CodeBlock'
import { KOSH_VERSION } from '../data/content'

type OS = 'macos' | 'windows' | 'linux' | 'source'
type Arch = 'apple' | 'arm64' | 'x64'

const osMeta: Record<OS, { label: string; icon: IconName; install: string }> = {
  macos: { label: 'macOS', icon: 'cpu', install: 'brew install koshlang' },
  windows: { label: 'Windows', icon: 'cpu', install: 'winget install KoshLang.Kosh' },
  linux: { label: 'Linux', icon: 'terminal', install: 'curl -fsSL https://kosh.sh | sh' },
  source: { label: 'Source', icon: 'branch', install: 'git clone https://github.com/koshlang/kosh' },
}

function artifact(os: OS, arch: Arch) {
  const ext = os === 'windows' ? 'zip' : 'tar.gz'
  const triple =
    os === 'macos'
      ? arch === 'apple'
        ? 'aarch64-apple-darwin'
        : 'x86_64-apple-darwin'
      : os === 'windows'
        ? 'x86_64-pc-windows-msvc'
        : arch === 'arm64'
          ? 'aarch64-unknown-linux-gnu'
          : 'x86_64-unknown-linux-gnu'
  return {
    filename: `koshlang-${KOSH_VERSION}-${triple}.${ext}`,
    format: ext === 'zip' ? 'ZIP archive' : 'gzip tarball',
    size: '28.4 MB',
    sha: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
    signature: 'koshlang-' + KOSH_VERSION + '.sig',
    date: '2026-07-28',
  }
}

export function Download() {
  const [os, setOs] = useState<OS>('macos')
  const [arch, setArch] = useState<Arch>('apple')
  const a = artifact(os, arch)
  const archOptions =
    os === 'macos'
      ? [
          { value: 'apple' as Arch, label: 'Apple Silicon' },
          { value: 'x64' as Arch, label: 'Intel (x86-64)' },
        ]
      : os === 'linux'
        ? [
            { value: 'x64' as Arch, label: 'x86-64' },
            { value: 'arm64' as Arch, label: 'ARM64' },
          ]
        : [{ value: 'x64' as Arch, label: 'x86-64' }]

  return (
    <>
      <PageHeader
        eyebrow={<Eyebrow icon="download">Download</Eyebrow>}
        title="Download KoshLang"
        description="Choose a build for your platform, or use a package manager. Every artifact is signed and checksummed."
      />
      <Container className="py-14">
        {/* Recommended */}
        <div className="grid gap-6 lg:grid-cols-[1.3fr_1fr]">
          <Card className="p-8">
            <div className="flex items-center gap-2 text-sm text-subtle">
              <Icon name="check" size={16} className="text-[var(--success)]" />
              Recommended for your system
            </div>
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <h2 className="text-2xl font-semibold text-foreground">macOS · Apple Silicon</h2>
              <Badge tone="success">Detected</Badge>
            </div>
            <p className="mt-1 font-mono text-sm text-subtle">KoshLang {KOSH_VERSION}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button size="lg" onClick={() => setOs('macos')}>
                <Icon name="download" size={17} /> Download for macOS
              </Button>
              <span className="text-sm text-subtle">28.4 MB · .tar.gz · signed</span>
            </div>
            <p className="mt-6 mb-2 text-sm font-medium text-foreground">Or install with Homebrew</p>
            <InstallCommand command="brew install koshlang" />
          </Card>

          <Card className="p-8">
            <Eyebrow icon="shield">Verify your download</Eyebrow>
            <p className="mt-3 text-sm text-muted">
              Confirm the archive matches its published checksum before extracting.
            </p>
            <div className="mt-4 space-y-3">
              <InstallCommand command={`shasum -a 256 ${a.filename}`} />
              <InstallCommand command={`kosh verify ${a.filename} --sig ${a.signature}`} />
            </div>
            <p className="mt-4 text-xs text-subtle">
              Release signing keys are published on the Security page.
            </p>
          </Card>
        </div>

        {/* Other platforms */}
        <div className="mt-16">
          <h2 className="text-xl font-semibold text-foreground">Other platforms</h2>
          <div className="mt-6 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <SegmentedControl<OS>
              value={os}
              onChange={(v) => {
                setOs(v)
                setArch(v === 'macos' ? 'apple' : 'x64')
              }}
              options={(Object.keys(osMeta) as OS[]).map((k) => ({
                value: k,
                label: osMeta[k].label,
                icon: osMeta[k].icon,
              }))}
            />
            {os !== 'source' && os !== 'windows' && (
              <SegmentedControl<Arch> value={arch} onChange={setArch} options={archOptions} size="sm" />
            )}
          </div>

          <Card className="mt-6 overflow-hidden">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border p-6">
              <div>
                <p className="font-mono text-sm text-foreground">{a.filename}</p>
                <p className="mt-1 text-sm text-subtle">
                  {osMeta[os].label} · KoshLang {KOSH_VERSION}
                </p>
              </div>
              <Button>
                <Icon name="download" size={16} /> Download
              </Button>
            </div>
            <dl className="grid grid-cols-2 gap-px bg-border sm:grid-cols-3">
              {[
                ['Format', a.format],
                ['Size', a.size],
                ['Released', a.date],
                ['Signature', a.signature],
                ['Package manager', osMeta[os].install],
              ].map(([k, v]) => (
                <div key={k} className="bg-surface p-4">
                  <dt className="text-xs uppercase tracking-wide text-subtle">{k}</dt>
                  <dd className="mt-1 truncate font-mono text-sm text-foreground">{v}</dd>
                </div>
              ))}
              <div className="bg-surface p-4">
                <dt className="text-xs uppercase tracking-wide text-subtle">SHA-256</dt>
                <dd className="mt-1 flex items-center gap-1">
                  <code className="truncate font-mono text-sm text-foreground">{a.sha.slice(0, 16)}…</code>
                  <CopyButton text={a.sha} label="" />
                </dd>
              </div>
            </dl>
          </Card>

          <div className="mt-6 rounded-[12px] border border-dashed border-border bg-background-subtle p-6 text-sm text-muted">
            Looking for the package-manager path, prerequisites, and PATH troubleshooting?{' '}
            <Button to="/install" variant="ghost" size="sm" className="inline-flex px-1 text-accent">
              See the full installation guide <Icon name="arrow-right" size={14} />
            </Button>
          </div>
        </div>
      </Container>
    </>
  )
}
