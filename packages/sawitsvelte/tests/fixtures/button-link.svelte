<script lang="ts">
	import Button from '../../src/lib/button/button.svelte';
	import type { ButtonChildProps } from '../../src/lib/button/button.svelte.js';

	let { disabled = false, onclick }: { disabled?: boolean; onclick?: (event: MouseEvent) => void } =
		$props();
</script>

<!-- The documented polymorphic pattern: the snippet owns the element and spreads
     the attributes Button hands it. -->
{#snippet link({ props }: { props: ButtonChildProps })}
	<a href="/docs" {...props}>Go to docs</a>
{/snippet}

<Button child={link} {disabled} {onclick} />
