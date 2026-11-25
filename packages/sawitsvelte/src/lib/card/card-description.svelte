<script lang="ts">
	import { cn } from '../internal/cn.js';
	import { mergeProps } from '../internal/merge-props.js';
	import { cardVariants, type CardDescriptionProps } from './card.svelte.js';

	let { class: className, children, ...rest }: CardDescriptionProps = $props();

	const sharedProps = $derived(
		mergeProps(
			{ 'data-slot': 'card-description', class: cn(cardVariants().description(), className) },
			rest
		)
	);
</script>

<p {...sharedProps}>
	{@render children?.()}
</p>
