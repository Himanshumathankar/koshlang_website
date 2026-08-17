export type StatusTone = "neutral" | "success" | "warning" | "danger";

export const statusToneClass: Record<StatusTone, string> = {
  neutral: "border-token text-muted",
  success: "border-success text-success",
  warning: "border-warning text-warning",
  danger: "border-danger text-danger"
};

export type NavItem = {
  label: string;
  href: string;
  description?: string;
};

export const primaryNav: NavItem[] = [
  { label: "Learn", href: "/learn" },
  { label: "Docs", href: "/docs" },
  { label: "Packages", href: "/packages" },
  { label: "Playground", href: "/play" },
  { label: "Community", href: "/community" },
  { label: "Blog", href: "/blog" },
  { label: "Download", href: "/download" }
];
