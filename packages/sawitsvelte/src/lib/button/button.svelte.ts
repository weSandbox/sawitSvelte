import type { Snippet } from 'svelte';
import type { HTMLButtonAttributes } from 'svelte/elements';
import { tv, type VariantProps } from 'tailwind-variants';
import type { ClassValue } from '../internal/cn.js';

/**
 * Visual definition of the button. Kept in a plain `.ts` module so it can be
 * imported without mounting a component — `buttonVariants()` is the supported
 * way to dress a link or any other element with button styling.
 *
 * Every colour here is a semantic token. Components never reference a hue or a
 * raw palette step, so retheming never requires touching this file.
 */
export const buttonVariants = tv({
	base: [
		'inline-flex shrink-0 items-center justify-center gap-2 rounded-md font-medium whitespace-nowrap select-none',
		'transition-colors duration-[var(--sawit-duration-fast)] ease-[var(--sawit-ease-standard)]',
		'disabled:pointer-events-none disabled:opacity-50 aria-disabled:opacity-50',
		'[&_svg]:pointer-events-none [&_svg]:shrink-0'
	],
	variants: {
		variant: {
			default: 'bg-primary text-primary-foreground hover:bg-primary/90',
			secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
			outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
			ghost: 'hover:bg-accent hover:text-accent-foreground',
			destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90'
		},
		size: {
			sm: 'h-8 gap-1.5 px-3 text-xs',
			default: 'h-9 px-4 text-sm',
			lg: 'h-10 px-6 text-base',
			icon: 'size-9'
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
		/** Prevents activation and marks the button unavailable. */
		disabled?: boolean;
		/** Busy state: shows a spinner, blocks activation, sets `aria-busy`. */
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
