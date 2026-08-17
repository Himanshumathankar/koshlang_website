export type RegistryAvailability =
  | { status: "unconfigured"; canSearch: false; message: string }
  | { status: "available"; canSearch: true; endpoint: string };

export function getRegistryAvailability(endpoint?: string): RegistryAvailability {
  if (!endpoint) {
    return {
      status: "unconfigured",
      canSearch: false,
      message: "The KoshLang package registry API has not been configured."
    };
  }

  return { status: "available", canSearch: true, endpoint };
}
