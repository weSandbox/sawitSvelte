<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		children,
		note
	}: {
		/** Rendered twice, once per theme. */
		children: Snippet;
		/** Optional caption under the pair. */
		note?: string;
	} = $props();
</script>

<!--
	Both themes, side by side. This only works because the token layer declares
	light values on `[data-theme='light']` as well as `:root`, so a nested panel
	can re-declare the palette for its own subtree.
-->
<div class="mt-4 overflow-hidden rounded-lg border border-border">
	<div class="grid sm:grid-cols-2">
		<div data-theme="light" class="bg-background p-6 text-foreground">
			<p class="mb-5 text-[10px] font-medium tracking-widest text-muted-foreground uppercase">
				Light
			</p>
			<div class="flex flex-wrap items-center gap-3">
				{@render children()}
			</div>
		</div>
		<div
			data-theme="dark"
			class="border-t border-border bg-background p-6 text-foreground sm:border-t-0 sm:border-l"
		>
			<p class="mb-5 text-[10px] font-medium tracking-widest text-muted-foreground uppercase">
				Dark
			</p>
			<div class="flex flex-wrap items-center gap-3">
				{@render children()}
			</div>
		</div>
	</div>
</div>

{#if note}
	<p class="mt-2 text-xs text-muted-foreground">{note}</p>
{/if}
