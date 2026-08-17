import type { HTMLAttributes } from "react";
import { cx } from "../../lib/classes";

export type BadgeTone = "neutral" | "success" | "warning" | "danger";

export type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  tone?: BadgeTone;
};

export function Badge({ className, tone = "neutral", ...props }: BadgeProps) {
  return <span className={cx("ui-badge", `ui-badge-${tone}`, className)} {...props} />;
}
