export const colorTokens = {
  light: {
    background: "#FAFAFA",
    surface: "#FFFFFF",
    surfaceMuted: "#F2F3F5",
    text: "#101114",
    muted: "#64676D",
    border: "#E7E7E9",
    accent: "#2166F3",
    accentStrong: "#174DB8",
    success: "#15803D",
    warning: "#A16207",
    danger: "#B91C1C"
  },
  dark: {
    background: "#0B0C0E",
    surface: "#111317",
    surfaceMuted: "#191D23",
    text: "#F3F4F6",
    muted: "#A1A5AD",
    border: "#2B3038",
    accent: "#7BB1FF",
    accentStrong: "#A7CCFF",
    success: "#6EE7A8",
    warning: "#F2C86B",
    danger: "#FCA5A5"
  }
} as const;

export const radiusTokens = {
  sm: "4px",
  md: "8px",
  lg: "12px",
  pill: "999px"
} as const;

export const typographyTokens = {
  ui: 'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  mono: '"JetBrains Mono", "SFMono-Regular", Consolas, monospace'
} as const;

export const spacingTokens = {
  container: "min(1120px, calc(100% - 32px))",
  headerHeight: "68px"
} as const;
