import { useCallback, useRef, useState } from 'react'
import { analyze, type RunPhase, type RunResult } from '../../lib/koshRunner'

/* Drives the simulated compile/run lifecycle with realistic timing so the
   playground and hero can show idle → compiling → running → result. */
export function useKoshRun() {
  const [phase, setPhase] = useState<RunPhase>('idle')
  const [result, setResult] = useState<RunResult | null>(null)
  const timers = useRef<number[]>([])

  const reset = useCallback(() => {
    timers.current.forEach(clearTimeout)
    timers.current = []
    setPhase('idle')
    setResult(null)
  }, [])

  const run = useCallback((src: string) => {
    timers.current.forEach(clearTimeout)
    timers.current = []
    setResult(null)
    setPhase('compiling')
    const outcome = analyze(src)

    timers.current.push(
      window.setTimeout(() => {
        if (outcome.phase === 'compile-error') {
          setResult(outcome)
          setPhase('compile-error')
          return
        }
        setPhase('running')
        timers.current.push(
          window.setTimeout(() => {
            setResult(outcome)
            setPhase(outcome.phase)
          }, Math.min(700, 180 + outcome.runMs / 8)),
        )
      }, 420),
    )
  }, [])

  return { phase, result, run, reset }
}
