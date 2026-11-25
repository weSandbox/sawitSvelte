<script lang="ts">
	import { cn } from '../internal/cn.js';
	import { mergeProps } from '../internal/merge-props.js';
	import { cardVariants, type CardRootProps } from './card.svelte.js';

	let { class: className, featured = false, children, child, ...rest }: CardRootProps = $props();

	const sharedProps = $derived(
		mergeProps(
			{
				'data-slot': 'card',
				'data-featured': featured ? '' : undefined,
				class: cn(cardVariants({ featured }).root(), className)
			},
			rest
		)
	);
</script>

{#if child}
	{@render child({ props: sharedProps })}
{:else}
	<div {...sharedProps}>
		{@render children?.()}
	</div>
{/if}
