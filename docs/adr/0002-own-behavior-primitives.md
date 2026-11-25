# ADR-0002 — Build our own headless behavior layer

- **Status:** accepted
- **Date:** 2026-11-25

## Context

Overlay and composite-widget behaviour — focus trapping, dismissal, roving tabindex, layer
stacking, scroll locking, anchored positioning — is where accessibility bugs become rewrites.
The ecosystem offers mature headless libraries (Bits UI, React Aria ports, Melt UI).

The project's stated goal is a framework with its own component system, design principles, and
architecture, explicitly _not_ a wrapper around an existing UI library.

## Decision

Build the behavior layer ourselves, at `packages/sawitsvelte/src/lib/internal`, promoted to
`@sawitsvelte/primitives` in Phase 3. Two constraints:

1. **Platform-first.** Prefer `<dialog>` for modal semantics and `popover` for non-modal
   overlays. The browser already provides the top layer, background inertness, Escape
   handling, and light dismissal; reimplementing them in JS is strictly more code and more bugs.
2. **One vendored dependency: `@floating-ui/dom`.** Positioning is a solved, narrow problem
   (flip, shift, arrow, scroll containers, RTL). It is a positioning engine, not a UI library,
   so it does not compromise the "not a wrapper" principle. It sits behind our own `floating`
   facade so it can be swapped for CSS anchor positioning per browser as engine support lands.

Primitives are built and tested _before_ the components that consume them, and each ships with
tests independent of any component. Phase 3 is sequenced this way deliberately.

## Consequences

- Positive: full control of semantics, DOM structure, and the `data-*` contract; no impedance
  mismatch when a library's API does not match our composition model.
- Positive: smaller footprint than adopting a full headless library.
- Negative: we own the a11y risk. Mitigated by keyboard-only Playwright suites and axe checks on
  every documented example, run in CI rather than by hand.
- Negative: platform-first means some behaviour differs slightly across engines until support
  converges. Each platform feature must therefore ship with a documented fallback.
