import { defineConfig } from 'vitest/config';

export default defineConfig({
	test: {
		/*
		 * Scoped to src/ on purpose: `dist` and `.svelte-kit/__package__` contain
		 * compiled copies of the same tests, and Vitest's default glob finds them.
		 * Component tests move to browser mode in Phase 2.
		 */
		include: ['src/**/*.test.ts'],
		environment: 'node'
	}
});
