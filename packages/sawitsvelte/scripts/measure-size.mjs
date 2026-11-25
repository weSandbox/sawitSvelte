import { rm, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { gzipSync } from 'node:zlib';
import { svelte, vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { build } from 'vite';

/*
 * Measures what a consumer actually ships.
 *
 * Each entry is bundled the way an app bundler would see it: Svelte stays
 * external (it is a peer dependency), while tailwind-merge and tailwind-variants
 * are included, because those are real runtime bytes this package drags in.
 * That is the number worth budgeting, not the size of our own files on disk.
 */

const packageRoot = join(dirname(fileURLToPath(import.meta.url)), '..');
const entryFile = join(packageRoot, '.size-entry.js');

const ENTRIES = {
	Button: `export { Button } from './src/lib/button/index.js';`,
	Card: `export { Card } from './src/lib/card/index.js';`,
	'Button + Card': `export { Button, Card } from './src/lib/index.js';`
};

/**
 * Gzip budgets in bytes, set from measurement (Button 21.2 kB, Card 20.9 kB,
 * both 21.8 kB) plus a small margin so ordinary authoring does not trip the
 * gate. They exist to catch regressions, not to encode a wish.
 *
 * The bulk is the shared styling runtime, not component code: our own Button is
 * 1.7 kB gzip, `tailwind-merge` is ~9.6 kB and `tailwind-variants` ~9.9 kB. That
 * fixed cost is paid once no matter how many components an app imports.
 */
const BUDGETS = {
	Button: 23 * 1024,
	Card: 23 * 1024,
	'Button + Card': 24 * 1024
};

async function measure(name, code) {
	await writeFile(entryFile, code, 'utf8');

	try {
		const result = await build({
			root: packageRoot,
			configFile: false,
			logLevel: 'silent',
			plugins: [svelte({ preprocess: vitePreprocess() })],
			build: {
				lib: { entry: entryFile, formats: ['es'], fileName: 'bundle' },
				write: false,
				minify: true,
				target: 'es2022',
				rollupOptions: { external: [/^svelte(\/|$)/] }
			}
		});

		const outputs = Array.isArray(result) ? result : [result];
		const source = outputs
			.flatMap((output) => output.output)
			.filter((chunk) => chunk.type === 'chunk')
			.map((chunk) => chunk.code)
			.join('\n');

		return {
			name,
			raw: Buffer.byteLength(source, 'utf8'),
			gzip: gzipSync(Buffer.from(source)).length
		};
	} finally {
		await rm(entryFile, { force: true });
	}
}

const kb = (bytes) => `${(bytes / 1024).toFixed(1)} kB`;
const results = [];

for (const [name, code] of Object.entries(ENTRIES)) {
	results.push(await measure(name, code));
}

console.log('\nBundle size (minified ESM, Svelte external)\n');
console.log('entry'.padEnd(16), 'raw'.padStart(10), 'gzip'.padStart(10), 'budget'.padStart(14));
for (const result of results) {
	const budget = BUDGETS[result.name];
	const status = result.gzip <= budget ? 'ok' : 'OVER';
	console.log(
		result.name.padEnd(16),
		kb(result.raw).padStart(10),
		kb(result.gzip).padStart(10),
		`${kb(budget)} ${status}`.padStart(14)
	);
}

const overBudget = results.filter((result) => result.gzip > BUDGETS[result.name]);
if (overBudget.length > 0) {
	console.error(
		`\n${overBudget.length} entry/entries exceed budget: ${overBudget.map((r) => r.name).join(', ')}`
	);
	process.exitCode = 1;
}
