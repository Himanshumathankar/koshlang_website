import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { useNavigate } from 'react-router'
import { cn } from '../lib/cn'
import { Icon, type IconName } from './Icon'
import { Kbd } from './ui/primitives'
import { primaryNav, packages, examples, posts } from '../data/content'
import { docsTree, stdlib, cliCommands } from '../data/docs'

type Cmd = { id: string; label: string; group: string; to: string; icon: IconName; keywords?: string }

function buildIndex(): Cmd[] {
  const out: Cmd[] = []
  primaryNav.forEach((n) => out.push({ id: 'nav-' + n.to, label: n.label, group: 'Navigation', to: n.to, icon: 'arrow-right' }))
  out.push({ id: 'download', label: 'Download KoshLang', group: 'Navigation', to: '/download', icon: 'download' })
  out.push({ id: 'install', label: 'Installation', group: 'Navigation', to: '/install', icon: 'terminal' })
  docsTree.forEach((g) => g.items.forEach((i) => out.push({ id: 'doc-' + i.slug, label: i.title, group: 'Documentation', to: '/docs/' + i.slug, icon: 'docs', keywords: g.title })))
  stdlib.forEach((s) => out.push({ id: 'std-' + s.name, label: s.name, group: 'Standard Library', to: '/docs/stdlib/' + s.name.toLowerCase(), icon: 'module', keywords: s.summary }))
  cliCommands.forEach((c) => out.push({ id: 'cli-' + c.name, label: c.name, group: 'CLI', to: '/docs/cli/' + c.name.split(' ')[1], icon: 'terminal', keywords: c.summary }))
  examples.forEach((e) => out.push({ id: 'ex-' + e.slug, label: e.title, group: 'Examples', to: '/examples/' + e.slug, icon: 'playground', keywords: e.summary }))
  packages.forEach((p) => out.push({ id: 'pkg-' + p.name, label: p.name, group: 'Packages', to: '/pkg/' + p.name, icon: 'package', keywords: p.summary }))
  posts.forEach((p) => out.push({ id: 'post-' + p.slug, label: p.title, group: 'Blog', to: '/blog/' + p.slug, icon: 'book', keywords: p.category }))
  return out
}

const PaletteContext = createContext<{ open: () => void } | null>(null)
export function useCommandPalette() {
  const ctx = useContext(PaletteContext)
  if (!ctx) throw new Error('useCommandPalette must be used within provider')
  return ctx
}

const RECENTS_KEY = 'kosh-recent-search'

export function CommandPaletteProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [active, setActive] = useState(0)
  const [recents, setRecents] = useState<string[]>([])
  const navigate = useNavigate()
  const index = useMemo(buildIndex, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setOpen((o) => !o)
      }
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [])

  useEffect(() => {
    if (open) {
      setQuery('')
      setActive(0)
      try {
        setRecents(JSON.parse(localStorage.getItem(RECENTS_KEY) || '[]'))
      } catch {
        setRecents([])
      }
    }
  }, [open])

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return index.slice(0, 8)
    return index
      .filter((c) => (c.label + ' ' + c.group + ' ' + (c.keywords ?? '')).toLowerCase().includes(q))
      .slice(0, 24)
  }, [query, index])

  useEffect(() => setActive(0), [query])

  const grouped = useMemo(() => {
    const g: Record<string, Cmd[]> = {}
    results.forEach((r) => (g[r.group] ??= []).push(r))
    return g
  }, [results])

  const go = (cmd: Cmd) => {
    const next = [cmd.label, ...recents.filter((r) => r !== cmd.label)].slice(0, 5)
    localStorage.setItem(RECENTS_KEY, JSON.stringify(next))
    setOpen(false)
    navigate(cmd.to)
  }

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActive((a) => Math.min(a + 1, results.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActive((a) => Math.max(a - 1, 0))
    } else if (e.key === 'Enter' && results[active]) {
      e.preventDefault()
      go(results[active])
    }
  }

  let flatIndex = -1

  return (
    <PaletteContext.Provider value={{ open: () => setOpen(true) }}>
      {children}
      {open && (
        <div className="fixed inset-0 z-[60] flex items-start justify-center px-4 pt-[12vh]">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setOpen(false)} />
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Search KoshLang"
            className="relative w-full max-w-xl overflow-hidden rounded-[16px] border border-border bg-background-elevated shadow-[var(--shadow-lg)]"
          >
            <div className="flex items-center gap-3 border-b border-border px-4">
              <Icon name="search" size={18} className="text-subtle" />
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={onKeyDown}
                placeholder="Search documentation, packages, CLI…"
                className="h-14 flex-1 bg-transparent text-[15px] text-foreground outline-none placeholder:text-subtle"
              />
              <Kbd>esc</Kbd>
            </div>

            <div className="max-h-[52vh] overflow-y-auto p-2">
              {!query && recents.length > 0 && (
                <div className="mb-1 px-2 pt-1">
                  <p className="px-1 py-1 font-mono text-[11px] uppercase tracking-wider text-subtle">Recent</p>
                  {recents.map((r) => (
                    <button
                      key={r}
                      onClick={() => setQuery(r)}
                      className="flex w-full items-center gap-3 rounded-[9px] px-3 py-2 text-left text-sm text-muted hover:bg-surface-hover"
                    >
                      <Icon name="refresh" size={15} className="text-subtle" />
                      {r}
                    </button>
                  ))}
                </div>
              )}

              {results.length === 0 && (
                <div className="px-3 py-10 text-center">
                  <p className="text-sm font-medium text-foreground">No results for “{query}”</p>
                  <p className="mt-1 text-sm text-subtle">Try a different term, or browse the docs.</p>
                </div>
              )}

              {Object.entries(grouped).map(([group, items]) => (
                <div key={group} className="mb-1">
                  <p className="px-3 py-1 font-mono text-[11px] uppercase tracking-wider text-subtle">{group}</p>
                  {items.map((cmd) => {
                    flatIndex++
                    const isActive = flatIndex === active
                    return (
                      <button
                        key={cmd.id}
                        onMouseEnter={() => setActive(results.indexOf(cmd))}
                        onClick={() => go(cmd)}
                        className={cn(
                          'flex w-full items-center gap-3 rounded-[9px] px-3 py-2 text-left text-sm',
                          isActive ? 'bg-accent text-[var(--accent-contrast)]' : 'text-foreground hover:bg-surface-hover',
                        )}
                      >
                        <Icon name={cmd.icon} size={16} className={isActive ? '' : 'text-subtle'} />
                        <span className="flex-1 truncate">{cmd.label}</span>
                        {cmd.keywords && (
                          <span className={cn('truncate text-xs', isActive ? 'text-[var(--accent-contrast)]/70' : 'text-subtle')}>
                            {cmd.keywords.slice(0, 32)}
                          </span>
                        )}
                      </button>
                    )
                  })}
                </div>
              ))}
            </div>

            <div className="flex items-center gap-4 border-t border-border px-4 py-2.5 text-xs text-subtle">
              <span className="flex items-center gap-1.5"><Kbd>↑</Kbd><Kbd>↓</Kbd> Navigate</span>
              <span className="flex items-center gap-1.5"><Kbd>↵</Kbd> Open</span>
              <span className="flex items-center gap-1.5"><Kbd>esc</Kbd> Close</span>
            </div>
          </div>
        </div>
      )}
    </PaletteContext.Provider>
  )
}
