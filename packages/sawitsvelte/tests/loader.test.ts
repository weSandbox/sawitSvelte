import { mount, unmount } from 'svelte';
import { afterEach, describe, expect, it } from 'vitest';
import Loader from '../src/lib/loader/loader.svelte';
import { LOADER_SHAPE } from '../src/lib/loader/loader.svelte.js';
import { classTokens } from './support/dom.js';

type Mounted = ReturnType<typeof mount>;

let mounted: Mounted | undefined;

function render(props: Record<string, unknown> = {}): HTMLElement {
	if (mounted) unmount(mounted);
	document.body.innerHTML = '';
	mounted = mount(Loader, { target: document.body, props: props as never });

	const element = document.querySelector('[data-slot="loader"]');
	if (!(element instanceof HTMLElement)) throw new Error('Loader did not render');
	return element;
}

afterEach(() => {
	if (mounted) unmount(mounted);
	mounted = undefined;
	document.body.innerHTML = '';
});

describe('Loader', () => {
	it('announces itself through a status region by default', () => {
		const element = render();

		expect(element.getAttribute('role')).toBe('status');
		expect(element.textContent).toContain('Loading');
		expect(element.hasAttribute('aria-hidden')).toBe(false);
	});

	it('accepts custom announcement text', () => {
		expect(render({ label: 'Deploying' }).textContent).toContain('Deploying');
	});

	it('is silent when the parent already announces busy state', () => {
		const element = render({ label: null });

		expect(element.getAttribute('aria-hidden')).toBe('true');
		expect(element.getAttribute('role')).toBeNull();
		expect(element.textContent?.trim()).toBe('');
	});

	it('draws the button silhouette rather than a circle', () => {
		const element = render();
		const polygons = element.querySelectorAll('polygon');

		expect(polygons).toHaveLength(2);
		expect(polygons[0]?.getAttribute('points')).toBe(LOADER_SHAPE);
	});

	it('normalises the perimeter so one lap is exactly 100 units', () => {
		const tracing = render().querySelectorAll('polygon')[1];

		expect(tracing?.getAttribute('pathLength')).toBe('100');
		expect(tracing?.getAttribute('stroke-dasharray')).toBe('26 74');
		// SVG elements expose className as an object, so read the attribute.
		expect(tracing?.getAttribute('class') ?? '').toContain('animate-trace');
	});

	it('keeps the svg out of the accessibility tree', () => {
		expect(render().querySelector('svg')?.getAttribute('aria-hidden')).toBe('true');
	});

	it('maps sizes', () => {
		expect(classTokens(render({ size: 'sm' }))).toContain('size-4');
		expect(classTokens(render({ size: 'lg' }))).toContain('size-8');
		expect(render({ size: 'lg' }).dataset.size).toBe('lg');
	});

	it('lets a colour utility replace the default ink', () => {
		const tokens = classTokens(render({ class: 'text-current' }));

		expect(tokens).toContain('text-current');
		expect(tokens).not.toContain('text-accent-ink');
	});

	it('forwards class and attributes', () => {
		const element = render({ class: 'text-destructive', 'data-testid': 'spin' });

		expect(classTokens(element)).toContain('text-destructive');
		expect(element.dataset.testid).toBe('spin');
	});
});
