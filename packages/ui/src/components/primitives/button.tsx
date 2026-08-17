import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { cx } from "../../lib/classes";

export type ButtonVariant = "primary" | "secondary" | "quiet";
export type ButtonSize = "sm" | "md" | "lg";

const variantClass: Record<ButtonVariant, string> = {
  primary: "ui-button ui-button-primary",
  secondary: "ui-button ui-button-secondary",
  quiet: "ui-button ui-button-quiet"
};

const sizeClass: Record<ButtonSize, string> = {
  sm: "ui-button-sm",
  md: "ui-button-md",
  lg: "ui-button-lg"
};

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: ReactNode;
};

export function Button({ className, variant = "primary", size = "md", icon, children, ...props }: ButtonProps) {
  return (
    <button className={cx(variantClass[variant], sizeClass[size], className)} {...props}>
      {icon ? <span aria-hidden="true">{icon}</span> : null}
      <span>{children}</span>
    </button>
  );
}

export type LinkButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: ReactNode;
};

export function LinkButton({ className, variant = "primary", size = "md", icon, children, ...props }: LinkButtonProps) {
  return (
    <a className={cx(variantClass[variant], sizeClass[size], className)} {...props}>
      {icon ? <span aria-hidden="true">{icon}</span> : null}
      <span>{children}</span>
    </a>
  );
}

export type IconButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  label: string;
  icon: ReactNode;
};

export function IconButton({ className, label, icon, ...props }: IconButtonProps) {
  return (
    <button className={cx("ui-icon-button", className)} aria-label={label} {...props}>
      <span aria-hidden="true">{icon}</span>
    </button>
  );
}
