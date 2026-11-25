<script lang="ts">
	import type { Snippet } from 'svelte';
	import { cn } from 'sawitsvelte';

	let {
		title,
		code,
		children,
		previewClass = 'flex flex-wrap items-center gap-3'
	}: {
		/** Optional caption shown above the preview. */
		title?: string;
		/** Source shown in the code panel and copied to the clipboard. */
		code: string;
		/** Live demo. Omit for a code-only block, e.g. showing a component's source. */
		children?: Snippet;
		/**
		 * Layout of the demo area. Components that size to their content (buttons)
		 * want a row; block-level ones (cards) want a constrained column.
		 */
		previewClass?: string;
	} = $props();

	let copied = $state(false);
	let expanded = $state(false);

	async function copy() {
		try {
			await navigator.clipboard.writeText(code);
			copied = true;
			setTimeout(() => (copied = false), 1500);
		} catch {
			copied = false;
		}
	}
</script>

<figure class="mt-4 overflow-hidden rounded-lg border border-border">
	{#if title}
		<figcaption
			class="border-b border-border bg-muted/50 px-4 py-2 text-xs font-medium text-muted-foreground"
		>
			{title}
		</figcaption>
	{/if}

	{#if children}
		<!-- `bg-background`, not `bg-card`: components that render a card surface must
		     stand out from the canvas rather than blend into it. -->
		<div class={cn('bg-background px-6 py-10', previewClass)}>
			{@render children()}
		</div>
	{/if}

	<div class="flex items-center justify-between gap-2 border-t border-border bg-muted/30 px-3 py-2">
		<button
			type="button"
			onclick={() => (expanded = !expanded)}
			aria-expanded={expanded}
			class="rounded-md px-2 py-1 text-xs font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
		>
			{expanded ? 'Hide code' : 'Show code'}
		</button>

		<button
			type="button"
			onclick={copy}
			class="rounded-md px-2 py-1 text-xs font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
		>
			{copied ? 'Copied' : 'Copy'}
		</button>
	</div>

	{#if expanded}
		<pre
			class="overflow-x-auto border-t border-border bg-muted/20 p-4 text-xs leading-relaxed"><code
				>{code}</code
			></pre>
	{/if}
</figure>
