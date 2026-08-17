import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react'

export type ThemeChoice = 'light' | 'dark' | 'system'

type ThemeContextValue = {
  choice: ThemeChoice
  resolved: 'light' | 'dark'
  setChoice: (choice: ThemeChoice) => void
}

const ThemeContext = createContext<ThemeContextValue | null>(null)
const STORAGE_KEY = 'kosh-theme'

function systemPrefersDark() {
  return (
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-color-scheme: dark)').matches
  )
}

function resolve(choice: ThemeChoice): 'light' | 'dark' {
  if (choice === 'system') return systemPrefersDark() ? 'dark' : 'light'
  return choice
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [choice, setChoiceState] = useState<ThemeChoice>(() => {
    if (typeof window === 'undefined') return 'system'
    return (localStorage.getItem(STORAGE_KEY) as ThemeChoice) || 'system'
  })
  const [resolved, setResolved] = useState<'light' | 'dark'>(() =>
    resolve(choice),
  )

  useEffect(() => {
    const next = resolve(choice)
    setResolved(next)
    const root = document.documentElement
    root.classList.toggle('dark', next === 'dark')
    root.style.colorScheme = next
  }, [choice])

  useEffect(() => {
    if (choice !== 'system') return
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const onChange = () => {
      const next = mq.matches ? 'dark' : 'light'
      setResolved(next)
      document.documentElement.classList.toggle('dark', next === 'dark')
      document.documentElement.style.colorScheme = next
    }
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [choice])

  const setChoice = (next: ThemeChoice) => {
    localStorage.setItem(STORAGE_KEY, next)
    setChoiceState(next)
  }

  return (
    <ThemeContext.Provider value={{ choice, resolved, setChoice }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider')
  return ctx
}
