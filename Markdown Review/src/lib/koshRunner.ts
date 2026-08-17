/* A *simulated* KoshLang compile/run engine. It never executes anything — it
   deterministically inspects source text to drive honest playground states
   (success / compile error / runtime error / timeout). No real language
   exists; this is clearly labeled design behavior. */

export type RunPhase =
  | 'idle'
  | 'compiling'
  | 'running'
  | 'success'
  | 'compile-error'
  | 'runtime-error'
  | 'timeout'

export type Diagnostic = {
  severity: 'error' | 'warning'
  line: number
  column: number
  message: string
  code: string
}

export type RunResult = {
  phase: Extract<RunPhase, 'success' | 'compile-error' | 'runtime-error' | 'timeout'>
  stdout: string
  diagnostics: Diagnostic[]
  compileMs: number
  runMs: number
}

/** Extract the arguments of print(...) calls, honoring "..." strings. */
function collectPrints(src: string): string[] {
  const out: string[] = []
  const re = /print(?:ln)?\s*\(\s*"((?:[^"\\]|\\.)*)"\s*\)/g
  let m: RegExpExecArray | null
  while ((m = re.exec(src))) {
    out.push(m[1].replace(/\\n/g, '\n').replace(/\\"/g, '"'))
  }
  return out
}

function balancedBraces(src: string): boolean {
  let depth = 0
  for (const ch of src) {
    if (ch === '{') depth++
    if (ch === '}') depth--
    if (depth < 0) return false
  }
  return depth === 0
}

export function analyze(src: string): RunResult {
  const compileMs = 40 + Math.round((src.length % 60) + Math.random() * 30)

  // Compile error: unbalanced braces.
  if (!balancedBraces(src)) {
    const line = Math.max(1, src.split('\n').length)
    return {
      phase: 'compile-error',
      stdout: '',
      compileMs,
      runMs: 0,
      diagnostics: [
        {
          severity: 'error',
          line,
          column: 1,
          code: 'E0102',
          message: 'unmatched delimiter: expected `}` to close block',
        },
      ],
    }
  }

  // Compile error: no entry point.
  if (!/fn\s+main\s*\(/.test(src)) {
    return {
      phase: 'compile-error',
      stdout: '',
      compileMs,
      runMs: 0,
      diagnostics: [
        {
          severity: 'error',
          line: 1,
          column: 1,
          code: 'E0601',
          message: '`main` function not found in this module',
        },
      ],
    }
  }

  // Deliberate triggers so all states are reachable from the editor.
  if (/panic\s*\(/.test(src) || /\/\/\s*@runtime-error/.test(src)) {
    return {
      phase: 'runtime-error',
      stdout: collectPrints(src).join('\n'),
      compileMs,
      runMs: 12,
      diagnostics: [
        {
          severity: 'error',
          line: src.split('\n').findIndex((l) => /panic|@runtime-error/.test(l)) + 1,
          column: 5,
          code: 'RT-PANIC',
          message: "runtime panic: called `Option.unwrap()` on a `None` value",
        },
      ],
    }
  }

  if (/loop\s*\{[^}]*\}/.test(src) && !/break/.test(src)) {
    return {
      phase: 'timeout',
      stdout: collectPrints(src).join('\n'),
      compileMs,
      runMs: 5000,
      diagnostics: [
        {
          severity: 'error',
          line: 1,
          column: 1,
          code: 'RT-TIMEOUT',
          message: 'execution exceeded the 5s sandbox limit and was terminated',
        },
      ],
    }
  }

  const prints = collectPrints(src)
  return {
    phase: 'success',
    stdout: prints.length ? prints.join('\n') : '(program produced no output)',
    compileMs,
    runMs: 3 + Math.round(Math.random() * 20),
    diagnostics: [],
  }
}
