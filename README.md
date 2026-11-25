# sawitSvelte

A modern, accessible, customizable UI component framework built natively for Svelte 5.

Not a wrapper around an existing library — own components, own design system, own
behavior layer.

## Status

**Phase 2 — Core components.** Foundation is complete (design tokens, runtime theming, styling
utilities). `Button` is the reference implementation and `Card` is the first multipart component,
which validated that the contract scales. See [`docs/adr`](./docs/adr) and
[`docs/technical-debt.md`](./docs/technical-debt.md).

## Stack

| Concern     | Choice                                                              |
| ----------- | ------------------------------------------------------------------- |
| Framework   | Svelte 5 (runes), TypeScript strict                                 |
| Styling     | Tailwind CSS v4, CSS-first (`@theme inline` bridge)                 |
| Tokens      | CSS variables, two-tier (palette → semantic)                        |
| Positioning | `@floating-ui/dom` behind an own facade (Phase 3)                   |
| Build       | `@sveltejs/package`, pnpm workspaces                                |
| Docs        | SvelteKit 3 + `adapter-static`                                      |
| Tests       | Vitest — node for logic, real Chromium for components, axe for a11y |

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
pnpm test       # unit (node) + component and accessibility tests (Chromium + axe)
pnpm size       # measured gzip budget per entry
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

Multipart components use a namespace of parts:

```svelte
<script lang="ts">
	import { Button, Card } from 'sawitsvelte';
</script>

<Card.Root>
	<Card.Header>
		<Card.Title>Create project</Card.Title>
		<Card.Description>Deploy your new project in one click.</Card.Description>
	</Card.Header>
	<Card.Content>
		<p>Your project will be created in the selected region.</p>
	</Card.Content>
	<Card.Footer>
		<Button>Deploy</Button>
	</Card.Footer>
</Card.Root>
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
