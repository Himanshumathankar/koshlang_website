import { Link, useParams } from 'react-router'
import { Icon } from '../../components/Icon'
import { Button } from '../../components/ui/Button'
import { Breadcrumb } from '../../components/ui/layout'
import { Badge, Card, Eyebrow } from '../../components/ui/primitives'
import { Callout } from '../../components/ui/feedback'
import { CodeBlock } from '../../components/dev/CodeBlock'
import { InstallCommand } from '../../components/dev/InstallCommand'
import {
  docsTree,
  getArticle,
  stdlib,
  cliCommands,
  type ArticleBlock,
} from '../../data/docs'

/* ---- shared article wrapper ---------------------------------------------- */
function DocLayout({
  children,
  toc,
  prev,
  next,
}: {
  children: React.ReactNode
  toc: string[]
  prev?: { title: string; slug: string }
  next?: { title: string; slug: string }
}) {
  const anchor = (h: string) => h.toLowerCase().replace(/[^a-z0-9]+/g, '-')
  return (
    <div className="mx-auto flex max-w-5xl gap-10 px-5 py-10 sm:px-8">
      <article className="min-w-0 flex-1">
        {children}
        <div className="mt-14 grid gap-3 border-t border-border pt-8 sm:grid-cols-2">
          {prev ? (
            <Link to={`/docs/${prev.slug}`} className="group rounded-[12px] border border-border p-4 hover:border-border-strong">
              <span className="flex items-center gap-1 text-xs text-subtle"><Icon name="chevron-left" size={13} /> Previous</span>
              <span className="mt-1 block font-medium text-foreground group-hover:text-accent">{prev.title}</span>
            </Link>
          ) : <span />}
          {next && (
            <Link to={`/docs/${next.slug}`} className="group rounded-[12px] border border-border p-4 text-right hover:border-border-strong">
              <span className="flex items-center justify-end gap-1 text-xs text-subtle">Next <Icon name="chevron-right" size={13} /></span>
              <span className="mt-1 block font-medium text-foreground group-hover:text-accent">{next.title}</span>
            </Link>
          )}
        </div>
      </article>
      <aside className="sticky top-20 hidden h-fit w-52 shrink-0 xl:block">
        <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-subtle">On this page</p>
        <ul className="space-y-2 border-l border-border">
          {toc.map((h) => (
            <li key={h}>
              <a href={`#${anchor(h)}`} className="-ml-px block border-l-2 border-transparent pl-3 text-sm text-muted hover:border-accent hover:text-foreground">
                {h}
              </a>
            </li>
          ))}
        </ul>
        <div className="mt-6 space-y-1.5 border-t border-border pt-4 text-sm">
          <a className="flex items-center gap-1.5 text-subtle hover:text-foreground" href="#"><Icon name="external" size={14} /> Edit this page</a>
          <a className="flex items-center gap-1.5 text-subtle hover:text-foreground" href="#"><Icon name="alert" size={14} /> Report an issue</a>
        </div>
      </aside>
    </div>
  )
}

