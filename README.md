# sawitSvelte

A modern, accessible, customizable UI component framework built natively for Svelte 5.

Not a wrapper around an existing library — own components, own design system, own
behavior layer.

## Status

**Phase 2 — Core components.** Foundation is complete (design tokens, runtime theming, styling
utilities) and `Button` is the first shipped component and the reference implementation for the
rest. See [`docs/adr/0005-component-contract.md`](./docs/adr/0005-component-contract.md).

## Stack

| Concern     | Choice                                                                            |
| ----------- | --------------------------------------------------------------------------------- |
| Framework   | Svelte 5 (runes), TypeScript strict                                               |
| Styling     | Tailwind CSS v4, CSS-first (`@theme inline` bridge)                               |
| Tokens      | CSS variables, two-tier (palette → semantic)                                      |
| Positioning | `@floating-ui/dom` behind an own facade (Phase 3)                                 |
| Build       | `@sveltejs/package`, pnpm workspaces                                              |
| Docs        | SvelteKit 3 + `adapter-static`                                                    |
| Tests       | Vitest — node for logic, real Chromium for components, Playwright + axe (Phase 3) |

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

## Usage

```svelte
<script lang="ts">
	import { Button } from 'sawitsvelte';
</script>

<Button variant="default" size="lg">Get Started</Button>
```

Polymorphic rendering uses a `child` snippet, so the rendered element stays yours:

```svelte
{#snippet link({ props }: { props: ButtonChildProps })}
	<a href="/docs" {...props}>Read the docs</a>
{/snippet}

<Button child={link} variant="outline" />
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
