import { useState } from 'react'
import { Link, useParams } from 'react-router'
import { Icon } from '../components/Icon'
import { Button } from '../components/ui/Button'
import { Container, PageHeader, Breadcrumb } from '../components/ui/layout'
import { Badge, Card, Eyebrow } from '../components/ui/primitives'
import { SegmentedControl } from '../components/ui/controls'
import { CodeBlock } from '../components/dev/CodeBlock'
import { examples } from '../data/content'

const categories = ['All', 'Basics', 'Data', 'Files', 'Networking', 'Concurrency', 'CLI']

export function Examples() {
  const [cat, setCat] = useState('All')
  const list = examples.filter((e) => cat === 'All' || e.category === cat)
  return (
    <>
      <PageHeader
        eyebrow={<Eyebrow icon="playground">Examples</Eyebrow>}
        title="Examples"
        description="Runnable, self-contained programs that show idiomatic KoshLang — from first steps to real applications."
      >
        <div className="flex flex-wrap gap-2">
          <SegmentedControl
            value={cat}
            onChange={setCat}
            className="flex-wrap"
            options={categories.map((c) => ({ value: c, label: c }))}
          />
        </div>
      </PageHeader>
      <Container className="py-14">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {list.map((e) => (
            <Link key={e.slug} to={`/examples/${e.slug}`}>
              <Card interactive className="flex h-full flex-col overflow-hidden">
                <div className="border-b border-border bg-[var(--surface-code)] p-4">
                  <pre className="max-h-32 overflow-hidden font-mono text-[12px] leading-5 text-muted">
                    <code>{e.code.split('\n').slice(0, 6).join('\n')}</code>
                  </pre>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <Badge tone="accent" className="self-start">{e.category}</Badge>
                  <h3 className="mt-3 font-semibold text-foreground">{e.title}</h3>
                  <p className="mt-1 text-sm text-muted">{e.summary}</p>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </Container>
    </>
  )
}

export function ExampleDetail() {
  const { slug } = useParams()
  const ex = examples.find((e) => e.slug === slug) ?? examples[0]
  return (
    <Container className="py-12" size="narrow">
      <Breadcrumb items={[{ label: 'Examples', to: '/examples' }, { label: ex.title }]} />
      <Badge tone="accent" className="mt-4">{ex.category}</Badge>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight text-foreground">{ex.title}</h1>
      <p className="mt-3 text-lg text-muted">{ex.summary}</p>

      <div className="mt-6 flex flex-wrap gap-2">
        <Button to="/play"><Icon name="play" size={15} /> Open in Playground</Button>
        <Button variant="secondary"><Icon name="download" size={15} /> Download project</Button>
        <Button variant="secondary" href="https://github.com" target="_blank" rel="noreferrer" to="https://github.com">
          <Icon name="github" size={15} /> View source
        </Button>
      </div>

      <CodeBlock className="mt-8" code={ex.code} filename="main.kosh" />

      <h2 className="mt-10 text-xl font-semibold text-foreground">How it works</h2>
      <p className="mt-3 text-muted">
        This example demonstrates {ex.summary.toLowerCase()} Each construct is standard
        KoshLang — no external packages required beyond the standard library.
      </p>

      <h2 className="mt-8 text-xl font-semibold text-foreground">Related documentation</h2>
      <div className="mt-3 flex flex-wrap gap-2">
        <Button to="/docs/functions" variant="secondary" size="sm">Functions</Button>
        <Button to="/docs/control-flow" variant="secondary" size="sm">Control Flow</Button>
        <Button to="/docs/stdlib" variant="secondary" size="sm">Standard Library</Button>
      </div>
    </Container>
  )
}
