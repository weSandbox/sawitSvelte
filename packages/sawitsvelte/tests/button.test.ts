import { createRawSnippet, mount, unmount } from 'svelte';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { page, userEvent } from 'vitest/browser';
import Button from '../src/lib/button/button.svelte';
import LinkButton from './fixtures/button-link.svelte';

type Mounted = ReturnType<typeof mount>;

let mounted: Mounted | undefined;

const label = (text: string) =>
	createRawSnippet(() => ({
		render: () => `<span>${text}</span>`
	}));

function cleanup(): void {
	if (mounted) {
		unmount(mounted);
		mounted = undefined;
	}
	document.body.innerHTML = '';
}

function render(props: Record<string, unknown> = {}): HTMLButtonElement {
	cleanup();
	mounted = mount(Button, {
		target: document.body,
		props: { children: label('Click me'), ...props }
	});

	const element = document.querySelector('button');
	if (!element) throw new Error('Button did not render a <button> element');
	return element;
}

function classTokens(element: Element): string[] {
	return element.className.split(/\s+/).filter(Boolean);
}

function renderLink(props: Record<string, unknown> = {}): HTMLAnchorElement {
	cleanup();
	mounted = mount(LinkButton, { target: document.body, props });

	const anchor = document.querySelector('a');
	if (!anchor) throw new Error('child snippet did not render an anchor');
	return anchor;
}

afterEach(cleanup);

describe('Button rendering', () => {
	it('renders a native button with a safe default type', () => {
		const button = render();

		expect(button.tagName).toBe('BUTTON');
		expect(button.getAttribute('type')).toBe('button');
		expect(button.textContent).toContain('Click me');
	});

	it('defaults to the default variant and size', () => {
		const button = render();

		expect(button.dataset.slot).toBe('button');
		expect(button.dataset.variant).toBe('default');
		expect(button.dataset.size).toBe('default');
	});

	it('allows overriding the native type', () => {
		expect(render({ type: 'submit' }).getAttribute('type')).toBe('submit');
	});

	it('forwards unknown attributes', () => {
		const button = render({ 'data-testid': 'cta', title: 'Call to action', name: 'cta' });

		expect(button.dataset.testid).toBe('cta');
		expect(button.getAttribute('title')).toBe('Call to action');
		expect(button.getAttribute('name')).toBe('cta');
	});
});

describe('Button variants and sizes', () => {
	const variants = ['default', 'secondary', 'outline', 'ghost', 'destructive'] as const;

	for (const variant of variants) {
		it(`applies the ${variant} variant`, () => {
			const button = render({ variant });

			expect(button.dataset.variant).toBe(variant);
			expect(button.className).not.toBe('');
		});
	}

	it('gives variants distinct background treatments', () => {
		expect(render({ variant: 'default' }).className).toContain('bg-primary');
		expect(render({ variant: 'ghost' }).className).not.toContain('bg-primary');
		expect(render({ variant: 'destructive' }).className).toContain('bg-destructive');
		expect(render({ variant: 'outline' }).className).toContain('border-input');
	});

	const sizes = ['sm', 'default', 'lg', 'icon'] as const;

	for (const size of sizes) {
		it(`applies the ${size} size`, () => {
			const button = render({ size });

			expect(button.dataset.size).toBe(size);
		});
	}

	it('maps sizes to distinct heights', () => {
		expect(render({ size: 'sm' }).className).toContain('h-8');
		expect(render({ size: 'lg' }).className).toContain('h-10');
		expect(render({ size: 'icon' }).className).toContain('size-9');
	});

	it('stretches to full width when asked', () => {
		expect(render({ fullWidth: true }).className).toContain('w-full');
		expect(render({ fullWidth: false }).className).not.toContain('w-full');
	});
});

describe('Button class passthrough', () => {
	it('merges consumer classes and lets them win on conflict', () => {
		const tokens = classTokens(render({ class: 'bg-red-500 px-10' }));

		expect(tokens).toContain('bg-red-500');
		expect(tokens).toContain('px-10');
		// `hover:bg-primary/90` is a different class and must survive.
		expect(tokens).not.toContain('bg-primary');
		expect(tokens).not.toContain('px-4');
	});

	it('keeps non-conflicting base classes', () => {
		const button = render({ class: 'custom-marker' });

		expect(button.className).toContain('custom-marker');
		expect(button.className).toContain('inline-flex');
	});
});

