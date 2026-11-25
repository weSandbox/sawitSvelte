import { createRawSnippet, mount, unmount, type Component } from 'svelte';
import { afterEach, describe, expect, it } from 'vitest';
import Content from '../src/lib/card/card-content.svelte';
import Description from '../src/lib/card/card-description.svelte';
import Footer from '../src/lib/card/card-footer.svelte';
import Header from '../src/lib/card/card-header.svelte';
import Root from '../src/lib/card/card-root.svelte';
import Title from '../src/lib/card/card-title.svelte';
import CardArticle from './fixtures/card-article.svelte';
import CardDemo from './fixtures/card-demo.svelte';
import { classTokens } from './support/dom.js';

type Mounted = ReturnType<typeof mount>;

let mounted: Mounted | undefined;

const text = (value: string) =>
	createRawSnippet(() => ({
		render: () => `<span>${value}</span>`
	}));

function cleanup(): void {
	if (mounted) {
		unmount(mounted);
		mounted = undefined;
	}
	document.body.innerHTML = '';
}

function render(component: Component<never>, props: Record<string, unknown> = {}): HTMLElement {
	cleanup();
	mounted = mount(component, {
		target: document.body,
		props: { children: text('Content'), ...props } as never
	});

	const element = document.body.firstElementChild;
	if (!(element instanceof HTMLElement)) throw new Error('Component rendered no element');
	return element;
}

afterEach(cleanup);

describe('Card parts', () => {
	it('renders Root as a plain container carrying the card surface', () => {
		const root = render(Root as never);

		expect(root.tagName).toBe('DIV');
		expect(root.dataset.slot).toBe('card');

		const tokens = classTokens(root);
		expect(tokens).toContain('bg-card');
		expect(tokens).toContain('border-border');
		expect(tokens).toContain('text-card-foreground');
	});

	it('owns vertical rhythm on Root, so parts only set horizontal insets', () => {
		const root = render(Root as never);
		const header = render(Header as never);

		// This pairing is what lets any combination of parts be used without the
		// gaps multiplying: root provides the vertical gap, parts the side padding.
		expect(classTokens(root)).toContain('gap-6');
		expect(classTokens(root)).toContain('py-6');
		expect(classTokens(header)).toContain('px-6');
		expect(classTokens(header)).not.toContain('py-6');
	});

	it('renders each part on its semantic element with its slot name', () => {
		expect(render(Header as never).dataset.slot).toBe('card-header');
		expect(render(Content as never).dataset.slot).toBe('card-content');
		expect(render(Footer as never).dataset.slot).toBe('card-footer');

		const description = render(Description as never);
		expect(description.tagName).toBe('P');
		expect(description.dataset.slot).toBe('card-description');
	});

	it('renders Title as a heading, level 3 by default', () => {
		const title = render(Title as never);

		expect(title.tagName).toBe('H3');
		expect(title.dataset.slot).toBe('card-title');
	});

	it('renders the heading level that keeps the document outline correct', () => {
		expect(render(Title as never, { level: 1 }).tagName).toBe('H1');
		expect(render(Title as never, { level: 2 }).tagName).toBe('H2');
		expect(render(Title as never, { level: 6 }).tagName).toBe('H6');
	});
});

describe('Card class passthrough', () => {
	it('lets consumer classes win on conflict for every part', () => {
		expect(classTokens(render(Root as never, { class: 'border-2 rounded-none' }))).toEqual(
			expect.arrayContaining(['border-2', 'rounded-none'])
		);
		expect(classTokens(render(Root as never, { class: 'border-2' }))).not.toContain('border');

		expect(classTokens(render(Title as never, { class: 'text-2xl' }))).toContain('text-2xl');
		expect(classTokens(render(Title as never, { class: 'text-2xl' }))).not.toContain('text-base');

		expect(classTokens(render(Footer as never, { class: 'justify-end' }))).toContain('justify-end');
	});

	it('keeps non-conflicting base classes', () => {
		const root = render(Root as never, { class: 'custom-marker' });

		expect(classTokens(root)).toContain('custom-marker');
		expect(classTokens(root)).toContain('flex-col');
	});
});

describe('Card attribute passthrough', () => {
	it('forwards native and data attributes on every part', () => {
		const root = render(Root as never, { id: 'billing', 'data-testid': 'card' });
		expect(root.id).toBe('billing');
		expect(root.dataset.testid).toBe('card');

		const header = render(Header as never, { 'aria-label': 'Billing summary' });
		expect(header.getAttribute('aria-label')).toBe('Billing summary');
	});
});

describe('Card composition', () => {
	it('renders all six slots in document order', () => {
		cleanup();
		mounted = mount(CardDemo, { target: document.body });

		const slots = Array.from(document.querySelectorAll('[data-slot^="card"]')).map((element) =>
			element.getAttribute('data-slot')
		);

		expect(slots).toEqual([
			'card',
			'card-header',
			'card-title',
			'card-description',
			'card-content',
			'card-footer'
		]);
	});

	it('nests content inside the parts rather than flattening them', () => {
		cleanup();
		mounted = mount(CardDemo, { target: document.body });

		const root = document.querySelector('[data-slot="card"]');
		const header = document.querySelector('[data-slot="card-header"]');
		const title = document.querySelector('[data-slot="card-title"]');

		expect(root).not.toBeNull();
		expect(root?.contains(header)).toBe(true);
		expect(header?.contains(title)).toBe(true);
	});
});

describe('Card polymorphic root', () => {
	function renderArticleCard(): HTMLElement {
		cleanup();
		mounted = mount(CardArticle, { target: document.body });
		const element = document.querySelector('article');
		if (!element) throw new Error('child snippet did not render an article');
		return element;
	}

	it('renders the child element instead of a div', () => {
		renderArticleCard();

		expect(document.querySelector('[data-slot="card"]')?.tagName).toBe('ARTICLE');
	});

	it('hands the child the visual contract so styling is not lost', () => {
		const element = renderArticleCard();

		expect(element.getAttribute('data-slot')).toBe('card');
		expect(classTokens(element)).toContain('bg-card');
		expect(classTokens(element)).toContain('rounded-xl');
	});
});

describe('Card featured treatment', () => {
	it('marks the root and applies the accent treatment', () => {
		const root = render(Root as never, { featured: true });

		expect(root.hasAttribute('data-featured')).toBe(true);
		expect(classTokens(root)).toContain('border-border-accent');
		expect(classTokens(root)).toContain('shadow-glow');
	});

	it('is absent by default and keeps the standard elevation', () => {
		const root = render(Root as never);

		expect(root.hasAttribute('data-featured')).toBe(false);
		expect(classTokens(root)).toContain('shadow-card');
	});
});
