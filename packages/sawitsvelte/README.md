# sawitsvelte

A modern, accessible, customizable UI component framework built natively for Svelte 5.

> **Pre-release.** Foundation and the first component are shipped: design tokens, runtime
> theming, styling utilities, and `Button`. More components follow per the roadmap in
> `docs/architecture.md`.

## Install

```bash
pnpm add sawitsvelte
```

```css
/* your global stylesheet */
@import 'tailwindcss';
@import 'sawitsvelte/theme.css';
@source '../node_modules/sawitsvelte/dist';
```

## Button

```svelte
<script lang="ts">
	import { Button } from 'sawitsvelte';
</script>

<Button>Save changes</Button>
<Button variant="outline" size="sm">Cancel</Button>
<Button variant="destructive" loading>Deleting…</Button>
```

Variants: `default`, `secondary`, `outline`, `ghost`, `destructive`.
Sizes: `sm`, `default`, `lg`, `icon`.

Render a link instead of a button with the `child` snippet — Button hands you the merged
attributes and withholds `type`/`disabled`, which are invalid outside form controls:

```svelte
{#snippet link({ props }: { props: ButtonChildProps })}
	<a href="/docs" {...props}>Docs</a>
{/snippet}

<Button child={link} variant="outline" />
```

`loading` and `disabled` are different: `disabled` removes the button from the tab order (native
`disabled`), while `loading` keeps focus, sets `aria-busy`, and blocks activation.

## Card

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

Parts: `Root`, `Header`, `Title`, `Description`, `Content`, `Footer`. Every part is optional and
accepts `class`; `Card.Title` takes `level` (1–6, default 3) so the heading fits your outline, and
`Card.Root` takes `child` if the card should be an `<article>` or `<section>`.

Parts are also importable by name from the subpath, which supports the namespace style:

```svelte
<script lang="ts">
	import * as Card from 'sawitsvelte/card';
</script>
```

## Theme

```svelte
<script lang="ts">
	import { ThemeProvider, getThemeContext } from 'sawitsvelte';
</script>

<ThemeProvider defaultTheme="system">
	{@render children()}
</ThemeProvider>
```

`data-theme` is written to `<html>`. Custom themes are just another
`[data-theme='brand']` block overriding semantic tokens — no component needs to know.

## Utilities

```ts
import { cn } from 'sawitsvelte';

cn('px-2 py-1', condition && 'bg-primary', props.class);
```

`cn` merges class values and resolves Tailwind conflicts, so a consumer's `class` always wins.

## Documentation

Full architecture and decision records live in the repository at `docs/architecture.md`
and `docs/adr/`.

## License

MIT
