import { Link, useParams } from 'react-router'
import { Icon, type IconName } from '../components/Icon'
import { Button } from '../components/ui/Button'
import { Container, PageHeader, Breadcrumb } from '../components/ui/layout'
import { Badge, Card, Eyebrow } from '../components/ui/primitives'
import { InstallCommand } from '../components/dev/InstallCommand'

type Tool = { slug: string; name: string; icon: IconName; tagline: string; status: 'Available' | 'Beta' | 'Planned'; caps: string[] }
const tools: Tool[] = [
  { slug: 'vscode', name: 'VS Code', icon: 'grid', tagline: 'Official extension with full language support.', status: 'Available', caps: ['Syntax highlighting', 'Inlay hints', 'Go to definition', 'Refactorings'] },
  { slug: 'lsp', name: 'Kosh LSP', icon: 'compiler', tagline: 'The language server that powers every editor.', status: 'Available', caps: ['Diagnostics', 'Completions', 'Hover docs', 'Rename'] },
  { slug: 'formatter', name: 'Formatter', icon: 'terminal', tagline: 'Deterministic formatting, zero configuration.', status: 'Available', caps: ['Format on save', 'CI check mode', 'Idempotent output'] },
  { slug: 'debugger', name: 'Debugger', icon: 'cpu', tagline: 'DAP-based debugging with breakpoints and stepping.', status: 'Beta', caps: ['Breakpoints', 'Step in/out', 'Watch expressions'] },
]
const future = ['JetBrains', 'Neovim', 'Vim', 'Zed', 'Emacs', 'Sublime']

export function Tools() {
  return (
    <>
      <PageHeader
        eyebrow={<Eyebrow icon="cpu">Tooling</Eyebrow>}
        title="Developer Tools"
        description="Editor integrations and command-line tools that make KoshLang productive from the first keystroke."
      />
      <Container className="py-14">
        <div className="grid gap-4 sm:grid-cols-2">
          {tools.map((t) => (
            <Link key={t.slug} to={`/tools/${t.slug}`}>
              <Card interactive className="flex h-full flex-col p-6">
                <div className="flex items-center justify-between">
                  <div className="grid size-11 place-items-center rounded-[12px] bg-[var(--accent-subtle)] text-accent">
                    <Icon name={t.icon} size={22} />
                  </div>
                  <Badge tone={t.status === 'Available' ? 'success' : t.status === 'Beta' ? 'warning' : 'neutral'}>{t.status}</Badge>
                </div>
                <h3 className="mt-4 text-lg font-semibold text-foreground">{t.name}</h3>
                <p className="mt-1 text-sm text-muted">{t.tagline}</p>
              </Card>
            </Link>
          ))}
        </div>

        <h2 className="mt-14 text-lg font-semibold text-foreground">Community integrations</h2>
        <p className="mt-1 text-sm text-muted">Planned and community-maintained editor support.</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {future.map((f) => (
            <span key={f} className="inline-flex items-center gap-1.5 rounded-full border border-dashed border-border px-3 py-1.5 text-sm text-subtle">
              <Icon name="grid" size={14} /> {f}
            </span>
          ))}
        </div>
      </Container>
    </>
  )
}

export function ToolDetail() {
  const { slug } = useParams()
  const tool = tools.find((t) => t.slug === slug) ?? tools[0]
  return (
    <Container className="py-12" size="narrow">
      <Breadcrumb items={[{ label: 'Tools', to: '/tools' }, { label: tool.name }]} />
      <div className="mt-4 flex items-center gap-3">
        <div className="grid size-12 place-items-center rounded-[12px] bg-[var(--accent-subtle)] text-accent">
          <Icon name={tool.icon} size={24} />
        </div>
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-foreground">{tool.name}</h1>
          <Badge tone={tool.status === 'Available' ? 'success' : 'warning'} className="mt-1">{tool.status}</Badge>
        </div>
      </div>
      <p className="mt-4 text-lg text-muted">{tool.tagline}</p>

      <div className="mt-8 aspect-video overflow-hidden rounded-[14px] border border-border bg-[var(--surface-code)]">
        <div className="grid h-full place-items-center text-subtle">
          <div className="text-center">
            <Icon name={tool.icon} size={40} className="mx-auto" />
            <p className="mt-2 font-mono text-sm">{tool.name} — screenshot</p>
          </div>
        </div>
      </div>

      <h2 className="mt-10 text-xl font-semibold text-foreground">Capabilities</h2>
      <ul className="mt-3 grid gap-2 sm:grid-cols-2">
        {tool.caps.map((c) => (
          <li key={c} className="flex items-center gap-2 text-muted">
            <Icon name="check" size={16} className="text-[var(--success)]" /> {c}
          </li>
        ))}
      </ul>

      <h2 className="mt-8 text-xl font-semibold text-foreground">Installation</h2>
      <div className="mt-3 space-y-3">
        <InstallCommand command={tool.slug === 'vscode' ? 'code --install-extension koshlang.kosh' : 'kosh tool install ' + tool.slug} />
      </div>

      <h2 className="mt-8 text-xl font-semibold text-foreground">Configuration</h2>
      <p className="mt-3 text-muted">Sensible defaults out of the box; override in <code className="font-mono text-foreground">kosh.toml</code> when needed.</p>

      <h2 className="mt-8 text-xl font-semibold text-foreground">Troubleshooting</h2>
      <p className="mt-3 text-muted">If the extension can’t find the toolchain, ensure <code className="font-mono text-foreground">kosh</code> is on your PATH and reload your editor.</p>
    </Container>
  )
}
