import { useState } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router'
import { cn } from '../../lib/cn'
import { Logo } from '../Logo'
import { ThemeToggle } from '../ThemeToggle'
import { SearchInput, Select } from '../ui/controls'
import { Badge, IconButton } from '../ui/primitives'
import { useCommandPalette, CommandPaletteProvider } from '../CommandPalette'
import { docsTree } from '../../data/docs'
import { KOSH_VERSION } from '../../data/content'

function SidebarNav({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <nav className="flex flex-col gap-6 py-6 pr-3">
      {docsTree.map((group) => (
        <div key={group.title}>
          <p className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-subtle">
            {group.title}
          </p>
          <ul>
            {group.items.map((item) => (
              <li key={item.slug}>
                <NavLink
                  to={`/docs/${item.slug === 'reference' || item.slug === 'stdlib' || item.slug === 'cli' ? item.slug : item.slug}`}
                  onClick={onNavigate}
                  end
                  className={({ isActive }) =>
                    cn(
                      'flex items-center justify-between rounded-[8px] px-3 py-1.5 text-sm transition-colors',
                      isActive
                        ? 'bg-[var(--accent-subtle)] font-medium text-accent'
                        : 'text-muted hover:bg-surface-hover hover:text-foreground',
                    )
                  }
                >
                  {item.title}
                  {item.badge && (
                    <Badge tone={item.badge === 'new' ? 'success' : 'warning'}>
                      {item.badge}
                    </Badge>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </nav>
  )
}

function DocsShellInner() {
  const { open } = useCommandPalette()
  const [drawer, setDrawer] = useState(false)
  const location = useLocation()
  const [version, setVersion] = useState('1.4')

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-40 border-b border-border bg-[color-mix(in_srgb,var(--background)_86%,transparent)] backdrop-blur-md">
        <div className="flex h-14 items-center gap-3 px-4 sm:px-6">
          <IconButton icon="menu" label="Open navigation" className="lg:hidden" onClick={() => setDrawer(true)} />
          <div className="flex items-center gap-2">
            <Logo />
            <span className="hidden font-mono text-sm text-subtle sm:inline">/ docs</span>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <SearchInput className="hidden w-64 md:flex" placeholder="Search documentation" shortcut onClick={open} />
            <IconButton icon="search" label="Search docs" className="md:hidden" onClick={open} />
            <Select
              value={version}
              onChange={setVersion}
              className="hidden sm:inline-flex"
              options={[
                { value: '1.5', label: '1.5 Nightly' },
                { value: '1.4', label: `${KOSH_VERSION.slice(0, 3)} Stable` },
                { value: '1.3', label: '1.3' },
                { value: '1.2', label: '1.2' },
              ]}
            />
            <Link to="/"><IconButton icon="external" label="Back to koshlang.com" /></Link>
            <ThemeToggle />
          </div>
        </div>
        {version !== '1.4' && version !== '1.5' && (
          <div className="border-t border-[color-mix(in_srgb,var(--warning)_40%,transparent)] bg-[color-mix(in_srgb,var(--warning)_10%,transparent)] px-4 py-2 text-center text-sm text-foreground sm:px-6">
            You are viewing documentation for an older version.{' '}
            <button onClick={() => setVersion('1.4')} className="font-medium text-accent underline underline-offset-2">
              View latest documentation
            </button>
          </div>
        )}
      </header>

      <div className="mx-auto flex max-w-[1440px]">
        <aside className="sticky top-14 hidden h-[calc(100vh-3.5rem)] w-64 shrink-0 overflow-y-auto border-r border-border px-3 lg:block">
          <SidebarNav />
        </aside>
        <div key={location.pathname} className="min-w-0 flex-1">
          <Outlet />
        </div>
      </div>

      {drawer && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setDrawer(false)} />
          <div className="absolute inset-y-0 left-0 w-[82%] max-w-xs overflow-y-auto border-r border-border bg-background px-3">
            <div className="flex h-14 items-center justify-between border-b border-border">
              <Logo />
              <IconButton icon="close" label="Close" onClick={() => setDrawer(false)} />
            </div>
            <SidebarNav onNavigate={() => setDrawer(false)} />
          </div>
        </div>
      )}
    </div>
  )
}

export function DocsShell() {
  return (
    <CommandPaletteProvider>
      <DocsShellInner />
    </CommandPaletteProvider>
  )
}
