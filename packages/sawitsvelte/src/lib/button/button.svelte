<script lang="ts">
	import type { ClassValue } from '../internal/cn.js';
	import { cn } from '../internal/cn.js';
	import { mergeProps } from '../internal/merge-props.js';
	import { buttonVariants, type ButtonProps } from './button.svelte.js';

	let {
		variant = 'default',
		size = 'default',
		disabled = false,
		loading = false,
		fullWidth = false,
		type = 'button',
		class: className,
		children,
		child,
		...rest
	}: ButtonProps = $props();

	/**
	 * Unavailable and disabled are deliberately different.
	 *
	 * `disabled` is permanent: the native attribute removes the button from the
	 * tab order, which is the correct statement of intent.
	 *
	 * `loading` is temporary and often follows an activation the user is waiting
	 * on. Disabling it natively would drop focus to `<body>` mid-interaction and
	 * lose a screen reader user's place, so it stays focusable and is blocked via
	 * ARIA plus a cancelled click instead.
	 */
	const unavailable = $derived(disabled || loading);

	/**
	 * Everything a child element can receive. `type` and `disabled` are excluded
	 * on purpose — they are only valid on form controls, and the child decides
	 * how to express unavailability through `aria-disabled` and our click guard.
	 */
	const sharedProps = $derived(
		mergeProps(
			{
				'data-slot': 'button',
				'data-variant': variant,
				'data-size': size,
				'data-disabled': unavailable ? '' : undefined,
				'data-loading': loading ? '' : undefined,
				'aria-disabled': unavailable ? 'true' : undefined,
				'aria-busy': loading ? 'true' : undefined,
				class: cn(buttonVariants({ variant, size, fullWidth }), className as ClassValue),
				// Runs first: preventing the default is what makes an unavailable
				// button inert even when the child is an anchor, where `disabled`
				// means nothing, and it is what stops a loading button from
				// submitting a form twice.
				onclick: (event: Event) => {
					if (unavailable) event.preventDefault();
				}
			},
			rest
		)
	);
</script>

{#if child}
	{@render child({ props: sharedProps })}
{:else}
	<button {...sharedProps} {type} {disabled}>
		{#if loading}
			<svg
				class="size-4 animate-spin"
				viewBox="0 0 24 24"
				fill="none"
				aria-hidden="true"
				data-slot="button-spinner"
			>
				<circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="3" class="opacity-25" />
				<path
					d="M21 12a9 9 0 0 0-9-9"
					stroke="currentColor"
					stroke-width="3"
					stroke-linecap="round"
				/>
			</svg>
		{/if}
		{@render children?.()}
	</button>
{/if}
