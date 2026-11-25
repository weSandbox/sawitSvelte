import type { Snippet } from 'svelte';
import type { HTMLAttributes } from 'svelte/elements';
import { tv } from 'tailwind-variants';
import type { ClassValue } from '../internal/cn.js';

/**
 * Card styling, expressed as slots.
 *
 * Vertical rhythm lives on the root (`gap-6` + `py-6`) so that combining parts
 * never multiplies padding: each part only owns its horizontal inset. That is
 * what lets Header, Content and Footer be used in any combination — including
 * omitting any of them — without the gaps changing.
 *
 * Unlike the button, the card is not clipped. A surface needs real elevation
 * more than it needs a cut, and `clip-path` would remove the shadow entirely.
 * The signature lives in the corner bracket and the layered surface instead.
 */
export const cardVariants = tv({
	slots: {
		root: 'corner-accent relative flex flex-col gap-6 rounded-tl-xl rounded-tr-xl rounded-bl-xl rounded-br-sm border border-border bg-card py-6 text-card-foreground shadow-card',
		header: 'flex flex-col gap-2 px-6',
		title: 'text-base leading-tight font-semibold tracking-tight',
		description: 'text-sm leading-relaxed text-muted-foreground',
		content: 'px-6',
		footer: 'flex items-center gap-2 px-6'
	},
	variants: {
		featured: {
			true: {
				root: 'border-border-accent shadow-glow'
			}
		}
	},
	defaultVariants: {
		featured: false
	}
});

/** Props handed to a `child` snippet. */
export type CardChildProps = Record<string, unknown>;

/**
 * Every part repeats the same three things: native attributes for its element,
 * a `class` that loses to nothing, and children. This alias keeps that contract
 * identical across parts instead of drifting file by file.
 */
export type CardPartProps<T extends EventTarget> = Omit<HTMLAttributes<T>, 'class' | 'children'> &
	Record<string, unknown> & {
		class?: ClassValue;
		children?: Snippet;
	};

/**
 * Card is the element whose semantic identity genuinely varies: a card that
 * represents a self-contained piece of content should be an `<article>`, one
 * that groups a subsection should be a `<section>`. Parts do not offer this,
 * because their element type is fixed by what the slot means.
 */
export type CardRootProps = CardPartProps<HTMLDivElement> & {
	/** Highlighted treatment: accent border, accent bloom, brighter corner bracket. */
	featured?: boolean;
	child?: Snippet<[{ props: CardChildProps }]>;
};

export type CardHeaderProps = CardPartProps<HTMLDivElement>;
export type CardContentProps = CardPartProps<HTMLDivElement>;
export type CardFooterProps = CardPartProps<HTMLDivElement>;
export type CardDescriptionProps = CardPartProps<HTMLParagraphElement>;

export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

export type CardTitleProps = CardPartProps<HTMLHeadingElement> & {
	/**
	 * Heading level, default 3. A constrained prop rather than an arbitrary tag:
	 * the document outline is an accessibility concern Card can own, while
	 * substituting an unrelated element is not something a title should do.
	 */
	level?: HeadingLevel;
};
