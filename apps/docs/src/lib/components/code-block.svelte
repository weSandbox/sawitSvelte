<script lang="ts">
	let {
		code,
		label,
		class: className = ''
	}: {
		/** The text to display and copy. */
		code: string;
		/** Short label shown in the header, e.g. a filename or "bash". */
		label?: string;
		class?: string;
	} = $props();

	let copied = $state(false);

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

<div class="overflow-hidden rounded-lg border border-border bg-card {className}">
	<div class="flex items-center justify-between gap-3 border-b border-border px-3 py-1.5">
		<span class="font-mono text-xs text-muted-foreground">{label ?? 'code'}</span>
		<button
			type="button"
			onclick={copy}
			class="rounded-md px-2 py-1 text-xs font-medium text-muted-foreground transition-colors duration-[var(--sawit-duration-fast)] hover:bg-accent hover:text-accent-foreground"
		>
			{copied ? 'Copied' : 'Copy'}
		</button>
	</div>
	<pre class="overflow-x-auto p-4 text-xs leading-relaxed"><code class="font-mono">{code}</code
		></pre>
	<span class="sr-only" role="status" aria-live="polite">
		{#if copied}Copied to clipboard{/if}
	</span>
</div>
