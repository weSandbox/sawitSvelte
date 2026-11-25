<script lang="ts">
	import { Button, Card, type CardChildProps } from 'sawitsvelte';
	import DataAttributesTable from '#lib/components/docs/data-attributes-table.svelte';
	import Example from '#lib/components/docs/example.svelte';
	import PropsTable from '#lib/components/docs/props-table.svelte';

	import rootSource from '../../../../../../packages/sawitsvelte/src/lib/card/card-root.svelte?raw';
	import variantsSource from '../../../../../../packages/sawitsvelte/src/lib/card/card.svelte.ts?raw';

	// Svelte's parser ends the instance script at a literal script tag anywhere in
	// the block, including inside a string or comment. Build the tag text instead.
	const open = '<' + 'script lang="ts">';
	const close = '</' + 'script>';

	const importCode = `${open}
	import { Card } from 'sawitsvelte';
${close}`;

	const usageCode = `<Card.Root>
	<Card.Header>
		<Card.Title>Create project</Card.Title>
		<Card.Description>Deploy your new project in one click.</Card.Description>
	</Card.Header>
	<Card.Content>
		<p>Your project will be created in the selected region.</p>
	</Card.Content>
	<Card.Footer>
		<Button>Deploy</Button>
	</Card.Footer>
</Card.Root>`;

	const minimalCode = `<Card.Root>
	<Card.Content>Just some content.</Card.Content>
</Card.Root>`;

	const levelCode = `<Card.Root>
	<Card.Header>
		<Card.Title level={2}>Section title</Card.Title>
	</Card.Header>
</Card.Root>`;

	const actionCode = `<Card.Root>
	<Card.Header>
		<Card.Title>Billing</Card.Title>
		<Card.Description>Manage your plan and invoices.</Card.Description>
	</Card.Header>
	<Card.Content>
		<p>You are on the Pro plan.</p>
	</Card.Content>
	<Card.Footer>
		<Button>Upgrade</Button>
		<Button variant="outline">Cancel plan</Button>
	</Card.Footer>
</Card.Root>`;

	const articleCode = `{#snippet article({ props }: { props: CardChildProps })}
	<article {...props}>
		<h3>Article card</h3>
		<p>Self-contained content.</p>
	</article>
{/snippet}

<Card.Root child={article} />`;

	const partRows = [
		{
			name: 'Card.Root',
			type: 'div (or your element via `child`)',
			default: 'div',
			description: 'Owns the surface and the vertical rhythm. The only part that is polymorphic.'
		},
		{
			name: 'Card.Header',
			type: 'div',
			default: '—',
			description: 'Groups the title and description with tighter spacing.'
		},
		{
			name: 'Card.Title',
			type: 'h1–h6',
			default: 'h3',
			description: 'A real heading, so headings navigation works. Set `level` to fit the outline.'
		},
		{
			name: 'Card.Description',
			type: 'p',
			default: '—',
			description: 'Supporting copy in the muted foreground colour.'
		},
		{
			name: 'Card.Content',
			type: 'div',
			default: '—',
			description: 'The body. Horizontal padding only; vertical spacing comes from Root.'
		},
		{
			name: 'Card.Footer',
			type: 'div',
			default: '—',
			description: 'Action row, laid out as a flex line with a small gap.'
		}
	];

	const propRows = [
		{
			name: 'class',
			type: 'ClassValue',
			default: '—',
			description: 'On every part. Merged last, so your utilities win on conflict.'
		},
		{
			name: 'children',
			type: 'Snippet',
			default: '—',
			description: 'On every part. Parts render nothing when it is absent.'
		},
		{
			name: 'level',
			type: '1 | 2 | 3 | 4 | 5 | 6',
			default: '3',
			description: '`Card.Title` only. Chooses the heading element.'
		},
		{
			name: 'child',
			type: 'Snippet<[{ props: CardChildProps }]>',
			default: '—',
			description: '`Card.Root` only. Renders your own element, e.g. `<article>`.'
		},
		{
			name: '…rest',
			type: 'HTML attributes',
			default: '—',
			description: 'Native attributes for the element, forwarded unchanged.'
		}
	];

	const dataRows = [
		{
			name: 'data-slot',
			values: '"card" | "card-header" | …',
			description:
				'One per part: card, card-header, card-title, card-description, card-content, card-footer.'
		}
	];
</script>

