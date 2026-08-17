import { useState, type ReactNode } from 'react'
import { cn } from '../../lib/cn'
import { highlightKosh } from '../../lib/highlight'
import { Icon } from '../Icon'

export function CopyButton({
  text,
  className,
  label = 'Copy',
}: {
  text: string
  className?: string
  label?: string
}) {
  const [copied, setCopied] = useState(false)
  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(text)
        } catch {
          /* clipboard may be unavailable in the preview sandbox */
        }
        setCopied(true)
        setTimeout(() => setCopied(false), 1600)
      }}
      className={cn(
        'inline-flex items-center gap-1.5 rounded-[8px] px-2 py-1 text-xs font-medium text-muted transition-colors hover:bg-surface-hover hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[var(--ring)]',
        className,
      )}
      aria-label={copied ? 'Copied' : label}
    >
      <Icon name={copied ? 'check' : 'copy'} size={14} className={copied ? 'text-[var(--success)]' : ''} />
      {copied ? 'Copied' : label}
    </button>
  )
}

export function CodeBlock({
  code,
  filename,
  language = 'kosh',
  showLineNumbers = true,
  actions,
  className,
}: {
  code: string
  filename?: string
  language?: string
  showLineNumbers?: boolean
  actions?: ReactNode
  className?: string
}) {
  const trimmed = code.replace(/^\n/, '').replace(/\s+$/, '')
  const lineCount = trimmed.split('\n').length
  return (
    <div
      className={cn(
        'overflow-hidden rounded-[12px] border border-border bg-[var(--surface-code)]',
        className,
      )}
    >
      {(filename || actions) && (
        <div className="flex items-center justify-between border-b border-border px-3 py-2">
          <div className="flex items-center gap-2 font-mono text-xs text-muted">
            {filename && <Icon name="file" size={14} className="text-subtle" />}
            {filename ?? language}
          </div>
          <div className="flex items-center gap-1">
            {actions}
            <CopyButton text={trimmed} />
          </div>
        </div>
      )}
      <div className="overflow-x-auto">
        <pre className="flex min-w-full py-3 font-mono text-[13px] leading-6">
          {showLineNumbers && (
            <div
              aria-hidden
              className="select-none border-r border-border-subtle px-3 text-right text-subtle"
            >
              {Array.from({ length: lineCount }, (_, i) => (
                <div key={i}>{i + 1}</div>
              ))}
            </div>
          )}
          <code className="block flex-1 px-4">{highlightKosh(trimmed)}</code>
        </pre>
      </div>
    </div>
  )
}
