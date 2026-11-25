<script lang="ts">
	import { resolve } from '$app/paths';
	import { Card, buttonVariants } from 'sawitsvelte';
	import CodeBlock from '#lib/components/code-block.svelte';
	import Seo from '#lib/components/seo.svelte';
	import {
		BUTTON_USAGE,
		GITHUB_URL,
		INSTALL_COMMAND,
		NPM_PACKAGE,
		NPM_PUBLISHED,
		THEME_CSS,
		implementedComponents
	} from '#lib/site.ts';
</script>

<Seo
	title="Documentation"
	description="Get started with sawitSvelte: install, the three-line CSS setup, and where to find components, design tokens, and the source."
/>

<div class="max-w-3xl">
	<p class="text-xs font-medium tracking-widest text-muted-foreground uppercase">Documentation</p>
	<h1 class="mt-3 text-4xl font-semibold tracking-tight text-balance">Getting started</h1>
	<p class="mt-4 text-base leading-relaxed text-muted-foreground">
		sawitSvelte is an open-source UI framework built natively for Svelte 5. This page covers the
		installation contract as it exists today, then points you at the components and the token
		system.
	</p>
</div>

<section class="mt-12" aria-labelledby="install-heading">
	<h2 id="install-heading" class="text-xl font-semibold tracking-tight">Install</h2>
	<p class="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
		{#if NPM_PUBLISHED}
			Add the package with your package manager.
		{:else}
			The <code class="font-mono text-xs">{NPM_PACKAGE}</code> package is pre-release and not yet on the
			public npm registry. Until it is published, build it from the repository. The commands below are
			the intended install path and the current local workflow.
		{/if}
	</p>
	<div class="mt-4 grid max-w-2xl gap-3">
		<CodeBlock code={INSTALL_COMMAND} label="bash" />
	</div>
</section>

<section class="mt-12" aria-labelledby="css-heading">
	<h2 id="css-heading" class="text-xl font-semibold tracking-tight">Add the theme CSS</h2>
	<p class="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
		Three lines in your global stylesheet. Tailwind, our tokens and bridge, and a source hint so
		Tailwind can find the component class strings inside the package.
	</p>
	<div class="mt-4 max-w-2xl">
		<CodeBlock code={THEME_CSS} label="app.css" />
	</div>
</section>

<section class="mt-12" aria-labelledby="use-heading">
	<h2 id="use-heading" class="text-xl font-semibold tracking-tight">Use a component</h2>
	<p class="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
		Components are Svelte 5 native and fully typed. Import from the barrel or from a subpath.
	</p>
	<div class="mt-4 max-w-2xl">
		<CodeBlock code={BUTTON_USAGE} label="App.svelte" />
	</div>
</section>

<section class="mt-12" aria-labelledby="explore-heading">
	<h2 id="explore-heading" class="text-xl font-semibold tracking-tight">Explore</h2>
	<div class="mt-4 grid gap-4 sm:grid-cols-2">
		<Card.Root class="gap-4">
			<Card.Header>
				<Card.Title level={3} class="text-base">Design tokens</Card.Title>
				<Card.Description>
					The two-tier token system: palette, semantic surfaces, radius, elevation, and layering.
				</Card.Description>
			</Card.Header>
			<Card.Footer>
				<a href={resolve('/docs/tokens')} class="text-sm font-medium hover:underline">
					Token reference →
				</a>
			</Card.Footer>
		</Card.Root>

		<Card.Root class="gap-4">
			<Card.Header>
				<Card.Title level={3} class="text-base">Components</Card.Title>
				<Card.Description>
					Live examples, props tables, and copy-source for every shipped component.
				</Card.Description>
			</Card.Header>
			<Card.Footer>
				<a href={resolve('/components')} class="text-sm font-medium hover:underline">
					Browse components →
				</a>
			</Card.Footer>
		</Card.Root>
	</div>

	<ul class="mt-6 max-w-2xl space-y-2 text-sm">
		{#each implementedComponents as component (component.href)}
			<li>
				<a href={resolve(component.href)} class="font-medium hover:underline">
					{component.name}
				</a>
				<span class="text-muted-foreground"> — {component.description}</span>
			</li>
		{/each}
	</ul>
</section>

<section class="mt-12" aria-labelledby="license-heading">
	<h2 id="license-heading" class="text-xl font-semibold tracking-tight">License</h2>
	<p id="license" class="mt-2 max-w-2xl scroll-mt-20 text-sm leading-relaxed text-muted-foreground">
		sawitSvelte is released under the MIT license. You can use it in personal and commercial
		projects, modify it, and redistribute it under the same terms. The full text lives in the
		repository at <code class="font-mono text-xs">LICENSE</code>.
	</p>
</section>

<section class="mt-12" aria-labelledby="contributing-heading">
	<h2 id="contributing-heading" class="text-xl font-semibold tracking-tight">Contributing</h2>
	<p
		id="contributing"
		class="mt-2 max-w-2xl scroll-mt-20 text-sm leading-relaxed text-muted-foreground"
	>
		Every component follows the contract in ADR-0005 — typed props, a documented
		<code class="font-mono text-xs">data-*</code> contract, browser tests, an axe scan, and a docs
		page. New components copy Button's structure. Architecture decisions are recorded in
		<code class="font-mono text-xs">docs/adr</code>.
	</p>
	<div class="mt-4 flex flex-wrap gap-3">
		<a
			href={GITHUB_URL}
			target="_blank"
			rel="external noopener noreferrer"
			class={buttonVariants({ variant: 'outline' })}
		>
			View the repository
			<span class="sr-only"> (opens in a new tab)</span>
		</a>
	</div>
</section>
