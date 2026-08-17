# CMS Foundation

Payload CMS is the required editorial CMS for KoshLang web.

## Editorial Collections

- Users with role-based access: super-admin, admin, editor, author, reviewer, SEO-editor
- Pages with page-builder blocks, status, SEO, canonical override and redirects
- BlogPosts with authors, category, tags, rich body, cover image, SEO and related content
- Authors
- Categories
- Tags
- Announcements
- RoadmapItems
- ReleasesEditorial
- CommunityLinks
- Navigation
- Redirects
- Media
- DocsEditorial for CMS-owned guides only

## Globals

- SiteSettings
- BrandSettings
- SEOSettings
- Header
- Footer
- SocialLinks
- DownloadSettings
- DocumentationSettings
- FeatureFlags
- AlertBanner

## Boundary

The CMS owns editorial content and SEO overrides. It must not become the primary source for signed release artifacts, binary checksums, compiler output, standard-library API generation, package records or dependency graphs.

Those machine-owned data sets are represented in code by dedicated client packages:

- `@koshlang/release-client`
- `@koshlang/compiler-client`
- `@koshlang/registry-client`

Until their canonical services are configured, public UI must show explicit unavailable states.