describe('Button disabled state', () => {
	it('sets the native attribute and the data contract', () => {
		const button = render({ disabled: true });

		expect(button.disabled).toBe(true);
		expect(button.hasAttribute('data-disabled')).toBe(true);
		expect(button.getAttribute('aria-disabled')).toBe('true');
	});

	it('does not set disabled attributes when enabled', () => {
		const button = render();

		expect(button.hasAttribute('data-disabled')).toBe(false);
		expect(button.hasAttribute('aria-disabled')).toBe(false);
		expect(button.disabled).toBe(false);
	});

	it('cannot be activated by pointer', async () => {
		const onclick = vi.fn();
		render({ disabled: true, onclick });

		// `force` bypasses Playwright's actionability check, which refuses to click
		// disabled elements — that refusal is itself the behaviour we rely on, so we
		// force the click to prove the browser still swallows it.
		await userEvent.click(page.getByRole('button'), { force: true });

		expect(onclick).not.toHaveBeenCalled();
	});

	it('cannot be activated by keyboard', async () => {
		const onclick = vi.fn();
		const button = render({ disabled: true, onclick });

		button.focus();
		await userEvent.keyboard('{Enter}');

		expect(onclick).not.toHaveBeenCalled();
	});
});

describe('Button loading state', () => {
	it('exposes busy state and blocks activation', () => {
		const button = render({ loading: true });

		expect(button.hasAttribute('data-loading')).toBe(true);
		expect(button.hasAttribute('data-disabled')).toBe(true);
		expect(button.getAttribute('aria-busy')).toBe('true');
		expect(button.disabled).toBe(true);
	});

	it('renders a decorative spinner hidden from assistive technology', () => {
		const button = render({ loading: true });
		const spinner = button.querySelector('[data-slot="button-spinner"]');

		expect(spinner).not.toBeNull();
		expect(spinner?.getAttribute('aria-hidden')).toBe('true');
	});

	it('does not render a spinner when idle', () => {
		expect(render().querySelector('[data-slot="button-spinner"]')).toBeNull();
	});

	it('keeps the accessible name while loading', () => {
		expect(render({ loading: true }).textContent).toContain('Click me');
	});
});

describe('Button keyboard interaction', () => {
	it('is focusable and activates with Enter', async () => {
		const onclick = vi.fn();
		const button = render({ onclick });

		button.focus();
		expect(document.activeElement).toBe(button);

		await userEvent.keyboard('{Enter}');

		expect(onclick).toHaveBeenCalledTimes(1);
	});

	it('activates with Space', async () => {
		const onclick = vi.fn();
		const button = render({ onclick });

		button.focus();
		await userEvent.keyboard(' ');

		expect(onclick).toHaveBeenCalledTimes(1);
	});

	it('activates on click', async () => {
		const onclick = vi.fn();
		render({ onclick });

		await userEvent.click(page.getByRole('button'));

		expect(onclick).toHaveBeenCalledTimes(1);
	});
});

describe('Button polymorphic child', () => {
	it('renders the child element instead of a button', () => {
		const anchor = renderLink();

		expect(anchor).not.toBeNull();
		expect(document.querySelector('button')).toBeNull();
	});

	it('passes the visual contract to the child', () => {
		const anchor = renderLink();

		expect(anchor.dataset.slot).toBe('button');
		expect(anchor.dataset.variant).toBe('default');
		expect(anchor.dataset.size).toBe('default');
		expect(anchor.className).toContain('inline-flex');
	});

	it('withholds attributes that are invalid on non-button elements', () => {
		const anchor = renderLink();

		expect(anchor.hasAttribute('type')).toBe(false);
		expect(anchor.hasAttribute('disabled')).toBe(false);
	});

	it('is announced as disabled through ARIA', () => {
		const anchor = renderLink({ disabled: true });

		expect(anchor.getAttribute('aria-disabled')).toBe('true');
		expect(anchor.hasAttribute('data-disabled')).toBe(true);
	});

	it('blocks activation when disabled', async () => {
		// preventDefault keeps the test iframe on this page; the point is whether
		// the handler is reached at all.
		const onclick = vi.fn((event: MouseEvent) => event.preventDefault());
		renderLink({ disabled: true, onclick });

		await userEvent.click(page.getByRole('link'), { force: true });

		expect(onclick).not.toHaveBeenCalled();
	});

	it('still activates when enabled', async () => {
		const onclick = vi.fn((event: MouseEvent) => event.preventDefault());
		renderLink({ onclick });

		await userEvent.click(page.getByRole('link'));

		expect(onclick).toHaveBeenCalledTimes(1);
	});
});

describe('Button data contract', () => {
	it('keeps data attributes consistent across states', () => {
		expect(Object.keys(render().dataset).sort()).toEqual(['size', 'slot', 'variant']);

		expect(Object.keys(render({ disabled: true }).dataset).sort()).toEqual([
			'disabled',
			'size',
			'slot',
			'variant'
		]);

		expect(Object.keys(render({ loading: true }).dataset).sort()).toEqual([
			'disabled',
			'loading',
			'size',
			'slot',
			'variant'
		]);
	});
});
