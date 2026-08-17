export const registryAppBoundary = {
  surface: "pkg.koshlang.com",
  implementedIn: "@koshlang/web",
  routePrefix: "/packages",
  requires: "REGISTRY_API_URL",
  note: "Registry search remains disabled until the canonical registry API is configured."
} as const;
