# sawitSvelte — Architecture

Status: accepted for Phase 1. Supersedes: none.
Scaffolded with Svelte 5.59, SvelteKit 3.4, Vite 8, Tailwind 4.3, TypeScript 6, Vitest 5.

## Principles in one line each

1. **Svelte-native** — runes for state, context for composition, no framework-agnostic abstraction tax.
2. **Developer experience** — one shape for the whole API surface, no configuration required to start.
3. **Customizable** — every visual decision is a token; every structural decision accepts `class` and `child`.
4. **Accessible** — platform semantics first, ARIA only where the platform has gaps.
5. **Consistent** — semantic tokens only; components never reference hues or raw palette steps.
6. **Lightweight** — one direct runtime dependency; measured, not asserted (`pnpm size`).
7. **Production-ready** — TypeScript strict, SSR-safe, tested in a real browser, measured.

## 1. Project structure

```
sawitSvelte/
├── apps/
│   └── docs/                    SvelteKit + adapter-static: docs, playground, live examples
├── packages/
│   ├── sawitsvelte/             the published package (components + internal utilities)
│   │   ├── src/lib/<component>/ one directory per component
│   │   ├── src/lib/internal/    shared utilities and, from Phase 3, the behavior layer
│   │   └── scripts/build-css.mjs
│   └── tokens/                  @sawitsvelte/tokens — CSS source of truth
├── tooling/
│   └── tsconfig/                @sawitsvelte/tsconfig
├── docs/adr/                    architecture decision records
└── pnpm-workspace.yaml
```

Notes:

- **No Turborepo.** `pnpm -r` resolves the two-package build order topologically. Add a task
  runner when build time is actually a problem, not before.
- **`internal/` is a package waiting to happen.** From Phase 3 the behavior layer
  (`focus-trap`, `dismissable`, `floating`, `roving-focus`, `presence`, `portal`) moves to
  `packages/primitives` and is published as `@sawitsvelte/primitives`. It is written against
  that eventual public API from day one, so the move is a rename rather than a refactor.
- **Per-component directories**, each with `index.ts` (exports + types), the `.svelte`
  component(s), a `*.svelte.ts` module holding variants and pure state logic, and a test file.

## 2. Technology decisions

| Decision            | Choice                                                                | Rationale                                                                                                    | Rejected alternative                                     |
| ------------------- | --------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------- |
| Component state     | Runes in `.svelte.ts` classes, shared through context                 | Testable outside components, precise TS inference                                                            | Svelte stores (weaker inference, legacy idiom)           |
| Styling             | Tailwind v4, CSS-first                                                | The customization surface users already know; no CSS runtime                                                 | CSS Modules (opaque), CSS-in-JS (runtime cost)           |
| Token transport     | CSS variables + `@theme inline`                                       | Utilities emit `var(--token)`, so themes switch at runtime                                                   | `@theme` without `inline` (bakes values, breaks theming) |
| Variant composition | `tailwind-variants`                                                   | Slot-aware variants for multi-part components, one dependency                                                | `cva` (React-first), hand-rolled variants                |
| Class merging       | `tailwind-merge`, imported through `tailwind-variants`                | Predictable overrides regardless of stylesheet order, without shipping two copies of it                      | Class-order concatenation (unpredictable)                |
| Positioning         | `@floating-ui/dom` behind an own facade                               | Correct flip/shift/arrow/RTL is weeks of edge cases; facade allows a CSS anchor-positioning swap per browser | Hand-rolled engine                                       |
| Overlays            | Platform-first (`<dialog>`, `popover`) + own focus/dismiss primitives | Top layer, background inertness, ESC and light-dismiss come from the browser                                 | Full custom overlay implementation                       |
| Build               | `@sveltejs/package` → compiled JS + `.d.ts`                           | SSR-safe, predictable resolution, types for every consumer                                                   | Shipping raw source                                      |
| Docs                | Custom SvelteKit app                                                  | Live examples, copy-source, per-example a11y, theming demos; doubles as the visual regression surface        | Storybook                                                |
| Unit tests          | Vitest; **browser mode** for components                               | jsdom gets focus, pointer and top-layer behaviour wrong                                                      | jsdom                                                    |
| Monorepo            | pnpm workspaces + Changesets                                          | Independent releases, no version matrix                                                                      | Nx/Turbo (unearned complexity)                           |

**Deliberately out of scope:** form validation (composes with Superforms/Felte/Zod), icon
artwork (adapter only), date math (ADR at Phase 4), chart engine selection (ADR at Phase 4).

**Platform features we build on**, each with a documented fallback: `popover`, `<dialog>`,
`inert`, `:has()`, container queries, `@starting-style`, `transition-behavior: allow-discrete`,
`color-scheme`, `forced-colors`, `prefers-reduced-motion`, `scrollbar-gutter`.

### SvelteKit 3 note

