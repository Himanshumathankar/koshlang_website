import { Callout as UiCallout, EmptyState } from "@koshlang/ui";

export function Callout({ title, children }: { title: string; children: React.ReactNode }) {
  return <UiCallout title={title}>{children}</UiCallout>;
}

export function SourceRequirement({ children }: { children: React.ReactNode }) {
  return (
    <EmptyState
      id="source-requirement"
      title="Source Requirement"
      description={typeof children === "string" ? children : "Authoritative KoshLang source material is required for this page."}
    />
  );
}
