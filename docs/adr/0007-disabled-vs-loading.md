# ADR-0007 — Availability contract: `disabled` versus `loading`

- **Status:** accepted (supersedes the loading behaviour shipped in Phase 2)
- **Date:** 2026-11-25

## Context

The first Button implementation treated `disabled` and `loading` identically: both set the native
`disabled` attribute. That is simple, but it has a real accessibility cost. Disabling a control that
currently has focus moves focus to `<body>`, so a keyboard or screen reader user loses their place
at exactly the moment they are waiting for feedback — and it happens on every submit that uses a
loading state.

## Decision

`disabled` and `loading` are different states with different mechanics.

|                             | `disabled`     | `loading`                      |
| --------------------------- | -------------- | ------------------------------ |
| Native `disabled` attribute | yes            | **no**                         |
| In the tab order            | no             | **yes**                        |
| `aria-disabled`             | `"true"`       | `"true"`                       |
| `aria-busy`                 | —              | `"true"`                       |
| `data-disabled`             | present        | present                        |
| `data-loading`              | —              | present                        |
| Activation blocked          | by the browser | by `preventDefault()` on click |

`disabled` means "this will not become available" — removing it from the tab order is the correct
statement of intent.

`loading` means "this will become available shortly" — so it stays focusable, and unavailability is
expressed through ARIA plus a cancelled click rather than removal from the page's interaction model.

Both states are also applied to child elements, where `disabled` is meaningless: `aria-disabled` and
`data-disabled` carry the state, and the click guard cancels the default so an anchor does not
navigate.

The guard runs **before** consumer handlers, via `mergeProps` composition, and a `preventDefault()`
there stops the consumer's handler from running. That single ordering rule is what makes a loading
button incapable of submitting a form twice.

## Consequences

- Positive: focus and reading position survive a submit; no `document.activeElement === body`.
- Positive: one rule (`preventDefault` first) implements unavailability for buttons, links and
  arbitrary children.
- Positive: `aria-busy` gives assistive technology a state to announce that `disabled` cannot.
- Negative: a loading button is still focusable and still reachable by Tab, so a form can contain
  several "busy" controls a user can focus. They cannot be activated, and this matches how
  operating systems present pending actions.
- Negative: `:disabled` styling no longer applies while loading, so visual dimming is driven by
  `aria-disabled:opacity-50` instead. Both selectors are applied in the base classes.
- Negative: anything that calls `form.requestSubmit()` programmatically bypasses the click guard.
  Documented; a loading button is not a security boundary.
