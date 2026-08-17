import { useTheme, type ThemeChoice } from '../lib/theme'
import { SegmentedControl } from './ui/controls'
import { IconButton } from './ui/primitives'

/** Compact icon toggle that cycles Light → Dark → System (for headers). */
export function ThemeToggle() {
  const { choice, resolved, setChoice } = useTheme()
  const order: ThemeChoice[] = ['light', 'dark', 'system']
  const next = order[(order.indexOf(choice) + 1) % order.length]
  const icon = choice === 'system' ? 'system' : resolved === 'dark' ? 'moon' : 'sun'
  return (
    <IconButton
      icon={icon}
      label={`Theme: ${choice} (click for ${next})`}
      onClick={() => setChoice(next)}
    />
  )
}

/** Full segmented control for settings surfaces. */
export function ThemeSegmented() {
  const { choice, setChoice } = useTheme()
  return (
    <SegmentedControl<ThemeChoice>
      value={choice}
      onChange={setChoice}
      options={[
        { value: 'light', label: 'Light', icon: 'sun' },
        { value: 'dark', label: 'Dark', icon: 'moon' },
        { value: 'system', label: 'System', icon: 'system' },
      ]}
    />
  )
}
