import { useRef, type ReactNode } from 'react'
import { cn } from '../../lib/cn'
import { highlightKosh } from '../../lib/highlight'

/* A lightweight code editor: a transparent <textarea> layered over a
   syntax-highlighted <pre>. Good enough to feel like a real editor without
   pulling in a heavy editor dependency. */
export function CodeEditor({
  value,
  onChange,
  readOnly,
  gutter = true,
  className,
  ariaLabel = 'Code editor',
}: {
  value: string
  onChange?: (v: string) => void
  readOnly?: boolean
  gutter?: boolean
  className?: string
  ariaLabel?: string
}) {
  const ref = useRef<HTMLTextAreaElement>(null)
  const lines = value.replace(/\n$/, '').split('\n')

  const handleKey = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Tab' && onChange) {
      e.preventDefault()
      const el = e.currentTarget
      const s = el.selectionStart
      const next = value.slice(0, s) + '    ' + value.slice(el.selectionEnd)
      onChange(next)
      requestAnimationFrame(() => {
        el.selectionStart = el.selectionEnd = s + 4
      })
    }
  }

  const sync = () => {
    // keep highlight scroll aligned with textarea scroll
    const ta = ref.current
    const pre = ta?.previousElementSibling as HTMLElement | null
    if (ta && pre) {
      pre.scrollTop = ta.scrollTop
      pre.scrollLeft = ta.scrollLeft
    }
  }

  return (
    <div className={cn('relative flex min-h-0 flex-1 overflow-hidden font-mono text-[13px] leading-6', className)}>
      {gutter && (
        <div
          aria-hidden
          className="select-none border-r border-border-subtle bg-[var(--surface-code)] px-3 py-4 text-right text-subtle"
        >
          {lines.map((_, i) => (
            <div key={i}>{i + 1}</div>
          ))}
        </div>
      )}
      <div className="relative min-w-0 flex-1">
        <pre className="pointer-events-none absolute inset-0 overflow-auto whitespace-pre px-4 py-4">
          <code>{highlightKosh(value)}</code>
        </pre>
        <textarea
          ref={ref}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          onScroll={sync}
          onKeyDown={handleKey}
          readOnly={readOnly}
          spellCheck={false}
          aria-label={ariaLabel}
          className="absolute inset-0 resize-none overflow-auto whitespace-pre bg-transparent px-4 py-4 text-transparent caret-[var(--accent)] outline-none"
        />
      </div>
    </div>
  )
}

export function EditorChrome({
  title,
  actions,
  children,
  className,
}: {
  title: ReactNode
  actions?: ReactNode
  children: ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        'flex flex-col overflow-hidden rounded-[14px] border border-border bg-[var(--surface-code)] shadow-[var(--shadow-md)]',
        className,
      )}
    >
      <div className="flex items-center justify-between border-b border-border bg-surface px-3 py-2">
        <div className="flex items-center gap-2 font-mono text-xs text-muted">{title}</div>
        <div className="flex items-center gap-1">{actions}</div>
      </div>
      {children}
    </div>
  )
}
