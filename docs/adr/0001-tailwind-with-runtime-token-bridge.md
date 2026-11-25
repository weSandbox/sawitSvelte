# ADR-0001 — Style with Tailwind v4 over a CSS-variable token bridge

- **Status:** accepted
- **Date:** 2026-11-25

## Context

The framework must be deeply customizable, ship sensible default styles, and stay light.
Its reference point is shadcn/ui, which lets consumers restyle anything without forking
components. Two broad strategies exist:

1. Components emit Tailwind utility classes against a semantic token scale; the consumer
   owns the Tailwind pipeline.
2. Components ship compiled CSS built on custom properties; Tailwind is optional.

Option 1 gives the best customization story and the smallest output, but ties the framework
to Tailwind. Option 2 is a broader product but doubles the styling surface to test and
removes the utility-class extension mechanism developers expect.

## Decision

Adopt **Tailwind CSS v4, CSS-first**, with tokens transported as CSS variables and bridged
into Tailwind's theme via `@theme inline`.

```css
@theme inline {
	--color-primary: var(--primary);
	--radius-lg: var(--sawit-radius-lg);
}
```

`inline` is mandatory: it makes every utility emit `var(--token)` rather than a literal value,
which is the only way a theme can change at runtime.

Consumers install with three lines:

```css
@import 'tailwindcss';
@import 'sawitsvelte/theme.css';
@source '../node_modules/sawitsvelte/dist';
```

## Consequences

- Positive: full customization surface; no CSS runtime; components stay tiny; a rebrand is
  ~20 variable overrides.
- Positive: one runtime styling dependency (`tailwind-merge`), reused by `tailwind-variants`
  in Phase 2.
- Negative: Tailwind is a hard requirement. A non-Tailwind distribution would need a second,
  precompiled styling path — explicitly deferred rather than half-built.
- Negative: our compiled `dist` must remain statically scannable by Tailwind. Any dynamic class
  construction would silently drop styles; the `data-*` attribute contract exists partly to
  avoid needing it.
