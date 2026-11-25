<script lang="ts">
	import { Button, buttonVariants, cn, type ButtonChildProps } from 'sawitsvelte';
	import DataAttributesTable from '#lib/components/docs/data-attributes-table.svelte';
	import Example from '#lib/components/docs/example.svelte';
	import PropsTable from '#lib/components/docs/props-table.svelte';
	import ThemePreview from '#lib/components/docs/theme-preview.svelte';

	// Imported as raw text so the published source is the copy-paste surface.
	import buttonSource from '../../../../../../packages/sawitsvelte/src/lib/button/button.svelte?raw';
	import variantsSource from '../../../../../../packages/sawitsvelte/src/lib/button/button.svelte.ts?raw';

	// Svelte's parser ends the instance script at a literal script tag anywhere in
	// the block, including inside a string or comment. Build the tag text instead.
	const open = '<' + 'script lang="ts">';
	const close = '</' + 'script>';

	const importCode = `${open}
	import { Button } from 'sawitsvelte';
${close}`;

	const usageCode = `<Button>Save changes</Button>
<Button variant="outline" size="sm">Cancel</Button>`;

	const variantsCode = `<Button variant="default">Default</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="destructive">Destructive</Button>`;

	const sizesCode = `<Button size="sm">Small</Button>
<Button size="default">Default</Button>
<Button size="lg">Large</Button>
<Button size="icon" aria-label="Add item">
	<svg class="size-4" aria-hidden="true"><!-- icon --></svg>
</Button>`;

	const iconCode = `<Button>
	<svg class="size-4" aria-hidden="true"><!-- plus icon --></svg>
	New project
</Button>`;

	const loadingCode = `<Button loading>Saving…</Button>
<Button loading variant="outline">Please wait</Button>`;

	const disabledCode = `<Button disabled>Unavailable</Button>
<Button disabled variant="outline">Unavailable</Button>`;

	const fullWidthCode = `<Button fullWidth>Continue</Button>`;

	const childCode = `{#snippet link({ props }: { props: ButtonChildProps })}
	<a href="https://svelte.dev" {...props}>Svelte docs</a>
{/snippet}

<Button child={link} variant="outline" />`;

	const classNameCode = `<Button class="bg-red-600 text-white hover:bg-red-700">Custom</Button>`;

	const shapeCode = `/* the silhouette is a token, not a hardcoded clip */
--sawit-shape-notch-br: polygon(
	0 var(--sawit-bevel), var(--sawit-bevel) 0,
	calc(100% - var(--sawit-bevel)) 0, 100% var(--sawit-bevel),
	100% calc(100% - var(--sawit-notch)),
	calc(100% - var(--sawit-notch)) 100%,
	var(--sawit-bevel) 100%, 0 calc(100% - var(--sawit-bevel))
);

/* any element can join the family */
<nav class="shape-notch-br bg-surface-2 px-4 py-2">…</nav>`;

	/** Hover and active are shown as static swatches; the classes are the real ones. */
	const stateColumns = [
		{ label: 'Rest', extra: '' },
		{ label: 'Hover', extra: 'bg-primary-hover -translate-y-0.5' },
		{ label: 'Active', extra: 'bg-primary-active' }
	];

	const propRows = [
		{
			name: 'variant',
			type: "'default' | 'secondary' | 'outline' | 'ghost' | 'destructive'",
			default: "'default'",
			description: 'Visual treatment. Each maps to semantic tokens only.'
		},
		{
			name: 'size',
			type: "'sm' | 'default' | 'lg' | 'icon'",
			default: "'default'",
			description: 'Height and horizontal padding. `icon` is a square with no padding.'
		},
		{
			name: 'disabled',
			type: 'boolean',
			default: 'false',
			description: 'Sets the native `disabled` attribute and blocks activation.'
		},
		{
			name: 'loading',
			type: 'boolean',
			default: 'false',
			description: 'Shows a spinner, sets `aria-busy`, and blocks activation.'
		},
		{
			name: 'fullWidth',
			type: 'boolean',
			default: 'false',
			description: 'Stretches the button to the width of its container.'
		},
		{
			name: 'type',
			type: "'button' | 'submit' | 'reset'",
			default: "'button'",
			description:
				'Native button type. Defaults away from `submit` so forms are not submitted by accident.'
		},
		{
			name: 'class',
			type: 'ClassValue',
			default: '—',
			description: 'Merged after the variant classes, so your utilities win on conflict.'
		},
		{
			name: 'child',
			type: 'Snippet<[{ props: ButtonChildProps }]>',
			default: '—',
			description:
				'Renders your own element instead of a `<button>`. Spread the provided props onto it.'
		},
		{
			name: 'children',
			type: 'Snippet',
			default: '—',
			description: 'Button content. Ignored when `child` is provided — the child owns its content.'
		},
		{
			name: '…rest',
			type: 'HTMLButtonAttributes',
			default: '—',
			description: 'Any other attribute is forwarded to the rendered element.'
		}
	];

	const dataRows = [
		{
			name: 'data-slot',
			values: '"button"',
			description: 'Stable hook for the root element. Every component uses its own name here.'
		},
		{
			name: 'data-variant',
			values: 'variant',
			description: 'The resolved variant, including the default.'
		},
		{
			name: 'data-size',
			values: 'size',
			description: 'The resolved size, including the default.'
		},
		{
			name: 'data-disabled',
			values: 'present / absent',
			description:
				'Present when `disabled` or `loading`. A presence attribute, so `data-disabled:` variants work.'
		},
		{
			name: 'data-loading',
			values: 'present / absent',
			description: 'Present only while `loading`.'
		}
	];
