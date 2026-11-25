import adapter from '@sveltejs/adapter-static';
import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';

/*
 * GitHub project pages are served from a subpath (`/sawitSvelte`), while local
 * development runs at the root. `BASE_PATH` is therefore injected only by the
 * deployment workflow; when it is absent (dev, check, tests) the base is empty.
 *
 * Read from `globalThis` rather than `process` so the docs project does not need
 * `@types/node` just for this one variable.
 */
const env = (globalThis as { process?: { env?: Record<string, string | undefined> } }).process?.env;
const base = (env?.BASE_PATH ?? '') as `/${string}` | '';

export default defineConfig({
	plugins: [
		tailwindcss(),
		sveltekit({
			compilerOptions: {
				// Force runes mode for the project, except for libraries. Can be removed in svelte 6.
				runes: ({ filename }) =>
					filename.split(/[/\\]/).includes('node_modules') ? undefined : true
			},
			/*
			 * `paths.relative` keeps its default of `true`, so the built HTML
			 * references assets and routes relative to the current page. That makes
			 * the output portable between the root and the project subpath.
			 */
			paths: { base },
			adapter: adapter({
				strict: true,
				// GitHub Pages serves this for unknown paths instead of its own 404.
				fallback: '404.html'
			})
		})
	]
});
