<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		title,
		code,
		children
	}: {
		/** Optional caption shown above the preview. */
		title?: string;
		/** Source shown in the code panel and copied to the clipboard. */
		code: string;
		/** Live demo. Omit for a code-only block, e.g. showing a component's source. */
		children?: Snippet;
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
		<div class="flex flex-wrap items-center gap-3 bg-card px-6 py-10">
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