function renderBlock(block: ArticleBlock, i: number) {
  const anchor = (h: string) => h.toLowerCase().replace(/[^a-z0-9]+/g, '-')
  switch (block.t) {
    case 'p':
      return <p key={i} className="my-4 leading-relaxed text-muted">{block.text}</p>
    case 'h2':
      return <h2 key={i} id={anchor(block.text)} className="mt-10 scroll-mt-20 border-b border-border pb-2 text-2xl font-semibold tracking-tight text-foreground">{block.text}</h2>
    case 'h3':
      return <h3 key={i} id={anchor(block.text)} className="mt-8 scroll-mt-20 text-lg font-semibold text-foreground">{block.text}</h3>
    case 'code':
      return <CodeBlock key={i} className="my-5" code={block.code} filename={block.filename} />
    case 'callout':
      return <Callout key={i} kind={block.kind} title={block.title}>{block.text}</Callout>
    case 'params':
      return (
        <div key={i} className="my-5 overflow-hidden rounded-[12px] border border-border">
          <table className="w-full text-left text-sm">
            <thead className="bg-background-subtle text-xs uppercase tracking-wide text-subtle">
              <tr><th className="px-4 py-2.5">Name</th><th className="px-4 py-2.5">Type</th><th className="px-4 py-2.5">Description</th></tr>
            </thead>
            <tbody>
              {block.rows.map((r) => (
                <tr key={r.name} className="border-t border-border">
                  <td className="px-4 py-2.5 font-mono text-foreground">{r.name}</td>
                  <td className="px-4 py-2.5 font-mono text-accent">{r.type}</td>
                  <td className="px-4 py-2.5 text-muted">{r.desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )
  }
}

/* ---- Docs home ------------------------------------------------------------ */
export function DocsHome() {
  return (
    <div className="mx-auto max-w-4xl px-5 py-12 sm:px-8">
      <Eyebrow icon="book">Documentation</Eyebrow>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight text-foreground">KoshLang Documentation</h1>
      <p className="mt-4 max-w-2xl text-lg text-muted">
        Everything you need to learn, reference, and master KoshLang — from your first
        program to compiler internals.
      </p>
      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        {docsTree.map((g) => (
          <Card key={g.title} className="p-5">
            <h2 className="font-semibold text-foreground">{g.title}</h2>
            <ul className="mt-3 space-y-1.5">
              {g.items.slice(0, 5).map((i) => (
                <li key={i.slug}>
                  <Link to={`/docs/${i.slug}`} className="flex items-center gap-2 text-sm text-muted hover:text-accent">
                    <Icon name="chevron-right" size={13} /> {i.title}
                  </Link>
                </li>
              ))}
            </ul>
          </Card>
        ))}
      </div>
    </div>
  )
}

/* ---- Article -------------------------------------------------------------- */
export function DocArticle() {
  const { slug = 'introduction' } = useParams()
  const article = getArticle(slug)
  const flat = docsTree.flatMap((g) => g.items)
  const idx = flat.findIndex((i) => i.slug === slug)

  return (
    <DocLayout
      toc={article.toc}
      prev={idx > 0 ? flat[idx - 1] : undefined}
      next={idx >= 0 && idx < flat.length - 1 ? flat[idx + 1] : undefined}
    >
      <Breadcrumb items={[{ label: 'Docs', to: '/docs' }, { label: article.group }, { label: article.title }]} />
      <div className="mt-4 flex items-center gap-2">
        {article.status && (
          <Badge tone={article.status === 'stable' ? 'success' : article.status === 'new' ? 'info' : 'warning'}>
            {article.status}
          </Badge>
        )}
        <span className="font-mono text-xs text-subtle">Updated {article.updated}</span>
      </div>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight text-foreground">{article.title}</h1>
      <p className="mt-3 text-lg text-muted">{article.summary}</p>
      <div className="mt-6">{article.blocks.map(renderBlock)}</div>
    </DocLayout>
  )
}

/* ---- Standard library index ---------------------------------------------- */
export function StdlibIndex() {
  return (
    <div className="mx-auto max-w-4xl px-5 py-12 sm:px-8">
      <Breadcrumb items={[{ label: 'Docs', to: '/docs' }, { label: 'Standard Library' }]} />
      <h1 className="mt-4 text-4xl font-semibold tracking-tight text-foreground">Standard Library</h1>
      <p className="mt-3 text-lg text-muted">Core types and modules available in every KoshLang program.</p>
      <div className="mt-8 grid gap-3 sm:grid-cols-2">
        {stdlib.map((s) => (
          <Link key={s.name} to={`/docs/stdlib/${s.name.toLowerCase()}`}>
            <Card interactive className="p-5">
              <div className="flex items-center justify-between">
                <span className="font-mono text-lg font-semibold text-foreground">{s.name}</span>
                <Badge tone={s.kind === 'type' ? 'accent' : 'info'}>{s.kind}</Badge>
              </div>
              <p className="mt-2 text-sm text-muted">{s.summary}</p>
              <p className="mt-3 font-mono text-xs text-subtle">{s.methods.length} members</p>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}

/* ---- Standard library symbol --------------------------------------------- */
export function StdlibSymbol() {
  const { name = 'string' } = useParams()
  const symbol = stdlib.find((s) => s.name.toLowerCase() === name.toLowerCase()) ?? stdlib[0]
  return (
    <div className="mx-auto max-w-4xl px-5 py-12 sm:px-8">
      <Breadcrumb items={[{ label: 'Docs', to: '/docs' }, { label: 'std', to: '/docs/stdlib' }, { label: symbol.name }]} />
      <div className="mt-4 flex items-center gap-3">
        <h1 className="font-mono text-4xl font-semibold tracking-tight text-foreground">{symbol.name}</h1>
        <Badge tone={symbol.kind === 'type' ? 'accent' : 'info'}>{symbol.kind}</Badge>
      </div>
      <p className="mt-3 text-lg text-muted">{symbol.summary}</p>

      <h2 className="mt-10 border-b border-border pb-2 text-2xl font-semibold text-foreground">Methods</h2>
      <div className="mt-6 space-y-6">
        {symbol.methods.map((m) => (
          <div key={m.signature} id={m.signature.split('(')[0].split('.').pop()} className="scroll-mt-20">
            <div className="rounded-[10px] bg-[var(--surface-code)] px-4 py-2.5">
              <code className="font-mono text-sm text-foreground">{m.signature}</code>
            </div>
            <p className="mt-3 text-muted">{m.desc}</p>
            <div className="mt-3 grid gap-4 sm:grid-cols-2">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-subtle">Returns</p>
                <p className="mt-1 font-mono text-sm text-accent">{m.returns}</p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-subtle">Parameters</p>
                <p className="mt-1 text-sm text-muted">
                  {m.signature.match(/\((.*)\)/)?.[1] || 'None'}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ---- CLI index ------------------------------------------------------------ */
export function CliIndex() {
  return (
    <div className="mx-auto max-w-4xl px-5 py-12 sm:px-8">
      <Breadcrumb items={[{ label: 'Docs', to: '/docs' }, { label: 'CLI' }]} />
      <h1 className="mt-4 text-4xl font-semibold tracking-tight text-foreground">CLI Reference</h1>
      <p className="mt-3 text-lg text-muted">The <code className="font-mono">kosh</code> command drives the entire workflow.</p>
      <div className="mt-8 space-y-2">
        {cliCommands.map((c) => (
          <Link key={c.name} to={`/docs/cli/${c.name.split(' ')[1]}`} className="group flex items-center justify-between rounded-[12px] border border-border bg-surface px-5 py-4 hover:border-border-strong">
            <div>
              <code className="font-mono font-semibold text-foreground group-hover:text-accent">{c.name}</code>
              <p className="mt-0.5 text-sm text-muted">{c.summary}</p>
            </div>
            <Icon name="chevron-right" size={18} className="text-subtle" />
          </Link>
        ))}
      </div>
    </div>
  )
}

/* ---- CLI command ---------------------------------------------------------- */
export function CliCommandPage() {
  const { name = 'build' } = useParams()
  const cmd = cliCommands.find((c) => c.name.split(' ')[1] === name) ?? cliCommands[0]
  return (
    <div className="mx-auto max-w-3xl px-5 py-12 sm:px-8">
      <Breadcrumb items={[{ label: 'Docs', to: '/docs' }, { label: 'CLI', to: '/docs/cli' }, { label: cmd.name }]} />
      <h1 className="mt-4 font-mono text-3xl font-semibold tracking-tight text-foreground">{cmd.name}</h1>
      <p className="mt-3 text-lg text-muted">{cmd.summary}</p>

      <h2 className="mt-8 text-xs font-semibold uppercase tracking-wider text-subtle">Usage</h2>
      <div className="mt-3"><InstallCommand command={cmd.usage} prompt="" /></div>

      <h2 className="mt-8 text-xs font-semibold uppercase tracking-wider text-subtle">Options</h2>
      <div className="mt-3 overflow-hidden rounded-[12px] border border-border">
        <table className="w-full text-left text-sm">
          <tbody>
            {cmd.options.map((o) => (
              <tr key={o.flag} className="border-b border-border last:border-0">
                <td className="whitespace-nowrap px-4 py-3 font-mono text-accent">{o.flag}</td>
                <td className="px-4 py-3 text-muted">{o.desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 className="mt-8 text-xs font-semibold uppercase tracking-wider text-subtle">Examples</h2>
      <div className="mt-3 space-y-3">
        {cmd.examples.map((e) => (
          <InstallCommand key={e} command={e} />
        ))}
      </div>

      <h2 className="mt-8 text-xs font-semibold uppercase tracking-wider text-subtle">Related commands</h2>
      <div className="mt-3 flex flex-wrap gap-2">
        {cliCommands.filter((c) => c !== cmd).slice(0, 3).map((c) => (
          <Button key={c.name} to={`/docs/cli/${c.name.split(' ')[1]}`} variant="secondary" size="sm">{c.name}</Button>
        ))}
      </div>
    </div>
  )
}
