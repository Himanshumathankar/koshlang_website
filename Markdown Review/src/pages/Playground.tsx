import { useState } from 'react'
import { Icon } from '../components/Icon'
import { cn } from '../lib/cn'
import { Button } from '../components/ui/Button'
import { Select, SegmentedControl } from '../components/ui/controls'
import { Badge, IconButton } from '../components/ui/primitives'
import { Toast } from '../components/ui/feedback'
import { CodeEditor } from '../components/dev/CodeEditor'
import { OutputPanel } from '../components/dev/OutputPanel'
import { CopyButton } from '../components/dev/CodeBlock'
import { highlightKosh } from '../lib/highlight'
import { useKoshRun } from '../components/dev/useKoshRun'
import { examples, KOSH_VERSION } from '../data/content'

type View = 'source' | 'ast' | 'ir' | 'llvm' | 'asm'

const DEFAULT = `fn main() {
    let greeting = "Hello from KoshLang!"
    print(greeting)

    let squares = (1..=5).map(fn(n) { n * n })
    print("squares: " + squares.to_string())
}

// Tip: try adding panic("boom") to see a runtime error,
// or remove a closing brace to see a compile error.
`

/* Illustrative compiler-view output. Not a real compiler — clearly a design. */
function derived(view: View, src: string): string {
  if (view === 'ast')
    return `Module\n└─ Fn "main"\n   └─ Block\n      ├─ Let "greeting" : String\n      ├─ Call print(greeting)\n      ├─ Let "squares" : List<Int>\n      │  └─ MethodCall map(Range, Closure)\n      └─ Call print(concat)`
  if (view === 'ir')
    return `fn main() -> unit {\n  %0 = const.str "Hello from KoshLang!"\n  call @print(%0)\n  %1 = range.new 1, 5\n  %2 = iter.map %1, @closure.0\n  %3 = list.to_string %2\n  call @print(%3)\n  ret\n}`
  if (view === 'llvm')
    return `define void @main() {\nentry:\n  %g = call ptr @kosh_str(i8* @.str)\n  call void @print(ptr %g)\n  %r = call %Range @range_new(i64 1, i64 5)\n  ret void\n}`
  if (view === 'asm')
    return `main:\n  push rbp\n  mov  rbp, rsp\n  lea  rdi, [rip + .Lstr]\n  call kosh_print\n  xor  eax, eax\n  pop  rbp\n  ret`
  return src
}

