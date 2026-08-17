import { sqliteAdapter } from "@payloadcms/db-sqlite";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import path from "node:path";
import { buildConfig, type CollectionConfig, type Field, type GlobalConfig } from "payload";
import { fileURLToPath } from "node:url";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const isProduction = process.env.APP_ENV === "production" || process.env.NODE_ENV === "production";
const databaseUrl = process.env.DATABASE_URL || `file:${path.join(dirname, "payload.dev.sqlite")}`;
const payloadSecret = process.env.PAYLOAD_SECRET || "local-koshlang-cms-secret-change-before-production";
const publicServerUrl = process.env.PAYLOAD_PUBLIC_SERVER_URL || "http://localhost:3001";

if (isProduction && !process.env.PAYLOAD_SECRET) {
  throw new Error("PAYLOAD_SECRET is required in production.");
}

const editorAccess = ({ req: { user } }: { req: { user?: unknown } }) => Boolean(user);

const seoFields: Field[] = [
  {
    name: "seo",
    type: "group",
    fields: [
      { name: "title", type: "text" },
      { name: "description", type: "textarea" },
      { name: "canonicalPath", type: "text" },
      { name: "noIndex", type: "checkbox", defaultValue: false }
    ]
  }
];

const Users: CollectionConfig = {
  slug: "users",
  admin: {
    useAsTitle: "email"
  },
  auth: true,
  fields: [
    {
      name: "role",
      type: "select",
      defaultValue: "editor",
      options: ["super-admin", "admin", "editor", "author", "reviewer", "SEO-editor"],
      required: true
    }
  ]
};

const Media: CollectionConfig = {
  slug: "media",
  access: {
    create: editorAccess,
    delete: editorAccess,
    read: () => true,
    update: editorAccess
  },
  admin: {
    useAsTitle: "alt"
  },
  upload: true,
  fields: [
    {
      name: "alt",
      type: "text",
      required: true
    }
  ]
};

const Pages: CollectionConfig = {
  slug: "pages",
  access: {
    create: editorAccess,
    delete: editorAccess,
    read: () => true,
    update: editorAccess
  },
  admin: {
    defaultColumns: ["title", "path", "_status"],
    useAsTitle: "title"
  },
  versions: {
    drafts: true,
    maxPerDoc: 25
  },
  fields: [
    { name: "title", type: "text", required: true },
    { name: "slug", type: "text", required: true, unique: true },
    { name: "path", type: "text", required: true, unique: true },
    { name: "description", type: "textarea", required: true },
    {
      name: "source",
      type: "select",
      defaultValue: "copied-frontend",
      options: ["copied-frontend", "editorial"],
      required: true
    },
    {
      name: "sections",
      type: "json",
      admin: {
        description: "Structured content blocks copied from the current website until richer CMS blocks are added."
      }
    },
    ...seoFields
  ]
};

const BlogPosts: CollectionConfig = {
  slug: "blog-posts",
  access: {
    create: editorAccess,
    delete: editorAccess,
    read: () => true,
    update: editorAccess
  },
  admin: {
    defaultColumns: ["title", "category", "publishedDate", "_status"],
    useAsTitle: "title"
  },
  versions: {
    drafts: true,
    maxPerDoc: 25
  },
  fields: [
    { name: "title", type: "text", required: true },
    { name: "slug", type: "text", required: true, unique: true },
    { name: "category", type: "text", required: true },
    { name: "summary", type: "textarea", required: true },
    { name: "author", type: "text", required: true },
    { name: "publishedDate", type: "date", required: true },
    { name: "readingTime", type: "text" },
    { name: "body", type: "richText" },
    ...seoFields
  ]
};

const RoadmapItems: CollectionConfig = {
  slug: "roadmap-items",
  access: {
    create: editorAccess,
    delete: editorAccess,
    read: () => true,
    update: editorAccess
  },
  admin: {
    defaultColumns: ["title", "area", "status"],
    useAsTitle: "title"
  },
  fields: [
    { name: "title", type: "text", required: true },
    { name: "area", type: "text", required: true },
    { name: "status", type: "text", required: true },
    { name: "note", type: "textarea", required: true }
  ]
};

