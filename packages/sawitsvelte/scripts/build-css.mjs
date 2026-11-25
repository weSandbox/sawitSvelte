import { copyFile, mkdir } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const packageRoot = join(dirname(fileURLToPath(import.meta.url)), '..');
const source = join(packageRoot, '..', 'tokens', 'dist', 'theme.css');
const target = join(packageRoot, 'dist', 'theme.css');

try {
	await mkdir(dirname(target), { recursive: true });
	await copyFile(source, target);
} catch {
	throw new Error(
		'Missing packages/tokens/dist/theme.css. Run `pnpm --filter @sawitsvelte/tokens build` first (or `pnpm build` from the repo root).'
	);
}

console.log('sawitsvelte: copied theme.css into dist');
