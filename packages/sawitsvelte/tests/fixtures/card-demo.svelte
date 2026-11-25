<script lang="ts">
	import Button from '../../src/lib/button/button.svelte';
	import Content from '../../src/lib/card/card-content.svelte';
	import Description from '../../src/lib/card/card-description.svelte';
	import Footer from '../../src/lib/card/card-footer.svelte';
	import Header from '../../src/lib/card/card-header.svelte';
	import Root from '../../src/lib/card/card-root.svelte';
	import Title from '../../src/lib/card/card-title.svelte';

	let { level = 3 }: { level?: 1 | 2 | 3 | 4 | 5 | 6 } = $props();
</script>

<Root>
	<Header>
		<Title {level}>Create project</Title>
		<Description>Deploy your new project in one click.</Description>
	</Header>
	<Content>
		<p class="text-sm">Your project will be created in the selected region.</p>
	</Content>
	<Footer>
		<Button>Deploy</Button>
	</Footer>
</Root>
