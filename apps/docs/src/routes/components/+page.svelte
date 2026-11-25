<script lang="ts">
	import { resolve } from '$app/paths';
	import { Card } from 'sawitsvelte';
	import Seo from '#lib/components/seo.svelte';
	import { implementedComponents, plannedComponents } from '#lib/site.ts';
</script>

<Seo
	title="Components"
	description="The components shipped in sawitSvelte today — Button and Card — each with live examples, typed props, and copy-source, plus what is on the roadmap."
/>

<div class="max-w-3xl">
	<p class="text-xs font-medium tracking-widest text-muted-foreground uppercase">Components</p>
	<h1 class="mt-3 text-4xl font-semibold tracking-tight text-balance">Components</h1>
	<p class="mt-4 text-base leading-relaxed text-muted-foreground">
		Two components ship today, both meeting the same contract. Each page has live examples, typed
		props, and copy-source.
	</p>
</div>

<section class="mt-10" aria-labelledby="available-heading">
	<h2 id="available-heading" class="text-lg font-semibold tracking-tight">Available</h2>
	<div class="mt-4 grid gap-4 sm:grid-cols-2">
		{#each implementedComponents as component (component.href)}
			<Card.Root class="gap-4">
				<Card.Header>
					<div class="flex items-center justify-between gap-2">
						<Card.Title level={3} class="text-base">{component.name}</Card.Title>
						<span
							class="rounded-full border border-border px-2 py-0.5 text-[10px] font-medium tracking-wide text-muted-foreground uppercase"
						>
							stable
						</span>
					</div>
					<Card.Description>{component.description}</Card.Description>
				</Card.Header>
				<Card.Footer>
					<a href={resolve(component.href)} class="text-sm font-medium hover:underline">
						Open {component.name} →
					</a>
				</Card.Footer>
			</Card.Root>
		{/each}
	</div>
</section>

<section class="mt-12" aria-labelledby="planned-heading">
	<h2 id="planned-heading" class="text-lg font-semibold tracking-tight">Planned</h2>
	<p class="mt-1 max-w-2xl text-sm text-muted-foreground">
		These are not available yet. They are listed so you know what is coming, not what you can use
		today.
	</p>
	<ul class="mt-4 flex flex-wrap gap-2" aria-label="Planned components">
		{#each plannedComponents as name (name)}
			<li class="rounded-md border border-border px-2.5 py-1 text-xs text-muted-foreground">
				{name}
			</li>
		{/each}
	</ul>
</section>
