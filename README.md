# sawitSvelte

A modern, accessible, customizable UI component framework built natively for Svelte 5.

Not a wrapper around an existing library — own components, own design system, own
behavior layer.

## Status

**Phase 1 — Foundation.** The design token system, runtime theming, styling utilities,
and the docs shell are in place. No components ship yet.

## Stack

| Concern     | Choice                                                         |
| ----------- | -------------------------------------------------------------- |
| Framework   | Svelte 5 (runes), TypeScript strict                            |
| Styling     | Tailwind CSS v4, CSS-first (`@theme inline` bridge)            |
| Tokens      | CSS variables, two-tier (palette → semantic)                   |
| Positioning | `@floating-ui/dom` behind an own facade (Phase 3)              |
| Build       | `@sveltejs/package`, pnpm workspaces                           |
| Docs        | SvelteKit 3 + `adapter-static`                                 |
| Tests       | Vitest (browser mode from Phase 2), Playwright + axe (Phase 3) |

## Layout

```
apps/docs              documentation site and playground
packages/sawitsvelte   the published package
packages/tokens        design tokens (CSS source of truth)
tooling/tsconfig       shared TypeScript config
docs/adr               architecture decision records
```

## Development

```bash
pnpm install
pnpm dev        # builds packages, then serves the docs site
pnpm build      # all packages
pnpm check      # svelte-check across the workspace
pnpm test
pnpm format
```

## Usage (target API)

```svelte
<script lang="ts">
	import { Button } from 'sawitsvelte';
</script>

<Button variant="default" size="lg">Get Started</Button>
```

```css
@import 'tailwindcss';
@import 'sawitsvelte/theme.css';
@source '../node_modules/sawitsvelte/dist';
```

## Decisions

See [`docs/architecture.md`](./docs/architecture.md) for the full architecture and
[`docs/adr`](./docs/adr) for the individual decision records.

## License

MIT
