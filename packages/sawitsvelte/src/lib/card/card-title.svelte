<script lang="ts">
	import { cn } from '../internal/cn.js';
	import { mergeProps } from '../internal/merge-props.js';
	import { cardVariants, type CardTitleProps } from './card.svelte.js';

	let { class: className, level = 3, children, ...rest }: CardTitleProps = $props();

	const tag = $derived(`h${level}`);

	const sharedProps = $derived(
		mergeProps({ 'data-slot': 'card-title', class: cn(cardVariants().title(), className) }, rest)
	);
</script>

<svelte:element this={tag} {...sharedProps}>
	{@render children?.()}
</svelte:element>
