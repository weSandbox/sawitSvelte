# sawitsvelte

A modern, accessible, customizable UI component framework built natively for Svelte 5.

> **Pre-release.** Phase 1 (foundation) only: design tokens, runtime theming, and styling
> utilities. Components arrive in Phase 2.

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
