import { type ReactNode } from 'react'

/* A small, honest tokenizer for the fictional `.kosh` language. It is good
   enough to make code surfaces beautiful and consistent — not a real parser. */

const KEYWORDS = new Set([
  'fn',
  'let',
  'mut',
  'const',
  'return',
  'if',
  'else',
  'match',
  'for',
  'while',
  'loop',
  'in',
  'break',
  'continue',
  'struct',
  'enum',
  'trait',
  'impl',
  'type',
  'module',
  'use',
  'pub',
  'async',
  'await',
  'spawn',
  'defer',
  'where',
  'as',
  'self',
])

const LITERALS = new Set(['true', 'false', 'nil', 'Some', 'None', 'Ok', 'Err'])
const TYPES = new Set([
  'Int',
  'Float',
  'Bool',
  'String',
  'Char',
  'Byte',
  'List',
  'Map',
  'Set',
  'Option',
  'Result',
  'Vec',
  'Task',
])

type Tok = { text: string; cls: string | null }

function classify(word: string, nextChar: string): string | null {
  if (KEYWORDS.has(word)) return 'text-[var(--code-keyword)]'
  if (LITERALS.has(word)) return 'text-[var(--code-number)]'
  if (TYPES.has(word) || /^[A-Z]/.test(word)) return 'text-[var(--code-type)]'
  if (nextChar === '(') return 'text-[var(--code-function)]'
  return null
}

function tokenizeLine(line: string): Tok[] {
  const toks: Tok[] = []
  let i = 0
  while (i < line.length) {
    const ch = line[i]

    // comments
    if (ch === '/' && line[i + 1] === '/') {
      toks.push({ text: line.slice(i), cls: 'text-[var(--code-comment)] italic' })
      break
    }
    // strings
    if (ch === '"') {
      let j = i + 1
      while (j < line.length && line[j] !== '"') {
        if (line[j] === '\\') j++
        j++
      }
      toks.push({ text: line.slice(i, j + 1), cls: 'text-[var(--code-string)]' })
      i = j + 1
      continue
    }
    // numbers
    if (/[0-9]/.test(ch)) {
      let j = i
      while (j < line.length && /[0-9._a-fx]/.test(line[j])) j++
      toks.push({ text: line.slice(i, j), cls: 'text-[var(--code-number)]' })
      i = j
      continue
    }
    // identifiers / keywords
    if (/[A-Za-z_]/.test(ch)) {
      let j = i
      while (j < line.length && /[A-Za-z0-9_]/.test(line[j])) j++
      const word = line.slice(i, j)
      let k = j
      while (k < line.length && line[k] === ' ') k++
      toks.push({ text: word, cls: classify(word, line[k] ?? '') })
      i = j
      continue
    }
    // operators / punctuation
    if (/[+\-*/%=<>!&|^~?:.]/.test(ch)) {
      let j = i
      while (j < line.length && /[+\-*/%=<>!&|^~?:.]/.test(line[j])) j++
      toks.push({ text: line.slice(i, j), cls: 'text-[var(--code-operator)]' })
      i = j
      continue
    }
    // whitespace + brackets fall through as plain
    toks.push({ text: ch, cls: null })
    i++
  }
  return toks
}

export function highlightKosh(code: string): ReactNode {
  const lines = code.replace(/\n$/, '').split('\n')
  return lines.map((line, li) => (
    <span key={li} className="block min-h-[1.5em]">
      {tokenizeLine(line).map((t, ti) =>
        t.cls ? (
          <span key={ti} className={t.cls}>
            {t.text}
          </span>
        ) : (
          <span key={ti} className="text-[var(--code-plain)]">
            {t.text}
          </span>
        ),
      )}
    </span>
  ))
}
