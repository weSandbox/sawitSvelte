<script lang="ts">
	import { resolve } from '$app/paths';
	import { Button, Card, buttonVariants } from 'sawitsvelte';
	import CodeBlock from '#lib/components/code-block.svelte';
	import { INSTALL_COMMAND, NPM_PUBLISHED } from '#lib/site.ts';

	let loading = $state(false);

	function toggleLoading() {
		loading = !loading;
	}
</script>

<section class="hero" aria-labelledby="hero-heading">
	<div class="hero-grid" aria-hidden="true"></div>

	<div class="relative mx-auto w-full max-w-6xl px-6 pt-16 pb-20 sm:pt-24 lg:pb-28">
		<div
			class="grid items-center gap-14 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-16"
		>
			<div>
				<p
					class="inline-flex items-center gap-2 rounded-full border border-border px-3 py-1 text-xs font-medium tracking-wide text-muted-foreground"
				>
					<span class="size-1.5 rounded-full bg-[var(--landing-lime)]" aria-hidden="true"></span>
					Open source · Built for Svelte 5
				</p>

				<h1
					id="hero-heading"
					class="mt-6 text-4xl leading-[1.05] font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl"
				>
					Your Svelte. <span class="hero-accent">Your UI.</span> Your rules.
				</h1>

				<p class="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
					An open-source UI framework built for Svelte 5. Accessible components, a cohesive design
					system, and complete control over your code.
				</p>

				<div class="mt-8 flex flex-wrap items-center gap-3">
					<a
						href={resolve('/docs')}
						class={buttonVariants({
							size: 'lg',
							class:
								'bg-[var(--landing-lime)] text-[var(--landing-lime-ink)] hover:bg-[var(--landing-lime-strong)]'
						})}
					>
						Get started
						<svg class="size-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
							<path
								d="M5 12h14M13 6l6 6-6 6"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
							/>
						</svg>
					</a>
					<a
						href={resolve('/components')}
						class={buttonVariants({ variant: 'outline', size: 'lg' })}
					>
						Explore components
					</a>
				</div>

				<div class="mt-8 max-w-md">
					<div class="mb-2 flex flex-wrap items-center gap-2">
						<span class="text-xs font-medium tracking-widest text-muted-foreground uppercase">
							Install
						</span>
						{#if !NPM_PUBLISHED}
							<span
								class="rounded-full border border-border px-1.5 py-0.5 text-[10px] font-medium tracking-wide uppercase"
							>
								pre-release · not yet on npm
							</span>
						{/if}
					</div>
					<CodeBlock code={INSTALL_COMMAND} label="bash" />
				</div>
			</div>

			<!-- Live showcase: the real Button and Card from the package. -->
			<div class="relative">
				<div
					class="rounded-xl border border-border bg-card p-5 shadow-sm sm:p-6"
					aria-label="Live component preview"
					role="group"
				>
					<div class="flex items-center justify-between gap-2 border-b border-border pb-4">
						<span class="font-mono text-xs text-muted-foreground">button</span>
						<span class="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
							<span class="size-1.5 rounded-full bg-[var(--landing-lime)]" aria-hidden="true"
							></span>
							live
						</span>
					</div>

					<div class="flex flex-wrap items-center gap-2 py-5">
						<Button>Default</Button>
						<Button variant="secondary">Secondary</Button>
						<Button variant="outline">Outline</Button>
						<Button variant="ghost">Ghost</Button>
					</div>

					<div class="flex flex-wrap items-center gap-2 border-t border-border pt-5">
						<Button {loading}>Save changes</Button>
						<Button variant="outline" onclick={toggleLoading} aria-pressed={loading}>
							{loading ? 'Stop demo' : 'Demo loading'}
						</Button>
					</div>

					<div class="mt-6 border-t border-border pt-6">
						<Card.Root class="gap-4 py-4">
							<Card.Header>
								<Card.Title level={2} class="text-sm">Create project</Card.Title>
								<Card.Description>Deploy your new project in one click.</Card.Description>
							</Card.Header>
							<Card.Footer>
								<Button size="sm">Deploy</Button>
								<Button size="sm" variant="ghost">Cancel</Button>
							</Card.Footer>
						</Card.Root>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	.hero {
		position: relative;
		overflow: hidden;
	}

	/* A restrained technical grid, faded out toward the edges. */
	.hero-grid {
		position: absolute;
		inset: 0;
		background-image:
			linear-gradient(to right, var(--border) 1px, transparent 1px),
			linear-gradient(to bottom, var(--border) 1px, transparent 1px);
		background-size: 56px 56px;
		mask-image: radial-gradient(ellipse 70% 60% at 50% 0%, black 20%, transparent 75%);
		opacity: 0.5;
		pointer-events: none;
	}

	.hero-accent {
		color: var(--landing-accent);
	}
</style>
