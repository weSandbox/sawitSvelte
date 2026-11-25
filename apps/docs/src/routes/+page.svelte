<script lang="ts">
	import { resolve } from '$app/paths';
	import { buttonVariants } from 'sawitsvelte';

	const paired = [
		'primary',
		'secondary',
		'muted',
		'accent',
		'destructive',
		'success',
		'warning',
		'info'
	] as const;

	const flat = ['background', 'card', 'popover', 'border', 'input', 'ring'] as const;

	const charts = ['chart-1', 'chart-2', 'chart-3', 'chart-4', 'chart-5'] as const;

	const radiusClass = {
		sm: 'rounded-sm',
		md: 'rounded-md',
		lg: 'rounded-lg',
		xl: 'rounded-xl'
	} as const;

	const radii = ['sm', 'md', 'lg', 'xl'] as const;

	const elevations = [
		{ name: '--sawit-shadow-xs', class: 'shadow-xs' },
		{ name: '--sawit-shadow-sm', class: 'shadow-sm' },
		{ name: '--sawit-shadow-md', class: 'shadow-md' },
		{ name: '--sawit-shadow-lg', class: 'shadow-lg' },
		{ name: '--sawit-shadow-xl', class: 'shadow-xl' }
	] as const;

	const layers = [
		['dropdown', '--sawit-z-dropdown'],
		['sticky', '--sawit-z-sticky'],
		['overlay', '--sawit-z-overlay'],
		['modal', '--sawit-z-modal'],
		['popover', '--sawit-z-popover'],
		['toast', '--sawit-z-toast'],
		['tooltip', '--sawit-z-tooltip']
	] as const;
</script>

<div class="max-w-3xl">
	<p class="text-xs font-medium tracking-widest text-muted-foreground uppercase">
		Phase 2 — Button
	</p>
	<h1 class="mt-3 text-4xl font-semibold tracking-tight text-balance">
		A design system that themes at runtime, not at build time.
	</h1>
	<p class="mt-4 text-base leading-relaxed text-muted-foreground">
		Every utility below emits <code class="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">
			var(--token)
		</code>
		instead of a baked value, so switching
		<code class="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">data-theme</code> repaints the whole
		framework without regenerating CSS.
	</p>

	<div class="mt-6 flex flex-wrap items-center gap-3">
		<a href={resolve('/components/button')} class={buttonVariants({ size: 'lg' })}>
			Explore Button
		</a>
		<a
			href="https://github.com/weSandbox/sawitSvelte"
			class={buttonVariants({ variant: 'outline', size: 'lg' })}
		>
			Source
		</a>
	</div>
</div>

<section class="mt-14">
	<h2 class="text-lg font-semibold tracking-tight">Semantic surfaces</h2>
	<p class="mt-1 text-sm text-muted-foreground">
		Each surface ships with the one foreground colour guaranteed to be legible on it.
	</p>

	<div class="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
		{#each paired as token (token)}
			<div class="overflow-hidden rounded-lg border border-border">
				<div
					class="flex h-20 items-center justify-center text-xs font-medium"
					style={`background: var(--${token}); color: var(--${token}-foreground)`}
				>
					Aa
				</div>
				<div
					class="border-t border-border bg-card px-2.5 py-2 font-mono text-[11px] text-muted-foreground"
				>
					{token}
				</div>
			</div>
		{/each}
	</div>

	<div class="mt-3 grid grid-cols-3 gap-3 sm:grid-cols-6">
		{#each flat as token (token)}
			<div class="overflow-hidden rounded-lg border border-border">
				<div class="h-12" style={`background: var(--${token})`}></div>
				<div
					class="border-t border-border bg-card px-2 py-1.5 font-mono text-[11px] text-muted-foreground"
				>
					{token}
				</div>
			</div>
		{/each}
	</div>

	<div class="mt-3 flex gap-3">
		{#each charts as token (token)}
			<div class="flex-1">
				<div class="h-8 rounded-md" style={`background: var(--${token})`}></div>
				<div class="mt-1.5 font-mono text-[11px] text-muted-foreground">{token}</div>
			</div>
		{/each}
	</div>
</section>

<section class="mt-14">
	<h2 class="text-lg font-semibold tracking-tight">Type scale</h2>
	<div class="mt-6 space-y-2 border-l-2 border-border pl-4">
		<p class="text-3xl font-semibold tracking-tight">The quick brown fox</p>
		<p class="text-2xl font-semibold tracking-tight">The quick brown fox</p>
		<p class="text-xl font-medium">The quick brown fox</p>
		<p class="text-base">The quick brown fox jumps over the lazy dog</p>
		<p class="text-sm text-muted-foreground">The quick brown fox jumps over the lazy dog</p>
		<p class="text-xs text-muted-foreground">The quick brown fox jumps over the lazy dog</p>
		<p class="font-mono text-sm">const tokens = 'fixed-width'</p>
	</div>
</section>

<section class="mt-14">
	<h2 class="text-lg font-semibold tracking-tight">Radius</h2>
	<p class="mt-1 text-sm text-muted-foreground">
		The whole scale derives from a single <code class="font-mono text-xs">--sawit-radius</code> token.
	</p>
	<div class="mt-6 grid grid-cols-4 gap-3">
		{#each radii as step (step)}
			<div class="{radiusClass[step]} border border-border bg-card p-4 text-center">
				<div class="text-sm font-medium">{step}</div>
			</div>
		{/each}
	</div>
</section>

<section class="mt-14">
	<h2 class="text-lg font-semibold tracking-tight">Elevation</h2>
	<div class="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-5">
		{#each elevations as shadow (shadow.name)}
			<div class="rounded-lg border border-border bg-card p-4 text-center {shadow.class}">
				<div class="text-sm font-medium">{shadow.name.replace('--sawit-shadow-', '')}</div>
			</div>
		{/each}
	</div>
</section>

<section class="mt-14 mb-4">
	<h2 class="text-lg font-semibold tracking-tight">Layering</h2>
	<p class="mt-1 text-sm text-muted-foreground">
		One documented stacking order, so overlays never fight each other.
	</p>
	<div class="mt-6 divide-y divide-border rounded-lg border border-border">
		{#each layers as [name, token] (token)}
			<div class="flex items-center justify-between px-4 py-2.5 text-sm">
				<span class="capitalize">{name}</span>
				<code class="font-mono text-xs text-muted-foreground">{token}</code>
			</div>
		{/each}
	</div>
</section>
