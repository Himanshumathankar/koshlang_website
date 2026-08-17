import { useState } from 'react'
import { Icon, type IconName } from '../components/Icon'
import { Logo } from '../components/Logo'
import { Container, PageHeader } from '../components/ui/layout'
import { Badge, Card, Eyebrow, Kbd, Progress, Skeleton, Divider, StatusDot } from '../components/ui/primitives'
import { Button } from '../components/ui/Button'
import { Input, SegmentedControl, Switch, Tabs, Checkbox, SearchInput } from '../components/ui/controls'
import { Callout, Alert, EmptyState, Dialog } from '../components/ui/feedback'
import { ThemeSegmented } from '../components/ThemeToggle'
import { CodeBlock } from '../components/dev/CodeBlock'

const tokenGroups: { title: string; tokens: { name: string; var: string }[] }[] = [
  {
    title: 'Background & surface',
    tokens: [
      { name: 'background', var: '--background' },
      { name: 'background-subtle', var: '--background-subtle' },
      { name: 'surface', var: '--surface' },
      { name: 'surface-code', var: '--surface-code' },
    ],
  },
  {
    title: 'Text',
    tokens: [
      { name: 'foreground', var: '--foreground' },
      { name: 'muted', var: '--muted' },
      { name: 'subtle', var: '--subtle' },
    ],
  },
  {
    title: 'Accent & status',
    tokens: [
      { name: 'accent', var: '--accent' },
      { name: 'success', var: '--success' },
      { name: 'warning', var: '--warning' },
      { name: 'error', var: '--error' },
      { name: 'info', var: '--info' },
    ],
  },
]

const typeScale = [
  { name: 'Display', cls: 'text-6xl font-semibold tracking-tight' },
  { name: 'H1', cls: 'text-4xl font-semibold tracking-tight' },
  { name: 'H2', cls: 'text-2xl font-semibold' },
  { name: 'Body Large', cls: 'text-lg' },
  { name: 'Body', cls: 'text-base' },
  { name: 'Caption', cls: 'text-sm text-muted' },
  { name: 'Code', cls: 'font-mono text-sm' },
]

const spacing = [4, 8, 12, 16, 24, 32, 48, 64]

const allIcons: IconName[] = [
  'kosh', 'compiler', 'package', 'module', 'terminal', 'docs', 'playground', 'version',
  'search', 'sun', 'moon', 'system', 'github', 'download', 'copy', 'check', 'play',
  'bolt', 'shield', 'sparkles', 'grid', 'cpu', 'refresh', 'share', 'users', 'branch', 'map', 'book',
]

function Swatch({ token }: { token: { name: string; var: string } }) {
  return (
    <div className="flex items-center gap-3">
      <span className="size-10 shrink-0 rounded-[8px] border border-border" style={{ background: `var(${token.var})` }} />
      <div className="min-w-0">
        <p className="truncate font-mono text-xs text-foreground">{token.name}</p>
        <p className="truncate font-mono text-[11px] text-subtle">{token.var}</p>
      </div>
    </div>
  )
}

