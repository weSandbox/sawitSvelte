import { getContext, setContext } from 'svelte';

export type Theme = 'light' | 'dark' | 'system';
export type ResolvedTheme = 'light' | 'dark';

export interface ThemeOptions {
	defaultTheme?: Theme;
	storageKey?: string;
}

const THEME_CONTEXT = Symbol('sawitsvelte:theme');
const DEFAULT_STORAGE_KEY = 'sawit-theme';

/**
 * Owns theme state and the logic to resolve it. Deliberately free of DOM writes
 * and effects: `<ThemeProvider>` performs those, which keeps this class testable
 * in plain node and safe to import during SSR.
 */
export class ThemeController {
	#storageKey: string;

	theme = $state<Theme>('system');
	systemTheme = $state<ResolvedTheme>('light');

	constructor(options: ThemeOptions = {}) {
		this.#storageKey = options.storageKey ?? DEFAULT_STORAGE_KEY;
		this.theme = options.defaultTheme ?? 'system';
	}

	/**
	 * The theme actually applied to the document. A getter rather than
	 * `$derived` so it tracks both signals without a class-field rune.
	 */
	get resolvedTheme(): ResolvedTheme {
		return this.theme === 'system' ? this.systemTheme : this.theme;
	}

	get storageKey(): string {
		return this.#storageKey;
	}

	setTheme(theme: Theme): void {
		this.theme = theme;
	}

	toggle(): void {
		this.setTheme(this.resolvedTheme === 'dark' ? 'light' : 'dark');
	}

	readStored(): Theme | null {
		if (typeof localStorage === 'undefined') return null;
		try {
			const value = localStorage.getItem(this.#storageKey);
			return value === 'light' || value === 'dark' || value === 'system' ? value : null;
		} catch {
			return null;
		}
	}

	persist(): void {
		if (typeof localStorage === 'undefined') return;
		try {
			localStorage.setItem(this.#storageKey, this.theme);
		} catch {
			// Private mode / storage disabled — theming still works, it just won't stick.
		}
	}

	/** Starts tracking the OS preference. Returns a cleanup function. */
	syncSystem(): () => void {
		if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
			return () => {};
		}

		const query = window.matchMedia('(prefers-color-scheme: dark)');
		const update = () => {
			this.systemTheme = query.matches ? 'dark' : 'light';
		};

		update();
		query.addEventListener('change', update);
		return () => query.removeEventListener('change', update);
	}
}

export function applyTheme(theme: ResolvedTheme): void {
	if (typeof document === 'undefined') return;
	document.documentElement.dataset.theme = theme;
}

export function setThemeContext(controller: ThemeController): ThemeController {
	return setContext(THEME_CONTEXT, controller);
}

export function getThemeContext(): ThemeController {
	const controller = getContext<ThemeController | undefined>(THEME_CONTEXT);
	if (!controller) {
		throw new Error(
			'Theme context unavailable. Wrap your app in <ThemeProvider> from "sawitsvelte".'
		);
	}
	return controller;
}
