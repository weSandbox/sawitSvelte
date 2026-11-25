import { svelte } from '@sveltejs/vite-plugin-svelte';
import { playwright } from '@vitest/browser-playwright';
import { defineConfig } from 'vitest/config';

export default defineConfig({
	test: {
		/*
		 * Two projects on purpose.
		 *
		 * `unit` runs pure logic in node. `browser` runs components in a real
		 * Chromium, because jsdom does not implement native button activation,
		 * focus behaviour or the CSS/attribute interactions these tests assert.
		 *
		 * The browser provider points at a system Chrome install (`channel`) so no
		 * Playwright browser download is required.
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
				plugins: [svelte()],
				test: {
					name: 'browser',
					include: ['tests/**/*.test.ts'],
					browser: {
						enabled: true,
						headless: true,
						provider: playwright({ launchOptions: { channel: 'chrome' } }),
						instances: [{ browser: 'chromium' }]
					}
				}
			}
		]
	}
});
