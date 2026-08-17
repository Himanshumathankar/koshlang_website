import { useState } from 'react'
import { Link } from 'react-router'
import { Icon } from '../Icon'
import { CodeEditor, EditorChrome } from './CodeEditor'
import { OutputPanel } from './OutputPanel'
import { CopyButton } from './CodeBlock'
import { useKoshRun } from './useKoshRun'

const SAMPLE = `fn main() {
    let langs = ["Kosh", "the future"]

    for name in langs {
        print("Hello from " + name + "!")
    }

    let sum = fold(1..=10, 0, fn(a, b) { a + b })
    print("sum 1..10 = " + sum.to_string())
}
`

/* The interactive code hero — KoshLang's recognizable visual motif. Editable,
   runnable (simulated), and fully themed. */
export function CodeHero() {
  const [code, setCode] = useState(SAMPLE)
  const { phase, result, run, reset } = useKoshRun()
  const busy = phase === 'compiling' || phase === 'running'

  return (
    <EditorChrome
      title={
        <>
          <Icon name="kosh" size={15} className="text-accent" />
          main.kosh
        </>
      }
      actions={
        <>
          <button
            onClick={reset}
            className="inline-flex items-center gap-1.5 rounded-[8px] px-2 py-1 text-xs font-medium text-muted transition-colors hover:bg-surface-hover hover:text-foreground"
          >
            <Icon name="refresh" size={14} /> Format
          </button>
          <CopyButton text={code} />
          <button
            onClick={() => run(code)}
            disabled={busy}
            className="inline-flex items-center gap-1.5 rounded-[8px] bg-accent px-2.5 py-1 text-xs font-semibold text-[var(--accent-contrast)] transition-colors hover:bg-accent-hover disabled:opacity-60"
          >
            <Icon name="play" size={13} /> Run
          </button>
        </>
      }
    >
      <div className="grid grid-rows-[minmax(220px,1fr)_auto] md:grid-rows-none md:grid-cols-[1.4fr_1fr]">
        <div className="flex min-h-[220px] flex-col border-b border-border md:border-b-0 md:border-r">
          <CodeEditor value={code} onChange={setCode} ariaLabel="KoshLang hero editor" />
        </div>
        <OutputPanel phase={phase} result={result} className="min-h-[150px]" />
      </div>
      <div className="flex items-center justify-between gap-2 border-t border-border bg-surface px-3 py-1.5 font-mono text-[11px] text-subtle">
        <span>KoshLang 1.4.0 · stable channel</span>
        <Link to="/play" className="inline-flex items-center gap-1 hover:text-accent">
          Open in Playground <Icon name="arrow-right" size={12} />
        </Link>
      </div>
    </EditorChrome>
  )
}
