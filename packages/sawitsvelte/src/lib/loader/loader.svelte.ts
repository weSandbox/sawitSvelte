import type { HTMLAttributes } from 'svelte/elements';
import { tv, type VariantProps } from 'tailwind-variants';
import type { ClassValue } from '../internal/cn.js';

/**
 * The loader is the button's silhouette reduced to a hairline: the same three
 * bevels and deep notch, traced by a lime segment.
 *
 * The shape is a fixed `viewBox` because a loader has no content to size it —
 * unlike the button, the geometry does not depend on the element's box. Stroke
 * colour is `currentColor`, so it is configurable with any text colour utility;
 * the default is `--accent-ink` rather than `--primary`, because a hairline in
 * fill-lime is too pale on a light surface.
 */
export const loaderVariants = tv({
	base: 'inline-flex shrink-0 items-center justify-center align-middle text-accent-ink',
	variants: {
		size: {
			sm: 'size-4',
			default: 'size-6',
			lg: 'size-8'
		}
	},
	defaultVariants: {
		size: 'default'
	}
});

/**
 * The polygon in a 24×24 box, inset by 1.2 so the stroke is not clipped by the
 * viewport. Bevel 3.5 / notch 9 pushes the deep cut past the button's ratio on
 * purpose: at 16–24px the silhouette has to read at a glance.
 */
export const LOADER_SHAPE =
	'1.2,4.7 4.7,1.2 19.3,1.2 22.8,4.7 22.8,13.8 13.8,22.8 4.7,22.8 1.2,19.3';

type LoaderVariantProps = VariantProps<typeof loaderVariants>;

export type LoaderSize = NonNullable<LoaderVariantProps['size']>;

export type LoaderProps = Omit<HTMLAttributes<HTMLSpanElement>, 'class' | 'children'> &
	Record<string, unknown> & {
		/** Visual size. Default: `default`. */
		size?: LoaderSize;
		/**
		 * Announcement text. Pass `null` for a decorative loader whose parent already
		 * announces the busy state — `Button` does this.
		 */
		label?: string | null;
		class?: ClassValue;
	};
