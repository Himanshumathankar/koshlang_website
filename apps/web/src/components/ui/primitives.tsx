import {
  forwardRef,
  type ButtonHTMLAttributes,
  type HTMLAttributes,
  type ReactNode,
} from 'react'
import { cn } from '../../lib/cn'
import { Icon, type IconName } from '../Icon'

/* ---- Badge ---------------------------------------------------------------- */
type BadgeTone = 'neutral' | 'accent' | 'success' | 'warning' | 'error' | 'info'
const badgeTones: Record<BadgeTone, string> = {
  neutral: 'bg-surface-hover text-muted border-border',
  accent: 'bg-[var(--accent-subtle)] text-accent border-[color-mix(in_srgb,var(--accent)_30%,transparent)]',
  success: 'bg-[color-mix(in_srgb,var(--success)_14%,transparent)] text-[var(--success)] border-[color-mix(in_srgb,var(--success)_30%,transparent)]',
  warning: 'bg-[color-mix(in_srgb,var(--warning)_14%,transparent)] text-[var(--warning)] border-[color-mix(in_srgb,var(--warning)_30%,transparent)]',
  error: 'bg-[color-mix(in_srgb,var(--error)_14%,transparent)] text-[var(--error)] border-[color-mix(in_srgb,var(--error)_30%,transparent)]',
  info: 'bg-[color-mix(in_srgb,var(--info)_14%,transparent)] text-[var(--info)] border-[color-mix(in_srgb,var(--info)_30%,transparent)]',
}
export function Badge({
  tone = 'neutral',
  icon,
  children,
  className,
  mono,
}: {
  tone?: BadgeTone
  icon?: IconName
  children: ReactNode
  className?: string
  mono?: boolean
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium leading-5',
        mono && 'font-mono tabular',
        badgeTones[tone],
        className,
      )}
    >
      {icon && <Icon name={icon} size={13} />}
      {children}
    </span>
  )
}

/* ---- StatusDot (non-color-only: pairs with a label) ----------------------- */
export function StatusDot({ tone = 'neutral' }: { tone?: BadgeTone }) {
  const color: Record<BadgeTone, string> = {
    neutral: 'var(--subtle)',
    accent: 'var(--accent)',
    success: 'var(--success)',
    warning: 'var(--warning)',
    error: 'var(--error)',
    info: 'var(--info)',
  }
  return (
    <span
      className="inline-block size-2 shrink-0 rounded-full"
      style={{ backgroundColor: color[tone] }}
    />
  )
}

/* ---- Kbd ------------------------------------------------------------------ */
export function Kbd({ children }: { children: ReactNode }) {
  return (
    <kbd className="inline-flex h-5 min-w-5 items-center justify-center rounded-[6px] border border-border bg-background-subtle px-1.5 font-mono text-[11px] font-medium text-muted">
      {children}
    </kbd>
  )
}

/* ---- Card ----------------------------------------------------------------- */
export function Card({
  className,
  interactive,
  ...rest
}: HTMLAttributes<HTMLDivElement> & { interactive?: boolean }) {
  return (
    <div
      className={cn(
        'rounded-[var(--radius)] border border-border bg-surface',
        interactive &&
          'transition-[border,box-shadow,transform] duration-200 hover:border-border-strong hover:shadow-[var(--shadow-md)]',
        className,
      )}
      {...rest}
    />
  )
}

/* ---- IconButton ----------------------------------------------------------- */
export const IconButton = forwardRef<
  HTMLButtonElement,
  ButtonHTMLAttributes<HTMLButtonElement> & {
    icon: IconName
    label: string
    size?: number
    active?: boolean
  }
>(function IconButton({ icon, label, size = 18, active, className, ...rest }, ref) {
  return (
    <button
      ref={ref}
      type="button"
      aria-label={label}
      title={label}
      className={cn(
        'inline-flex size-9 items-center justify-center rounded-[9px] text-muted transition-colors hover:bg-surface-hover hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ring)] disabled:opacity-40',
        active && 'bg-surface-active text-foreground',
        className,
      )}
      {...rest}
    >
      <Icon name={icon} size={size} />
    </button>
  )
})

/* ---- Skeleton ------------------------------------------------------------- */
export function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'animate-pulse rounded-[8px] bg-[color-mix(in_srgb,var(--foreground)_9%,transparent)]',
        className,
      )}
    />
  )
}

/* ---- Spinner -------------------------------------------------------------- */
export function Spinner({ size = 18, className }: { size?: number; className?: string }) {
  return <Icon name="spinner" size={size} className={cn('animate-spin', className)} />
}

/* ---- Progress ------------------------------------------------------------- */
export function Progress({ value }: { value: number }) {
  return (
    <div className="h-1.5 w-full overflow-hidden rounded-full bg-surface-active">
      <div
        className="h-full rounded-full bg-accent transition-[width] duration-500"
        style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
      />
    </div>
  )
}

/* ---- Divider -------------------------------------------------------------- */
export function Divider({ className, label }: { className?: string; label?: string }) {
  if (label)
    return (
      <div className={cn('flex items-center gap-3', className)}>
        <span className="h-px flex-1 bg-border" />
        <span className="text-xs font-medium uppercase tracking-wider text-subtle">
          {label}
        </span>
        <span className="h-px flex-1 bg-border" />
      </div>
    )
  return <hr className={cn('border-0 border-t border-border', className)} />
}

/* ---- Eyebrow (section label) ---------------------------------------------- */
export function Eyebrow({ children, icon }: { children: ReactNode; icon?: IconName }) {
  return (
    <div className="inline-flex items-center gap-2 font-mono text-xs font-medium uppercase tracking-[0.14em] text-accent">
      {icon && <Icon name={icon} size={14} />}
      {children}
    </div>
  )
}
