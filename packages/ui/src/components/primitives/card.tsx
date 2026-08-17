import type { HTMLAttributes, ReactNode } from "react";
import { cx } from "../../lib/classes";

export type CardProps = HTMLAttributes<HTMLElement> & {
  title?: string;
  description?: string;
  footer?: ReactNode;
};

export function Card({ className, title, description, footer, children, ...props }: CardProps) {
  return (
    <article className={cx("ui-card", className)} {...props}>
      {title ? <h3>{title}</h3> : null}
      {description ? <p className="ui-muted">{description}</p> : null}
      {children}
      {footer ? <footer>{footer}</footer> : null}
    </article>
  );
}
