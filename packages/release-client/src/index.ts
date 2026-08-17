export type ReleaseManifest = {
  channel: "stable" | "beta" | "nightly";
  version: string;
  publishedAt: string;
  artifacts: Array<{
    platform: "windows" | "macos" | "linux" | "source";
    architecture: "x64" | "arm64" | "universal" | "source";
    filename: string;
    url: string;
    sha256: string;
    sizeBytes: number;
    signatureUrl?: string;
  }>;
};

export type ReleaseState =
  | { status: "unconfigured"; message: string }
  | { status: "available"; releases: ReleaseManifest[] };

export async function getReleaseState(manifestUrl?: string): Promise<ReleaseState> {
  if (!manifestUrl) {
    return {
      status: "unconfigured",
      message: "No canonical KoshLang release manifest is configured yet."
    };
  }

  const response = await fetch(manifestUrl);
  if (!response.ok) {
    throw new Error(`Release manifest request failed with ${response.status}`);
  }

  return { status: "available", releases: (await response.json()) as ReleaseManifest[] };
}
