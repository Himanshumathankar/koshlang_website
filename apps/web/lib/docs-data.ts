export type DocsSection = {
  title: string;
  items: Array<{
    slug: string;
    title: string;
    description: string;
    sourceRequirement: string;
  }>;
};

export const docsSections: DocsSection[] = [
  {
    title: "Getting Started",
    items: [
      {
        slug: "getting-started/introduction",
        title: "Introduction",
        description: "The project introduction page for approved KoshLang positioning.",
        sourceRequirement: "Needs maintainer-approved positioning and canonical project scope."
      },
      {
        slug: "getting-started/installation",
        title: "Installation",
        description: "Installation documentation tied to real release artifacts.",
        sourceRequirement: "Needs a release manifest and official installation methods."
      },
      {
        slug: "getting-started/hello-world",
        title: "Hello World",
        description: "First program walkthrough reserved for canonical syntax.",
        sourceRequirement: "Needs authoritative language syntax and compiler behavior."
      },
      {
        slug: "getting-started/first-project",
        title: "First Project",
        description: "Project workflow guide tied to official CLI behavior.",
        sourceRequirement: "Needs canonical CLI commands, project layout and build output."
      },
      {
        slug: "getting-started/editor-setup",
        title: "Editor Setup",
        description: "Editor setup based on implemented tooling integrations.",
        sourceRequirement: "Needs official editor extension and tooling capability data."
      }
    ]
  },
  {
    title: "Reference",
    items: [
      {
        slug: "reference/language",
        title: "Language Reference",
        description: "Formal language reference architecture.",
        sourceRequirement: "Needs canonical language specification or generated reference data."
      },
      {
        slug: "std",
        title: "Standard Library",
        description: "Generated standard-library reference entry point.",
        sourceRequirement: "Needs compiler or docs generator output for real modules."
      },
      {
        slug: "cli",
        title: "CLI",
        description: "Command-line reference entry point.",
        sourceRequirement: "Needs official command, flag and diagnostic metadata."
      },
      {
        slug: "compiler",
        title: "Compiler",
        description: "Compiler reference and architecture documentation.",
        sourceRequirement: "Needs canonical compiler architecture and release metadata."
      }
    ]
  },
  {
    title: "Build",
    items: [
      {
        slug: "guides",
        title: "Guides",
        description: "Task-oriented guides separate from formal reference.",
        sourceRequirement: "Needs approved guide topics and tested examples."
      },
      {
        slug: "examples",
        title: "Examples",
        description: "Runnable or inspectable examples when canonical samples exist.",
        sourceRequirement: "Needs canonical example sources and expected output."
      },
      {
        slug: "internals",
        title: "Internals",
        description: "Contributor-oriented internals and specification area.",
        sourceRequirement: "Needs public compiler/language internals documentation."
      },
      {
        slug: "contributing",
        title: "Contributing",
        description: "Contribution docs tied to governance and security policy.",
        sourceRequirement: "Needs canonical contribution, governance and security policies."
      }
    ]
  }
];

export const docsPages = docsSections.flatMap((section) =>
  section.items.map((item) => ({ ...item, section: section.title }))
);

export function getDocsPage(slug: string) {
  return docsPages.find((page) => page.slug === slug);
}
