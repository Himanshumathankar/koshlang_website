import Link from "next/link";
import { docsSections } from "@/lib/docs-data";

export function DocsShell({ children }: { children: React.ReactNode }) {
  return (
    <section className="docs-layout">
      <aside className="docs-sidebar" aria-label="Documentation sections">
        <Link className="docs-home" href="/docs">
          Docs Home
        </Link>
        {docsSections.map((section) => (
          <div className="docs-section" key={section.title}>
            <h2>{section.title}</h2>
            {section.items.map((item) => (
              <Link key={item.slug} href={`/docs/${item.slug}`}>
                {item.title}
              </Link>
            ))}
          </div>
        ))}
      </aside>
      <article className="docs-article">{children}</article>
      <aside className="docs-toc" aria-label="On this page">
        <h2>On This Page</h2>
        <a href="#source-requirement">Source Requirement</a>
        <a href="#publishing-contract">Publishing Contract</a>
        <a href="#next-actions">Next Actions</a>
      </aside>
    </section>
  );
}
