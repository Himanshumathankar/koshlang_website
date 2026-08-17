import type { HTMLAttributes, ReactNode } from "react";
import { cx } from "../../lib/classes";

export type BreadcrumbItem = {
  label: string;
  href?: string;
};

export function Breadcrumb({ items, className, ...props }: HTMLAttributes<HTMLElement> & { items: BreadcrumbItem[] }) {
  return (
    <nav className={cx("ui-breadcrumb", className)} aria-label="Breadcrumb" {...props}>
      <ol>
        {items.map((item, index) => (
          <li key={`${item.label}-${index}`}>
            {item.href && index < items.length - 1 ? <a href={item.href}>{item.label}</a> : <span aria-current="page">{item.label}</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export type TableOfContentsItem = {
  id: string;
  label: string;
};

export function TableOfContents({ items, className, ...props }: HTMLAttributes<HTMLElement> & { items: TableOfContentsItem[] }) {
  return (
    <nav className={cx("ui-toc", className)} aria-label="On this page" {...props}>
      <h2>On This Page</h2>
      {items.map((item) => (
        <a key={item.id} href={`#${item.id}`}>
          {item.label}
        </a>
      ))}
    </nav>
  );
}

export function DrawerSurface({ children, className, ...props }: HTMLAttributes<HTMLDivElement> & { children: ReactNode }) {
  return (
    <div className={cx("ui-drawer", className)} role="dialog" aria-modal="true" {...props}>
      {children}
    </div>
  );
}
