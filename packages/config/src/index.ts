export type AppEnvironment = "development" | "test" | "production";
export type AnalyticsProvider = "disabled" | "posthog" | "plausible" | "umami";
export type StorageProvider = "disabled" | "s3";

export type PublicRuntimeConfig = {
  environment: AppEnvironment;
  siteUrl: string;
  docsUrl: string;
  playgroundUrl: string;
  registryUrl: string;
  githubUrl?: string;
  releaseManifestUrl?: string;
  compilerApiUrl?: string;
  registryApiUrl?: string;
  searchApiUrl?: string;
  analyticsProvider: AnalyticsProvider;
  posthogKey?: string;
  plausibleDomain?: string;
  umamiWebsiteId?: string;
  featureFlags: {
    cmsPreview: boolean;
    downloads: boolean;
    playground: boolean;
    packageRegistry: boolean;
    search: boolean;
  };
};

export type ServerRuntimeConfig = PublicRuntimeConfig & {
  databaseUrl?: string;
  payload: {
    secret?: string;
    publicServerUrl: string;
  };
  storage: {
    provider: StorageProvider;
    bucket?: string;
    endpoint?: string;
    region?: string;
    accessKeyId?: string;
    secretAccessKey?: string;
    publicBaseUrl?: string;
  };
};

function appEnvironment(env: NodeJS.ProcessEnv): AppEnvironment {
  const candidate = env.APP_ENV ?? env.NODE_ENV ?? "development";
  if (!["development", "test", "production"].includes(candidate)) {
    throw new Error("APP_ENV must be development, test, or production");
  }

  return candidate as AppEnvironment;
}

function requireUrl(name: string, value: string | undefined, fallback?: string): string {
  const candidate = value?.trim() || fallback;
  if (!candidate) {
    throw new Error(`${name} is required`);
  }

  try {
    return new URL(candidate).toString().replace(/\/$/, "");
  } catch {
    throw new Error(`${name} must be a valid absolute URL`);
  }
}

function optionalUrl(name: string, value: string | undefined): string | undefined {
  if (!value?.trim()) return undefined;
  try {
    return new URL(value).toString().replace(/\/$/, "");
  } catch {
    throw new Error(`${name} must be a valid absolute URL when provided`);
  }
}

function optionalValue(value: string | undefined): string | undefined {
  const trimmed = value?.trim();
  return trimmed ? trimmed : undefined;
}

function optionalBoolean(name: string, value: string | undefined, fallback: boolean): boolean {
  if (!value?.trim()) return fallback;
  if (["1", "true", "yes", "on"].includes(value.toLowerCase())) return true;
  if (["0", "false", "no", "off"].includes(value.toLowerCase())) return false;
  throw new Error(`${name} must be a boolean value`);
}

function analyticsProvider(env: NodeJS.ProcessEnv): AnalyticsProvider {
  const provider = env.ANALYTICS_PROVIDER ?? "disabled";
  if (!["disabled", "posthog", "plausible", "umami"].includes(provider)) {
    throw new Error("ANALYTICS_PROVIDER must be disabled, posthog, plausible, or umami");
  }

  return provider as AnalyticsProvider;
}

function storageProvider(env: NodeJS.ProcessEnv): StorageProvider {
  const provider = env.STORAGE_PROVIDER ?? "disabled";
  if (!["disabled", "s3"].includes(provider)) {
    throw new Error("STORAGE_PROVIDER must be disabled or s3");
  }

  return provider as StorageProvider;
}