<!-- Page-level snippet: one declared inside a component's content becomes a prop
     of that component instead of a local snippet. -->
{#snippet article({ props }: { props: CardChildProps })}
	<article {...props}>
		<h3 class="font-semibold">Article card</h3>
		<p class="mt-1 text-sm text-muted-foreground">Self-contained content.</p>
	</article>
{/snippet}

<svelte:head>
	<title>Card — sawitSvelte</title>
	<meta
		name="description"
		content="Card is a six-part composable sawitSvelte component: Root, Header, Title, Description, Content, and Footer on a single surface."
	/>
</svelte:head>

<div class="max-w-3xl">
	<p class="text-xs font-medium tracking-widest text-muted-foreground uppercase">Components</p>
	<h1 class="mt-3 text-4xl font-semibold tracking-tight">Card</h1>
	<p class="mt-4 text-base leading-relaxed text-muted-foreground">
		Six composable parts on a single surface. Card is the first multipart component, and it is what
		proved the Button contract scales: same `data-slot` convention, same class merge, same package
		exports.
	</p>
</div>

<section class="mt-12">
	<h2 class="text-lg font-semibold tracking-tight">Usage</h2>
	<Example previewClass="block max-w-md" title="Import" code={importCode}>
		<Card.Root>
			<Card.Content>Card parts are available on the `Card` namespace.</Card.Content>
		</Card.Root>
	</Example>
	<Example previewClass="block max-w-md" title="A complete card" code={usageCode}>
		<Card.Root>
			<Card.Header>
				<Card.Title>Create project</Card.Title>
				<Card.Description>Deploy your new project in one click.</Card.Description>
			</Card.Header>
			<Card.Content>
				<p class="text-sm">Your project will be created in the selected region.</p>
			</Card.Content>
			<Card.Footer>
				<Button>Deploy</Button>
			</Card.Footer>
		</Card.Root>
	</Example>
</section>

<section class="mt-12">
	<h2 class="text-lg font-semibold tracking-tight">Composition</h2>
	<p class="mt-1 text-sm text-muted-foreground">
		Parts are optional and independent. Vertical spacing lives on Root, so any combination keeps the
		same rhythm — no part adds padding that would stack with its neighbour.
	</p>
	<Example previewClass="block max-w-md" title="Only what you need" code={minimalCode}>
		<Card.Root>
			<Card.Content>
				<p class="text-sm">Just some content.</p>
			</Card.Content>
		</Card.Root>
	</Example>
	<Example previewClass="block max-w-md" title="With actions" code={actionCode}>
		<Card.Root>
			<Card.Header>
				<Card.Title>Billing</Card.Title>
				<Card.Description>Manage your plan and invoices.</Card.Description>
			</Card.Header>
			<Card.Content>
				<p class="text-sm">You are on the Pro plan.</p>
			</Card.Content>
			<Card.Footer>
				<Button>Upgrade</Button>
				<Button variant="outline">Cancel plan</Button>
			</Card.Footer>
		</Card.Root>
	</Example>
</section>

<section class="mt-12">
	<h2 class="text-lg font-semibold tracking-tight">Heading structure</h2>
	<p class="mt-1 text-sm text-muted-foreground">
		Card.Title renders a real heading — <code class="font-mono text-xs">h3</code> by default. Use
		<code class="font-mono text-xs">level</code> to match the page outline instead of overriding the element,
		so screen reader heading navigation stays correct.
	</p>
	<Example previewClass="block max-w-md" code={levelCode}>
		<Card.Root>
			<Card.Header>
				<Card.Title level={2}>Section title</Card.Title>
			</Card.Header>
		</Card.Root>
	</Example>
</section>

<section class="mt-12">
	<h2 class="text-lg font-semibold tracking-tight">Semantic element</h2>
	<p class="mt-1 text-sm text-muted-foreground">
		Root renders a <code class="font-mono text-xs">div</code> by default. When the card is a
		self-contained piece of content, pass a snippet to render
		<code class="font-mono text-xs">&lt;article&gt;</code> or
		<code class="font-mono text-xs">&lt;section&gt;</code> and keep the styling.
	</p>
	<Example previewClass="block max-w-md" code={articleCode}>
		<Card.Root child={article} />
	</Example>
</section>

<section class="mt-12">
	<h2 class="text-lg font-semibold tracking-tight">Parts</h2>
	<PropsTable rows={partRows} />
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
				The title is a heading element, not styled text, so it appears in a screen reader's heading
				list. Pick <code class="font-mono text-xs">level</code> from the surrounding document, not from
				the visual size.
			</span>
		</li>
		<li class="flex gap-3">
			<span class="text-primary" aria-hidden="true">—</span>
			<span>
				Card adds no <code class="font-mono text-xs">role</code> and no landmark. A card is usually
				a presentational grouping; when it is not, render it as
				<code class="font-mono text-xs">article</code> or
				<code class="font-mono text-xs">section</code> with
				<code class="font-mono text-xs">child</code>.
			</span>
		</li>
		<li class="flex gap-3">
			<span class="text-primary" aria-hidden="true">—</span>
			<span>
				Card does not generate ids or <code class="font-mono text-xs">aria-describedby</code>
				links. Quick, unlabelled groupings do better without invented relationships than with ones that
				point at the wrong element.
			</span>
		</li>
		<li class="flex gap-3">
			<span class="text-primary" aria-hidden="true">—</span>
			<span>
				Text colours come from paired tokens (<code class="font-mono text-xs">--card</code> /
				<code class="font-mono text-xs">--card-foreground</code>), so contrast holds in both themes
				— verified by an axe scan per theme in CI.
			</span>
		</li>
	</ul>
</section>

<section class="mt-12 mb-4">
	<h2 class="text-lg font-semibold tracking-tight">Source</h2>
	<p class="mt-1 text-sm text-muted-foreground">
		The slot definitions and the root part, exactly as published.
	</p>
	<Example previewClass="block max-w-md" title="card.svelte.ts" code={variantsSource} />
	<Example previewClass="block max-w-md" title="card-root.svelte" code={rootSource} />
</section>
