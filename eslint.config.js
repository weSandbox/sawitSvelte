import js from '@eslint/js';
import prettier from 'eslint-config-prettier';
import svelte from 'eslint-plugin-svelte';
import globals from 'globals';
import tseslint from 'typescript-eslint';

/*
 * One flat config for the whole workspace. Prettier owns formatting, so
 * `eslint-config-prettier` goes last to switch off every stylistic rule.
 */
export default tseslint.config(
	{
		ignores: ['**/dist/**', '**/build/**', '**/.svelte-kit/**', '**/node_modules/**']
	},

	js.configs.recommended,
	tseslint.configs.recommended,
	...svelte.configs.recommended,

	{
		languageOptions: {
			globals: { ...globals.browser, ...globals.node }
		}
	},

	{
		// Rune-bearing modules (`.svelte.ts`) are plain TypeScript, but the Svelte
		// plugin claims them; give them the TS parser back.
		files: ['**/*.svelte.ts', '**/*.svelte.js'],
		languageOptions: {
			parser: tseslint.parser
		}
	},

	{
		files: ['**/*.svelte'],
		languageOptions: {
			parserOptions: { parser: tseslint.parser }
		}
	},

	prettier
);
