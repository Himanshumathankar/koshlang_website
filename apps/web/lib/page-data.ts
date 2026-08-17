export const overviewPages = [
  {
    slug: "install",
    title: "Install",
    description: "Install instructions will publish only package managers and commands that KoshLang officially supports."
  },
  {
    slug: "learn",
    title: "Learn",
    description: "Learning paths are being prepared around canonical KoshLang language material."
  },
  {
    slug: "docs",
    title: "Docs",
    description: "The documentation shell is ready for authored and generated KoshLang references."
  },
  {
    slug: "examples",
    title: "Examples",
    description: "Examples will be sourced from canonical KoshLang sample projects and documentation."
  },
  {
    slug: "tools",
    title: "Tools",
    description: "Tooling pages will list implemented editor, formatter, LSP and debugger capabilities only."
  },
  {
    slug: "community",
    title: "Community",
    description: "Community links will be configured centrally once official channels are available."
  },
  {
    slug: "blog",
    title: "Blog",
    description: "Editorial publishing is planned through Payload CMS with RSS and structured metadata."
  },
  {
    slug: "download/windows",
    title: "Windows Downloads",
    description: "Windows artifacts will appear after the signed release manifest includes supported Windows builds."
  },
  {
    slug: "download/macos",
    title: "macOS Downloads",
    description: "macOS artifacts will appear after the signed release manifest includes supported macOS builds."
  },
  {
    slug: "download/linux",
    title: "Linux Downloads",
    description: "Linux artifacts will appear after the signed release manifest includes supported Linux builds."
  },
  {
    slug: "download/source",
    title: "Source Downloads",
    description: "Source archives will appear after the canonical release pipeline publishes them."
  },
  {
    slug: "tools/vscode",
    title: "VS Code",
    description: "VS Code integration details will list only implemented extension capabilities."
  },
  {
    slug: "tools/formatter",
    title: "Formatter",
    description: "Formatter documentation will publish after a canonical KoshLang formatter exists."
  },
  {
    slug: "tools/lsp",
    title: "Language Server",
    description: "Language server documentation will publish only real LSP capabilities."
  },
  {
    slug: "tools/debugger",
    title: "Debugger",
    description: "Debugger documentation will publish after an official debugger integration exists."
  },
  {
    slug: "roadmap",
    title: "Roadmap",
    description: "Roadmap items will come from approved CMS content or an official project source."
  },
  {
    slug: "contribute",
    title: "Contribute",
    description: "Contribution guidance will link to canonical governance, security and repository policies."
  },
  {
    slug: "governance",
    title: "Governance",
    description: "Governance content will be published once approved project policy exists."
  },
  {
    slug: "security",
    title: "Security",
    description: "A real vulnerability-reporting path is required before public launch."
  },
  {
    slug: "about",
    title: "About",
    description: "About content will be CMS-managed and limited to approved KoshLang positioning."
  },
  {
    slug: "brand",
    title: "Brand",
    description: "Brand assets and usage rules will live here once finalized."
  },
  {
    slug: "privacy",
    title: "Privacy",
    description: "Privacy terms will reflect the actual analytics, CMS and product behavior."
  },
  {
    slug: "terms",
    title: "Terms",
    description: "Terms will be published from reviewed legal content."
  },
  {
    slug: "accessibility",
    title: "Accessibility",
    description: "Accessibility commitments and known conformance status will be tracked here."
  }
] as const;

export function getOverviewPage(slug: string) {
  return overviewPages.find((page) => page.slug === slug);
}
