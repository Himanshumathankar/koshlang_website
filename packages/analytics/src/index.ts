export type AnalyticsEvent =
  | { name: "download_viewed"; properties?: Record<string, string> }
  | { name: "playground_viewed"; properties?: Record<string, string> }
  | { name: "registry_viewed"; properties?: Record<string, string> }
  | { name: "search_viewed"; properties?: Record<string, string> };

export function trackEvent(event: AnalyticsEvent) {
  void event;
}
