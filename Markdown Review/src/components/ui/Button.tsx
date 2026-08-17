import { forwardRef, type ButtonHTMLAttributes } from 'react'
import { Link, type LinkProps } from 'react-router'
import { cn } from '../../lib/cn'
import { Icon } from '../Icon'

type Variant = 'primary' | 'secondary' | 'ghost' | 'outline' | 'danger'
type Size = 'sm' | 'md' | 'lg'

const base =
  'relative inline-flex items-center justify-center gap-2 font-medium select-none whitespace-nowrap rounded-[10px] transition-[background,color,border,box-shadow,transform] duration-150 active:translate-y-px disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ring)]'

const variants: Record<Variant, string> = {
  primary:
    'bg-accent text-[var(--accent-contrast)] hover:bg-accent-hover shadow-[var(--shadow-sm)]',
  secondary:
    'bg-surface text-foreground border border-border hover:bg-surface-hover hover:border-border-strong',
  outline:
    'bg-transparent text-foreground border border-border hover:bg-surface-hover',
  ghost: 'bg-transparent text-muted hover:bg-surface-hover hover:text-foreground',
  danger: 'bg-[var(--error)] text-white hover:opacity-90',
}

const sizes: Record<Size, string> = {
  sm: 'h-8 px-3 text-[13px]',
  md: 'h-10 px-4 text-sm',
  lg: 'h-12 px-6 text-[15px]',
}

type CommonProps = {
  variant?: Variant
  size?: Size
  loading?: boolean
  block?: boolean
}

type ButtonAsButton = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { to?: undefined }
type ButtonAsLink = CommonProps & Omit<LinkProps, 'className'> & { to: string }

export const Button = forwardRef<HTMLButtonElement, ButtonAsButton | ButtonAsLink>(
  function Button(props, ref) {
    const {
      variant = 'primary',
      size = 'md',
      loading,
      block,
      children,
      className,
      ...rest
    } = props as CommonProps & {
      children?: React.ReactNode
      className?: string
    } & Record<string, unknown>

    const classes = cn(
      base,
      variants[variant],
      sizes[size],
      block && 'w-full',
      className,
    )

    const content = (
      <>
        {loading && (
          <Icon name="spinner" size={16} className="animate-spin" />
        )}
        <span className={cn(loading && 'opacity-80')}>{children}</span>
      </>
    )

    if ('to' in props && props.to !== undefined) {
      return (
        <Link
          to={props.to}
          className={classes}
          {...(rest as Omit<LinkProps, 'to' | 'className'>)}
        >
          {content}
        </Link>
      )
    }

    return (
      <button
        ref={ref}
        className={classes}
        disabled={loading || (rest as ButtonHTMLAttributes<HTMLButtonElement>).disabled}
        {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}
      >
        {content}
      </button>
    )
  },
)
