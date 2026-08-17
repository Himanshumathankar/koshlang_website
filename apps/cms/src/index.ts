import { cmsCollections, cmsGlobals, websiteCmsSeed } from "@koshlang/content";
import type { ServerRuntimeConfig } from "@koshlang/config";

export const cmsAppBoundary = {
  surface: "cms/admin",
  runtime: "Payload CMS",
  deployment: "VPS backend service behind Cloudflare-protected infrastructure",
  collections: cmsCollections,
  globals: cmsGlobals,
  note: "This is the Phase 1 CMS foundation boundary. Payload runs against PostgreSQL and S3-compatible media storage when configured."
} as const;

export type PayloadCollectionSlug = (typeof cmsCollections)[number];
export type PayloadGlobalSlug = (typeof cmsGlobals)[number];

export type PayloadCmsFoundation = {
  admin: {
    route: "/admin";
    userCollection: "Users";
    roles: readonly ["super-admin", "admin", "editor", "author", "reviewer", "SEO-editor"];
  };
  database: {
    adapter: "postgres";
    url?: string;
    requiredInProduction: true;
  };
  media: {
    collection: "Media";
    storageProvider: "disabled" | "s3";
    bucket?: string;
    publicBaseUrl?: string;
  };
  editorial: {
    collections: readonly PayloadCollectionSlug[];
    globals: readonly PayloadGlobalSlug[];
  };
  preview: {
    enabled: boolean;
    publicServerUrl: string;
  };
  ownershipBoundary: {
    cmsOwns: readonly string[];
    machineOwns: readonly string[];
  };
  phaseTwoSeed: {
    source: "copied-frontend";
    siteName: "KoshLang";
    pageCount: number;
    navigationCount: number;
  };
};

export function createPayloadCmsFoundation(config: ServerRuntimeConfig): PayloadCmsFoundation {
  return {
    admin: {
      route: "/admin",
      userCollection: "Users",
      roles: ["super-admin", "admin", "editor", "author", "reviewer", "SEO-editor"]
    },
    database: {
      adapter: "postgres",
      url: config.databaseUrl,
      requiredInProduction: true
    },
    media: {
      collection: "Media",
      storageProvider: config.storage.provider,
      bucket: config.storage.bucket,
      publicBaseUrl: config.storage.publicBaseUrl
    },
    editorial: {
      collections: cmsCollections,
      globals: cmsGlobals
    },
    preview: {
      enabled: config.featureFlags.cmsPreview,
      publicServerUrl: config.payload.publicServerUrl
    },
    ownershipBoundary: {
      cmsOwns: ["editorial pages", "blog posts", "roadmap items", "navigation", "SEO overrides", "redirects"],
      machineOwns: ["release artifacts", "checksums", "compiler output", "standard-library API generation", "package dependency graphs"]
    },
    phaseTwoSeed: {
      source: "copied-frontend",
      siteName: websiteCmsSeed.siteSettings.name,
      pageCount: websiteCmsSeed.pages.length,
      navigationCount: websiteCmsSeed.header.primaryNav.length
    }
  };
}

export { websiteCmsSeed };
