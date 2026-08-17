"use client";

import { useState } from "react";
import { Button } from "@koshlang/ui";

export function CodeCopy({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  return (
    <Button variant="secondary" type="button" onClick={copy} aria-live="polite">
      {copied ? "Copied" : "Copy"}
    </Button>
  );
}
