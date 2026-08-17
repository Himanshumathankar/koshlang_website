import { websiteCmsSeed } from "@koshlang/content";
import { getPayload, type Payload } from "payload";

import config from "../payload.config.ts";

type CollectionSlug = "blog-posts" | "community-links" | "navigation" | "pages" | "roadmap-items";

const published = { _status: "published" };

const payload = await getPayload({ config });

await seedGlobals(payload);
await seedNavigation(payload);
await seedPages(payload);
await seedBlogPosts(payload);
await seedRoadmap(payload);
await seedCommunity(payload);

payload.logger.info(
  `Seeded ${websiteCmsSeed.pages.length} pages, ${websiteCmsSeed.content.posts.length} blog posts, ${websiteCmsSeed.content.roadmap.length} roadmap areas, and website globals.`
);

async function seedGlobals(cms: Payload) {
  await cms.updateGlobal({
    slug: "site-settings",
    data: payloadData({
      ...websiteCmsSeed.siteSettings,
      ...published
    }),
    depth: 0
  });

  await cms.updateGlobal({
    slug: "header",
    data: payloadData({
      primaryNav: websiteCmsSeed.header.primaryNav,
      ...published
    }),
    depth: 0
  });

  await cms.updateGlobal({
    slug: "footer",
    data: payloadData({
      columns: websiteCmsSeed.footer.columns,
      ...published
    }),
    depth: 0
  });

  await cms.updateGlobal({
    slug: "seo-settings",
    data: payloadData({
      seo: {
        title: "KoshLang",
        description: websiteCmsSeed.siteSettings.description,
        canonicalPath: "/",
        noIndex: false
      },
      ...published
    }),
    depth: 0
  });

  await cms.updateGlobal({
    slug: "brand-settings",
    data: payloadData({
      content: {
        about: websiteCmsSeed.content.about,
        tools: websiteCmsSeed.content.tools
      },
      ...published
    }),
    depth: 0
  });

  await cms.updateGlobal({
    slug: "documentation-settings",
    data: payloadData({
      content: websiteCmsSeed.content.docs,
      ...published
    }),
    depth: 0
  });

  await cms.updateGlobal({
    slug: "download-settings",
    data: payloadData({
      content: {
        releases: websiteCmsSeed.content.releases
      },
      ...published
    }),
    depth: 0
  });

  await cms.updateGlobal({
    slug: "social-links",
    data: payloadData({
      content: websiteCmsSeed.content.community.areas,
      ...published
    }),
    depth: 0
  });

  await cms.updateGlobal({
    slug: "feature-flags",
    data: payloadData({
      content: {
        cmsPreview: true,
        websiteCmsSeed: true
      },
      ...published
    }),
    depth: 0
  });

  await cms.updateGlobal({
    slug: "alert-banner",
    data: payloadData({
      content: {
        enabled: false,
        message: ""
      },
      ...published
    }),
    depth: 0
  });
}

async function seedNavigation(cms: Payload) {
  await upsertCollection(cms, "navigation", "name", "primary", {
    name: "primary",
    links: websiteCmsSeed.header.primaryNav
  });

  for (const column of websiteCmsSeed.footer.columns) {
    await upsertCollection(cms, "navigation", "name", `footer-${slugify(column.title)}`, {
      name: `footer-${slugify(column.title)}`,
      links: column.links
    });
  }
}

async function seedPages(cms: Payload) {
  for (const page of websiteCmsSeed.pages) {
    await upsertCollection(cms, "pages", "slug", page.slug, {
      title: page.title,
      slug: page.slug,
      path: page.seo.path,
      description: page.description,
      source: page.source,
      sections: pageSections(page.slug),
      seo: {
        title: page.seo.title,
        description: page.seo.description,
        canonicalPath: page.seo.path,
        noIndex: false
      },
      ...published
    });
  }
}

async function seedBlogPosts(cms: Payload) {
  for (const post of websiteCmsSeed.content.posts) {
    await upsertCollection(cms, "blog-posts", "slug", post.slug, {
      title: post.title,
      slug: post.slug,
      category: post.category,
      summary: post.summary,
      author: post.author,
      publishedDate: post.date,
      readingTime: post.readingTime,
      seo: {
        title: post.title,
        description: post.summary,
        canonicalPath: `/blog/${post.slug}`,
        noIndex: false
      },
      ...published
    });
  }
}

async function seedRoadmap(cms: Payload) {
  for (const area of websiteCmsSeed.content.roadmap) {
    for (const item of area.items) {
      await upsertCollection(cms, "roadmap-items", "title", item.title, {
        title: item.title,
        area: area.area,
        status: item.status,
        note: item.note
      });
    }
  }
}

async function seedCommunity(cms: Payload) {
  for (const area of websiteCmsSeed.content.community.areas) {
    await upsertCollection(cms, "community-links", "label", area.title, {
      label: area.title,
      href: area.href,
      description: area.body
    });
  }
}

async function upsertCollection(
  cms: Payload,
  collection: CollectionSlug,
  uniqueField: string,
  uniqueValue: string,
  data: Record<string, unknown>
) {
  const existing = await cms.find({
    collection,
    depth: 0,
    limit: 1,
    overrideAccess: true,
    pagination: false,
    where: {
      [uniqueField]: {
        equals: uniqueValue
      }
    }
  });

  const first = existing.docs[0];

  if (first) {
    await cms.update({
      id: first.id,
      collection,
      data: payloadData(data),
      depth: 0,
      draft: false,
      overrideAccess: true
    });
    return;
  }

  await cms.create({
    collection,
    data: payloadData(data),
    depth: 0,
    draft: false,
    overrideAccess: true
  });
}

function payloadData(value: unknown): never {
  return JSON.parse(JSON.stringify(value)) as never;
}

function pageSections(slug: string) {
  if (slug === "home") {
    return websiteCmsSeed.content.homepage;
  }

  if (slug === "about") {
    return websiteCmsSeed.content.about;
  }

  if (slug === "community") {
    return websiteCmsSeed.content.community;
  }

  if (slug === "contribute") {
    return websiteCmsSeed.content.contribute;
  }

  if (slug === "governance") {
    return {
      sections: websiteCmsSeed.content.governance.sections,
      rfcs: websiteCmsSeed.content.rfcs
    };
  }

  if (slug === "security") {
    return websiteCmsSeed.content.security;
  }

  if (slug === "status") {
    return websiteCmsSeed.content.status;
  }

  if (slug === "tools") {
    return websiteCmsSeed.content.tools;
  }

  if (slug === "docs") {
    return websiteCmsSeed.content.docs;
  }

  if (slug === "roadmap") {
    return websiteCmsSeed.content.roadmap;
  }

  return {
    source: "website-cms-seed"
  };
}

function slugify(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}
