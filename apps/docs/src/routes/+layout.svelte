<script lang="ts">
	import '../app.css';
	import { ThemeProvider } from 'sawitsvelte';
	import favicon from '#lib/assets/favicon.svg';
	import SiteFooter from '#lib/components/site-footer.svelte';
	import SiteHeader from '#lib/components/site-header.svelte';
	import type { LayoutProps } from './$types';

	let { children }: LayoutProps = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<ThemeProvider defaultTheme="system">
	<div class="flex min-h-dvh flex-col bg-background text-foreground">
		<a
			href="#main"
			class="sr-only rounded-md bg-background px-4 py-2 text-sm font-medium focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-[var(--sawit-z-toast)] focus:border focus:border-border"
		>
			Skip to content
		</a>

		<SiteHeader />

		<main id="main" tabindex="-1" class="flex-1 outline-none">
			{@render children()}
		</main>

		<SiteFooter />
	</div>
</ThemeProvider>
