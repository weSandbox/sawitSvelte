# ADR-0003 — One published package with per-component subpath exports

- **Status:** accepted
- **Date:** 2026-11-25

## Context

The architecture must let components be "maintained and distributed independently where
practical," and the API examples call for both a barrel import and a namespace import:

```ts
import { Button } from 'sawitsvelte';
import * as Dialog from 'sawitsvelte/dialog';
```

Publishing ~40 packages would give literal independence but creates a version matrix, a release
burden, and cross-package peer-dependency conflicts for consumers.

## Decision

Publish a single `sawitsvelte` package with a fine-grained `exports` map:

```json
"exports": {
	".": { "types": "./dist/index.d.ts", "svelte": "./dist/index.js", "default": "./dist/index.js" },
	"./button": { "types": "./dist/button/index.d.ts", "svelte": "./dist/button/index.js" },
	"./dialog": { "types": "./dist/dialog/index.d.ts", "svelte": "./dist/dialog/index.js" },
	"./theme.css": "./dist/theme.css",
	"./package.json": "./package.json"
}
```

Build with `@sveltejs/package` (compiled JS + `.d.ts`) rather than shipping raw source: SSR-safe
for every consumer, types available to non-Svelte tooling, and no coupling to the consumer's
compiler version.

Copy-paste remains a supported path: the docs site exposes each component's source, and
components depend on documented, published utilities (`cn`, and later `@sawitsvelte/primitives`)
rather than private internals, so a copied component keeps working.

## Consequences

- Positive: one install, one changelog, one version. Subpaths still give per-component
  code-splitting and explicit tree-shaking.
- Positive: `"sideEffects": ["**/*.css"]` plus ESM keeps unused components out of bundles.
- Negative: component removal is a breaking change for the whole package rather than one
  sub-package. Accepted at this scale.
- Negative: compiled output must stay statically scannable by Tailwind. Mitigated by keeping all
  class strings literal in variant definitions.
