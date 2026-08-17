import { useState } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router'
import { cn } from '../../lib/cn'
import { Icon } from '../Icon'
import { Logo } from '../Logo'
import { ThemeToggle } from '../ThemeToggle'
import { Button } from '../ui/Button'
import { SearchInput } from '../ui/controls'
import { IconButton } from '../ui/primitives'
import { useCommandPalette, CommandPaletteProvider } from '../CommandPalette'
import { primaryNav, footerNav, KOSH_VERSION } from '../../data/content'

function Header() {
  const { open } = useCommandPalette()
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-[color-mix(in_srgb,var(--background)_82%,transparent)] backdrop-blur-md">
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-2 focus:z-50 focus:rounded-md focus:bg-accent focus:px-3 focus:py-1.5 focus:text-sm focus:text-[var(--accent-contrast)]">
        Skip to content
      </a>
      <div className="mx-auto flex h-16 max-w-[1280px] items-center gap-6 px-4 sm:px-6">
        <Logo />
        <nav className="hidden items-center gap-1 lg:flex">
          {primaryNav.map((n) => (
            <NavLink
              key={n.to}
              to={n.to}
              className={({ isActive }) =>
                cn(
                  'rounded-[8px] px-3 py-1.5 text-sm font-medium transition-colors',
                  isActive || location.pathname.startsWith(n.to)
                    ? 'text-foreground'
                    : 'text-muted hover:text-foreground',
                )
              }
            >
              {n.label}
            </NavLink>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <SearchInput className="hidden w-56 md:flex" placeholder="Search" shortcut onClick={open} />
          <IconButton icon="search" label="Search" className="md:hidden" onClick={open} />
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="hidden sm:inline-flex"
          >
            <IconButton icon="github" label="GitHub repository" />
          </a>
          <ThemeToggle />
          <Button to="/download" size="sm" className="hidden sm:inline-flex">
            <Icon name="download" size={15} /> Download
          </Button>
          <IconButton
            icon={mobileOpen ? 'close' : 'menu'}
            label="Menu"
            className="lg:hidden"
            onClick={() => setMobileOpen((o) => !o)}
          />
        </div>
      </div>

      {mobileOpen && (
        <div className="border-t border-border bg-background lg:hidden">
          <nav className="mx-auto flex max-w-[1280px] flex-col p-4">
            {primaryNav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-between rounded-[10px] px-3 py-3 text-[15px] font-medium text-foreground hover:bg-surface-hover"
              >
                {n.label}
                <Icon name="chevron-right" size={16} className="text-subtle" />
              </Link>
            ))}
            <div className="mt-3 grid grid-cols-2 gap-2">
              <Button to="/download" onClick={() => setMobileOpen(false)} block>
                <Icon name="download" size={15} /> Download
              </Button>
              <Button to="/install" variant="secondary" onClick={() => setMobileOpen(false)} block>
                Install
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}

function Footer() {
  return (
    <footer className="border-t border-border bg-background-subtle">
      <div className="mx-auto max-w-[1280px] px-4 py-14 sm:px-6">
        <div className="grid gap-10 md:grid-cols-[1.4fr_repeat(4,1fr)]">
          <div>
            <Logo />
            <p className="mt-4 max-w-xs text-sm text-muted">
              A modern programming language built for simplicity, performance and
              productive development.
            </p>
            <p className="mt-4 font-mono text-xs text-subtle">
              KoshLang {KOSH_VERSION} · stable
            </p>
          </div>
          {footerNav.map((col) => (
            <div key={col.title}>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-subtle">
                {col.title}
              </h4>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.to}>
                    <Link to={l.to} className="text-sm text-muted transition-colors hover:text-foreground">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-border pt-6 text-sm text-subtle sm:flex-row sm:items-center">
          <p>© 2026 The KoshLang Project · A fictional language, designed as a concept.</p>
          <div className="flex items-center gap-4">
            <Link to="/status" className="hover:text-foreground">Status</Link>
            <Link to="/security" className="hover:text-foreground">Security</Link>
            <Link to="/brand" className="hover:text-foreground">Brand</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export function SiteShell() {
  return (
    <CommandPaletteProvider>
      <div className="flex min-h-screen flex-col">
        <Header />
        <main id="main" className="flex-1">
          <Outlet />
        </main>
        <Footer />
      </div>
    </CommandPaletteProvider>
  )
}
