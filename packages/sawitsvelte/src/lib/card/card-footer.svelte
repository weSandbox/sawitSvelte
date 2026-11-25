<script lang="ts">
	import { cn } from '../internal/cn.js';
	import { mergeProps } from '../internal/merge-props.js';
	import { cardVariants, type CardFooterProps } from './card.svelte.js';

	let { class: className, children, ...rest }: CardFooterProps = $props();

	const sharedProps = $derived(
		mergeProps({ 'data-slot': 'card-footer', class: cn(cardVariants().footer(), className) }, rest)
	);
</script>

<div {...sharedProps}>
	{@render children?.()}
</div>
