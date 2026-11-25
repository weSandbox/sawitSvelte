<script lang="ts">
	import { getThemeContext } from 'sawitsvelte';

	const theme = getThemeContext();

	const order = ['light', 'dark', 'system'] as const;

	function cycle() {
		const next = order[(order.indexOf(theme.theme) + 1) % order.length];
		if (next) theme.setTheme(next);
	}
</script>

<button
	type="button"
	onclick={cycle}
	aria-label="Theme: {theme.theme}. Activate to change."
	class="inline-flex h-9 items-center gap-2 rounded-md border border-border bg-card px-3 text-sm font-medium text-foreground transition-colors duration-[var(--sawit-duration-fast)] hover:bg-accent hover:text-accent-foreground"
>
	<span class="size-2.5 rounded-full bg-primary" aria-hidden="true"></span>
	<span class="capitalize">{theme.theme}</span>
</button>
