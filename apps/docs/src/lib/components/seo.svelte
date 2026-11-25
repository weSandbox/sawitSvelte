<script lang="ts">
	import { SITE_NAME } from '#lib/site.ts';

	let {
		title,
		description,
		type = 'website'
	}: {
		/** Page title without the site suffix; the suffix is added here. */
		title: string;
		description: string;
		type?: 'website' | 'article';
	} = $props();

	const fullTitle = $derived(`${title} — ${SITE_NAME}`);
</script>

<svelte:head>
	<title>{fullTitle}</title>
	<meta name="description" content={description} />

	<meta property="og:type" content={type} />
	<meta property="og:site_name" content={SITE_NAME} />
	<meta property="og:title" content={fullTitle} />
	<meta property="og:description" content={description} />

	<meta name="twitter:card" content="summary" />
	<meta name="twitter:title" content={fullTitle} />
	<meta name="twitter:description" content={description} />
</svelte:head>