export function Brand() {
  const [tab, setTab] = useState<'a' | 'b'>('a')
  const [checked, setChecked] = useState(true)
  const [sw, setSw] = useState(true)
  const [dialog, setDialog] = useState(false)
  const [seg, setSeg] = useState('one')

  return (
    <>
      <PageHeader
        eyebrow={<Eyebrow icon="sparkles">Brand & Handoff</Eyebrow>}
        title="Design System"
        description="The living reference for KoshLang’s tokens, typography, icons and components — the code equivalent of a Figma foundations file."
      >
        <div className="flex flex-wrap items-center gap-4">
          <Logo />
          <ThemeSegmented />
        </div>
      </PageHeader>

      <Container className="space-y-16 py-14">
        {/* Colors */}
        <section>
          <h2 className="text-xl font-semibold text-foreground">Color tokens</h2>
          <p className="mt-1 text-sm text-muted">Semantic, theme-aware. Toggle the theme above to see both modes.</p>
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {tokenGroups.map((g) => (
              <Card key={g.title} className="p-5">
                <p className="mb-4 text-sm font-semibold text-foreground">{g.title}</p>
                <div className="space-y-3">
                  {g.tokens.map((t) => <Swatch key={t.var} token={t} />)}
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Typography */}
        <section>
          <h2 className="text-xl font-semibold text-foreground">Typography</h2>
          <p className="mt-1 text-sm text-muted">Hanken Grotesk for UI, JetBrains Mono for code.</p>
          <Card className="mt-6 divide-y divide-border">
            {typeScale.map((t) => (
              <div key={t.name} className="flex items-baseline justify-between gap-6 p-5">
                <span className="w-24 shrink-0 font-mono text-xs text-subtle">{t.name}</span>
                <span className={`flex-1 truncate ${t.cls} text-foreground`}>Programming, thoughtfully designed</span>
              </div>
            ))}
          </Card>
        </section>

        {/* Spacing */}
        <section>
          <h2 className="text-xl font-semibold text-foreground">Spacing scale</h2>
          <div className="mt-6 flex flex-wrap items-end gap-4">
            {spacing.map((s) => (
              <div key={s} className="text-center">
                <div className="rounded-[4px] bg-accent" style={{ width: s, height: s }} />
                <p className="mt-2 font-mono text-xs text-subtle">{s}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Icons */}
        <section>
          <h2 className="text-xl font-semibold text-foreground">Iconography</h2>
          <p className="mt-1 text-sm text-muted">24px grid, 1.6px stroke. KoshLang glyphs alongside UI icons.</p>
          <Card className="mt-6 grid grid-cols-4 gap-4 p-6 sm:grid-cols-7 lg:grid-cols-10">
            {allIcons.map((n) => (
              <div key={n} className="flex flex-col items-center gap-2 text-muted">
                <Icon name={n} size={22} />
                <span className="font-mono text-[10px] text-subtle">{n}</span>
              </div>
            ))}
          </Card>
        </section>

        {/* Buttons */}
        <section>
          <h2 className="text-xl font-semibold text-foreground">Buttons</h2>
          <Card className="mt-6 space-y-6 p-6">
            <div className="flex flex-wrap items-center gap-3">
              <Button>Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="danger">Danger</Button>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Button size="sm">Small</Button>
              <Button size="md">Medium</Button>
              <Button size="lg">Large</Button>
              <Button loading>Loading</Button>
              <Button disabled>Disabled</Button>
            </div>
          </Card>
        </section>

        {/* Controls */}
        <section>
          <h2 className="text-xl font-semibold text-foreground">Form controls & states</h2>
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <Card className="space-y-4 p-6">
              <Input label="Text input" placeholder="Type here…" icon="search" hint="Helper text" />
              <Input label="Invalid input" placeholder="Bad value" invalid hint="This field is required" />
              <SearchInput shortcut placeholder="Search…" />
              <div className="flex items-center gap-4">
                <Checkbox checked={checked} onChange={setChecked} label="Checkbox" />
                <Switch checked={sw} onChange={setSw} label="Switch" />
              </div>
            </Card>
            <Card className="space-y-4 p-6">
              <SegmentedControl value={seg} onChange={setSeg} options={[{ value: 'one', label: 'One' }, { value: 'two', label: 'Two' }, { value: 'three', label: 'Three' }]} />
              <Tabs value={tab} onChange={setTab} tabs={[{ value: 'a', label: 'Tab A' }, { value: 'b', label: 'Tab B', count: 3 }]} />
              <div className="flex flex-wrap gap-2">
                <Badge>neutral</Badge>
                <Badge tone="accent">accent</Badge>
                <Badge tone="success">success</Badge>
                <Badge tone="warning">warning</Badge>
                <Badge tone="error">error</Badge>
                <Badge tone="info">info</Badge>
              </div>
              <div className="flex items-center gap-3">
                <Kbd>⌘</Kbd><Kbd>K</Kbd>
                <StatusDot tone="success" /><span className="text-sm text-muted">status</span>
              </div>
              <Progress value={64} />
            </Card>
          </div>
        </section>

        {/* Feedback */}
        <section>
          <h2 className="text-xl font-semibold text-foreground">Feedback & messaging</h2>
          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            <div className="space-y-4">
              <Callout kind="note">Notes give neutral, contextual information.</Callout>
              <Callout kind="tip">Tips highlight a helpful shortcut.</Callout>
              <Callout kind="warning">Warnings flag something to be careful about.</Callout>
              <Callout kind="caution">Cautions flag potential data loss or breakage.</Callout>
            </div>
            <div className="space-y-4">
              <Alert tone="info" title="Informational alert" action={<Button size="sm" variant="secondary">Action</Button>}>With an optional action.</Alert>
              <div className="flex gap-3">
                <Button variant="secondary" onClick={() => setDialog(true)}>Open dialog</Button>
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-24 w-full" />
              </div>
            </div>
          </div>
          <div className="mt-6"><EmptyState title="Empty state" description="Used when there is no data to display." action={<Button variant="secondary" size="sm">Primary action</Button>} /></div>
        </section>

        {/* Code surfaces */}
        <section>
          <h2 className="text-xl font-semibold text-foreground">Code surfaces</h2>
          <Divider className="my-4" />
          <CodeBlock filename="main.kosh" code={`fn main() {\n    // The recurring code motif\n    let msg = "Programming, thoughtfully designed."\n    print(msg)\n}`} />
        </section>
      </Container>

      <Dialog open={dialog} onClose={() => setDialog(false)} title="Example dialog" footer={<><Button variant="secondary" onClick={() => setDialog(false)}>Cancel</Button><Button onClick={() => setDialog(false)}>Confirm</Button></>}>
        Dialogs trap focus, close on Escape, and dim the background. This one is part of the
        component library.
      </Dialog>
    </>
  )
}
