export type MarkdownSource = {
  slug: string;
  title: string;
  body: string;
  sourceKind: "canonical-docs" | "cms-editorial" | "generated-reference";
};
