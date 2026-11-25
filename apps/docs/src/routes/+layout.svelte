<script lang="ts">
	import '../app.css';
	import { ThemeProvider } from 'sawitsvelte';
	import favicon from '#lib/assets/favicon.svg';
	import ThemeToggle from '#lib/components/theme-toggle.svelte';
	import type { LayoutProps } from './$types';
	import { resolve } from '$app/paths';

	let { children }: LayoutProps = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<ThemeProvider defaultTheme="system">
	<div class="min-h-dvh bg-background text-foreground">
		<header
			class="sticky top-0 z-[var(--sawit-z-sticky)] border-b border-border bg-background/80 backdrop-blur"
		>
			<div class="mx-auto flex h-14 w-full max-w-5xl items-center justify-between px-6">
				<a href={resolve('/')} class="text-sm font-semibold tracking-tight">sawitSvelte</a>
				<nav class="flex items-center gap-3">
					<span class="hidden text-xs text-muted-foreground sm:inline">Phase 1 · Foundation</span>
					<ThemeToggle />
				</nav>
			</div>
		</header>

		<main class="mx-auto w-full max-w-5xl px-6 py-10">{@render children()}</main>
	</div>
</ThemeProvider>