export function getPublicConfig(env: NodeJS.ProcessEnv = process.env): PublicRuntimeConfig {
  const environment = appEnvironment(env);
  const provider = analyticsProvider(env);

  return {
    environment,
    siteUrl: requireUrl("NEXT_PUBLIC_SITE_URL", env.NEXT_PUBLIC_SITE_URL, "http://localhost:3000"),
    docsUrl: requireUrl("NEXT_PUBLIC_DOCS_URL", env.NEXT_PUBLIC_DOCS_URL, "http://localhost:3000/docs"),
    playgroundUrl: requireUrl("NEXT_PUBLIC_PLAYGROUND_URL", env.NEXT_PUBLIC_PLAYGROUND_URL, "http://localhost:3000/play"),
    registryUrl: requireUrl("NEXT_PUBLIC_REGISTRY_URL", env.NEXT_PUBLIC_REGISTRY_URL, "http://localhost:3000/packages"),
    githubUrl: optionalUrl("NEXT_PUBLIC_GITHUB_URL", env.NEXT_PUBLIC_GITHUB_URL),
    releaseManifestUrl: optionalUrl("RELEASE_MANIFEST_URL", env.RELEASE_MANIFEST_URL),
    compilerApiUrl: optionalUrl("COMPILER_API_URL", env.COMPILER_API_URL),
    registryApiUrl: optionalUrl("REGISTRY_API_URL", env.REGISTRY_API_URL),
    searchApiUrl: optionalUrl("SEARCH_API_URL", env.SEARCH_API_URL),
    analyticsProvider: provider,
    posthogKey: optionalValue(env.NEXT_PUBLIC_POSTHOG_KEY),
    plausibleDomain: optionalValue(env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN),
    umamiWebsiteId: optionalValue(env.NEXT_PUBLIC_UMAMI_WEBSITE_ID),
    featureFlags: {
      cmsPreview: optionalBoolean("FEATURE_CMS_PREVIEW", env.FEATURE_CMS_PREVIEW, environment !== "production"),
      downloads: optionalBoolean("FEATURE_DOWNLOADS", env.FEATURE_DOWNLOADS, Boolean(env.RELEASE_MANIFEST_URL)),
      playground: optionalBoolean("FEATURE_PLAYGROUND", env.FEATURE_PLAYGROUND, Boolean(env.COMPILER_API_URL)),
      packageRegistry: optionalBoolean("FEATURE_PACKAGE_REGISTRY", env.FEATURE_PACKAGE_REGISTRY, Boolean(env.REGISTRY_API_URL)),
      search: optionalBoolean("FEATURE_SEARCH", env.FEATURE_SEARCH, Boolean(env.SEARCH_API_URL))
    }
  };
}

function requireProductionValue(name: string, value: string | undefined, environment: AppEnvironment): string | undefined {
  const trimmed = optionalValue(value);
  if (environment === "production" && !trimmed) {
    throw new Error(`${name} is required in production`);
  }

  return trimmed;
}

function requireStorageValue(name: string, value: string | undefined, provider: StorageProvider): string | undefined {
  const trimmed = optionalValue(value);
  if (provider !== "disabled" && !trimmed) {
    throw new Error(`${name} is required when STORAGE_PROVIDER is ${provider}`);
  }

  return trimmed;
}

export function getServerConfig(env: NodeJS.ProcessEnv = process.env): ServerRuntimeConfig {
  const publicConfig = getPublicConfig(env);
  const provider = storageProvider(env);

  return {
    ...publicConfig,
    databaseUrl: requireProductionValue("DATABASE_URL", env.DATABASE_URL, publicConfig.environment),
    payload: {
      secret: requireProductionValue("PAYLOAD_SECRET", env.PAYLOAD_SECRET, publicConfig.environment),
      publicServerUrl: requireUrl("PAYLOAD_PUBLIC_SERVER_URL", env.PAYLOAD_PUBLIC_SERVER_URL, publicConfig.siteUrl)
    },
    storage: {
      provider,
      bucket: requireStorageValue("S3_BUCKET", env.S3_BUCKET, provider),
      endpoint: provider === "disabled" ? optionalUrl("S3_ENDPOINT", env.S3_ENDPOINT) : requireUrl("S3_ENDPOINT", env.S3_ENDPOINT),
      region: requireStorageValue("S3_REGION", env.S3_REGION, provider),
      accessKeyId: requireStorageValue("S3_ACCESS_KEY_ID", env.S3_ACCESS_KEY_ID, provider),
      secretAccessKey: requireStorageValue("S3_SECRET_ACCESS_KEY", env.S3_SECRET_ACCESS_KEY, provider),
      publicBaseUrl: optionalUrl("S3_PUBLIC_BASE_URL", env.S3_PUBLIC_BASE_URL)
    }
  };
}
