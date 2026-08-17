import { Container, Section } from '../components/ui/layout'
import { Button } from '../components/ui/Button'
import { Icon } from '../components/Icon'
import { Card, Eyebrow, Skeleton } from '../components/ui/primitives'
import { ErrorState, EmptyState } from '../components/ui/feedback'
import { PhaseBadge } from '../components/dev/OutputPanel'

export function NotFound() {
  return (
    <ErrorState code="404" title="Page not found" description="The page you’re looking for doesn’t exist or may have moved. The rest of the docs are still here.">
      <Button to="/">Back to home</Button>
      <Button to="/docs" variant="secondary">Browse docs</Button>
    </ErrorState>
  )
}

export function ServerError() {
  return (
    <ErrorState code="500" title="Something went wrong" description="An unexpected error occurred on our end. Please try again — if it persists, check the status page.">
      <Button to="/">Back to home</Button>
      <Button to="/status" variant="secondary">System status</Button>
    </ErrorState>
  )
}

/* A gallery collecting the loading / empty / error / unavailable states so they
   are all reachable and reviewable in one place. */
export function StatesGallery() {
  return (
    <>
      <Section className="border-b border-border bg-background-subtle !py-12">
        <Container>
          <Eyebrow icon="grid">States</Eyebrow>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-foreground">System states</h1>
          <p className="mt-3 max-w-2xl text-muted">Loading, empty, error and unavailable states used across the platform.</p>
        </Container>
      </Section>
      <Container className="space-y-12 py-14">
        <div>
          <h2 className="mb-4 text-lg font-semibold text-foreground">Loading (skeletons)</h2>
          <div className="grid gap-4 sm:grid-cols-3">
            {[0, 1, 2].map((i) => (
              <Card key={i} className="space-y-3 p-5">
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-3/4" />
                <Skeleton className="h-24 w-full" />
              </Card>
            ))}
          </div>
        </div>

        <div>
          <h2 className="mb-4 text-lg font-semibold text-foreground">Run lifecycle</h2>
          <Card className="flex flex-wrap gap-6 p-6">
            {(['idle', 'compiling', 'running', 'success', 'compile-error', 'runtime-error', 'timeout'] as const).map((p) => (
              <PhaseBadge key={p} phase={p} />
            ))}
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div>
            <h2 className="mb-4 text-lg font-semibold text-foreground">Empty</h2>
            <EmptyState icon="package" title="No packages found" description="Try a different search or clear filters." action={<Button variant="secondary" size="sm">Clear filters</Button>} />
          </div>
          <div>
            <h2 className="mb-4 text-lg font-semibold text-foreground">Unavailable / offline</h2>
            <div className="flex flex-col items-center justify-center rounded-[16px] border border-dashed border-border bg-background-subtle px-6 py-16 text-center">
              <Icon name="alert" size={28} className="text-[var(--warning)]" />
              <h3 className="mt-4 font-semibold text-foreground">You appear to be offline</h3>
              <p className="mt-1 max-w-sm text-sm text-muted">Check your connection. Cached documentation is still available.</p>
              <Button variant="secondary" size="sm" className="mt-5"><Icon name="refresh" size={15} /> Retry</Button>
            </div>
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <Card className="p-8"><NotFound /></Card>
          <Card className="p-8"><ServerError /></Card>
        </div>
      </Container>
    </>
  )
}
