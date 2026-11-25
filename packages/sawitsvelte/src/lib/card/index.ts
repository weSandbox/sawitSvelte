import Content from './card-content.svelte';
import Description from './card-description.svelte';
import Footer from './card-footer.svelte';
import Header from './card-header.svelte';
import Root from './card-root.svelte';
import Title from './card-title.svelte';

/**
 * The composite namespace, for `import { Card } from 'sawitsvelte'` and for
 * `import * as Card from 'sawitsvelte/card'`, which resolves to the same parts.
 */
export const Card = { Root, Header, Title, Description, Content, Footer };

/*
 * Parts are also exported by name so the subpath supports the namespace-import
 * style the architecture calls for (`Card.Root`). They are deliberately NOT
 * re-exported from the package root: `Root`, `Header` and `Content` would be
 * meaningless names at that level and would collide with the next component.
 */
export { Content, Description, Footer, Header, Root, Title };

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
} from './card.svelte.js';
