import { type ReactNode } from 'react'
import { Link } from 'react-router'
import { cn } from '../../lib/cn'
import { Icon } from '../Icon'

export function Container({
  children,
  className,
  size = 'default',
}: {
  children: ReactNode
  className?: string
  size?: 'default' | 'narrow' | 'wide'
}) {
  return (
    <div
      className={cn(
        'mx-auto w-full px-4 sm:px-6',
        size === 'narrow' ? 'max-w-3xl' : size === 'wide' ? 'max-w-[1440px]' : 'max-w-[1280px]',
        className,
      )}
    >
      {children}
    </div>
  )
}

export function Breadcrumb({ items }: { items: { label: string; to?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1.5 text-sm text-subtle">
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-1.5">
          {item.to ? (
            <Link to={item.to} className="hover:text-foreground">{item.label}</Link>
          ) : (
            <span className="text-muted">{item.label}</span>
          )}
          {i < items.length - 1 && <Icon name="chevron-right" size={13} />}
        </span>
      ))}
    </nav>
  )
}

/** Marketing page header block. */
export function PageHeader({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow?: ReactNode
  title: string
  description?: ReactNode
  children?: ReactNode
}) {
  return (
    <div className="border-b border-border bg-background-subtle">
      <Container className="py-14 md:py-20">
        {eyebrow && <div className="mb-4">{eyebrow}</div>}
        <h1 className="max-w-2xl text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
          {title}
        </h1>
        {description && (
          <p className="mt-4 max-w-2xl text-lg text-muted">{description}</p>
        )}
        {children && <div className="mt-8">{children}</div>}
      </Container>
    </div>
  )
}

/** Vertical rhythm helper for marketing sections. */
export function Section({
  children,
  className,
  bordered,
  subtle,
}: {
  children: ReactNode
  className?: string
  bordered?: boolean
  subtle?: boolean
}) {
  return (
    <section
      className={cn(
        'py-16 md:py-24',
        bordered && 'border-b border-border',
        subtle && 'bg-background-subtle',
        className,
      )}
    >
      {children}
    </section>
  )
}
