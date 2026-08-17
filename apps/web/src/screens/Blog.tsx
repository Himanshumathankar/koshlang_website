import { useState } from 'react'
import { Link, useParams } from 'react-router'
import { Icon } from '../components/Icon'
import { Container, PageHeader, Breadcrumb } from '../components/ui/layout'
import { Badge, Card, Eyebrow } from '../components/ui/primitives'
import { SegmentedControl } from '../components/ui/controls'
import { CodeBlock } from '../components/dev/CodeBlock'
import { posts } from '../data/content'

const categories = ['All', 'Announcements', 'Releases', 'Language Design', 'Compiler', 'Performance']

export function Blog() {
  const [cat, setCat] = useState('All')
  const list = posts.filter((p) => cat === 'All' || p.category === cat)
  const [featured, ...rest] = list

  return (
    <>
      <PageHeader
        eyebrow={<Eyebrow icon="book">Blog</Eyebrow>}
        title="Engineering Blog"
        description="Notes from the people building KoshLang — language design, compiler internals, and releases."
      >
        <SegmentedControl value={cat} onChange={setCat} className="flex-wrap" options={categories.map((c) => ({ value: c, label: c }))} />
      </PageHeader>
      <Container className="py-14">
        {featured && (
          <Link to={`/blog/${featured.slug}`}>
            <Card interactive className="mb-8 grid gap-6 overflow-hidden md:grid-cols-2">
              <div className="grain grid min-h-48 place-items-center bg-[var(--surface-code)]">
                <Icon name="book" size={40} className="text-subtle" />
              </div>
              <div className="p-8">
                <Badge tone="accent">{featured.category}</Badge>
                <h2 className="mt-3 text-2xl font-semibold tracking-tight text-foreground">{featured.title}</h2>
                <p className="mt-2 text-muted">{featured.summary}</p>
                <p className="mt-4 font-mono text-xs text-subtle">{featured.author} · {featured.date} · {featured.readingTime}</p>
              </div>
            </Card>
          </Link>
        )}
        <div className="grid gap-4 md:grid-cols-3">
          {rest.map((p) => (
            <Link key={p.slug} to={`/blog/${p.slug}`}>
              <Card interactive className="flex h-full flex-col p-6">
                <Badge tone="neutral" className="self-start">{p.category}</Badge>
                <h3 className="mt-3 font-semibold text-foreground">{p.title}</h3>
                <p className="mt-1.5 flex-1 text-sm text-muted">{p.summary}</p>
                <p className="mt-4 font-mono text-xs text-subtle">{p.date} · {p.readingTime}</p>
              </Card>
            </Link>
          ))}
        </div>
      </Container>
    </>
  )
}

export function BlogPost() {
  const { slug } = useParams()
  const post = posts.find((p) => p.slug === slug) ?? posts[0]
  const toc = ['Background', 'What changed', 'Implementation', 'What’s next']

  return (
    <Container className="py-12">
      <div className="mx-auto flex max-w-5xl gap-10">
        <article className="min-w-0 max-w-2xl flex-1">
          <Breadcrumb items={[{ label: 'Blog', to: '/blog' }, { label: post.category }]} />
          <Badge tone="accent" className="mt-4">{post.category}</Badge>
          <h1 className="mt-3 text-4xl font-semibold leading-tight tracking-tight text-foreground">{post.title}</h1>
          <p className="mt-4 text-lg text-muted">{post.summary}</p>
          <div className="mt-6 flex items-center gap-3 border-y border-border py-4">
            <span className="grid size-9 place-items-center rounded-full bg-accent text-xs font-semibold text-[var(--accent-contrast)]">
              {post.author.split(' ').map((w) => w[0]).slice(0, 2).join('')}
            </span>
            <div className="text-sm">
              <p className="font-medium text-foreground">{post.author}</p>
              <p className="font-mono text-xs text-subtle">{post.date} · {post.readingTime} read</p>
            </div>
            <button className="ml-auto inline-flex items-center gap-1.5 text-sm text-subtle hover:text-foreground">
              <Icon name="share" size={15} /> Share
            </button>
          </div>

          <div className="mt-8 space-y-4 text-muted">
            <h2 id="background" className="scroll-mt-20 text-2xl font-semibold text-foreground">Background</h2>
            <p>Illustrative placeholder article body for the KoshLang engineering blog. This post explores the reasoning and implementation behind a recent change.</p>
            <h2 id="what-changed" className="scroll-mt-20 text-2xl font-semibold text-foreground">What changed</h2>
            <p>We reworked the relevant subsystem to be faster and more predictable. The public API is unchanged.</p>
            <CodeBlock code={`fn main() {\n    let result = compute(42)\n    print(result.to_string())\n}`} filename="example.kosh" />
            <h2 id="implementation" className="scroll-mt-20 text-2xl font-semibold text-foreground">Implementation</h2>
            <p>The core idea is to cache intermediate results keyed by their inputs, so repeated work is avoided across rebuilds.</p>
            <h2 id="whats-next" className="scroll-mt-20 text-2xl font-semibold text-foreground">What’s next</h2>
            <p>We’re continuing to invest in compile times and tooling. Follow the roadmap for what’s coming.</p>
          </div>

          <div className="mt-12 border-t border-border pt-8">
            <h3 className="text-lg font-semibold text-foreground">Related articles</h3>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {posts.filter((p) => p.slug !== post.slug).slice(0, 2).map((p) => (
                <Link key={p.slug} to={`/blog/${p.slug}`}>
                  <Card interactive className="p-4">
                    <p className="text-xs text-subtle">{p.category}</p>
                    <p className="mt-1 font-medium text-foreground">{p.title}</p>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </article>

        <aside className="sticky top-20 hidden h-fit w-48 shrink-0 lg:block">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-subtle">Contents</p>
          <ul className="space-y-2 border-l border-border">
            {toc.map((h) => (
              <li key={h}>
                <a href={`#${h.toLowerCase().replace(/[^a-z]+/g, '-')}`} className="-ml-px block border-l-2 border-transparent pl-3 text-sm text-muted hover:border-accent hover:text-foreground">{h}</a>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </Container>
  )
}
