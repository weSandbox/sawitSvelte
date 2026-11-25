/**
 * Single source of truth for the docs site's content and links.
 *
 * Links and statuses live here so the landing page, header, footer and route
 * pages cannot drift apart or invent availability. Two facts are encoded
 * explicitly: the npm package is not published yet, and only Button and Card
 * are implemented — everything else is planned.
 */

export const SITE_NAME = 'sawitSvelte';

/** Canonical repository link already used across the docs. */
export const GITHUB_URL = 'https://github.com/weSandbox/sawitSvelte';

export const NPM_PACKAGE = 'sawitsvelte';

/** The package is not on the public registry yet; never present it as installable. */
export const NPM_PUBLISHED = false;

/**
 * Every internal route the site links to. Kept as a literal union so
 * `resolve()` from `$app/paths` type-checks against real routes instead of
 * accepting an arbitrary string.
 */
export type SitePath =
	| '/'
	| '/docs'
	| '/docs/tokens'
	| '/components'
	| '/components/button'
	| '/components/card'
	| '/components/loader';

export interface NavItem {
	label: string;
	href: SitePath;
}

export const navItems: NavItem[] = [
	{ label: 'Home', href: '/' },
	{ label: 'Documentation', href: '/docs' },
	{ label: 'Components', href: '/components' }
];

export interface ComponentEntry {
	name: string;
	href: SitePath;
	description: string;
}

/** Components that exist in the package today. */
export const implementedComponents: ComponentEntry[] = [
	{
		name: 'Button',
		href: '/components/button',
		description: 'The reference implementation: variants, sizes, a loading state, and polymorphism.'
	},
	{
		name: 'Card',
		href: '/components/card',
		description: 'Six composable parts on one surface, with vertical rhythm owned by the root.'
	},
	{
		name: 'Loader',
		href: '/components/loader',
		description: 'The button silhouette traced by a lime segment — the system’s busy state.'
	}
];

/** On the roadmap, not shipped. Rendered only as clearly labelled placeholders. */
export const plannedComponents: string[] = [
	'Input',
	'Label',
	'Textarea',
	'Checkbox',
	'Switch',
	'Badge',
	'Avatar',
	'Separator',
	'Dialog',
	'Popover',
	'Tooltip',
	'Dropdown Menu',
	'Tabs',
	'Accordion',
	'Select',
	'Command'
];

export const INSTALL_COMMAND = 'pnpm add sawitsvelte';

export const THEME_CSS = `@import 'tailwindcss';
@import 'sawitsvelte/theme.css';
@source '../node_modules/sawitsvelte/dist';`;

/** Built by string concatenation so the docs' own Svelte parser never sees a raw closing tag. */
const SCRIPT_OPEN = '<' + 'script lang="ts">';
const SCRIPT_CLOSE = '</' + 'script>';

export const BUTTON_USAGE = `${SCRIPT_OPEN}
	import { Button } from 'sawitsvelte';
${SCRIPT_CLOSE}

<Button>Save changes</Button>
<Button variant="outline">Cancel</Button>`;
