"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { NavItem } from "@koshlang/ui";

export function MobileMenu({ items, githubUrl }: { items: NavItem[]; githubUrl?: string }) {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    }

    if (open) {
      document.addEventListener("keydown", onKeyDown);
    }

    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <div className="mobile-nav">
      <button
        ref={buttonRef}
        className="icon-button"
        type="button"
        aria-label={open ? "Close navigation menu" : "Open navigation menu"}
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => setOpen((value) => !value)}
      >
        {open ? "×" : "☰"}
      </button>
      {open ? (
        <div className="drawer-backdrop" onClick={() => setOpen(false)}>
          <nav
            id="mobile-menu"
            className="drawer"
            aria-label="Mobile navigation"
            onClick={(event) => event.stopPropagation()}
          >
            {items.map((item) => (
              <Link key={item.href} href={item.href} onClick={() => setOpen(false)}>
                <strong>{item.label}</strong>
                {item.description ? <span>{item.description}</span> : null}
              </Link>
            ))}
            {githubUrl ? (
              <a href={githubUrl} onClick={() => setOpen(false)}>
                <strong>GitHub</strong>
                <span>Open the source repository</span>
              </a>
            ) : null}
          </nav>
        </div>
      ) : null}
    </div>
  );
}
