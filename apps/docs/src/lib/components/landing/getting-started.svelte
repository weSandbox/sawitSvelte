<script lang="ts">
	import { resolve } from '$app/paths';
	import CodeBlock from '#lib/components/code-block.svelte';
	import { BUTTON_USAGE, INSTALL_COMMAND, NPM_PUBLISHED, THEME_CSS } from '#lib/site.ts';
</script>

<section class="border-t border-border" aria-labelledby="start-heading">
	<div class="mx-auto w-full max-w-6xl px-6 py-20">
		<div class="grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
			<div>
				<p class="text-xs font-medium tracking-widest text-muted-foreground uppercase">
					Getting started
				</p>
				<h2 id="start-heading" class="mt-3 text-3xl font-semibold tracking-tight text-balance">
					Set up in three steps.
				</h2>
				<p class="mt-3 text-base leading-relaxed text-muted-foreground">
					The whole installation contract is Tailwind, our tokens and bridge, and a source hint so
					Tailwind can find the component classes. No config file, no plugin.
				</p>

				<ol class="mt-8 space-y-6">
					<li class="flex gap-4">
						<span class="font-mono text-xs text-[var(--landing-accent)]">01</span>
						<div>
							<p class="text-sm font-medium">Install the package</p>
							<p class="mt-1 text-sm text-muted-foreground">
								{#if NPM_PUBLISHED}
									Add it with your package manager of choice.
								{:else}
									Pre-release only — not on npm yet. Build it from the repository until it is
									published.
								{/if}
							</p>
						</div>
					</li>
					<li class="flex gap-4">
						<span class="font-mono text-xs text-[var(--landing-accent)]">02</span>
						<div>
							<p class="text-sm font-medium">Add the three lines to your global CSS</p>
							<p class="mt-1 text-sm text-muted-foreground">
								Imports Tailwind, the token theme, and points Tailwind at the package.
							</p>
						</div>
					</li>
					<li class="flex gap-4">
						<span class="font-mono text-xs text-[var(--landing-accent)]">03</span>
						<div>
							<p class="text-sm font-medium">Import and render</p>
							<p class="mt-1 text-sm text-muted-foreground">
								Components are Svelte 5 native, typed end to end.
							</p>
						</div>
					</li>
				</ol>

				<a
					href={resolve('/docs')}
					class="mt-8 inline-flex text-sm font-medium text-foreground hover:underline"
				>
					Read the full getting started guide →
				</a>
			</div>

			<div class="space-y-4">
				<CodeBlock code={INSTALL_COMMAND} label="bash" />
				<CodeBlock code={THEME_CSS} label="app.css" />
				<CodeBlock code={BUTTON_USAGE} label="App.svelte" />
			</div>
		</div>
	</div>
</section>
