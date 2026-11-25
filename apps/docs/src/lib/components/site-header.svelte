<script lang="ts">
	import { resolve } from '$app/paths';
	import NavLinks from '#lib/components/nav-links.svelte';
	import ThemeToggle from '#lib/components/theme-toggle.svelte';
	import { SITE_NAME } from '#lib/site.ts';

	let mobileOpen = $state(false);
	let menuButton = $state<HTMLButtonElement | null>(null);

	function closeMenu(restoreFocus = false) {
		mobileOpen = false;
		if (restoreFocus) menuButton?.focus();
	}

	// Close on Escape and return focus to the control that opened the panel,
	// so keyboard users are never stranded.
	function onkeydown(event: KeyboardEvent) {
		if (event.key === 'Escape' && mobileOpen) {
			event.preventDefault();
			closeMenu(true);
		}
	}

	// If the viewport grows past the breakpoint while the panel is open, reset
	// state so `aria-expanded` never claims an open panel that CSS has hidden.
	$effect(() => {
		const query = window.matchMedia('(min-width: 768px)');
		const onChange = (event: MediaQueryListEvent) => {
			if (event.matches && mobileOpen) mobileOpen = false;
		};
		query.addEventListener('change', onChange);
		return () => query.removeEventListener('change', onChange);
	});
</script>

<svelte:window {onkeydown} />

<header
	class="sticky top-0 z-[var(--sawit-z-sticky)] border-b border-border bg-background/80 backdrop-blur"
>
	<div class="mx-auto flex h-14 w-full max-w-6xl items-center justify-between gap-4 px-6">
		<a
			href={resolve('/')}
			class="group inline-flex items-center gap-2 rounded-md text-sm font-semibold tracking-tight"
			aria-label="{SITE_NAME} home"
			onclick={() => closeMenu()}
		>
			<svg class="size-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
				<path
					d="M4 8h9a3 3 0 0 1 0 6H8a3 3 0 0 0 0 6h12"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
				/>
			</svg>
			<span>{SITE_NAME}</span>
		</a>

		<nav class="hidden items-center gap-1 md:flex" aria-label="Main">
			<NavLinks />
		</nav>

		<div class="flex items-center gap-2">
			<ThemeToggle />
			<button
				type="button"
				bind:this={menuButton}
				onclick={() => (mobileOpen = !mobileOpen)}
				aria-expanded={mobileOpen}
				aria-controls="mobile-nav"
				aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
				class="inline-flex size-9 items-center justify-center rounded-md border border-border bg-card text-foreground transition-colors duration-[var(--sawit-duration-fast)] hover:bg-accent hover:text-accent-foreground md:hidden"
			>
				{#if mobileOpen}
					<svg class="size-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
						<path
							d="M6 6l12 12M18 6 6 18"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
						/>
					</svg>
				{:else}
					<svg class="size-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
						<path
							d="M4 7h16M4 12h16M4 17h16"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
						/>
					</svg>
				{/if}
			</button>
		</div>
	</div>

	{#if mobileOpen}
		<div id="mobile-nav" class="border-t border-border bg-background md:hidden">
			<nav class="mx-auto w-full max-w-6xl px-4 py-3" aria-label="Mobile">
				<NavLinks variant="mobile" onNavigate={() => closeMenu()} />
			</nav>
		</div>
	{/if}
</header>
