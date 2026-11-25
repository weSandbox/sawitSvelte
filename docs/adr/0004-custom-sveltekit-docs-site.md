# ADR-0004 — Custom SvelteKit docs site instead of Storybook

- **Status:** accepted
- **Date:** 2026-11-25

## Context

The project needs an interactive component playground and public documentation. Storybook is
the default answer, but it carries known friction with Svelte 5 and Tailwind v4, and it cannot
serve as the public site without a second application alongside it.

The docs must do more than render stories: live examples, copy-source, per-example
accessibility results, theme switching demonstrations, API tables, and search.

## Decision

Build a custom documentation site in `apps/docs`: SvelteKit 3 with `adapter-static`, Tailwind
v4 via `@tailwindcss/vite`, and everything prerendered. The docs app is also the primary
development surface (`pnpm dev` runs it) and the visual regression surface.

## Consequences

- Positive: one application serves docs, playground, and regression tests; no duplicated examples.
- Positive: full control over the theming demo, which is the framework's differentiating feature.
- Positive: static output deploys anywhere with no server.
- Negative: more upfront work than `storybook init`, and we own the example runner, API tables,
  and search.
- Negative: docs must be built as part of component work, which is why "docs page with live
  examples and copy-source" is part of the Definition of Done rather than a later task.
