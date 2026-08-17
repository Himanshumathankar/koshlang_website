import type { HTMLAttributes } from "react";
import { cx } from "../../lib/classes";

export type TabItem = {
  id: string;
  label: string;
};

export function Tabs({ items, activeId, className, ...props }: HTMLAttributes<HTMLDivElement> & { items: TabItem[]; activeId: string }) {
  return (
    <div className={cx("ui-tabs", className)} role="tablist" {...props}>
      {items.map((item) => (
        <button key={item.id} type="button" role="tab" aria-selected={item.id === activeId} tabIndex={item.id === activeId ? 0 : -1}>
          {item.label}
        </button>
      ))}
    </div>
  );
}
