import type { Snippet } from 'svelte';
import type { HTMLButtonAttributes } from 'svelte/elements';
import { tv, type VariantProps } from 'tailwind-variants';
import type { ClassValue } from '../internal/cn.js';

/**
 * Visual definition of the button. Kept in a plain `.ts` module so it can be
 * imported without mounting a component — `buttonVariants()` is the supported
 * way to dress a link or any other element with button styling.
 *
 * The silhouette is the identity: three corners cut at 45° and one cut larger,
 * read from `--sawit-notch`. Sizes override that variable, so the cut scales
 * with the control without a second shape definition.
 *
 * Depth cannot come from an outer shadow here. `clip-path` clips `box-shadow`
 * and `drop-shadow` alike, so elevation is expressed as an inner edge highlight
 * plus a 2px lift and a tonal shift. That is a measured constraint, not a
 * preference — see docs/adr/0008-visual-identity.md.
 */
export const buttonVariants = tv({
	base: [
		'relative inline-flex shrink-0 items-center justify-center gap-2 font-medium tracking-tight whitespace-nowrap select-none',
		'shape-notch-br',
		'transition-[background-color,color,border-color,translate] duration-[var(--sawit-duration-fast)] ease-[var(--sawit-ease-tactile)]',
		'motion-reduce:transition-none',
		'disabled:opacity-45 aria-disabled:opacity-45',
		'[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg]:transition-transform [&_svg]:duration-[var(--sawit-duration-fast)] [&_svg]:ease-[var(--sawit-ease-tactile)]',
		// Signature micro-interaction: the icon leans in the direction of the cut.
		'hover:[&_svg]:translate-x-0.5 hover:[&_svg]:-translate-y-0.5',
		'motion-reduce:hover:[&_svg]:translate-x-0 motion-reduce:hover:[&_svg]:-translate-y-0'
	],
	variants: {
		variant: {
			default: [
				'bg-primary text-primary-foreground shadow-[var(--sawit-edge)]',
				'hover:bg-primary-hover hover:-translate-y-0.5',
				'active:bg-primary-active active:translate-y-0'
			],
			secondary: [
				'border border-border bg-secondary text-secondary-foreground',
				'hover:border-border-strong hover:bg-surface-3'
			],
			outline: [
				'border border-border-strong bg-transparent text-foreground',
				'hover:border-border-accent hover:bg-accent-soft hover:text-accent-soft-foreground'
			],
			ghost: [
				'bg-transparent text-foreground',
				'hover:bg-accent-soft hover:text-accent-soft-foreground'
			],
			destructive: [
				'bg-destructive text-destructive-foreground shadow-[var(--sawit-edge)]',
				'hover:opacity-90 hover:-translate-y-0.5',
				'active:translate-y-0 active:opacity-100'
			]
		},
		size: {
			// The notch and bevel shrink with the control so the cut never eats the label.
			sm: 'h-9 gap-1.5 px-4 text-xs [--sawit-notch:12px] [--sawit-bevel:5px]',
			default: 'h-11 px-5 text-sm [--sawit-notch:18px]',
			lg: 'h-12 px-6 text-base [--sawit-notch:20px]',
			icon: 'size-11 [--sawit-notch:14px]'
		},
		fullWidth: {
			true: 'w-full'
		}
	},
	defaultVariants: {
		variant: 'default',
		size: 'default',
		fullWidth: false
	}
});

type ButtonVariantProps = VariantProps<typeof buttonVariants>;

export type ButtonVariant = NonNullable<ButtonVariantProps['variant']>;
export type ButtonSize = NonNullable<ButtonVariantProps['size']>;

/**
 * Props handed to a `child` snippet. Deliberately loose: the child may be an
 * anchor, a router link, or another component, and only that element knows
 * which attributes it accepts.
 */
export type ButtonChildProps = Record<string, unknown>;

export type ButtonProps = Omit<HTMLButtonAttributes, 'class'> &
	Record<string, unknown> & {
		/** Visual treatment. Default: `default`. */
		variant?: ButtonVariant;
		/** Control height and horizontal padding. Default: `default`. */
		size?: ButtonSize;
		/** Permanently unavailable: sets the native `disabled` attribute. */
		disabled?: boolean;
		/**
		 * Temporarily busy: shows a spinner, sets `aria-busy` and `aria-disabled`,
		 * and blocks activation while **keeping focus** (see ADR-0007).
		 */
		loading?: boolean;
		/** Stretches the button to its container width. */
		fullWidth?: boolean;
		class?: ClassValue;
		/**
		 * Renders your own element instead of a `<button>`. The snippet receives
		 * the merged attribute set to spread onto it.
		 */
		child?: Snippet<[{ props: ButtonChildProps }]>;
	};