const CommunityLinks: CollectionConfig = {
  slug: "community-links",
  access: {
    create: editorAccess,
    delete: editorAccess,
    read: () => true,
    update: editorAccess
  },
  admin: {
    useAsTitle: "label"
  },
  fields: [
    { name: "label", type: "text", required: true },
    { name: "href", type: "text", required: true },
    { name: "description", type: "textarea" }
  ]
};

const Navigation: CollectionConfig = {
  slug: "navigation",
  access: {
    create: editorAccess,
    delete: editorAccess,
    read: () => true,
    update: editorAccess
  },
  admin: {
    useAsTitle: "name"
  },
  fields: [
    { name: "name", type: "text", required: true, unique: true },
    {
      name: "links",
      type: "array",
      fields: [
        { name: "label", type: "text", required: true },
        { name: "href", type: "text", required: true }
      ]
    }
  ]
};

const Redirects: CollectionConfig = {
  slug: "redirects",
  access: {
    create: editorAccess,
    delete: editorAccess,
    read: editorAccess,
    update: editorAccess
  },
  admin: {
    useAsTitle: "from"
  },
  fields: [
    { name: "from", type: "text", required: true, unique: true },
    { name: "to", type: "text", required: true },
    { name: "permanent", type: "checkbox", defaultValue: true }
  ]
};

const DocsEditorial: CollectionConfig = {
  slug: "docs-editorial",
  access: {
    create: editorAccess,
    delete: editorAccess,
    read: () => true,
    update: editorAccess
  },
  admin: {
    useAsTitle: "title"
  },
  versions: {
    drafts: true,
    maxPerDoc: 25
  },
  fields: [
    { name: "title", type: "text", required: true },
    { name: "slug", type: "text", required: true, unique: true },
    { name: "summary", type: "textarea", required: true },
    { name: "body", type: "richText" },
    ...seoFields
  ]
};

const simpleGlobal = (slug: string, label: string, fields: Field[]): GlobalConfig => ({
  slug,
  access: {
    read: () => true,
    update: editorAccess
  },
  admin: {
    group: "Website",
    description: label
  },
  fields,
  versions: {
    drafts: true,
    max: 25
  }
});

export default buildConfig({
  admin: {
    user: Users.slug
  },
  collections: [Users, Pages, BlogPosts, RoadmapItems, CommunityLinks, Navigation, Redirects, DocsEditorial, Media],
  db: sqliteAdapter({
    client: {
      url: databaseUrl
    }
  }),
  editor: lexicalEditor({}),
  globals: [
    simpleGlobal("site-settings", "Site-wide product name, version, and descriptive copy.", [
      { name: "name", type: "text", defaultValue: "KoshLang", required: true },
      { name: "version", type: "text", defaultValue: "1.4.0", required: true },
      { name: "channel", type: "text", defaultValue: "stable", required: true },
      { name: "description", type: "textarea", required: true }
    ]),
    simpleGlobal("header", "Primary navigation shown in the website header.", [
      {
        name: "primaryNav",
        type: "array",
        fields: [
          { name: "label", type: "text", required: true },
          { name: "href", type: "text", required: true }
        ]
      }
    ]),
    simpleGlobal("footer", "Footer navigation columns.", [
      {
        name: "columns",
        type: "array",
        fields: [
          { name: "title", type: "text", required: true },
          {
            name: "links",
            type: "array",
            fields: [
              { name: "label", type: "text", required: true },
              { name: "href", type: "text", required: true }
            ]
          }
        ]
      }
    ]),
    simpleGlobal("seo-settings", "Global defaults for metadata and indexing behavior.", seoFields),
    simpleGlobal("brand-settings", "Brand identity guidance for the website.", [{ name: "content", type: "json" }]),
    simpleGlobal("download-settings", "Download page editorial controls that do not own signed artifact data.", [{ name: "content", type: "json" }]),
    simpleGlobal("documentation-settings", "Docs navigation and editorial configuration.", [{ name: "content", type: "json" }]),
    simpleGlobal("feature-flags", "CMS-visible feature flags for editorial surfaces.", [{ name: "content", type: "json" }]),
    simpleGlobal("alert-banner", "Site-wide alert banner copy and links.", [{ name: "content", type: "json" }]),
    simpleGlobal("social-links", "Official community and social destinations.", [{ name: "content", type: "json" }])
  ],
  secret: payloadSecret,
  serverURL: publicServerUrl,
  typescript: {
    outputFile: path.resolve(dirname, "src/payload-types.ts")
  }
});
