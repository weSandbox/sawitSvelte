# ADR-0005 — Component contract, established by Button

- **Status:** accepted
- **Date:** 2026-11-25

## Context

Button is the reference implementation for every sawitSvelte component. Unless the rules it
follows are written down, each new component will invent its own slightly different props,
attribute names, and disabled semantics — and customization becomes folklore instead of an API.

## Decision

### 1. State is exposed as attributes, never as class names

- Enumerated state uses a valued attribute: `data-variant`, `data-size`, `data-state`.
- Boolean state uses a presence attribute: `data-disabled`, `data-loading` (rendered as
  `data-disabled=""`, absent when false).
- Every root element carries `data-slot="<component>"`; parts use `data-slot="<component>-<part>"`.

Present-only attributes are deliberate: `data-[disabled]:opacity-40` works, and an absent
attribute cannot be mistaken for `data-disabled="false"`.

### 2. Variants are data, not logic

`variant` / `size` / `orientation` are declared once in `<component>.svelte.ts` with
`tailwind-variants`, and the prop types are _derived_ from that definition so they cannot drift:

```ts
type ButtonVariantProps = VariantProps<typeof buttonVariants>;
export type ButtonVariant = NonNullable<ButtonVariantProps['variant']>;
```

The variant object is importable without rendering, which is what makes
`class={buttonVariants({ size: 'lg' })}` work on a bare `<a>`.

### 3. `class` always passes through `cn()`

Consumer classes are merged last, so a conflicting utility wins regardless of stylesheet order.
A component must never make its own styling unbeatable.

### 4. Polymorphism is a `child` snippet, never an `as` prop

```svelte
{#snippet link({ props }: { props: ButtonChildProps })}
	<a href="/docs" {...props}>Docs</a>
{/snippet}

<Button child={link} />
```

`{@render}` receives the merged attributes, so the child keeps its own bindings, events, and
context — none of which a string tag name can do. When `child` is present the child owns its
content, and `children` is ignored rather than silently rendered somewhere unexpected.

### 5. Availability has one meaning across element types

| Element            | Mechanism                                                                       |
| ------------------ | ------------------------------------------------------------------------------- |
| Form control       | native `disabled` + `aria-disabled` + `data-disabled`                           |
| Arbitrary child    | `aria-disabled` + `data-disabled` (no `disabled`, which is invalid on `<a>`)    |
| Activation blocked | the component's own `onclick` calls `preventDefault()` before consumer handlers |

`mergeProps` composes handlers base-first and skips the consumer's handler when the default was
prevented. That single rule is why a disabled _link_ is inert without the component knowing what
the child element is.

### 6. `mergeProps` rules

- `class`: joined, Tailwind conflicts resolved in the consumer's favour.
- `style`: string concatenation.
- DOM event handlers (`on` + lowercase) compose; value callbacks (`onOpenChange`) replace.
- Consumer `undefined` does not clobber a base value.
- Everything else: consumer wins.

### 7. Loading is a state, not an animation

`loading` sets `aria-busy`, blocks activation, renders a decorative spinner
(`aria-hidden="true"`), and **keeps the label in the DOM** so the accessible name is stable.
A spinner that replaces the label makes the button anonymous to screen readers mid-action.

### 8. Focus is global, not per-component

Focus visibility comes from the token layer's `:focus-visible` outline using `--ring`.
Components never add `outline: none` and never re-implement a focus ring, so keyboard users get
identical feedback everywhere and forced-colours mode has one thing to override.

### 9. Colour comes only from semantic tokens

No hue names, no raw palette steps. A variant that cannot be expressed with a semantic token is
a signal that the token set is incomplete, not that the component should hardcode a colour.

## Consequences

- Positive: one mental model for all components; documentation and tests are predictable;
  consumers can restyle from the outside without forking.
- Positive: disabled/availability behaviour is tested once and reused, including for elements
  that have no native disabled state.
- Negative: polymorphism is more verbose than `as="a"`. Accepted — it buys correct semantics.
- Negative: strict attribute naming means a bad name is a framework-wide inconsistency, so new
  attribute names must be added here first.
