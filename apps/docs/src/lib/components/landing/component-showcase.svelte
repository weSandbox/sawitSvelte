<script lang="ts">
	import { resolve } from '$app/paths';
	import { Button, Card } from 'sawitsvelte';
	import { plannedComponents } from '#lib/site.ts';

	const variants = ['default', 'secondary', 'outline', 'ghost', 'destructive'] as const;
</script>

<section class="border-t border-border" aria-labelledby="components-heading">
	<div class="mx-auto w-full max-w-6xl px-6 py-20">
		<div class="flex flex-wrap items-end justify-between gap-4">
			<div class="max-w-2xl">
				<p class="text-xs font-medium tracking-widest text-muted-foreground uppercase">
					Components
				</p>
				<h2 id="components-heading" class="mt-3 text-3xl font-semibold tracking-tight text-balance">
					Two components, fully built.
				</h2>
				<p class="mt-3 max-w-xl text-base leading-relaxed text-muted-foreground">
					Everything below is the real package, rendered live. Each ships with typed props, a
					documented <code class="font-mono text-xs">data-*</code> contract, copy-source, and axe scans
					— not a mockup.
				</p>
			</div>
			<a href={resolve('/components')} class="text-sm font-medium text-foreground hover:underline">
				Browse all components →
			</a>
		</div>

		<div class="mt-10 grid gap-6 lg:grid-cols-2">
			<!-- Button -->
			<Card.Root class="gap-5">
				<Card.Header>
					<div class="flex items-center justify-between gap-2">
						<Card.Title level={3}>Button</Card.Title>
						<span
							class="rounded-full border border-border px-2 py-0.5 text-[10px] font-medium tracking-wide text-muted-foreground uppercase"
						>
							stable
						</span>
					</div>
					<Card.Description>
						Five variants, four sizes, and a busy state that keeps focus. Polymorphic through a
						child snippet.
					</Card.Description>
				</Card.Header>
				<Card.Content>
					<div class="flex flex-wrap items-center gap-2">
						{#each variants as variant (variant)}
							<Button {variant} size="sm">{variant}</Button>
						{/each}
					</div>
				</Card.Content>
				<Card.Footer>
					<a href={resolve('/components/button')} class="text-sm font-medium hover:underline">
						Button documentation →
					</a>
				</Card.Footer>
			</Card.Root>

			<!-- Card -->
			<Card.Root class="gap-5">
				<Card.Header>
					<div class="flex items-center justify-between gap-2">
						<Card.Title level={3}>Card</Card.Title>
						<span
							class="rounded-full border border-border px-2 py-0.5 text-[10px] font-medium tracking-wide text-muted-foreground uppercase"
						>
							stable
						</span>
					</div>
					<Card.Description>
						Six composable parts on one surface. Vertical rhythm lives on the root, so any
						combination keeps the same spacing.
					</Card.Description>
				</Card.Header>
				<Card.Content>
					<Card.Root class="gap-3 border-dashed bg-muted/30 py-4 shadow-none">
						<Card.Header>
							<Card.Title level={4} class="text-sm">Nested card</Card.Title>
							<Card.Description>A Card rendered inside a Card surface.</Card.Description>
						</Card.Header>
					</Card.Root>
				</Card.Content>
				<Card.Footer>
					<a href={resolve('/components/card')} class="text-sm font-medium hover:underline">
						Card documentation →
					</a>
				</Card.Footer>
			</Card.Root>
		</div>

		<!-- Planned: explicitly not available. Non-interactive by design. -->
		<div class="mt-12 rounded-lg border border-dashed border-border p-5">
			<div class="flex flex-wrap items-center gap-2">
				<h3 class="text-sm font-semibold tracking-tight">On the roadmap</h3>
				<span
					class="rounded-full border border-border px-2 py-0.5 text-[10px] font-medium tracking-wide text-muted-foreground uppercase"
				>
					planned · not yet available
				</span>
			</div>
			<p class="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
				These follow the same contract as Button and Card as they ship. They are listed for
				transparency and are not part of the current package.
			</p>
			<ul class="mt-4 flex flex-wrap gap-2" aria-label="Planned components">
				{#each plannedComponents as name (name)}
					<li class="rounded-md border border-border px-2.5 py-1 text-xs text-muted-foreground">
						{name}
					</li>
				{/each}
			</ul>
		</div>
	</div>
</section>
