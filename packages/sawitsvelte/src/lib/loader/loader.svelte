<script lang="ts">
	import { cn } from '../internal/cn.js';
	import { mergeProps } from '../internal/merge-props.js';
	import { loaderVariants, LOADER_SHAPE, type LoaderProps } from './loader.svelte.js';

	let { size = 'default', label = 'Loading', class: className, ...rest }: LoaderProps = $props();

	const decorative = $derived(label === null);

	const sharedProps = $derived(
		mergeProps(
			{
				'data-slot': 'loader',
				'data-size': size,
				// A live region announces itself once; a decorative instance must not,
				// because the parent already exposes its own busy state.
				role: decorative ? undefined : 'status',
				'aria-hidden': decorative ? 'true' : undefined,
				class: cn(loaderVariants({ size }), className)
			},
			rest
		)
	);
</script>

<span {...sharedProps}>
	<svg viewBox="0 0 24 24" fill="none" class="size-full" aria-hidden="true" data-loader-svg>
		<!-- Resting track: the silhouette, held back so the trace reads as movement. -->
		<polygon
			points={LOADER_SHAPE}
			stroke="currentColor"
			stroke-width="2.2"
			stroke-opacity="0.3"
			stroke-linejoin="miter"
		/>
		<!-- Tracing segment. `pathLength` normalises the perimeter to 100 units. -->
		<polygon
			points={LOADER_SHAPE}
			pathLength="100"
			stroke="currentColor"
			stroke-width="2.2"
			stroke-dasharray="26 74"
			stroke-linejoin="miter"
			class="animate-trace"
		/>
	</svg>
	{#if !decorative}
		<span class="sr-only">{label}</span>
	{/if}
</span>
