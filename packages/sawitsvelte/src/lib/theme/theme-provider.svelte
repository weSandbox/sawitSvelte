<script lang="ts">
	import type { Snippet } from 'svelte';
	import { untrack } from 'svelte';
	import { applyTheme, setThemeContext, ThemeController, type Theme } from './theme.svelte.js';
	import { suppressTransitions } from './suppress-transitions.js';

	let {
		defaultTheme = 'system',
		storageKey,
		disableTransitionOnChange = true,
		children
	}: {
		/** Theme used when nothing is persisted yet. */
		defaultTheme?: Theme;
		/** localStorage key. Change it to run independent theme scopes on one origin. */
		storageKey?: string;
		/** Suppress CSS transitions during a theme switch to avoid colour flashing. */
		disableTransitionOnChange?: boolean;
		children: Snippet;
	} = $props();

	// Both props are initial values by contract: changing them after mount must not
	// reset a theme the user has already chosen. `untrack` makes that intent explicit.
	const controller = untrack(() => new ThemeController({ defaultTheme, storageKey }));
	setThemeContext(controller);

	let hydrated = $state(false);

	// Restore state on the client, then follow the OS preference.
	$effect(() => {
		const stopWatchingSystem = controller.syncSystem();
		const stored = controller.readStored();
		if (stored) controller.setTheme(stored);
		hydrated = true;
		return stopWatchingSystem;
	});

	// Reflect state onto <html data-theme>. Runs on the client only, so SSR
	// never touches the document; the inline script in app.html covers first paint.
	$effect(() => {
		const resolved = controller.resolvedTheme;
		const stopSuppressing =
			hydrated && disableTransitionOnChange ? suppressTransitions() : undefined;

		applyTheme(resolved);
		if (hydrated) controller.persist();

		stopSuppressing?.();
	});
</script>

{@render children()}
