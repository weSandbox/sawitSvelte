# ADR-0008 — Visual identity: cut corners, charcoal, lime

- **Status:** accepted
- **Date:** 2026-11-25

## Context

Button and Card worked but read as generic Tailwind components. A visual direction was approved:
dark charcoal surfaces, a restrained lime accent, asymmetric geometry, soft-but-intentional corner
treatments, and tactile motion.

The risk in a redesign like this is that identity ends up as colour only, or that it is implemented
four different ways across components. Both were treated as constraints rather than preferences.

## Decision

### 1. The silhouette is a cut, not a radius

Action surfaces (buttons) are clipped with a token-driven polygon: three corners cut at 45° by
`--sawit-bevel`, one cut deeper by `--sawit-notch`. Size variants override those two variables, so
the cut stays proportional instead of shrinking with the label.

```css
--sawit-shape-notch-br: polygon(
	0 var(--sawit-bevel),
	var(--sawit-bevel) 0,
	calc(100% - var(--sawit-bevel)) 0,
	100% var(--sawit-bevel),
	100% calc(100% - var(--sawit-notch)),
	calc(100% - var(--sawit-notch)) 100%,
	var(--sawit-bevel) 100%,
	0 calc(100% - var(--sawit-bevel))
);
```

### 2. Measured constraint: clipped shapes cannot cast an outer shadow

Verified in Chromium before any component work:

- `clip-path` clips `box-shadow` **and** `filter: drop-shadow()` — neither escapes the silhouette;
- `polygon(... round 14px)` is not supported, so soft radii and a hard chamfer cannot be combined in
  one `clip-path`.

Consequences, accepted deliberately:

- Buttons get depth from an **inset** edge (`--sawit-edge`), tonal state changes, and a 2px
  lift/press. There is no outer glow on a shaped button, because the platform cannot render one.
- **Cards are not clipped.** A surface needs real elevation more than a silhouette change. Card
  keeps its 16px radius, `shadow-card`, and a `shadow-glow` featured state, and carries the
  signature with a corner bracket instead.

This is why the two components are shaped differently. It is a rendering constraint with a design
consequence, not an inconsistency.

### 3. Colour: lime primary, charcoal surfaces

The `--sawit-primary-*` ramp is now lime; the names stay the same, so the documented "override eleven
values to rebrand" story still holds. A green-tinted `--sawit-charcoal-*` ramp backs the dark theme
so the accent belongs to the surface instead of sitting on a neutral grey.

Dark is the identity; light is an adaptation of the same geometry, not an inversion of the palette.

### 4. Layered surfaces as tokens

`--surface-1/2/3` are the source of truth; `--card`, `--popover`, `--secondary` and `--muted` alias
them. Elevation is expressed as lightness first, shadow second — which is also what keeps cards
readable when a shadow is unavailable (forced colours, low-end rendering).

### 5. Accent discipline

Lime is confined to three jobs: the primary fill, the focus ring, and the card bracket
(`--border-accent`). `--accent-soft` is a translucent wash for ghost and hover states over any
backdrop. Text on lime is always charcoal, never white.

### 6. Card signature: corner bracket

A `corner-accent` utility draws a hairline bracket just inside the top corner using logical
properties, so it mirrors in RTL. `featured` upgrades it: accent border, accent bloom, brighter
bracket, plus a `data-featured` attribute so it can be restyled from outside.

### 7. Motion is tactile but non-negotiable to disable

`--sawit-ease-tactile` has slight overshoot. Hover lifts 2px and brightens, press returns to the
surface, icons lean 2px toward the cut. Every transform is suppressed under
`prefers-reduced-motion`, and the token layer already zeroes transition durations.

### 8. Shapes are utilities, not component internals

`shape-notch-br` and `corner-accent` live in the token package. A consumer can put the cut on a nav
rail or an avatar frame and stay inside the system, and a theme can soften or remove the cut by
overriding `--sawit-notch` / `--sawit-bevel`.

### 9. Light palette is declared on `[data-theme='light']` too

Previously light values lived only on `:root`, so a nested light panel inside a dark page inherited
dark tokens. Declaring them on both selectors makes side-by-side theme previews — and nested custom
themes — work without extra CSS.

## Consequences

- Positive: the silhouette is recognisable with colour removed; identity is token-driven, so a theme
  can dial the cut down without touching a component.
- Positive: no new dependencies, no measurable runtime cost — Button 21.2 → 21.4 kB gzip, Card
  20.9 → 21.0 kB.
- Negative: `shadow-*` utilities do not show on a shaped element. Documented; shaped components use
  inset edges and transforms instead.
- Negative: the outline variant's border stops at the chamfer, because the clip removes it. Treated
  as part of the language rather than patched with a layered hack that would have broken `bg-*`
  overrides.
- Negative: cut corners are a stronger point of view than radii. A consumer who wants soft corners
  overrides the two shape tokens rather than fighting the component.

## Amendment — stroke, hover, card mark, loader

Follow-up refinement after living with the first pass.

### The edge is an evenodd clip, not an SVG overlay

Native `border` cannot follow a 45° edge, so the first pass left a gap along every chamfer. The
fix considered an SVG `<polygon>` stroke, but an SVG needs pixel geometry: the notch is expressed
in `px` on a content-sized element, and in the polymorphic `child` case the component does not own
the element and cannot measure it. That would have meant a ResizeObserver in one path and no
border in the other.

Instead `shape-notch-br` paints its own edge as a pseudo-element clipped with
`polygon(evenodd, <outer silhouette>, <inset silhouette>)`. Clipping keeps the _inside_, so the
stroke has to be the complement of the inner shape — one path with both rings. It is pure CSS, it
works identically for `<button>` and for a consumer's anchor, and the colour is the
`--sawit-edge-color` token. `pointer-events: none` and a pseudo-element keep it out of the
accessibility tree; focus stays the global outline and is never clipped.

### Hover does not move the button

The 2px lift read as jitter when buttons sit in a row. Hover now changes only surface and edge
colour; `active` drops 1px for tactile feedback, and the icon nudge stays. Motion is still
collapsed by `prefers-reduced-motion`.

### Card keeps its shadow and gains a corner mark

A clipped card cannot cast a shadow (measured in ADR-0008's spike), and a card needs elevation
more than it needs a cut. Card therefore stays unclipped: `rounded-xl` with a tighter
`rounded-br-sm` on the notch corner, plus a 45° `--sawit-corner-mark` hairline in
`--border-accent`. `featured` adds the accent border and a tightened bloom. The mark is mirrored
with `:dir(rtl)`.

### Loader is the silhouette, not a spinner

The loader traces the same polygon with `pathLength="100"`, so one lap is exactly `-100` dash
offset and no geometry needs measuring. Colour defaults to `--accent-ink` — a hairline in
fill-lime is too pale on light — and `Button` passes `text-current` so the in-button loader
inherits the button's own text colour instead of going lime-on-lime. `label={null}` makes it
decorative for parents that already announce `aria-busy`.
