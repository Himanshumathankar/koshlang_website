import type { HTMLAttributes, ReactNode } from "react";
import { cx } from "../../lib/classes";

export type EmptyStateProps = HTMLAttributes<HTMLElement> & {
  title: string;
  description: string;
  action?: ReactNode;
};

export function EmptyState({ className, title, description, action, ...props }: EmptyStateProps) {
  return (
    <section className={cx("ui-state", className)} {...props}>
      <h2>{title}</h2>
      <p className="ui-muted">{description}</p>
      {action ? <div>{action}</div> : null}
    </section>
  );
}

export type ErrorStateProps = EmptyStateProps & {
  retry?: ReactNode;
};

export function ErrorState({ retry, action, ...props }: ErrorStateProps) {
  return <EmptyState action={retry ?? action} {...props} />;
}

export function Skeleton({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cx("ui-skeleton", className)} aria-hidden="true" {...props} />;
}

export function Spinner({ className, label = "Loading" }: { className?: string; label?: string }) {
  return (
    <span className={cx("ui-spinner", className)} role="status">
      <span className="ui-sr-only">{label}</span>
    </span>
  );
}
