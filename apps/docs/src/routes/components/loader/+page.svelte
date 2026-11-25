<script lang="ts">
	import { Button, Card, Loader } from 'sawitsvelte';
	import DataAttributesTable from '#lib/components/docs/data-attributes-table.svelte';
	import Example from '#lib/components/docs/example.svelte';
	import PropsTable from '#lib/components/docs/props-table.svelte';
	import ThemePreview from '#lib/components/docs/theme-preview.svelte';

	import loaderSource from '../../../../../../packages/sawitsvelte/src/lib/loader/loader.svelte?raw';

	const open = '<' + 'script lang="ts">';
	const close = '</' + 'script>';

	const importCode = `${open}
	import { Loader } from 'sawitsvelte';
${close}`;

	const usageCode = `<Loader />
<Loader size="lg" class="text-primary" />`;

	const sizesCode = `<Loader size="sm" />
<Loader size="default" />
<Loader size="lg" />`;

	const buttonCode = `<Button loading>Saving…</Button>
<Button loading variant="outline">Please wait</Button>`;

	const propRows = [
		{
			name: 'size',
			type: "'sm' | 'default' | 'lg'",
			default: "'default'",
			description: 'Square size: 16, 24 or 32px.'
		},
		{
			name: 'label',
			type: 'string | null',
			default: "'Loading'",
			description:
				'Announcement text rendered in a live region. Pass `null` when a parent already announces the state — `Button` does.'
		},
		{
			name: 'class',
			type: 'ClassValue',
			default: '—',
			description:
				'Colour comes from `currentColor`. The default is `--accent-ink`, not `--primary`, so a hairline stays legible on a light surface; any text colour utility overrides it.'
		},
		{
			name: '…rest',
			type: 'HTML attributes',
			default: '—',
			description: 'Native attributes for the wrapper, forwarded unchanged.'
		}
	];

	const dataRows = [
		{
			name: 'data-slot',
			values: '"loader"',
			description: 'Stable hook for the root element. `Button` overrides it to "button-spinner".'
		},
		{
			name: 'data-size',
			values: 'size',
			description: 'The resolved size, including the default.'
		}
	];
</script>

<svelte:head>
	<title>Loader — sawitSvelte</title>
	<meta
		name="description"
		content="Loader is the sawitSvelte busy state: the button's cut silhouette traced by a lime segment, in three sizes and any text colour."
	/>
</svelte:head>

<div class="max-w-3xl">
	<p class="text-xs font-medium tracking-widest text-muted-foreground uppercase">Components</p>
	<h1 class="mt-3 text-4xl font-semibold tracking-tight">Loader</h1>
	<p class="mt-4 text-base leading-relaxed text-muted-foreground">
		The button's silhouette, reduced to a hairline and traced by a segment. Same three bevels, same
		deep notch, same lime — a busy state that belongs to the system rather than a generic spinner.
	</p>
</div>

<section class="mt-12">
	<h2 class="text-lg font-semibold tracking-tight">Usage</h2>
	<Example title="Import and render" code={importCode}>
		<Loader />
	</Example>
	<Example title="Colour follows the text colour" code={usageCode}>
		<Loader />
		<Loader class="text-muted-foreground" />
		<Loader class="text-destructive" />
	</Example>
</section>

<section class="mt-12">
	<h2 class="text-lg font-semibold tracking-tight">Sizes</h2>
	<p class="mt-1 text-sm text-muted-foreground">
		The shape scales as one piece: the trace, the bevels and the notch keep their proportions at
		every size.
	</p>
	<Example code={sizesCode}>
		<Loader size="sm" />
		<Loader size="default" />
		<Loader size="lg" />
	</Example>
	<ThemePreview note="Both themes, same markup.">
		<Loader size="lg" />
		<Loader size="lg" class="text-muted-foreground" />
	</ThemePreview>
</section>

<section class="mt-12">
	<h2 class="text-lg font-semibold tracking-tight">In context</h2>
	<p class="mt-1 text-sm text-muted-foreground">
		Button renders its own Loader while loading, and keeps the label so the accessible name is
		stable. The loader inside is decorative — the button already sets
		<code class="font-mono text-xs">aria-busy</code>.
	</p>
	<Example code={buttonCode}>
		<Button loading>Saving…</Button>
		<Button loading variant="outline">Please wait</Button>
	</Example>
	<Example
		title="Inside a card"
		code={`<Card.Root>
	<Card.Header>
		<Card.Title>Deploying</Card.Title>
		<Card.Description>This usually takes a moment.</Card.Description>
	</Card.Header>
	<Card.Footer><Loader size="sm" /> <span class="text-sm">Working…</span></Card.Footer>
</Card.Root>`}
		previewClass="block max-w-md"
	>
		<Card.Root>
			<Card.Header>
				<Card.Title>Deploying</Card.Title>
				<Card.Description>This usually takes a moment.</Card.Description>
			</Card.Header>
			<Card.Footer>
				<Loader size="sm" />
				<span class="text-sm text-muted-foreground">Working…</span>
			</Card.Footer>
		</Card.Root>
	</Example>
</section>

<section class="mt-12">
	<h2 class="text-lg font-semibold tracking-tight">How it moves</h2>
	<p class="mt-1 max-w-2xl text-sm text-muted-foreground">
		The outline is a polygon with <code class="font-mono text-xs">pathLength="100"</code>, so the
		dash units are percentages of the perimeter and one lap is exactly
		<code class="font-mono text-xs">-100</code> — no measuring, no JavaScript. The track stays at 22%
		so the moving segment reads as a hand travelling around the shape.
	</p>
	<p class="mt-3 max-w-2xl text-sm text-muted-foreground">
		Under <code class="font-mono text-xs">prefers-reduced-motion</code> the animation is cancelled by
		the token layer and the shape holds its resting state — the loader stays legible without moving.
	</p>
</section>

<section class="mt-12">
	<h2 class="text-lg font-semibold tracking-tight">Props</h2>
	<PropsTable rows={propRows} />
</section>

<section class="mt-12">
	<h2 class="text-lg font-semibold tracking-tight">Data attributes</h2>
	<DataAttributesTable rows={dataRows} />
</section>

<section class="mt-12">
	<h2 class="text-lg font-semibold tracking-tight">Accessibility</h2>
	<ul class="mt-4 space-y-3 text-sm text-muted-foreground">
		<li class="flex gap-3">
			<span class="text-primary" aria-hidden="true">—</span>
			<span>
				By default the wrapper is <code class="font-mono text-xs">role="status"</code> with a visually
				hidden label, so the busy state is announced without stealing focus.
			</span>
		</li>
		<li class="flex gap-3">
			<span class="text-primary" aria-hidden="true">—</span>
			<span>
				With <code class="font-mono text-xs">label={null}</code> the wrapper becomes
				<code class="font-mono text-xs">aria-hidden</code> and announces nothing — correct when a
				parent already says it is busy, as <code class="font-mono text-xs">Button</code> does.
			</span>
		</li>
		<li class="flex gap-3">
			<span class="text-primary" aria-hidden="true">—</span>
			<span>
				The SVG itself is always <code class="font-mono text-xs">aria-hidden</code>; it is
				decoration, never the message.
			</span>
		</li>
	</ul>
</section>

<section class="mt-12 mb-4">
	<h2 class="text-lg font-semibold tracking-tight">Source</h2>
	<Example title="loader.svelte" code={loaderSource} />
</section>
