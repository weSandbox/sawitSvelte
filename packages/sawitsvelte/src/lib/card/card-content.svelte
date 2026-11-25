<script lang="ts">
	import { cn } from '../internal/cn.js';
	import { mergeProps } from '../internal/merge-props.js';
	import { cardVariants, type CardContentProps } from './card.svelte.js';

	let { class: className, children, ...rest }: CardContentProps = $props();

	const sharedProps = $derived(
		mergeProps(
			{ 'data-slot': 'card-content', class: cn(cardVariants().content(), className) },
			rest
		)
	);
</script>

<div {...sharedProps}>
	{@render children?.()}
</div>