Kit configuration now lives inside the `sveltekit()` plugin in `vite.config.ts`; there is no
`svelte.config.js` in the docs app. Library packages still use `svelte.config.js` for
preprocessing.

## 3. Component architecture

**State lives in a context class; parts are thin.**

```ts
export class DialogState {
	open = $state(false);
	triggerId: string;
	content = $state<HTMLElement | null>(null);
}
```

`Root` creates it and `setContext`s it. `Trigger` / `Content` / `Title` read it and register
their DOM nodes back into it. This is the mechanism behind
`import * as Dialog from 'sawitsvelte/dialog'` — each subpath is a module of named exports, so
the namespace import is just an object of components.

Context flows through snippet content rendered inside a provider, which is what makes
`<ThemeProvider>` and compound components work without prop drilling.

**One API shape everywhere:**

```svelte
<Dialog.Root bind:open onOpenChange={(v) => {}} defaultOpen={false} disabled>
```

- `bind:` for two-way state, `defaultX` for uncontrolled initial, `onXChange` for the callback.
- Never three parallel APIs (`value` + `onChange` + `bindValue`).

**Polymorphism via `child` snippet, not `as="div"`:**

```svelte
<Button child={linkSnippet} />
<!-- internal -->
{#if child}{@render child({ props: merged })}{:else}<button {...merged} />{/if}
```

`{@render}` accepts snippet arguments, so `child` can render a component, keep bindings, and
keep Svelte context — none of which a string tag can do. The cost is slightly more verbose
markup, documented with a one-line example.

**Styling contract on every part:** `data-state="open|closed"`, `data-disabled`,
`data-orientation`, `data-side`, `data-align`. Consumers extend behaviour without editing source:

```svelte
<Dialog.Content class="data-[state=open]:animate-in" />
```

**Conventions:** `variant` / `size` / `orientation` props; `class` always passes through `cn()`
so the consumer's classes win; `loading` sets `aria-busy` rather than only showing a spinner.

**Non-negotiables**

- SSR-safe: `$props.id()` for ids, no module-level `document`, effects are client-only.
- RTL from day one: logical properties (`ms-`, `pe-`, `start-`, `end-`) and direction-aware
  keyboard navigation.
- Native form participation: hidden inputs with `name`/`value` so `FormData` works.

## 4. Styling and theming

Two tiers. Components only ever read tier 2.

```
Tier 1 — palette (never read by components)
  --sawit-neutral-50…950, --sawit-primary-50…950

Tier 2 — semantic (the component contract)
  --background/--foreground, --primary/--primary-foreground, --secondary,
  --muted, --accent, --destructive, --success, --warning, --info,
  --card, --popover, --border, --input, --ring, --chart-1…5, --sidebar-*
```

Every surface token is paired with a `-foreground` token — the only colour guaranteed legible
on it. Contrast is correct by construction rather than by review.

**Naming rule:** colour tokens keep short semantic names (Tailwind's colour namespace is
`--color-*`, so there is no collision). Anything whose unprefixed name would collide with a
Tailwind theme namespace — `--radius-*`, `--font-*`, `--shadow-*`, `--ease-*` — carries the
`--sawit-` prefix.

**The bridge is load-bearing:**

```css
@theme inline {
	--color-primary: var(--primary);
	--radius-lg: var(--sawit-radius-lg);
}
```

`inline` makes utilities emit `background-color: var(--primary)`. Without it Tailwind bakes
the literal value at build time and runtime theming silently stops working.

**Theming** switches `data-theme` on `<html>`. `data-theme` rather than a `.dark` class because
custom themes (`data-theme="ocean"`) are a hard requirement; a `@custom-variant dark` maps the
dark palette onto Tailwind's familiar `dark:` prefix.

**Both themes are tuned, not inverted.** Dark mode moves accent tokens to their lighter 400
step and pairs them with a dark foreground, and raises shadow alpha, because a straight
inversion produces washed-out accents and invisible elevation.

**Installation contract is three lines:**

```css
@import 'tailwindcss';
@import 'sawitsvelte/theme.css';
@source '../node_modules/sawitsvelte/dist';
```

`@sawitsvelte/tokens` is a build-time dependency only — its CSS is copied into
`sawitsvelte/dist/theme.css`, so consumers install one package.

**Accessibility in the token layer:** `color-scheme` per theme, a global
`prefers-reduced-motion` opt-out, a `forced-colors` focus fallback, and `:focus-visible`
rings derived from `--ring`. Components inherit all of it.

## 5. Public API and exports

```json
{
	"sideEffects": ["**/*.css"],
	"peerDependencies": { "svelte": "^5.0.0" },
	"exports": {
		".": {
			"types": "./dist/index.d.ts",
			"svelte": "./dist/index.js",
			"default": "./dist/index.js"
		},
		"./button": { "types": "./dist/button/index.d.ts", "svelte": "./dist/button/index.js" },
		"./dialog": { "types": "./dist/dialog/index.d.ts", "svelte": "./dist/dialog/index.js" },
		"./theme.css": "./dist/theme.css",
		"./package.json": "./package.json"
	}
}
```

