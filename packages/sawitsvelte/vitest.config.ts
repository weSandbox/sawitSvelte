import { svelte } from '@sveltejs/vite-plugin-svelte';
import tailwindcss from '@tailwindcss/vite';
import { playwright } from '@vitest/browser-playwright';
import { defineConfig } from 'vitest/config';

/*
 * Browser selection. `channel` reuses an installed Chrome, which avoids a
 * Playwright browser download. Set SAWIT_BROWSER_CHANNEL=bundled on machines or
 * images without Chrome (after `pnpm exec playwright install chromium`); set it
 * to `msedge`, `chrome-beta`, etc. to switch channels.
 */
const channel = process.env.SAWIT_BROWSER_CHANNEL ?? 'chrome';

export default defineConfig({
	test: {
		/*
		 * Two projects on purpose.
		 *
		 * `unit` runs pure logic in node. `browser` runs components in a real
		 * Chromium, because jsdom does not implement native button activation,
		 * focus behaviour, or the CSS computed-style checks axe relies on.
		 */
		projects: [
			{
				plugins: [svelte()],
				test: {
					name: 'unit',
					include: ['src/**/*.test.ts'],
					environment: 'node'
				}
			},
			{
				plugins: [svelte(), tailwindcss()],
				test: {
					name: 'browser',
					include: ['tests/**/*.test.ts'],
					// Loads the real design system so accessibility scans see real colours.
					setupFiles: ['./tests/setup/browser.ts'],
					browser: {
						enabled: true,
						headless: true,
						provider: playwright({
							launchOptions: channel === 'bundled' ? {} : { channel }
						}),
						instances: [{ browser: 'chromium' }]
					}
				}
			}
		]
	}
});
