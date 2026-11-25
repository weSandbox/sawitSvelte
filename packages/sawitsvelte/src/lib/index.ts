export { default as ThemeProvider } from './theme/theme-provider.svelte';
export {
	applyTheme,
	getThemeContext,
	setThemeContext,
	ThemeController,
	type ResolvedTheme,
	type Theme,
	type ThemeOptions
} from './theme/theme.svelte.js';

export {
	Button,
	buttonVariants,
	type ButtonChildProps,
	type ButtonProps,
	type ButtonSize,
	type ButtonVariant
} from './button/index.js';

/*
 * Only the composite namespace reaches the root barrel. Part names (`Root`,
 * `Header`, …) are intentionally scoped to the component's own subpath.
 */
export { Card } from './card/index.js';
export {
	cardVariants,
	type CardChildProps,
	type CardContentProps,
	type CardDescriptionProps,
	type CardFooterProps,
	type CardHeaderProps,
	type CardPartProps,
	type CardRootProps,
	type CardTitleProps,
	type HeadingLevel
} from './card/index.js';

export { Loader, loaderVariants, type LoaderProps, type LoaderSize } from './loader/index.js';

export { cn, type ClassValue } from './internal/cn.js';
export { mergeProps, type Props } from './internal/merge-props.js';
