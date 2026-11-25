<script lang="ts">
	interface Row {
		name: string;
		type: string;
		default?: string;
		description: string;
	}

	let { rows }: { rows: Row[] } = $props();
</script>

<div class="mt-4 overflow-x-auto rounded-lg border border-border">
	<table class="w-full border-collapse text-left text-sm">
		<thead class="bg-muted/50">
			<tr>
				<th scope="col" class="px-4 py-2.5 font-medium">Prop</th>
				<th scope="col" class="px-4 py-2.5 font-medium">Type</th>
				<th scope="col" class="px-4 py-2.5 font-medium">Default</th>
				<th scope="col" class="px-4 py-2.5 font-medium">Description</th>
			</tr>
		</thead>
		<tbody>
			{#each rows as row (row.name)}
				<tr class="border-t border-border align-top">
					<td class="px-4 py-2.5 font-mono text-xs whitespace-nowrap">{row.name}</td>
					<td class="px-4 py-2.5 font-mono text-xs text-muted-foreground">{row.type}</td>
					<td class="px-4 py-2.5 font-mono text-xs text-muted-foreground">{row.default ?? '—'}</td>
					<td class="px-4 py-2.5 text-muted-foreground">{row.description}</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>
