export const playgroundAppBoundary = {
  surface: "play.koshlang.com",
  implementedIn: "@koshlang/web",
  routePrefix: "/play",
  requires: "COMPILER_API_URL",
  note: "Execution remains disabled until a safe sandbox compiler API is configured."
} as const;
