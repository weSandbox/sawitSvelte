# ADR-0006 — Multipart components, validated by Card

- **Status:** accepted
- **Date:** 2026-11-25

## Context

Button is a single element, so ADR-0005's contract was only ever tested on one node. Card is the
first component with parts (Root, Header, Title, Description, Content, Footer), and it is the
cheapest place to find out whether the contract scales before nine more components copy it.

Several things Button never had to answer: how slots are organised, what a part is called in the
DOM, whether every part is polymorphic, and how a component with parts is exported.

## Decision

### 1. One slot-based variant config, one file per part

`<component>.svelte.ts` holds a single `tv({ slots })` config. Each part file imports it and asks
for its own slot (`cardVariants().header()`). There is no per-part styling file to keep in sync.

### 2. `data-slot` names the part, always `component-part`

`card`, `card-header`, `card-title`, `card-description`, `card-content`, `card-footer`. The
prefix makes every part greppable and guarantees no two components can collide on a slot name.

### 3. Export shape differs by entry point

- Package root: **only the composite object** (`import { Card } from 'sawitsvelte'`).
- Component subpath: the parts **by name** plus the composite, so `import * as Card from
'sawitsvelte/card'` resolves `Card.Root`.

`Root`, `Header` and `Content` are meaningless identifiers at package level and would collide with
the next component, so they never reach the root barrel. This is a deliberate asymmetry, not an
oversight.

### 4. Polymorphism is opt-in per part

Only `Card.Root` accepts a `child` snippet, because only the root's element identity genuinely
varies: a card that represents self-contained content should be an `<article>`. Header, Content and
Footer are divs by definition; Description is a paragraph; Title's element is decided by heading
level. Adding `child` to all six would be six copies of machinery with no use case.

`Button` keeps `child` because "render a link with button styling" is a real, common need.

### 5. Constrained semantic props are allowed; arbitrary tag substitution is not

`Card.Title` takes `level: 1–6` and renders `h{level}`. That is not the `as` prop ADR-0005
rejected: it cannot become a `<div>`, it exists so the document outline stays correct, and it keeps
heading semantics inside the component where they can be tested.

### 6. Vertical rhythm lives on the root

Root owns `gap-6` and `py-6`; parts own only horizontal insets (`px-6`). Parts can therefore be used
in any combination — including omitting Header or Footer entirely — without padding stacking at the
seams. This is asserted in tests, because it is the property most likely to rot.

### 7. Stateless components take no context

Card has no state, so there is no context class and no provider. Context is introduced only when a
part genuinely needs to share state (Phase 3 overlays), not as a structural habit.

## Consequences

- Positive: the contract scaled. Slot styling, `data-slot`, class merging, attribute passthrough and
  test structure are identical between Button and Card; only the part count differs.
- Positive: six parts add ~1 kB gzip over Button, because the shared styling runtime dominates.
- Negative: the export asymmetry (root vs subpath) needs documenting, or consumers will wonder why
  `import { Header } from 'sawitsvelte'` fails.
- Negative: a copied component still imports `cn`, `mergeProps` and `tailwind-variants`, so
  copy-paste means "own the markup, keep the package installed", not "zero dependencies". That was
  already true for Button; Card makes it more visible.
- Negative: parts are separate files, so a new component means ~7 files. Accepted for
  tree-shaking, reviewability and per-part tests.
