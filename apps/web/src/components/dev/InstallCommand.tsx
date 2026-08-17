import { cn } from '../../lib/cn'
import { Icon } from '../Icon'
import { CopyButton } from './CodeBlock'

/** A single copyable terminal command line — the recurring install motif. */
export function InstallCommand({
  command,
  prompt = '$',
  className,
}: {
  command: string
  prompt?: string
  className?: string
}) {
  return (
    <div
      className={cn(
        'flex items-center gap-3 rounded-[12px] border border-border bg-[var(--surface-code)] px-4 py-3',
        className,
      )}
    >
      <Icon name="terminal" size={16} className="shrink-0 text-subtle" />
      <code className="min-w-0 flex-1 overflow-x-auto whitespace-nowrap font-mono text-sm text-foreground">
        <span className="mr-2 select-none text-accent">{prompt}</span>
        {command}
      </code>
      <CopyButton text={command} className="shrink-0" />
    </div>
  )
}