export function Playground() {
  const [code, setCode] = useState(DEFAULT)
  const [view, setView] = useState<View>('source')
  const [advanced, setAdvanced] = useState(false)
  const [stdin, setStdin] = useState('')
  const [toast, setToast] = useState<string | null>(null)
  const { phase, result, run, reset } = useKoshRun()
  const busy = phase === 'compiling' || phase === 'running'

  return (
    <div className="flex h-[calc(100vh-4rem)] flex-col">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-2 border-b border-border bg-surface px-4 py-2">
        <div className="flex items-center gap-2 font-mono text-sm text-foreground">
          <Icon name="playground" size={16} className="text-accent" /> Kosh Playground
        </div>
        <Select
          value=""
          onChange={(slug) => {
            const ex = examples.find((e) => e.slug === slug)
            if (ex) {
              setCode(ex.code)
              reset()
            }
          }}
          className="ml-2"
          options={[{ value: '', label: 'Examples ▾' }, ...examples.map((e) => ({ value: e.slug, label: e.title }))]}
        />
        <div className="ml-auto flex items-center gap-1.5">
          <button onClick={() => setToast('Share link copied')} className="hidden items-center gap-1.5 rounded-[8px] px-2.5 py-1.5 text-sm text-muted hover:bg-surface-hover hover:text-foreground sm:inline-flex">
            <Icon name="share" size={15} /> Share
          </button>
          <button onClick={() => setToast('Formatted')} className="hidden items-center gap-1.5 rounded-[8px] px-2.5 py-1.5 text-sm text-muted hover:bg-surface-hover hover:text-foreground sm:inline-flex">
            <Icon name="refresh" size={15} /> Format
          </button>
          <IconButton icon="refresh" label="Reset" className="sm:hidden" onClick={() => { setCode(DEFAULT); reset() }} />
          <Button size="sm" onClick={() => run(code)} disabled={busy} loading={busy}>
            {!busy && <Icon name="play" size={14} />} Run
          </Button>
        </div>
      </div>

      {/* Advanced toggle bar */}
      <div className="flex items-center justify-between gap-2 border-b border-border bg-background-subtle px-4 py-1.5">
        <div className="flex items-center gap-3">
          {advanced ? (
            <SegmentedControl<View>
              size="sm"
              value={view}
              onChange={setView}
              options={[
                { value: 'source', label: 'Source' },
                { value: 'ast', label: 'AST' },
                { value: 'ir', label: 'IR' },
                { value: 'llvm', label: 'LLVM IR' },
                { value: 'asm', label: 'Assembly' },
              ]}
            />
          ) : (
            <span className="font-mono text-xs text-subtle">main.kosh</span>
          )}
        </div>
        <button
          onClick={() => { setAdvanced((a) => !a); setView('source') }}
          className="inline-flex items-center gap-1.5 rounded-[8px] px-2 py-1 text-xs font-medium text-muted hover:bg-surface-hover hover:text-foreground"
        >
          <Icon name="cpu" size={14} /> {advanced ? 'Simple mode' : 'Advanced mode'}
        </button>
      </div>

      {/* Panes */}
      <div className={cn('grid min-h-0 flex-1', advanced ? 'lg:grid-cols-2' : 'lg:grid-cols-[1.5fr_1fr]', 'grid-rows-2 lg:grid-rows-none')}>
        {/* editor / derived views */}
        <div className="flex min-h-0 flex-col border-b border-border lg:border-b-0 lg:border-r">
          {view === 'source' ? (
            <CodeEditor value={code} onChange={setCode} ariaLabel="Playground editor" />
          ) : (
            <div className="min-h-0 flex-1 overflow-auto bg-[var(--surface-code)] p-4">
              <pre className="font-mono text-[13px] leading-6">
                <code>{highlightKosh(derived(view, code))}</code>
              </pre>
            </div>
          )}
          {!advanced && (
            <div className="border-t border-border bg-surface">
              <label className="flex items-center gap-2 px-3 py-1.5 font-mono text-[11px] uppercase tracking-wider text-subtle">
                <Icon name="terminal" size={13} /> stdin
              </label>
              <textarea
                value={stdin}
                onChange={(e) => setStdin(e.target.value)}
                rows={2}
                placeholder="Program input…"
                className="w-full resize-none border-t border-border bg-transparent px-3 py-2 font-mono text-[13px] text-foreground outline-none placeholder:text-subtle"
              />
            </div>
          )}
        </div>

        {/* output / diagnostics */}
        {advanced && view !== 'source' ? (
          <div className="flex min-h-0 flex-col bg-[var(--surface-code)]">
            <div className="border-b border-border px-3 py-2 font-mono text-[11px] uppercase tracking-wider text-subtle">
              {view.toUpperCase()} — split view
            </div>
            <div className="min-h-0 flex-1 overflow-auto p-4">
              <pre className="font-mono text-[13px] leading-6"><code>{highlightKosh(derived(view, code))}</code></pre>
            </div>
          </div>
        ) : (
          <OutputPanel phase={phase} result={result} />
        )}
      </div>

      {/* Status bar */}
      <div className="flex items-center justify-between gap-4 border-t border-border bg-surface px-4 py-1.5 font-mono text-[11px] text-subtle">
        <div className="flex items-center gap-3">
          <span>KoshLang {KOSH_VERSION}</span>
          <Badge tone={phase === 'idle' ? 'neutral' : busy ? 'accent' : phase === 'success' ? 'success' : 'error'}>
            {phase === 'idle' ? 'Ready' : phase}
          </Badge>
        </div>
        <div className="flex items-center gap-3">
          {result && <span>Execution {result.compileMs + result.runMs}ms</span>}
          <CopyButton text={code} label="Copy" />
        </div>
      </div>

      {toast && <Toast message={toast} onDone={() => setToast(null)} />}
    </div>
  )
}