</script>

<!-- Snippets declared at the page root and passed by name. A named snippet inside
     a component's content would become a prop of that component instead. -->
{#snippet link({ props }: { props: ButtonChildProps })}
	<a href="https://svelte.dev" {...props}>Svelte docs</a>
{/snippet}

{#snippet linkDisabled({ props }: { props: ButtonChildProps })}
	<a href="https://svelte.dev" {...props}>Disabled link</a>
{/snippet}

{#snippet arrow()}
	<svg class="size-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
		<path
			d="M7 17 17 7M9 7h8v8"
			stroke="currentColor"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
		/>
	</svg>
{/snippet}

<svelte:head>
	<title>Button — sawitSvelte</title>
	<meta
		name="description"
		content="Button is the reference sawitSvelte component: five variants, four sizes, a loading state, and polymorphism through a child snippet."
	/>
</svelte:head>

<div class="max-w-3xl">
	<p class="text-xs font-medium tracking-widest text-muted-foreground uppercase">Components</p>
	<h1 class="mt-3 text-4xl font-semibold tracking-tight">Button</h1>
	<p class="mt-4 text-base leading-relaxed text-muted-foreground">
		The reference implementation for every sawitSvelte component: semantic variants, a single
		`data-*` contract, native button behaviour, and polymorphism through a `child` snippet instead
		of a string tag.
	</p>
</div>

<section class="mt-12">
	<h2 class="text-lg font-semibold tracking-tight">Visual language</h2>
	<p class="mt-1 max-w-2xl text-sm text-muted-foreground">
		The silhouette carries the identity before the colour does. Three corners are cut at 45° and the
		fourth is cut deeper, so the shape is recognisable in a screenshot with the colour removed.
	</p>

	<dl class="mt-6 grid gap-6 sm:grid-cols-3">
		<div>
			<dt class="text-sm font-semibold">The cut</dt>
			<dd class="mt-1 text-sm text-muted-foreground">
				Both cut sizes are tokens. Each size variant overrides
				<code class="font-mono text-xs">--sawit-notch</code>, so the deep cut stays proportional
				instead of shrinking with the label.
			</dd>
		</div>
		<div>
			<dt class="text-sm font-semibold">The accent</dt>
			<dd class="mt-1 text-sm text-muted-foreground">
				Lime is confined to the primary fill, the focus ring, and the card edge. Body text stays
				charcoal, so the accent reads as an accent rather than a theme.
			</dd>
		</div>
		<div>
			<dt class="text-sm font-semibold">The touch</dt>
			<dd class="mt-1 text-sm text-muted-foreground">
				Hover lifts 2px and brightens; press returns to the surface and darkens. Icons lean 2px into
				the cut. All of it collapses under
				<code class="font-mono text-xs">prefers-reduced-motion</code>.
			</dd>
		</div>
	</dl>

	<ThemePreview
		note="The same markup in both themes. Dark is the identity; light is an adaptation, not an inversion."
	>
		<Button>Get started {@render arrow()}</Button>
		<Button variant="outline">Explore docs</Button>
		<Button variant="ghost">Learn more</Button>
	</ThemePreview>

	<Example title="Reuse the shape anywhere" code={shapeCode}>
		<nav class="border border-border bg-surface-2 px-4 py-2 text-sm shape-notch-br">
			Any element can take the cut
		</nav>
	</Example>
</section>

<section class="mt-12">
	<h2 class="text-lg font-semibold tracking-tight">Usage</h2>
	<Example title="Import and render" code={importCode}>
		<Button>Save changes</Button>
	</Example>
	<Example title="Variants and sizes" code={usageCode}>
		<Button>Save changes</Button>
		<Button variant="outline" size="sm">Cancel</Button>
	</Example>
</section>

<section class="mt-12">
	<h2 class="text-lg font-semibold tracking-tight">Variants</h2>
	<p class="mt-1 text-sm text-muted-foreground">
		Five treatments, all built from semantic tokens — a rebrand changes their appearance without
		editing the component.
	</p>
	<Example code={variantsCode}>
		<Button variant="default">Default</Button>
		<Button variant="secondary">Secondary</Button>
		<Button variant="outline">Outline</Button>
		<Button variant="ghost">Ghost</Button>
		<Button variant="destructive">Destructive</Button>
	</Example>
</section>

<section class="mt-12">
	<h2 class="text-lg font-semibold tracking-tight">Sizes</h2>
	<p class="mt-1 text-sm text-muted-foreground">
		Heights are 36 / 44 / 48px, and <code class="font-mono text-xs">icon</code> is a 44px square for
		toolbar use — pair it with an <code class="font-mono text-xs">aria-label</code>. The cut scales
		with the size, so a small button does not lose its silhouette.
	</p>
	<Example code={sizesCode}>
		<Button size="sm">Small</Button>
		<Button size="default">Default</Button>
		<Button size="lg">Large</Button>
		<Button size="icon" aria-label="Add item">
			<svg class="size-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
				<path d="M12 5v14M5 12h14" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
			</svg>
		</Button>
	</Example>
</section>

<section class="mt-12">
	<h2 class="text-lg font-semibold tracking-tight">With an icon</h2>
	<p class="mt-1 text-sm text-muted-foreground">
		Icons are not sized for you — set <code class="font-mono text-xs">size-4</code> so your own
		class always wins, and mark decorative icons
		<code class="font-mono text-xs">aria-hidden="true"</code>.
	</p>
	<Example code={iconCode}>
		<Button>
			<svg class="size-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
				<path d="M12 5v14M5 12h14" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
			</svg>
			New project
		</Button>
	</Example>
</section>

<section class="mt-12">
	<h2 class="text-lg font-semibold tracking-tight">States</h2>
	<p class="mt-1 text-sm text-muted-foreground">
		<code class="font-mono text-xs">loading</code> is a busy state, not a visual trick: it sets
		<code class="font-mono text-xs">aria-busy</code>, disables activation, and keeps the label so
		the accessible name never disappears.
	</p>

	<!-- Static swatches of the real classes; hover/active cannot be triggered in a screenshot. -->
	<div class="mt-6 grid gap-4 sm:grid-cols-3">
		{#each stateColumns as column (column.label)}
			<div class="flex flex-col gap-2">
				<span class="text-[11px] font-medium tracking-widest text-muted-foreground uppercase">
					{column.label}
				</span>
				<div class={cn(buttonVariants(), column.extra)} aria-hidden="true">Get started</div>
			</div>
		{/each}
	</div>
	<Example title="Loading" code={loadingCode}>
		<Button loading>Saving…</Button>
		<Button loading variant="outline">Please wait</Button>
	</Example>
	<Example title="Disabled" code={disabledCode}>
		<Button disabled>Unavailable</Button>
		<Button disabled variant="outline">Unavailable</Button>
	</Example>
	<Example title="Full width" code={fullWidthCode}>
		<Button fullWidth>Continue</Button>
	</Example>
</section>

<section class="mt-12">
	<h2 class="text-lg font-semibold tracking-tight">Customization</h2>
	<p class="mt-1 text-sm text-muted-foreground">
		Classes are merged with <code class="font-mono text-xs">cn()</code>, so conflicting utilities
		resolve in your favour regardless of stylesheet order.
	</p>
	<Example code={classNameCode}>
		<Button class="bg-red-600 text-white hover:bg-red-700">Custom</Button>
	</Example>
</section>

<section class="mt-12">
	<h2 class="text-lg font-semibold tracking-tight">Polymorphic rendering</h2>
	<p class="mt-1 text-sm text-muted-foreground">
		Pass a <code class="font-mono text-xs">child</code> snippet to render a different element — an
		anchor, a router link, or another component. Button hands you the merged attributes; you decide
		where they go. <code class="font-mono text-xs">type</code> and
		<code class="font-mono text-xs">disabled</code> are withheld because they are invalid outside
		form controls; unavailability travels as <code class="font-mono text-xs">aria-disabled</code>
		and a blocked click.
	</p>
	<Example code={childCode}>
		<Button child={link} variant="outline" />
		<Button child={linkDisabled} variant="outline" disabled />
	</Example>
</section>

<section class="mt-12">
	<h2 class="text-lg font-semibold tracking-tight">Props</h2>
	<PropsTable rows={propRows} />
</section>

<section class="mt-12">
	<h2 class="text-lg font-semibold tracking-tight">Data attributes</h2>
	<p class="mt-1 text-sm text-muted-foreground">
		Every component exposes its state as attributes, so behaviour can be restyled from the outside
		without editing source:
		<code class="font-mono text-xs">data-[disabled]:opacity-40</code>.
	</p>
	<DataAttributesTable rows={dataRows} />
</section>

<section class="mt-12">
	<h2 class="text-lg font-semibold tracking-tight">Accessibility</h2>
	<ul class="mt-4 space-y-3 text-sm text-muted-foreground">
		<li class="flex gap-3">
			<span class="text-primary" aria-hidden="true">—</span>
			<span>
				Renders a real <code class="font-mono text-xs">&lt;button&gt;</code>, so Enter and Space
				activation, focus, and form participation are the browser's job. No synthetic key handlers
				are added.
			</span>
		</li>
		<li class="flex gap-3">
			<span class="text-primary" aria-hidden="true">—</span>
			<span>
				<code class="font-mono text-xs">type</code> defaults to
				<code class="font-mono text-xs">button</code>, so a button inside a form never submits it by
				accident.
			</span>
		</li>
		<li class="flex gap-3">
			<span class="text-primary" aria-hidden="true">—</span>
			<span>
				Focus visibility is provided by the token layer's global
				<code class="font-mono text-xs">:focus-visible</code> outline using
				<code class="font-mono text-xs">--ring</code>. Components never set
				<code class="font-mono text-xs">outline: none</code>.
			</span>
		</li>
		<li class="flex gap-3">
			<span class="text-primary" aria-hidden="true">—</span>
			<span>
				While loading the label stays in the DOM and the spinner is
				<code class="font-mono text-xs">aria-hidden</code>, so the accessible name is stable.
			</span>
		</li>
		<li class="flex gap-3">
			<span class="text-primary" aria-hidden="true">—</span>
			<span>
				The polymorphic form announces unavailability with
				<code class="font-mono text-xs">aria-disabled</code> and cancels the click, since
				<code class="font-mono text-xs">disabled</code> has no meaning on an anchor.
			</span>
		</li>
	</ul>
</section>

<section class="mt-12 mb-4">
	<h2 class="text-lg font-semibold tracking-tight">Source</h2>
	<p class="mt-1 text-sm text-muted-foreground">
		The component and its variant definitions, exactly as published.
	</p>
	<Example title="button.svelte" code={buttonSource} />
	<Example title="button.svelte.ts" code={variantsSource} />
</section>
