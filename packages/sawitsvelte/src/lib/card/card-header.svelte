<script lang="ts">
	import { cn } from '../internal/cn.js';
	import { mergeProps } from '../internal/merge-props.js';
	import { cardVariants, type CardHeaderProps } from './card.svelte.js';

	let { class: className, children, ...rest }: CardHeaderProps = $props();

	const sharedProps = $derived(
		mergeProps({ 'data-slot': 'card-header', class: cn(cardVariants().header(), className) }, rest)
	);
</script>

<div {...sharedProps}>
	{@render children?.()}
</div>
