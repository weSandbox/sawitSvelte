/*
 * CSS imported for side effects (see tests/setup/browser.ts) has no runtime
 * exports, and TypeScript has no built-in declaration for it. This ambient
 * module lets `svelte-check` type-check the import without inventing types.
 */
declare module '*.css';
