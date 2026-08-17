import { Link } from 'react-router'
import { cn } from '../lib/cn'

/** KoshLang wordmark — the glyph is a stylized `{ }` cursor to keep code at the
    center of the identity. Set in the mono face. */
export function Logo({ className, showText = true }: { className?: string; showText?: boolean }) {
  return (
    <Link to="/" className={cn('group inline-flex items-center gap-2.5', className)} aria-label="KoshLang home">
      <span className="grid size-7 place-items-center rounded-[8px] bg-foreground text-background transition-colors group-hover:bg-accent group-hover:text-[var(--accent-contrast)]">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M8 5c-2 0-2 2-2 3.5S5 12 3.5 12 5 12 6 12s0 1.5 0 3.5S6 19 8 19" />
          <path d="M16 5c2 0 2 2 2 3.5s1 3.5 2.5 3.5S19 12 18 12s0 1.5 0 3.5S18 19 16 19" />
        </svg>
      </span>
      {showText && (
        <span className="font-mono text-[15px] font-semibold tracking-tight text-foreground">
          Kosh<span className="text-accent">Lang</span>
        </span>
      )}
    </Link>
  )
}
