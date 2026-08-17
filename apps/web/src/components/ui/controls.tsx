import {
  forwardRef,
  useId,
  useState,
  type InputHTMLAttributes,
  type ReactNode,
} from 'react'
import { cn } from '../../lib/cn'
import { Icon, type IconName } from '../Icon'
import { Kbd } from './primitives'

/* ---- SegmentedControl ----------------------------------------------------- */
export function SegmentedControl<T extends string>({
  options,
  value,
  onChange,
  size = 'md',
  className,
}: {
  options: { value: T; label: ReactNode; icon?: IconName }[]
  value: T
  onChange: (v: T) => void
  size?: 'sm' | 'md'
  className?: string
}) {
  return (
    <div
      role="tablist"
      className={cn(
        'inline-flex items-center gap-1 rounded-[10px] border border-border bg-background-subtle p-1',
        className,
      )}
    >
      {options.map((o) => {
        const active = o.value === value
        return (
          <button
            key={o.value}
            role="tab"
            aria-selected={active}
            onClick={() => onChange(o.value)}
            className={cn(
              'inline-flex items-center gap-1.5 rounded-[7px] font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[var(--ring)]',
              size === 'sm' ? 'h-7 px-2.5 text-[13px]' : 'h-8 px-3 text-sm',
              active
                ? 'bg-surface text-foreground shadow-[var(--shadow-sm)]'
                : 'text-muted hover:text-foreground',
            )}
          >
            {o.icon && <Icon name={o.icon} size={15} />}
            {o.label}
          </button>
        )
      })}
    </div>
  )
}

/* ---- Tabs (underline) ----------------------------------------------------- */
export function Tabs<T extends string>({
  tabs,
  value,
  onChange,
  className,
}: {
  tabs: { value: T; label: ReactNode; count?: number }[]
  value: T
  onChange: (v: T) => void
  className?: string
}) {
  return (
    <div className={cn('flex items-center gap-1 border-b border-border', className)}>
      {tabs.map((t) => {
        const active = t.value === value
        return (
          <button
            key={t.value}
            onClick={() => onChange(t.value)}
            aria-selected={active}
            className={cn(
              '-mb-px inline-flex items-center gap-2 border-b-2 px-3.5 py-2.5 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ring)]',
              active
                ? 'border-accent text-foreground'
                : 'border-transparent text-muted hover:text-foreground',
            )}
          >
            {t.label}
            {t.count !== undefined && (
              <span className="rounded-full bg-surface-hover px-1.5 text-xs tabular text-subtle">
                {t.count}
              </span>
            )}
          </button>
        )
      })}
    </div>
  )
}

/* ---- Input ---------------------------------------------------------------- */
export const Input = forwardRef<
  HTMLInputElement,
  InputHTMLAttributes<HTMLInputElement> & {
    icon?: IconName
    invalid?: boolean
    label?: string
    hint?: string
  }
>(function Input({ icon, invalid, label, hint, className, id, ...rest }, ref) {
  const gen = useId()
  const inputId = id ?? gen
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={inputId} className="text-sm font-medium text-foreground">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <Icon
            name={icon}
            size={17}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-subtle"
          />
        )}
        <input
          ref={ref}
          id={inputId}
          aria-invalid={invalid}
          className={cn(
            'h-10 w-full rounded-[10px] border bg-surface text-sm text-foreground transition-colors placeholder:text-subtle focus:outline-none focus-visible:border-[var(--ring)] focus-visible:ring-2 focus-visible:ring-[color-mix(in_srgb,var(--ring)_28%,transparent)]',
            icon ? 'pl-9 pr-3' : 'px-3',
            invalid
              ? 'border-[var(--error)]'
              : 'border-border hover:border-border-strong',
            className,
          )}
          {...rest}
        />
      </div>
      {hint && (
        <p className={cn('text-xs', invalid ? 'text-[var(--error)]' : 'text-subtle')}>
          {hint}
        </p>
      )}
    </div>
  )
})

/* ---- SearchInput (with ⌘K affordance) ------------------------------------- */
export function SearchInput({
  placeholder = 'Search…',
  onClick,
  shortcut,
  className,
  readOnly,
}: {
  placeholder?: string
  onClick?: () => void
  shortcut?: boolean
  className?: string
  readOnly?: boolean
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'group flex h-9 items-center gap-2 rounded-[10px] border border-border bg-background-subtle px-3 text-sm text-subtle transition-colors hover:border-border-strong hover:bg-surface focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ring)]',
        className,
      )}
    >
      <Icon name="search" size={16} />
      <span className="flex-1 text-left">{placeholder}</span>
      {shortcut && (
        <span className="hidden items-center gap-1 sm:flex">
          <Kbd>⌘</Kbd>
          <Kbd>K</Kbd>
        </span>
      )}
      {readOnly}
    </button>
  )
}

/* ---- Switch --------------------------------------------------------------- */
export function Switch({
  checked,
  onChange,
  label,
}: {
  checked: boolean
  onChange: (v: boolean) => void
  label?: string
}) {
  return (
    <button
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={cn(
        'relative inline-flex h-6 w-10 items-center rounded-full transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ring)]',
        checked ? 'bg-accent' : 'bg-surface-active',
      )}
    >
      <span
        className={cn(
          'inline-block size-4 rounded-full bg-white shadow transition-transform',
          checked ? 'translate-x-5' : 'translate-x-1',
        )}
      />
    </button>
  )
}

/* ---- Select (native, styled) --------------------------------------------- */
export function Select<T extends string>({
  value,
  onChange,
  options,
  className,
}: {
  value: T
  onChange: (v: T) => void
  options: { value: T; label: string }[]
  className?: string
}) {
  return (
    <div className={cn('relative inline-flex', className)}>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as T)}
        className="h-9 appearance-none rounded-[10px] border border-border bg-surface pl-3 pr-9 text-sm font-medium text-foreground hover:border-border-strong focus:outline-none focus-visible:border-[var(--ring)]"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      <Icon
        name="chevron-down"
        size={16}
        className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-subtle"
      />
    </div>
  )
}

/* ---- Copyable code line (small) ------------------------------------------ */
export function Checkbox({
  checked,
  onChange,
  label,
}: {
  checked: boolean
  onChange: (v: boolean) => void
  label?: ReactNode
}) {
  const [focus, setFocus] = useState(false)
  return (
    <label className="inline-flex cursor-pointer items-center gap-2 text-sm text-foreground">
      <span
        className={cn(
          'inline-flex size-4.5 items-center justify-center rounded-[5px] border transition-colors',
          checked ? 'border-accent bg-accent text-[var(--accent-contrast)]' : 'border-border-strong bg-surface',
          focus && 'ring-2 ring-[color-mix(in_srgb,var(--ring)_28%,transparent)]',
        )}
        style={{ width: 18, height: 18 }}
      >
        {checked && <Icon name="check" size={12} />}
      </span>
      <input
        type="checkbox"
        className="sr-only"
        checked={checked}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        onChange={(e) => onChange(e.target.checked)}
      />
      {label}
    </label>
  )
}
