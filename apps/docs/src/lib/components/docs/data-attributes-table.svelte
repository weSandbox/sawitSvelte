<script lang="ts">
	let { rows }: { rows: Array<{ name: string; values: string; description: string }> } = $props();
</script>

<div class="mt-4 overflow-x-auto rounded-lg border border-border">
	<table class="w-full border-collapse text-left text-sm">
		<thead class="bg-muted/50">
			<tr>
				<th scope="col" class="px-4 py-2.5 font-medium">Attribute</th>
				<th scope="col" class="px-4 py-2.5 font-medium">Values</th>
				<th scope="col" class="px-4 py-2.5 font-medium">Description</th>
			</tr>
		</thead>
		<tbody>
			{#each rows as row (row.name)}
				<tr class="border-t border-border align-top">
					<td class="px-4 py-2.5 font-mono text-xs whitespace-nowrap">{row.name}</td>
					<td class="px-4 py-2.5 font-mono text-xs text-muted-foreground">{row.values}</td>
					<td class="px-4 py-2.5 text-muted-foreground">{row.description}</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>
