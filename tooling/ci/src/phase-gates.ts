export const phaseGates = [
  "phase-1-foundation",
  "phase-2-main-website",
  "phase-3-download-install-releases",
  "phase-4-docs-foundation",
  "phase-5-learning-documentation",
  "phase-6-reference",
  "phase-7-examples",
  "phase-8-playground-frontend",
  "phase-9-playground-sandbox",
  "phase-10-blog-roadmap-editorial",
  "phase-11-tooling-pages",
  "phase-12-package-registry",
  "phase-13-release-docs-automation",
  "phase-14-production-hardening"
] as const;

export type PhaseGate = (typeof phaseGates)[number];

export const activePhaseGate: PhaseGate = "phase-1-foundation";

export const phaseOneRequiredChecks = [
  "lint",
  "typecheck",
  "test",
  "audit:dead-ui",
  "build",
  "web:e2e"
] as const;
