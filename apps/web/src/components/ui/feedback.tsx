import { useEffect, type ReactNode } from 'react'
import { cn } from '../../lib/cn'
import { Icon, type IconName } from '../Icon'
import { Button } from './Button'

/* ---- Callout (Note / Tip / Warning / Caution) ---------------------------- */
type CalloutKind = 'note' | 'tip' | 'warning' | 'caution'
const calloutMeta: Record<
  CalloutKind,
  { icon: IconName; label: string; color: string }
> = {
  note: { icon: 'info', label: 'Note', color: 'var(--info)' },
  tip: { icon: 'sparkles', label: 'Tip', color: 'var(--success)' },
  warning: { icon: 'warning', label: 'Warning', color: 'var(--warning)' },
  caution: { icon: 'alert', label: 'Caution', color: 'var(--error)' },
}
export function Callout({
  kind = 'note',
  title,
  children,
}: {
  kind?: CalloutKind
  title?: string
  children: ReactNode
}) {
  const m = calloutMeta[kind]
  return (
    <div
      className="my-5 flex gap-3 rounded-[12px] border border-border bg-surface p-4"
      style={{
        borderLeftWidth: 3,
        borderLeftColor: m.color,
        background: `color-mix(in srgb, ${m.color} 6%, var(--surface))`,
      }}
    >
      <Icon name={m.icon} size={18} className="mt-0.5 shrink-0" style={{ color: m.color }} />
      <div className="min-w-0 text-sm leading-relaxed text-muted">
        <p className="mb-1 font-semibold text-foreground">{title ?? m.label}</p>
        {children}
      </div>
    </div>
  )
}

/* ---- Alert ---------------------------------------------------------------- */
export function Alert({
  tone = 'info',
  title,
  children,
  action,
}: {
  tone?: CalloutKind | 'info'
  title: string
  children?: ReactNode
  action?: ReactNode
}) {
  const m = calloutMeta[(tone === 'info' ? 'note' : tone) as CalloutKind]
  return (
    <div
      className="flex items-start gap-3 rounded-[12px] border p-4"
      style={{
        borderColor: `color-mix(in srgb, ${m.color} 34%, transparent)`,
        background: `color-mix(in srgb, ${m.color} 8%, var(--surface))`,
      }}
      role="status"
    >
      <Icon name={m.icon} size={18} className="mt-0.5 shrink-0" style={{ color: m.color }} />
      <div className="flex-1 text-sm">
        <p className="font-semibold text-foreground">{title}</p>
        {children && <div className="mt-0.5 text-muted">{children}</div>}
      </div>
      {action}
    </div>
  )
}

/* ---- EmptyState ----------------------------------------------------------- */
export function EmptyState({
  icon = 'search',
  title,
  description,
  action,
}: {
  icon?: IconName
  title: string
  description?: ReactNode
  action?: ReactNode
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-[16px] border border-dashed border-border bg-background-subtle px-6 py-16 text-center">
      <div className="mb-4 grid size-12 place-items-center rounded-[14px] border border-border bg-surface text-subtle">
        <Icon name={icon} size={22} />
      </div>
      <h3 className="text-base font-semibold text-foreground">{title}</h3>
      {description && (
        <p className="mt-1.5 max-w-sm text-sm text-muted">{description}</p>
      )}
      {action && <div className="mt-5 flex gap-2">{action}</div>}
    </div>
  )
}

/* ---- ErrorState ----------------------------------------------------------- */
export function ErrorState({
  code,
  title,
  description,
  children,
}: {
  code?: string
  title: string
  description?: ReactNode
  children?: ReactNode
}) {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-24 text-center">
      {code && (
        <p className="font-mono text-sm font-medium uppercase tracking-[0.3em] text-accent">
          {code}
        </p>
      )}
      <h1 className="mt-4 text-3xl font-semibold tracking-tight text-foreground">
        {title}
      </h1>
      {description && (
        <p className="mt-3 max-w-md text-muted">{description}</p>
      )}
      {children && <div className="mt-7 flex flex-wrap justify-center gap-3">{children}</div>}
    </div>
  )
}

/* ---- Toast (self-dismissing) --------------------------------------------- */
export function Toast({
  message,
  icon = 'check',
  onDone,
}: {
  message: string
  icon?: IconName
  onDone: () => void
}) {
  useEffect(() => {
    const t = setTimeout(onDone, 2200)
    return () => clearTimeout(t)
  }, [onDone])
  return (
    <div className="pointer-events-none fixed bottom-6 left-1/2 z-50 -translate-x-1/2">
      <div className="pointer-events-auto flex items-center gap-2.5 rounded-full border border-border bg-background-elevated px-4 py-2.5 text-sm font-medium text-foreground shadow-[var(--shadow-lg)]">
        <Icon name={icon} size={16} className="text-accent" />
        {message}
      </div>
    </div>
  )
}

/* ---- Dialog --------------------------------------------------------------- */
export function Dialog({
  open,
  onClose,
  title,
  children,
  footer,
}: {
  open: boolean
  onClose: () => void
  title: string
  children: ReactNode
  footer?: ReactNode
}) {
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, onClose])
  if (!open) return null
  return (
    <div className="fixed inset-0 z-50 grid place-items-center p-4">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className={cn(
          'relative w-full max-w-lg rounded-[16px] border border-border bg-background-elevated p-6 shadow-[var(--shadow-lg)]',
        )}
      >
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-foreground">{title}</h2>
          <button
            onClick={onClose}
            aria-label="Close"
            className="text-subtle hover:text-foreground"
          >
            <Icon name="close" size={20} />
          </button>
        </div>
        <div className="text-sm text-muted">{children}</div>
        {footer && <div className="mt-6 flex justify-end gap-2">{footer}</div>}
      </div>
    </div>
  )
}

export { Button }
