import type { HTMLAttributes, ReactNode } from "react";
import { cx } from "../../lib/classes";

export type CalloutTone = "note" | "tip" | "warning" | "caution";

export type CalloutProps = HTMLAttributes<HTMLElement> & {
  tone?: CalloutTone;
  title: string;
  children: ReactNode;
};

export function Callout({ className, tone = "note", title, children, ...props }: CalloutProps) {
  return (
    <aside className={cx("ui-callout", `ui-callout-${tone}`, className)} {...props}>
      <h2>{title}</h2>
      <div>{children}</div>
    </aside>
  );
}
