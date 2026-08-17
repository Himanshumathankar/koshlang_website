import { cn } from '../../lib/cn'
import { Icon, type IconName } from '../Icon'
import { Spinner, StatusDot } from '../ui/primitives'
import type { RunPhase, RunResult } from '../../lib/koshRunner'

const phaseMeta: Record<
  RunPhase,
  { label: string; tone: 'neutral' | 'accent' | 'success' | 'error' | 'warning'; icon?: IconName }
> = {
  idle: { label: 'Ready', tone: 'neutral' },
  compiling: { label: 'Compiling', tone: 'accent' },
  running: { label: 'Running', tone: 'accent' },
  success: { label: 'Success', tone: 'success', icon: 'check' },
  'compile-error': { label: 'Compile error', tone: 'error', icon: 'close' },
  'runtime-error': { label: 'Runtime error', tone: 'error', icon: 'alert' },
  timeout: { label: 'Timed out', tone: 'warning', icon: 'warning' },
}

export function PhaseBadge({ phase }: { phase: RunPhase }) {
  const m = phaseMeta[phase]
  const busy = phase === 'compiling' || phase === 'running'
  return (
    <span className="inline-flex items-center gap-1.5 font-mono text-xs font-medium text-muted">
      {busy ? (
        <Spinner size={13} />
      ) : m.icon ? (
        <Icon name={m.icon} size={13} className={`text-[var(--${m.tone === 'neutral' ? 'subtle' : m.tone})]`} />
      ) : (
        <StatusDot tone={m.tone} />
      )}
      {m.label}
      {busy && <span className="inline-flex w-4 animate-pulse">…</span>}
    </span>
  )
}

export function OutputPanel({
  phase,
  result,
  className,
  compact,
}: {
  phase: RunPhase
  result: RunResult | null
  className?: string
  compact?: boolean
}) {
  const errorPhase = phase === 'compile-error' || phase === 'runtime-error' || phase === 'timeout'
  return (
    <div className={cn('flex min-h-0 flex-col', className)}>
      <div className="flex items-center justify-between border-b border-border px-3 py-2">
        <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-subtle">
          Output
        </span>
        <PhaseBadge phase={phase} />
      </div>
      <div className={cn('min-h-0 flex-1 overflow-auto p-3 font-mono text-[13px] leading-6', compact && 'max-h-40')}>
        {phase === 'idle' && (
          <p className="text-subtle">Press Run to compile and execute this program.</p>
        )}
        {(phase === 'compiling' || phase === 'running') && (
          <p className="text-muted">
            {phase === 'compiling' ? 'kosh compiler · type-checking…' : 'executing in sandbox…'}
          </p>
        )}

        {result && result.stdout && (
          <pre className="whitespace-pre-wrap text-foreground">{result.stdout}</pre>
        )}

        {errorPhase && result && (
          <div className="mt-2 space-y-2">
            {result.diagnostics.map((d, i) => (
              <div
                key={i}
                className="rounded-[8px] border-l-2 border-[var(--error)] bg-[color-mix(in_srgb,var(--error)_8%,transparent)] px-3 py-2"
              >
                <div className="flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-wide text-[var(--error)]">
                  <Icon name="alert" size={12} />
                  {d.severity} · {d.code}
                  <span className="text-subtle">
                    main.kosh:{d.line}:{d.column}
                  </span>
                </div>
                <p className="mt-1 text-foreground">{d.message}</p>
              </div>
            ))}
          </div>
        )}
      </div>
      {result && (phase === 'success' || errorPhase) && (
        <div className="flex items-center gap-4 border-t border-border px-3 py-1.5 font-mono text-[11px] text-subtle tabular">
          <span>compile {result.compileMs}ms</span>
          <span>run {result.runMs}ms</span>
        </div>
      )}
    </div>
  )
}
