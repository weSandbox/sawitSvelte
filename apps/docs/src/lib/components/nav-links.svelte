<script lang="ts">
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import { GITHUB_URL, navItems } from '#lib/site.ts';

	let {
		variant = 'desktop',
		onNavigate
	}: {
		variant?: 'desktop' | 'mobile';
		onNavigate?: () => void;
	} = $props();

	/*
	 * Active state comes from the route id, not the URL pathname: the pathname
	 * carries `paths.base` (`/sawitSvelte/docs` on GitHub Pages) while route ids
	 * stay base-independent (`/docs`), so this comparison works at any base.
	 */
	const currentRoute = $derived(page.route.id ?? '');

	function isActive(href: string): boolean {
		if (href === '/') return currentRoute === '/';
		return currentRoute === href || currentRoute.startsWith(`${href}/`);
	}

	const linkClass: Record<'desktop' | 'mobile', string> = {
		desktop:
			'rounded-md px-3 py-1.5 text-sm text-muted-foreground transition-colors duration-[var(--sawit-duration-fast)] hover:text-foreground aria-[current=page]:text-foreground',
		mobile: 'block rounded-md px-3 py-2 text-base text-muted-foreground hover:text-foreground'
	};
</script>

<ul class={variant === 'desktop' ? 'flex items-center gap-1' : 'flex flex-col gap-0.5'}>
	{#each navItems as item (item.href)}
		<li>
			<a
				href={resolve(item.href)}
				class={linkClass[variant]}
				aria-current={isActive(item.href) ? 'page' : undefined}
				onclick={onNavigate}
			>
				{item.label}
			</a>
		</li>
	{/each}
	<li>
		<a
			href={GITHUB_URL}
			target="_blank"
			rel="external noopener noreferrer"
			class="{linkClass[variant]} inline-flex items-center gap-1.5"
			onclick={onNavigate}
		>
			GitHub
			<svg class="size-3.5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
				<path
					d="M7 17 17 7M9 7h8v8"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
			</svg>
			<span class="sr-only">(opens in a new tab)</span>
		</a>
	</li>
</ul>