- One install, per-component subpaths. Fine-grained distribution without a 40-package version
  matrix.
- **Naming:** PascalCase named exports; parts `Root / Trigger / Content / Item / Title /
Description / Portal`; callbacks `onXChange`; `bind:` for state; `defaultX` for uncontrolled.
- **Stability tiers** per component (`stable` / `experimental`), published in docs and changesets.
  `stable` means: full keyboard map, axe-clean, browser tests, docs page with copy-source,
  typed props, changeset.
- Pre-1.0: breaking changes get a minor bump and a migration note.

## 6. Development and testing workflow

```
pnpm dev          # build packages, then serve docs (the primary development surface)
pnpm check        # svelte-check across the workspace
pnpm test         # vitest
pnpm build        # tokens, then sawitsvelte
pnpm format
```

- **Test pyramid:** pure logic in node (`src/**/*.test.ts`); components and accessibility scans in a
  real Chromium via Vitest browser mode (`tests/**/*.test.ts`, provider: Playwright against an
  installed Chrome `channel` via `SAWIT_BROWSER_CHANNEL`, so no browser download is needed);
  Playwright for keyboard-only journeys, per-example docs scans, and visual snapshots (Phase 3).
- **Why the split matters:** jsdom does not implement native button activation, `:focus-visible`, or
  the disabled-element click rules, so tests of those behaviours would pass vacuously there. It also
  computes no layout, which is what axe's colour-contrast rule needs.
- **Accessibility is automated, not aspirational.** `tests/setup/a11y.css` compiles the real design
  system into the test page (tokens imported from source, so no build step is required), then axe
  scans every state matrix in light and dark. Serious and critical violations fail the build.
  Exactly one rule is disabled — `region`, a page-structure rule that a component fragment cannot
  satisfy — and its justification lives next to the code. Meta-tests deliberately break a control to
  prove the harness still detects failures.
- **`mergeProps` is part of the contract** (ADR-0005): DOM handlers compose and honour
  `preventDefault()`; value callbacks replace; a consumer `undefined` never erases behaviour.
- **`disabled` and `loading` are different states** (ADR-0007): `disabled` is native and removes the
  control from the tab order; `loading` keeps focus and blocks activation with `aria-disabled` plus a
  cancelled click.
- **Definition of Done per component:** typed props → keyboard map → axe clean → browser tests
  → docs page with live examples and copy-source → `data-*` contract → changeset.
- **CI:** install → build → check → lint → test → size → docs build → format check.
- **Size budgets are measured, not aspirational** (`pnpm size`). Current gzip: Button 21.2 kB,
  Card 20.9 kB, both 21.8 kB, against 23–24 kB budgets. Our own component code is ~1.7 kB; the rest
  is the shared styling runtime (`tailwind-merge` ~9.6 kB, `tailwind-variants` ~9.9 kB), paid once
  regardless of component count. See `docs/technical-debt.md` #5 for the open question about that
  runtime.

## 7. Roadmap

| Phase                  | Deliverables                                                                                                                               | Gate                                                                             |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------- |
| 1 — Foundation ✅      | repo, tokens, bridge, `cn`, ThemeProvider, docs shell, CI, ADRs                                                                            | themed page in both themes; build, check and tests green                         |
| 2 — Core components 🚧 | **Button ✅** (ADR-0005), **Card ✅** (ADR-0006, first multipart), then Input, Label, Textarea, Checkbox, Switch, Badge, Avatar, Separator | every component meets DoD; new components copy Button's contract                 |
| 3 — Interactive        | behavior layer, then Dialog, Popover, Tooltip, Dropdown Menu, Tabs, Accordion, Select, Command                                             | keyboard-only pass on all overlays; primitives promoted to `packages/primitives` |
| 4 — Advanced           | Calendar, Date Picker, Combobox, Data Table, Sidebar, Drawer, Charts                                                                       | date-math and chart-engine ADRs accepted; Data Table API frozen                  |
| 5 — Distribution       | docs polish, search, customization guide, npm publish with provenance, icons                                                               | installable from a clean app in under two minutes                                |

Phase 3 is the risk concentration. The behavior layer is built and hardened before any of the
eight overlay components, and each primitive ships with tests independent of its consumers.

## Known risks

1. **Native top-layer quirks** with Svelte transitions and custom positioning — mitigated by the
   `floating` facade, which can fall back to a portal.
2. **Tailwind must still see our class strings in `dist`** — verified in Phase 1 by building the
   docs site against the workspace package.
3. **No-JS theming.** The inline script in `app.html` sets `data-theme` before first paint; without
   JS the site renders in the light palette. Revisit if no-JS support becomes a requirement.
