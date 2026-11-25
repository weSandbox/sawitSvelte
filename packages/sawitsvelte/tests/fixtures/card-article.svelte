<script lang="ts">
	import Root from '../../src/lib/card/card-root.svelte';
	import type { CardChildProps } from '../../src/lib/card/card.svelte.js';
</script>

<!-- A card that represents self-contained content should be an article; the
     snippet owns the element and spreads the contract onto it. -->
{#snippet article({ props }: { props: CardChildProps })}
	<article {...props}>
		<h3>Article card</h3>
		<p>Body copy.</p>
	</article>
{/snippet}

<Root child={article} />
